import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { getCallerFromCookies } from "@/lib/cognitoAuth";
import { imageUrl } from "@/lib/uploadImage";
import { isContactFieldOn } from "@/lib/contactFields";
import { missingBlockLabels, missingRestaurantLabels } from "@/lib/pageCompleteness";
import { PAGE_TEMPLATE_BLOCKS } from "@/lib/templates/contentBlocks";
import { isAdminOwner } from "@/lib/adminAuth";
import { featureCovers, isSubscriptionActive } from "@/lib/billing";
import type { PageDoc, RestaurantDoc, SubscriptionDoc } from "@/lib/models";
import type { PublicPageData } from "@/lib/templates/pageData";
import { Pagina1Page } from "@/lib/templates/pagina1/Pagina1Page";
import { Pagina3Page } from "@/lib/templates/pagina3/Pagina3Page";
import { Pagina4Page } from "@/lib/templates/pagina4/Pagina4Page";
import { Pagina5Page } from "@/lib/templates/pagina5/Pagina5Page";
import { Pagina6Page } from "@/lib/templates/pagina6/Pagina6Page";

export default async function PublicRestaurantPage({
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

  const pages = db.collection<PageDoc>("pages");
  let page: PageDoc | null = null;
  let isPreview = false;

  const previewId = preview ? parsePreviewId(preview) : undefined;
  if (previewId && isOwner) {
    page = await pages.findOne({ _id: previewId, restaurantId: restaurant._id });
    if (page) isPreview = true;
  }
  if (!page) {
    page = await pages.findOne({ restaurantId: restaurant._id, published: true });
  }

  if (!page) {
    if (!isOwner) notFound();
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center">
        <p className="text-sm font-semibold text-slate-600">
          Todavía no publicaste ninguna página para {restaurant.name} — elegí una desde el dashboard.
        </p>
      </div>
    );
  }
  let previewReason: "draft" | "billing" | null = null;
  if (!isPreview && page.published === false) {
    // Reached without ?preview (e.g. a stale bookmark) and nothing published.
    previewReason = "draft";
  } else if (!isPreview) {
    // Published, but only actually shown to the public while the restaurant
    // has an active plan covering "page" — a lapsed/canceled/never-paid plan
    // takes it off the air even though it's still marked published.
    const isAdmin = await isAdminOwner(restaurant.ownerId);
    if (!isAdmin) {
      const subscription = await db.collection<SubscriptionDoc>("subscriptions").findOne({ restaurantId: restaurant._id });
      if (!isSubscriptionActive(subscription) || !featureCovers(subscription!.feature, "page")) {
        previewReason = "billing";
      }
    }
  }
  if (previewReason) {
    if (!isOwner) notFound();
    isPreview = true;
  }

  // The dashboard blocks publishing an incomplete page, but a restaurant's
  // logo/Maps link can still be broken afterward from "Datos generales", or
  // old data can predate that guard — so this is the real enforcement point:
  // nothing incomplete for its own template is ever actually shown, no
  // matter how it got that way.
  const blocksForTemplate = PAGE_TEMPLATE_BLOCKS[page.pageTemplate] ?? [];
  const missing = [...missingRestaurantLabels(restaurant), ...missingBlockLabels(page, blocksForTemplate)];
  if (missing.length > 0) {
    if (!isOwner) notFound();
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center">
        <div className="max-w-md">
          <p className="text-sm font-semibold text-slate-600">
            Esta página todavía no está completa para su plantilla — solo vos podés ver este aviso.
          </p>
          <p className="mt-2 text-sm text-slate-500">Le falta: {missing.join(", ")}.</p>
          <a
            href={`/dashboard/restaurants/${restaurant._id.toString()}/pages/${page._id.toString()}`}
            className="mt-4 inline-block text-sm font-bold text-sky-600 hover:underline"
          >
            Completarla en el dashboard →
          </a>
        </div>
      </div>
    );
  }

  const data: PublicPageData = {
    name: restaurant.name,
    description: restaurant.description,
    logoUrl: imageUrl(restaurant.logoImageKey),
    coverUrl: imageUrl(restaurant.coverImageKey),
    address: restaurant.address,
    phone: isContactFieldOn(restaurant.phone, restaurant.phoneEnabled) ? restaurant.phone : undefined,
    email: isContactFieldOn(restaurant.email, restaurant.emailEnabled) ? restaurant.email : undefined,
    hours: isContactFieldOn(restaurant.hours, restaurant.hoursEnabled) ? restaurant.hours : undefined,
    mapsUrl: isContactFieldOn(restaurant.mapsUrl, restaurant.mapsUrlEnabled) ? restaurant.mapsUrl : undefined,
    instagram: isContactFieldOn(restaurant.instagram, restaurant.instagramEnabled) ? restaurant.instagram : undefined,
    facebook: isContactFieldOn(restaurant.facebook, restaurant.facebookEnabled) ? restaurant.facebook : undefined,
    whatsapp: isContactFieldOn(restaurant.whatsapp, restaurant.whatsappEnabled) ? restaurant.whatsapp : undefined,
    menuHref: `/${restaurant.slug}/menu`,
    hero: page.hero,
    about: page.about && {
      title: page.about.title,
      imageUrl: imageUrl(page.about.imageKey),
      bullets: page.about.bullets,
      stat: page.about.stat,
    },
    mainDishes: page.mainDishes?.map((dish) => ({
      id: dish.id,
      title: dish.title,
      description: dish.description,
      imageUrl: imageUrl(dish.imageKey),
      price: dish.price,
    })),
    dailyOffer: page.dailyOffer && {
      title: page.dailyOffer.title,
      imageUrl: imageUrl(page.dailyOffer.imageKey),
      ingredients: page.dailyOffer.ingredients,
    },
    whyUs: page.whyUs && {
      title: page.whyUs.title,
      description: page.whyUs.description,
      imageUrl: imageUrl(page.whyUs.imageKey),
      stat: page.whyUs.stat,
      features: page.whyUs.features,
    },
    testimonials: page.testimonials?.map((t) => ({
      id: t.id,
      name: t.name,
      quote: t.quote,
      photoUrl: imageUrl(t.photoKey),
    })),
    blogPosts: page.blogPosts?.map((post) => ({
      id: post.id,
      title: post.title,
      imageUrl: imageUrl(post.imageKey),
      link: post.link,
    })),
  };

  const rendered = (() => {
    switch (page.pageTemplate) {
      case "pagina1":
        return <Pagina1Page data={data} />;
      case "pagina3":
        return <Pagina3Page data={data} />;
      case "pagina4":
        return <Pagina4Page data={data} />;
      case "pagina5":
        return <Pagina5Page data={data} />;
      case "pagina6":
      default:
        return <Pagina6Page data={data} />;
    }
  })();

  if (!isPreview) return rendered;

  return (
    <div>
      <div className="sticky top-0 z-50 bg-amber-400 px-4 py-2 text-center text-sm font-bold text-amber-950">
        {previewReason === "billing"
          ? "Vista previa — esta página está marcada como publicada pero no se muestra al público porque no tenés un plan activo que la cubra. Solo vos podés verla."
          : "Vista previa — esta página todavía no está publicada, solo vos podés verla."}
      </div>
      {rendered}
    </div>
  );
}

function parsePreviewId(id: string): ObjectId | undefined {
  return ObjectId.isValid(id) ? new ObjectId(id) : undefined;
}
