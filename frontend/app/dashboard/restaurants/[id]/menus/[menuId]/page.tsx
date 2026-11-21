"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiError, type BillingInfo, type Menu, type MenuItem, type Restaurant } from "@/lib/api";
import { ImageUploadField } from "@/app/dashboard/_components/ImageUploadField";
import { ConfirmDeleteDialog } from "@/app/dashboard/_components/ConfirmDeleteDialog";
import { MENU_TEMPLATES } from "@/lib/templates/registry";
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

function emptyItem(): MenuItem {
  return { id: crypto.randomUUID(), name: "", description: "", ingredients: [], price: 0, category: "" };
}

export default function MenuEditPage() {
  const params = useParams<{ id: string; menuId: string }>();
  const router = useRouter();
  const { id: restaurantId, menuId } = params;

  const [menu, setMenu] = useState<Menu | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [billing, setBilling] = useState<BillingInfo | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [menuTemplate, setMenuTemplate] = useState<string>(MENU_TEMPLATES[0].value);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [togglingPublish, setTogglingPublish] = useState(false);

  useEffect(() => {
    Promise.all([api.getMenu(menuId), api.getRestaurant(restaurantId), api.getBilling(restaurantId)])
      .then(([m, r, b]) => {
        setMenu(m);
        setRestaurant(r);
        setBilling(b);
        setName(m.name);
        setDescription(m.description);
        setMenuTemplate(m.menuTemplate);
        setItems(m.items);
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "No se pudo cargar el menú."));
  }, [menuId, restaurantId]);

  function updateItem(id: string, patch: Partial<MenuItem>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem()]);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const cleanItems = items
        .filter((item) => item.name.trim())
        .map((item) => ({ ...item, price: Number.isFinite(item.price) ? item.price : 0 }));
      const updated = await api.updateMenu(menuId, { name, description, menuTemplate, items: cleanItems });
      setMenu(updated);
      setItems(updated.items);
      setSaved(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo guardar el menú.");
    } finally {
      setSaving(false);
    }
  }

  async function handleTogglePublish() {
    if (!menu) return;
    setTogglingPublish(true);
    setError(null);
    try {
      const updated = await api.updateMenu(menuId, { published: !(menu.published !== false) });
      setMenu(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo actualizar el estado del menú.");
    } finally {
      setTogglingPublish(false);
    }
  }

  async function handleDeleteMenu() {
    setDeleting(true);
    setError(null);
    try {
      await api.deleteMenu(menuId);
      router.push(`/dashboard/restaurants/${restaurantId}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo eliminar el menú.");
      setDeleting(false);
      setDeleteOpen(false);
    }
  }

  const menuCovered = Boolean(
    billing && (billing.isAdmin || (billing.isActive && billing.subscription && featureCovers(billing.subscription.feature, "menu")))
  );
  const liveButBlocked = menu?.published !== false && Boolean(menu) && !menuCovered;

  if (!menu || !restaurant) {
    return error ? (
      <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
        {error}
      </div>
    ) : (
      <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Cargando…</p>
    );
  }

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
          <h1 className="text-2xl font-bold">Editar menú</h1>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            aria-label="Eliminar menú"
            title="Eliminar menú"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50 dark:border-red-400/30 dark:text-red-300 dark:hover:bg-red-400/10"
          >
            <TrashIcon />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              menu.published === false
                ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                : menuCovered
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                  : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300"
            }`}
          >
            {menu.published === false ? "Borrador" : menuCovered ? "Activo" : "Activo (sin plan)"}
          </span>
          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={togglingPublish}
            className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 transition hover:border-sky-400 hover:text-sky-600 disabled:opacity-60 dark:border-white/15 dark:bg-white/5 dark:text-[#F5F2EA]"
          >
            {togglingPublish ? "Guardando…" : menu.published === false ? "Publicar este menú" : "Despublicar"}
          </button>
          <Link
            href={`/${restaurant.slug}/menu?preview=${menuId}`}
            target="_blank"
            className="text-xs font-bold text-sky-600 hover:underline dark:text-sky-300"
          >
            Ver vista previa →
          </Link>
        </div>
        {liveButBlocked && (
          <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-300">
            Este menú está marcado como activo pero no se muestra al público porque el restaurante no tiene un plan activo que lo
            cubra.{" "}
            <Link href={`/dashboard/restaurants/${restaurantId}/billing`} className="underline">
              Activar un plan →
            </Link>
          </p>
        )}
        {menu.published === false && (
          <p className="mt-1 text-xs text-slate-500 dark:text-[#F5F2EA]/50">
            Al publicar este menú, cualquier otro menú de este restaurante se despublica automáticamente — solo uno
            puede estar activo a la vez.
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

      <div className="flex flex-col gap-3 rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824]">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">
          Nombre del menú
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">
          Descripción
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
          />
        </label>
        <div>
          <span className="mb-2 block text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">Plantilla</span>
          <div className="grid gap-3 sm:grid-cols-2">
            {MENU_TEMPLATES.map((t) => (
              <label
                key={t.value}
                className={`flex cursor-pointer flex-col gap-2 rounded-xl border-2 p-4 transition ${
                  menuTemplate === t.value
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10"
                    : "border-slate-200 dark:border-white/10"
                }`}
              >
                <input
                  type="radio"
                  name="menuTemplateChoice"
                  className="hidden"
                  checked={menuTemplate === t.value}
                  onChange={() => setMenuTemplate(t.value)}
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
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Productos</h2>
          <button
            type="button"
            onClick={addItem}
            className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:bg-white/5 dark:text-[#F5F2EA]"
          >
            + Agregar producto
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Este menú todavía no tiene productos.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-3 rounded-2xl border-2 border-slate-200 bg-white p-4 sm:grid-cols-[96px_1fr] dark:border-white/10 dark:bg-[#141824]"
              >
                <div className="w-24">
                  <ImageUploadField
                    label=""
                    imageKey={item.photoKey}
                    onChange={(photoKey) => updateItem(item.id, { photoKey })}
                    aspect="aspect-square"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-center">
                    <input
                      value={item.name}
                      onChange={(e) => updateItem(item.id, { name: e.target.value })}
                      placeholder="Nombre del plato"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
                    />
                    <input
                      value={item.category ?? ""}
                      onChange={(e) => updateItem(item.id, { category: e.target.value })}
                      placeholder="Categoría"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, { price: parseFloat(e.target.value) || 0 })}
                      placeholder="Precio"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="justify-self-start rounded-full border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 dark:border-red-400/30 dark:text-red-300 dark:hover:bg-red-400/10"
                    >
                      Quitar
                    </button>
                  </div>
                  <input
                    value={item.description ?? ""}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    placeholder="Descripción (opcional)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
                  />
                  <input
                    value={(item.ingredients ?? []).join(", ")}
                    onChange={(e) =>
                      updateItem(item.id, {
                        ingredients: e.target.value
                          .split(",")
                          .map((i) => i.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="Ingredientes, separados por coma"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-white/10">
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="text-xs font-bold text-red-600 hover:underline dark:text-red-300"
        >
          Eliminar menú
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-sky-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-600 disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>

      {deleteOpen && (
        <ConfirmDeleteDialog
          title="Eliminar menú"
          description={`Esto borra el menú "${menu.name}" y todos sus productos de forma permanente.`}
          deleting={deleting}
          onConfirm={handleDeleteMenu}
          onCancel={() => setDeleteOpen(false)}
        />
      )}
    </div>
  );
}
