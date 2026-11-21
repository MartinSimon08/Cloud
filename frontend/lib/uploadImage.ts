import { getIdToken } from "@/lib/auth";

/** Downscales an image file client-side via canvas before upload, so stored images stay small. */
export function resizeImageFile(file: File, maxDimension = 1200, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("No se pudo procesar la imagen"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);

      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("No se pudo procesar la imagen"))),
        outputType,
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("No se pudo leer la imagen"));
    };
    img.src = objectUrl;
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
    reader.readAsDataURL(blob);
  });
}

export async function uploadImage(file: File): Promise<{ key: string }> {
  const resized = await resizeImageFile(file);
  const data = await blobToBase64(resized);
  const idToken = await getIdToken();
  if (!idToken) throw new Error("No autenticado");

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBase) throw new Error("Falta configurar NEXT_PUBLIC_API_BASE_URL");

  const res = await fetch(`${apiBase}/images`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ contentType: resized.type, data }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(typeof body.error === "string" ? body.error : "No se pudo subir la imagen.");
  }
  return res.json();
}

export function imageUrl(imageKey: string | undefined | null): string | undefined {
  const base = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;
  return imageKey && base ? `${base}/${imageKey}` : undefined;
}
