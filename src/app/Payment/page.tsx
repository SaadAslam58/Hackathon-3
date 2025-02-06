"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useCart } from "@/components/Cart/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";

const PaymentPage = () => {
  const { cartItems, resetCart } = useCart();
  const router = useRouter();

  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    date: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
    city: "",
    country: "",
    state: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(e.target.value);
  };

  useEffect(() => {
    const requiredFields =
      selectedMethod === "Card"
        ? [
            "fullName",
            "email",
            "phone",
            "postalCode",
            "date",
            "cardNumber",
            "expiry",
            "cvv",
            "address",
            "city",
            "country",
            "state",
          ]
        : [
            "fullName",
            "email",
            "phone",
            "postalCode",
            "date",
            "address",
            "city",
            "country",
            "state",
          ];

    const isValid = requiredFields.every(
      (field) => formData[field as keyof typeof formData].trim() !== ""
    );

    setIsFormValid(isValid && selectedMethod !== "");
  }, [formData, selectedMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert("Please complete all required fields");
      return;
    }

    try {
      const response = await fetch("/api/submit-person", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          paymentMethod: selectedMethod,
          totalPrice: parseFloat(totalPrice.toFixed(2)),
          cartItems,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit data");

      resetCart();
      setPaymentSuccess(true);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed, please try again.");
    }
  };

  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center">
          <div className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
            Payment Successful!
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Order Summary Section */}
          <div className="md:w-1/3 bg-blue-50 p-6 border-r border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center border-b pb-4">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={urlFor(item.imageUrl).url()}
                      alt={item.productName}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="font-medium text-gray-800">
                      PKR {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-lg font-semibold">
                Total: <span className="text-blue-600">PKR {totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* Payment Details Form */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Payment Details</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal and Shipping Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                  </div>
                </div>

                {/* Shipping Details */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* New Order Date Field */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Order Date</h2>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Card"
                      onChange={handleMethod}
                      className="h-5 w-5"
                      required
                    />
                    <FaCreditCard className="text-blue-600" size={24} />
                    Card
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash"
                      onChange={handleMethod}
                      className="h-5 w-5"
                      required
                    />
                    <FaMoneyBillWave className="text-green-600" size={24} />
                    Cash
                  </label>
                </div>

                {/* Card Details */}
                {selectedMethod === "Card" && (
                  <div className="space-y-4 mt-4">
                    <h3 className="text-lg font-semibold">Card Details</h3>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="expiry"
                        placeholder="Expiry (MM/YY)"
                        value={formData.expiry}
                        onChange={handleChange}
                        className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-md text-lg font-semibold"
                  disabled={!isFormValid || paymentSuccess}
                >
                  Continue To Payment
                </Button>
              </div>
            </form>

            {/* Continue Shopping Button */}
            {paymentSuccess && (
              <div className="mt-6">
                <Button
                  type="button"
                  className="w-full py-3 bg-green-600 hover:bg-green-700 transition-colors text-white rounded-md text-lg font-semibold"
                  onClick={() => router.push("/")}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
