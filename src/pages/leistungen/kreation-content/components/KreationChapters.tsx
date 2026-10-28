import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useMotionPaused } from '@/lib/motion';
import { useLeistungenText } from '@/hooks/useLeistungenText';
import { FALLBACKS, BEFORE_AFTER_FALLBACK, type ChapterId } from './kreationFallbacks';

/* ─────────────────────────────────────────────────────────────────────────
   Showcase as an exhibition in five chapters (28.10.2026).
   Each discipline gets the presentation that matches what it produces:
     01 Konzeption  → Die Pinnwand     (ideas pinned to a board)
     02 Innovation  → Die Bühne        (one stage, auto-advancing like a launch film)
     03 CI          → Das Markenblatt  (a brand-guideline sheet with grid and crop marks)
     04 Layout      → Der Druckbogen   (magazine spreads you drag through)
     05 POS         → Im Markt         (CGI → reality slider + an aisle of shelf facings)
   Data is exactly what the old tabbed showcase used — nothing in the dashboard changes:
     Texts:  Text → Kreation & Content — Showcase (Rahmen) + Showcase: <Kapitel>
     Images: Media → Kreation Showcase Grid (shared) / Alt-Rotation <Kapitel> (per chapter)
             Media → Kreation Before/After Slider
───────────────────────────────────────────────────────────────────────── */

const ORDER: ChapterId[] = ['konzeption', 'innovation', 'ci', 'layout', 'pos'];
const ITEM_COUNT = 6;

type Item = { id: string; tag: string; title: string; sub: string; src: string };
type MediaList = { url: string }[];

function buildItems(id: ChapterId, t: Record<string, string>, secondary: MediaList, primary: MediaList): Item[] {
  return Array.from({ length: ITEM_COUNT }, (_, i) => ({
    id: `${id}-${i + 1}`,
    tag: t[`i${i + 1}-tag`] ?? '',
    title: t[`i${i + 1}-title`] ?? '',
    sub: t[`i${i + 1}-sub`] ?? '',
    src: secondary[i]?.url ? resolveImageUrl(secondary[i].url) : primary[i]?.url ? resolveImageUrl(primary[i].url) : FALLBACKS[id][i],
  }));
}

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Lightbox (shared by all chapters) ─────────────────────────────────── */
function Lightbox({ items, startIndex, onClose }: { items: Item[]; startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setIndex((v) => (v - 1 + items.length) % items.length);
      if (event.key === 'ArrowRight') setIndex((v) => (v + 1) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [items.length, onClose]);
  const item = items[index];

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-foreground-950/97 flex flex-col" style={{ backdropFilter: 'blur(18px)' }} role="dialog" aria-modal="true" aria-label={item.title} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/[0.07]">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-primary-500 text-foreground-950">{item.tag}</span>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-white/40 tabular-nums">{index + 1} / {items.length}</span>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center border border-white/[0.12] text-white/70 hover:bg-primary-500 hover:text-foreground-950 transition-colors cursor-pointer" aria-label="Schließen"><i className="ri-close-line" aria-hidden="true" /></button>
        </div>
      </div>
      <div className="relative flex-1 flex items-center justify-center px-14 md:px-20 py-8">
        <button onClick={() => setIndex((v) => (v - 1 + items.length) % items.length)} className="absolute left-3 md:left-5 w-11 h-11 border border-white/[0.12] text-white/70 hover:bg-primary-500 hover:text-foreground-950 flex items-center justify-center cursor-pointer" aria-label="Vorheriges Bild"><i className="ri-arrow-left-line text-lg" aria-hidden="true" /></button>
        <img src={item.src} alt={item.title} className="max-w-full max-h-[70vh] object-contain" />
        <button onClick={() => setIndex((v) => (v + 1) % items.length)} className="absolute right-3 md:right-5 w-11 h-11 border border-white/[0.12] text-white/70 hover:bg-primary-500 hover:text-foreground-950 flex items-center justify-center cursor-pointer" aria-label="Nächstes Bild"><i className="ri-arrow-right-line text-lg" aria-hidden="true" /></button>
      </div>
      <div className="px-6 md:px-8 py-5 border-t border-white/[0.07]">
        <h3 className="text-lg md:text-xl font-black uppercase text-white mb-1">{item.title}</h3>
        <p className="text-sm text-white/50">{item.sub}</p>
      </div>
    </div>,
    document.body,
  );
}

