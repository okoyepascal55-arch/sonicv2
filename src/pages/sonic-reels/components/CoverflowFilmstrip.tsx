import { useEffect, useRef, useState } from 'react';
import type { EraPhoto } from '../page';

// ── Film grain data URI (SVG feTurbulence, shared) ───────────────────────
const GRAIN =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

// ── A single Polaroid card ────────────────────────────────────────────────
function PolaroidCard({
  photo,
  isActive,
  filter,
  accent,
}: {
  photo: EraPhoto;
  isActive: boolean;
  filter: string;
  accent: string;
}) {
  return (
    <div
      className="relative rounded-[12px]"
      style={{
        background: '#f5efe0',
        padding: '14px 14px 40px 14px',
        boxShadow: isActive ? '0 18px 34px -8px rgba(15,10,0,0.6)' : '0 6px 14px -4px rgba(15,10,0,0.35)',
        transition: 'box-shadow 0.22s ease',
      }}
    >
      {/* Photo mask */}
      <div className="relative overflow-hidden rounded-[9px]" style={{ aspectRatio: '4 / 3' }}>
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover object-top"
          draggable={false}
          style={{ filter, transition: 'filter 0.5s ease' }}
          loading="lazy"
        />
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.4) 100%)' }} />
        {/* Accent light leak */}
        <div className="absolute top-0 left-0 w-2/5 h-full pointer-events-none" style={{ background: `linear-gradient(to right, ${accent}26, transparent)` }} />
        {/* Grain — active card only */}
        {isActive && <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06, backgroundImage: GRAIN, backgroundSize: '150px 150px', mixBlendMode: 'overlay' }} />}

        {/* Expand hint — always visible on active card, hover on others */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          style={{ background: isActive ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.35)' }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(0,0,0,0.65)', borderRadius: 999 }}>
            <i className="ri-fullscreen-line text-white" style={{ fontSize: '0.95rem' }} />
            <span className="whitespace-nowrap" style={{ fontFamily: 'monospace', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#fff', fontWeight: 900 }}>
              {isActive ? 'ZUM VERGRÖSSERN TIPPEN' : 'ANZEIGEN'}
            </span>
          </div>
        </div>
      </div>

      {/* Handwritten caption strip */}
      <div className="pt-2.5 px-1 text-center">
        <p style={{ fontFamily: '"Caveat", cursive', fontSize: '1rem', color: '#2e2820', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {photo.caption}
        </p>
      </div>
    </div>
  );
}

// ── Coverflow filmstrip (draggable + click-to-expand) ────────────────────
export default function CoverflowFilmstrip({
  photos,
  activeIndex,
  onExpand,
  onSelect,
  filter,
  accent,
}: {
  photos: EraPhoto[];
  activeIndex: number;
  onExpand: (i: number) => void;
  onSelect: (i: number) => void;
  filter: string;
  accent: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [dragging, setDragging] = useState(false);
  const dragState = useRef({ startX: 0, startScroll: 0, moved: false });

  // Center the active card in the viewport
  useEffect(() => {
    const container = containerRef.current;
    const card = cardRefs.current[activeIndex];
    if (!container || !card) return;
    const target = card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeIndex, photos]);

  // Mouse-drag horizontal scroll
  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, startScroll: containerRef.current?.scrollLeft ?? 0, moved: false };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !containerRef.current) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    containerRef.current.scrollLeft = dragState.current.startScroll - dx;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const settling = useRef(false);

  const handleCardClick = (i: number) => {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    if (i === activeIndex) {
      // Already centred — expand on click
      if (!settling.current) onExpand(i);
    } else {
      // Not centred — move to centre first, lock expand briefly so a fast
      // double-tap can't accidentally open the lightbox before card settles
      settling.current = true;
      onSelect(i);
      setTimeout(() => { settling.current = false; }, 350);
    }
  };

  const active = photos[activeIndex];

  return (
    <div className="w-full">
      {/* ── Scrolling coverflow row ── */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', touchAction: 'pan-y' }}
      >
        <div
          className="flex items-center px-[16%] sm:px-[15%] md:px-[13%]"
          style={{ height: '470px', paddingTop: '30px', paddingBottom: '32px' }}
        >
          {photos.map((photo, i) => {
            const offset = i - activeIndex;
            const isActive = offset === 0;
            const abs = Math.abs(offset);

            let scale = 1;
            let rotate = 0;
            let opacity = 1;
            let z = 20;
            if (!isActive) {
              scale = abs === 1 ? 0.78 : abs === 2 ? 0.63 : 0.52;
              rotate = (offset < 0 ? -1 : 1) * (abs === 1 ? 6 : abs === 2 ? 10 : 12);
              opacity = abs === 1 ? 0.85 : abs === 2 ? 0.55 : 0.3;
              z = 20 - abs;
            }

            return (
              <button
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => handleCardClick(i)}
                aria-label={isActive ? `Expand photo: ${photo.caption}` : `Select photo: ${photo.caption}`}
                className="shrink-0 cursor-pointer group"
                style={{
                  width: 'clamp(260px, 36vw, 420px)',
                  transform: `scale(${scale}) rotate(${rotate}deg)`,
                  transformOrigin: 'center bottom',
                  opacity,
                  zIndex: z,
                  marginLeft: i === 0 ? 0 : -52,
                  transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease, box-shadow 0.22s ease',
                }}
              >
                <PolaroidCard photo={photo} isActive={isActive} filter={filter} accent={accent} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Active caption line ── */}
      <div className="flex items-center justify-center gap-4 px-6 pb-2">
        <div className="h-px w-10 sm:w-16" style={{ background: `${accent}66` }} />
        <span key={activeIndex} className="text-center font-medium animate-fadeIn" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)', letterSpacing: '0.02em' }}>
          {active?.caption}
        </span>
        <div className="h-px w-10 sm:w-16" style={{ background: `${accent}66` }} />
      </div>
    </div>
  );
}