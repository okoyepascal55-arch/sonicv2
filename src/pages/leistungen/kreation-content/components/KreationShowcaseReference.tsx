import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useLeistungenText } from '@/hooks/useLeistungenText';

// Texts (tab names, descriptions, card texts): Dashboard → Text → Kreation & Content — Showcase (Rahmen / <Tab>)
const TABS = [
  { id: 'konzeption', icon: 'ri-lightbulb-flash-line' },
  { id: 'innovation', icon: 'ri-rocket-2-line' },
  { id: 'ci', icon: 'ri-fingerprint-line' },
  { id: 'layout', icon: 'ri-layout-grid-line' },
  { id: 'pos', icon: 'ri-store-2-line' },
] as const;

type TabId = typeof TABS[number]['id'];

type Item = {
  id: string;
  tag: string;
  title: string;
  sub: string;
};

// 6 cards per tab: 5 in the bento grid + 1 wide card below it (previously the wide card repeated card 5)
const ITEM_COUNT = 6;

const FALLBACKS: Record<TabId, string[]> = {
  konzeption: [
    'https://readdy.ai/api/search-image?query=professional%20brand%20campaign%20strategy%20creative%20agency%20whiteboard%20meeting%20concept%20development%20modern%20office%20team%20brainstorming%20premium%20commercial%20photography%20dramatic%20contrast&width=800&height=600&seq=k1-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20architecture%20positioning%20strategy%20design%20agency%20portfolio%20concept%20board%20professional%20flat%20lay%20premium%20modern%20workspace&width=400&height=300&seq=k2-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=multichannel%20campaign%20concept%20creative%20agency%20design%20boards%20assets%20layout%20professional%20editorial%20style&width=400&height=300&seq=k3-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=retail%20communication%20strategy%20brand%20point%20of%20sale%20premium%20campaign%20planning%20presentation%20board&width=600&height=300&seq=k4-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=content%20strategy%20editorial%20planning%20creative%20calendar%20digital%20marketing%20agency%20professional%20workspace&width=1200&height=350&seq=k5-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=content%20production%20shooting%20presenter%20unboxing%20video%20product%20how%20to%20studio%20camera%20crew%20professional%20bright%20modern&width=1200&height=350&seq=k6-a&orientation=landscape',
  ],
  innovation: [
    'https://readdy.ai/api/search-image?query=AI%20artificial%20intelligence%20creative%20concept%20development%20futuristic%20design%20agency%20digital%20generative%20design%20modern%20technology%20lime%20green%20accent%20dark%20atmosphere&width=800&height=600&seq=i1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=live%20stream%20product%20presentation%20studio%20presenter%20camera%20ring%20light%20consumer%20electronics%20modern%20professional%20broadcast%20setup&width=400&height=300&seq=i2-live&orientation=landscape',
    'https://readdy.ai/api/search-image?query=interactive%20brand%20experience%20digital%20installation%20retail%20environment%20touchscreen%20modern%20innovative%20consumer%20technology&width=400&height=300&seq=i3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=3D%20CGI%20photorealistic%20product%20visualization%20render%20floating%20packaging%20consumer%20electronics%20bright%20studio%20lighting%20commercial%20quality%20clean%20background&width=600&height=300&seq=i4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=new%20communication%20format%20digital%20brand%20storytelling%20creative%20agency%20innovative%20modern%20design%20concept%20future%20forward&width=1200&height=350&seq=i5-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=social%20media%20content%20creation%20smartphone%20vertical%20video%20product%20presenter%20modern%20studio%20bright%20professional&width=1200&height=350&seq=i6-a&orientation=landscape',
  ],
  ci: [
    'https://readdy.ai/api/search-image?query=corporate%20identity%20design%20brand%20system%20complete%20visual%20identity%20manual%20professional%20creative%20agency%20premium%20branding%20portfolio%20flat%20lay&width=800&height=600&seq=ci1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=logo%20design%20brand%20mark%20identity%20creative%20agency%20minimalist%20modern%20professional%20clean%20white%20background%20premium%20branding&width=400&height=300&seq=ci2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=typography%20color%20system%20brand%20guidelines%20design%20agency%20visual%20identity%20premium%20editorial%20layout%20professional%20modern&width=400&height=300&seq=ci3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=corporate%20design%20manual%20brand%20book%20guidelines%20flat%20lay%20premium%20creative%20agency%20print%20professional%20elegant&width=600&height=300&seq=ci4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20rollout%20touchpoints%20corporate%20identity%20application%20stationery%20signage%20business%20cards%20premium%20professional%20editorial%20flat%20lay&width=1200&height=350&seq=ci5-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20templates%20briefing%20documents%20artwork%20print%20ready%20files%20design%20agency%20desk%20flat%20lay%20professional%20clean&width=1200&height=350&seq=ci6-a&orientation=landscape',
  ],
  layout: [
    'https://readdy.ai/api/search-image?query=print%20design%20layout%20brochure%20editorial%20professional%20creative%20agency%20premium%20typography%20flat%20lay%20clean%20modern%20design&width=800&height=600&seq=l1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=packaging%20design%20consumer%20product%20retail%20shelf%20premium%20brand%20identity%20clean%20studio%20photography%20commercial%20quality%20editorial&width=400&height=300&seq=l2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=catalogue%20design%20print%20editorial%20layout%20premium%20brand%20creative%20agency%20professional%20modern%20clean%20typography%20commercial%20quality&width=400&height=300&seq=l3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=digital%20screen%20design%20UI%20layout%20app%20interface%20brand%20identity%20modern%20clean%20professional%20creative%20agency%20digital%20design%20system&width=600&height=300&seq=l4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=POS%20communication%20retail%20point%20of%20sale%20print%20promotional%20material%20brand%20identity%20store%20signage%20premium%20commercial%20design&width=1200&height=350&seq=l5-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=promotion%20material%20training%20brochures%20sales%20staff%20handouts%20retail%20brand%20print%20flat%20lay%20professional%20clean&width=1200&height=350&seq=l6-a&orientation=landscape',
  ],
  pos: [
    'https://readdy.ai/api/search-image?query=retail%20display%20POS%20stand%20brand%20activation%20consumer%20electronics%20premium%20store%20environment%20professional%20commercial%20photography%20modern%20clean&width=800&height=600&seq=p1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=shop%20fitting%20retail%20interior%20design%20premium%20brand%20experience%20modern%20store%20environment%20commercial%20photography%20professional&width=400&height=300&seq=p2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=trade%20show%20exhibition%20booth%20stand%20premium%20brand%20activation%20professional%20event%20marketing%20modern%20commercial%20photography%20IFA%20Berlin&width=400&height=300&seq=p3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=shop%20in%20shop%20retail%20concept%20brand%20world%20consumer%20electronics%20premium%20store%20environment%20professional%20commercial%20modern&width=600&height=300&seq=p4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=nationwide%20POS%20rollout%20retail%20display%20brand%20consistency%20consumer%20electronics%20stores%20professional%20commercial%20photography%20wide%20angle&width=1200&height=350&seq=p5-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=promotion%20counter%20retail%20store%20brand%20ambassador%20demo%20stand%20consumer%20electronics%20professional%20commercial%20photography%20modern&width=1200&height=350&seq=p6-a&orientation=landscape',
  ],
};

