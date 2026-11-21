/** Builds a wa.me link from whatever the owner typed (handles spaces, dashes, +, parentheses). */
export function whatsappHref(rawNumber: string, message?: string): string {
  const digits = rawNumber.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
