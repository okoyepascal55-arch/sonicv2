import { useState, useRef } from 'react';
import { useSEO } from '@/hooks/useSEO';
import LeistungenPageNav from '@/components/feature/LeistungenPageNav';
import LeistungenKontakt from '@/components/feature/LeistungenKontakt';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import WoodenDivider from '@/components/base/WoodenDivider';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import ScrollCardSection from '@/components/feature/ScrollCardSection';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import LimeBadge from '@/components/base/LimeBadge';
import WoodenButton from '@/components/base/WoodenButton';

const NAV_ITEMS = [
  { id: 'herausforderung', label: 'Herausforderung', icon: 'ri-alert-line' },
  { id: 'loesung', label: 'Lösung', icon: 'ri-lightbulb-line' },
  { id: 'beispiele', label: 'Beispiele', icon: 'ri-image-line' },
  { id: 'full-service', label: 'Full Service', icon: 'ri-shield-check-line' },
  { id: 'kontakt', label: 'Kontakt', icon: 'ri-calendar-line' },
];


const SOLUTIONS = [
  { icon: 'ri-inbox-archive-line', num: '01', accent: 'Einlagerung & QS', title: 'Wareneingang & Qualitätskontrolle', desc: 'Bei Anlieferung: Qualitäts- und Mengenkontrolle, Einlagerung und Erfassung in unserer Lagersoftware.' },
  { icon: 'ri-archive-line', num: '02', accent: 'Lager & Bestand', title: 'Lagermanagement & Verwaltung', desc: 'POS-Werbemittel, Möbel, Pressemuster, Leihgeräte, Technik, Messestände: Alles sauber und sicher eingelagert, jederzeit abrufbar.' },
  { icon: 'ri-send-plane-line', num: '03', accent: 'Versand EU', title: 'Kommissionierung & Versand', desc: 'Abwicklung, Verbuchung, Kommissionierung und Auslieferung. Fristgerecht, europaweit. Mit Versandpartnern und eigenen Fahrern.' },
  { icon: 'ri-shopping-cart-line', num: '04', accent: 'E-Commerce', title: 'Fulfillment & Webshops', desc: 'Online-(Nach-)Bestellungen von Waren, Mustern und POS-Material wickeln wir komplett ab. Mit Schnittstellen zum E-Commerce, Billing, Bestandsführung, Analytics und Forecasts.' },
];

const STATS = [
  { val: '~500 qm', label: 'Lagerfläche' },
  { val: '250', label: 'Paletten-Stellplätze' },
  { val: '>22', label: 'Länder' },
];

const WAREHOUSE_ITEMS = [
  {
    imgIndex: 0,
    title: 'POS-Materialien & Displays',
    tag: 'POS',
    desc: 'Aufsteller, Displays, Regalstopper, Wobbler',
  },
  {
    imgIndex: 1,
    title: 'Messestände & Module',
    tag: 'Messen',
    desc: 'Modulare Standsysteme, Rahmen, Displays',
  },
  {
    imgIndex: 2,
    title: 'Werbemittel & Give-aways',
    tag: 'Merchandise',
    desc: 'Hochwertige Werbeartikel, Streuartikel',
  },
  {
    imgIndex: 3,
    title: 'Möbel & Shop-in-Shop',
    tag: 'Möbel',
    desc: 'Regale, Möbelsysteme, Roadshow-Module',
  },
  {
    imgIndex: 4,
    title: 'Pressemuster & Leihgeräte',
    tag: 'Technik',
    desc: 'Geräte, Muster, Technik-Equipment',
  },
  {
    imgIndex: 5,
    title: 'Fulfillment & Versand',
    tag: 'Logistik',
    desc: 'Kommissionierung, Verpackung, Versand',
  },
];

const FALLBACK_WAREHOUSE = [
  'https://www.sonic-group.de/wp-content/uploads/2023/06/LAGER_OPENER.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/10.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg',
];

