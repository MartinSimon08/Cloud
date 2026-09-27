"use client";

import { useState, type FormEvent } from "react";
import type { LandingContent } from "../_lib/types";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-transparent px-3 py-2.5 text-sm text-[#F5F2EA] outline-none placeholder:text-[#F5F2EA]/35 focus:border-white/30";

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
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#141419] p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#00C853]/40 text-[#00C853]">
          ✓
        </div>
        <p className="text-sm text-[#F5F2EA]/80">{contact.sentMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#141419] p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs font-medium text-[#F5F2EA]/70">
          Nombre
          <input name="name" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-medium text-[#F5F2EA]/70">
          WhatsApp
          <input name="phone" type="tel" required className={inputClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-[#F5F2EA]/70">
        Empresa / negocio
        <input name="company" required className={inputClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-[#F5F2EA]/70">
        ¿Qué estás buscando resolver?
        <textarea name="message" rows={3} className={inputClass} />
      </label>
      <button
        type="submit"
        className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#00C853] px-5 text-sm font-semibold text-[#041608] transition-colors hover:bg-[#2ae36c]"
      >
        {contact.submitLabel}
      </button>
    </form>
  );
}
