import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const TABS = [
  { id: 'konzeption', label: 'Konzeption', icon: 'ri-lightbulb-flash-line' },
  { id: 'innovation', label: 'Innovation', icon: 'ri-rocket-2-line' },
  { id: 'ci', label: 'CI', icon: 'ri-fingerprint-line' },
  { id: 'layout', label: 'Layout', icon: 'ri-layout-grid-line' },
  { id: 'pos', label: 'POS', icon: 'ri-store-2-line' },
] as const;

type TabId = typeof TABS[number]['id'];

type Item = {
  id: string;
  tag: string;
  title: string;
  sub: string;
};

const ITEMS: Record<TabId, Item[]> = {
  konzeption: [
    { id: 'k1', tag: 'Kampagne', title: 'shower+ — Full Brand Campaign', sub: 'Von Strategie bis Rollout' },
    { id: 'k2', tag: 'Markenarchitektur', title: 'Markenarchitektur & Positionierung', sub: 'Warum deine Marke, warum jetzt' },
    { id: 'k3', tag: 'Kampagnenkonzept', title: 'Multi-Channel Kampagnenkonzept', sub: 'Eine Idee. Alle Kanäle.' },
    { id: 'k4', tag: 'Retail-Strategie', title: 'Retail-Kommunikationsstrategie', sub: 'Was der Handel braucht. Was deine Marke sagt.' },
    { id: 'k5', tag: 'Content-Strategie', title: 'Content-Strategie & Redaktionsplan', sub: 'Themenplanung mit Wirkung' },
  ],
  innovation: [
    { id: 'i1', tag: 'KI-Konzept', title: 'AI-gestützte Konzeptentwicklung', sub: 'Von der Idee zur Umsetzung in Stunden' },
    { id: 'i2', tag: 'AR-POS', title: 'Augmented Reality am Point of Sale', sub: 'Physisch + digital in einem Erlebnis' },
    { id: 'i3', tag: 'Interaktiv', title: 'Interaktive Formate & Experiences', sub: 'Marken, die man anfassen kann' },
    { id: 'i4', tag: 'CGI & Viz', title: 'CGI-Visualisierungen & Motion', sub: 'Vor dem Bau schon erlebbar' },
    { id: 'i5', tag: 'New Formats', title: 'Neue Kommunikationsformate', sub: 'Was morgen funktioniert. Heute entwickelt.' },
  ],
  ci: [
    { id: 'ci1', tag: 'CI-System', title: 'Corporate Identity Entwicklung', sub: 'Das vollständige Markensystem' },
    { id: 'ci2', tag: 'Logo & Brand', title: 'Logo-Design & Markenzeichen', sub: 'Erkennbar. Konsistent. Unverwechselbar.' },
    { id: 'ci3', tag: 'Typografie', title: 'Typografie & Farbsystem', sub: 'Die Stimme deiner Marke — visuell' },
    { id: 'ci4', tag: 'Brand Manual', title: 'Corporate Design Manual', sub: 'Dein Regelwerk für alle Partner' },
    { id: 'ci5', tag: 'Rollout', title: 'CI-Rollout auf alle Touchpoints', sub: 'Vom Briefpapier bis zum Messestand' },
  ],
  layout: [
    { id: 'l1', tag: 'Print', title: 'Print-Konzeption & Reinzeichnung', sub: 'Druckfertige Dateien. Erstklassige Qualität.' },
    { id: 'l2', tag: 'Packaging', title: 'Packaging Design', sub: 'Regalpräsenz, die verkauft' },
    { id: 'l3', tag: 'Katalog', title: 'Katalog- & Prospektgestaltung', sub: 'Komplexes einfach und klar kommuniziert' },
    { id: 'l4', tag: 'Digital', title: 'Digital Layout & Screendesign', sub: 'Web, App, Social — konsistentes Design' },
    { id: 'l5', tag: 'POS-Layout', title: 'POS-Kommunikation & Werbemittel', sub: 'Preisschilder bis Schaufenstergestaltung' },
  ],
  pos: [
    { id: 'p1', tag: 'Display', title: 'Displays & Aufsteller', sub: 'Auffällig. Markenkonform. Verkaufsaktiv.' },
    { id: 'p2', tag: 'Ladenbau', title: 'Shopfitting & Ladenbaukonzepte', sub: 'Flächen, die Marken erlebbar machen' },
    { id: 'p3', tag: 'Messe', title: 'Messestand-Design & -Bau', sub: 'Von der Skizze bis zum fertigen Stand' },
    { id: 'p4', tag: 'Shop-in-Shop', title: 'Shop-in-Shop Konzepte', sub: 'Markenwelt im Handel' },
    { id: 'p5', tag: 'Rollout', title: 'Bundesweiter POS-Rollout', sub: 'Einheitlich. Schnell. Skalierbar.' },
  ],
};

