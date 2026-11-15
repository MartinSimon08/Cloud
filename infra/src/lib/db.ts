import { MongoClient, type Db } from "mongodb";

let cachedClient: MongoClient | undefined;
let cachedDb: Db | undefined;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  cachedClient = new MongoClient(uri, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
  });
  await cachedClient.connect();
  cachedDb = cachedClient.db(process.env.MONGODB_DB_NAME ?? "foodhub");
  return cachedDb;
}
