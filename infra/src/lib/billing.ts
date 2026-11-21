import type { BillingCycle, PlanFeature, SubscriptionDoc } from "./models";

/** Base monthly price per feature, in ARS. "both" is a bundle price, not page+menu added up. */
export const MONTHLY_PRICES: Record<PlanFeature, number> = {
  page: 50_000,
  menu: 30_000,
  both: 60_000,
};

/** Annual plans are billed as this many months — i.e. 2 months free. */
export const ANNUAL_MONTHS = 10;

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
