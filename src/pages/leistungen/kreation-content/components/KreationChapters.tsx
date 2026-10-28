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
   Every chapter uses one viewer (a piece large, all pieces in a strip below), with one
   signature detail each: Konzeption tape · Innovation auto-play · CI crop marks ·
   Layout magazine spreads · POS opens with the CGI-vs-reality slider.
   Data is exactly what the old tabbed showcase used — nothing in the dashboard changes:
     Texts:  Text → Kreation & Content — Showcase (Rahmen) + Showcase: <Kapitel>
     Images: Media → Kreation Showcase Grid (shared) / Alt-Rotation <Kapitel> (per chapter)
             Media → Kreation Before/After Slider
───────────────────────────────────────────────────────────────────────── */

const ORDER: ChapterId[] = ['konzeption', 'innovation', 'ci', 'layout', 'pos'];
const TEXT_COUNT = 6; // the dashboard card texts per chapter (i1–i6)

type Item = { id: string; tag: string; title: string; sub: string; src: string };
type MediaList = { url: string; caption?: string }[];

/* Pieces 1–6 work exactly as before (chapter slot → shared slot → fallback, texts i1–i6).
   Any further images added to the chapter's own slot (Alt-Rotation <Kapitel>) become extra
   pieces automatically — their title is the caption typed in the dashboard's image editor. */
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

/* ═════════════════════════════════════════════════════════════════════════
   Deck of cards: every chapter is one full-screen card dealt onto the pile.
   Inside each card the same viewer (28.10.2026, v2): one piece large and uncropped,
   all pieces of the chapter in a strip below — works for 3 pieces or 30.
═════════════════════════════════════════════════════════════════════════ */

type Variant = 'konzeption' | 'innovation' | 'ci' | 'pos';
const AUTOPLAY_MS = 5000;

function CropMarks() {
  const c = 'absolute w-4 h-4 border-foreground-950/70 pointer-events-none z-10';
  return (
    <>
      <span className={`${c} top-2 left-2 border-t-2 border-l-2`} aria-hidden="true" />
      <span className={`${c} top-2 right-2 border-t-2 border-r-2`} aria-hidden="true" />
      <span className={`${c} bottom-2 left-2 border-b-2 border-l-2`} aria-hidden="true" />
      <span className={`${c} bottom-2 right-2 border-b-2 border-r-2`} aria-hidden="true" />
    </>
  );
}

