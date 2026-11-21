// Shared content shape for every ported public-menu template. Built once in
// app/[slug]/menu/page.tsx from the restaurant's menus/items; each
// MenuTemplate renderer (Menu1Page, Menu3Page, ...) just displays the same
// items with its own distinct visual design.

export interface PublicMenuItem {
  id: string;
  name: string;
  description?: string;
  ingredients?: string[];
  price: number;
  category?: string;
  photoUrl?: string;
}

export interface PublicMenuData {
  restaurantName: string;
  logoUrl?: string;
  tagline?: string;
  items: PublicMenuItem[];
  homeHref: string;
  whatsapp?: string;
}
