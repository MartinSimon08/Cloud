import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getCaller } from "../../lib/auth";
import { json } from "../../lib/http";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 2 * 1024 * 1024; // 2MB backstop — the client resizes before upload
const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const s3 = new S3Client({});

export async function handler(
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> {
  try {
    // Identity isn't otherwise used here, but this throws (→ 500 caught below
    // as a generic error) if the Cognito authorizer didn't run — upload stays
    // authenticated-only, same as the old /api/images POST.
    getCaller(event);

    const body = parseBody(event.body);
    const contentType = typeof body.contentType === "string" ? body.contentType : "";
    if (!ALLOWED_TYPES.has(contentType)) {
      return json(400, { error: "Formato no soportado (usá JPEG, PNG o WEBP)" });
    }
    if (typeof body.data !== "string" || !body.data) {
      return json(400, { error: "Falta el archivo" });
    }

    const buffer = Buffer.from(body.data, "base64");
    if (buffer.byteLength > MAX_BYTES) {
      return json(400, { error: "La imagen es demasiado grande (máx. 2MB)" });
    }

    const bucket = process.env.IMAGES_BUCKET;
    if (!bucket) throw new Error("IMAGES_BUCKET is not set");

    const key = `public/${randomId()}.${EXTENSIONS[contentType]}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    return json(201, { key });
  } catch (err) {
    console.error(err);
    return json(500, { error: "internal error" });
  }
}

function parseBody(body: string | undefined): Record<string, unknown> {
  if (!body) return {};
  try {
    const parsed = JSON.parse(body);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function randomId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
