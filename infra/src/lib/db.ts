import { MongoClient, type Db } from "mongodb";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

let cachedClient: MongoClient | undefined;
let cachedDb: Db | undefined;

const ssm = new SSMClient({});

/**
 * CloudFormation's `{{resolve:ssm-secure:...}}` dynamic reference isn't
 * supported in Lambda environment variables, so the Mongo URI is fetched at
 * runtime instead (once per cold start) via the plain parameter name in
 * MONGODB_URI_PARAM — never committed to the repo either way.
 */
async function fetchMongoUri(): Promise<string> {
  const paramName = process.env.MONGODB_URI_PARAM;
  if (!paramName) throw new Error("MONGODB_URI_PARAM is not set");
  const result = await ssm.send(new GetParameterCommand({ Name: paramName, WithDecryption: true }));
  const uri = result.Parameter?.Value;
  if (!uri) throw new Error(`SSM parameter ${paramName} has no value`);
  return uri;
}

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const uri = await fetchMongoUri();
  cachedClient = new MongoClient(uri, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
  });
  await cachedClient.connect();
  cachedDb = cachedClient.db(process.env.MONGODB_DB_NAME ?? "foodhub_local");
  return cachedDb;
}