const BEFORE_AFTER_FALLBACK = [
  'https://readdy.ai/api/search-image?query=brand%20trade%20show%20booth%20IFA%20Berlin%20real%20built%20exhibition%20stand%20professional%20retail%20display%20modern%20premium%20consumer%20electronics%20physical%20stand%20interior%20wide%20angle%20shot%20dramatic%20event%20photography&width=1200&height=680&seq=ba-reality&orientation=landscape',
  'https://readdy.ai/api/search-image?query=trade%20show%20booth%20photorealistic%20CGI%203D%20render%20architectural%20visualization%20exhibition%20stand%20design%20lime%20green%20accent%20lighting%20futuristic%20dark%20atmosphere%20high%20quality%20render%20IFA%20Berlin%20concept&width=1200&height=680&seq=ba-cgi&orientation=landscape',
];

function Lightbox({ items, images, startIndex, onClose }: { items: Item[]; images: string[]; startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setIndex(value => (value - 1 + items.length) % items.length);
      if (event.key === 'ArrowRight') setIndex(value => (value + 1) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [items.length, onClose]);

  const item = items[index];
  const src = images[index];

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-foreground-950/97 flex flex-col" style={{ backdropFilter: 'blur(18px)' }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/[0.07]">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black uppercase tracking-[0.16em] text-primary-500">Portfolio</span>
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-primary-500 text-foreground-950">{item.tag}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-white/35">{index + 1} / {items.length}</span>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center border border-white/[0.12] text-white/60 hover:bg-primary-500 hover:text-foreground-950 transition-colors" aria-label="Lightbox schließen">✕</button>
        </div>
      </div>
      <div className="relative flex-1 flex items-center justify-center px-16 py-12">
        <button onClick={() => setIndex(value => (value - 1 + items.length) % items.length)} className="absolute left-4 w-12 h-12 border border-white/[0.12] text-white/60 hover:bg-primary-500 hover:text-foreground-950 flex items-center justify-center" aria-label="Vorheriges Bild"><i className="ri-arrow-left-line text-lg" aria-hidden="true" /></button>
        <div className="relative max-w-[900px] max-h-[70vh] w-full flex items-center justify-center overflow-hidden">
          <img src={src} alt={item.title} className="max-w-full max-h-[70vh] object-contain" />
        </div>
        <button onClick={() => setIndex(value => (value + 1) % items.length)} className="absolute right-4 w-12 h-12 border border-white/[0.12] text-white/60 hover:bg-primary-500 hover:text-foreground-950 flex items-center justify-center" aria-label="Nächstes Bild"><i className="ri-arrow-right-line text-lg" aria-hidden="true" /></button>
      </div>
      <div className="px-6 md:px-8 py-5 border-t border-white/[0.07] flex items-center justify-between gap-6">
        <div><h3 className="text-xl font-black uppercase text-white mb-1">{item.title}</h3><p className="text-xs text-white/40">{item.sub}</p></div>
        <div className="hidden sm:flex gap-1">
          {items.map((entry, i) => <button key={entry.id} onClick={() => setIndex(i)} aria-label={`${entry.title} anzeigen`} aria-current={i === index ? 'true' : undefined} className="relative overflow-hidden" style={{ width: 52, height: 36, opacity: i === index ? 1 : 0.4, border: i === index ? '1px solid oklch(0.81 0.19 115)' : '1px solid transparent' }}><img src={images[i]} alt="" className="w-full h-full object-cover" /></button>)}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Showcase — refreshed 28.10.2026. Same system as before (5 tabs, 5-cell bento,
   wide highlight card, CGI slider in POS, full-screen view), elevated:
   site-wide tab strip, contact-sheet hairlines, calmer overlays with the subline on
   hover, staggered reveal on tab change, highlight card with the portfolio CTA,
   swipe carousel on phones. Dashboard texts/images unchanged.
───────────────────────────────────────────────────────────────────────── */

const HAIR = 'oklch(var(--foreground-950) / 0.1)';

function BentoCell({ item, src, index, onOpen, area, big = false }: { item: Item; src: string; index: number; onOpen: () => void; area: string; big?: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="kr-cell group relative overflow-hidden text-left cursor-zoom-in bg-foreground-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
      style={{ gridArea: area, ['--n' as string]: index }}
      aria-label={`${item.title} im Vollbild öffnen`}
    >
      <img src={src} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/85" />
      <span className="absolute top-3 left-3 bg-primary-500 text-foreground-950 text-[9px] font-black uppercase tracking-[0.08em] px-2.5 py-1">{item.tag}</span>
      <span className="absolute top-3 right-3 text-white/60 text-[10px] font-black tabular-nums">{String(index + 1).padStart(2, '0')}</span>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h3 className="font-black text-white leading-tight uppercase" style={{ fontSize: big ? 'clamp(1.1rem, 2vw, 1.6rem)' : '14px', letterSpacing: '-0.01em' }}>{item.title}</h3>
        <p className="text-xs md:text-sm text-white/70 max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100 group-hover:mt-1.5 group-focus-visible:max-h-16 group-focus-visible:opacity-100">{item.sub}</p>
      </div>
    </button>
  );
}

function BeforeAfter({ reality, cgi, t }: { reality: string; cgi: string; contactEmail?: string; t: Record<string, string> }) {
  const [pos, setPos] = useState(55);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(95, Math.max(5, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div className="kr-cell" style={{ ['--n' as string]: 5, borderTop: `1px solid ${HAIR}` }}>
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 px-5 md:px-6 py-4">
        <p className="text-foreground-950 font-black text-base md:text-lg leading-tight">
          <span className="text-[11px] font-bold mr-3" style={{ color: 'oklch(0.55 0.08 115)' }}>{t['ba-eyebrow']}</span>
          {t['ba-title']}
        </p>
        <p className="text-foreground-500 text-xs md:text-sm flex items-center gap-4">
          {t['ba-hint']}
          {t['ba-button'] && <a href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch`} className="hidden md:inline-flex items-center gap-1.5 text-foreground-950 font-black text-xs hover:text-primary-600">{t['ba-button']} <i className="ri-arrow-right-line" aria-hidden="true" /></a>}
        </p>
      </div>
      <div
        ref={containerRef}
        className="relative h-[300px] md:h-[440px] overflow-hidden select-none cursor-col-resize touch-pan-y bg-foreground-950"
        onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
        onMouseDown={(e) => move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
        role="slider"
        aria-label={t['ba-title']}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'ArrowLeft') setPos((p) => Math.max(5, p - 5)); if (e.key === 'ArrowRight') setPos((p) => Math.min(95, p + 5)); }}
      >
        <img src={reality} alt={t['ba-label-real']} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <span className="absolute top-4 right-4 px-3 py-1.5 bg-black/55 backdrop-blur-sm text-[9px] font-black uppercase tracking-[0.12em] text-white">{t['ba-label-real']}</span>
        <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={cgi} alt={t['ba-label-cgi']} className="w-full h-full object-cover" draggable={false} />
          <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary-500 text-foreground-950 text-[9px] font-black uppercase tracking-[0.12em]">{t['ba-label-cgi']}</span>
        </div>
        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%` }}>
          <div className="w-0.5 h-full bg-primary-500 -translate-x-1/2" />
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-primary-500 text-foreground-950 flex items-center justify-center"><i className="ri-arrow-left-right-line text-lg" aria-hidden="true" /></div>
        </div>
      </div>
    </div>
  );
}

export default function KreationShowcaseReference({ tabIcons }: { tabIcons?: Partial<Record<TabId, string>> }) {
  const [activeTab, setActiveTab] = useState<TabId>('konzeption');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileRef = useRef<HTMLDivElement>(null);
  const t = useLeistungenText('leistungen_kreation_showcase');
  const tItems = useLeistungenText(`leistungen_kreation_showcase_${activeTab}`);
  // Primary fallback images (all tabs)
  const { images: primaryImages } = useMediaStore('leistungen_kreation_showcase_images');
  // Per-tab secondary sets — override primary when uploaded via dashboard
  const { images: secKonz } = useMediaStore('leistungen_kreation_showcase_secondary_konzeption');
  const { images: secInnovation } = useMediaStore('leistungen_kreation_showcase_secondary_innovation');
  const { images: secCi } = useMediaStore('leistungen_kreation_showcase_secondary_ci');
  const { images: secLayout } = useMediaStore('leistungen_kreation_showcase_secondary_layout');
  const { images: secPos } = useMediaStore('leistungen_kreation_showcase_secondary_pos');
  const { images: beforeAfter } = useMediaStore('leistungen_kreation_before_after');

  const tabSecondary: Record<TabId, typeof primaryImages> = { konzeption: secKonz, innovation: secInnovation, ci: secCi, layout: secLayout, pos: secPos };

  const itemsKey = Array.from({ length: ITEM_COUNT }, (_, i) => [tItems[`i${i + 1}-tag`], tItems[`i${i + 1}-title`], tItems[`i${i + 1}-sub`]].join('\u0001')).join('\u0002');
  const items: Item[] = useMemo(() => itemsKey.split('\u0002').map((row, i) => {
    const [tag = '', title = '', sub = ''] = row.split('\u0001');
    return { id: `${activeTab}-${i + 1}`, tag, title, sub };
  }), [itemsKey, activeTab]);
  const images = useMemo(() => {
    const sec = tabSecondary[activeTab];
    return items.map((_, i) => {
      const tabImg = sec[i]?.url ? resolveImageUrl(sec[i].url) : null;
      const primaryImg = primaryImages[i]?.url ? resolveImageUrl(primaryImages[i].url) : null;
      return tabImg ?? primaryImg ?? FALLBACKS[activeTab][i];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, primaryImages, secKonz, secInnovation, secCi, secLayout, secPos, items]);
  const reality = beforeAfter[0]?.url ? resolveImageUrl(beforeAfter[0].url) : BEFORE_AFTER_FALLBACK[0];
  const cgi = beforeAfter[1]?.url ? resolveImageUrl(beforeAfter[1].url) : BEFORE_AFTER_FALLBACK[1];

  const selectTab = (id: TabId) => {
    setActiveTab(id);
    setLightboxIndex(null);
    setMobileIndex(0);
    mobileRef.current?.scrollTo({ left: 0 });
  };
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
    selectTab(TABS[next].id);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };
  const onMobileScroll = () => {
    const row = mobileRef.current;
    if (!row) return;
    const w = (row.children[0] as HTMLElement | undefined)?.offsetWidth ?? row.clientWidth;
    setMobileIndex(Math.min(items.length - 1, Math.round(row.scrollLeft / (w + 12))));
  };

  const wide = items[5];
  const bentoAreas = ['a', 'b', 'c', 'd', 'e'];

  return (
    <section id="konzept" className="sonic-section-lg relative bg-white px-4 md:px-6" style={{ borderTop: `1px solid ${HAIR}` }}>
      <div className="sonic-container relative z-10">
        {/* Header — heading left, tab description right (site-wide header style) */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{t['eyebrow']}</span></div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="sonic-h2 text-foreground-950">{t['heading']}<br /><span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{t['heading-accent']}</span></h2>
            <p key={activeTab} className="kr-cell text-[15px] md:text-[16px] leading-relaxed max-w-md text-foreground-500">{t[`desc-${activeTab}`]}</p>
          </div>
        </div>

        <div style={{ border: `1px solid ${HAIR}` }}>
          {/* Tab strip — same language as Leistungen / Events / Live Video */}
          <div className="grid grid-cols-5" style={{ borderBottom: `1px solid ${HAIR}` }} role="tablist" aria-label={t['eyebrow'] || 'Showcase'}>
            {TABS.map((tab, i) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(tab.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className="group flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 py-3.5 sm:py-4 px-1 cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
                  style={{
                    background: isActive ? 'oklch(var(--foreground-950))' : '#fff',
                    borderRight: i < TABS.length - 1 ? '1px solid oklch(var(--foreground-950) / 0.08)' : undefined,
                    borderBottom: isActive ? '2px solid oklch(var(--primary-500))' : '2px solid transparent',
                  }}
                >
                  <span className="font-black tabular-nums leading-none text-[12px]" style={{ color: isActive ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-300))' }}>{String(i + 1).padStart(2, '0')}</span>
                  {tabIcons?.[tab.id]
                    ? <img src={tabIcons[tab.id]} alt="" className={`hidden sm:block w-7 h-7 object-cover transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0'}`} loading="lazy" />
                    : <i className={`${tab.icon} hidden sm:inline text-base leading-none ${isActive ? 'text-primary-500' : 'text-foreground-400 group-hover:text-foreground-950'}`} aria-hidden="true" />}
                  <span className={`hidden sm:inline text-[11px] font-black uppercase tracking-[0.1em] text-center leading-tight ${isActive ? 'text-white' : 'text-foreground-600 group-hover:text-foreground-950'}`}>{t[`tab-${tab.id}`]}</span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP: the bento, now a contact sheet with 1px hairlines between the pieces */}
          <div
            key={`bento-${activeTab}`}
            className="hidden md:grid gap-px"
            style={{ background: HAIR, gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(2, clamp(220px, 21vw, 290px))', gridTemplateAreas: '"a a a a a b b b b c c c" "a a a a a d d d d e e e"' }}
          >
            {bentoAreas.map((area, i) => (
              <BentoCell key={items[i].id} item={items[i]} src={images[i]} index={i} area={area} big={i === 0} onOpen={() => setLightboxIndex(i)} />
            ))}
          </div>

          {/* MOBILE: swipe through the pieces, one at a time */}
          <div className="md:hidden">
            <p className="px-3 pt-3 text-foreground-950 font-black text-sm uppercase tracking-tight">{t[`tab-${activeTab}`]}</p>
            <div ref={mobileRef} onScroll={onMobileScroll} key={`m-${activeTab}`} className="kr-snap flex gap-3 overflow-x-auto p-3">
              {items.map((item, i) => (
                <button key={item.id} type="button" onClick={() => setLightboxIndex(i)} className="kr-cell relative flex-shrink-0 w-[82%] overflow-hidden text-left bg-foreground-950" style={{ aspectRatio: '4 / 5', ['--n' as string]: i }}>
                  <img src={images[i]} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                  <span className="absolute top-3 left-3 bg-primary-500 text-foreground-950 text-[9px] font-black px-2 py-0.5 uppercase">{item.tag}</span>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-black text-sm uppercase leading-snug">{item.title}</p>
                    <p className="text-white/65 text-xs mt-1">{item.sub}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between px-3 pb-3">
              <div className="flex gap-1.5">
                {items.map((it, i) => <span key={it.id} className="h-1 transition-all duration-300" style={{ width: i === mobileIndex ? 24 : 8, background: i === mobileIndex ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-950) / 0.15)' }} />)}
              </div>
              <span className="text-[11px] font-bold text-foreground-500 tabular-nums">{String(mobileIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* POS: CGI → reality slider, inside the same frame */}
          {activeTab === 'pos' && <BeforeAfter reality={reality} cgi={cgi} t={t} />}

          {/* Highlight — the wide piece with a dark panel that carries the portfolio call to action */}
          <div key={`hl-${activeTab}`} className="grid md:grid-cols-12" style={{ borderTop: `1px solid ${HAIR}` }}>
            <button type="button" onClick={() => setLightboxIndex(5)} className="kr-cell hidden md:block md:col-span-8 relative overflow-hidden group cursor-zoom-in bg-foreground-950 h-[300px] lg:h-[340px]" style={{ ['--n' as string]: 6 }} aria-label={`${wide.title} im Vollbild öffnen`}>
              <img src={images[5]} alt={wide.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <span className="absolute top-4 left-4 bg-primary-500 text-foreground-950 text-[9px] font-black uppercase tracking-[0.08em] px-2.5 py-1">{wide.tag}</span>
            </button>
            <div className="kr-cell md:col-span-4 bg-foreground-950 text-white p-6 md:p-8 flex flex-col" style={{ ['--n' as string]: 7 }}>
              <span className="text-[11px] font-bold text-primary-500 mb-3">{t[`tab-${activeTab}`]} · {wide.tag}</span>
              <h3 className="text-xl md:text-2xl font-black leading-tight mb-2">{wide.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{wide.sub}</p>
              <div className="mt-auto pt-8">
                <p className="text-white/45 text-xs mb-3">{t['strip-text']}</p>
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Portfolio anfragen')}`} className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 px-6 py-3 text-xs font-black uppercase tracking-[0.14em] hover:bg-white transition-colors">
                  {t['strip-button']} <i className="ri-arrow-right-line" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && <Lightbox items={items} images={images} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </section>
  );
}
