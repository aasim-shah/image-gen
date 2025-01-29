import clientPromise from "../mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("images");

      // Fetch all image URLs from the database
      const images = await collection.find().toArray();

      return res.status(200).json(images);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Database error", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
