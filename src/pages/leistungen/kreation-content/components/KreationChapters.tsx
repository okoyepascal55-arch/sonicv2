import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useMotionPaused } from '@/lib/motion';
import { useLeistungenText } from '@/hooks/useLeistungenText';
import { FALLBACKS, BEFORE_AFTER_FALLBACK, type ChapterId } from './kreationFallbacks';
import { isVideoFileUrl } from '@/lib/videoFile';

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
const TEXT_COUNT = 6; // dashboard card texts per chapter (i1–i6)

type Item = { id: string; tag: string; title: string; sub: string; src: string };
type MediaList = { url: string; caption?: string }[];

/* Pieces 1–6 work as before (chapter slot → shared slot → fallback, texts i1–i6).
   Every further image or video in the chapter's own slot (Alt-Rotation <Kapitel>) becomes
   an extra piece automatically, titled by the caption typed in the dashboard (28.10.2026). */
function buildItems(id: ChapterId, t: Record<string, string>, secondary: MediaList, primary: MediaList, chapterName: string): Item[] {
  const count = Math.max(TEXT_COUNT, secondary.length);
  return Array.from({ length: count }, (_, i) => {
    const hasText = i < TEXT_COUNT;
    return {
      id: `${id}-${i + 1}`,
      tag: (hasText ? t[`i${i + 1}-tag`] : '') || chapterName,
      title: (hasText ? t[`i${i + 1}-title`] : '') || secondary[i]?.caption || chapterName,
      sub: hasText ? t[`i${i + 1}-sub`] ?? '' : '',
      src: secondary[i]?.url ? resolveImageUrl(secondary[i].url) : primary[i]?.url ? resolveImageUrl(primary[i].url) : FALLBACKS[id][i] ?? '',
    };
  }).filter((it) => it.src);
}

/* Image or video — every piece can be either. Videos play muted, looped and inline
   (paused for reduced motion); `still` shows just the first frame (thumbnails). */
function Media({ src, alt, className = '', still = false }: { src: string; alt: string; className?: string; still?: boolean }) {
  const motionPaused = useMotionPaused();
  if (isVideoFileUrl(src)) {
    return still || motionPaused
      ? <video src={`${src}#t=0.1`} className={className} muted playsInline preload="metadata" aria-label={alt} />
      : <video src={src} className={className} autoPlay muted loop playsInline preload="metadata" aria-label={alt} />;
  }
  return <img src={src} alt={alt} className={className} loading="lazy" draggable={false} />;
}

/* Split pieces into pages (Pinnwand boards, Markenblatt sheets) */
function paginate<T>(list: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < list.length; i += size) pages.push(list.slice(i, i + size));
  return pages.length ? pages : [[]];
}

