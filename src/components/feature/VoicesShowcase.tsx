import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChapterEyebrow, Marker, INK } from '@/pages/careers/components/ChapterKit';

/*
  Voices showcase — the „Sonic Spirit & Faces“ design from /karriere (15.10.2026),
  shared by Über uns (Management), SRT (Entwickler) and Kreation & Content (Team) so all
  voices sections look the same (19.10.2026).
  Desktop: expanding portrait panels (one open, quote + name + role) and a dark story panel.
  Mobile: swipeable portrait cards + progress bar, same story panel underneath.
  One person only → a single full-width panel, no switching.
  Texts and images stay where they are in the dashboard — each page passes its own data in.
*/

export type Voice = {
  id: string;
  name: string;
  role: string;
  pullQuote: string;
  image: string;
  /** Story panel label for this person (default: storyLabel prop) */
  storyLabel?: string;
  /** Story paragraphs; more than two get „Ganze Geschichte lesen“ */
  paragraphs?: string[];
  closingQuote?: string;
  /** Extra content under the story (e.g. Doing Things, facts, LinkedIn) */
  extra?: ReactNode;
  /** Shown instead of the portrait (e.g. a YouTube embed) */
  media?: ReactNode;
};

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const LIME = 'oklch(0.81 0.19 115)';
const num = (i: number) => String(i + 1).padStart(2, '0');

/** „Die Stimmen hinter Sonic.“ → „Die Stimmen hinter “ + marker „Sonic.“ */
export function markLastWord(text: string, prefer?: string): ReactNode {
  const t = text.trim();
  const at = prefer ? t.indexOf(prefer) : -1;
  if (at > -1) return <>{t.slice(0, at)}<Marker>{prefer}</Marker>{t.slice(at + prefer!.length)}</>;
  const i = t.lastIndexOf(' ');
  if (i < 0) return <Marker>{t}</Marker>;
  return <>{t.slice(0, i + 1)}<Marker>{t.slice(i + 1)}</Marker></>;
}

function Portrait({ v, isActive }: { v: Voice; isActive: boolean }) {
  return v.image ? (
    <img
      src={v.image}
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-top"
      style={{
        filter: isActive ? 'none' : 'grayscale(1) brightness(0.55) contrast(1.05)',
        transform: isActive ? 'scale(1)' : 'scale(1.06)',
        transition: `filter 0.7s ${EASE}, transform 1.2s ${EASE}`,
      }}
      loading="lazy"
      draggable={false}
    />
  ) : (
    // No photo uploaded yet → visible photo placeholder (same as every other missing image)
    <span className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: '#1c1d19', outline: '2px dashed rgba(200,212,0,0.3)', outlineOffset: '-14px' }} aria-hidden="true">
      <i className="ri-image-line text-5xl" style={{ color: 'rgba(200,212,0,0.75)' }} />
      <span className="text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: 'rgba(200,212,0,0.75)' }}>Foto folgt</span>
    </span>
  );
}

