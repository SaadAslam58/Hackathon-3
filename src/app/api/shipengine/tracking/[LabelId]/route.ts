import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const labelId = searchParams.get("labelId");

  if (!labelId) {
    return NextResponse.json(
      { error: "Label ID is required." },
      { status: 400 }
    );
  }

  // Validate Label ID Format (example validation)
  if (!/^[A-Z0-9]+$/.test(labelId)) {
    return NextResponse.json(
      { error: "Invalid Label ID format." },
      { status: 400 }
    );
  }

  try {
    // Debugging log
    console.log(`Tracking request received for Label ID: ${labelId}`);

    // Dummy data for response
    const dummyLabel = {
      trackingNumber: "1Z9999999999999999",
      statusDescription: "In Transit",
      carrierStatusDescription: "Package is on its way to the destination.",
      estimatedDeliveryDate: "2025-01-25",
      actualDeliveryDate: "",
      labelId: labelId
    };

    // Debugging log for response
    console.log("Dummy Response:", dummyLabel);

    return NextResponse.json(dummyLabel, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    console.log("Error tracking shipment:", error.message);

    return NextResponse.json(
      { error: "An error occurred while tracking the shipment. Please try again later." },
      { status: 500 }
    );
  }
}
