"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function QrCodeModal({ url, label, onClose }: { url: string; label: string; onClose: () => void }) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(url, { width: 512, margin: 2 })
      .then((d) => {
        if (!cancelled) setDataUrl(d);
      })
      .catch(() => {
        if (!cancelled) setError("No se pudo generar el código QR.");
      });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-6 text-center shadow-xl dark:border-white/10 dark:bg-[#141824]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold">Código QR — {label}</h3>
        <p className="break-all text-xs text-slate-500 dark:text-[#F5F2EA]/50">{url}</p>

        {error && (
          <p className="text-sm font-semibold text-red-600 dark:text-red-300">{error}</p>
        )}
        {!error && !dataUrl && <p className="text-sm text-slate-500 dark:text-[#F5F2EA]/50">Generando…</p>}
        {dataUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUrl} alt={`Código QR de ${label}`} className="h-64 w-64 rounded-xl border border-slate-200 dark:border-white/10" />
        )}

        <div className="flex w-full gap-3">
          {dataUrl && (
            <a
              href={dataUrl}
              download={`qr-${label.toLowerCase().replace(/\s+/g, "-")}.png`}
              className="flex h-10 flex-1 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white transition-colors hover:bg-sky-600"
            >
              Descargar PNG
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 flex-1 items-center justify-center rounded-full border border-slate-300 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/15 dark:text-[#F5F2EA] dark:hover:bg-white/10"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
