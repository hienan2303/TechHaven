"use client";

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState, useEffect } from "react";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [availableValues, setAvailableValues] = useState<string[]>([]);

  // Extract all unique metadata keys from products
  const metadataKeys = Array.from(
    new Set(
      products.flatMap((product) =>
        product.metadata ? Object.keys(product.metadata) : []
      )
    )
  );

  // Update available values when key changes
  useEffect(() => {
    if (selectedKey) {
      const values = Array.from(
        new Set(
          products
            .map((p) => p.metadata?.[selectedKey])
            .filter((v): v is string => v !== undefined)
        )
      );
      setAvailableValues(values);
      setSelectedValue(""); // Reset value when key changes
    } else {
      setAvailableValues([]);
      setSelectedValue("");
    }
  }, [selectedKey, products]);

  const filteredProducts = products.filter((product) => {
    // Search filtering
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    // Metadata filtering
    let metadataMatch = true;
    if (selectedKey) {
      if (selectedValue) {
        metadataMatch = product.metadata?.[selectedKey] === selectedValue;
      } else {
        // Show all products with this key (when value not selected)
        metadataMatch = product.metadata?.[selectedKey] !== undefined;
      }
    }

    return (nameMatch || descriptionMatch) && metadataMatch;
  });

  return (
    <div>
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter by metadata */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Product</option>
          {metadataKeys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          disabled={!selectedKey}
          className="rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="">Select Specific Model</option>
          {availableValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Display filtered products */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))
        ) : (
          <p>No products match your search criteria.</p>
        )}
      </ul>
    </div>
  );
};