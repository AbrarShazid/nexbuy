import { clientPromise } from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("NexBuy"); 

    const result = await db.collection("products").insertOne(body);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Error inserting product:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
