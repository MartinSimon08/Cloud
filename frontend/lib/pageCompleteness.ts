import type { ContentBlockKey } from "@/lib/templates/contentBlocks";

// Shared between the dashboard editor (client, works on lib/api.ts's `Page`)
// and the public route (server, works on lib/models.ts's `PageDoc`) — both
// use plain string S3 keys for images, so one structural type covers both.
export interface CompletenessCheckablePage {
  about?: { title?: string | null; bullets?: string[] | null } | null;
  mainDishes?: unknown[] | null;
  dailyOffer?: { title?: string | null; ingredients?: string[] | null } | null;
  whyUs?: { title?: string | null; description?: string | null } | null;
  testimonials?: unknown[] | null;
  blogPosts?: unknown[] | null;
}

export interface CompletenessCheckableRestaurant {
  logoImageKey?: unknown;
  mapsUrl?: string | null;
  mapsUrlEnabled?: boolean | null;
}

export function isValidUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// Which blocks can actually block publishing/showing when empty, their
// friendly name, and how to tell "filled in" from "still empty" — mirrors
// the "Necesita..." hint text next to each section in the page editor.
// "hero" is deliberately excluded: it always has a usable fallback (the
// restaurant's own name/description).
const REQUIRABLE_BLOCKS: { key: ContentBlockKey; label: string; isFilled: (p: CompletenessCheckablePage) => boolean }[] = [
  { key: "about", label: "Sobre nosotros", isFilled: (p) => !!p.about?.title && (p.about?.bullets?.length ?? 0) > 0 },
  { key: "mainDishes", label: "Platos destacados", isFilled: (p) => (p.mainDishes?.length ?? 0) > 0 },
  {
    key: "dailyOffer",
    label: "Oferta del día",
    isFilled: (p) => !!p.dailyOffer?.title && (p.dailyOffer?.ingredients?.length ?? 0) > 0,
  },
  { key: "whyUs", label: "Por qué elegirnos", isFilled: (p) => !!p.whyUs?.title && !!p.whyUs?.description },
  { key: "testimonials", label: "Testimonios", isFilled: (p) => (p.testimonials?.length ?? 0) > 0 },
  { key: "blogPosts", label: "Blog / novedades", isFilled: (p) => (p.blogPosts?.length ?? 0) > 0 },
];

export function missingBlockLabels(page: CompletenessCheckablePage, blocks: ContentBlockKey[]): string[] {
  return REQUIRABLE_BLOCKS.filter((b) => blocks.includes(b.key) && !b.isFilled(page)).map((b) => b.label);
}

// Restaurant-level requirements (logo, a real Maps link) — these live in
// "Datos generales", not in a page's own content, but a page still can't go
// live without them: every published page uses the same logo, and the Maps
// link is shown wherever the page shows contact info. A contact field the
// owner explicitly turned off (*Enabled === false) is never required.
export function missingRestaurantLabels(restaurant: CompletenessCheckableRestaurant): string[] {
  const missing: string[] = [];
  if (!restaurant.logoImageKey) missing.push("Logo (en Datos generales)");
  if (restaurant.mapsUrlEnabled !== false && !isValidUrl(restaurant.mapsUrl)) {
    missing.push("Link de Google Maps válido (en Datos generales)");
  }
  return missing;
}
