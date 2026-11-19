import { useEffect, useRef, useState } from 'react';
import { resolveImageUrl } from '@/lib/mediaStore';

/**
 * Wood texture background that is never blown up (19.11.2026).
 * - Image at least as large as the box → fills it (like object-cover, sharp).
 * - Image smaller than the box → repeated at its own size instead of being stretched.
 * Fills its parent (absolute/inset or w-full h-full by the caller's className).
 */
export default function WoodBackground({ url, className = 'w-full h-full' }: { url: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const src = resolveImageUrl(url);
  const [mode, setMode] = useState<'cover' | 'tile'>('tile');
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
      setMode(bigEnough ? 'cover' : 'tile');
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
        backgroundRepeat: mode === 'tile' ? 'repeat' : 'no-repeat',
        backgroundSize: mode === 'cover' ? 'cover' : tileWidth ? `${tileWidth}px auto` : 'auto',
        backgroundPosition: 'center',
      }}
    />
  );
}
