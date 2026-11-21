import { getIdToken } from "@/lib/auth";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function authHeaders(): Promise<Record<string, string>> {
  const idToken = await getIdToken();
  return idToken ? { authorization: `Bearer ${idToken}` } : {};
}

/**
 * Hits this Next.js app's own /api/* route handlers (same origin) — only
 * billing and admin still live here; everything else (restaurants, pages,
 * menus, images) lives behind API Gateway, see `lambdaRequest` below.
 */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(await authHeaders()),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, typeof body.error === "string" ? body.error : res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

/** Hits the API Gateway + Lambda backend (restaurants/pages/menus), authenticated with the Cognito ID token. */
async function lambdaRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) throw new Error("Falta configurar NEXT_PUBLIC_API_BASE_URL");

  const res = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(await authHeaders()),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, typeof body.error === "string" ? body.error : res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

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

export interface Restaurant {
  _id: string;
  ownerId: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  _id: string;
  restaurantId: string;
  ownerId: string;
  name: string;
  pageTemplate: string;
  published: boolean;
  hero?: HeroContent;
  about?: AboutContent;
  mainDishes?: MainDishCard[];
  dailyOffer?: DailyOffer;
  whyUs?: WhyUsContent;
  testimonials?: Testimonial[];
  blogPosts?: BlogPost[];
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  ingredients?: string[];
  price: number;
  category?: string;
  photoKey?: string;
}

export interface Menu {
  _id: string;
  restaurantId: string;
  ownerId: string;
  name: string;
  description: string;
  menuTemplate: string;
  published: boolean;
  items: MenuItem[];
  createdAt: string;
  updatedAt: string;
}

export type PlanFeature = "page" | "menu" | "both";
export type BillingCycle = "monthly" | "annual";

export interface Subscription {
  _id: string;
  restaurantId: string;
  ownerId: string;
  feature: PlanFeature;
  billingCycle: BillingCycle;
  status: "active" | "canceled";
  basePrice: number;
  monthlyEquivalent: number;
  amount: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  _id: string;
  subscriptionId: string;
  restaurantId: string;
  ownerId: string;
  feature: PlanFeature;
  billingCycle: BillingCycle;
  amount: number;
  periodStart: string;
  periodEnd: string;
  paidAt: string;
}

export interface PriceQuote {
  feature: PlanFeature;
  billingCycle: BillingCycle;
  basePrice: number;
  monthlyEquivalent: number;
  amount: number;
}

export interface BillingInfo {
  subscription: Subscription | null;
  isActive: boolean;
  payments: Payment[];
  quotes: PriceQuote[];
  isAdmin: boolean;
}

export interface AdminUserSummary {
  _id: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  restaurantsCount: number;
  pagesCount: number;
  menusCount: number;
  mrr: number;
  activeSubscriptionsCount: number;
}

export interface AdminUserDetail {
  _id: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  mrr: number;
  totalPaid: number;
  restaurants: Array<Restaurant & { pages: Page[]; menus: Menu[]; subscription: Subscription | null; totalPaid: number }>;
}

export const api = {
  listRestaurants: () => lambdaRequest<Restaurant[]>("/restaurants"),
  createRestaurant: (data: { name: string; description?: string; address?: string }) =>
    lambdaRequest<Restaurant>("/restaurants", { method: "POST", body: JSON.stringify(data) }),
  getRestaurant: (id: string) => lambdaRequest<Restaurant>(`/restaurants/${id}`),
  updateRestaurant: (
    id: string,
    data: Partial<
      Pick<
        Restaurant,
        | "name"
        | "description"
        | "address"
        | "phone"
        | "phoneEnabled"
        | "email"
        | "emailEnabled"
        | "hours"
        | "hoursEnabled"
        | "mapsUrl"
        | "mapsUrlEnabled"
        | "instagram"
        | "instagramEnabled"
        | "facebook"
        | "facebookEnabled"
        | "whatsapp"
        | "whatsappEnabled"
        | "logoImageKey"
        | "coverImageKey"
        | "slug"
      >
    >
  ) => lambdaRequest<Restaurant>(`/restaurants/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteRestaurant: (id: string) => lambdaRequest<void>(`/restaurants/${id}`, { method: "DELETE" }),

  listPages: (restaurantId: string) => lambdaRequest<Page[]>(`/restaurants/${restaurantId}/pages`),
  createPage: (restaurantId: string, data: { name: string; pageTemplate?: string }) =>
    lambdaRequest<Page>(`/restaurants/${restaurantId}/pages`, { method: "POST", body: JSON.stringify(data) }),
  getPage: (pageId: string) => lambdaRequest<Page>(`/pages/${pageId}`),
  updatePage: (
    pageId: string,
    data: Partial<
      Pick<
        Page,
        | "name"
        | "pageTemplate"
        | "published"
        | "hero"
        | "about"
        | "mainDishes"
        | "dailyOffer"
        | "whyUs"
        | "testimonials"
        | "blogPosts"
      >
    >
  ) => lambdaRequest<Page>(`/pages/${pageId}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePage: (pageId: string) => lambdaRequest<void>(`/pages/${pageId}`, { method: "DELETE" }),

  listMenus: (restaurantId: string) => lambdaRequest<Menu[]>(`/restaurants/${restaurantId}/menus`),
  createMenu: (restaurantId: string, data: { name: string; description?: string; menuTemplate?: string; items?: MenuItem[] }) =>
    lambdaRequest<Menu>(`/restaurants/${restaurantId}/menus`, { method: "POST", body: JSON.stringify(data) }),
  getMenu: (menuId: string) => lambdaRequest<Menu>(`/menus/${menuId}`),
  updateMenu: (
    menuId: string,
    data: Partial<Pick<Menu, "name" | "description" | "menuTemplate" | "items" | "published">>
  ) => lambdaRequest<Menu>(`/menus/${menuId}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteMenu: (menuId: string) => lambdaRequest<void>(`/menus/${menuId}`, { method: "DELETE" }),

  adminListUsers: () => request<AdminUserSummary[]>("/admin/users"),
  adminGetUser: (userId: string) => request<AdminUserDetail>(`/admin/users/${userId}`),

  getBilling: (restaurantId: string) => request<BillingInfo>(`/restaurants/${restaurantId}/billing`),
  subscribe: (restaurantId: string, data: { feature: PlanFeature; billingCycle: BillingCycle }) =>
    request<{ subscription: Subscription; payment: Payment }>(`/restaurants/${restaurantId}/billing`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  cancelSubscription: (restaurantId: string) =>
    request<Subscription>(`/restaurants/${restaurantId}/billing/cancel`, { method: "POST" }),
};
