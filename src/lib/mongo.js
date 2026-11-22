import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "equipment_rental";


const globalForMongo = globalThis;
const client =
  globalForMongo.__rentalMongoClient ??
  new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    maxPoolSize: 10,
    maxIdleTimeMS: 60000,
  });

globalForMongo.__rentalMongoClient = client;

export const db = client.db(dbName);


export async function ensureMongoConnection() {
  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("[mongo] connection failed:", error?.message || error);
    throw error;
  }
}
