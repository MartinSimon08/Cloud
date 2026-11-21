import type { ObjectId } from "mongodb";

export type PageTemplate = "pagina1" | "pagina3" | "pagina4" | "pagina5" | "pagina6";
export type MenuTemplate = "menu1" | "menu2" | "menu3" | "menu4" | "menu5";

export interface HeroContent {
  headline?: string;
  tagline?: string;
}

export interface AboutContent {
  title?: string;
  imageKey?: string;
  bullets?: string[];
  stat?: string;
}

export interface MainDishCard {
  id: string;
  title: string;
  description?: string;
  imageKey?: string;
  price?: number;
}

export interface DailyOffer {
  title?: string;
  imageKey?: string;
  ingredients?: string[];
}

export interface WhyUsContent {
  title?: string;
  description?: string;
  imageKey?: string;
  stat?: string;
  features?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  photoKey?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  imageKey?: string;
  link?: string;
}

export interface RestaurantDoc {
  _id: ObjectId;
  ownerId: string; // Cognito sub
  slug: string;
  name: string;
  description: string;
  address?: string;
  phone?: string;
  phoneEnabled?: boolean;
  email?: string;
  emailEnabled?: boolean;
  hours?: string;
  hoursEnabled?: boolean;
  mapsUrl?: string;
  mapsUrlEnabled?: boolean;
  instagram?: string;
  instagramEnabled?: boolean;
  facebook?: string;
  facebookEnabled?: boolean;
  whatsapp?: string;
  whatsappEnabled?: boolean;
  logoImageKey?: string;
  coverImageKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * A restaurant can have several saved pages (different designs/content) —
 * only one can be `published` at a time, enforced server side in the pages
 * Lambda. This is the page equivalent of MenuDoc.
 */
export interface PageDoc {
  _id: ObjectId;
  restaurantId: ObjectId;
  ownerId: string;
  name: string;
  pageTemplate: PageTemplate;
  published: boolean;
  hero?: HeroContent;
  about?: AboutContent;
  mainDishes?: MainDishCard[];
  dailyOffer?: DailyOffer;
  whyUs?: WhyUsContent;
  testimonials?: Testimonial[];
  blogPosts?: BlogPost[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItemDoc {
  id: string;
  name: string;
  description?: string;
  ingredients?: string[];
  price: number;
  category?: string;
  photoKey?: string;
}

/**
 * A restaurant can have several saved menus (cartas) — only one can be
 * `published` at a time, enforced server side in the menus Lambda. Each menu
 * picks its own design, same as pages do with `pageTemplate`.
 */
export interface MenuDoc {
  _id: ObjectId;
  restaurantId: ObjectId;
  ownerId: string;
  name: string;
  description: string;
  menuTemplate: MenuTemplate;
  published: boolean;
  items: MenuItemDoc[];
  createdAt: Date;
  updatedAt: Date;
}

export type PlanFeature = "page" | "menu" | "both";
export type BillingCycle = "monthly" | "annual";
export type SubscriptionStatus = "active" | "canceled";

/** One per restaurant — gates whether its page/menu can be published. */
export interface SubscriptionDoc {
  _id: ObjectId;
  restaurantId: ObjectId;
  ownerId: string;
  feature: PlanFeature;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  basePrice: number;
  monthlyEquivalent: number;
  amount: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}
