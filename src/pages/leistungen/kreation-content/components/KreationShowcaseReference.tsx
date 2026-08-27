import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const TABS = [
  { id: 'konzeption', label: 'Konzeption & Kreation', icon: 'ri-lightbulb-flash-line' },
  { id: 'content', label: 'Content Creation', icon: 'ri-camera-line' },
  { id: 'cgi', label: 'CGI & 3D-Design', icon: 'ri-box-3-line' },
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
    { id: 'k1', tag: 'Kampagne', title: 'shower+ — Full Brand Campaign', sub: 'Konzept bis Rollout' },
    { id: 'k2', tag: 'Key Visual', title: 'Brand Photography', sub: 'Konsistente Markenwelt' },
    { id: 'k3', tag: 'Brand Identity', title: 'Visual Design System', sub: 'Marken konsequent gebaut' },
    { id: 'k4', tag: 'Social Content', title: 'Multi-Channel Assets', sub: 'Alle Kanäle. Eine Linie.' },
    { id: 'k5', tag: 'E-Commerce', title: 'E-Commerce Design & Content', sub: 'Online-Regal gestaltet wie ein Flagshipstore' },
  ],
  content: [
    { id: 'c1', tag: 'Fotoproduktion', title: 'Inhouse Product Shoot', sub: 'Professionelle Produktbilder' },
    { id: 'c2', tag: 'Video', title: 'Social Reel Production', sub: 'Scroll-stopping content' },
    { id: 'c3', tag: 'Live', title: 'Nexaro Live Studio', sub: 'Live Shopping & Streaming' },
    { id: 'c4', tag: 'How-To', title: 'Instructional Content', sub: 'Produkte erklären. Vertrauen aufbauen.' },
    { id: 'c5', tag: 'Event Doku', title: 'Event-Dokumentation — IFA Berlin', sub: 'Von der Messe direkt in alle Kanäle' },
  ],
  cgi: [
    { id: 'g1', tag: '3D / CGI', title: 'Lucid Motors — EV Stand CGI', sub: 'Architekturgenaue Visualisierung' },
    { id: 'g2', tag: 'Visualization', title: 'Messe Stands & Shops', sub: 'Vor dem Bau schon erlebbar' },
    { id: 'g3', tag: 'AI', title: 'AI-Generierung', sub: 'Konzepte in Minuten' },
    { id: 'g4', tag: 'Motion', title: 'Motion Graphics & 3D Animation', sub: 'Bewegte Markenwelten' },
    { id: 'g5', tag: 'Packaging-Viz', title: 'Packaging zum Leben erwecken — Photorealistic CGI', sub: 'Fotorealistische Produktvisualisierungen für alle Kanäle' },
  ],
};

const TAB_DESC: Record<TabId, string> = {
  konzeption: 'Von der ersten Idee bis zum fertigen Konzept — Kreation die verkauft.',
  content: 'Foto, Video und Live-Produktion — komplett inhouse für alle Kanäle.',
  cgi: 'Fotorealistische 3D-Welten, AI-Konzepte und Motion Graphics in einer Produktion.',
};

const gradient = (hue: number, index: number) =>
  `linear-gradient(${135 + index * 7}deg, oklch(0.24 0.05 ${hue}), oklch(0.13 0.005 118))`;

const FALLBACKS: Record<TabId, string[]> = {
  konzeption: Array.from({ length: 5 }, (_, i) => gradient(115, i)),
  content: Array.from({ length: 5 }, (_, i) => gradient(200, i)),
  cgi: Array.from({ length: 5 }, (_, i) => gradient(280, i)),
};

