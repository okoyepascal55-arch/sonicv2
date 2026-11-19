/* ─────────────────────────────────────────────
   Image resolution check for the dashboard (19.11.2026)
   Compares an image's real pixel size with the size its slot needs
   (DESIGN_SPECS „dimensions“, e.g. "~1200×800" or "1920×1080 / 800×800").
   An image passes when it reaches ~90 % of ANY listed size in both directions.
───────────────────────────────────────────── */

export interface SizeTarget { w: number; h: number }

/** All "W×H" pairs in a spec string; empty when the spec names no size. */
export function parseTargetSizes(dimensions: string | undefined | null): SizeTarget[] {
  if (!dimensions) return [];
  return [...dimensions.matchAll(/(\d{2,5})\s*[×x]\s*(\d{2,5})/g)].map((m) => ({ w: Number(m[1]), h: Number(m[2]) }));
}

export interface SizeVerdict { ok: boolean; need: SizeTarget | null }

export function checkImageSize(width: number, height: number, targets: SizeTarget[]): SizeVerdict {
  if (!targets.length || !width || !height) return { ok: true, need: null };
  const fits = (t: SizeTarget) => width >= t.w * 0.9 && height >= t.h * 0.9;
  if (targets.some(fits)) return { ok: true, need: null };
  // Smallest size that would be enough
  const need = [...targets].sort((a, b) => a.w * a.h - b.w * b.h)[0];
  return { ok: false, need };
}

/** Pixel size of an image file (before upload); null if it can't be read (e.g. video). */
export async function readImageFileSize(file: File): Promise<{ w: number; h: number } | null> {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return null;
  try {
    const bmp = await createImageBitmap(file);
    const size = { w: bmp.width, h: bmp.height };
    bmp.close();
    return size;
  } catch {
    return null;
  }
}
