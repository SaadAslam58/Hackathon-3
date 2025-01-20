import { NextResponse } from "next/server";
import data from '@/productData/products.json'

export function GET() {
  return NextResponse.json({ success: true, data: data })
}