function isGradient(src: string) {
  return src.startsWith('linear-gradient');
}

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
          {isGradient(src) ? <div className="w-full aspect-[16/10]" style={{ background: src }} /> : <img src={src} alt={item.title} className="max-w-full max-h-[70vh] object-contain" />}
        </div>
        <button onClick={() => setIndex(value => (value + 1) % items.length)} className="absolute right-4 w-12 h-12 border border-white/[0.12] text-white/60 hover:bg-primary-500 hover:text-foreground-950 flex items-center justify-center" aria-label="Nächstes Bild"><i className="ri-arrow-right-line text-lg" /></button>
      </div>
      <div className="px-6 md:px-8 py-5 border-t border-white/[0.07] flex items-center justify-between gap-6">
        <div><h3 className="text-xl font-black uppercase text-white mb-1">{item.title}</h3><p className="text-xs text-white/40">{item.sub}</p></div>
        <div className="hidden sm:flex gap-1">
          {items.map((entry, i) => <button key={entry.id} onClick={() => setIndex(i)} className="relative overflow-hidden" style={{ width: 52, height: 36, opacity: i === index ? 1 : 0.4, border: i === index ? '1px solid oklch(0.81 0.19 115)' : '1px solid transparent' }}>{isGradient(images[i]) ? <div className="w-full h-full" style={{ background: images[i] }} /> : <img src={images[i]} alt="" className="w-full h-full object-cover" />}</button>)}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ShowcaseCard({ item, src, span, onOpen, titleSize }: { item: Item; src: string; span: string; onOpen: () => void; titleSize: string }) {
  return (
    <button type="button" onClick={onOpen} className="relative overflow-hidden text-left cursor-pointer group" style={{ gridColumn: span, minHeight: '300px' }}>
      {isGradient(src) ? <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]" style={{ background: src }} /> : <img src={src} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-transparent" />
      <span className="absolute top-3 left-3 bg-primary-500 text-foreground-950 text-[9px] font-black uppercase tracking-[0.06em] px-2.5 py-1">{item.tag}</span>
      <div className="absolute top-3 right-3 w-[34px] h-[34px] flex items-center justify-center bg-white/12 border border-white/25 text-white backdrop-blur-sm"><i className="ri-zoom-in-line text-sm" /></div>
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6"><h3 className="font-black text-white leading-tight uppercase" style={{ fontSize: titleSize }}>{item.title}</h3><p className="text-xs text-white/60 mt-1">{item.sub}</p></div>
    </button>
  );
}

