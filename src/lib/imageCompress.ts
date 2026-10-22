/**
 * Client-side image compression for the dashboard upload flow.
 *
 * High-quality mode (22.10.2026): photos stay sharp on large and retina screens.
 * Only very large photos are re-encoded — as WebP at 92 % quality, longest edge up to
 * 3840 px (4K), with high-quality resampling. The original is kept whenever it is
 * already within those limits or the re-encode would not be smaller.
 *
 * SVG (vector), PNG/GIF (logos, icons, transparency) and files up to 1.5 MB pass
 * through untouched.
 */

const MAX_DIMENSION = 3840; // cap the longest edge at 4K — sharp on retina / large screens
const QUALITY = 0.92; // WebP quality (0-1) — visually lossless
const MIN_COMPRESS_SIZE = 1.5 * 1024 * 1024; // only touch files larger than 1.5 MB

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

export async function compressImage(file: File): Promise<File> {
  // Skip SVG (vector) and PNG/GIF (logos, icons, transparency) — never re-encode those.
  if (file.type === 'image/svg+xml' || file.type === 'image/png' || file.type === 'image/gif') return file;

  // Skip small files that don't need optimization.
  if (file.size <= MIN_COMPRESS_SIZE) return file;

  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);

    // Cap resolution so oversized screenshots / photos don't inflate the bundle.
    let width = img.naturalWidth || img.width;
    let height = img.naturalHeight || img.height;
    const longest = Math.max(width, height);
    if (longest > MAX_DIMENSION) {
      const scale = MAX_DIMENSION / longest;
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, width, height);

    // Re-encode as WebP (preserves transparency, best compression ratio).
    const blob = await canvasToBlob(canvas, 'image/webp', QUALITY);

    // Only keep the result if it's actually smaller than the original.
    if (blob && blob.size < file.size) {
      const name = file.name.replace(/\.[^.]+$/, '') + '.webp';
      return new File([blob], name, { type: 'image/webp' });
    }

    return file;
  } catch {
    // Canvas unavailable or decoding failed — fall back to the original file.
    return file;
  } finally {
    URL.revokeObjectURL(url);
  }
}