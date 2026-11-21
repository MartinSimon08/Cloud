import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { getCallerFromCookies } from "@/lib/cognitoAuth";
import { imageUrl } from "@/lib/uploadImage";
import { isContactFieldOn } from "@/lib/contactFields";
import { isAdminOwner } from "@/lib/adminAuth";
import { featureCovers, isSubscriptionActive } from "@/lib/billing";
import type { MenuDoc, RestaurantDoc, SubscriptionDoc } from "@/lib/models";
import type { PublicMenuData, PublicMenuItem } from "@/lib/templates/menuData";
import { Menu1Page } from "@/lib/templates/menu1/Menu1Page";
import { Menu2Page } from "@/lib/templates/menu2/Menu2Page";
import { Menu3Page } from "@/lib/templates/menu3/Menu3Page";
import { Menu4Page } from "@/lib/templates/menu4/Menu4Page";
import { Menu5Page } from "@/lib/templates/menu5/Menu5Page";

export default async function PublicMenuPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;

  const db = await getDb();
  const restaurant = await db.collection<RestaurantDoc>("restaurants").findOne({ slug });
  if (!restaurant) notFound();

  const caller = await getCallerFromCookies();
  const isOwner = caller?.sub === restaurant.ownerId;

  const menus = db.collection<MenuDoc>("menus");
  let menu: MenuDoc | null = null;
  let isPreview = false;

  const previewId = preview ? parsePreviewId(preview) : undefined;
  if (previewId && isOwner) {
    menu = await menus.findOne({ _id: previewId, restaurantId: restaurant._id });
    if (menu) isPreview = true;
  }
  if (!menu) {
    menu = await menus.findOne({ restaurantId: restaurant._id, published: true });
  }

  if (!menu) {
    if (!isOwner) notFound();
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center">
        <p className="text-sm font-semibold text-slate-600">
          Todavía no publicaste ningún menú para {restaurant.name} — elegí uno desde el dashboard.
        </p>
      </div>
    );
  }
  let previewReason: "draft" | "billing" | null = null;
  if (!isPreview && menu.published === false) {
    previewReason = "draft";
  } else if (!isPreview) {
    // Published, but only actually shown to the public while the restaurant
    // has an active plan covering "menu" — a lapsed/canceled/never-paid plan
    // takes it off the air even though it's still marked published.
    const isAdmin = await isAdminOwner(restaurant.ownerId);
    if (!isAdmin) {
      const subscription = await db.collection<SubscriptionDoc>("subscriptions").findOne({ restaurantId: restaurant._id });
      if (!isSubscriptionActive(subscription) || !featureCovers(subscription!.feature, "menu")) {
        previewReason = "billing";
      }
    }
  }
  if (previewReason) {
    if (!isOwner) notFound();
    isPreview = true;
  }

  const items: PublicMenuItem[] = menu.items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    ingredients: item.ingredients,
    price: item.price,
    category: item.category,
    photoUrl: imageUrl(item.photoKey),
  }));

  const data: PublicMenuData = {
    restaurantName: restaurant.name,
    logoUrl: imageUrl(restaurant.logoImageKey),
    tagline: menu.description || restaurant.description,
    items,
    homeHref: `/${restaurant.slug}`,
    whatsapp: isContactFieldOn(restaurant.whatsapp, restaurant.whatsappEnabled) ? restaurant.whatsapp : undefined,
  };

  const rendered = (() => {
    switch (menu.menuTemplate) {
      case "menu1":
        return <Menu1Page data={data} />;
      case "menu3":
        return <Menu3Page data={data} />;
      case "menu4":
        return <Menu4Page data={data} />;
      case "menu5":
        return <Menu5Page data={data} />;
      case "menu2":
      default:
        return <Menu2Page data={data} />;
    }
  })();

  if (!isPreview) return rendered;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-amber-400 px-4 py-2 text-center text-sm font-bold text-amber-950">
        {previewReason === "billing"
          ? "Vista previa — este menú está marcado como activo pero no se muestra al público porque no tenés un plan activo que lo cubra. Solo vos podés verlo."
          : "Vista previa — este menú todavía no está publicado, solo vos podés verlo."}
      </div>
      {rendered}
    </div>
  );
}

function parsePreviewId(id: string): ObjectId | undefined {
  return ObjectId.isValid(id) ? new ObjectId(id) : undefined;
}
