import { useEffect, useRef, useState } from 'react';
import { resolveImageUrl } from '@/lib/mediaStore';

/**
 * Wood texture background that is never blown up (19.11.2026).
 * - Image at least as large as the box → fills it (like object-cover, sharp).
 * - Image smaller than the box → repeated at its own size instead of being stretched.
 * - Long thin strips (e.g. the metrics tickers) → image fitted to the strip height and
 *   repeated sideways, so the wood grain keeps its proportions.
 * Fills its parent (absolute/inset or w-full h-full by the caller's className).
 */
export default function WoodBackground({ url, className = 'w-full h-full' }: { url: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const src = resolveImageUrl(url);
  const [mode, setMode] = useState<'cover' | 'tile' | 'strip'>('tile');
  // Tile width in CSS px = image px ÷ screen density, so every tile stays pin-sharp on retina screens
  const [tileWidth, setTileWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    const img = new Image();
    const decide = () => {
      const box = ref.current?.getBoundingClientRect();
      if (!box || cancelled) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Large enough for the box at screen sharpness → cover; otherwise tile without upscaling
      const bigEnough = img.naturalWidth >= box.width * dpr * 0.9 && img.naturalHeight >= box.height * dpr * 0.9;
      const isStrip = box.height > 0 && box.width / box.height > 4;
      setMode(bigEnough ? 'cover' : isStrip ? 'strip' : 'tile');
      setTileWidth(img.naturalWidth ? Math.max(1, Math.round(img.naturalWidth / dpr)) : null);
    };
    img.onload = decide;
    img.src = src;
    window.addEventListener('resize', decide);
    return () => { cancelled = true; window.removeEventListener('resize', decide); };
  }, [src]);

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{
        backgroundImage: src ? `url("${src}")` : undefined,
        backgroundRepeat: mode === 'tile' ? 'repeat' : mode === 'strip' ? 'repeat-x' : 'no-repeat',
        backgroundSize: mode === 'cover' ? 'cover' : mode === 'strip' ? 'auto 100%' : tileWidth ? `${tileWidth}px auto` : 'auto',
        backgroundPosition: mode === 'strip' ? 'left center' : 'center',
      }}
    />
  );
}
