/**
 * Client-side image compression for the dashboard upload flow.
 *
 * Large raster images (JPG / PNG / WebP) are re-encoded as optimized WebP
 * with their resolution capped at full-HD. This dramatically reduces file
 * size (and therefore page load time) without any visible quality loss.
 *
 * SVG (vector) and already-small files pass through untouched.
 */

const MAX_DIMENSION = 1920; // cap the longest edge to full-HD width
const QUALITY = 0.8; // WebP quality (0-1)
const MIN_COMPRESS_SIZE = 200 * 1024; // only compress files larger than 200 KB

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
  // Skip SVG — it's vector art and should never be rasterized.
  if (file.type === 'image/svg+xml') return file;

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