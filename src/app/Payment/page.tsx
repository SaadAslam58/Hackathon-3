"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useCart } from "@/components/Cart/CartContext"; // Import the useCart hook
import { useRouter } from "next/navigation";


const PaymentPage = () => {

  const { cartItems } = useCart(); // Use the useCart hook
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const [selectedMethod,setSelectedMethod] = useState<string>("")
  const handleMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(e.target.value);
  }


  const [formData, setFormData] = useState({
    fullName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postalCode: "",
    date: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
 

  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(()=> {
  const allFieldsFilled = Object.values(formData).every((field) => field !== "")
  const methodSelected = selectedMethod !== "";
  setIsFormValid(allFieldsFilled && methodSelected);
  },[formData,selectedMethod])

  const router = useRouter();  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid){
      router.push("/Shipment");

    }else {
      alert("Please fill in all required fields and select a payment method")
        }
  };
  return (
    <div className="flex justify-center items-center h-auto w-full">
      <div className="flex flex-col justify-center items-center w-[90%] gap-5 mb-5">
        <h1 className="text-center md:text-[40px] text-[25px] font-bold">
          Payment Details
        </h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit} >
          <fieldset>
            <legend>Full Name</legend>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border-[#111111] border-2 w-[350px] p-[10px] rounded-md text-[#111111]"
              required
            />
          </fieldset>
          <div className="flex gap-3">
            <fieldset>
              <legend>First Name</legend>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border-[#111111] border-2 w-[170px] p-[10px] rounded-md text-[#111111]"
                required
              />
            </fieldset>
            <fieldset>
              <legend>Last Name</legend>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border-[#111111] border-2 w-[170px] p-[10px] rounded-md text-[#111111]"
                required
              />
            </fieldset>
          </div>
          <fieldset>
            <legend>Email</legend>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-[#111111] border-2 w-[350px] p-[10px] rounded-md text-[#111111]"
              required
            />
          </fieldset>
          <fieldset>
            <legend>Phone</legend>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-[#111111] border-2 w-[350px] p-[10px] rounded-md text-[#111111]"
              required
            />
          </fieldset>
          <div className="flex gap-3">
            <fieldset>
              <legend>Postal Code</legend>
              <input
                type="number"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="border-[#111111] border-2 w-[170px] p-[10px] rounded-md text-[#111111]"
                required
              />
            </fieldset>
            <fieldset>
              <legend>Date</legend>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border-[#111111] border-2 w-[170px] p-[10px] rounded-md text-[#111111]"
                required
              />
              </fieldset>
          </div>
          <fieldset className="flex justify-between items-center ">
            <div className="flex justify-center items-center gap-5">
            <div>
            <label className="flex gap-1 justify-center items-center">
              <input type="radio" name="paymentMethod" value="Card" onChange={handleMethod} className="size-4" required/>
              <span>
              Card
              </span>
            </label>
            </div>
            <div>
            <label className="flex justify-center items-center gap-1">
              <input type="radio" name="paymentMethod" value="Cash" onChange={handleMethod} className="size-4" required/>
              <span> 
                 Cash
              </span>
            
            </label>
            </div>
            </div>
            <div>
            <p>
              {selectedMethod
              ? `${selectedMethod} method is selected` : "Please select a method"
              }
            </p>
            </div>
          </fieldset>
          <div className="flex justify-between items-center border-t-2 pt-2">
            <p>Total Price : </p>
            <p>PKR{totalPrice.toFixed(2)}</p>
          </div>
          <div>
              <Button type="submit" className="rounded-md w-full py-5 mt-2" disabled={!isFormValid}>
                Continue To Payment
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
