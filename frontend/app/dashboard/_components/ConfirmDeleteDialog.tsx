"use client";

import { useState } from "react";

/**
 * Mount this conditionally from the parent (`{open && <ConfirmDeleteDialog ... />}`)
 * rather than passing an `open` prop to an always-mounted instance — that way the
 * confirmation text field starts empty every time, with no reset effect needed.
 */
export function ConfirmDeleteDialog({
  title,
  description,
  confirmWord = "Eliminar",
  deleting = false,
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  confirmWord?: string;
  deleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState("");

  const matches = value.trim() === confirmWord;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl border-2 border-red-200 bg-white p-6 shadow-xl dark:border-red-400/30 dark:bg-[#141824]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-red-600 dark:text-red-400">{title}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-[#F5F2EA]/60">{description}</p>
        <p className="mt-3 text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">
          Escribí <span className="font-mono font-bold text-red-600 dark:text-red-400">{confirmWord}</span> para
          confirmar:
        </p>
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && matches && !deleting) onConfirm();
          }}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-white/15 dark:bg-white/5"
        />
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/15 dark:text-[#F5F2EA] dark:hover:bg-white/5"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={!matches || deleting}
            onClick={onConfirm}
            className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700 disabled:opacity-40"
          >
            {deleting ? "Eliminando…" : "Eliminar definitivamente"}
          </button>
        </div>
      </div>
    </div>
  );
}
