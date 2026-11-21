"use client";

import { useRef, useState } from "react";
import { uploadImage, imageUrl } from "@/lib/uploadImage";

export function ImageUploadField({
  label,
  imageKey,
  onChange,
  aspect = "aspect-video",
}: {
  label: string;
  imageKey?: string;
  onChange: (imageKey: string) => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(imageUrl(imageKey));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    try {
      const { key } = await uploadImage(file);
      onChange(key);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la imagen.");
      setPreview(imageUrl(imageKey));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-xs font-semibold text-slate-700 dark:text-[#F5F2EA]/75">{label}</span>}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`relative w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 ${aspect} flex items-center justify-center text-xs font-semibold text-slate-400 transition hover:border-sky-400 hover:text-sky-600 dark:border-white/15 dark:bg-white/5`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt={label} className="h-full w-full object-cover" />
        ) : (
          <span>{uploading ? "Subiendo…" : "+ Subir imagen"}</span>
        )}
        {uploading && preview && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-bold text-white">
            Subiendo…
          </span>
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileChange} />
      {error && <span className="text-[11px] font-semibold text-red-500">{error}</span>}
    </div>
  );
}
