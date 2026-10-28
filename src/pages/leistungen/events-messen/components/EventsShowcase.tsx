import { useState } from 'react';
import Lightbox, { LightboxItem } from '@/components/base/Lightbox';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import WoodenButton from '@/components/base/WoodenButton';
import { useLeistungenText, splitList } from '@/hooks/useLeistungenText';
import { IMAGE_PLACEHOLDER } from '@/lib/imagePlaceholder';

const TAB_INFO = [
 { id: 'events', key: 'tab1', icon: 'ri-calendar-event-line', imageIndexes: [0, 1, 2, 3] },
 { id: 'messen', key: 'tab2', icon: 'ri-building-4-line', imageIndexes: [4, 5, 6, 7] },
 { id: 'fahrzeuge', key: 'tab3', icon: 'ri-truck-line', imageIndexes: [8, 9, 10, 11] },
];

const FALLBACK_IMAGES = [
 { img: IMAGE_PLACEHOLDER, title: 'Brand Activation', tag: 'Corporate' },
 { img: IMAGE_PLACEHOLDER, title: 'Event-Dokumentation', tag: 'Dokumentation' },
 { img: IMAGE_PLACEHOLDER, title: 'Roadshow & Festival', tag: 'Roadshow' },
 { img: IMAGE_PLACEHOLDER, title: 'Händler-Event', tag: 'VIP' },
 { img: IMAGE_PLACEHOLDER, title: 'Messebau Premium', tag: 'Messebau' },
 { img: IMAGE_PLACEHOLDER, title: 'Interaktive Demos', tag: 'Demo' },
 { img: IMAGE_PLACEHOLDER, title: 'Produktpräsentation', tag: 'CGI' },
 { img: IMAGE_PLACEHOLDER, title: 'Messe-Stand Konzept', tag: 'Stand' },
 { img: IMAGE_PLACEHOLDER, title: 'Logistik & Aufbau', tag: 'Logistik' },
 { img: IMAGE_PLACEHOLDER, title: 'Eventcontainer', tag: 'Container' },
 { img: IMAGE_PLACEHOLDER, title: 'Sonic Campus Aerial', tag: 'Campus' },
 { img: IMAGE_PLACEHOLDER, title: 'Promotionfahrzeug', tag: 'Promo' },
];

const FALLBACK_TAG = ['Corporate', 'Dokumentation', 'Roadshow', 'VIP', 'Messebau', 'Demo', 'CGI', 'Stand', 'Logistik', 'Container', 'Campus', 'Promo'];
const FALLBACK_TITLE = ['Brand Activation', 'Event-Dokumentation', 'Roadshow & Festival', 'Händler-Event', 'Messebau Premium', 'Interaktive Demos', 'Produktpräsentation', 'Messe-Stand Konzept', 'Logistik & Aufbau', 'Eventcontainer', 'Sonic Campus Aerial', 'Promotionfahrzeug'];

function resolveTabs(dashboardImages: { url: string; caption: string }[], t: Record<string, string>) {
 return TAB_INFO.map((tab) => ({
 ...tab,
 label: t[`${tab.key}-label`],
 headline: t[`${tab.key}-headline`],
 sub: t[`${tab.key}-sub`],
 pills: splitList(t[`${tab.key}-pills`]),
 images: tab.imageIndexes.map((idx) => {
 const dashItem = dashboardImages[idx];
 return {
 img: dashItem?.url ? resolveImageUrl(dashItem.url) : FALLBACK_IMAGES[idx].img,
 title: dashItem?.caption || FALLBACK_TITLE[idx],
 tag: FALLBACK_TAG[idx],
 };
 }),
 }));
}