const TAB_DESC: Record<TabId, string> = {
  konzeption: 'Von der ersten Idee bis zur fertigen Kampagne — strategisch und verkaufsstark.',
  innovation: 'KI, AR und neue Formate: Wir denken Kommunikation konsequent neu.',
  ci: 'Markenidentitäten, die standhalten — vom Logo bis zum vollständigen CI-System.',
  layout: 'Print, Digital, Packaging — Layout-Qualität, die deine Marke trägt.',
  pos: 'Displays, Ladenbau, Messe: Markenauftritte am Point of Sale, die verkaufen.',
};

const FALLBACKS: Record<TabId, string[]> = {
  konzeption: [
    'https://readdy.ai/api/search-image?query=professional%20brand%20campaign%20strategy%20creative%20agency%20whiteboard%20meeting%20concept%20development%20modern%20office%20team%20brainstorming%20premium%20commercial%20photography%20dramatic%20contrast&width=800&height=600&seq=k1-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20architecture%20positioning%20strategy%20design%20agency%20portfolio%20concept%20board%20professional%20flat%20lay%20premium%20modern%20workspace&width=400&height=300&seq=k2-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=multichannel%20campaign%20concept%20creative%20agency%20design%20boards%20assets%20layout%20professional%20editorial%20style&width=400&height=300&seq=k3-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=retail%20communication%20strategy%20brand%20point%20of%20sale%20premium%20campaign%20planning%20presentation%20board&width=600&height=300&seq=k4-b&orientation=landscape',
    'https://readdy.ai/api/search-image?query=content%20strategy%20editorial%20planning%20creative%20calendar%20digital%20marketing%20agency%20professional%20workspace&width=1200&height=350&seq=k5-b&orientation=landscape',
  ],
  innovation: [
    'https://readdy.ai/api/search-image?query=AI%20artificial%20intelligence%20creative%20concept%20development%20futuristic%20design%20agency%20digital%20generative%20design%20modern%20technology%20lime%20green%20accent%20dark%20atmosphere&width=800&height=600&seq=i1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=augmented%20reality%20retail%20point%20of%20sale%20interactive%20digital%20overlay%20product%20experience%20consumer%20electronics%20modern%20technology%20innovation&width=400&height=300&seq=i2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=interactive%20brand%20experience%20digital%20installation%20retail%20environment%20touchscreen%20modern%20innovative%20consumer%20technology&width=400&height=300&seq=i3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=3D%20CGI%20photorealistic%20product%20visualization%20render%20floating%20packaging%20consumer%20electronics%20bright%20studio%20lighting%20commercial%20quality%20clean%20background&width=600&height=300&seq=i4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=new%20communication%20format%20digital%20brand%20storytelling%20creative%20agency%20innovative%20modern%20design%20concept%20future%20forward&width=1200&height=350&seq=i5-a&orientation=landscape',
  ],
  ci: [
    'https://readdy.ai/api/search-image?query=corporate%20identity%20design%20brand%20system%20complete%20visual%20identity%20manual%20professional%20creative%20agency%20premium%20branding%20portfolio%20flat%20lay&width=800&height=600&seq=ci1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=logo%20design%20brand%20mark%20identity%20creative%20agency%20minimalist%20modern%20professional%20clean%20white%20background%20premium%20branding&width=400&height=300&seq=ci2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=typography%20color%20system%20brand%20guidelines%20design%20agency%20visual%20identity%20premium%20editorial%20layout%20professional%20modern&width=400&height=300&seq=ci3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=corporate%20design%20manual%20brand%20book%20guidelines%20flat%20lay%20premium%20creative%20agency%20print%20professional%20elegant&width=600&height=300&seq=ci4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=brand%20rollout%20touchpoints%20corporate%20identity%20application%20stationery%20signage%20business%20cards%20premium%20professional%20editorial%20flat%20lay&width=1200&height=350&seq=ci5-a&orientation=landscape',
  ],
  layout: [
    'https://readdy.ai/api/search-image?query=print%20design%20layout%20brochure%20editorial%20professional%20creative%20agency%20premium%20typography%20flat%20lay%20clean%20modern%20design&width=800&height=600&seq=l1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=packaging%20design%20consumer%20product%20retail%20shelf%20premium%20brand%20identity%20clean%20studio%20photography%20commercial%20quality%20editorial&width=400&height=300&seq=l2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=catalogue%20design%20print%20editorial%20layout%20premium%20brand%20creative%20agency%20professional%20modern%20clean%20typography%20commercial%20quality&width=400&height=300&seq=l3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=digital%20screen%20design%20UI%20layout%20app%20interface%20brand%20identity%20modern%20clean%20professional%20creative%20agency%20digital%20design%20system&width=600&height=300&seq=l4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=POS%20communication%20retail%20point%20of%20sale%20print%20promotional%20material%20brand%20identity%20store%20signage%20premium%20commercial%20design&width=1200&height=350&seq=l5-a&orientation=landscape',
  ],
  pos: [
    'https://readdy.ai/api/search-image?query=retail%20display%20POS%20stand%20brand%20activation%20consumer%20electronics%20premium%20store%20environment%20professional%20commercial%20photography%20modern%20clean&width=800&height=600&seq=p1-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=shop%20fitting%20retail%20interior%20design%20premium%20brand%20experience%20modern%20store%20environment%20commercial%20photography%20professional&width=400&height=300&seq=p2-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=trade%20show%20exhibition%20booth%20stand%20premium%20brand%20activation%20professional%20event%20marketing%20modern%20commercial%20photography%20IFA%20Berlin&width=400&height=300&seq=p3-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=shop%20in%20shop%20retail%20concept%20brand%20world%20consumer%20electronics%20premium%20store%20environment%20professional%20commercial%20modern&width=600&height=300&seq=p4-a&orientation=landscape',
    'https://readdy.ai/api/search-image?query=nationwide%20POS%20rollout%20retail%20display%20brand%20consistency%20consumer%20electronics%20stores%20professional%20commercial%20photography%20wide%20angle&width=1200&height=350&seq=p5-a&orientation=landscape',
  ],
};

