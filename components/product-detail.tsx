"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/cart-store";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react"; // <-- using lucide icon

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();

  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);

  const [localQuantity, setLocalQuantity] = useState<number>(1);

  useEffect(() => {
    setLocalQuantity(cartItem ? cartItem.quantity : 1);
  }, [cartItem]);

  const onAddToCart = () => {
    if (cartItem) removeItem(product.id);
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: localQuantity,
    });
  };

  const onAddToWishlist = () => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="transition duration-300 hover:opacity-90"
          />
        </div>
      )}
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}
        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="outline"
            onClick={() => setLocalQuantity(q => Math.max(1, q - 1))}
            className="transition transform active:scale-90"
          >
            –
          </Button>
          <span className="text-lg font-semibold">{localQuantity}</span>
          <Button
            onClick={() => setLocalQuantity(q => q + 1)}
            className="transition transform active:scale-90"
          >
            +
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={onAddToCart}
            className="transition transform active:scale-90"
          >
            Add to Cart
          </Button>
          <Button
            variant="ghost"
            onClick={onAddToWishlist}
            className="transition transform active:scale-90"
          >
            <Heart className="w-5 h-5 mr-2" /> Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
};