/* ── 01 Konzeption — Die Pinnwand ──────────────────────────────────────── */
const PINS = [
  { left: '3%', top: '7%', width: '31%', rotate: -4 },
  { left: '36%', top: '3%', width: '25%', rotate: 3 },
  { left: '64%', top: '9%', width: '32%', rotate: -2 },
  { left: '7%', top: '53%', width: '25%', rotate: 2.5 },
  { left: '35%', top: '47%', width: '31%', rotate: -3 },
  { left: '70%', top: '56%', width: '25%', rotate: 4 },
];

function PinCard({ item, onOpen, style, className = '' }: { item: Item; onOpen: () => void; style?: React.CSSProperties; className?: string }) {
  return (
    <button type="button" onClick={onOpen} className={`kr-pin text-left bg-[#f6f6f2] p-2 pb-3 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${className}`} style={{ boxShadow: '0 14px 30px -14px rgba(0,0,0,0.7)', ...style }}>
      {/* Lime tape */}
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-primary-500/85" style={{ transform: 'translateX(-50%) rotate(-3deg)' }} aria-hidden="true" />
      <span className="block relative overflow-hidden bg-foreground-950" style={{ aspectRatio: '4 / 3' }}>
        <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" draggable={false} />
      </span>
      <span className="block mt-2.5 px-1">
        <span className="block text-[10px] font-bold text-foreground-500 mb-0.5">{item.tag}</span>
        <span className="block text-foreground-950 font-black text-[12px] md:text-sm leading-tight hyphens-auto [overflow-wrap:anywhere]" lang="de">{item.title}</span>
      </span>
    </button>
  );
}

function Pinboard({ items, onOpen }: { items: Item[]; onOpen: (i: number) => void }) {
  const board = { background: 'oklch(0.13 0.005 118)', backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '22px 22px' };
  return (
    <>
      <div className="hidden md:block relative w-full" style={{ ...board, height: 'clamp(600px, 52vw, 720px)' }}>
        {items.map((item, i) => (
          <PinCard key={item.id} item={item} onOpen={() => onOpen(i)} className="absolute" style={{ left: PINS[i].left, top: PINS[i].top, width: PINS[i].width, transform: `rotate(${PINS[i].rotate}deg)`, zIndex: 10 + i }} />
        ))}
      </div>
      <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-7 p-5 pt-7 pb-8" style={board}>
        {items.map((item, i) => (
          <PinCard key={item.id} item={item} onOpen={() => onOpen(i)} className="relative" style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }} />
        ))}
      </div>
    </>
  );
}

/* ── 02 Innovation — Die Bühne ─────────────────────────────────────────── */
const STAGE_MS = 5000;

