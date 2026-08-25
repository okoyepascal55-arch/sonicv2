import { useState } from 'react';
import Lightbox, { LightboxItem } from '@/components/base/Lightbox';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const TAB_INFO = [
  {
    id: 'events',
    label: 'Events',
    icon: 'ri-calendar-event-line',
    headline: 'Deine Marke. Unsere Bühne.',
    sub: 'Von der exklusiven Produktpreview bis zum hybriden Kongress.',
    pills: ['Consumer & Corporate Events', 'Händler-Events', 'Kick-Off-Events', 'Kongresse & Tagungen', 'PR-Events', 'Produktlaunches', 'Promotions', 'Roadshows & Festivals'],
    imageIndexes: [0, 1, 2, 3],
  },
  {
    id: 'messen',
    label: 'Messen',
    icon: 'ri-building-4-line',
    headline: 'Messen verbinden Menschen mit Marken.',
    sub: 'Messe-Komplettpakete in allen Größen — von der Idee bis zum Abbau.',
    pills: ['Messebau & Ausstattung', 'Messedesign', 'Messe-Events', 'On- & Offline-Foren'],
    imageIndexes: [4, 5, 6, 7],
  },
  {
    id: 'fahrzeuge',
    label: 'Fahrzeuge & Module',
    icon: 'ri-truck-line',
    headline: 'Deine erfolgreiche Roadshow.',
    sub: 'Von uns gebaute Eventfahrzeuge oder transportierbare Module. Inklusive Ideen, Personal und laufendem Betrieb.',
    pills: ['Eventtrucks', 'Eventcontainer', 'Eventmodule', 'Promotionfahrzeuge'],
    imageIndexes: [8, 9, 10, 11],
  },
];

const FALLBACK_IMAGES = [
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg', title: 'Brand Activation', tag: 'Corporate' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg', title: 'Event-Dokumentation', tag: 'Dokumentation' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg', title: 'Roadshow & Festival', tag: 'Roadshow' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg', title: 'Händler-Event', tag: 'VIP' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg', title: 'Messebau Premium', tag: 'Messebau' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg', title: 'Interaktive Demos', tag: 'Demo' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LUCID01.jpg', title: 'Produktpräsentation', tag: 'CGI' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg', title: 'Messe-Stand Konzept', tag: 'Stand' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/06/LAGER_OPENER.jpg', title: 'Logistik & Aufbau', tag: 'Logistik' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg', title: 'Eventcontainer', tag: 'Container' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg', title: 'Sonic Campus Aerial', tag: 'Campus' },
  { img: 'https://www.sonic-group.de/wp-content/uploads/2023/01/5.jpg', title: 'Promotionfahrzeug', tag: 'Promo' },
];

const FALLBACK_TAG = ['Corporate', 'Dokumentation', 'Roadshow', 'VIP', 'Messebau', 'Demo', 'CGI', 'Stand', 'Logistik', 'Container', 'Campus', 'Promo'];
const FALLBACK_TITLE = ['Brand Activation', 'Event-Dokumentation', 'Roadshow & Festival', 'Händler-Event', 'Messebau Premium', 'Interaktive Demos', 'Produktpräsentation', 'Messe-Stand Konzept', 'Logistik & Aufbau', 'Eventcontainer', 'Sonic Campus Aerial', 'Promotionfahrzeug'];

