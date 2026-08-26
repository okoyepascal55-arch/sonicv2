import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lightbox, { LightboxItem } from '@/components/base/Lightbox';
import { useMediaStore } from '@/lib/mediaStore';

function hideBrokenImg(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = 'none';
}

const services = [
  {
    title: 'Menschen für Events & Messen',
    lead: 'Dediziert geschultes Personal für bestimmte Funktionen – Moderation, Musik, Catering, Logistik und Aufbau.',
    description: 'Wir präsentieren deine Marke da, wo deine Zielgruppe ist: Events, Messen, Roadshows und hybride Formate. Von Konzept über Personal bis Logistik — alles aus einer Hand.',
    tagline: 'Vor Ort. Auf Tour. Mit Wirkung.',
    fallbackIcon: 'ri-calendar-event-line',
    images: [
      '/images/home/1. Menschen für Events & Messen/0af37f3a-0e8d-46be-a8f4-b658aadaa087.webp',
      '/images/home/1. Menschen für Events & Messen/1 3.webp',
      '/images/home/1. Menschen für Events & Messen/11.webp',
      '/images/home/1. Menschen für Events & Messen/112cbc0e-6f7b-4781-b7f5-7b761e5cf4f9.webp',
      '/images/home/1. Menschen für Events & Messen/3.webp',
      '/images/home/1. Menschen für Events & Messen/5.webp',
      '/images/home/1. Menschen für Events & Messen/9 2.webp',
      '/images/home/1. Menschen für Events & Messen/DSC03338.webp',
      '/images/home/1. Menschen für Events & Messen/DSC05692.webp',
      '/images/home/1. Menschen für Events & Messen/DSC05702.webp',
      '/images/home/1. Menschen für Events & Messen/DSC06282.webp',
      '/images/home/1. Menschen für Events & Messen/IMG-20240819-WA0024.webp',
      '/images/home/1. Menschen für Events & Messen/IMG_20240514_160623.webp',
      '/images/home/1. Menschen für Events & Messen/PHOTO-2025-08-18-12-56-28 5.webp',
    ],
    link: '/leistungen/events-messen',
  },
  {
    title: 'Menschen für Content',
    lead: 'Ausdrucksstarkes Personal mit Fokus auf Content Produktion.',
    description: 'Videocontent und Live-Video-Kanäle mit unseren Markenbotschaftern — für Produktberatung, Sales und Service-Support. QR-Code auf der Verpackung, Widget im Online-Shop oder Display am POS: Fachberatung auf Knopfdruck.',
    tagline: 'Von Social Content bis Livestreams und Produktvideos — Content mit Retail-DNA.',
    fallbackIcon: 'ri-movie-line',
    images: [
      '/images/home/2. Menschen für Content/3. Bild Kopie.webp',
      '/images/home/2. Menschen für Content/OPPOX5Pro_unboxing.webp',
    ],
    link: '/leistungen/kreation-content',
  },
  {
    title: 'Menschen für Schulungen',
    lead: 'Für Marken-, Produkt- und Verkaufs-Training.',
    description: 'Menschen, die Marken erklären. Trainings, die Wissen direkt in Performance verwandeln — offline, hybrid oder online. Mit Personal und Technik aus einem System.',
    tagline: 'Strategisch geplant. Praxisnah umgesetzt.',
    fallbackIcon: 'ri-graduation-cap-line',
    images: [
      '/images/home/3. Menschen für Schulungen/16.webp',
      '/images/home/3. Menschen für Schulungen/2 Kopie.webp',
      '/images/home/3. Menschen für Schulungen/9.webp',
      '/images/home/3. Menschen für Schulungen/90e6ddd9-41dc-4e89-8261-36862f9b8c44.webp',
      '/images/home/3. Menschen für Schulungen/DSC02558.webp',
      '/images/home/3. Menschen für Schulungen/DSC02562.webp',
      '/images/home/3. Menschen für Schulungen/DSC03292.webp',
      '/images/home/3. Menschen für Schulungen/DSC05168.webp',
      '/images/home/3. Menschen für Schulungen/DSC05219.webp',
      '/images/home/3. Menschen für Schulungen/DSC05230 2.webp',
      '/images/home/3. Menschen für Schulungen/DSC05265.webp',
      '/images/home/3. Menschen für Schulungen/DSC05990.webp',
      '/images/home/3. Menschen für Schulungen/DSC06029.webp',
      '/images/home/3. Menschen für Schulungen/DSC06083.webp',
    ],
    link: '/losungen',
  },
  {
    title: 'Menschen für den Point of Sale',
    lead: 'Geschultes Personal mit Augenmerk auf Marken- und / oder Produkt-Inszenierung.',
    description: 'End-to-End-Partner für den Point of Sale: Design, Displays, Möbel, Collateral, Give-aways, Logistik und Montage. Wir gestalten und bestücken deine Fläche — datenbasiert geplant, live reportet und messbar erfolgreich.',
    tagline: 'Über 20.000 Stores. Über 1.300.000 Einsätze/Aufgaben. Über 2 Milliarden Umsatz €.',
    fallbackIcon: 'ri-store-2-line',
    images: [
      'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg',
      'https://www.sonic-group.de/wp-content/uploads/2023/06/10.jpg',
      'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg',
    ],
    link: '/leistungen/pos-full-service',
  },
  {
    title: 'Menschen für unsere Studios',
    lead: 'All In One: Regisseur, Moderator, Verkäufer.',
    description: 'Erlebbar werden: Produktberatung, Sales und Service-Support direkt aus unseren Studio-Setups. Für Livestreams, Video-Commerce, digitale Beratung und Content-Produktion.',
    tagline: 'Wir richten uns nach den Usern — kanalübergreifend, skalierbar und immer nah an der echten Customer Journey.',
    fallbackIcon: 'ri-camera-line',
    images: [
      '/images/home/4. Menschen für unsere Studios/1.webp',
      '/images/home/4. Menschen für unsere Studios/15.webp',
      '/images/home/4. Menschen für unsere Studios/1920x920.webp',
      '/images/home/4. Menschen für unsere Studios/DSC02106 Kopie.webp',
      '/images/home/4. Menschen für unsere Studios/DSC02133 Kopie.webp',
      '/images/home/4. Menschen für unsere Studios/DSC02198.webp',
      '/images/home/4. Menschen für unsere Studios/DSC03026.webp',
      '/images/home/4. Menschen für unsere Studios/DSC03039.webp',
      '/images/home/4. Menschen für unsere Studios/DSC05404.webp',
      '/images/home/4. Menschen für unsere Studios/IMG_0727.webp',
    ],
    link: '/leistungen/video',
  },
];