function Stage({ items, onOpen }: { items: Item[]; onOpen: (i: number) => void }) {
  const motionPaused = useMotionPaused();
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false);
  const running = inView && !hold && !motionPaused;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setIndex((v) => (v + 1) % items.length), STAGE_MS);
    return () => window.clearTimeout(timer);
  }, [running, index, items.length]);

  const item = items[index];
  const go = (d: number) => setIndex((v) => (v + d + items.length) % items.length);

  return (
    <div ref={ref} className="relative overflow-hidden bg-foreground-950 aspect-[4/5] md:aspect-[2/1]" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <button type="button" key={item.id} onClick={() => onOpen(index)} className="kr-stage-in absolute inset-0 w-full h-full cursor-zoom-in" aria-label={`${item.title} im Vollbild öffnen`}>
        <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
      </button>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 45%, rgba(0,0,0,0.85) 100%)' }} />

      {/* Story-style progress — click to jump */}
      <div className="absolute top-0 left-0 right-0 flex gap-1.5 p-4 md:p-5">
        {items.map((it, i) => (
          <button key={it.id} type="button" onClick={() => setIndex(i)} className="flex-1 h-6 flex items-center cursor-pointer" aria-label={it.title} aria-current={i === index}>
            <span className="relative block w-full h-[3px] bg-white/25 overflow-hidden">
              {i < index && <span className="absolute inset-0 bg-primary-500" />}
              {i === index && (
                running
                  ? <span key={`${index}-run`} className="kr-stage-progress absolute inset-0 bg-primary-500" style={{ animationDuration: `${STAGE_MS}ms` }} />
                  : <span className="absolute inset-y-0 left-0 w-1/3 bg-primary-500" />
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-9 flex items-end justify-between gap-6 pointer-events-none">
        <div key={item.id} className="kr-stage-in min-w-0">
          <span className="inline-block bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 mb-4">{item.tag}</span>
          <p className="text-white font-black uppercase leading-[0.95] mb-2 hyphens-auto [overflow-wrap:anywhere]" lang="de" style={{ fontSize: 'clamp(1.3rem, 4.4vw, 3.6rem)', letterSpacing: '-0.03em' }}>{item.title}</p>
          <p className="text-white/65 text-sm md:text-base">{item.sub}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 pointer-events-auto flex-shrink-0">
          <button type="button" onClick={() => go(-1)} className="w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:bg-primary-500 hover:text-foreground-950 hover:border-primary-500 transition-colors cursor-pointer" aria-label="Vorheriges"><i className="ri-arrow-left-line text-lg" aria-hidden="true" /></button>
          <button type="button" onClick={() => go(1)} className="w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:bg-primary-500 hover:text-foreground-950 hover:border-primary-500 transition-colors cursor-pointer" aria-label="Nächstes"><i className="ri-arrow-right-line text-lg" aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}

/* ── 03 CI — Das Markenblatt ───────────────────────────────────────────── */
function CropMarks() {
  const c = 'absolute w-3.5 h-3.5 border-foreground-950/60';
  return (
    <>
      <span className={`${c} -top-2 -left-2 border-t border-l`} aria-hidden="true" />
      <span className={`${c} -top-2 -right-2 border-t border-r`} aria-hidden="true" />
      <span className={`${c} -bottom-2 -left-2 border-b border-l`} aria-hidden="true" />
      <span className={`${c} -bottom-2 -right-2 border-b border-r`} aria-hidden="true" />
    </>
  );
}

const SHEET_SPANS = ['lg:col-span-7 lg:row-span-2', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'];

function BrandSheet({ items, onOpen }: { items: Item[]; onOpen: (i: number) => void }) {
  return (
    <div className="relative bg-white p-5 md:p-10" style={{ border: '1px solid oklch(var(--foreground-950) / 0.12)', backgroundImage: 'linear-gradient(oklch(var(--foreground-950) / 0.045) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--foreground-950) / 0.045) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      {/* Sheet header like a guideline page */}
      <div className="flex items-center justify-between gap-4 pb-4 mb-8 md:mb-10" style={{ borderBottom: '2px solid oklch(var(--foreground-950))' }}>
        <span className="text-foreground-950 font-black text-sm md:text-base uppercase tracking-tight">{items[0]?.tag}</span>
        <span className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-5 h-5 bg-foreground-950" /><span className="w-5 h-5 bg-primary-500" /><span className="w-5 h-5 bg-white" style={{ border: '1px solid oklch(var(--foreground-950) / 0.2)' }} />
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-5 md:gap-x-8 gap-y-8 md:gap-y-10 lg:auto-rows-[220px]">
        {items.map((item, i) => (
          <figure key={item.id} className={`flex flex-col min-w-0 ${SHEET_SPANS[i]} ${i === 0 || i === 5 ? 'col-span-2' : ''}`}>
            {i === 0 && (
              /* Dimension line over the key figure */
              <div className="hidden lg:flex items-center gap-2 mb-3 text-foreground-500" aria-hidden="true">
                <span className="w-px h-2.5 bg-current" /><span className="flex-1 h-px bg-current" />
                <span className="text-[10px] font-mono">{item.sub}</span>
                <span className="flex-1 h-px bg-current" /><span className="w-px h-2.5 bg-current" />
              </div>
            )}
            <button type="button" onClick={() => onOpen(i)} className={`relative flex-1 min-h-[120px] md:min-h-[180px] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${i === 0 ? 'min-h-[260px]' : ''}`}>
              <CropMarks />
              <span className="absolute inset-0 overflow-hidden bg-foreground-100">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" loading="lazy" />
              </span>
            </button>
            <figcaption className="mt-4 flex items-baseline gap-3">
              <span className="hidden sm:inline text-[10px] font-mono text-foreground-500 tabular-nums flex-shrink-0">Abb. {String(i + 1).padStart(2, '0')}</span>
              <span className="min-w-0">
                <span className="block text-foreground-950 font-black text-[13px] md:text-sm leading-tight hyphens-auto [overflow-wrap:anywhere]" lang="de">{item.title}</span>
                {i !== 0 && <span className="block text-foreground-500 text-xs mt-0.5">{item.sub}</span>}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ── 04 Layout — Der Druckbogen ────────────────────────────────────────── */
function Spreads({ items, onOpen }: { items: Item[]; onOpen: (i: number) => void }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (i: number) => {
    const row = rowRef.current;
    const el = row?.children[i] as HTMLElement | undefined;
    if (row && el) row.scrollTo({ left: el.offsetLeft - row.offsetLeft, behavior: 'smooth' });
  };

  const onScroll = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const kids = Array.from(row.children) as HTMLElement[];
    const x = row.scrollLeft + row.offsetLeft + 40;
    let idx = 0;
    kids.forEach((k, i) => { if (k.offsetLeft <= x) idx = i; });
    setActive(idx);
  }, []);

  return (
    <div>
      <div
        ref={rowRef}
        onScroll={onScroll}
        onMouseDown={(e) => { const row = rowRef.current; if (row) drag.current = { x: e.clientX, left: row.scrollLeft, moved: false }; }}
        onMouseMove={(e) => { const d = drag.current; const row = rowRef.current; if (!d || !row) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true; row.scrollLeft = d.left - dx; }}
        onMouseUp={() => { setTimeout(() => { drag.current = null; }, 0); }}
        onMouseLeave={() => { drag.current = null; }}
        className="kr-spreads flex gap-6 md:gap-10 overflow-x-auto pb-2 cursor-grab active:cursor-grabbing select-none"
      >
        {items.map((item, i) => {
          const mirrored = i % 2 === 1;
          const page = 2 * i + 2;
          const picture = (
            <button type="button" onClick={() => { if (!drag.current?.moved) onOpen(i); }} className="relative overflow-hidden bg-foreground-950 cursor-zoom-in min-h-[220px] md:min-h-0" aria-label={`${item.title} im Vollbild öffnen`}>
              <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="lazy" draggable={false} />
            </button>
          );
          const text = (
            <div className="relative bg-[#fbfbf8] p-6 md:p-10 flex flex-col">
              <span className="text-[11px] font-bold text-foreground-500 mb-auto">{item.tag}</span>
              <p className="text-foreground-950 font-black uppercase leading-[0.95] mt-8 mb-3" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.3rem)', letterSpacing: '-0.03em' }}>{item.title}</p>
              <p className="text-foreground-600 text-sm leading-relaxed max-w-[30ch]">{item.sub}</p>
              <span className="mt-8 w-10 h-1 bg-primary-500" aria-hidden="true" />
            </div>
          );
          return (
            <article key={item.id} className="relative flex-shrink-0 w-[85vw] md:w-[min(880px,78vw)]" style={{ boxShadow: '0 30px 60px -30px rgba(0,0,0,0.45)' }}>
              <div className="grid md:grid-cols-2 md:h-[440px]">
                {mirrored ? <>{text}{picture}</> : <>{picture}{text}</>}
              </div>
              {/* Gutter shadow down the fold */}
              <span className="hidden md:block absolute top-0 bottom-0 left-1/2 w-10 -translate-x-1/2 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.06) 52%, transparent)' }} aria-hidden="true" />
              <span className="hidden md:block absolute bottom-3 left-4 text-[10px] font-mono text-white/70 mix-blend-difference tabular-nums">{page}</span>
              <span className="hidden md:block absolute bottom-3 right-4 text-[10px] font-mono text-foreground-500 tabular-nums">{page + 1}</span>
            </article>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4 mt-6">
        <div className="flex items-center gap-1.5">
          {items.map((it, i) => (
            <button key={it.id} type="button" onClick={() => scrollTo(i)} className="tap-target h-1 cursor-pointer transition-all duration-300" style={{ width: i === active ? 32 : 12, background: i === active ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-950) / 0.15)' }} aria-label={it.title} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => scrollTo(Math.max(0, active - 1))} className="w-11 h-11 flex items-center justify-center border border-foreground-950/15 text-foreground-950 hover:bg-foreground-950 hover:text-primary-500 transition-colors cursor-pointer" aria-label="Vorheriger Bogen"><i className="ri-arrow-left-line text-lg" aria-hidden="true" /></button>
          <button type="button" onClick={() => scrollTo(Math.min(items.length - 1, active + 1))} className="w-11 h-11 flex items-center justify-center border border-foreground-950/15 text-foreground-950 hover:bg-foreground-950 hover:text-primary-500 transition-colors cursor-pointer" aria-label="Nächster Bogen"><i className="ri-arrow-right-line text-lg" aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}

/* ── 05 POS — Im Markt ─────────────────────────────────────────────────── */
function BeforeAfter({ reality, cgi, t }: { reality: string; cgi: string; t: Record<string, string> }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(97, Math.max(3, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
        <div>
          <p className="text-[11px] font-bold mb-1.5" style={{ color: 'oklch(0.55 0.08 115)' }}>{t['ba-eyebrow']}</p>
          <h4 className="text-foreground-950 font-black text-xl md:text-2xl leading-tight">{t['ba-title']}</h4>
        </div>
        <p className="text-foreground-500 text-sm">{t['ba-hint']}</p>
      </div>
      <div
        ref={ref}
        className="relative overflow-hidden select-none cursor-col-resize bg-foreground-950 touch-pan-y"
        style={{ height: 'clamp(300px, 46vw, 580px)' }}
        onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
        onMouseDown={(e) => move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
        role="slider"
        aria-label={t['ba-title']}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'ArrowLeft') setPos((p) => Math.max(3, p - 5)); if (e.key === 'ArrowRight') setPos((p) => Math.min(97, p + 5)); }}
      >
        <img src={reality} alt={t['ba-label-real']} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <span className="absolute top-4 right-4 px-3 py-1.5 bg-black/55 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.12em] text-white">{t['ba-label-real']}</span>
        <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={cgi} alt={t['ba-label-cgi']} className="w-full h-full object-cover" draggable={false} />
          <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-[0.12em]">{t['ba-label-cgi']}</span>
        </div>
        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%` }}>
          <div className="w-0.5 h-full bg-primary-500 -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary-500 text-foreground-950 flex items-center justify-center"><i className="ri-arrow-left-right-line text-xl" aria-hidden="true" /></div>
        </div>
      </div>
    </div>
  );
}

function Aisle({ items, onOpen }: { items: Item[]; onOpen: (i: number) => void }) {
  return (
    <div className="kr-aisle mt-12 md:mt-16">
      <div className="flex lg:grid lg:grid-cols-6 gap-3 lg:gap-2 overflow-x-auto lg:overflow-visible kr-spreads pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(i)}
            className={`kr-facing ${i < 3 ? 'kr-facing-l' : 'kr-facing-r'} relative flex-shrink-0 w-[62vw] sm:w-[40vw] lg:w-auto text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500`}
            style={{ ['--kr-turn' as string]: `${(i < 3 ? 1 : -1) * (34 - (i < 3 ? i : 5 - i) * 10)}deg` }}
          >
            <span className="block relative overflow-hidden bg-foreground-950" style={{ aspectRatio: '3 / 4' }}>
              <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute left-3 bottom-3 right-3 text-white font-black text-[13px] leading-tight">{item.title}</span>
            </span>
            {/* Shelf edge */}
            <span className="block h-2 bg-foreground-950" aria-hidden="true" />
            <span className="block h-1 bg-primary-500" aria-hidden="true" />
            <span className="block mt-2 text-[11px] text-foreground-500 font-bold">{item.tag}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Chapter frame ─────────────────────────────────────────────────────── */
function Chapter({ id, num, name, desc, next, children }: { id: ChapterId; num: string; name: string; desc: string; next?: { id: ChapterId; num: string; name: string }; children: ReactNode }) {
  return (
    <article id={`kapitel-${id}`} data-chapter={id} className="scroll-mt-[124px] lg:scroll-mt-[136px] py-14 md:py-20" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
        <div className="flex items-end gap-4 md:gap-6">
          <span className="font-black tabular-nums leading-none text-transparent" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', WebkitTextStroke: '1.5px oklch(0.62 0.15 115)', letterSpacing: '-0.04em' }} aria-hidden="true">{num}</span>
          <h3 className="text-foreground-950 font-black uppercase leading-[0.9] pb-1" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.8rem)', letterSpacing: '-0.035em' }}>{name}</h3>
        </div>
        <p className="text-foreground-600 text-[15px] leading-relaxed max-w-sm md:pb-2">{desc}</p>
      </header>
      {children}
      {next && (
        <a href={`#kapitel-${next.id}`} className="group mt-10 md:mt-12 flex items-center justify-between gap-4 py-5 px-5 md:px-6 bg-foreground-950 text-white hover:bg-primary-500 hover:text-foreground-950 transition-colors">
          <span className="flex items-baseline gap-3 min-w-0">
            <span className="text-xs text-white/50 group-hover:text-foreground-950/60 flex-shrink-0">Weiter</span>
            <span className="font-black tabular-nums text-primary-500 group-hover:text-foreground-950">{next.num}</span>
            <span className="font-black uppercase tracking-tight text-lg md:text-xl truncate">{next.name}</span>
          </span>
          <i className="ri-arrow-down-line text-xl flex-shrink-0 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

/* ── Showcase ──────────────────────────────────────────────────────────── */
export default function KreationChapters({ indexIcons }: { indexIcons: Record<ChapterId, string> }) {
  const t = useLeistungenText('leistungen_kreation_showcase');
  const tKonz = useLeistungenText('leistungen_kreation_showcase_konzeption');
  const tInno = useLeistungenText('leistungen_kreation_showcase_innovation');
  const tCi = useLeistungenText('leistungen_kreation_showcase_ci');
  const tLay = useLeistungenText('leistungen_kreation_showcase_layout');
  const tPos = useLeistungenText('leistungen_kreation_showcase_pos');
  const { images: primary } = useMediaStore('leistungen_kreation_showcase_images');
  const { images: secKonz } = useMediaStore('leistungen_kreation_showcase_secondary_konzeption');
  const { images: secInno } = useMediaStore('leistungen_kreation_showcase_secondary_innovation');
  const { images: secCi } = useMediaStore('leistungen_kreation_showcase_secondary_ci');
  const { images: secLay } = useMediaStore('leistungen_kreation_showcase_secondary_layout');
  const { images: secPos } = useMediaStore('leistungen_kreation_showcase_secondary_pos');
  const { images: beforeAfter } = useMediaStore('leistungen_kreation_before_after');

  const chapters: Record<ChapterId, Item[]> = {
    konzeption: buildItems('konzeption', tKonz, secKonz, primary),
    innovation: buildItems('innovation', tInno, secInno, primary),
    ci: buildItems('ci', tCi, secCi, primary),
    layout: buildItems('layout', tLay, secLay, primary),
    pos: buildItems('pos', tPos, secPos, primary),
  };
  const reality = beforeAfter[0]?.url ? resolveImageUrl(beforeAfter[0].url) : BEFORE_AFTER_FALLBACK[0];
  const cgi = beforeAfter[1]?.url ? resolveImageUrl(beforeAfter[1].url) : BEFORE_AFTER_FALLBACK[1];

  const [lightbox, setLightbox] = useState<{ id: ChapterId; index: number } | null>(null);
  const open = (id: ChapterId) => (index: number) => setLightbox({ id, index });

  // Sticky index follows the chapter in the middle of the screen
  const [active, setActive] = useState<ChapterId>('konzeption');
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = listRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.chapter as ChapterId); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    root.querySelectorAll('[data-chapter]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const name = (id: ChapterId) => t[`tab-${id}`] ?? id;
  const desc = (id: ChapterId) => t[`desc-${id}`] ?? '';
  const num = (id: ChapterId) => String(ORDER.indexOf(id) + 1).padStart(2, '0');
  const nextOf = (id: ChapterId) => ({ id, num: num(id), name: name(id) });

  return (
    <section id="konzept" className="relative bg-white px-4 md:px-6 pt-16 md:pt-24">
      <div className="sonic-container">
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{t['eyebrow']}</span></div>
          <h2 className="sonic-h2 text-foreground-950">{t['heading']}<br /><span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{t['heading-accent']}</span></h2>
        </div>

        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12 xl:gap-16">
          {/* Sticky chapter index (desktop) */}
          <nav className="hidden lg:block" aria-label="Kapitel">
            <ol className="sticky top-[140px] flex flex-col">
              {ORDER.map((id) => {
                const isActive = id === active;
                return (
                  <li key={id}>
                    <a href={`#kapitel-${id}`} className="group flex items-center gap-3 py-3 transition-colors" style={{ borderLeft: `2px solid ${isActive ? 'oklch(0.81 0.19 115)' : 'oklch(var(--foreground-950) / 0.1)'}`, paddingLeft: 14 }} aria-current={isActive ? 'true' : undefined}>
                      <img src={indexIcons[id]} alt="" className={`w-8 h-8 object-cover transition-all duration-300 ${isActive ? 'opacity-100 scale-110' : 'opacity-35 grayscale group-hover:opacity-70'}`} loading="lazy" />
                      <span className="flex flex-col">
                        <span className={`text-[10px] font-black tabular-nums ${isActive ? 'text-primary-600' : 'text-foreground-400'}`}>{num(id)}</span>
                        <span className={`text-sm font-black leading-tight ${isActive ? 'text-foreground-950' : 'text-foreground-500 group-hover:text-foreground-950'}`}>{name(id)}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div ref={listRef} className="min-w-0">
            {/* Mobile / tablet: slim pinned chapter bar while inside the showcase */}
            <nav className="lg:hidden sticky top-[64px] z-30 -mx-4 md:-mx-6 px-4 md:px-6 bg-white/95 backdrop-blur" style={{ borderBottom: '1px solid oklch(var(--foreground-950) / 0.1)' }} aria-label="Kapitel">
              <ol className="flex">
                {ORDER.map((id) => {
                  const isActive = id === active;
                  return (
                    <li key={id} className="flex-1 min-w-0">
                      <a href={`#kapitel-${id}`} className="flex flex-col items-center py-2.5" style={{ borderBottom: `2px solid ${isActive ? 'oklch(0.81 0.19 115)' : 'transparent'}` }} aria-current={isActive ? 'true' : undefined}>
                        <span className={`text-[10px] font-black tabular-nums ${isActive ? 'text-primary-600' : 'text-foreground-400'}`}>{num(id)}</span>
                        <span className={`text-[10px] sm:text-xs font-black truncate max-w-full ${isActive ? 'text-foreground-950' : 'text-foreground-500'}`}>{name(id)}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
            <Chapter id="konzeption" num={num('konzeption')} name={name('konzeption')} desc={desc('konzeption')} next={nextOf('innovation')}>
              <Pinboard items={chapters.konzeption} onOpen={open('konzeption')} />
            </Chapter>
            <Chapter id="innovation" num={num('innovation')} name={name('innovation')} desc={desc('innovation')} next={nextOf('ci')}>
              <Stage items={chapters.innovation} onOpen={open('innovation')} />
            </Chapter>
            <Chapter id="ci" num={num('ci')} name={name('ci')} desc={desc('ci')} next={nextOf('layout')}>
              <BrandSheet items={chapters.ci} onOpen={open('ci')} />
            </Chapter>
            <Chapter id="layout" num={num('layout')} name={name('layout')} desc={desc('layout')} next={nextOf('pos')}>
              <Spreads items={chapters.layout} onOpen={open('layout')} />
            </Chapter>
            <Chapter id="pos" num={num('pos')} name={name('pos')} desc={desc('pos')}>
              <BeforeAfter reality={reality} cgi={cgi} t={t} />
              <Aisle items={chapters.pos} onOpen={open('pos')} />
            </Chapter>
          </div>
        </div>
      </div>

      {/* Closing strip — portfolio on request */}
      <div className="mt-4 px-4 md:px-6 py-10 md:py-12" style={{ background: 'oklch(0.13 0.005 118)' }}>
        <div className="sonic-container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-white font-black text-xl md:text-2xl leading-tight max-w-xl">{t['strip-text']}</p>
          <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Portfolio anfragen')}`} className="inline-flex items-center justify-center gap-2 bg-primary-500 text-foreground-950 px-7 py-3.5 font-black text-sm hover:bg-white transition-colors self-start md:self-auto">
            {t['strip-button']}<i className="ri-arrow-right-line" aria-hidden="true" />
          </a>
        </div>
      </div>

      {lightbox && <Lightbox items={chapters[lightbox.id]} startIndex={lightbox.index} onClose={() => setLightbox(null)} />}
    </section>
  );
}
