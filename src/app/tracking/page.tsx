"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TrackingData } from "../../../type";

const TrackingPage = () => {
  const [labelId, setLabelId] = useState<string>("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const queryLabelId = searchParams?.get("labelId") || "";

  const fetchTrackingData = useCallback(async (id: string) => {
    const dummyTrackingData: TrackingData = {
      trackingNumber: "1Z9999999999999999",
      statusDescription: "In Transit",
      carrierStatusDescription: "Package is on its way to the destination.",
      estimatedDeliveryDate: "2025-01-25",
      actualDeliveryDate: "",
    };

    if (!id) {
      setErrorMessage("Label ID is required.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // Simulating an API call delay
    setTimeout(() => {
      setTrackingInfo(dummyTrackingData); // Using dummy data
      setIsLoading(false);
      router.replace(`/tracking?labelId=${id}`);
    }, 1000); // Simulated delay of 1 second
  }, [router]);

  useEffect(() => {
    if (queryLabelId) {
      setLabelId(queryLabelId);
      fetchTrackingData(queryLabelId);
    }
  }, [queryLabelId, fetchTrackingData]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchTrackingData(labelId);
  };

  return (
    <main className="flex items-center justify-center mt-5 h-full md:min-h-screen bg-gray-100 text-gray-900">
      <div className="w-full my-5 max-w-3xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Track Your Shipment
        </h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="labelId"
              className="block text-lg font-medium text-gray-700"
            >
              Label ID / Tracking Number
            </label>
            <input
              type="text"
              id="labelId"
              value={labelId}
              onChange={(e) => setLabelId(e.target.value)}
              placeholder="e.g., 1Z9999999999999999"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Tracking..." : "Track Shipment"}
          </button>
        </form>

        {errorMessage && (
          <div className="mt-6 p-4 bg-red-100 text-red-600 border border-red-300 rounded-lg">
            {errorMessage}
          </div>
        )}

        {trackingInfo && (
          <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-none md:rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Tracking Information
            </h2>
            <ul className="space-y-4">
              <li>
                <strong>Tracking Number:</strong> {trackingInfo.trackingNumber}
              </li>
              <li>
                <strong>Status:</strong> {trackingInfo.statusDescription}
              </li>
              <li>
                <strong>Carrier Status:</strong> {trackingInfo.carrierStatusDescription}
              </li>
              <li>
                <strong>Estimated Delivery:</strong> {trackingInfo.estimatedDeliveryDate}
              </li>
              <li>
                <strong>Actual Delivery:</strong> {trackingInfo.actualDeliveryDate || "Pending"}
              </li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default TrackingPage;
