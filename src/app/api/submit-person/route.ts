import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

// Initialize Sanity Client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', // Your dataset name
  apiVersion: '2023-05-03', // Use the current date for the latest API version
  token: process.env.SANITY_API_TOKEN, // Your Sanity API token with write access
  useCdn: false, // Ensure we use the API and not the CDN
});

// Define the POST handler
export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const body = await request.json();

    // Validate the required fields
    if (!body.fullName || !body.email || !body.paymentMethod || !body.totalPrice || !body.cartItems) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a new document in Sanity
    const result = await sanityClient.create({
      _type: 'person', // The document type (matches your schema name)
      fullName: body.fullName,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      postalCode: body.postalCode,
      date: body.date,
      paymentMethod: body.paymentMethod,
      totalPrice: body.totalPrice,
      cartItems: body.cartItems,
      address: body.address,
      state: body.state,
      country: body.country,
      city: body.city,
      cardNumber: body.cardNumber,
      expiry: body.expiry,
      cvv: body.cvv,
    });

    // Return a success response
    return NextResponse.json(
      { message: 'Data submitted successfully!', result },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error submitting data to Sanity:', error);
    return NextResponse.json(
      { message: 'Failed to submit data', error: (error as Error).message },
      { status: 500 }
    );
  }
}
