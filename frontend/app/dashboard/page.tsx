"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, ApiError, type Restaurant } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setError(null);
    try {
      const data = await api.listRestaurants();
      setRestaurants(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudieron cargar tus restaurantes.");
    }
  }

  useEffect(() => {
    api
      .listRestaurants()
      .then((data) => setRestaurants(data))
      .catch((err) => setError(err instanceof ApiError ? err.message : "No se pudieron cargar tus restaurantes."));
  }, []);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return;

    setCreating(true);
    setError(null);
    try {
      const created = await api.createRestaurant({
        name,
        description: String(form.get("description") ?? ""),
        address: String(form.get("address") ?? ""),
      });
      formEl.reset();
      setShowForm(false);
      router.push(`/dashboard/restaurants/${created._id}`);
      return;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear el restaurante.");
      // A network-level failure (e.g. connection reset) can happen after the
      // server already wrote the record — refresh so the list reflects
      // reality instead of leaving the user unsure if it actually saved.
      await load();
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis restaurantes</h1>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-full bg-sky-500 px-5 py-2 text-sm font-bold text-white shadow-xs transition-colors hover:bg-sky-600"
        >
          {showForm ? "Cancelar" : "+ Nuevo restaurante"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
          {error}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-3 rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824]"
        >
          <input
            name="name"
            required
            placeholder="Nombre del restaurante"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
          />
          <input
            name="description"
            placeholder="Descripción (opcional)"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
          />
          <input
            name="address"
            placeholder="Dirección (opcional)"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5"
          />
          <button
            type="submit"
            disabled={creating}
            className="mt-1 flex h-10 w-full items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white transition-colors hover:bg-sky-600 disabled:opacity-60"
          >
            {creating ? "Creando…" : "Crear restaurante"}
          </button>
        </form>
      )}

      {restaurants === null ? (
        <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Cargando…</p>
      ) : restaurants.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">
          Todavía no creaste ningún restaurante.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {restaurants.map((r) => (
            <Link
              key={r._id}
              href={`/dashboard/restaurants/${r._id}`}
              className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-lg dark:border-white/10 dark:bg-[#141824]"
            >
              <div className="text-base font-bold">{r.name}</div>
              {r.description && (
                <div className="mt-1 text-sm text-slate-600 dark:text-[#F5F2EA]/60">{r.description}</div>
              )}
              {r.address && (
                <div className="mt-2 text-xs font-semibold text-slate-400 dark:text-[#F5F2EA]/40">{r.address}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