export default function EventsShowcase() {
 const { images: showcaseImages } = useMediaStore('leistungen_events_showcase_images');
 const [activeTab, setActiveTab] = useState(0);
 const [activeImg, setActiveImg] = useState(0);
 const [lightboxOpen, setLightboxOpen] = useState(false);
 const [lightboxIndex, setLightboxIndex] = useState(0);

 const tx = useLeistungenText('leistungen_events_formats');
 const TABS = resolveTabs(showcaseImages, tx);
 const tab = TABS[activeTab];

 const lightboxItems: LightboxItem[] = tab.images.map((item) => ({
 image: item.img,
 title: item.title,
 category: item.tag,
 description: tab.headline,
 }));

 const handleTabChange = (i: number) => {
 setActiveTab(i);
 setActiveImg(0);
 };

 const openLightbox = (idx: number) => {
 setLightboxIndex(idx);
 setLightboxOpen(true);
 };

 const total = tab.images.length;
 const step = (d: number) => setActiveImg((p) => (p + d + total) % total);

 return (
 <section id="events" className="sonic-section-lg bg-white px-4 md:px-6">
 <div className="sonic-container">

 {/* Header — heading left, subline right (same layout as SRT / Leistungen, 28.10.2026) */}
 <div className="mb-10">
 <div className="flex items-center gap-3 mb-5">
 <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
 <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tx.eyebrow}</span>
 </div>
 <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
 <h2 className="sonic-h2 text-foreground-950">{tx.heading}</h2>
 {tx.sub && <p className="text-[15px] md:text-[16px] leading-relaxed max-w-md text-foreground-500">{tx.sub}</p>}
 </div>
 </div>

 {/* One framed card: selector strip → image + dark info panel */}
 <div style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>

 {/* Selector strip — equal columns, active = dark with lime underline (site-wide tab language) */}
 <div className="grid grid-cols-3" style={{ borderBottom: '1px solid oklch(var(--foreground-950) / 0.1)' }} role="tablist" aria-label={tx.eyebrow || 'Formate'}>
 {TABS.map((t, i) => {
 const isActive = activeTab === i;
 return (
 <button
 key={t.id}
 type="button"
 role="tab"
 aria-selected={isActive}
 onClick={() => handleTabChange(i)}
 className="group flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 py-3.5 sm:py-4 px-2 cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
 style={{
 background: isActive ? 'oklch(var(--foreground-950))' : '#fff',
 borderRight: i < TABS.length - 1 ? '1px solid oklch(var(--foreground-950) / 0.08)' : undefined,
 borderBottom: isActive ? '2px solid oklch(var(--primary-500))' : '2px solid transparent',
 }}
 >
 <span className="font-black tabular-nums leading-none text-[13px]" style={{ color: isActive ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-300))' }}>{String(i + 1).padStart(2, '0')}</span>
 <i className={`${t.icon} text-lg leading-none ${isActive ? 'text-primary-500' : 'text-foreground-400 group-hover:text-foreground-950'}`} aria-hidden="true" />
 <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] text-center leading-tight ${isActive ? 'text-white' : 'text-foreground-600 group-hover:text-foreground-950'}`}>{t.label}</span>
 </button>
 );
 })}
 </div>

 <div key={activeTab} className="grid lg:grid-cols-12" style={{ animation: 'fadeSlideIn 0.4s ease-out' }}>

 {/* Main image — click opens lightbox; arrows + counter */}
 <div className="lg:col-span-8 relative overflow-hidden bg-foreground-950 group h-[260px] sm:h-[360px] lg:h-[520px]">
 <button type="button" className="absolute inset-0 w-full h-full cursor-zoom-in" onClick={() => openLightbox(activeImg)} aria-label={`${tab.images[activeImg].title} im Vollbild öffnen`}>
 <img
 key={activeImg}
 src={tab.images[activeImg].img}
 alt={tab.images[activeImg].title}
 className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
 loading="lazy"
 decoding="async"
 style={{ animation: 'fadeIn 0.35s ease-out' }}
 />
 </button>
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent pointer-events-none" />
 <span className="absolute top-4 left-4 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 pointer-events-none">{tab.images[activeImg].tag}</span>
 <span className="absolute top-4 right-4 bg-black/55 backdrop-blur-sm text-white text-[10px] font-black tracking-[0.2em] tabular-nums px-2.5 py-1 pointer-events-none">
 {String(activeImg + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
 </span>
 {total > 1 && (
 <>
 <button type="button" onClick={() => step(-1)} className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/35 text-white hover:bg-primary-500 hover:text-foreground-950 backdrop-blur-sm transition-colors cursor-pointer" aria-label="Vorheriges Bild"><i className="ri-arrow-left-line text-lg" /></button>
 <button type="button" onClick={() => step(1)} className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/35 text-white hover:bg-primary-500 hover:text-foreground-950 backdrop-blur-sm transition-colors cursor-pointer" aria-label="Nächstes Bild"><i className="ri-arrow-right-line text-lg" /></button>
 </>
 )}
 <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 md:px-7 md:pb-6 pointer-events-none">
 <p className="font-black text-white leading-none uppercase tracking-tight mb-2" style={{ fontSize: 'clamp(18px, 3vw, 28px)', letterSpacing: '-0.025em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>{tab.images[activeImg].title}</p>
 <div className="flex items-center gap-1.5">
 {tab.images.map((_, i) => (
 <span key={i} className="h-1 transition-all duration-300" style={{ width: i === activeImg ? 28 : 10, background: i === activeImg ? 'oklch(var(--primary-500))' : 'rgba(255,255,255,0.35)' }} />
 ))}
 </div>
 </div>
 </div>

 {/* Dark info panel */}
 <div className="lg:col-span-4 bg-foreground-950 text-white flex flex-col lg:h-[520px]" style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
 <div className="p-6 md:p-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
 <div className="flex items-center gap-2 mb-3">
 <i className={`${tab.icon} text-primary-500 text-lg`} aria-hidden="true" />
 <span className="text-primary-500 text-[11px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
 </div>
 <h3 className="text-lg md:text-xl font-black text-white leading-tight mb-2">{tab.headline}</h3>
 <p className="text-white/60 text-sm leading-relaxed">{tab.sub}</p>
 </div>

 <div className="p-6 md:p-7 flex-1 flex flex-col gap-6 overflow-y-auto">
 {tab.pills.length > 0 && (
 <div>
 <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">{tx['label-categories']}</div>
 <div className="flex flex-wrap gap-1.5">
 {tab.pills.map((pill, i) => (
 <span key={i} className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 text-white/90 bg-primary-500/[0.12] border border-primary-500/30">{pill}</span>
 ))}
 </div>
 </div>
 )}

 <div className="mt-auto">
 <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">{tx['label-examples']}</div>
 <div className="grid grid-cols-4 gap-2">
 {tab.images.map((img, i) => (
 <button
 key={i}
 type="button"
 onClick={() => setActiveImg(i)}
 onDoubleClick={() => openLightbox(i)}
 className={`relative overflow-hidden cursor-pointer transition-all duration-300 aspect-[4/3] ${activeImg === i ? 'ring-2 ring-primary-500' : 'opacity-50 hover:opacity-90'}`}
 aria-label={img.title}
 aria-pressed={activeImg === i}
 >
 <img src={img.img} alt="" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>

 </div>
 </div>
 </div>

 {/* Lightbox */}
 <Lightbox
 items={lightboxItems}
 activeIndex={lightboxIndex}
 isOpen={lightboxOpen}
 onClose={() => setLightboxOpen(false)}
 onNext={() => setLightboxIndex((prev) => (prev + 1) % lightboxItems.length)}
 onPrev={() => setLightboxIndex((prev) => (prev - 1 + lightboxItems.length) % lightboxItems.length)}
 />

 </section>
 );
}
