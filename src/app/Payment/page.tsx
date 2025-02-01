"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useCart } from "@/components/Cart/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

const PaymentPage = () => {
  const { cartItems, resetCart } = useCart();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const router = useRouter();

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
  
  // paymentSuccess indicates payment has been processed successfully
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // showSuccessPopup controls the banner popup display
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(e.target.value);
  };

  const [isFormValid, setIsFormValid] = useState(false);
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
        : ["fullName", "email", "phone", "postalCode", "date", "address", "city", "country", "state"];

    setIsFormValid(
      requiredFields.every(
        (field) => formData[field as keyof typeof formData] !== ""
      ) && selectedMethod !== ""
    );
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

      // Clear the cart
      resetCart();
      // Set payment as successful and show the success banner
      setPaymentSuccess(true);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Submission failed, please try again.");
    }
  };

  // Hide the popup banner after 3 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  return (
    <div className="relative">
      {/* Popup banner at the top */}
      {showSuccessPopup && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-50">
          Payment Successful!
        </div>
      )}
      <div className="flex justify-center items-center py-10 w-full">
        <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg space-y-6">
          <h1 className="text-3xl font-bold text-center">Payment Details</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Image
              src="/paymnet-banner.webp"
              alt="Payment Banner"
              width={500}
              height={200}
              className="rounded-lg"
            />
            <fieldset>
              <legend className="font-semibold">Full Name</legend>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </fieldset>
            <fieldset className="flex gap-3">
              <div>
                <legend>First Name</legend>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <legend>Last Name</legend>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </fieldset>
            <fieldset className="flex gap-3">
              <div>
                <legend>Email</legend>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <legend>Phone</legend>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </fieldset>
            <fieldset className="flex gap-3">
              <div>
                <legend>Country</legend>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <legend>City</legend>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </fieldset>
            <fieldset className="flex gap-3">
              <div>
                <legend>Address</legend>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <legend>State</legend>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </fieldset>
            <fieldset className="flex gap-3">
              <div>
                <legend>Postal Code</legend>
                <input
                  type="number"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <legend>Date</legend>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-semibold">Payment Method</legend>
              <div className="flex gap-5">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    onChange={handleMethod}
                    className="size-4"
                    required
                  />
                  <FaCreditCard className="text-blue-600" /> Card
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    onChange={handleMethod}
                    className="size-4"
                    required
                  />
                  <FaMoneyBillWave className="text-green-600" /> Cash
                </label>
              </div>
            </fieldset>
            {selectedMethod === "Card" && (
              <fieldset className="space-y-2">
                <legend className="font-semibold">Card Details</legend>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </fieldset>
            )}
            <div className="flex justify-between items-center border-t pt-2">
              <p>Total Price:</p>
              <p className="font-bold">PKR {totalPrice.toFixed(2)}</p>
            </div>
            {/* Payment button remains always visible but becomes disabled on success */}
            <Button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-md"
              disabled={paymentSuccess || !isFormValid}
            >
              Continue To Payment
            </Button>
            {/* When payment is successful, show the "Continue Shopping" button with a fade-in transition */}
            {paymentSuccess && (
              <div className="mt-4 transition-opacity duration-500 ease-in-out opacity-100">
                <Button
                  type="button"
                  className="w-full py-4 bg-blue-600 text-white rounded-md"
                  onClick={() => router.push("/")}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