function Viewer({ items, variant, onOpen, slider, sliderInfo, sliderThumb }: { items: Item[]; variant: Variant; onOpen: (i: number) => void; slider?: ReactNode; sliderInfo?: { tag: string; title: string; sub: string }; sliderThumb?: string }) {
  const motionPaused = useMotionPaused();
  const { ref, inView } = useInView<HTMLDivElement>(0.5);
  // With a slider (POS) the slider is piece 0; image pieces follow
  const offset = slider ? 1 : 0;
  const total = items.length + offset;
  const [index, setIndex] = useState(0);
  const [hold, setHold] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const autoplay = variant === 'innovation';
  const running = autoplay && inView && !hold && !motionPaused;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setIndex((v) => (v + 1) % total), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [running, index, total]);

  // Keep the active thumbnail in view
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.children[index] as HTMLElement | undefined;
    if (strip && el) strip.scrollTo({ left: el.offsetLeft - strip.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' });
  }, [index]);

  const go = (d: number) => setIndex((v) => (v + d + total) % total);
  const isSlider = slider && index === 0;
  const item = isSlider ? null : items[index - offset];
  const info = isSlider ? sliderInfo : item;

  const stageBg: React.CSSProperties = variant === 'ci'
    ? { background: '#fafaf7', backgroundImage: 'linear-gradient(oklch(var(--foreground-950) / 0.05) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--foreground-950) / 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }
    : { background: 'oklch(0.13 0.005 118)' };

  return (
    <div
      ref={ref}
      className="h-full flex flex-col min-h-0"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onKeyDown={(e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); }}
    >
      {/* Stage — the piece shown whole (object-contain), blurred copy fills the rest */}
      <div className="relative flex-1 min-h-0 overflow-hidden" style={stageBg}>
        {isSlider ? (
          <div className="absolute inset-0">{slider}</div>
        ) : item && (
          <button type="button" key={item.id} onClick={() => onOpen(index - offset)} className="kr-stage-in absolute inset-0 w-full h-full cursor-zoom-in" aria-label={`${item.title} im Vollbild öffnen`}>
            {variant !== 'ci' && <img src={item.src} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-110" style={{ filter: 'blur(22px) brightness(0.45)' }} />}
            <img src={item.src} alt={item.title} className={`relative w-full h-full object-contain ${variant === 'ci' ? 'p-5 md:p-10' : ''}`} />
          </button>
        )}

        {variant === 'ci' && !isSlider && <CropMarks />}
        {variant === 'konzeption' && !isSlider && (
          <span className="absolute top-0 left-1/2 w-24 h-6 bg-primary-500/90 pointer-events-none z-10" style={{ transform: 'translate(-50%, -30%) rotate(-3deg)' }} aria-hidden="true" />
        )}

        {/* Auto-play progress (Innovation) */}
        {autoplay && (
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/15 z-10" aria-hidden="true">
            {running
              ? <span key={`${index}-run`} className="kr-stage-progress block h-full bg-primary-500" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
              : <span className="block h-full w-1/3 bg-primary-500" />}
          </div>
        )}

        {/* Prev / next */}
        {total > 1 && !isSlider && (
          <>
            <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/45 text-white hover:bg-primary-500 hover:text-foreground-950 backdrop-blur-sm transition-colors cursor-pointer" aria-label="Vorheriges"><i className="ri-arrow-left-line text-lg" aria-hidden="true" /></button>
            <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/45 text-white hover:bg-primary-500 hover:text-foreground-950 backdrop-blur-sm transition-colors cursor-pointer" aria-label="Nächstes"><i className="ri-arrow-right-line text-lg" aria-hidden="true" /></button>
          </>
        )}
        {isSlider && total > 1 && (
          <button type="button" onClick={() => go(1)} className="absolute right-6 bottom-6 z-10 inline-flex items-center gap-2 bg-foreground-950 text-white px-4 py-2.5 text-xs font-black hover:bg-primary-500 hover:text-foreground-950 transition-colors cursor-pointer">
            Weitere Arbeiten <i className="ri-arrow-right-line" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Caption bar */}
      <div className="flex items-center justify-between gap-4 py-3 flex-shrink-0 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          {info?.tag && <span className="flex-shrink-0 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-2 py-0.5">{info.tag}</span>}
          <p className="min-w-0 truncate">
            <span className="text-foreground-950 font-black text-sm md:text-base">{info?.title ?? ''}</span>
            {info?.sub && <span className="hidden md:inline text-foreground-500 text-sm"> — {info.sub}</span>}
          </p>
        </div>
        <span className="flex-shrink-0 text-foreground-500 text-xs font-bold tabular-nums">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>

      {/* Strip — every piece of the chapter */}
      <div ref={stripRef} className="kr-spreads flex gap-2 overflow-x-auto flex-shrink-0 pb-0.5" role="tablist" aria-label="Arbeiten">
        {slider && (
          <button type="button" onClick={() => setIndex(0)} role="tab" aria-selected={index === 0} className={`relative flex-shrink-0 w-[84px] md:w-[108px] h-[52px] md:h-[64px] overflow-hidden bg-foreground-950 cursor-pointer transition-opacity ${index === 0 ? 'ring-2 ring-inset ring-primary-500' : 'opacity-55 hover:opacity-90'}`} aria-label="CGI vs. Realität">
            {sliderThumb && <img src={sliderThumb} alt="" className="w-full h-full object-cover opacity-70" loading="lazy" draggable={false} />}
            <span className="absolute inset-x-0 bottom-0 bg-primary-500 text-foreground-950 text-[9px] font-black uppercase tracking-wider text-center py-0.5">CGI ↔ Real</span>
          </button>
        )}
        {items.map((it, i) => {
          const isActive = index === i + offset;
          return (
            <button key={it.id} type="button" onClick={() => setIndex(i + offset)} role="tab" aria-selected={isActive} className={`relative flex-shrink-0 w-[84px] md:w-[108px] h-[52px] md:h-[64px] overflow-hidden bg-foreground-950 cursor-pointer transition-opacity ${isActive ? 'opacity-100' : 'opacity-55 hover:opacity-90'}`} aria-label={it.title}>
              <img src={it.src} alt="" className="w-full h-full object-cover" loading="lazy" draggable={false} />
              {isActive && <span className="absolute inset-0 ring-2 ring-inset ring-primary-500" aria-hidden="true" />}
            </button>
          );
        })}
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
              <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="lazy" draggable={false} />
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

/* ── POS — CGI-vs-reality slider (first piece of the POS card) ─────────── */
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
                <Viewer variant="konzeption" items={chapters.konzeption} onOpen={open('konzeption')} />
              </DeckCard>
              <DeckCard id="innovation" index={1} num={num('innovation')} name={name('innovation')} desc={desc('innovation')}>
                <Viewer variant="innovation" items={chapters.innovation} onOpen={open('innovation')} />
              </DeckCard>
              <DeckCard id="ci" index={2} num={num('ci')} name={name('ci')} desc={desc('ci')}>
                <Viewer variant="ci" items={chapters.ci} onOpen={open('ci')} />
              </DeckCard>
              <DeckCard id="layout" index={3} num={num('layout')} name={name('layout')} desc={desc('layout')}>
                <Spreads items={chapters.layout} onOpen={open('layout')} />
              </DeckCard>
              <DeckCard id="pos" index={4} num={num('pos')} name={name('pos')} desc={desc('pos')}>
                <Viewer variant="pos" items={chapters.pos} onOpen={open('pos')} slider={reality && cgi ? <BeforeAfter reality={reality} cgi={cgi} t={t} /> : undefined} sliderInfo={{ tag: t['ba-eyebrow'] ?? '', title: t['ba-title'] ?? '', sub: t['ba-hint'] ?? '' }} sliderThumb={cgi} />
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