const BEFORE_AFTER_FALLBACK = [
  'https://readdy.ai/api/search-image?query=Philips%20brand%20trade%20show%20booth%20IFA%20Berlin%20real%20built%20exhibition%20stand%20professional%20retail%20display%20modern%20premium%20consumer%20electronics%20physical%20stand%20interior%20wide%20angle%20shot%20dramatic%20event%20photography&width=1200&height=680&seq=ba-reality&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Philips%20trade%20show%20booth%20photorealistic%20CGI%203D%20render%20architectural%20visualization%20exhibition%20stand%20design%20lime%20green%20accent%20lighting%20futuristic%20dark%20atmosphere%20high%20quality%20render%20IFA%20Berlin%20concept&width=1200&height=680&seq=ba-cgi&orientation=landscape',
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
        <button onClick={() => setIndex(value => (value - 1 + items.length) % items.length)} className="absolute left-4 w-12 h-12 border border-white/[0.12] text-white/60 hover:bg-primary-500 hover:text-foreground-950 flex items-center justify-center" aria-label="Vorheriges Bild"><i className="ri-arrow-left-line text-lg" /></button>
        <div className="relative max-w-[900px] max-h-[70vh] w-full flex items-center justify-center overflow-hidden">
          <img src={src} alt={item.title} className="max-w-full max-h-[70vh] object-contain" />
        </div>
        <button onClick={() => setIndex(value => (value + 1) % items.length)} className="absolute right-4 w-12 h-12 border border-white/[0.12] text-white/60 hover:bg-primary-500 hover:text-foreground-950 flex items-center justify-center" aria-label="Nächstes Bild"><i className="ri-arrow-right-line text-lg" /></button>
      </div>
      <div className="px-6 md:px-8 py-5 border-t border-white/[0.07] flex items-center justify-between gap-6">
        <div><h3 className="text-xl font-black uppercase text-white mb-1">{item.title}</h3><p className="text-xs text-white/40">{item.sub}</p></div>
        <div className="hidden sm:flex gap-1">
          {items.map((entry, i) => <button key={entry.id} onClick={() => setIndex(i)} className="relative overflow-hidden" style={{ width: 52, height: 36, opacity: i === index ? 1 : 0.4, border: i === index ? '1px solid oklch(0.81 0.19 115)' : '1px solid transparent' }}><img src={images[i]} alt="" className="w-full h-full object-cover" /></button>)}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ShowcaseCard({ item, src, span, rowSpan = 'span 1', onOpen, titleSize, isWide = false }: { item: Item; src: string; span: string; rowSpan?: string; onOpen: () => void; titleSize: string; isWide?: boolean }) {
  return (
    <button type="button" onClick={onOpen} className="relative overflow-hidden text-left cursor-pointer group w-full" style={{ gridColumn: span, gridRow: rowSpan, minHeight: isWide ? '280px' : '280px', height: isWide ? '280px' : undefined }}>
      <img src={src} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-transparent" />
      <span className="absolute top-3 left-3 bg-primary-500 text-foreground-950 text-[9px] font-black uppercase tracking-[0.06em] px-2.5 py-1">{item.tag}</span>
      <div className="absolute top-3 right-3 w-[34px] h-[34px] flex items-center justify-center bg-white/12 border border-white/25 text-white backdrop-blur-sm"><i className="ri-zoom-in-line text-sm" /></div>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6"><h3 className="font-black text-white leading-tight uppercase" style={{ fontSize: titleSize }}>{item.title}</h3><p className="text-xs text-white/60 mt-1">{item.sub}</p></div>
    </button>
  );
}

function BeforeAfter({ reality, cgi, contactEmail }: { reality: string; cgi: string; contactEmail: string }) {
  const [pos, setPos] = useState(55);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(95, Math.max(5, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  return (
    <div className="mt-1">
      <div className="flex items-start justify-between gap-4 px-8 py-7 bg-foreground-950/5 border border-foreground-950/[0.08]">
        <div><p className="text-[9px] font-black uppercase tracking-[0.15em] text-primary-600 mb-2">CGI → Reality Vergleich</p><h3 className="sonic-h2 text-foreground-950 uppercase mb-1">CGI-Render vs. gebauter Stand</h3><p className="text-xs text-foreground-950/40">Ziehe den Regler — Philips @ IFA Berlin</p></div>
        <a href={`mailto:${contactEmail}?subject=Beratungsgespr%C3%A4ch`} className="flex-shrink-0 px-5 py-2.5 border border-foreground-950/[0.12] text-xs font-black uppercase tracking-widest text-foreground-950/40 hover:bg-primary-500 hover:text-foreground-950">Portfolio anfragen <i className="ri-arrow-right-line" /></a>
      </div>
      <div
        ref={containerRef}
        className="relative h-[360px] overflow-hidden select-none cursor-col-resize"
        onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
        onMouseDown={(e) => move(e.clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
      >
        <img src={reality} alt="Gebauter Stand" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <span className="absolute top-4 right-4 px-3 py-1.5 bg-white/15 border border-white/30 text-[9px] font-black uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">Gebauter Stand</span>
        <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={cgi} alt="CGI Render" className="w-full h-full object-cover" draggable={false} />
          <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary-500 text-foreground-950 text-[9px] font-black uppercase tracking-[0.12em]">CGI Render</span>
        </div>
        <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%` }}>
          <div className="w-0.5 h-full bg-primary-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary-500 text-foreground-950 flex items-center justify-center font-black text-sm cursor-col-resize pointer-events-auto"
            onMouseDown={(e) => { e.preventDefault(); move(e.clientX); }}>↔</div>
        </div>
      </div>
    </div>
  );
}

export default function KreationShowcaseReference() {
  const [activeTab, setActiveTab] = useState<TabId>('konzeption');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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

  const items = ITEMS[activeTab];
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

  return (
    <section id="konzept" className="sonic-section-lg relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-10 md:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-600">Showcase</span></div>
              <h2 className="sonic-h2 text-foreground-950 uppercase">Unsere Arbeit.<br /><span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>Deine Wirkung.</span></h2>
              <p className="text-sm max-w-sm leading-relaxed text-foreground-950/45 mt-3">{TAB_DESC[activeTab]}</p>
            </div>
            <div>
              <div className="flex border border-foreground-950/[0.12] bg-white overflow-x-auto">
                <style>{`.tab-scroll::-webkit-scrollbar{display:none}`}</style>
                {TABS.map(tab => <button key={tab.id} type="button" onClick={() => { setActiveTab(tab.id); setLightboxIndex(null); }} className={`flex items-center gap-2 px-4 md:px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] border-r last:border-r-0 border-foreground-950/10 ${activeTab === tab.id ? 'bg-foreground-950 text-primary-500' : 'text-foreground-950/40'}`}><i className={tab.icon} /><span className="hidden sm:inline">{tab.label}</span></button>)}
              </div>
              <div className="flex justify-end gap-1 mt-2">{TABS.map(tab => <div key={tab.id} className={activeTab === tab.id ? 'w-7 bg-primary-500' : 'w-2 bg-foreground-950/15'} style={{ height: 2 }} />)}</div>
            </div>
          </div>
        </div>

        {/* MOBILE: simple 2-col card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:hidden">
          {items.map((item, i) => (
            <button key={item.id} type="button" onClick={() => setLightboxIndex(i)} className="relative overflow-hidden text-left" style={{ height: 180 }}>
              <img src={images[i]} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute top-2 left-2 bg-primary-500 text-foreground-950 text-[9px] font-black px-2 py-0.5 uppercase">{item.tag}</span>
              <div className="absolute bottom-0 left-0 right-0 p-3"><p className="text-white font-black text-xs uppercase leading-snug">{item.title}</p><p className="text-white/50 text-[10px] mt-0.5">{item.sub}</p></div>
            </button>
          ))}
        </div>
        {/* DESKTOP: original bento grid */}
        <div className="hidden md:grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(2, 280px)' }}>
          <ShowcaseCard item={items[0]} src={images[0]} span="span 5" rowSpan="span 2" onOpen={() => setLightboxIndex(0)} titleSize="clamp(1rem,2vw,1.5rem)" />
          <ShowcaseCard item={items[1]} src={images[1]} span="span 4" rowSpan="span 1" onOpen={() => setLightboxIndex(1)} titleSize="14px" />
          <ShowcaseCard item={items[2]} src={images[2]} span="span 3" rowSpan="span 1" onOpen={() => setLightboxIndex(2)} titleSize="13px" />
          <ShowcaseCard item={items[3]} src={images[3]} span="span 4" rowSpan="span 1" onOpen={() => setLightboxIndex(3)} titleSize="13px" />
          <ShowcaseCard item={items[4]} src={images[4]} span="span 3" rowSpan="span 1" onOpen={() => setLightboxIndex(4)} titleSize="12px" />
        </div>
        {/* /desktop bento */}
        <div className="mt-1 hidden md:block">
          <ShowcaseCard item={items[4]} src={images[4]} span="span 12" rowSpan="auto" onOpen={() => setLightboxIndex(4)} titleSize="20px" isWide />
        </div>

        <div className="mt-1 hidden md:grid grid-cols-5 gap-1">
          {items.map((item, i) => <button key={item.id} type="button" onClick={() => setLightboxIndex(i)} className="relative overflow-hidden" style={{ height: 64, opacity: lightboxIndex === i ? 1 : 0.65, border: lightboxIndex === i ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent' }}><img src={images[i]} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" /></button>)}
        </div>

        {activeTab === 'pos' && (
          <BeforeAfter reality={reality} cgi={cgi} contactEmail={CONTACT_EMAIL} />
        )}

        <div className="mt-1 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-8 py-6 bg-foreground-950/5 border border-foreground-950/[0.08]">
          <div className="flex items-center gap-4"><div className="w-9 h-9 flex items-center justify-center bg-primary-500/15"><i className="ri-image-line text-primary-600" /></div><span className="text-sm font-semibold text-foreground-950/50">Alle Beispiele auf Anfrage verfügbar</span></div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch`} className="px-6 py-3 bg-primary-500 text-foreground-950 text-xs font-black uppercase tracking-widest">Portfolio anfragen <i className="ri-arrow-right-line" /></a>
        </div>
      </div>

      {lightboxIndex !== null && <Lightbox items={items} images={images} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </section>
  );
}
