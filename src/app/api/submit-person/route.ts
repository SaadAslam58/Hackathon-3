import { createClient } from '@sanity/client';
import { NextResponse } from 'next/server';

interface CartItem {
  _key?: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  productName: string;
}

interface PaymentDoc {
  _type: 'person';
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  state: string;
  postalCode: string;
  date: string; // or Date if you're sending a Date object
  paymentMethod: string;
  totalPrice: number;
  cartItems: CartItem[];
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

// Helper to generate a unique key for each cart item
const generateKey = () => Math.random().toString(36).substring(2, 15);

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
    const requiredFields = [
      'fullName',
      'firstName',
      'lastName',
      'email',
      'phone',
      'country',
      'city',
      'address',
      'state',
      'postalCode',
      'date',
      'paymentMethod',
      'totalPrice',
      'cartItems',
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Ensure each cart item has a unique _key and map productName to name
    const cartItemsWithKeys: CartItem[] = body.cartItems.map((item:CartItem) => ({
      _key: item._key || generateKey(),
      id: item.id,
      name: item.productName, // mapping productName to the "name" field
      price: item.price,
      quantity: item.quantity,
    }));

    // Build the payload to match the schema
    const payload: PaymentDoc = {
      _type: 'person', // Must match your schema's document type
      fullName: body.fullName,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      country: body.country,
      city: body.city,
      address: body.address,
      state: body.state,
      postalCode: body.postalCode,
      date: body.date,
      paymentMethod: body.paymentMethod,
      totalPrice: body.totalPrice,
      cartItems: cartItemsWithKeys, // Now includes _key and correct name mapping
    };

    // Only include card details if paymentMethod is "Card"
    if (body.paymentMethod === 'Card') {
      payload.cardNumber = body.cardNumber;
      payload.expiry = body.expiry;
      payload.cvv = body.cvv;
    }

    // Create a new document in Sanity
    const result = await sanityClient.create(payload);

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
