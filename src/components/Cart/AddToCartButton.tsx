"use client"; // Add this directive

import React from 'react';
import { useCart } from '@/components/Cart/CartContext';

interface AddToCartButtonProps {
  item: { id: number; productName: string; price: number; image: string,quantity: number,description:string, inventory:number  }; // Using `image` here
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Adjust the object passed to addToCart to use `imageUrl` instead of `image`
    const cartItem = {
      id: item.id,
      productName: item.productName,
      price: item.price,
      imageUrl: item.image, // Use `imageUrl` here to match CartContext
      quantity: item.quantity,
      inventory: item.inventory,
      description: item.description
    };
    addToCart(cartItem); // Add item to the cart
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCartButton;
