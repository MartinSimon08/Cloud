"use client";

import { useState, type FormEvent } from "react";
import type { LandingContent } from "../_lib/types";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:border-sky-400 dark:focus:bg-transparent";

export function ContactForm({
  contact,
}: {
  contact: LandingContent["contact"];
}) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-white/10 dark:bg-[#141824]">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400">
          ✓
        </div>
        <p className="text-sm font-medium text-slate-700 dark:text-[#F5F2EA]/90">{contact.sentMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-sky-500/5 sm:p-8 dark:border-white/10 dark:bg-[#141824] dark:shadow-none"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">
          Nombre
          <input name="name" required placeholder="Tu nombre" className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">
          WhatsApp
          <input name="phone" type="tel" required placeholder="+54 9 11 ..." className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">
        Empresa / negocio
        <input name="company" required placeholder="Nombre de tu restaurante o bar" className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">
        ¿Qué estás buscando resolver?
        <textarea name="message" rows={3} placeholder="Menú QR, pedidos por WhatsApp, delivery propio..." className={inputClass} />
      </label>
      <button
        type="submit"
        className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-600 active:scale-[0.99]"
      >
        {contact.submitLabel}
      </button>
    </form>
  );
}
