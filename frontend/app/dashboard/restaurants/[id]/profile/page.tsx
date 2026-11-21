"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api, ApiError, type Restaurant } from "@/lib/api";
import { ImageUploadField } from "@/app/dashboard/_components/ImageUploadField";
import { ToggleSwitch } from "@/app/dashboard/_components/ToggleSwitch";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5";
const labelClass = "flex flex-col gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75";

export default function RestaurantProfilePage() {
  const params = useParams<{ id: string }>();
  const restaurantId = params.id;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [logoImageKey, setLogoImageKey] = useState<string | undefined>(undefined);
  const [coverImageKey, setCoverImageKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    api
      .getRestaurant(restaurantId)
      .then((r) => {
        setRestaurant(r);
        setLogoImageKey(r.logoImageKey);
        setCoverImageKey(r.coverImageKey);
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "No se pudo cargar el restaurante."));
  }, [restaurantId]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    const form = new FormData(e.currentTarget);

    setSaving(true);
    try {
      const updated = await api.updateRestaurant(restaurantId, {
        name: String(form.get("name") ?? ""),
        description: String(form.get("description") ?? ""),
        address: String(form.get("address") ?? ""),
        phone: String(form.get("phone") ?? ""),
        phoneEnabled: form.get("phoneEnabled") === "on",
        email: String(form.get("email") ?? ""),
        emailEnabled: form.get("emailEnabled") === "on",
        hours: String(form.get("hours") ?? ""),
        hoursEnabled: form.get("hoursEnabled") === "on",
        mapsUrl: String(form.get("mapsUrl") ?? ""),
        mapsUrlEnabled: form.get("mapsUrlEnabled") === "on",
        instagram: String(form.get("instagram") ?? ""),
        instagramEnabled: form.get("instagramEnabled") === "on",
        facebook: String(form.get("facebook") ?? ""),
        facebookEnabled: form.get("facebookEnabled") === "on",
        whatsapp: String(form.get("whatsapp") ?? ""),
        whatsappEnabled: form.get("whatsappEnabled") === "on",
        slug: String(form.get("slug") ?? ""),
        logoImageKey,
        coverImageKey,
      });
      setRestaurant(updated);
      setSaved(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo guardar el perfil.");
    } finally {
      setSaving(false);
    }
  }

  if (!restaurant) {
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
        <h1 className="mt-2 text-2xl font-bold">Datos generales</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-[#F5F2EA]/60">
          Logo, portada, nombre y contacto — se usan sin importar qué página elijas publicar.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-xs font-medium text-red-800 dark:border-red-400/30 dark:bg-red-400/10 dark:text-red-300">
          {error}
        </div>
      )}
      {saved && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300">
          Datos guardados.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <ImageUploadField label="Logo" imageKey={logoImageKey} onChange={setLogoImageKey} aspect="aspect-square" />
          <ImageUploadField label="Portada" imageKey={coverImageKey} onChange={setCoverImageKey} aspect="aspect-video" />
        </div>

        <div className="grid gap-4 rounded-2xl border-2 border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#141824] sm:grid-cols-2">
          <label className={labelClass}>
            Nombre
            <input name="name" required defaultValue={restaurant.name} className={inputClass} />
          </label>
          <label className={labelClass}>
            URL pública (tu-sitio.com/<em>esto</em>)
            <input name="slug" defaultValue={restaurant.slug} className={inputClass} />
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Descripción
            <textarea name="description" rows={3} defaultValue={restaurant.description} className={inputClass} />
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Dirección (calle, barrio, ciudad)
            <input name="address" defaultValue={restaurant.address ?? ""} className={inputClass} />
          </label>
          <label className={labelClass}>
            <span className="flex items-center justify-between gap-2">
              Teléfono
              <ToggleSwitch name="phoneEnabled" defaultChecked={restaurant.phoneEnabled !== false} />
            </span>
            <input name="phone" defaultValue={restaurant.phone ?? ""} className={inputClass} />
          </label>
          <label className={labelClass}>
            <span className="flex items-center justify-between gap-2">
              Email
              <ToggleSwitch name="emailEnabled" defaultChecked={restaurant.emailEnabled !== false} />
            </span>
            <input name="email" type="email" defaultValue={restaurant.email ?? ""} className={inputClass} />
          </label>
          <label className={labelClass}>
            <span className="flex items-center justify-between gap-2">
              Horarios
              <ToggleSwitch name="hoursEnabled" defaultChecked={restaurant.hoursEnabled !== false} />
            </span>
            <input name="hours" placeholder="Lun a Vie 11:00-23:00" defaultValue={restaurant.hours ?? ""} className={inputClass} />
          </label>
          <label className={labelClass}>
            <span className="flex items-center justify-between gap-2">
              Link de Google Maps
              <ToggleSwitch name="mapsUrlEnabled" defaultChecked={restaurant.mapsUrlEnabled !== false} />
            </span>
            <input name="mapsUrl" type="url" defaultValue={restaurant.mapsUrl ?? ""} className={inputClass} />
          </label>
          <label className={labelClass}>
            <span className="flex items-center justify-between gap-2">
              Instagram
              <ToggleSwitch name="instagramEnabled" defaultChecked={restaurant.instagramEnabled !== false} />
            </span>
            <input name="instagram" placeholder="@tu_restaurante" defaultValue={restaurant.instagram ?? ""} className={inputClass} />
          </label>
          <label className={labelClass}>
            <span className="flex items-center justify-between gap-2">
              Facebook
              <ToggleSwitch name="facebookEnabled" defaultChecked={restaurant.facebookEnabled !== false} />
            </span>
            <input name="facebook" placeholder="tu_restaurante" defaultValue={restaurant.facebook ?? ""} className={inputClass} />
          </label>
          <label className={labelClass}>
            <span className="flex items-center justify-between gap-2">
              WhatsApp
              <ToggleSwitch name="whatsappEnabled" defaultChecked={restaurant.whatsappEnabled !== false} />
            </span>
            <input
              name="whatsapp"
              placeholder="+54 9 11 1234-5678"
              defaultValue={restaurant.whatsapp ?? ""}
              className={inputClass}
            />
            <span className="text-[11px] font-normal text-slate-400 dark:text-[#F5F2EA]/40">
              Si lo cargás, aparece un botón de WhatsApp en tus páginas y en tu menú.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="self-end rounded-full bg-sky-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-600 disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar"}
        </button>
      </form>
    </div>
  );
}
