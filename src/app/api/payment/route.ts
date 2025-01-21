import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client"; // Ensure this path is correct

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON body
    const { fullName, firstName, lastName, email, phone, postalCode, date } = body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Sanity document creation
    const document = {
      _type: "paymentDetails",
      fullName,
      firstName,
      lastName,
      email,
      phone,
      postalCode,
      date,
    };

    await client.create(document);

    return NextResponse.json({ message: "Payment details saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving payment details:", error);
    return NextResponse.json({ error: "Failed to save payment details" }, { status: 500 });
  }
}
