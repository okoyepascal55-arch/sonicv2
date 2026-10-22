import { useEffect, useRef, useState, type ReactNode } from 'react';

/*
  SRT „product UI“ kit (22.10.2026) — the SRT page speaks the language of the tool it sells:
  app-window bars, monospace status labels, a quiet grid, and the wooden icons (signature of the
  site) presented as live, gently animated app tiles. Presentation only — all texts, images and
  dashboard fields stay where they are.
*/

export const LIME = 'oklch(0.81 0.19 115)';
export const INK = 'oklch(0.13 0.005 118)';
export const PANEL = 'oklch(0.155 0.006 118)';
export const LINE = 'rgba(255,255,255,0.08)';
export const PAPER = '#F6F6F2';
export const HAIR = 'rgba(0,0,0,0.09)';
export const MUTED = 'rgba(0,0,0,0.55)';
export const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

/** Becomes true once the element scrolls into view (once). */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return { ref, seen };
}

/** Faint product grid behind dark sections. */
export function ProductGrid({ light = false }: { light?: boolean }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        opacity: light ? 0.05 : 0.045,
        backgroundImage: light
          ? 'linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)'
          : `linear-gradient(${LIME} 1px, transparent 1px), linear-gradient(90deg, ${LIME} 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 85%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 85%)',
      }}
    />
  );
}

/** Small monospace label, e.g. „MODUL 01“ or „STATUS · LIVE“. */
export function Mono({ children, dim = false, className = '' }: { children: ReactNode; dim?: boolean; className?: string }) {
  return (
    <span className={`text-[10px] uppercase tracking-[0.16em] ${className}`} style={{ fontFamily: MONO, color: dim ? 'rgba(255,255,255,0.38)' : LIME }}>
      {children}
    </span>
  );
}

/** App window top bar: three dots, a mono title and a live status dot. */
export function WindowBar({ title, status = 'Live', light = false }: { title: ReactNode; status?: string; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 px-4 h-9 flex-shrink-0" style={{ borderBottom: `1px solid ${light ? 'rgba(0,0,0,0.08)' : LINE}`, background: light ? 'rgba(0,0,0,0.025)' : 'rgba(255,255,255,0.025)' }}>
      <span className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => <span key={i} className="w-2 h-2 rounded-full" style={{ background: light ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.16)' }} />)}
      </span>
      <span className="flex-1 min-w-0 truncate text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: light ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.45)' }}>{title}</span>
      {status && (
        <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: light ? 'oklch(0.55 0.08 115)' : LIME }}>
          <span className="srt-live-dot w-1.5 h-1.5 rounded-full" style={{ background: LIME }} aria-hidden="true" />
          {status}
        </span>
      )}
    </div>
  );
}

/**
 * The site's wooden icon as a modern tile: pops in when it scrolls into view, floats gently
 * and lifts on hover (calm version, 22.10.2026 — no sheen).
 * (Animations switch off for visitors who prefer reduced motion.)
 */
export function WoodIcon({ src, alt, size = 56, delay = 0 }: { src: string; alt: string; size?: number; delay?: number }) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.3);
  return (
    <span
      ref={ref}
      className={`srt-wood group/wood relative inline-flex flex-shrink-0 overflow-hidden ${seen ? 'srt-wood-in' : 'opacity-0'}`}
      style={{ width: size, height: size, animationDelay: `${delay}ms`, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 12px 28px -14px rgba(0,0,0,0.35)' }}
    >
      <img src={src} alt={alt} className="srt-wood-float w-full h-full object-cover" style={{ animationDelay: `${delay + 600}ms` }} loading="lazy" decoding="async" />
    </span>
  );
}

/** Light section header used across the SRT page: eyebrow, large headline, optional side text. */
export function SrtHeader({ eyebrow, title, side, center = false, dark = false }: { eyebrow: ReactNode; title: ReactNode; side?: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'text-center' : 'grid md:grid-cols-[1.2fr_1fr] gap-6 md:gap-16 items-end'}`}>
      <div>
        <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
          <span className="w-7 h-0.5 bg-primary-500" aria-hidden="true" />
          <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: dark ? LIME : 'oklch(0.55 0.08 115)' }}>{eyebrow}</span>
        </div>
        <h2 className={`sonic-h2 ${dark ? 'text-white' : 'text-foreground-950'}`}>{title}</h2>
      </div>
      {side && <div className={`text-[15px] md:text-[16px] leading-relaxed ${center ? 'mt-5 max-w-2xl mx-auto' : ''}`} style={{ color: dark ? 'rgba(255,255,255,0.6)' : MUTED }}>{side}</div>}
    </div>
  );
}
