import { useCallback, useEffect, useRef, useState } from 'react';
import { EraData } from '../page';
import CoverflowFilmstrip from './CoverflowFilmstrip';
import PhotoSelector from './PhotoSelector';
import PhotoLightbox from './PhotoLightbox';
import FilmEdge from './FilmEdge';

// ── Film grain overlay ─────────────────────────────────────────────────────
function FilmGrain({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        opacity,
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundSize: '150px 150px',
        mixBlendMode: 'overlay',
      }}
    />
  );
}

// ── Era pill nav — horizontal era selector (text pills) ──────────────────
function EraPillNav({
  eras,
  activeIndex,
  onSelect,
}: {
  eras: EraData[];
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeRef.current || !stripRef.current) return;
    const container = stripRef.current;
    const btn = activeRef.current;
    const scrollTarget = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <div className="relative z-20 w-full" style={{ background: '#161512', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div
        ref={stripRef}
        className="relative overflow-x-auto py-4 px-4 md:px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex items-center gap-3 w-max mx-auto">
          {eras.map((era, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={era.id}
                ref={isActive ? activeRef : null}
                onClick={() => onSelect(i)}
                className="relative flex-shrink-0 cursor-pointer group whitespace-nowrap"
                style={{
                  padding: '16px 32px 20px',
                  borderRadius: 8,
                  background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: isActive ? `1px solid ${era.accent}77` : '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.25s ease',
                }}
                aria-label={`${era.label} — ${era.tagline}`}
              >
                {/* Frame number */}
                <div
                  className="text-center leading-none mb-2"
                  style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: isActive ? era.accent : 'rgba(255,255,255,0.25)', fontWeight: 900, letterSpacing: '0.15em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Year range */}
                <div
                  className="text-center leading-none"
                  style={{ fontFamily: '"Bebas Neue", Impact, sans-serif', fontSize: '1.3rem', color: isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.4)', fontWeight: 400, letterSpacing: '0.04em', transition: 'color 0.25s ease' }}
                >
                  {era.label}
                </div>
                {/* Active underline glow */}
                <div
                  className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-300"
                  style={{ background: isActive ? era.accent : 'transparent', boxShadow: isActive ? `0 0 8px ${era.accent}88` : 'none' }}
                />
                {!isActive && <div className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-transparent group-hover:bg-white/10 transition-colors" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main timeline ──────────────────────────────────────────────────────────
const CROSSFADE_MS = 130;

export default function SonicReelsTimeline({ eras }: { eras: EraData[] }) {
  const [activeIndex, setActiveIndex] = useState(0); // selected era
  const [displayIndex, setDisplayIndex] = useState(0); // era shown (lags during crossfade)
  const [photoIndex, setPhotoIndex] = useState(0); // photo within displayed era
  const [fading, setFading] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const era = eras[displayIndex];
  const total = eras.length;
  const photoTotal = era.photos.length;

  // Film-dissolve crossfade between eras
  useEffect(() => {
    if (displayIndex === activeIndex) return;
    setFading(true);
    const t = setTimeout(() => {
      setDisplayIndex(activeIndex);
      setFading(false);
    }, CROSSFADE_MS);
    return () => clearTimeout(t);
  }, [activeIndex, displayIndex]);

  // Reset photo index whenever the displayed era actually changes
  useEffect(() => {
    setPhotoIndex(0);
  }, [displayIndex]);

  // Advance/retreat one photo; wraps across eras
  const step = useCallback(
    (dir: 1 | -1) => {
      setPlaying(false);
      const count = eras[activeIndex].photos.length;
      if (dir === 1) {
        if (photoIndex + 1 < count) setPhotoIndex(photoIndex + 1);
        else setActiveIndex((activeIndex + 1) % total);
      } else {
        if (photoIndex - 1 >= 0) setPhotoIndex(photoIndex - 1);
        else setActiveIndex((activeIndex - 1 + total) % total);
      }
    },
    [activeIndex, photoIndex, total, eras],
  );

  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Auto-advance the reel (photos, then eras)
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => stepRef.current(1), 2200);
    return () => clearInterval(t);
  }, [playing]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') stepRef.current(1);
      else if (e.key === 'ArrowLeft') stepRef.current(-1);
      else if (e.key === ' ') {
        e.preventDefault();
        setPlaying((v) => !v);
      } else if (e.key === 'Escape' && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen]);

  const handleSelectEra = useCallback((i: number) => {
    setActiveIndex(i);
    setPlaying(false);
  }, []);

  const handleSelectPhoto = useCallback((i: number) => {
    setPhotoIndex(i);
    setPlaying(false);
  }, []);

  const handleExpand = useCallback((i: number) => {
    setPhotoIndex(i);
    setPlaying(false);
    setLightboxOpen(true);
  }, []);

  const handleNavigate = useCallback(
    (i: number) => {
      const clamped = ((i % photoTotal) + photoTotal) % photoTotal;
      setPhotoIndex(clamped);
    },
    [photoTotal],
  );

  const startYear = era.years.split('–')[0];

  return (
    <div className="relative w-full overflow-hidden" style={{ background: '#161512' }}>
      <FilmGrain opacity={0.05} />

      {/* ── Top film edge — dotted sprocket perforations ── */}
      <FilmEdge accent={era.accent} code="SONIC REELS · 5219" />

      {/* Background glow in the era accent */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700"
        style={{ background: `radial-gradient(ellipse 60% 50% at 75% 40%, ${era.accent}0d, transparent 70%)` }}
      />

      {/* ── Era pill nav (era selector) ── */}
      <EraPillNav eras={eras} activeIndex={activeIndex} onSelect={handleSelectEra} />

      {/* ── Era spotlight + coverflow — crossfades on era change ── */}
      <div className="relative" style={{ opacity: fading ? 0 : 1, transition: `opacity ${CROSSFADE_MS}ms ease` }}>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-6 md:pb-10 text-center">
          {/* Tagline eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-12" style={{ background: `linear-gradient(to left, ${era.accent}, transparent)` }} />
            <span className="font-black uppercase tracking-[0.3em] whitespace-nowrap" style={{ fontSize: '0.62rem', color: era.accent }}>
              {era.tagline}
            </span>
            <div className="h-px w-12" style={{ background: `linear-gradient(to right, ${era.accent}, transparent)` }} />
          </div>

          {/* Large year number */}
          <div
            className="font-black leading-none select-none"
            style={{ fontSize: 'clamp(4.5rem, 12vw, 8.5rem)', color: era.accent, fontFamily: '"Bebas Neue", Impact, sans-serif', letterSpacing: '-0.03em', lineHeight: 0.9 }}
          >
            {startYear}
          </div>

          {/* Accent underline */}
          <div className="h-[3px] w-44 mx-auto mt-4 mb-7" style={{ background: `linear-gradient(to right, transparent, ${era.accent}, transparent)` }} />

          {/* First-person quote */}
          <blockquote
            className="font-medium leading-snug max-w-2xl mx-auto"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', lineHeight: 1.45 }}
          >
            &ldquo;{era.quote}&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-8" style={{ background: era.accent }} />
            <span className="font-black uppercase tracking-[0.18em] whitespace-nowrap" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.45)' }}>
              {era.attribution}
            </span>
            <div className="h-px w-8" style={{ background: era.accent }} />
          </div>

          {/* Full year range */}
          <p className="mt-4 font-black uppercase tracking-[0.25em]" style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>
            {era.years}
          </p>
        </div>

        {/* ── Coverflow filmstrip (photos of this era) ── */}
        <div className="relative z-10">
          <CoverflowFilmstrip
            key={era.id}
            photos={era.photos}
            activeIndex={photoIndex}
            onExpand={handleExpand}
            onSelect={handleSelectPhoto}
            filter={era.filter}
            accent={era.accent}
          />
        </div>
      </div>

      {/* ── Photo selector — contact sheet of the current era's images ── */}
      <PhotoSelector
        photos={era.photos}
        activeIndex={photoIndex}
        accent={era.accent}
        eraLabel={era.label}
        onSelect={handleSelectPhoto}
        playing={playing}
        onTogglePlay={() => setPlaying((v) => !v)}
      />

      {/* ── Bottom film edge ── */}
      <FilmEdge
        accent={era.accent}
        code={`FRAME ${String(activeIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
      />

      {/* ── Full-screen lightbox ── */}
      {lightboxOpen && (
        <PhotoLightbox
          photos={era.photos}
          index={photoIndex}
          accent={era.accent}
          eraLabel={era.label}
          onClose={() => setLightboxOpen(false)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}