"use client";
import React from "react";
import { useCart } from "@/components/Cart/CartContext"; // Import the useCart hook
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CartCheckout: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Cart Items */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex  flex-col items-center justify-between border-b gap-3 py-4">
                  <div className="flex md:flex-row flex-col items-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      width={100}
                      height={100}
                      className="w-full md:w-[20%] rounded-md"
                    />
                    <div className="ml-4">
                      <p className="text-lg font-semibold">{item.productName}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-10 items-center">
                  <div className="flex  items-center">
                    <button
                      className="px-2 py-1 border rounded-md"
                      onClick={() => handleDecreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2 text-lg">{item.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded-md"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <div >
                    <p className="text-lg font-semibold">PKR : {(item.price * item.quantity).toFixed(2)}</p>
                     </div>
                    <div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600  block"
                    >
                      Remove
                    </button>
                    </div>
                 
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <p>{item.productName}</p>
                    <p>
                      PKR {item.price} x {item.quantity} = PKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <p>Total</p>
                  <p>
                    PKR : {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                 <Link
                 href={"/Payment"}
                 >
                  <Button className="w-full">Proceed to Payment</Button>
           </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartCheckout;