export default function KreationShowcaseReference() {
  const [activeTab, setActiveTab] = useState<TabId>('konzeption');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Primary fallback images (all tabs)
  const { images: primaryImages } = useMediaStore('leistungen_kreation_showcase_images');
  // Per-tab secondary sets — override primary when uploaded via dashboard
  const { images: secKonz } = useMediaStore('leistungen_kreation_showcase_secondary_konzeption');
  const { images: secContent } = useMediaStore('leistungen_kreation_showcase_secondary_content');
  const { images: secCgi } = useMediaStore('leistungen_kreation_showcase_secondary_cgi');
  const { images: beforeAfter } = useMediaStore('leistungen_kreation_before_after');

  const tabSecondary: Record<TabId, typeof primaryImages> = { konzeption: secKonz, content: secContent, cgi: secCgi };

  const items = ITEMS[activeTab];
  const images = useMemo(() => {
    const sec = tabSecondary[activeTab];
    return items.map((_, i) => {
      const tabImg = sec[i]?.url ? resolveImageUrl(sec[i].url) : null;
      const primaryImg = primaryImages[i]?.url ? resolveImageUrl(primaryImages[i].url) : null;
      return tabImg ?? primaryImg ?? FALLBACKS[activeTab][i];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, primaryImages, secKonz, secContent, secCgi, items]);
  const reality = beforeAfter[0]?.url ? resolveImageUrl(beforeAfter[0].url) : gradient(30, 0);
  const cgi = beforeAfter[1]?.url ? resolveImageUrl(beforeAfter[1].url) : gradient(280, 1);

  return (
    <section id="konzept" className="sonic-section-lg relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-10 md:mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-600">Showcase</span></div>
              <h2 className="leist-h2 text-foreground-950 uppercase">Unsere Arbeit.<br /><span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>Deine Wirkung.</span></h2>
              <p className="text-sm max-w-sm leading-relaxed text-foreground-950/45 mt-3">{TAB_DESC[activeTab]}</p>
            </div>
            <div>
              <div className="flex border border-foreground-950/[0.12] bg-white">
                {TABS.map(tab => <button key={tab.id} type="button" onClick={() => { setActiveTab(tab.id); setLightboxIndex(null); }} className={`flex items-center gap-2 px-4 md:px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] border-r last:border-r-0 border-foreground-950/10 ${activeTab === tab.id ? 'bg-foreground-950 text-primary-500' : 'text-foreground-950/40'}`}><i className={tab.icon} /><span className="hidden sm:inline">{tab.label}</span></button>)}
              </div>
              <div className="flex justify-end gap-1 mt-2">{TABS.map(tab => <div key={tab.id} className={activeTab === tab.id ? 'w-7 bg-primary-500' : 'w-2 bg-foreground-950/15'} style={{ height: 2 }} />)}</div>
            </div>
          </div>
        </div>

        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(2, 300px)' }}>
          <ShowcaseCard item={items[0]} src={images[0]} span="span 6" onOpen={() => setLightboxIndex(0)} titleSize="30px" />
          <ShowcaseCard item={items[1]} src={images[1]} span="span 6" onOpen={() => setLightboxIndex(1)} titleSize="17px" />
          <ShowcaseCard item={items[2]} src={images[2]} span="span 3" onOpen={() => setLightboxIndex(2)} titleSize="14px" />
          <ShowcaseCard item={items[3]} src={images[3]} span="span 3" onOpen={() => setLightboxIndex(3)} titleSize="14px" />
        </div>
        <ShowcaseCard item={items[4]} src={images[4]} span="span 12" onOpen={() => setLightboxIndex(4)} titleSize="22px" />

        <div className="mt-1 grid grid-cols-5 gap-1">
          {items.map((item, i) => <button key={item.id} type="button" onClick={() => setLightboxIndex(i)} className="relative overflow-hidden" style={{ height: 64, opacity: lightboxIndex === i ? 1 : 0.65, border: lightboxIndex === i ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent' }}>{isGradient(images[i]) ? <div className="absolute inset-0" style={{ background: images[i] }} /> : <img src={images[i]} alt={item.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />}</button>)}
        </div>

        {activeTab === 'cgi' && (
          <div className="mt-1">
            <div className="flex items-start justify-between gap-4 px-8 py-7 bg-foreground-950/5 border border-foreground-950/[0.08]">
              <div><p className="text-[9px] font-black uppercase tracking-[0.15em] text-primary-600 mb-2">CGI → Reality Vergleich</p><h3 className="leist-h2 text-foreground-950 uppercase mb-1">CGI-Render vs. gebauter Stand</h3><p className="text-xs text-foreground-950/40">Ziehe den Regler — Philips @ IFA Berlin</p></div>
              <a href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch`} className="flex-shrink-0 px-5 py-2.5 border border-foreground-950/[0.12] text-xs font-black uppercase tracking-widest text-foreground-950/40 hover:bg-primary-500 hover:text-foreground-950">Portfolio anfragen <i className="ri-arrow-right-line" /></a>
            </div>
            <div className="relative h-[340px] overflow-hidden">
              {isGradient(reality) ? <div className="absolute inset-0" style={{ background: reality }} /> : <img src={reality} alt="Gebauter Stand" className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-black/20" />
              <span className="absolute top-4 right-4 px-3 py-1.5 bg-white/15 border border-white/30 text-[9px] font-black uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">Gebauter Stand</span>
              <div className="absolute inset-0" style={{ clipPath: 'inset(0 45% 0 0)' }}>{isGradient(cgi) ? <div className="w-full h-full" style={{ background: cgi }} /> : <img src={cgi} alt="CGI Render" className="w-full h-full object-cover" />}<span className="absolute top-4 left-4 px-3 py-1.5 bg-primary-500 text-foreground-950 text-[9px] font-black uppercase tracking-[0.12em]">CGI Render</span></div>
              <div className="absolute top-0 bottom-0 left-[55%] w-0.5 bg-primary-500"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary-500 text-foreground-950 flex items-center justify-center font-black text-sm">↔</div></div>
            </div>
          </div>
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
