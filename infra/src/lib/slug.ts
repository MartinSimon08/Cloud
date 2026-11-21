import type { Db, ObjectId } from "mongodb";

export function slugify(input: string): string {
  return (
    input
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "") // strip accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "restaurante"
  );
}

/** Generates a unique restaurants.slug from `name`, appending -2, -3, ... on collision. */
export async function generateUniqueSlug(db: Db, name: string, excludeId?: ObjectId): Promise<string> {
  const base = slugify(name);
  const restaurants = db.collection("restaurants");

  let candidate = base;
  let suffix = 2;
  while (await restaurants.findOne({ slug: candidate, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

/** Strict check used when the owner explicitly edits their slug (no auto-suffixing). */
export async function isSlugAvailable(db: Db, slug: string, excludeId?: ObjectId): Promise<boolean> {
  const existing = await db
    .collection("restaurants")
    .findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) });
  return !existing;
}
