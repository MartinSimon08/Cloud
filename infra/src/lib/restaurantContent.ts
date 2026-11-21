import type { HeroContent, AboutContent, MainDishCard, DailyOffer, WhyUsContent, Testimonial, BlogPost } from "./models";
import { randomId, parseStringArray, parseImageKey, str, num } from "./parseUtils";

/**
 * Each parser below requires a section's "key fields" together before it's
 * persisted at all — a section with only one stray field filled renders as
 * an empty-looking husk on the public page, so it's dropped entirely rather
 * than saved half-filled. Fields not listed as required are bonus/optional.
 */

export function parseHero(raw: unknown): HeroContent | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const r = raw as Record<string, unknown>;
  const hero: HeroContent = { headline: str(r.headline), tagline: str(r.tagline) };
  return hero.headline || hero.tagline ? hero : undefined;
}

/** Key fields: title + bullets. */
export function parseAbout(raw: unknown): AboutContent | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const r = raw as Record<string, unknown>;
  const title = str(r.title);
  const bullets = parseStringArray(r.bullets);
  if (!title || !bullets) return undefined;
  return { title, bullets, imageKey: parseImageKey(r.imageKey), stat: str(r.stat) };
}

/** Key fields per card: title + description. */
export function parseMainDishes(raw: unknown): MainDishCard[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const dishes = raw
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({ item, title: str(item.title), description: str(item.description) }))
    .filter((d): d is { item: Record<string, unknown>; title: string; description: string } => !!d.title && !!d.description)
    .map(({ item, title, description }) => ({
      id: typeof item.id === "string" && item.id ? item.id : randomId(),
      title,
      description,
      imageKey: parseImageKey(item.imageKey),
      price: num(item.price),
    }));
  return dishes.length > 0 ? dishes : undefined;
}

/** Key fields: title + ingredients. */
export function parseDailyOffer(raw: unknown): DailyOffer | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const r = raw as Record<string, unknown>;
  const title = str(r.title);
  const ingredients = parseStringArray(r.ingredients);
  if (!title || !ingredients) return undefined;
  return { title, ingredients, imageKey: parseImageKey(r.imageKey) };
}

/** Key fields: title + description. */
export function parseWhyUs(raw: unknown): WhyUsContent | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const r = raw as Record<string, unknown>;
  const title = str(r.title);
  const description = str(r.description);
  if (!title || !description) return undefined;
  return { title, description, imageKey: parseImageKey(r.imageKey), stat: str(r.stat), features: parseStringArray(r.features) };
}

/** Key fields per testimonial: name + quote. */
export function parseTestimonials(raw: unknown): Testimonial[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const testimonials = raw
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({ item, name: str(item.name), quote: str(item.quote) }))
    .filter((t): t is { item: Record<string, unknown>; name: string; quote: string } => !!t.name && !!t.quote)
    .map(({ item, name, quote }) => ({
      id: typeof item.id === "string" && item.id ? item.id : randomId(),
      name,
      quote,
      photoKey: parseImageKey(item.photoKey),
    }));
  return testimonials.length > 0 ? testimonials : undefined;
}

/** Key fields per post: title + image (a teaser card with no photo and no body reads as broken). */
export function parseBlogPosts(raw: unknown): BlogPost[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const posts = raw
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({ item, title: str(item.title), imageKey: parseImageKey(item.imageKey) }))
    .filter((p): p is { item: Record<string, unknown>; title: string; imageKey: string } => !!p.title && !!p.imageKey)
    .map(({ item, title, imageKey }) => ({
      id: typeof item.id === "string" && item.id ? item.id : randomId(),
      title,
      imageKey,
      link: str(item.link),
    }));
  return posts.length > 0 ? posts : undefined;
}
