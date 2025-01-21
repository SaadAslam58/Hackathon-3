"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";


const PaymentPage = () => {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
     


  };

  return (
    <div className="flex justify-center items-center h-auto w-full">
      <div className="flex flex-col justify-center items-center w-[90%] gap-5 mb-5">
        <h1 className="text-center md:text-[40px] text-[25px] font-bold">
          Payment Details
        </h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Full Name</legend>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border-[#111111] border-2 w-[350px] p-[10px] rounded-md text-[#111111]"
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
              />
            </fieldset>
          </div>
          <div>
          <Link
          href={"/Shipment"}
          >
          <Button type="submit" className="rounded-md w-full py-5 mt-2">
            Continue To Payment
          </Button>
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
