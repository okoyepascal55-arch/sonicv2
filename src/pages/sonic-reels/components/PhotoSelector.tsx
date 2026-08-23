import { useEffect, useRef } from 'react';
import type { EraPhoto } from '../page';

// ── Contact sheet — thumbnail pills of the current era's photos ───────────
// Selecting individual images within a single era (NOT era navigation).
export default function PhotoSelector({
  photos,
  activeIndex,
  accent,
  eraLabel,
  onSelect,
  playing,
  onTogglePlay,
}: {
  photos: EraPhoto[];
  activeIndex: number;
  accent: string;
  eraLabel: string;
  onSelect: (i: number) => void;
  playing: boolean;
  onTogglePlay: () => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeRef.current || !stripRef.current) return;
    const container = stripRef.current;
    const btn = activeRef.current;
    const target = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div className="relative z-20 w-full" style={{ background: '#11100d', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Label + counter */}
      <div className="flex items-center gap-4 px-4 md:px-6" style={{ height: 32 }}>
        <span
          className="whitespace-nowrap"
          style={{ fontFamily: 'monospace', fontSize: '0.58rem', color: `${accent}88`, fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}
        >
          {eraLabel} · Contact Sheet
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <span className="whitespace-nowrap" style={{ fontFamily: 'monospace', fontSize: '0.58rem', color: 'rgba(255,255,255,0.28)', fontWeight: 900, letterSpacing: '0.15em' }}>
          PHOTO {String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </span>
      </div>

      {/* Thumbnails + play/pause */}
      <div className="flex items-stretch">
        {/* Play / pause */}
        <button
          onClick={onTogglePlay}
          className="flex-shrink-0 flex items-center justify-center cursor-pointer transition-colors duration-200"
          style={{
            width: 56,
            background: playing ? accent : '#1a1915',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            color: playing ? '#161512' : 'rgba(255,255,255,0.6)',
          }}
          aria-label={playing ? 'Pause reel' : 'Play reel'}
        >
          <i className={playing ? 'ri-pause-fill' : 'ri-play-fill'} style={{ fontSize: '1.4rem' }} />
        </button>

        {/* Thumbnails */}
        <div
          ref={stripRef}
          className="flex items-center gap-2 overflow-x-auto py-2.5 px-3 flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {photos.map((photo, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                ref={isActive ? activeRef : null}
                onClick={() => onSelect(i)}
                className="relative flex-shrink-0 cursor-pointer group"
                style={{
                  width: 74,
                  border: isActive ? `2px solid ${accent}` : '1px solid rgba(255,255,255,0.08)',
                  background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                  transition: 'border-color 0.25s ease, transform 0.25s ease, background 0.25s ease',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
                aria-label={`Photo ${i + 1}: ${photo.caption}`}
                aria-current={isActive}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden" style={{ height: 46 }}>
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                    style={{
                      filter: isActive ? 'none' : 'grayscale(0.65) brightness(0.55)',
                      transition: 'filter 0.3s ease',
                    }}
                    loading="lazy"
                  />
                  {isActive && <div className="absolute inset-0 pointer-events-none" style={{ background: `${accent}1f`, mixBlendMode: 'overlay' }} />}
                </div>
                {/* Index */}
                <div className="text-center leading-none py-1" style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)', fontWeight: 700 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Active underline */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: isActive ? accent : 'transparent' }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}