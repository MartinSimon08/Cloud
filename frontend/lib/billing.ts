import type { BillingCycle, PlanFeature, SubscriptionDoc } from "@/lib/models";

export const FEATURE_LABELS: Record<PlanFeature, string> = {
  page: "Página",
  menu: "Menú",
  both: "Página + Menú",
};

/** Base monthly price per feature, in ARS. "both" is a bundle price, not page+menu added up. */
export const MONTHLY_PRICES: Record<PlanFeature, number> = {
  page: 50_000,
  menu: 30_000,
  both: 60_000,
};

/** Annual plans are billed as this many months — i.e. 2 months free. */
export const ANNUAL_MONTHS = 10;

export interface PriceQuote {
  feature: PlanFeature;
  billingCycle: BillingCycle;
  basePrice: number;
  monthlyEquivalent: number;
  amount: number;
}

export function quotePrice(feature: PlanFeature, billingCycle: BillingCycle): PriceQuote {
  const basePrice = MONTHLY_PRICES[feature];
  const monthlyEquivalent = basePrice;
  const amount = billingCycle === "annual" ? monthlyEquivalent * ANNUAL_MONTHS : monthlyEquivalent;
  return { feature, billingCycle, basePrice, monthlyEquivalent, amount };
}

export function computePeriodEnd(start: Date, billingCycle: BillingCycle): Date {
  const end = new Date(start);
  if (billingCycle === "annual") end.setFullYear(end.getFullYear() + 1);
  else end.setMonth(end.getMonth() + 1);
  return end;
}

export function isSubscriptionActive(
  sub: Pick<SubscriptionDoc, "status" | "currentPeriodEnd"> | null | undefined,
  now: Date = new Date()
): boolean {
  if (!sub) return false;
  return sub.status === "active" && sub.currentPeriodEnd.getTime() > now.getTime();
}

export function featureCovers(feature: PlanFeature, needed: "page" | "menu"): boolean {
  return feature === "both" || feature === needed;
}

export function formatARS(amount: number): string {
  return amount.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
}
