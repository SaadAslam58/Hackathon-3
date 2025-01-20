"use client";
import React, { useState } from "react";
import axios from "axios";
import { Address, Rate, trackingObjType } from "../../../type";
import { cartProductsWhichCanBeShipped } from "@/lib/helper/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ShippingRatesPage: React.FC = () => {
  const [shipeToAddress, setshipeToAddress] = useState<Address>({
    name: "John Doe",
    phone: "+1 555-678-1234",
    addressLine1: "1600 Pennsylvania Avenue NW",
    addressLine2: "",
    cityLocality: "Washington",
    stateProvince: "DC",
    postalCode: "20500",
    countryCode: "US",
    addressResidentialIndicator: "no",
  });

  const [rates, setRates] = useState<Rate[]>([]);
  const [rateId, setRateId] = useState<string | null>(null);
  const [labelPdf, setLabelPdf] = useState<string | null>(null);
  const [trackingObj, setTrackingObj] = useState<trackingObjType | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setRates([]);

    try {
      const response = await axios.post("/api/shipengine/get-rates", {
        shipeToAddress,
        packages: cartProductsWhichCanBeShipped.map((product) => ({
          weight: product.weight,
          dimensions: product.dimensions,
        })),
      });
      setRates(response.data.shipmentDetails.rateResponse.rates);
    } catch (error) {
      console.error(error);
      setErrors(["An error occurred while fetching rates."]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLabel = async () => {
    if (!rateId) {
      alert("Please select a rate to create a label.");
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const response = await axios.post("/api/shipengine/label", { rateId });
      const labelData = response.data;
      setLabelPdf(labelData.labelDownload.href);
      setTrackingObj({
        trackingNumber: labelData.trackingNumber,
        labelId: labelData.labelId,
        carrierCode: labelData.carrierCode,
      });
    } catch (error) {
      console.error(error);
      setErrors(["An error occurred while creating the label."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Shipping Rates and Labels
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Address Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Ship To Address
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.entries(shipeToAddress).map(([key, value]) => (
                <input
                  key={key}
                  type="text"
                  placeholder={key.replace(/([A-Z])/g, " $1").trim()}
                  value={value}
                  onChange={(e) =>
                    setshipeToAddress({ ...shipeToAddress, [key]: e.target.value })
                  }
                  className="w-full p-3 border rounded-md text-gray-700"
                  required={key !== "addressLine2"}
                />
              ))}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Fetching Rates..." : "Get Shipping Rates"}
              </Button>
            </form>
          </div>

          {/* Rates Section */}
          <div>
            {rates.length > 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Available Rates
                </h2>
                {rates.map((rate) => (
                  <div
                    key={rate.rateId}
                    onClick={() => setRateId(rate.rateId)}
                    className={`p-4 border rounded-md cursor-pointer ${
                      rateId === rate.rateId ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                  >
                    <p className="font-semibold text-gray-800">
                      {rate.carrierFriendlyName}
                    </p>
                    <p className="text-sm text-gray-600">{rate.serviceType}</p>
                    <p className="font-bold text-gray-800">
                      {rate.shippingAmount.amount} {rate.shippingAmount.currency}
                    </p>
                  </div>
                ))}
                <Button
                  onClick={handleCreateLabel}
                  disabled={!rateId || loading}
                  className="w-full"
                >
                  {loading ? "Creating Label..." : "Create Label"}
                </Button>
              </div>
            ) : (
              <p className="text-gray-600">No rates available. Please enter address and fetch rates.</p>
            )}
          </div>
        </div>

        {/* Label and Tracking Section */}
        {labelPdf && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-center">
            <Link href={labelPdf} target="_blank">
              <Button className="w-full">Download Label</Button>
            </Link>
          </div>
        )}

        {trackingObj && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Tracking Information
            </h2>
            <p className="text-gray-800">Tracking Number: {trackingObj.trackingNumber}</p>
            <p className="text-gray-800">Label ID: {trackingObj.labelId}</p>
            <p className="text-gray-800">Carrier Code: {trackingObj.carrierCode}</p>
            <Link href={`/tracking/?labelId=${trackingObj.labelId}`}>
              <Button className="w-full mt-4">Track Shipment</Button>
            </Link>
          </div>
        )}

        {errors.length > 0 && (
          <div className="mt-8 bg-red-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Errors</h2>
            {errors.map((error, index) => (
              <p key={index} className="text-red-500">{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingRatesPage;