const WAREHOUSE_CHALLENGES: ChallengeItem[] = [
  {
    icon: 'ri-eye-off-line',
    title: 'Überblick fehlt',
    desc: 'Wenn POS-, Messe- und Event-Materialien an verschiedenen Standorten gelagert werden, fehlt schnell ein umfassender Überblick.',
    trigger: 'Auch bei euch so?',
  },
  {
    icon: 'ri-truck-line',
    title: 'Logistik schwierig',
    desc: 'Wenn die Materialien fristgerecht ausgeliefert werden müssen, steigt bei der Nutzung verschiedener Standorte der Logistik-Aufwand.',
    trigger: 'Klingt vertraut?',
  },
  {
    icon: 'ri-alert-line',
    title: 'Schäden unsichtbar',
    desc: 'Wenn Materialien wieder ins Lager zurückkommen, müssen sie auf Schäden kontrolliert werden, damit diese nachweislich behoben werden können.',
    trigger: 'Schon passiert?',
  },
];

export default function WarehouseLogistikPage() {
  const tContentHeading = useText('leistungen_warehouse_content', 'warehouse-content-heading', 'Deine Logistik. Unser Warehouse.');
  const tContentSub = useText('leistungen_warehouse_content', 'warehouse-content-sub', 'Full-Service-Logistik mit eigenem Warehouse in Krefeld — für den gesamten DACH-Raum.');
  const tHeroBadge = useText('leistungen_warehouse', 'warehouse-hero-badge', 'Warehouse & Logistik');
  const tHeroH1Line1 = useText('leistungen_warehouse', 'warehouse-hero-heading-line1', 'Ware zur richtigen Zeit');
  const tHeroH1Accent = useText('leistungen_warehouse', 'warehouse-hero-heading-accent', 'am richtigen Ort.');
  const tHeroSubtitle = useText('leistungen_warehouse', 'warehouse-hero-subtitle', 'Phygital? Können wir. Mit 250 eigenen Paletten-Stellplätzen für Assets, Messestände und Ware.');
  const tHeroDesc = useText('leistungen_warehouse', 'warehouse-hero-description', 'Mit Fulfillment-Services und Schnittstellen. Europaweit.');
  const { images: warehouseHeroImages } = useMediaStore('leistungen_warehouse_images');
  const { images: warehouseItemsImages } = useMediaStore('leistungen_warehouse_items_images');
  const { images: fullserviceImages } = useMediaStore('leistungen_warehouse_fullservice_photo');
  const heroImage = warehouseHeroImages[0]?.url
    ? resolveImageUrl(warehouseHeroImages[0].url)
    : 'https://www.sonic-group.de/wp-content/uploads/2023/06/LAGER_OPENER.jpg';

  const warehouseFullservicePhoto = fullserviceImages[0]?.url
    ? resolveImageUrl(fullserviceImages[0].url)
    : 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg';

  const getWarehouseItemImg = (index: number) => {
    const item = warehouseItemsImages[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_WAREHOUSE[index];
  };

  useSEO({
    title: 'Warehouse & Logistik | Sonic Group — POS-Lagerung & Fulfillment DACH',
    description: 'Warehouse & Logistik von Sonic Group: ~500 qm Lagerfläche, 250 Palettenstellplätze, Fulfillment und europaweite Lieferung für POS-Materialien, Messestände und Werbemittel.',
    keywords: 'Warehouse Logistik DACH, POS Material Lagerung, Fulfillment Service, Messestand Lagerung, Werbemittel Logistik',
    canonical: 'https://sonic-group.de/leistungen/warehouse-logistik',
    ogTitle: 'Warehouse & Logistik — Sonic Group DACH',
    ogDescription: '~500 qm Lager, Fulfillment & europaweite Lieferung für POS-Materialien und Messestände.',
  });

  const [activeItem, setActiveItem] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-white">
      <LeistungenPageNav items={NAV_ITEMS} heroRef={heroRef} />

      {/* Hero */}
      <div ref={heroRef}>
        <section className="relative min-h-[480px] md:min-h-[520px] flex flex-col justify-end overflow-hidden bg-black" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
          <img
            src={heroImage}
            alt="Warehouse und Logistik"
            className="absolute inset-0 w-full h-full object-cover object-top"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 100%)' }} />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-primary-500/7 blur-[100px] pointer-events-none z-10" />
          <div className="relative z-20 w-full sonic-container px-4 md:px-8 pb-10 md:pb-14">
            <div className="flex items-center justify-center gap-2 mb-5 md:mb-6 opacity-60">
              <span className="text-white/50 text-xs font-bold">Leistungen</span>
              <i className="ri-arrow-right-s-line text-white/40 text-sm"></i>
              <span className="text-primary-500 text-xs font-bold">Warehouse & Logistik</span>
            </div>
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] px-3.5 py-[7px] mb-5 md:mb-6" style={{ background: 'oklch(var(--primary-500) / 0.18)', border: '1px solid oklch(var(--primary-500) / 0.35)' }}>
            <span className="w-1.5 h-1.5 bg-primary-500" />
            <span className="text-primary-500">{tHeroBadge}</span>
          </div>
            <h1 className="sonic-h1 text-white mb-5 md:mb-6">
              {tHeroH1Line1}<br /><span className="text-primary-500">{tHeroH1Accent}</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-3 md:mb-4 font-semibold">{tHeroSubtitle}</p>
            <p className="text-sm text-white/55 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10">{tHeroDesc}</p>
            <div className="flex flex-wrap items-center gap-6 md:gap-8 mb-8 border-t border-white/15 pt-5">
              {STATS.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl md:text-2xl font-black text-primary-500">{s.val}</div>
                  <div className="text-white/45 text-xs font-bold uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Warehouse%20Logistik%20Beratung`} className="inline-flex items-center gap-2 bg-primary-500 text-white px-7 py-3 font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm" style={{ borderRadius: 0 }}>
              <i className="ri-calendar-line"></i>Termin finden
            </a>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
        </section>
      </div>

      {/* Challenge — shared dark component */}
      <ChallengeSection
        id="herausforderung"
        headline="Kampagnen und Logistik sind oft getrennt."
        subline="Warum es beim Roll-out nicht immer optimal läuft."
        challenges={WAREHOUSE_CHALLENGES}
      />

      <WoodenDivider />

      {/* Solution — light warm bg (directly after dark ChallengeSection), subtle tint matching homepage */}
      <section id="loesung" className="sonic-section-lg px-4 md:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAFDF5 0%, #ffffff 100%)' }}>
        <div className="absolute top-0 right-0 w-full max-w-[500px] h-[500px] bg-primary-500/8 blur-[120px] pointer-events-none" />
        <div className="relative sonic-container">
          <div className="mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-foreground-950/8 border border-foreground-950/15 px-4 py-1.5 mb-5">
              <i className="ri-check-double-line text-foreground-950 text-sm"></i>
              <span className="text-xs font-black text-foreground-950 uppercase tracking-widest">Die Lösung</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950 mb-3">Warehousing und Logistik als<br /><span className="text-primary-500">integraler Baustein.</span></h2>
            <p className="text-foreground-950/50 text-sm md:text-base max-w-2xl">Einlagerung, Bereitstellung, Auslagerung, Anlieferung und Aufbau deiner Produkte, Werbematerialien, Messestände etc. Als Teil des Sonic Gesamtpakts.</p>
          </div>
          <ScrollCardSection data={SOLUTIONS} label={`${SOLUTIONS.length} Leistungen — scrollen`} theme="light" variant="remix" cardMinHeight="320px" showWoodIcon={false} />
        </div>
      </section>

      {/* Was wir lagern */}
      <section id="beispiele" className="sonic-section-lg bg-white px-4 md:px-6">
        <div className="sonic-container">
          <div className="mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 bg-foreground-950/8 border border-foreground-950/12 px-4 py-1.5 mb-5">
              <i className="ri-image-line text-foreground-950 text-sm"></i>
              <span className="text-xs font-black text-foreground-950 uppercase tracking-widest">Was wir lagern</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground-950 leading-tight mb-2 uppercase">
              Alles unter einem Dach.
            </h2>
            <p className="text-foreground-950/50 text-sm md:text-base">Jederzeit abrufbar. Europaweit lieferbar.</p>
          </div>

          {/* Pill tabs */}
          <div className="flex flex-wrap gap-2 mb-0">
            {WAREHOUSE_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveItem(i)}
                className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 font-bold text-xs md:text-sm transition-all whitespace-nowrap cursor-pointer ${
                  activeItem === i
                    ? 'bg-foreground-950 text-primary-500'
                    : 'bg-white hover:bg-white text-foreground-950/60 border border-foreground-950/10'
                }`}
                style={{ borderRadius: 0 }}
              >
                <span>{item.tag}</span>
              </button>
            ))}
          </div>

          {/* Main image panel */}
          <div
            key={activeItem}
            className="grid lg:grid-cols-12 border border-foreground-950/10 border-t-0"
            style={{ animation: 'fadeIn 0.4s ease-out' }}
          >
            <div className="lg:col-span-8 relative overflow-hidden lg:h-[380px] h-[280px]">
              <img
                src={getWarehouseItemImg(activeItem)}
                alt={WAREHOUSE_ITEMS[activeItem].title}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">{WAREHOUSE_ITEMS[activeItem].tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-black text-white mb-1 uppercase">{WAREHOUSE_ITEMS[activeItem].title}</h3>
                <p className="text-white/65 text-sm">{WAREHOUSE_ITEMS[activeItem].desc}</p>
              </div>
            </div>
            <div className="lg:col-span-4 bg-white border-t lg:border-t-0 lg:border-l border-foreground-950/10 p-6 md:p-8 flex flex-col justify-center lg:h-[380px] overflow-y-auto">
              <div className="text-[10px] font-black text-foreground-950/40 uppercase tracking-widest mb-4">Alle Kategorien</div>
              <div className="space-y-2">
                {WAREHOUSE_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveItem(i)}
                    className={`w-full flex items-center gap-3 p-3 text-left transition-all duration-200 cursor-pointer ${activeItem === i ? 'bg-foreground-950 text-white' : 'bg-white text-foreground-950/70 hover:bg-white'}`}
                    style={{ borderRadius: 0, outline: activeItem === i ? 'none' : '1px solid oklch(var(--foreground-200))' }}
                  >
                    {activeItem === i && (
                      <div className="w-4 h-4 flex items-center justify-center bg-primary-500 flex-shrink-0">
                        <i className="ri-check-line text-foreground-950 text-[9px]"></i>
                      </div>
                    )}
                    <span className="text-xs font-bold">{item.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WoodenDivider />

      {/* Full Service */}
      <section id="full-service" className="sonic-section-lg bg-foreground-950 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-full max-w-[500px] h-[500px] bg-primary-500/4 blur-[120px] pointer-events-none" />
        <div className="relative sonic-container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-4 py-1.5 mb-5 md:mb-6">
                <i className="ri-shield-check-line text-primary-500 text-sm"></i>
                <span className="text-xs font-black text-primary-500 uppercase tracking-widest">Full Service</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 md:mb-6 leading-tight uppercase">Darum Warehouse<br /><span className="text-primary-500">bei Sonic.</span></h2>
              <p className="text-white/65 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                Unsere Lager- und Logistikleistungen dienen einem Zweck: Dein Projekt erfolgreich realisieren. POS-Material, Give-aways, Möbel und Equipment werden von uns produziert und unterliegen unserer Qualitätskontrolle. Diese gelingt effizient, wenn wir das Lager direkt nebenan haben.
              </p>
              <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                Für deine Ware, also Muster etc., ist es ebenfalls ideal, wenn wir ein Auge darauf haben. So stellen wir sicher, dass alle physischen Bausteine deines Projekts zur richtigen Zeit an den richtigen Ort gelangen können.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-primary-500/15">
                {STATS.map((s, i) => (
                  <div key={i} className={`p-4 md:p-5 text-center ${i < 2 ? 'border-r border-primary-500/15' : ''}`}>
                    <div className="text-base md:text-xl font-black text-primary-500">{s.val}</div>
                    <div className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={warehouseFullservicePhoto}
                alt="Sonic Warehouse"
                className="w-full object-cover object-top"
                loading="lazy"
                decoding="async"
                style={{ minHeight: '300px' }}
              />
              <div className="absolute top-4 left-4 bg-primary-500 px-3 md:px-4 py-2">
                <span className="text-foreground-950 text-xs font-black uppercase tracking-widest">~500 qm Lagerfläche</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WoodenDivider />

      <div id="kontakt">
        <LeistungenKontakt
          headline="Beratungsgespräch"
          headlineAccent="buchen."
          subline="Wir zeigen dir in 30 Minuten, welchen Mehrwert unser Warehousing- und Logistik-Angebot im Rahmen deiner Gesamtstrategie bietet."
          checkItems={[
            { text: 'Lagerkonzept & Kapazitäten' },
            { text: 'Logistik-Prozesse & Schnittstellen' },
            { text: 'Fulfillment & Webshop-Integration' },
          ]}
          ctaLabel="Termin finden"
          ctaMailSubject="Warehouse Logistik Beratung"
          ctaIcon="ri-calendar-line"
        />
      </div>

      <ScrollToTopButton />

    </div>
  );
}