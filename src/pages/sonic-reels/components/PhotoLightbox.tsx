import { useEffect } from 'react';
import type { EraPhoto } from '../page';
import FilmEdge from './FilmEdge';

const GRAIN =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

// ── Full-screen film-negative lightbox ────────────────────────────────────
export default function PhotoLightbox({
  photos,
  index,
  accent,
  eraLabel,
  onClose,
  onNavigate,
}: {
  photos: EraPhoto[];
  index: number;
  accent: string;
  eraLabel: string;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const photo = photos[index];
  const total = photos.length;

  // Keyboard + body scroll lock
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNavigate((index + 1) % total);
      else if (e.key === 'ArrowLeft') onNavigate((index - 1 + total) % total);
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [index, total, onClose, onNavigate]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-fullscreen flex items-center justify-center animate-fadeIn"
      style={{ background: 'rgba(5,5,3,0.95)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.caption}`}
    >
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.05, backgroundImage: GRAIN, backgroundSize: '150px 150px' }} />

      {/* Film edges */}
      <div className="absolute top-0 inset-x-0"><FilmEdge accent={accent} code={eraLabel} /></div>
      <div className="absolute bottom-0 inset-x-0"><FilmEdge accent={accent} code="5219" /></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-20 py-20" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center" style={{ minHeight: '56vh' }}>
          <img
            src={photo.src}
            alt={photo.caption}
            title={`${photo.caption} — ${eraLabel}`}
            className="max-w-full max-h-[60vh] object-contain"
            style={{ borderRadius: 4, filter: 'none', boxShadow: '0 30px 80px -20px rgba(0,0,0,0.8)' }}
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Caption + counter */}
        <div className="mt-6 text-center">
          <p
            className="animate-fadeIn"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}
          >
            {photo.caption}
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: `${accent}66` }} />
            <span style={{ fontFamily: 'monospace', fontSize: '0.58rem', letterSpacing: '0.3em', color: `${accent}`, fontWeight: 900 }}>
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {eraLabel}
            </span>
            <span className="h-px w-8" style={{ background: `${accent}66` }} />
          </div>
        </div>
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + total) % total); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 cursor-pointer transition-colors duration-200"
        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
        aria-label="Previous photo"
        onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}33`; e.currentTarget.style.borderColor = `${accent}`; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
      >
        <i className="ri-arrow-left-s-line" style={{ fontSize: '1.6rem' }} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % total); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 cursor-pointer transition-colors duration-200"
        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
        aria-label="Next photo"
        onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}33`; e.currentTarget.style.borderColor = `${accent}`; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
      >
        <i className="ri-arrow-right-s-line" style={{ fontSize: '1.6rem' }} />
      </button>

      {/* Close */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-5 right-5 z-20 flex items-center justify-center w-11 h-11 cursor-pointer transition-colors duration-200"
        style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
        aria-label="Close"
        onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}33`; e.currentTarget.style.borderColor = `${accent}`; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
      >
        <i className="ri-close-line" style={{ fontSize: '1.4rem' }} />
      </button>
    </div>
  );
}