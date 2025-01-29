import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI); // Connection string from Atlas
const dbName = "ai-image";

let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so the MongoClient isn't created every time
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} else {
  clientPromise = client.connect();
}

export default clientPromise;
