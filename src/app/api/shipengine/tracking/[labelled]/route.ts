import { shipengine } from "@/lib/helper/shipEngine";
import { NextRequest, NextResponse } from "next/server";

interface LabelParams {
  labelId: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: LabelParams }
) {
  const { labelId } = params;

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

    // ShipEngine API Call
    const label = await shipengine.trackUsingLabelId(labelId);

    // Debugging log for response
    console.log("ShipEngine Response:", label);

    return NextResponse.json(label, { status: 200 });
  } catch (err: any) {
    console.log("Error tracking shipment:", err.message);

    return NextResponse.json(
      { error: "An error occurred while tracking the shipment. Please try again later." },
      { status: 500 }
    );
  }
}
