// /app/api/store-image/route.js
import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
  try {
    const { imageUrl } = await req.json(); // Use req.json() for parsing the request body

    console.log({ imageUrl });

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "Image URL is required" }), {
        status: 400,
      });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("images");

    // Insert image URL into the database
    await collection.insertOne({ imageUrl, createdAt: new Date() });

    return new Response(
      JSON.stringify({ message: "Image URL stored successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ error: "Database error", details: error.message }),
      { status: 500 }
    );
  }
}
