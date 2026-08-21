/**
 * Resizes and re-compresses images in public/images that are larger than
 * necessary for web delivery. Mirrors the same treatment src/lib/imageCompress.ts
 * already applies to dashboard uploads (cap longest edge at 1920px, quality 0.8),
 * but as a one-time/on-demand pass over the existing asset library, which was
 * never run through that pipeline (many files are raw camera exports).
 *
 * Safe to re-run: files already under the size threshold, or that wouldn't
 * shrink from re-encoding, are left untouched.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Without this, libvips keeps a cached handle on the source file open even
// after pipeline.destroy() — Windows then refuses to overwrite that same
// path ("unknown error, open ...") even though the read itself succeeded.
sharp.cache(false);

const IMAGES_DIR = path.resolve(__dirname, 'public/images');
const MAX_DIMENSION = 1920;
const QUALITY = 80;
const SKIP_UNDER_BYTES = 300 * 1024; // don't bother re-encoding already-reasonable files

function walk(dir, out = []) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

async function optimizeOne(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const originalSize = fs.statSync(file).size;
  if (originalSize <= SKIP_UNDER_BYTES) return null;

  // A single sharp instance, explicitly destroyed afterwards — reusing/leaking
  // instances across ~180 sequential files exhausts file handles on Windows.
  const pipeline = sharp(file, { failOn: 'none' });
  try {
    const meta = await pipeline.metadata();
    const longest = Math.max(meta.width || 0, meta.height || 0);

    if (longest > MAX_DIMENSION) {
      pipeline.resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    if (ext === '.webp') pipeline.webp({ quality: QUALITY });
    else if (ext === '.jpg' || ext === '.jpeg') pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    else if (ext === '.png') pipeline.png({ quality: QUALITY, compressionLevel: 9 });

    const buffer = await pipeline.toBuffer();
    pipeline.destroy(); // release the read handle on `file` BEFORE writing back to it — Windows
                         // refuses to overwrite a path sharp/libvips still has open (unlike POSIX).

    if (buffer.length >= originalSize) return null; // never make it worse

    fs.writeFileSync(file, buffer);
    return { file, originalSize, newSize: buffer.length, from: `${meta.width}x${meta.height}` };
  } catch (e) {
    pipeline.destroy();
    throw e;
  }
}

(async () => {
  const files = walk(IMAGES_DIR);
  const results = [];
  let scanned = 0;

  for (const file of files) {
    scanned++;
    try {
      const r = await optimizeOne(file);
      if (r) results.push(r);
    } catch (e) {
      console.error(`FAILED: ${file}: ${e.message}`);
    }
  }

  let totalBefore = 0;
  let totalAfter = 0;
  for (const r of results) {
    totalBefore += r.originalSize;
    totalAfter += r.newSize;
    const pct = (100 * (1 - r.newSize / r.originalSize)).toFixed(0);
    console.log(
      `${(r.originalSize / 1024).toFixed(0)}KB -> ${(r.newSize / 1024).toFixed(0)}KB (-${pct}%)  [${r.from}]  ${path.relative(IMAGES_DIR, r.file)}`
    );
  }

  console.log('');
  console.log(`Scanned ${scanned} files, optimized ${results.length}.`);
  console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB (saved ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)}MB)`);
})();
