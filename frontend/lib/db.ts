import { MongoClient, type Db } from "mongodb";

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  // Cache the connection on `global` so Next.js's dev-mode hot reload
  // doesn't open a new MongoClient (and new connection pool) on every edit.
  if (!global.__mongoClientPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    global.__mongoClientPromise = client.connect();
  }
  return global.__mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB_NAME ?? "foodhub_local");
}
