import type { MenuItemDoc } from "./models";
import { randomId, parseStringArray, parseImageKey } from "./parseUtils";

export function parseItems(raw: unknown): MenuItemDoc[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null && typeof (item as Record<string, unknown>).name === "string"
    )
    .map((item) => ({
      id: typeof item.id === "string" && item.id ? item.id : randomId(),
      name: item.name as string,
      description: typeof item.description === "string" ? item.description : undefined,
      ingredients: parseStringArray(item.ingredients),
      price: typeof item.price === "number" ? item.price : 0,
      category: typeof item.category === "string" ? item.category : undefined,
      photoKey: parseImageKey(item.photoKey),
    }));
}
