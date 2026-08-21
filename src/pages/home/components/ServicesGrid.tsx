import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Lightbox, { LightboxItem } from '@/components/base/Lightbox';
import { useMediaStore } from '@/lib/mediaStore';

/* ── reusable image error helper ── */
function hideBrokenImg(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = 'none';
}

const services = [
  {
    title: 'MENSCHEN FÜR EVENTS & MESSEN',
    lead: 'Dediziert geschultes Personal für bestimmte Funktionen – Moderation, Musik, Catering, Logistik und Aufbau.',
    description: 'Wir präsentieren deine Marke da, wo deine Zielgruppe ist: Events, Messen, Roadshows und hybride Formate. Von Konzept über Personal bis Logistik — alles aus einer Hand.',
    tagline: 'Vor Ort. Auf Tour. Mit Wirkung.',
    icon: 'https://readdy.ai/api/search-image?query=crowd%20silhouettes%20cheering%20at%20live%20event%20stage%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20icon%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-events-stage-crowd-v8&orientation=squarish',
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
    title: 'MENSCHEN FÜR CONTENT',
    lead: 'Ausdrucksstarkes Personal mit Fokus auf Content Produktion.',
    description: 'Videocontent und Live-Video-Kanäle mit unseren Markenbotschaftern — für Produktberatung, Sales und Service-Support. QR-Code auf der Verpackung, Widget im Online-Shop oder Display am POS: Fachberatung auf Knopfdruck.',
    tagline: 'Von Social Content bis Livestreams und Produktvideos — Content mit Retail-DNA.',
    icon: 'https://readdy.ai/api/search-image?query=professional%20film%20clapperboard%20director%20slate%20with%20live%20dot%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20icon%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-clapperboard-live-v8&orientation=squarish',
    fallbackIcon: 'ri-movie-line',
    images: [
      '/images/home/2. Menschen für Content/3. Bild Kopie.webp',
      '/images/home/2. Menschen für Content/OPPOX5Pro_unboxing.webp',
    ],
    link: '/leistungen/kreation-content',
  },
  {
    title: 'MENSCHEN FÜR SCHULUNGEN',
    lead: 'Für Marken-, Produkt- und Verkaufs-Training.',
    description: 'Menschen, die Marken erklären. Trainings, die Wissen direkt in Performance verwandeln — offline, hybrid oder online. Mit Personal und Technik aus einem System.',
    tagline: 'Strategisch geplant. Praxisnah umgesetzt.',
    icon: 'https://readdy.ai/api/search-image?query=open%20book%20with%20rising%20arrow%20growth%20lines%20training%20knowledge%20icon%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20symbol%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-book-arrow-training-v8&orientation=squarish',
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
    title: 'MENSCHEN FÜR DEN POINT OF SALE',
    lead: 'Geschultes Personal mit Augenmerk auf Marken- und / oder Produkt-Inszenierung.',
    description: 'End-to-End-Partner für den Point of Sale: Design, Displays, Möbel, Collateral, Give-aways, Logistik und Montage. Wir gestalten und bestücken deine Fläche — datenbasiert geplant, live reportet und messbar erfolgreich.',
    tagline: 'Über 20.000 Stores. Über 1.300.000 Einsätze/Aufgaben. Über 2 Milliarden Umsatz €.',
    icon: 'https://readdy.ai/api/search-image?query=retail%20display%20shelf%20with%20spotlit%20product%20podium%20and%20brand%20flag%20icon%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20symbol%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-pos-display-shelf-v8&orientation=squarish',
    fallbackIcon: 'ri-store-2-line',
    images: [
      'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg',
      'https://www.sonic-group.de/wp-content/uploads/2023/06/10.jpg',
      'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg',
    ],
    link: '/leistungen/pos-full-service',
  },
  {
    title: 'MENSCHEN FÜR UNSERE STUDIOS',
    lead: 'All In One: Regisseur, Moderator, Verkäufer.',
    description: 'Erlebbar werden: Produktberatung, Sales und Service-Support direkt aus unseren Studio-Setups. Für Livestreams, Video-Commerce, digitale Beratung und Content-Produktion.',
    tagline: 'Wir richten uns nach den Usern — kanalübergreifend, skalierbar und immer nah an der echten Customer Journey.',
    icon: 'https://readdy.ai/api/search-image?query=broadcast%20studio%20camera%20on%20tripod%20with%20recording%20light%20and%20monitor%20screen%20icon%20carved%20in%20high%20relief%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20sculptural%20minimalist%20symbol%20warm%20rich%20brown%20grain%20artisan%20handcrafted%20clean%20white%20background%20top%20view%20studio%20lighting%20product%20photography&width=120&height=120&seq=wood-studio-camera-monitor-v8&orientation=squarish',
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
  const [hoveredPanel, setHoveredPanel] = useState(false);

  // Dynamic media integration
  const { images: homeEvents } = useMediaStore('/images/home/1. Menschen für Events & Messen');
  const { images: homeContent } = useMediaStore('/images/home/2. Menschen für Content');
  const { images: homeSchulungen } = useMediaStore('/images/home/3. Menschen für Schulungen');
  const { images: homePos } = useMediaStore('home_pos');
  const { images: homeStudios } = useMediaStore('/images/home/4. Menschen für unsere Studios');
  const { images: serviceWoodIcons } = useMediaStore('home_services_wood_icons');

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

  const startRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const imageCount = currentImages.length || 1;
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
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedIndex, currentImages.length]);

  const handleDotClick = (idx: number) => {
    setFade(false);
    setTimeout(() => {
      setImageIndex(idx);
      setFade(true);
    }, 200);
    startRotation();
  };

  const handleGetStarted = (link: string) => {
    if (link.startsWith('mailto:')) {
      window.location.href = link;
    } else {
      navigate(link);
    }
  };

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const lightboxItems: LightboxItem[] = currentImages.map((img, i) => ({
    image: img,
    title: services[selectedIndex].title,
    category: `Impression ${i + 1}`,
    description: services[selectedIndex].description,
  }));

  const currentService = services[selectedIndex];

  return (
    <section id="services" className="py-16 md:py-20 px-4 md:px-6 bg-white relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary-500/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-7 md:mb-9 pt-4">
          <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-4 py-1.5 mb-4">
            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black text-primary-500 uppercase tracking-widest">Unsere Leistungen</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-foreground-950 mb-5 leading-tight px-4">
            MANPOWER TRIFFT{' '}
            <span className="text-primary-500 relative inline-block">
              ROI
              <span
                className="absolute inset-0 -z-10 bg-primary-500/20"
                style={{ transform: 'skewX(-9deg) scaleX(1.08)', borderRadius: '2px' }}
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="text-sm md:text-base text-foreground-700 max-w-2xl mx-auto font-semibold px-4">
            Die Full-Service-Leistungen von Sonic: <span className="text-primary-500">Vertriebsagentur</span>, <span className="text-primary-500">Personalagentur</span>, <span className="text-primary-500">Performanceagentur</span> und <span className="text-primary-500">Eventagentur</span> in einem.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-5 md:mb-7 px-2" role="tablist" aria-label="Leistungsbereiche">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              role="tab"
              aria-selected={selectedIndex === index}
              aria-controls={`service-panel-${index}`}
              id={`service-tab-${index}`}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 min-h-[44px] md:min-h-0 transition-all duration-400 cursor-pointer group relative text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                selectedIndex === index
                  ? 'bg-white ring-2 ring-primary-500'
                  : 'bg-white/60 hover:bg-white ring-1 ring-foreground-200 hover:ring-primary-500/50'
              }`}
              style={{
                borderRadius: 0,
                boxShadow: selectedIndex === index
                  ? 'inset 3px 3px 8px rgba(0,0,0,0.08), inset -1px -1px 4px rgba(255,255,255,0.7)'
                  : '3px 3px 8px rgba(0,0,0,0.07), -2px -2px 6px rgba(255,255,255,0.85), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              {selectedIndex === index && (
                <div className="absolute inset-0 bg-primary-500/8 pointer-events-none" style={{ borderRadius: 0 }} aria-hidden="true" />
              )}
              <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 relative z-10 overflow-hidden">
                {/* Fallback behind image */}
                <div className="absolute inset-0 bg-primary-500 flex items-center justify-center z-0">
                  <i className={`${service.fallbackIcon} text-2xs text-foreground-900`}></i>
                </div>
                <img
                  src={serviceWoodIcons[index]?.url || service.icon}
                  alt={service.title}
                  className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 z-10 ${
                    selectedIndex === index ? 'opacity-100 scale-110' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                  }`}
                  style={{
                    filter: selectedIndex === index
                      ? 'drop-shadow(0 2px 4px rgba(200, 212, 0, 0.4))'
                      : 'drop-shadow(0 1px 2px rgba(139, 90, 43, 0.3))',
                  }}
                  onError={hideBrokenImg}
                />
                {/* Fallback icon when image fails */}
                <div className="w-full h-full bg-primary-500 flex items-center justify-center">
                  <i className={`${service.fallbackIcon} text-xs text-foreground-900`}></i>
                </div>
              </div>
              <span className={`text-xs font-black transition-colors duration-300 relative z-10 whitespace-normal sm:whitespace-nowrap tracking-wide ${
                selectedIndex === index ? 'text-primary-500' : 'text-foreground-950 group-hover:text-primary-500'
              }`}>
                {service.title}
              </span>
              {selectedIndex === index && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white ring-2 ring-primary-500 rotate-45 z-0 shadow-sm" aria-hidden="true"></div>
              )}
            </button>
          ))}
        </div>

        {/* Full Image Display Panel */}
        <div
          id={`service-panel-${selectedIndex}`}
          role="tabpanel"
          aria-labelledby={`service-tab-${selectedIndex}`}
          className="relative shadow-2xl overflow-hidden cursor-pointer min-h-[320px] sm:min-h-[480px] md:min-h-[620px]"
          style={{ borderRadius: 0 }}
          onClick={() => openLightbox(imageIndex)}
          onMouseEnter={() => setHoveredPanel(true)}
          onMouseLeave={() => setHoveredPanel(false)}
          aria-label="Bild vergrößern"
        >
          {/* Images with crossfade */}
          <div className="absolute inset-0 w-full h-full bg-foreground-950 flex items-center justify-center">
            {currentImages.length === 0 ? (
              <div className="text-white/40 text-center p-8">
                <i className="ri-image-line text-4xl mb-2 block"></i>
                <p className="text-sm font-bold uppercase tracking-wider">Keine Medien vorhanden</p>
                <p className="text-xs">Fügen Sie im Dashboard Bilder zu dieser Sektion hinzu.</p>
              </div>
            ) : (
              currentImages.map((img, idx) => (
                <img
                  key={`${selectedIndex}-${idx}`}
                  src={img}
                  alt={`${currentService.title} — Impression ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
                  style={{ opacity: imageIndex === idx && fade ? 1 : 0 }}
                  loading={idx === 0 && selectedIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ))
            )}
            {/* Gradient overlay — light touch, image-first */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/18 to-transparent pointer-events-none"></div>
          </div>

          {/* Expand hint — top right, compact pill */}
          <div
            className={`absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm border border-white/20 px-2.5 py-1 transition-opacity duration-300 ${hoveredPanel ? 'opacity-100' : 'opacity-0'}`}
          >
            <i className="ri-zoom-in-line text-white text-xs"></i>
            <span className="text-white text-2xs font-bold">Vollbild</span>
          </div>

          {/* Overlaid Content — compact, image-first */}
          <div
            className="relative z-10 h-full flex flex-col justify-end p-3 md:p-6 min-h-[320px] sm:min-h-[480px] md:min-h-[620px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lead line */}
            <p className="text-primary-500 text-2xs md:text-xs font-bold uppercase tracking-widest mb-1 drop-shadow-lg">
              {currentService.lead}
            </p>

            {/* Title Row */}
            <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-500 flex items-center justify-center">
                  <i className={`${currentService.fallbackIcon} text-base md:text-lg text-foreground-900`}></i>
                </div>
                <img
                  src={currentService.icon}
                  alt={currentService.title}
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 10px rgba(200, 212, 0, 0.55))',
                  }}
                  onError={hideBrokenImg}
                />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white drop-shadow-2xl leading-tight">
                {currentService.title}
              </h3>
            </div>

            {/* Description + Tagline — compact row, truncated on mobile */}
            <p className="text-white/80 leading-snug text-xs md:text-sm max-w-2xl mb-1 drop-shadow-lg hidden sm:block">
              {currentService.description}
            </p>
            <p className="text-white/50 text-2xs md:text-xs italic mb-2 md:mb-3 drop-shadow-lg hidden sm:block">
              {currentService.tagline}
            </p>

            {/* CTA + Dots Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <button
                onClick={() => handleGetStarted(currentService.link)}
                className="inline-flex items-center gap-1.5 md:gap-2 min-h-[44px] bg-primary-500 text-white px-4 md:px-5 py-2 md:py-2.5 font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-xs md:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                style={{ borderRadius: 0 }}
              >
                <span>Mehr dazu</span>
                <i className="ri-arrow-right-line text-sm"></i>
              </button>

              {/* Image Dots */}
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Bild-Navigation">
                {currentImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); handleDotClick(idx); }}
                    role="tab"
                    aria-selected={imageIndex === idx}
                    aria-label={`Bild ${idx + 1} von ${currentService.title}`}
                    className="flex items-center justify-center w-11 h-11 md:w-auto md:h-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span className={`rounded-full transition-all duration-300 ${
                      imageIndex === idx
                        ? 'w-5 h-2 bg-primary-500'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Lightbox trigger */}
              <button
                onClick={(e) => { e.stopPropagation(); openLightbox(imageIndex); }}
                className="ml-auto flex items-center gap-1 text-white/50 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none"
                aria-label="Bild im Vollbild öffnen"
              >
                <i className="ri-fullscreen-line text-sm"></i>
                <span className="text-2xs font-bold hidden sm:inline">Vollbild</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Bridge → SRT Section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20" aria-hidden="true">
        <div className="h-16 bg-gradient-to-b from-transparent via-white/60 to-[#111]"></div>
        <div className="relative h-px bg-foreground-950">
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-px h-[2px] w-32"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, oklch(var(--primary-500)) 40%, oklch(var(--primary-500)) 60%, transparent 100%)',
              boxShadow: '0 0 12px oklch(var(--primary-500) / 0.6)',
            }}
          />
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