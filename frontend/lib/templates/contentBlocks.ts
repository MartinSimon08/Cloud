import type { PageTemplate } from "@/lib/models";

/**
 * Which optional content sections each page template actually renders.
 * Drives which editor sections show up in the dashboard profile form —
 * a section not listed here stays hidden for that template, but its data
 * (if already saved from a previous template choice) is never touched, so
 * switching templates back and forth never re-asks for or loses content.
 */
export type ContentBlockKey = "hero" | "about" | "mainDishes" | "dailyOffer" | "whyUs" | "testimonials" | "blogPosts";

export const PAGE_TEMPLATE_BLOCKS: Record<PageTemplate, ContentBlockKey[]> = {
  pagina1: ["hero", "about", "mainDishes", "whyUs"],
  pagina3: ["hero", "about", "mainDishes", "whyUs"],
  pagina4: ["hero", "about", "mainDishes", "dailyOffer", "whyUs", "testimonials", "blogPosts"],
  pagina5: ["hero", "about", "mainDishes", "whyUs", "testimonials", "blogPosts"],
  pagina6: ["hero", "about", "mainDishes", "dailyOffer", "whyUs", "testimonials", "blogPosts"],
};
