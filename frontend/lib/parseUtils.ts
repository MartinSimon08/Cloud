import { ObjectId } from "mongodb";

export function randomId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function parseStringArray(raw: unknown): string[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const values = raw.filter((i): i is string => typeof i === "string" && i.trim().length > 0);
  return values.length > 0 ? values : undefined;
}

export function parseObjectId(raw: unknown): ObjectId | undefined {
  return typeof raw === "string" && ObjectId.isValid(raw) ? new ObjectId(raw) : undefined;
}

export function str(raw: unknown): string | undefined {
  return typeof raw === "string" && raw.trim() ? raw : undefined;
}

export function num(raw: unknown): number | undefined {
  return typeof raw === "number" && Number.isFinite(raw) && raw >= 0 ? raw : undefined;
}