/* Small "1 / 3" pager used by the paged formats */
function Pager({ page, pages, onChange, label, dark = false }: { page: number; pages: number; onChange: (p: number) => void; label: string; dark?: boolean }) {
  if (pages < 2) return null;
  const btn = dark
    ? 'border-white/25 text-white hover:bg-primary-500 hover:text-foreground-950 hover:border-primary-500'
    : 'border-foreground-950/15 text-foreground-950 hover:bg-foreground-950 hover:text-primary-500';
  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-bold tabular-nums mr-1 ${dark ? 'text-white/70' : 'text-foreground-500'}`}>{label} {page + 1} / {pages}</span>
      <button type="button" onClick={() => onChange((page - 1 + pages) % pages)} className={`w-9 h-9 flex items-center justify-center border transition-colors cursor-pointer ${btn}`} aria-label={`Vorherige ${label}`}><i className="ri-arrow-left-line" aria-hidden="true" /></button>
      <button type="button" onClick={() => onChange((page + 1) % pages)} className={`w-9 h-9 flex items-center justify-center border transition-colors cursor-pointer ${btn}`} aria-label={`Nächste ${label}`}><i className="ri-arrow-right-line" aria-hidden="true" /></button>
    </div>
  );
}

/* Viewport is narrower than md (for formats that page differently on phones) */
function useIsNarrow() {
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return narrow;
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
        {isVideoFileUrl(item.src)
          ? <video key={item.src} src={item.src} className="max-w-full max-h-[70vh] object-contain" controls autoPlay muted loop playsInline />
          : <img src={item.src} alt={item.title} className="max-w-full max-h-[70vh] object-contain" />}
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

/* ═════════════════════════════════════════════════════════════════════════
   Deck of cards (28.10.2026): every chapter is one full-screen card. Scrolling
   deals the next card onto the pile; the card underneath shrinks and dims a
   little, its edge stays visible. Every format is sized to fit exactly one card.
═════════════════════════════════════════════════════════════════════════ */

/* ── 01 Konzeption — Die Pinnwand ──────────────────────────────────────── */
const PINS = [
  { left: 3, top: 6, width: 30, rotate: -4 },
  { left: 36, top: 3, width: 25, rotate: 3 },
  { left: 65, top: 8, width: 31, rotate: -2 },
  { left: 7, top: 52, width: 25, rotate: 2.5 },
  { left: 36, top: 47, width: 30, rotate: -3 },
  { left: 70, top: 54, width: 25, rotate: 4 },
];

function PinCard({ item, onOpen, style, className = '', compact = false }: { item: Item; onOpen: () => void; style?: React.CSSProperties; className?: string; compact?: boolean }) {
  return (
    <button type="button" onClick={onOpen} className={`kr-pin text-left bg-[#f6f6f2] p-1.5 md:p-2 pb-2 md:pb-3 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${compact ? 'flex flex-col min-h-0' : ''} ${className}`} style={{ boxShadow: '0 14px 30px -14px rgba(0,0,0,0.7)', ...style }}>
      <span className="absolute -top-2.5 left-1/2 w-12 md:w-14 h-4 md:h-5 bg-primary-500/85" style={{ transform: 'translateX(-50%) rotate(-3deg)' }} aria-hidden="true" />
      <span className={`block relative overflow-hidden bg-foreground-950 ${compact ? 'flex-1 min-h-0' : ''}`} style={compact ? undefined : { aspectRatio: '4 / 3' }}>
        <Media src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
      </span>
      <span className="block mt-2 px-1 flex-shrink-0">
        {!compact && <span className="block text-[10px] font-bold text-foreground-500 mb-0.5">{item.tag}</span>}
        <span className="block text-foreground-950 font-black text-[11px] md:text-sm leading-tight line-clamp-2 hyphens-auto [overflow-wrap:anywhere]" lang="de">{item.title}</span>
      </span>
    </button>
  );
}

function Pinboard({ items, onOpen }: { items: Item[]; onOpen: (i: number) => void }) {
  const narrow = useIsNarrow();
  const perBoard = narrow ? 4 : 6;
  const boards = paginate(items.map((item, i) => ({ item, i })), perBoard);
  const [page, setPage] = useState(0);
  const current = boards[Math.min(page, boards.length - 1)];
  const board: React.CSSProperties = { background: 'oklch(0.13 0.005 118)', backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '22px 22px' };
  return (
    <div className="relative h-full" style={board}>
      {/* Desktop: pins sized to the card's height as well as its width (container units) */}
      <div key={`d-${page}`} className="kr-stage-in hidden md:block absolute inset-0" style={{ containerType: 'size' }}>
        {current.map(({ item, i }, k) => (
          <PinCard
            key={item.id}
            item={item}
            onOpen={() => onOpen(i)}
            className="absolute"
            style={{ left: `${PINS[k].left}%`, top: `${PINS[k].top}%`, width: `min(${PINS[k].width}cqw, calc(56cqh - 64px))`, transform: `rotate(${PINS[k].rotate}deg)`, zIndex: 10 + k }}
          />
        ))}
      </div>
      {/* Mobile: 2 × 2 larger pins per board, readable titles */}
      <div key={`m-${page}`} className="kr-stage-in md:hidden grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-6 p-4 pt-6 pb-14 h-full">
        {current.map(({ item, i }, k) => (
          <PinCard key={item.id} item={item} onOpen={() => onOpen(i)} compact className="relative" style={{ transform: `rotate(${k % 2 ? 1.5 : -1.5}deg)` }} />
        ))}
      </div>
      <div className="absolute right-3 bottom-3 z-40">
        <Pager page={page} pages={boards.length} onChange={setPage} label="Pinnwand" dark />
      </div>
    </div>
  );
}