export default function ServicesGrid() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { images: homeEvents }    = useMediaStore('/images/home/1. Menschen für Events & Messen');
  const { images: homeContent }   = useMediaStore('/images/home/2. Menschen für Content');
  const { images: homeSchulungen }= useMediaStore('/images/home/3. Menschen für Schulungen');
  const { images: homePos }       = useMediaStore('home_pos');
  const { images: homeStudios }   = useMediaStore('/images/home/4. Menschen für unsere Studios');

  const getSectionImagesMap = (idx: number) => {
    switch (idx) {
      case 0: return homeEvents;
      case 1: return homeContent;
      case 2: return homeSchulungen;
      case 3: return homePos;
      case 4: return homeStudios;
      default: return [];
    }
  };

  const currentMediaItems = getSectionImagesMap(selectedIndex);
  const currentImages = currentMediaItems.map(item => item.url);
  const imageCount = currentImages.length || 1;

  const startRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setImageIndex((prev) => (prev + 1) % imageCount);
        setFade(true);
      }, 300);
    }, 3000);
  };

  useEffect(() => {
    setImageIndex(0);
    setFade(true);
    startRotation();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, currentImages.length]);

  const goTo = (idx: number) => {
    setFade(false);
    setTimeout(() => {
      setImageIndex(((idx % imageCount) + imageCount) % imageCount);
      setFade(true);
    }, 200);
    startRotation();
  };

  const handleGetStarted = (link: string) => {
    if (link.startsWith('mailto:')) window.location.href = link;
    else navigate(link);
  };

  const openLightbox = (idx: number) => { setLightboxIndex(idx); setLightboxOpen(true); };

  const lightboxItems: LightboxItem[] = currentImages.map((img, i) => ({
    image: img,
    title: services[selectedIndex].title,
    category: `Impression ${i + 1}`,
    description: services[selectedIndex].description,
  }));

  const svc = services[selectedIndex];

  return (
    <section id="services" className="sonic-section-md px-4 md:px-6 bg-white">
      <div className="sonic-container">

        {/* ── Header — matches VideoShowcase ── */}
        <div className="sonic-section-header" style={{ marginBottom: '2rem' }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>
              Unsere Leistungen
            </span>
          </div>
          <h2 className="sonic-h2 text-foreground-950">
            Manpower trifft{' '}
            <span style={{ background: 'oklch(var(--primary-500) / 0.9)', color: 'oklch(var(--foreground-950))', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
              ROI
            </span>
          </h2>
          <p className="text-sm md:text-base text-foreground-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Die Full-Service-Leistungen von Sonic:{' '}
            <span className="text-primary-600 font-semibold">Vertriebsagentur</span>,{' '}
            <span className="text-primary-600 font-semibold">Personalagentur</span>,{' '}
            <span className="text-primary-600 font-semibold">Performanceagentur</span> und{' '}
            <span className="text-primary-600 font-semibold">Eventagentur</span> in einem.
          </p>
        </div>

        {/* ── Card — same border language as VideoShowcase ── */}
        <div
          className="relative overflow-hidden"
          style={{
            background: '#ffffff',
            border: '1px solid oklch(var(--foreground-950) / 0.1)',
          }}
        >
          {/* ── Selector strip — top of card, 5 equal columns, always fits ── */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(5, 1fr)',
              borderBottom: '1px solid oklch(var(--foreground-950) / 0.1)',
            }}
            role="tablist"
            aria-label="Leistungskategorien"
          >
            {services.map((service, index) => {
              const isActive = selectedIndex === index;
              return (
                <button
                  key={index}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedIndex(index)}
                  className="flex flex-col items-center justify-center gap-1 py-3 px-1 cursor-pointer transition-all duration-200 focus:outline-none"
                  style={{
                    background: isActive ? 'oklch(var(--foreground-950))' : '#fff',
                    borderRight: index < 4 ? '1px solid oklch(var(--foreground-950) / 0.08)' : undefined,
                    borderBottom: isActive ? '2px solid oklch(var(--primary-500))' : '2px solid transparent',
                    minHeight: '52px',
                  }}
                >
                  {/* Number */}
                  <span
                    className="font-black leading-none tabular-nums"
                    style={{
                      fontSize: '14px',
                      letterSpacing: '-0.03em',
                      color: isActive ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-300))',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Short label — hidden on mobile, visible sm+ */}
                  <span
                    className="hidden sm:block text-center leading-none"
                    style={{
                      fontSize: '8px',
                      fontWeight: 900,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: isActive ? 'rgba(255,255,255,0.5)' : 'oklch(var(--foreground-400))',
                    }}
                  >
                    {['Events','Content','Schulungen','POS','Studios'][index]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Image — maxWidth 960 matching VideoShowcase, 16/9 aspect ── */}
          <div className="relative overflow-hidden bg-foreground-950">
            <div className="relative w-full mx-auto" style={{ aspectRatio: '16/9' }}>
              {currentImages.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-white/40">
                  <div className="text-center p-8">
                    <i className="ri-image-line text-4xl mb-2 block" />
                    <p className="text-sm font-bold uppercase tracking-wider">Keine Medien vorhanden</p>
                  </div>
                </div>
              ) : (
                currentImages.map((img, idx) => (
                  <img
                    key={`${selectedIndex}-${idx}`}
                    src={img}
                    alt={`${svc.title} — Impression ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 cursor-pointer"
                    style={{ opacity: imageIndex === idx && fade ? 1 : 0 }}
                    loading={idx === 0 && selectedIndex === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    onClick={() => openLightbox(idx)}
                    onError={hideBrokenImg}
                  />
                ))
              )}

              {/* Bottom gradient — deeper so overlay text reads cleanly */}
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

              {/* "Menschen für..." title burned onto image — key identity text */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 md:px-8 md:pb-5 pointer-events-none">
                <p
                  className="font-black text-white leading-none uppercase tracking-tight"
                  style={{
                    fontSize: 'clamp(18px, 3.5vw, 28px)',
                    letterSpacing: '-0.025em',
                    textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                  }}
                >
                  {svc.title}
                </p>
              </div>

              {/* Prev / Next */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={() => goTo(imageIndex - 1)}
                    className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 text-white hover:bg-primary-500 hover:text-foreground-950 backdrop-blur-sm transition-all duration-200 cursor-pointer"
                    aria-label="Vorheriges Bild"
                  >
                    <i className="ri-arrow-left-line text-lg" />
                  </button>
                  <button
                    onClick={() => goTo(imageIndex + 1)}
                    className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 text-white hover:bg-primary-500 hover:text-foreground-950 backdrop-blur-sm transition-all duration-200 cursor-pointer"
                    aria-label="Nächstes Bild"
                  >
                    <i className="ri-arrow-right-line text-lg" />
                  </button>
                </>
              )}

              {/* Dot indicators */}
              {currentImages.length > 1 && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                  {currentImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      className="w-6 h-6 flex items-center justify-center cursor-pointer"
                      aria-label={`Bild ${idx + 1}`}
                    >
                      <span
                        className={`block transition-all duration-300 ${
                          imageIndex === idx
                            ? 'w-5 h-1.5 bg-primary-400'
                            : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/90'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Caption bar — lighter, matches VideoShowcase micro-bar language ── */}
          <div
            className="px-5 md:px-8 py-5 md:py-6"
            style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.08)' }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: 'oklch(0.55 0.08 115)' }}>
              {svc.lead}
            </p>
            <p className="text-sm text-foreground-600 leading-relaxed mb-5">
              {svc.description}
            </p>
            <button
              onClick={() => handleGetStarted(svc.link)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-black text-xs uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer hover:bg-primary-500 hover:text-foreground-950"
              style={{
                background: 'oklch(var(--foreground-950))',
                color: '#fff',
                minHeight: '44px',
              }}
            >
              Mehr dazu
              <i className="ri-arrow-right-line text-sm" />
            </button>
          </div>

        </div>



      </div>

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
