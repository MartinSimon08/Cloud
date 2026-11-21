"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiError, type BillingInfo, type Menu, type Page, type Restaurant } from "@/lib/api";
import { ConfirmDeleteDialog } from "@/app/dashboard/_components/ConfirmDeleteDialog";
import { PAGE_TEMPLATES, MENU_TEMPLATES } from "@/lib/templates/registry";
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

const cardClass =
  "rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-lg dark:border-white/10 dark:bg-[#141824]";
const sectionHeaderClass = "flex items-center justify-between gap-3";

export default function RestaurantDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const restaurantId = params.id;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [pages, setPages] = useState<Page[] | null>(null);
  const [menus, setMenus] = useState<Menu[] | null>(null);
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [showPageForm, setShowPageForm] = useState(false);
  const [newPageTemplate, setNewPageTemplate] = useState<string>(PAGE_TEMPLATES[0].value);
  const [creatingPage, setCreatingPage] = useState(false);

  const [showMenuForm, setShowMenuForm] = useState(false);
  const [newMenuTemplate, setNewMenuTemplate] = useState<string>(MENU_TEMPLATES[0].value);
  const [creatingMenu, setCreatingMenu] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getRestaurant(restaurantId),
      api.listPages(restaurantId),
      api.listMenus(restaurantId),
      api.getBilling(restaurantId),
    ])
      .then(([r, p, m, b]) => {
        setRestaurant(r);
        setPages(p);
        setMenus(m);
        setBilling(b);
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "No se pudo cargar el restaurante."));
  }, [restaurantId]);

  async function handleCreatePage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return;

    setCreatingPage(true);
    setError(null);
    try {
      const created = await api.createPage(restaurantId, { name, pageTemplate: newPageTemplate });
      router.push(`/dashboard/restaurants/${restaurantId}/pages/${created._id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear la página.");
      setCreatingPage(false);
    }
  }

  async function handleCreateMenu(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return;

    setCreatingMenu(true);
    setError(null);
    try {
      const created = await api.createMenu(restaurantId, {
        name,
        description: String(form.get("description") ?? ""),
        menuTemplate: newMenuTemplate,
      });
      router.push(`/dashboard/restaurants/${restaurantId}/menus/${created._id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear el menú.");
      setCreatingMenu(false);
    }
  }

  async function handleDeleteRestaurant() {
    setDeleting(true);
    setError(null);
    try {
      await api.deleteRestaurant(restaurantId);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo eliminar el restaurante.");
      setDeleting(false);
      setDeleteOpen(false);
    }
  }

  const canDeleteRestaurant = (pages?.length ?? -1) === 0 && (menus?.length ?? -1) === 0;
  // A page/menu can be marked "published" in the DB but not actually be live
  // for visitors if the restaurant's plan lapsed or never covered it — the
  // badges below need to reflect what's really on the air, not just the flag.
  const pageCovered = Boolean(
    billing && (billing.isAdmin || (billing.isActive && billing.subscription && featureCovers(billing.subscription.feature, "page")))
  );
  const menuCovered = Boolean(
    billing && (billing.isAdmin || (billing.isActive && billing.subscription && featureCovers(billing.subscription.feature, "menu")))
  );
  const publishedPage = pages?.find((p) => p.published && pageCovered);
  const publishedMenu = menus?.find((m) => m.published !== false && menuCovered);

  if (error && !restaurant) {
    return (
      <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/dashboard" className="text-xs font-semibold text-sky-600 hover:underline dark:text-sky-300">
          ← Mis restaurantes
        </Link>
        <div className="mt-2 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">{restaurant?.name ?? "Cargando…"}</h1>
          {restaurant && (
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              disabled={!canDeleteRestaurant}
              aria-label="Eliminar restaurante"
              title={
                canDeleteRestaurant
                  ? "Eliminar restaurante"
                  : "Primero eliminá las páginas y los menús para poder eliminar el restaurante"
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:border-red-400/30 dark:text-red-300 dark:hover:bg-red-400/10"
            >
              <TrashIcon />
            </button>
          )}
        </div>
        {restaurant?.description && (
          <p className="mt-1 text-sm text-slate-600 dark:text-[#F5F2EA]/60">{restaurant.description}</p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
          {error}
        </div>
      )}

      {/* PÁGINAS */}
      <div className="flex flex-col gap-4">
        <div className={sectionHeaderClass}>
          <div>
            <h2 className="text-lg font-bold">Páginas</h2>
            <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
              Podés tener varias — solo una puede estar publicada a la vez.
              {restaurant?.slug && publishedPage && (
                <>
                  {" "}
                  <Link
                    href={`/${restaurant.slug}`}
                    target="_blank"
                    className="font-bold text-sky-600 hover:underline dark:text-sky-300"
                  >
                    Ver página pública →
                  </Link>
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPageForm((prev) => !prev)}
            className="shrink-0 rounded-full bg-sky-500 px-5 py-2 text-sm font-bold text-white shadow-xs transition-colors hover:bg-sky-600"
          >
            {showPageForm ? "Cancelar" : "+ Nueva página"}
          </button>
        </div>

        {showPageForm && (
          <form
            onSubmit={handleCreatePage}
            className="flex flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824]"
          >
            <input
              name="name"
              required
              placeholder="Nombre de la página (ej: Diseño de verano)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
            />
            <div>
              <span className="mb-2 block text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">Plantilla</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {PAGE_TEMPLATES.map((t) => (
                  <label
                    key={t.value}
                    className={`flex cursor-pointer flex-col gap-2 rounded-xl border-2 p-4 transition ${
                      newPageTemplate === t.value
                        ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10"
                        : "border-slate-200 dark:border-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pageTemplateChoice"
                      className="hidden"
                      checked={newPageTemplate === t.value}
                      onChange={() => setNewPageTemplate(t.value)}
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
            </div>
            <button
              type="submit"
              disabled={creatingPage}
              className="flex h-10 w-full items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white transition-colors hover:bg-sky-600 disabled:opacity-60"
            >
              {creatingPage ? "Creando…" : "Crear página"}
            </button>
          </form>
        )}

        {pages === null ? (
          <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Cargando…</p>
        ) : pages.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Todavía no creaste ninguna página.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {pages.map((p) => {
              const template = PAGE_TEMPLATES.find((t) => t.value === p.pageTemplate);
              return (
                <Link key={p._id} href={`/dashboard/restaurants/${restaurantId}/pages/${p._id}`} className={cardClass}>
                  <div className="flex items-center gap-2">
                    <div className="text-base font-bold">{p.name}</div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        p.published && pageCovered
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                          : p.published
                            ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                      }`}
                    >
                      {p.published ? (pageCovered ? "Publicada" : "Publicada (sin plan)") : "Borrador"}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-slate-400 dark:text-[#F5F2EA]/40">
                    {template?.label ?? p.pageTemplate}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* MENÚS */}
      <div className="flex flex-col gap-4">
        <div className={sectionHeaderClass}>
          <div>
            <h2 className="text-lg font-bold">Menús</h2>
            <p className="text-xs text-slate-500 dark:text-[#F5F2EA]/50">
              Podés tener varios — solo uno puede estar activo a la vez.
              {restaurant?.slug && publishedMenu && (
                <>
                  {" "}
                  <Link
                    href={`/${restaurant.slug}/menu`}
                    target="_blank"
                    className="font-bold text-sky-600 hover:underline dark:text-sky-300"
                  >
                    Ver menú público →
                  </Link>
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowMenuForm((prev) => !prev)}
            className="shrink-0 rounded-full bg-sky-500 px-5 py-2 text-sm font-bold text-white shadow-xs transition-colors hover:bg-sky-600"
          >
            {showMenuForm ? "Cancelar" : "+ Nuevo menú"}
          </button>
        </div>

        {showMenuForm && (
          <form
            onSubmit={handleCreateMenu}
            className="flex flex-col gap-3 rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824]"
          >
            <input
              name="name"
              required
              placeholder="Nombre del menú (ej: Carta principal)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
            />
            <input
              name="description"
              placeholder="Descripción (opcional)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
            />
            <div>
              <span className="mb-2 block text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">Plantilla</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {MENU_TEMPLATES.map((t) => (
                  <label
                    key={t.value}
                    className={`flex cursor-pointer flex-col gap-2 rounded-xl border-2 p-4 transition ${
                      newMenuTemplate === t.value
                        ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10"
                        : "border-slate-200 dark:border-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="menuTemplateChoice"
                      className="hidden"
                      checked={newMenuTemplate === t.value}
                      onChange={() => setNewMenuTemplate(t.value)}
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
            </div>
            <button
              type="submit"
              disabled={creatingMenu}
              className="mt-1 flex h-10 w-full items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white transition-colors hover:bg-sky-600 disabled:opacity-60"
            >
              {creatingMenu ? "Creando…" : "Crear menú"}
            </button>
          </form>
        )}

        {menus === null ? (
          <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Cargando…</p>
        ) : menus.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Todavía no creaste ningún menú.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {menus.map((m) => {
              const template = MENU_TEMPLATES.find((t) => t.value === m.menuTemplate);
              return (
                <Link key={m._id} href={`/dashboard/restaurants/${restaurantId}/menus/${m._id}`} className={cardClass}>
                  <div className="flex items-center gap-2">
                    <div className="text-base font-bold">{m.name}</div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        m.published !== false && menuCovered
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                          : m.published !== false
                            ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                      }`}
                    >
                      {m.published !== false ? (menuCovered ? "Activo" : "Activo (sin plan)") : "Borrador"}
                    </span>
                  </div>
                  {m.description && (
                    <div className="mt-1 text-sm text-slate-600 dark:text-[#F5F2EA]/60">{m.description}</div>
                  )}
                  <div className="mt-2 text-xs font-semibold text-slate-400 dark:text-[#F5F2EA]/40">
                    {template?.label ?? m.menuTemplate} · {m.items.length} {m.items.length === 1 ? "producto" : "productos"}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6 dark:border-white/10">
        {restaurant && (
          <>
            <Link
              href={`/dashboard/restaurants/${restaurantId}/profile`}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:bg-white/5 dark:text-[#F5F2EA]"
            >
              Editar datos generales →
            </Link>
            <Link
              href={`/dashboard/restaurants/${restaurantId}/billing`}
              className="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:bg-white/5 dark:text-[#F5F2EA]"
            >
              Plan y facturación →
              {billing && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    billing.isAdmin
                      ? "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
                      : billing.isActive
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                  }`}
                >
                  {billing.isAdmin ? "Admin" : billing.isActive ? "Activo" : "Sin plan"}
                </span>
              )}
            </Link>
          </>
        )}
      </div>

      {deleteOpen && (
        <ConfirmDeleteDialog
          title="Eliminar restaurante"
          description={`Esto borra "${restaurant?.name}" de forma permanente.`}
          deleting={deleting}
          onConfirm={handleDeleteRestaurant}
          onCancel={() => setDeleteOpen(false)}
        />
      )}
    </div>
  );
}
