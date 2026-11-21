// Shared content shape for every ported restaurant-page template. One
// dashboard form (app/dashboard/restaurants/[id]/profile) fills this once;
// each PageTemplate renderer (Pagina1Page, Pagina3Page, ...) just displays
// the same fields with its own distinct visual design. Adding a new
// template should never require new dashboard fields unless it needs a
// genuinely new kind of content no existing template has.

export interface HeroData {
  headline?: string;
  tagline?: string;
}

export interface AboutData {
  title?: string;
  imageUrl?: string;
  bullets?: string[];
  stat?: string;
}

export interface MainDishData {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
}

export interface DailyOfferData {
  title?: string;
  imageUrl?: string;
  ingredients?: string[];
}

export interface WhyUsData {
  title?: string;
  description?: string;
  imageUrl?: string;
  stat?: string;
  features?: string[];
}

export interface TestimonialData {
  id: string;
  name: string;
  quote: string;
  photoUrl?: string;
}

export interface BlogPostData {
  id: string;
  title: string;
  imageUrl?: string;
  link?: string;
}

export interface PublicPageData {
  name: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  mapsUrl?: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  menuHref: string;
  hero?: HeroData;
  about?: AboutData;
  mainDishes?: MainDishData[];
  dailyOffer?: DailyOfferData;
  whyUs?: WhyUsData;
  testimonials?: TestimonialData[];
  blogPosts?: BlogPostData[];
}
