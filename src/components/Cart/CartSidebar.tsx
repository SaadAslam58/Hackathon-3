"use client"; // Add this directive

import { useCart } from "@/components/Cart/CartContext"; // Import the useCart hook
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CartItem {
  id: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const CartSidebar: React.FC = () => {
  const { cartItems, removeFromCart, isCartOpen, closeCart, updateQuantity } = useCart(); // Destructure closeCart, isCartOpen, and updateQuantity
  const [open, setOpen] = useState(false);

  // Sync the local state with the context state
  useEffect(() => {
    if (isCartOpen) {
      setOpen(true);
    } else {
      // Delay unmounting the component to allow the transition to finish
      const timer = setTimeout(() => setOpen(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen]);

  // Handle the increment and decrement of quantity
  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  if (!open) return null; // Don't render the sidebar if it's not open

  return (
    <div
      className={`fixed right-0 top-0 w-64 h-full bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}
    >
      <button onClick={closeCart} className="absolute top-4 right-4 text-lg font-bold">
        X {/* Close Button */}
      </button>
      <h2 className="text-xl font-bold">Your Cart</h2>
      <div className="mt-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item: CartItem) => (
            <div key={item.id} className="flex flex-col justify-center mb-4">
              <Link href="/Checkout" passHref>
                <div className="flex items-center cursor-pointer" onClick={closeCart}>
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    height={50}
                    width={50}
                    className="rounded-md"
                  />
                  <p className="ml-2 text-black">{item.productName}</p>
                </div>
              </Link>
              <div className="flex justify-between items-center mt-3 text-sm">
                <div>
                  <p>PKR {(item.price * item.quantity).toFixed(2)}</p> {/* Display the total price based on quantity */}
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 border rounded-md"
                    onClick={() => handleDecreaseQuantity(item.id)}
                    disabled={item.quantity <= 1} // Prevent decreasing below 1
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded-md"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-600">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
