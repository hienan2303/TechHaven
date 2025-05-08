"use client";

import { useWishlistStore } from "@/store/cart-store";

const WishlistPage = () => {
  const { items } = useWishlistStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="border-b py-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl || "/default-product.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <div>
                  <h2 className="text-xl">{item.name}</h2>
                  <p>${(item.price / 100).toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishlistPage;