export default function VoicesShowcase({
  id,
  eyebrow,
  heading,
  sub,
  voices,
  storyLabel = 'Die Geschichte',
  moreLabel = 'Ganze Geschichte lesen',
  lessLabel = 'Weniger anzeigen',
  nextLabel = 'Nächste Stimme',
  footer,
}: {
  id: string;
  eyebrow: string;
  heading: ReactNode;
  sub?: ReactNode;
  voices: Voice[];
  storyLabel?: string;
  moreLabel?: string;
  lessLabel?: string;
  nextLabel?: string;
  footer?: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const single = voices.length === 1;
  const active = voices[Math.min(activeIndex, voices.length - 1)];
  const select = (i: number) => { setActiveIndex(i); setExpanded(false); };
  const facesId = `${id}-faces`;
  const storyId = `${id}-story`;

  const goNext = () => {
    select((activeIndex + 1) % voices.length);
    const el = document.getElementById(facesId) ?? document.getElementById(`${id}-rail`);
    if (el && el.getBoundingClientRect().top < 0) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
    }
  };

  // Mobile carousel: keep the active card in view, and follow swipes
  const railRef = useRef<HTMLDivElement>(null);
  const autoScrollUntil = useRef(0);
  useEffect(() => {
    const rail = railRef.current;
    const card = rail?.children[activeIndex] as HTMLElement | undefined;
    if (rail && card && rail.scrollWidth > rail.clientWidth) {
      const target = card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2;
      if (Math.abs(rail.scrollLeft - target) > 4) {
        autoScrollUntil.current = Date.now() + 700;
        rail.scrollTo({ left: target, behavior: 'smooth' });
      }
    }
  }, [activeIndex]);
  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail || rail.scrollWidth <= rail.clientWidth || Date.now() < autoScrollUntil.current) return;
    const cards = Array.from(rail.children) as HTMLElement[];
    const center = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - rail.offsetLeft + c.offsetWidth / 2 - center);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best !== activeIndex) { setActiveIndex(best); setExpanded(false); }
  };

  const paragraphs = (active.paragraphs ?? []).map((p) => p.trim()).filter(Boolean);
  const PREVIEW = 2;
  const shown = expanded ? paragraphs : paragraphs.slice(0, PREVIEW);
  const canExpand = paragraphs.length > PREVIEW;
  const hasStory = !!active.pullQuote || paragraphs.length > 0 || !!active.closingQuote || !!active.extra || !!active.media;

  return (
    <section id={id} className="bg-white py-10 md:py-14 px-4 md:px-6">
      <div className="sonic-container">
        {/* Header — same chapter header as /karriere, without the chapter number */}
        <div className="mb-8 md:mb-10 max-w-full">
          <ChapterEyebrow>{eyebrow}</ChapterEyebrow>
          <h2 className="sonic-h2 mb-4 text-foreground-950">{heading}</h2>
          {sub && <p className="text-base md:text-[17px] leading-relaxed max-w-[560px]" style={{ color: 'oklch(var(--foreground-500))' }}>{sub}</p>}
        </div>

        {/* ── Desktop: expanding portrait panels ── */}
        <div
          id={facesId}
          className="hidden lg:flex gap-2"
          style={{ height: 'clamp(520px, 44vw, 640px)' }}
          role="group"
          aria-label="Stimme auswählen"
        >
          {voices.map((v, i) => {
            const isActive = i === activeIndex;
            const Tag = single ? 'div' : 'button';
            return (
              <Tag
                key={v.id}
                {...(single ? {} : { type: 'button' as const, onClick: () => select(i), 'aria-pressed': isActive, 'aria-controls': storyId, 'aria-label': `${v.name} — ${v.role}` })}
                className={`group relative overflow-hidden text-left min-w-0 ${single ? '' : 'cursor-pointer'}`}
                style={{ flex: isActive ? '3.4 1 0%' : '1 1 0%', background: INK, transition: `flex 0.8s ${EASE}` }}
              >
                <Portrait v={v} isActive={isActive} />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(10,11,9,0.88) 0%, rgba(10,11,9,0.35) 22%, rgba(10,11,9,0) 42%)'
                      : 'linear-gradient(to top, rgba(10,11,9,0.85) 0%, rgba(10,11,9,0.25) 60%)',
                    transition: `background 0.6s ${EASE}`,
                  }}
                />
                <span className="absolute top-0 left-0 h-1 pointer-events-none" style={{ width: isActive ? '100%' : '0%', background: LIME, transition: `width 0.8s ${EASE}` }} aria-hidden="true" />
                {!single && (
                  <span className="absolute top-5 left-5 text-[11px] font-black tracking-[0.24em] tabular-nums" style={{ color: isActive ? LIME : 'rgba(255,255,255,0.6)' }} aria-hidden="true">
                    {num(i)}
                  </span>
                )}

                {/* Collapsed: vertical name */}
                {!single && (
                  <span
                    className="absolute left-1/2 bottom-6 -translate-x-1/2 whitespace-nowrap text-[13px] font-black uppercase tracking-[0.28em] text-white group-hover:text-primary-500"
                    style={{ writingMode: 'vertical-rl', transform: 'translateX(-50%) rotate(180deg)', opacity: isActive ? 0 : 1, transition: `opacity 0.35s ${EASE}, color 0.2s` }}
                    aria-hidden="true"
                  >
                    {v.name}
                  </span>
                )}

                {/* Open: name + role only — the quote sits in the panel below, so the face stays free */}
                <span
                  className="absolute left-0 right-0 bottom-0 px-8 pb-7 xl:px-10 xl:pb-8 block"
                  style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'none' : 'translateY(16px)', transition: `opacity 0.5s ${EASE} ${isActive ? '0.25s' : '0s'}, transform 0.6s ${EASE} ${isActive ? '0.25s' : '0s'}` }}
                  aria-hidden={!isActive}
                >
                  <span className="flex items-end justify-between gap-6">
                    <span className="block">
                      <span className="block font-black text-white leading-none" style={{ fontSize: 'clamp(28px,2.6vw,40px)', letterSpacing: '-0.035em' }}>{v.name}</span>
                      <span className="block mt-2 text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: LIME }}>{v.role}</span>
                    </span>
                    {!single && <span className="text-[10px] font-black uppercase tracking-[0.24em] text-white/50 tabular-nums">{num(i)} / {num(voices.length - 1)}</span>}
                  </span>
                </span>
              </Tag>
            );
          })}
        </div>

        {/* ── Mobile / tablet: swipeable portrait cards ── */}
        <div
          id={`${id}-rail`}
          ref={railRef}
          onScroll={onRailScroll}
          className={`lg:hidden flex gap-3 ${single ? '' : '-mx-4 md:-mx-6 px-4 md:px-6 overflow-x-auto snap-x snap-mandatory'}`}
          style={{ scrollbarWidth: 'none' }}
          role="group"
          aria-label="Stimme auswählen"
        >
          {voices.map((v, i) => {
            const isActive = i === activeIndex;
            const Tag = single ? 'div' : 'button';
            return (
              <Tag
                key={v.id}
                {...(single ? {} : { type: 'button' as const, onClick: () => select(i), 'aria-pressed': isActive, 'aria-controls': storyId })}
                className="relative flex-shrink-0 overflow-hidden text-left snap-center"
                style={{ width: single ? '100%' : 'min(82%, 420px)', aspectRatio: single ? '4 / 4.2' : '4 / 5', maxHeight: single ? 520 : undefined, background: INK }}
              >
                <Portrait v={v} isActive={isActive} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.9) 0%, rgba(10,11,9,0.3) 24%, transparent 42%)' }} />
                <span className="absolute top-0 left-0 h-1" style={{ width: isActive ? '100%' : '0%', background: LIME, transition: `width 0.6s ${EASE}` }} aria-hidden="true" />
                {!single && <span className="absolute top-4 left-4 text-[10px] font-black tracking-[0.24em]" style={{ color: isActive ? LIME : 'rgba(255,255,255,0.7)' }} aria-hidden="true">{num(i)}</span>}
                <span className="absolute left-0 right-0 bottom-0 block p-5">
                  <span className="block font-black text-white text-2xl leading-none" style={{ letterSpacing: '-0.03em' }}>{v.name}</span>
                  <span className="block mt-1.5 text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: LIME }}>{v.role}</span>
                </span>
              </Tag>
            );
          })}
        </div>
        {!single && (
          <div className="lg:hidden flex gap-1.5 mt-4" aria-hidden="true">
            {voices.map((v, i) => (
              <span key={v.id} className="h-[3px] flex-1" style={{ background: i === activeIndex ? LIME : 'oklch(var(--foreground-950) / 0.12)', transition: 'background 0.3s' }} />
            ))}
          </div>
        )}

        {/* ── Story panel: quote first, then the story (name and role are on the portrait) ── */}
        {hasStory && (
          <div id={storyId} aria-live="polite" className="mt-3 lg:mt-2 p-7 md:p-10 xl:p-12" style={{ background: INK }}>
            <div className="flex items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-7 h-0.5 flex-shrink-0" style={{ background: LIME }} aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: LIME }}>{active.storyLabel || storyLabel}</span>
              </div>
              {!single && (
                <div className="hidden lg:flex gap-1.5" aria-hidden="true">
                  {voices.map((v, i) => (
                    <span key={v.id} className="h-[3px] w-10" style={{ background: i === activeIndex ? LIME : 'rgba(255,255,255,0.14)', transition: 'background 0.3s' }} />
                  ))}
                </div>
              )}
            </div>

            <div key={`b-${active.id}`} className="animate-fadeIn">
              {active.pullQuote && (
                <blockquote className="mb-10">
                  <i className="ri-double-quotes-l text-3xl block mb-3" style={{ color: LIME }} aria-hidden="true" />
                  <p className="font-black text-white max-w-[980px]" style={{ fontSize: 'clamp(20px,2.2vw,32px)', lineHeight: 1.25, letterSpacing: '-0.025em' }}>
                    {active.pullQuote}
                  </p>
                </blockquote>
              )}
              {active.media && <div className="mb-8">{active.media}</div>}
              {shown.length > 0 && (
                <div className={shown.length > 1 ? 'lg:columns-2 lg:gap-14' : ''}>
                  {shown.map((para, i) => (
                    <p
                      key={i}
                      className={`leading-[1.8] mb-5 last:mb-0 break-inside-avoid ${
                        shown.length === 1 ? 'text-[17px] md:text-[20px] text-white/85' : i === 0 ? 'text-[17px] md:text-[18px] text-white/85' : 'text-[15px] md:text-[16px] text-white/65'
                      }`}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
              {active.extra && <div className={shown.length > 0 ? 'mt-8' : ''}>{active.extra}</div>}
              {active.closingQuote && (expanded || !canExpand) && (
                <p className="mt-10 pt-8 font-black text-white" style={{ fontSize: 'clamp(18px,1.9vw,26px)', lineHeight: 1.35, letterSpacing: '-0.02em', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  {active.closingQuote}
                </p>
              )}
            </div>

            {(canExpand || !single) && (
              <div className="mt-10 pt-6 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {canExpand ? (
                  <button
                    type="button"
                    onClick={() => setExpanded((x) => !x)}
                    aria-expanded={expanded}
                    className="inline-flex items-center gap-2 min-h-[44px] text-[11px] font-black uppercase tracking-[0.16em] cursor-pointer hover:text-white transition-colors"
                    style={{ color: LIME }}
                  >
                    {expanded ? lessLabel : moreLabel}
                    <i className={expanded ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} aria-hidden="true" />
                  </button>
                ) : <span />}
                {!single && (
                  <button type="button" onClick={goNext} className="group inline-flex items-center gap-4 cursor-pointer">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white group-hover:text-primary-500 transition-colors">{nextLabel}</span>
                    <span className="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-primary-500 text-foreground-950 group-hover:bg-white transition-colors" aria-hidden="true">
                      <i className="ri-arrow-right-line text-lg" />
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {footer}
      </div>
    </section>
  );
}

/** Bottom CTA box — same look as the one under „Sonic Spirit & Faces“. */
export function VoicesCta({ text, sub, button }: { text: ReactNode; sub?: ReactNode; button: ReactNode }) {
  return (
    <div
      className="border bg-white py-7 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-5 mt-3"
      style={{ borderColor: 'oklch(var(--foreground-950) / 0.08)' }}
    >
      <div className="text-center sm:text-left">
        <p className="text-base font-black text-foreground-950 leading-snug">{text}</p>
        {sub && <p className="text-[13px] mt-1.5" style={{ color: 'oklch(0.55 0.006 260)' }}>{sub}</p>}
      </div>
      {button}
    </div>
  );
}