function resolveTabs(dashboardImages: { url: string; caption: string }[]) {
  return TAB_INFO.map((tab) => ({
    ...tab,
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

  const TABS = resolveTabs(showcaseImages);
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

  return (
    <section id="events" className="sonic-section-lg bg-background-100 px-6">
      <div className="sonic-container">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Formate</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground-950 leading-tight mb-2 uppercase">
            Deine Marke.{' '}
            <span
              style={{
                background: 'oklch(var(--primary-500) / 0.9)',
                padding: '0.02em 0.16em',
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
              }}
            >
              Unsere Bühne.
            </span>
          </h2>
          <p className="text-foreground-950/50 text-base">Wähle ein Format und entdecke unsere Arbeit.</p>
        </div>

        {/* Pill tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => handleTabChange(i)}
              className={`flex items-center gap-2 px-5 py-2.5 font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === i
                  ? 'bg-white text-primary-500'
                  : 'bg-white/60 hover:bg-white text-foreground-600'
              }`}
              style={{
                borderRadius: 0,
                border: activeTab === i ? '1px solid oklch(var(--primary-500))' : '1px solid rgba(0,0,0,0.12)',
              }}
            >
              <i className={`${t.icon} text-base`}></i>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Main showcase */}
        <div
          key={activeTab}
          className="grid lg:grid-cols-12 border border-foreground-950/10"
          style={{ animation: 'fadeSlideIn 0.4s ease-out' }}
        >
          {/* Large main image — clickable for lightbox */}
          <div
            className="lg:col-span-8 relative overflow-hidden group cursor-pointer lg:h-[500px] h-[220px]"
            onClick={() => openLightbox(activeImg)}
            aria-label="Bild im Vollbild öffnen"
          >
            <img
              key={activeImg}
              src={tab.images[activeImg].img}
              alt={tab.images[activeImg].title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              style={{ animation: 'fadeIn 0.35s ease-out' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">{tab.images[activeImg].tag}</span>
            </div>
            {/* Zoom hint */}
            <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="ri-zoom-in-line text-white text-base"></i>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-black text-white mb-1 uppercase">{tab.images[activeImg].title}</h3>
              <p className="text-white/60 text-sm">{tab.headline}</p>
            </div>
            {/* Thumbnail strip at bottom */}
            <div className="absolute bottom-0 right-0 flex gap-1 p-3" onClick={(e) => e.stopPropagation()}>
              {tab.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-14 h-10 overflow-hidden cursor-pointer transition-all duration-300 flex-shrink-0 ${activeImg === i ? 'ring-2 ring-[#C8D400]' : 'opacity-50 hover:opacity-80'}`}
                >
                  <img src={img.img} alt={img.title} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          {/* Right info panel */}
          <div className="lg:col-span-4 bg-white border-l border-foreground-950/10 flex flex-col lg:h-[500px] overflow-y-auto">
            {/* Headline block */}
            <div className="bg-foreground-950 p-6">
              <div className="flex items-center gap-2 mb-3">
                <i className={`${tab.icon} text-primary-500 text-lg`}></i>
                <span className="text-primary-500 text-xs font-black uppercase tracking-widest">{tab.label}</span>
              </div>
              <h3 className="text-base font-black text-white mb-2 uppercase">{tab.headline}</h3>
              <p className="text-white/55 text-xs leading-relaxed">{tab.sub}</p>
            </div>

            {/* Category pills */}
            <div className="p-6 flex-1">
              <div className="text-[10px] font-black text-foreground-950/40 uppercase tracking-widest mb-4">Kategorien</div>
              <div className="flex flex-wrap gap-2 mb-6">
                {tab.pills.map((pill, i) => (
                  <span
                    key={i}
                    className="bg-white border border-foreground-950/10 text-foreground-950/70 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* Image nav grid — each thumbnail opens lightbox */}
              <div className="text-[10px] font-black text-foreground-950/40 uppercase tracking-widest mb-3">Beispiele</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tab.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImg(i); openLightbox(i); }}
                    className={`relative overflow-hidden cursor-pointer transition-all duration-300 group ${activeImg === i ? 'ring-2 ring-[#C8D400]' : 'opacity-55 hover:opacity-85'}`}
                    style={{ minHeight: '60px' }}
                    aria-label={`${img.title} im Vollbild öffnen`}
                  >
                    <img src={img.img} alt={img.title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async" style={{ minHeight: '60px' }} />
                    <div className="absolute inset-0 bg-black/25" />
                    {/* Zoom hint on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <i className="ri-zoom-in-line text-white text-lg drop-shadow-lg"></i>
                    </div>
                    <div className="absolute bottom-1 left-1.5">
                      <span className="text-white text-[9px] font-black">{img.tag}</span>
                    </div>
                    {activeImg === i && (
                      <div className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center bg-primary-500">
                        <i className="ri-check-line text-foreground-950 text-[9px]"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 border-t border-foreground-950/10">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Events%20Messen%20Beratung`}
                className="flex items-center justify-center gap-2 bg-foreground-950 text-white px-5 py-3.5 font-black text-xs uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer w-full"
                style={{ borderRadius: 0 }}
              >
                <i className="ri-calendar-line"></i>
                Beratung buchen
              </a>
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
