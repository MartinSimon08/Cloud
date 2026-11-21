"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiError, type BillingInfo, type Page, type Restaurant, type MainDishCard, type Testimonial, type BlogPost } from "@/lib/api";
import { ImageUploadField } from "@/app/dashboard/_components/ImageUploadField";
import { ConfirmDeleteDialog } from "@/app/dashboard/_components/ConfirmDeleteDialog";
import { PAGE_TEMPLATES } from "@/lib/templates/registry";
import { PAGE_TEMPLATE_BLOCKS, type ContentBlockKey } from "@/lib/templates/contentBlocks";
import { missingBlockLabels, missingRestaurantLabels } from "@/lib/pageCompleteness";
import { featureCovers } from "@/lib/billing";

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5";
const labelClass = "flex flex-col gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75";
const sectionClass = "flex flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824]";
const itemCardClass =
  "flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/40 p-4 dark:border-white/10 dark:bg-white/[0.03]";
const itemImageGridClass = "grid grid-cols-1 gap-3 sm:grid-cols-[96px_1fr]";

function RemoveItemButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-400/10"
    >
      <TrashIcon />
    </button>
  );
}

function ItemCardHeader({ label, onRemove, removeLabel }: { label: string; onRemove: () => void; removeLabel: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-[#F5F2EA]/40">{label}</span>
      <RemoveItemButton onClick={onRemove} label={removeLabel} />
    </div>
  );
}

function randomId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function csv(value: FormDataEntryValue | null): string[] | undefined {
  const parsed = String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return parsed.length > 0 ? parsed : undefined;
}

function strOrUndefined(value: FormDataEntryValue | null): string | undefined {
  const s = String(value ?? "").trim();
  return s || undefined;
}


const BLOCK_DISPLAY_NAMES: Record<ContentBlockKey, string> = {
  hero: "Portada principal",
  about: "Sobre nosotros",
  mainDishes: "Platos destacados",
  dailyOffer: "Oferta del día",
  whyUs: "Por qué elegirnos",
  testimonials: "Testimonios",
  blogPosts: "Blog / novedades",
};

export default function PageEditPage() {
  const params = useParams<{ id: string; pageId: string }>();
  const router = useRouter();
  const { id: restaurantId, pageId } = params;

  const [page, setPage] = useState<Page | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [pageTemplate, setPageTemplate] = useState<string>(PAGE_TEMPLATES[0].value);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [togglingPublish, setTogglingPublish] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [aboutImageKey, setAboutImageKey] = useState<string | undefined>(undefined);
  const [dailyOfferImageKey, setDailyOfferImageKey] = useState<string | undefined>(undefined);
  const [whyUsImageKey, setWhyUsImageKey] = useState<string | undefined>(undefined);

  const [mainDishes, setMainDishes] = useState<MainDishCard[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    Promise.all([api.getPage(pageId), api.getRestaurant(restaurantId), api.getBilling(restaurantId)])
      .then(([p, r, b]) => {
        setPage(p);
        setRestaurant(r);
        setBilling(b);
        setPageTemplate(p.pageTemplate);
        setAboutImageKey(p.about?.imageKey);
        setDailyOfferImageKey(p.dailyOffer?.imageKey);
        setWhyUsImageKey(p.whyUs?.imageKey);
        setMainDishes(p.mainDishes ?? []);
        setTestimonials(p.testimonials ?? []);
        setBlogPosts(p.blogPosts ?? []);
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "No se pudo cargar la página."));
  }, [pageId, restaurantId]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    const form = new FormData(e.currentTarget);

    const name = strOrUndefined(form.get("name")) ?? page?.name ?? "";
    const heroHeadline = strOrUndefined(form.get("heroHeadline"));
    const heroTagline = strOrUndefined(form.get("heroTagline"));
    const aboutTitle = strOrUndefined(form.get("aboutTitle"));
    const aboutBullets = csv(form.get("aboutBullets"));
    const aboutStat = strOrUndefined(form.get("aboutStat"));
    const dailyOfferTitle = strOrUndefined(form.get("dailyOfferTitle"));
    const dailyOfferIngredients = csv(form.get("dailyOfferIngredients"));
    const whyUsTitle = strOrUndefined(form.get("whyUsTitle"));
    const whyUsDescription = strOrUndefined(form.get("whyUsDescription"));
    const whyUsStat = strOrUndefined(form.get("whyUsStat"));
    const whyUsFeatures = csv(form.get("whyUsFeatures"));

    const cleanMainDishes = mainDishes.filter((d) => d.title.trim() && (d.description ?? "").trim());
    const cleanTestimonials = testimonials.filter((t) => t.name.trim() && t.quote.trim());
    const cleanBlogPosts = blogPosts.filter((b) => b.title.trim() && b.imageKey);

    const nextWarnings: string[] = [];
    if ((aboutTitle || aboutBullets || aboutImageKey || aboutStat) && !(aboutTitle && aboutBullets)) {
      nextWarnings.push('"Sobre nosotros" necesita título y al menos una viñeta — no se guardó.');
    }
    if ((dailyOfferTitle || dailyOfferIngredients || dailyOfferImageKey) && !(dailyOfferTitle && dailyOfferIngredients)) {
      nextWarnings.push('"Oferta del día" necesita título e ingredientes — no se guardó.');
    }
    if ((whyUsTitle || whyUsDescription || whyUsStat || whyUsFeatures || whyUsImageKey) && !(whyUsTitle && whyUsDescription)) {
      nextWarnings.push('"Por qué elegirnos" necesita título y descripción — no se guardó.');
    }
    if (mainDishes.length > cleanMainDishes.length) {
      nextWarnings.push(
        `${mainDishes.length - cleanMainDishes.length} plato(s) destacado(s) sin título o descripción no se guardaron.`
      );
    }
    if (testimonials.length > cleanTestimonials.length) {
      nextWarnings.push(
        `${testimonials.length - cleanTestimonials.length} testimonio(s) sin nombre o cita no se guardaron.`
      );
    }
    if (blogPosts.length > cleanBlogPosts.length) {
      nextWarnings.push(
        `${blogPosts.length - cleanBlogPosts.length} publicación(es) de blog sin título o imagen no se guardaron.`
      );
    }

    // A page that's already live can't be saved into an incomplete state —
    // e.g. switching its template to one that needs testimonials shouldn't
    // silently leave the published page missing them. Drafts stay free to
    // save partially; this only guards content that's already public.
    if (page?.published) {
      const wouldBeBlocks = PAGE_TEMPLATE_BLOCKS[pageTemplate as keyof typeof PAGE_TEMPLATE_BLOCKS] ?? [];
      const wouldBePage: Pick<Page, "about" | "mainDishes" | "dailyOffer" | "whyUs" | "testimonials" | "blogPosts"> = {
        about: { title: aboutTitle, imageKey: aboutImageKey, bullets: aboutBullets, stat: aboutStat },
        mainDishes: cleanMainDishes,
        dailyOffer: { title: dailyOfferTitle, imageKey: dailyOfferImageKey, ingredients: dailyOfferIngredients },
        whyUs: { title: whyUsTitle, description: whyUsDescription, imageKey: whyUsImageKey, stat: whyUsStat, features: whyUsFeatures },
        testimonials: cleanTestimonials,
        blogPosts: cleanBlogPosts,
      };
      const missing = [
        ...(restaurant ? missingRestaurantLabels(restaurant) : []),
        ...missingBlockLabels(wouldBePage as Page, wouldBeBlocks),
      ];
      if (missing.length > 0) {
        setError(
          `Esta página está publicada — no se puede guardar así, le faltaría: ${missing.join(", ")}. ` +
            "Completá esas secciones, o despublicá la página primero si querés guardar igual."
        );
        return;
      }
    }

    setSaving(true);
    try {
      const updated = await api.updatePage(pageId, {
        name,
        pageTemplate,
        hero: { headline: heroHeadline, tagline: heroTagline },
        about: { title: aboutTitle, imageKey: aboutImageKey, bullets: aboutBullets, stat: aboutStat },
        mainDishes: cleanMainDishes,
        dailyOffer: { title: dailyOfferTitle, imageKey: dailyOfferImageKey, ingredients: dailyOfferIngredients },
        whyUs: {
          title: whyUsTitle,
          description: whyUsDescription,
          imageKey: whyUsImageKey,
          stat: whyUsStat,
          features: whyUsFeatures,
        },
        testimonials: cleanTestimonials,
        blogPosts: cleanBlogPosts,
      });
      setPage(updated);
      setMainDishes(updated.mainDishes ?? []);
      setTestimonials(updated.testimonials ?? []);
      setBlogPosts(updated.blogPosts ?? []);
      setWarnings(nextWarnings);
      setSaved(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo guardar la página.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublish() {
    if (!page || !restaurant) return;
    if (!page.published) {
      const blocksForTemplate = PAGE_TEMPLATE_BLOCKS[page.pageTemplate as keyof typeof PAGE_TEMPLATE_BLOCKS] ?? [];
      const missing = [...missingRestaurantLabels(restaurant), ...missingBlockLabels(page, blocksForTemplate)];
      if (missing.length > 0) {
        setError(`Todavía falta completar: ${missing.join(", ")}. Completá eso antes de publicar.`);
        return;
      }
    }
    setTogglingPublish(true);
    setError(null);
    try {
      const updated = await api.updatePage(pageId, { published: !page.published });
      setPage(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo actualizar el estado de la página.");
    } finally {
      setTogglingPublish(false);
    }
  }

  async function handleDeletePage() {
    setDeleting(true);
    setError(null);
    try {
      await api.deletePage(pageId);
      router.push(`/dashboard/restaurants/${restaurantId}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo eliminar la página.");
      setDeleting(false);
      setDeleteOpen(false);
    }
  }

  if (!page || !restaurant) {
    return error ? (
      <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
        {error}
      </div>
    ) : (
      <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Cargando…</p>
    );
  }

  const blocks: ContentBlockKey[] = PAGE_TEMPLATE_BLOCKS[pageTemplate as keyof typeof PAGE_TEMPLATE_BLOCKS] ?? [];
  const previewHref = `/${restaurant.slug}?preview=${pageId}`;
  const missingRestaurant = missingRestaurantLabels(restaurant);
  const missingForSelectedTemplate = [...missingRestaurant, ...missingBlockLabels(page, blocks)];
  const blocksForSavedTemplate = PAGE_TEMPLATE_BLOCKS[page.pageTemplate as keyof typeof PAGE_TEMPLATE_BLOCKS] ?? [];
  const missingToPublish = [...missingRestaurant, ...missingBlockLabels(page, blocksForSavedTemplate)];
  const canPublish = page.published || missingToPublish.length === 0;
  const pageCovered = Boolean(
    billing && (billing.isAdmin || (billing.isActive && billing.subscription && featureCovers(billing.subscription.feature, "page")))
  );
  const liveButBlocked = page.published && !pageCovered;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link
          href={`/dashboard/restaurants/${restaurantId}`}
          className="text-xs font-semibold text-sky-600 hover:underline dark:text-sky-300"
        >
          ← Volver al restaurante
        </Link>
        <div className="mt-2 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">{page.name}</h1>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            aria-label="Eliminar página"
            title="Eliminar página"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50 dark:border-red-400/30 dark:text-red-300 dark:hover:bg-red-400/10"
          >
            <TrashIcon />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              page.published && pageCovered
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                : liveButBlocked
                  ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
            }`}
          >
            {page.published ? (pageCovered ? "Publicada" : "Publicada (sin plan)") : "Borrador"}
          </span>
          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={togglingPublish || !canPublish}
            title={!canPublish ? `Te falta completar: ${missingToPublish.join(", ")}` : undefined}
            className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:bg-white/5 dark:text-[#F5F2EA]"
          >
            {togglingPublish ? "Guardando…" : page.published ? "Despublicar" : "Publicar esta página"}
          </button>
          <Link href={previewHref} target="_blank" className="text-xs font-bold text-sky-600 hover:underline dark:text-sky-300">
            Ver vista previa →
          </Link>
          {page.published && pageCovered && (
            <span className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">Esta es la que se ve en {restaurant.slug}.</span>
          )}
        </div>
        {liveButBlocked && (
          <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-300">
            Esta página está marcada como publicada pero no se muestra al público porque el restaurante no tiene un plan activo que
            la cubra.{" "}
            <Link href={`/dashboard/restaurants/${restaurantId}/billing`} className="underline">
              Activar un plan →
            </Link>
          </p>
        )}
        {!page.published && (
          <p className="mt-1 text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Al publicar esta página, cualquier otra página de este restaurante se despublica automáticamente — solo
            una puede estar activa a la vez.
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
          {error}
        </div>
      )}
      {saved && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
          Cambios guardados.
        </div>
      )}
      {saved && warnings.length > 0 && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300">
          <p className="font-bold">Algunas secciones no se guardaron por estar incompletas:</p>
          <ul className="mt-1.5 list-disc pl-4">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className={sectionClass}>
          <label className={labelClass}>
            Nombre interno de la página
            <input name="name" required defaultValue={page.name} className={inputClass} />
          </label>
          <div>
            <span className="mb-2 block text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">Plantilla</span>
            <div className="grid gap-3 sm:grid-cols-2">
              {PAGE_TEMPLATES.map((t) => (
                <label
                  key={t.value}
                  className={`flex cursor-pointer flex-col gap-2 rounded-xl border-2 p-4 transition ${
                    pageTemplate === t.value
                      ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10"
                      : "border-slate-200 dark:border-white/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="pageTemplateChoice"
                    className="hidden"
                    checked={pageTemplate === t.value}
                    onChange={() => setPageTemplate(t.value)}
                  />
                  <span className="text-sm font-bold">{t.label}</span>
                  <span className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">{t.description}</span>
                  <a
                    href={t.previewPath}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 w-fit text-xs font-bold text-sky-600 hover:underline dark:text-sky-300"
                  >
                    Ver plantilla original →
                  </a>
                </label>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs dark:border-white/10 dark:bg-white/5">
              <span className="font-semibold text-slate-700 dark:text-[#F5F2EA]/75">Esta plantilla muestra: </span>
              <span className="text-slate-500 dark:text-[#F5F2EA]/50">{blocks.map((k) => BLOCK_DISPLAY_NAMES[k]).join(", ")}.</span>
              {missingForSelectedTemplate.length > 0 && (
                <p className="mt-1 font-semibold text-amber-700 dark:text-amber-300">
                  Para publicar todavía falta completar: {missingForSelectedTemplate.join(", ")}.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* HERO */}
        <div className={sectionClass}>
          <h2 className="text-lg font-bold">Portada principal (hero)</h2>
          <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Si los dejás vacíos, se usa el nombre y la descripción del restaurante.
          </p>
          <label className={labelClass}>
            Título grande
            <input
              name="heroHeadline"
              placeholder={restaurant.name}
              defaultValue={page.hero?.headline ?? ""}
              className={inputClass}
            />
          </label>
          <label className={labelClass}>
            Bajada
            <input
              name="heroTagline"
              placeholder={restaurant.description || "Una frase corta que describa tu local"}
              defaultValue={page.hero?.tagline ?? ""}
              className={inputClass}
            />
          </label>
        </div>

        {/* ABOUT */}
        <div className={sectionClass}>
          <h2 className="text-lg font-bold">Sobre nosotros</h2>
          <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Necesita título + al menos una viñeta para mostrarse. La imagen y el dato destacado son opcionales.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
            <ImageUploadField label="Imagen" imageKey={aboutImageKey} onChange={setAboutImageKey} aspect="aspect-square" />
            <div className="flex flex-col gap-3">
              <label className={labelClass}>
                Título
                <input name="aboutTitle" placeholder="Nuestra historia" defaultValue={page.about?.title ?? ""} className={inputClass} />
              </label>
              <label className={labelClass}>
                Viñetas (separadas por coma)
                <input
                  name="aboutBullets"
                  placeholder="Ingredientes frescos, Opciones vegetarianas, Ambiente familiar"
                  defaultValue={(page.about?.bullets ?? []).join(", ")}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Dato destacado
                <input name="aboutStat" placeholder="+30 años de experiencia" defaultValue={page.about?.stat ?? ""} className={inputClass} />
              </label>
            </div>
          </div>
        </div>

        {/* MAIN DISHES */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Platos destacados</h2>
            <button
              type="button"
              onClick={() => setMainDishes((prev) => [...prev, { id: randomId(), title: "", description: "" }])}
              className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:bg-white/5 dark:text-[#F5F2EA]"
            >
              + Agregar
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Cada plato necesita título + descripción para mostrarse. La imagen y el precio son opcionales.
          </p>
          {mainDishes.map((dish, index) => (
            <div key={dish.id} className={itemCardClass}>
              <ItemCardHeader
                label={`Plato ${index + 1}`}
                removeLabel="Quitar plato"
                onRemove={() => setMainDishes((prev) => prev.filter((d) => d.id !== dish.id))}
              />
              <div className={itemImageGridClass}>
                <ImageUploadField
                  label="Imagen"
                  imageKey={dish.imageKey}
                  onChange={(id) => setMainDishes((prev) => prev.map((d) => (d.id === dish.id ? { ...d, imageKey: id } : d)))}
                  aspect="aspect-square"
                />
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_8rem]">
                    <label className={labelClass}>
                      Título
                      <input
                        value={dish.title}
                        onChange={(e) => setMainDishes((prev) => prev.map((d) => (d.id === dish.id ? { ...d, title: e.target.value } : d)))}
                        placeholder="Ej: Pizzas"
                        className={inputClass}
                      />
                    </label>
                    <label className={labelClass}>
                      Precio
                      <input
                        value={dish.price ?? ""}
                        onChange={(e) =>
                          setMainDishes((prev) =>
                            prev.map((d) => (d.id === dish.id ? { ...d, price: e.target.value === "" ? undefined : Number(e.target.value) } : d))
                          )
                        }
                        type="number"
                        min={0}
                        step="0.01"
                        placeholder="0"
                        className={inputClass}
                      />
                    </label>
                  </div>
                  <label className={labelClass}>
                    Descripción
                    <input
                      value={dish.description ?? ""}
                      onChange={(e) => setMainDishes((prev) => prev.map((d) => (d.id === dish.id ? { ...d, description: e.target.value } : d)))}
                      placeholder="Descripción corta"
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DAILY OFFER — hidden (not unmounted) when the current template doesn't use it, so switching
            back to a template that does use it never re-asks for data that's already saved. */}
        <div className={blocks.includes("dailyOffer") ? sectionClass : `${sectionClass} hidden`}>
          <h2 className="text-lg font-bold">Oferta del día</h2>
          <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Necesita título + al menos un ingrediente para mostrarse. La imagen es opcional.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[180px_1fr]">
            <ImageUploadField label="Imagen" imageKey={dailyOfferImageKey} onChange={setDailyOfferImageKey} aspect="aspect-video" />
            <div className="flex flex-col gap-3">
              <label className={labelClass}>
                Título
                <input
                  name="dailyOfferTitle"
                  placeholder="Ej: Hamburguesa Deliciosa"
                  defaultValue={page.dailyOffer?.title ?? ""}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Ingredientes (separados por coma)
                <input
                  name="dailyOfferIngredients"
                  placeholder="Salsa de tomate, Lechuga, Queso cheddar"
                  defaultValue={(page.dailyOffer?.ingredients ?? []).join(", ")}
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        </div>

        {/* WHY US */}
        <div className={sectionClass}>
          <h2 className="text-lg font-bold">Por qué elegirnos</h2>
          <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Necesita título + descripción para mostrarse. Imagen, dato destacado y puntos fuertes son opcionales.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
            <ImageUploadField label="Imagen" imageKey={whyUsImageKey} onChange={setWhyUsImageKey} aspect="aspect-square" />
            <div className="flex flex-col gap-3">
              <label className={labelClass}>
                Título
                <input name="whyUsTitle" placeholder="Sabores frescos" defaultValue={page.whyUs?.title ?? ""} className={inputClass} />
              </label>
              <label className={labelClass}>
                Descripción
                <textarea name="whyUsDescription" rows={2} defaultValue={page.whyUs?.description ?? ""} className={inputClass} />
              </label>
              <label className={labelClass}>
                Dato destacado
                <input name="whyUsStat" placeholder="620+ clientes satisfechos" defaultValue={page.whyUs?.stat ?? ""} className={inputClass} />
              </label>
              <label className={labelClass}>
                Puntos fuertes (separados por coma)
                <input
                  name="whyUsFeatures"
                  placeholder="Las mejores cualidades, Sistema de descuentos, Entrega rápida"
                  defaultValue={(page.whyUs?.features ?? []).join(", ")}
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        </div>

        {/* TESTIMONIALS — fully unmounted (not just hidden) when unused: the array lives in
            React state, so nothing is lost by not rendering it. */}
        {blocks.includes("testimonials") && (
        <div className={sectionClass}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Testimonios</h2>
            <button
              type="button"
              onClick={() => setTestimonials((prev) => [...prev, { id: randomId(), name: "", quote: "" }])}
              className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:bg-white/5 dark:text-[#F5F2EA]"
            >
              + Agregar
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Cada testimonio necesita nombre + cita para mostrarse. La foto es opcional.
          </p>
          {testimonials.map((t, index) => (
            <div key={t.id} className={itemCardClass}>
              <ItemCardHeader
                label={`Testimonio ${index + 1}`}
                removeLabel="Quitar testimonio"
                onRemove={() => setTestimonials((prev) => prev.filter((x) => x.id !== t.id))}
              />
              <div className={itemImageGridClass}>
                <ImageUploadField
                  label="Foto"
                  imageKey={t.photoKey}
                  onChange={(id) => setTestimonials((prev) => prev.map((x) => (x.id === t.id ? { ...x, photoKey: id } : x)))}
                  aspect="aspect-square"
                />
                <div className="flex flex-col gap-3">
                  <label className={labelClass}>
                    Nombre
                    <input
                      value={t.name}
                      onChange={(e) => setTestimonials((prev) => prev.map((x) => (x.id === t.id ? { ...x, name: e.target.value } : x)))}
                      placeholder="Nombre del cliente"
                      className={inputClass}
                    />
                  </label>
                  <label className={labelClass}>
                    Cita
                    <textarea
                      value={t.quote}
                      onChange={(e) => setTestimonials((prev) => prev.map((x) => (x.id === t.id ? { ...x, quote: e.target.value } : x)))}
                      placeholder="Lo que dijo el cliente"
                      rows={2}
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* BLOG — same reasoning as TESTIMONIALS above. */}
        {blocks.includes("blogPosts") && (
        <div className={sectionClass}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Blog / novedades</h2>
            <button
              type="button"
              onClick={() => setBlogPosts((prev) => [...prev, { id: randomId(), title: "" }])}
              className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:bg-white/5 dark:text-[#F5F2EA]"
            >
              + Agregar
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Cada publicación necesita título + imagen para mostrarse (el link es opcional).
          </p>
          {blogPosts.map((post, index) => (
            <div key={post.id} className={itemCardClass}>
              <ItemCardHeader
                label={`Publicación ${index + 1}`}
                removeLabel="Quitar publicación"
                onRemove={() => setBlogPosts((prev) => prev.filter((p) => p.id !== post.id))}
              />
              <div className={itemImageGridClass}>
                <ImageUploadField
                  label="Imagen"
                  imageKey={post.imageKey}
                  onChange={(id) => setBlogPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, imageKey: id } : p)))}
                  aspect="aspect-video"
                />
                <div className="flex flex-col gap-3">
                  <label className={labelClass}>
                    Título
                    <input
                      value={post.title}
                      onChange={(e) => setBlogPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, title: e.target.value } : p)))}
                      placeholder="Título de la novedad"
                      className={inputClass}
                    />
                  </label>
                  <label className={labelClass}>
                    Link (opcional)
                    <input
                      value={post.link ?? ""}
                      onChange={(e) => setBlogPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, link: e.target.value } : p)))}
                      placeholder="Ej: tu post de Instagram"
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="self-end rounded-full bg-sky-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-600 disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar página"}
        </button>
      </form>

      {deleteOpen && (
        <ConfirmDeleteDialog
          title="Eliminar página"
          description={`Esto borra "${page.name}" de forma permanente.`}
          deleting={deleting}
          onConfirm={handleDeletePage}
          onCancel={() => setDeleteOpen(false)}
        />
      )}
    </div>
  );
}