/* ── 02 Innovation — Die Bühne ─────────────────────────────────────────── */
const STAGE_MS = 5000;

function Stage({ items, onOpen }: { items: Item[]; onOpen: (i: number) => void }) {
  const motionPaused = useMotionPaused();
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
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
    <div ref={ref} className="relative overflow-hidden bg-foreground-950 h-full" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
      <button type="button" key={item.id} onClick={() => onOpen(index)} className="kr-stage-in absolute inset-0 w-full h-full cursor-zoom-in" aria-label={`${item.title} im Vollbild öffnen`}>
        <Media src={item.src} alt={item.title} className="w-full h-full object-cover" />
      </button>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 45%, rgba(0,0,0,0.85) 100%)' }} />

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

      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-9 pb-20 md:pb-24 flex items-end justify-between gap-6 pointer-events-none">
        <div key={item.id} className="kr-stage-in min-w-0">
          <span className="inline-block bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 mb-4">{item.tag}</span>
          <p className="text-white font-black uppercase leading-[0.95] mb-2 hyphens-auto [overflow-wrap:anywhere]" lang="de" style={{ fontSize: 'clamp(1.3rem, 4vw, 3.4rem)', letterSpacing: '-0.03em' }}>{item.title}</p>
          <p className="text-white/65 text-sm md:text-base">{item.sub}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 pointer-events-auto flex-shrink-0">
          <button type="button" onClick={() => go(-1)} className="w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:bg-primary-500 hover:text-foreground-950 hover:border-primary-500 transition-colors cursor-pointer" aria-label="Vorheriges"><i className="ri-arrow-left-line text-lg" aria-hidden="true" /></button>
          <button type="button" onClick={() => go(1)} className="w-11 h-11 flex items-center justify-center border border-white/25 text-white hover:bg-primary-500 hover:text-foreground-950 hover:border-primary-500 transition-colors cursor-pointer" aria-label="Nächstes"><i className="ri-arrow-right-line text-lg" aria-hidden="true" /></button>
        </div>
      </div>

      {/* Strip of every piece — jump straight to one */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-9 pb-3 md:pb-4">
        <div className="kr-spreads flex gap-1.5 overflow-x-auto">
          {items.map((it, i) => (
            <button key={it.id} type="button" onClick={() => setIndex(i)} className={`relative flex-shrink-0 w-[64px] md:w-[84px] h-[40px] md:h-[52px] overflow-hidden bg-black cursor-pointer transition-opacity ${i === index ? 'opacity-100' : 'opacity-50 hover:opacity-85'}`} aria-label={it.title}>
              <Media src={it.src} alt="" still className="w-full h-full object-cover" />
              {i === index && <span className="absolute inset-0 ring-2 ring-inset ring-primary-500" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 03 CI — Das Markenblatt ───────────────────────────────────────────── */
function CropMarks() {
  const c = 'absolute w-3 h-3 border-foreground-950/60 pointer-events-none';
  return (
    <>
      <span className={`${c} -top-1.5 -left-1.5 border-t border-l`} aria-hidden="true" />
      <span className={`${c} -top-1.5 -right-1.5 border-t border-r`} aria-hidden="true" />
      <span className={`${c} -bottom-1.5 -left-1.5 border-b border-l`} aria-hidden="true" />
      <span className={`${c} -bottom-1.5 -right-1.5 border-b border-r`} aria-hidden="true" />
    </>
  );
}

// 3 × 3 on desktop: the key figure takes 2 × 2, the other five fill the rest. Mobile: 2 columns, key figure full width.
const SHEET_CELLS = ['col-span-2 lg:row-span-2', '', '', '', '', ''];

function BrandSheet({ items, onOpen }: { items: Item[]; onOpen: (i: number) => void }) {
  const sheets = paginate(items.map((item, i) => ({ item, i })), 6);
  const [page, setPage] = useState(0);
  const current = sheets[Math.min(page, sheets.length - 1)];
  return (
    <div className="relative bg-white h-full flex flex-col p-4 md:p-6" style={{ border: '1px solid oklch(var(--foreground-950) / 0.12)', backgroundImage: 'linear-gradient(oklch(var(--foreground-950) / 0.045) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--foreground-950) / 0.045) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="flex items-center justify-between gap-4 pb-3 mb-4 md:mb-5 flex-shrink-0" style={{ borderBottom: '2px solid oklch(var(--foreground-950))' }}>
        <span className="text-foreground-950 font-black text-sm uppercase tracking-tight truncate">{current[0]?.item.tag}</span>
        {sheets.length > 1
          ? <Pager page={page} pages={sheets.length} onChange={setPage} label="Blatt" />
          : <span className="text-[10px] font-mono text-foreground-500">Blatt 1 / 1</span>}
      </div>

      <div key={page} className="kr-stage-in flex-1 min-h-0 grid grid-cols-2 grid-rows-4 lg:grid-cols-3 lg:grid-rows-3 gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-4">
        {current.map(({ item, i }, k) => (
          <figure key={item.id} className={`flex flex-col min-w-0 min-h-0 ${SHEET_CELLS[k]}`}>
            <button type="button" onClick={() => onOpen(i)} className="relative flex-1 min-h-0 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
              <CropMarks />
              <span className="absolute inset-0 overflow-hidden bg-foreground-100">
                <Media src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </span>
            </button>
            <figcaption className="mt-2 flex items-baseline gap-2 flex-shrink-0 min-w-0">
              <span className="hidden sm:inline text-[10px] font-mono text-foreground-500 tabular-nums flex-shrink-0">Abb. {String(i + 1).padStart(2, '0')}</span>
              <span className="text-foreground-950 font-black text-[12px] md:text-[13px] leading-tight truncate">{item.title}</span>
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
    <div className="h-full flex flex-col">
      <div
        ref={rowRef}
        onScroll={onScroll}
        onMouseDown={(e) => { const row = rowRef.current; if (row) drag.current = { x: e.clientX, left: row.scrollLeft, moved: false }; }}
        onMouseMove={(e) => { const d = drag.current; const row = rowRef.current; if (!d || !row) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true; row.scrollLeft = d.left - dx; }}
        onMouseUp={() => { setTimeout(() => { drag.current = null; }, 0); }}
        onMouseLeave={() => { drag.current = null; }}
        className="kr-spreads flex-1 min-h-0 flex gap-5 md:gap-8 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
      >
        {items.map((item, i) => {
          const mirrored = i % 2 === 1;
          const page = 2 * i + 2;
          const picture = (
            <button type="button" onClick={() => { if (!drag.current?.moved) onOpen(i); }} className="relative overflow-hidden bg-foreground-950 cursor-zoom-in min-h-0" aria-label={`${item.title} im Vollbild öffnen`}>
              <Media src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
            </button>
          );
          const text = (
            <div className="relative bg-[#fbfbf8] p-5 md:p-9 flex flex-col min-h-0">
              <span className="text-[11px] font-bold text-foreground-500 mb-auto">{item.tag}</span>
              <p className="text-foreground-950 font-black uppercase leading-[0.95] mt-4 md:mt-8 mb-2 md:mb-3 hyphens-auto [overflow-wrap:anywhere]" lang="de" style={{ fontSize: 'clamp(1.15rem, 2.4vw, 2.2rem)', letterSpacing: '-0.03em' }}>{item.title}</p>
              <p className="text-foreground-600 text-xs md:text-sm leading-relaxed max-w-[30ch]">{item.sub}</p>
              <span className="mt-4 md:mt-8 w-10 h-1 bg-primary-500" aria-hidden="true" />
            </div>
          );
          return (
            <article key={item.id} className="relative flex-shrink-0 h-full w-[82vw] md:w-[min(860px,70vw)]" style={{ boxShadow: '0 30px 60px -30px rgba(0,0,0,0.45)' }}>
              <div className="grid grid-rows-[1fr_auto] md:grid-rows-1 md:grid-cols-2 h-full">
                {mirrored ? <><div className="contents md:hidden">{picture}{text}</div><div className="hidden md:contents">{text}{picture}</div></> : <>{picture}{text}</>}
              </div>
              <span className="hidden md:block absolute top-0 bottom-0 left-1/2 w-10 -translate-x-1/2 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.06) 52%, transparent)' }} aria-hidden="true" />
              <span className="hidden md:block absolute bottom-3 left-4 text-[10px] font-mono text-white/70 mix-blend-difference tabular-nums">{page}</span>
              <span className="hidden md:block absolute bottom-3 right-4 text-[10px] font-mono text-foreground-500 tabular-nums">{page + 1}</span>
            </article>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4 mt-4 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          {items.map((it, i) => (
            <button key={it.id} type="button" onClick={() => scrollTo(i)} className="tap-target h-1 cursor-pointer transition-all duration-300" style={{ width: i === active ? 32 : 12, background: i === active ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-950) / 0.15)' }} aria-label={it.title} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => scrollTo(Math.max(0, active - 1))} className="w-10 h-10 flex items-center justify-center border border-foreground-950/15 text-foreground-950 hover:bg-foreground-950 hover:text-primary-500 transition-colors cursor-pointer" aria-label="Vorheriger Bogen"><i className="ri-arrow-left-line text-lg" aria-hidden="true" /></button>
          <button type="button" onClick={() => scrollTo(Math.min(items.length - 1, active + 1))} className="w-10 h-10 flex items-center justify-center border border-foreground-950/15 text-foreground-950 hover:bg-foreground-950 hover:text-primary-500 transition-colors cursor-pointer" aria-label="Nächster Bogen"><i className="ri-arrow-right-line text-lg" aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}

/* ── 05 POS — Im Markt: slider and aisle side by side ──────────────────── */
function BeforeAfter({ reality, cgi, t }: { reality: string; cgi: string; t: Record<string, string> }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(97, Math.max(3, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex items-baseline justify-between gap-3 mb-2.5 flex-shrink-0">
        <p className="text-foreground-950 font-black text-sm md:text-base leading-tight truncate">{t['ba-title']}</p>
        <p className="hidden md:block text-foreground-500 text-xs truncate">{t['ba-hint']}</p>
      </div>
      <div
        ref={ref}
        className="relative flex-1 min-h-0 overflow-hidden select-none cursor-col-resize bg-foreground-950 touch-pan-y"
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
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/55 backdrop-blur-sm text-[10px] font-black uppercase tracking-[0.12em] text-white">{t['ba-label-real']}</span>
        <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={cgi} alt={t['ba-label-cgi']} className="w-full h-full object-cover" draggable={false} />
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-[0.12em]">{t['ba-label-cgi']}</span>
        </div>
        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%` }}>
          <div className="w-0.5 h-full bg-primary-500 -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-primary-500 text-foreground-950 flex items-center justify-center"><i className="ri-arrow-left-right-line text-xl" aria-hidden="true" /></div>
        </div>
      </div>
    </div>
  );
}

function Aisle({ items, onOpen }: { items: Item[]; onOpen: (i: number) => void }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => rowRef.current?.scrollBy({ left: d * rowRef.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div className="h-full min-h-0 flex flex-col">
      <div className="hidden lg:flex items-center justify-between mb-2.5 flex-shrink-0">
        <span className="text-foreground-500 text-xs font-bold tabular-nums">{items.length} Arbeiten</span>
        {items.length > 4 && (
          <div className="flex gap-2">
            <button type="button" onClick={() => scroll(-1)} className="w-9 h-9 flex items-center justify-center border border-foreground-950/15 text-foreground-950 hover:bg-foreground-950 hover:text-primary-500 transition-colors cursor-pointer" aria-label="Zurück"><i className="ri-arrow-left-line" aria-hidden="true" /></button>
            <button type="button" onClick={() => scroll(1)} className="w-9 h-9 flex items-center justify-center border border-foreground-950/15 text-foreground-950 hover:bg-foreground-950 hover:text-primary-500 transition-colors cursor-pointer" aria-label="Weiter"><i className="ri-arrow-right-line" aria-hidden="true" /></button>
          </div>
        )}
      </div>
      {/* The shelf: scrolls sideways (mobile + desktop), so any number of pieces fit */}
      <div ref={rowRef} className="kr-spreads flex-1 min-h-0 grid grid-flow-col auto-cols-[34vw] sm:auto-cols-[24vw] lg:auto-cols-[calc((100%-0.75rem)/2)] lg:grid-rows-2 gap-3 overflow-x-auto">
        {items.map((item, i) => (
          <button key={item.id} type="button" onClick={() => onOpen(i)} className="group relative min-h-0 flex flex-col text-left cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            <span className="block relative flex-1 min-h-0 overflow-hidden bg-foreground-950">
              <Media src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            </span>
            {/* Shelf edge */}
            <span className="block h-1.5 bg-foreground-950 flex-shrink-0" aria-hidden="true" />
            <span className="block h-1 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="block mt-1.5 text-foreground-950 text-[11px] md:text-[12px] font-black leading-tight line-clamp-2 flex-shrink-0">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PosCard({ items, reality, cgi, t, onOpen }: { items: Item[]; reality: string; cgi: string; t: Record<string, string>; onOpen: (i: number) => void }) {
  return (
    <div className="h-full grid grid-cols-1 grid-rows-[1fr_120px] lg:grid-rows-1 lg:grid-cols-12 gap-4 lg:gap-6">
      <div className="lg:col-span-7 min-h-0 min-w-0"><BeforeAfter reality={reality} cgi={cgi} t={t} /></div>
      <div className="lg:col-span-5 min-h-0 min-w-0"><Aisle items={items} onOpen={onOpen} /></div>
    </div>
  );
}

/* ── One card of the deck ──────────────────────────────────────────────── */
function DeckCard({ id, index, num, name, desc, children }: { id: ChapterId; index: number; num: string; name: string; desc: string; children: ReactNode }) {
  return (
    <article id={`kapitel-${id}`} data-chapter={id} className="kr-card" style={{ ['--i' as string]: index }}>
      <div className="kr-card-inner relative h-full flex flex-col bg-white" style={{ border: '1px solid oklch(var(--foreground-950) / 0.12)', borderTop: '3px solid oklch(0.81 0.19 115)', boxShadow: '0 -18px 40px -24px rgba(0,0,0,0.35)' }}>
        <header className="flex items-center justify-between gap-4 px-4 md:px-6 py-3 md:py-4 flex-shrink-0" style={{ borderBottom: '1px solid oklch(var(--foreground-950) / 0.08)' }}>
          <div className="flex items-center gap-3 md:gap-5 min-w-0">
            <span className="font-black tabular-nums leading-none text-transparent flex-shrink-0" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 3rem)', WebkitTextStroke: '1.5px oklch(0.62 0.15 115)', letterSpacing: '-0.04em' }} aria-hidden="true">{num}</span>
            <h3 className="text-foreground-950 font-black uppercase leading-none truncate" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', letterSpacing: '-0.035em' }}>{name}</h3>
          </div>
          <p className="hidden md:block text-foreground-600 text-sm leading-snug max-w-sm line-clamp-2">{desc}</p>
        </header>
        <div className="flex-1 min-h-0 p-3 md:p-5">{children}</div>
        <span className="kr-card-dim absolute inset-0 bg-foreground-950 pointer-events-none" aria-hidden="true" />
      </div>
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
    konzeption: buildItems('konzeption', tKonz, secKonz, primary, t['tab-konzeption'] ?? 'Konzeption'),
    innovation: buildItems('innovation', tInno, secInno, primary, t['tab-innovation'] ?? 'Innovation'),
    ci: buildItems('ci', tCi, secCi, primary, t['tab-ci'] ?? 'CI'),
    layout: buildItems('layout', tLay, secLay, primary, t['tab-layout'] ?? 'Layout'),
    pos: buildItems('pos', tPos, secPos, primary, t['tab-pos'] ?? 'POS'),
  };
  const reality = beforeAfter[0]?.url ? resolveImageUrl(beforeAfter[0].url) : BEFORE_AFTER_FALLBACK[0];
  const cgi = beforeAfter[1]?.url ? resolveImageUrl(beforeAfter[1].url) : BEFORE_AFTER_FALLBACK[1];

  const [lightbox, setLightbox] = useState<{ id: ChapterId; index: number } | null>(null);
  const open = (id: ChapterId) => (index: number) => setLightbox({ id, index });

  const name = (id: ChapterId) => t[`tab-${id}`] ?? id;
  const desc = (id: ChapterId) => t[`desc-${id}`] ?? '';
  const num = (id: ChapterId) => String(ORDER.indexOf(id) + 1).padStart(2, '0');

  /* Deck mechanics: one scroll handler measures where each card sits and
     (a) shrinks/dims the card underneath while the next one is dealt,
     (b) keeps the index on the card that is on top. */
  const deckRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const geometry = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return null;
    const cards = Array.from(deck.querySelectorAll<HTMLElement>('.kr-card'));
    if (!cards.length) return null;
    const cs = getComputedStyle(deck);
    const top = parseFloat(cs.getPropertyValue('--kr-top-px')) || 120;
    const peek = parseFloat(cs.getPropertyValue('--kr-peek-px')) || 8;
    const deckTop = deck.getBoundingClientRect().top + window.scrollY;
    // Natural (unstuck) document position of each card = deck top + its offsetTop
    const natural = cards.map((c) => deckTop + c.offsetTop);
    const stickAt = cards.map((_, i) => top + i * peek);
    return { cards, natural, stickAt };
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const g = geometry();
      if (!g) return;
      const y = window.scrollY;
      let current = 0;
      g.cards.forEach((card, i) => {
        // Where the NEXT card is relative to its landing spot: 1 = landed on top of this one
        const next = i + 1 < g.cards.length ? i + 1 : -1;
        let p = 0;
        if (next > 0) {
          const step = g.natural[next] - g.natural[i];
          const nextView = g.natural[next] - y; // next card's top in the viewport
          p = Math.min(1, Math.max(0, 1 - (nextView - g.stickAt[next]) / step));
        }
        card.style.setProperty('--kr-p', p.toFixed(3));
        if (y + g.stickAt[i] >= g.natural[i] - (g.natural[1] - g.natural[0]) / 2) current = i;
      });
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [geometry]);

  // Index / chapter bar: deal straight to a card (sticky cards can't be anchor targets)
  const goTo = (i: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    const g = geometry();
    if (!g) return;
    window.scrollTo({ top: g.natural[i] - g.stickAt[i] + 1, behavior: 'smooth' });
  };

  return (
    <section id="konzept" className="relative bg-white px-4 md:px-6 pt-16 md:pt-24">
      <div className="sonic-container">
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{t['eyebrow']}</span></div>
          <h2 className="sonic-h2 text-foreground-950">{t['heading']}<br /><span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{t['heading-accent']}</span></h2>
        </div>

        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12 xl:gap-16">
          {/* Pinned chapter index (desktop) */}
          <nav className="hidden lg:block" aria-label="Kapitel">
            <ol className="sticky top-[140px] flex flex-col">
              {ORDER.map((id, i) => {
                const isActive = i === active;
                return (
                  <li key={id}>
                    <a href={`#kapitel-${id}`} onClick={goTo(i)} className="group flex items-center gap-3 py-3 transition-colors" style={{ borderLeft: `2px solid ${isActive ? 'oklch(0.81 0.19 115)' : 'oklch(var(--foreground-950) / 0.1)'}`, paddingLeft: 14 }} aria-current={isActive ? 'true' : undefined}>
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

          <div className="min-w-0">
            {/* Mobile / tablet: slim pinned chapter bar */}
            <nav className="lg:hidden sticky top-[64px] z-30 -mx-4 md:-mx-6 px-4 md:px-6 bg-white/95 backdrop-blur" style={{ borderBottom: '1px solid oklch(var(--foreground-950) / 0.1)' }} aria-label="Kapitel">
              <ol className="flex">
                {ORDER.map((id, i) => {
                  const isActive = i === active;
                  return (
                    <li key={id} className="flex-1 min-w-0">
                      <a href={`#kapitel-${id}`} onClick={goTo(i)} className="flex flex-col items-center py-2.5" style={{ borderBottom: `2px solid ${isActive ? 'oklch(0.81 0.19 115)' : 'transparent'}` }} aria-current={isActive ? 'true' : undefined}>
                        <span className={`text-[10px] font-black tabular-nums ${isActive ? 'text-primary-600' : 'text-foreground-400'}`}>{num(id)}</span>
                        <span className={`text-[10px] sm:text-xs font-black truncate max-w-full ${isActive ? 'text-foreground-950' : 'text-foreground-500'}`}>{name(id)}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* The deck */}
            <div ref={deckRef} className="kr-deck relative pt-4 lg:pt-0">
              <DeckCard id="konzeption" index={0} num={num('konzeption')} name={name('konzeption')} desc={desc('konzeption')}>
                <Pinboard items={chapters.konzeption} onOpen={open('konzeption')} />
              </DeckCard>
              <DeckCard id="innovation" index={1} num={num('innovation')} name={name('innovation')} desc={desc('innovation')}>
                <Stage items={chapters.innovation} onOpen={open('innovation')} />
              </DeckCard>
              <DeckCard id="ci" index={2} num={num('ci')} name={name('ci')} desc={desc('ci')}>
                <BrandSheet items={chapters.ci} onOpen={open('ci')} />
              </DeckCard>
              <DeckCard id="layout" index={3} num={num('layout')} name={name('layout')} desc={desc('layout')}>
                <Spreads items={chapters.layout} onOpen={open('layout')} />
              </DeckCard>
              <DeckCard id="pos" index={4} num={num('pos')} name={name('pos')} desc={desc('pos')}>
                <PosCard items={chapters.pos} reality={reality} cgi={cgi} t={t} onOpen={open('pos')} />
              </DeckCard>
            </div>
          </div>
        </div>
      </div>

      {/* After the last card the deck releases into the portfolio band */}
      <div className="mt-16 md:mt-20 -mx-4 md:-mx-6 px-4 md:px-6 py-10 md:py-12" style={{ background: 'oklch(0.13 0.005 118)' }}>
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
