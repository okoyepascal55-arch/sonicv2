import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore } from '@/lib/mediaStore';

const SERVICES = [
  {
    id: 'daten-software',
    number: '01',
    category: 'Daten & Software',
    headline: 'Echtzeit-Intelligenz',
    sub: 'Vollständige Datentransparenz — von der ersten Stunde. Kein Blindflug, keine Silos. Entscheide auf Basis echter Zahlen.',
    detail: 'Live-Daten aus 1.350.000+ Einsätzen. GPS-Tracking, Echtzeitreporting, prädiktive Forecasts.',
    cta: 'SRT entdecken',
    ctaLink: '/srt',
    secondaryCta: 'Forecasting ansehen',
    secondaryLink: '/leistungen/forecasting',
    tags: ['SRT', 'Forecasting', 'KPI-Tracking'],
  },
  {
    id: 'personal-staffing',
    number: '02',
    category: 'Personal & Staffing',
    headline: 'Festangestellte Talente',
    sub: 'Über 2.000 geschulte Markenbotschafter. Sofort einsatzbereit, GPS-getrackt, persönlich gecoacht — deutschlandweit.',
    detail: 'Vollzeit-Promoter, nicht Freelancer. Inhouse geschult, markenlos, sofort deploybar.',
    cta: 'Talentepool erkunden',
    ctaLink: '/leistungen/talentpool',
    secondaryCta: 'Staffing ansehen',
    secondaryLink: '/leistungen/staff-as-a-service',
    tags: ['Recruiting', 'Field Force', 'GPS-Check-in'],
  },
  {
    id: 'pos-video',
    number: '03',
    category: 'POS & Live Video',
    headline: 'Sichtbarkeit am POS',
    sub: 'Physische Präsenz trifft digitale Live-Beratung. Vom Regal bis zum QR-Code — nahtlose Customer Experience.',
    detail: '50.000+ Live Video Calls. QR-Code auf Verpackung → sofortige Kaufberatung.',
    cta: 'POS Full Service',
    ctaLink: '/leistungen/pos-full-service',
    secondaryCta: 'Live Video Promotion',
    secondaryLink: '/leistungen/live-video',
    tags: ['POS-Display', 'Shop-in-Shop', 'Live Video'],
  },
  {
    id: 'events-logistik',
    number: '04',
    category: 'Events & Logistik',
    headline: 'Erlebbare Markenpräsenz',
    sub: 'Von der Aktivierungsfläche bis zum Warenlager — aus einer Hand. Roadshows, Messen, Instore-Events, Konfektionierung.',
    detail: 'Eigenlogistik. Kein Subunternehmer. Aufbau, Konfektionierung, Distribution — alles inhouse.',
    cta: 'Events & Messen',
    ctaLink: '/leistungen/events-messen',
    secondaryCta: 'Warehouse & Logistik',
    secondaryLink: '/leistungen/warehouse-logistik',
    tags: ['Roadshows', 'Events', 'Warehouse'],
  },
];

const FALLBACK_WOOD_ICONS: string[] = [
  'https://readdy.ai/api/search-image?query=carved%20wooden%20rising%20bar%20chart%20analytics%20data%20growth%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20bar%20graph%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-servicegrid-data-01&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20team%20people%20group%20talent%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20human%20figures%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-servicegrid-staff-02&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20store%20shop%20retail%20building%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20storefront%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-servicegrid-pos-03&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20calendar%20event%20schedule%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20calendar%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-servicegrid-events-04&orientation=squarish',
];

interface Props {
  sectionRef?: React.RefObject<HTMLElement>;
}

export default function ServiceGrid({ sectionRef }: Props) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const { images: woodIcons } = useMediaStore('leistungen_servicegrid_wood_icons');

  const resolvedWoodIcons = SERVICES.map((_, i) => {
    const item = woodIcons[i];
    return item?.url || FALLBACK_WOOD_ICONS[i];
  });

  const active = SERVICES[activeIndex];

  const handleNav = (link: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(link);
  };

  return (
    <section
      id="service-grid"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-12 md:py-16 px-4 md:px-6 bg-white"
      role="region"
      aria-label="Leistungsspektrum"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="text-xs font-black tracking-[0.3em] uppercase text-primary-500">Leistungsspektrum</span>
            <div className="w-10 h-px bg-primary-500/40" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground-950 leading-[0.95] tracking-tight uppercase">
              VIER KATEGORIEN.<br />EIN <span className="text-primary-500">SYSTEM</span>.
            </h2>
            <p className="text-foreground-500 text-sm leading-relaxed max-w-xs lg:text-right lg:pb-1">
              Jede Leistung einzeln buchbar — oder als integriertes Full-Service-Paket.
            </p>
          </div>
        </div>

        {/* Split screen: main card (3/4) + selector buttons (1/4) */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-5">
          {/* Selector buttons — horizontal scroll on mobile, vertical column on desktop */}
          <div
            className="order-1 lg:order-2 flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0"
            role="tablist"
            aria-label="Leistungskategorien"
          >
            {SERVICES.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(i)}
                  className={`group flex-shrink-0 lg:flex-shrink min-w-[220px] lg:min-w-0 items-center gap-3 px-4 py-3.5 lg:py-4 text-left border cursor-pointer whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'bg-white border-foreground-200 text-foreground-950 hover:border-primary-400'
                  }`}
                >
                  <span
                    className={`text-2xl font-black leading-none ${
                      isActive ? 'text-white/70' : 'text-primary-500'
                    }`}
                    aria-hidden="true"
                  >
                    {s.number}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-xs font-black uppercase tracking-wider leading-tight">
                      {s.category}
                    </span>
                    <span
                      className={`block text-[11px] font-medium leading-tight mt-0.5 ${
                        isActive ? 'text-white/90' : 'text-foreground-500'
                      }`}
                    >
                      {s.headline}
                    </span>
                  </span>
                  <i
                    className={`ri-arrow-right-line text-sm transition-transform duration-200 ${
                      isActive ? 'text-white' : 'text-foreground-300 group-hover:text-primary-500'
                    }`}
                    aria-hidden="true"
                  ></i>
                </button>
              );
            })}
          </div>

          {/* Main card */}
          <article
            key={active.id}
            className="order-2 lg:order-1 relative border border-foreground-200 bg-background-50 overflow-hidden animate-fadeSlideIn"
          >
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] h-full">
              {/* Left lime panel */}
              <div className="bg-primary-500 p-5 md:p-7 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 md:gap-0 md:h-full">
                <span
                  className="text-7xl xl:text-8xl font-black leading-none tracking-tight text-primary-900/25 select-none"
                  aria-hidden="true"
                >
                  {active.number}
                </span>
                <img
                  src={resolvedWoodIcons[activeIndex]}
                  alt={`${active.category} — Holz-Icon`}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover md:mt-auto"
                />
              </div>

              {/* Right content */}
              <div className="p-6 md:p-9 flex flex-col">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-primary-500">
                  {active.category}
                </span>
                <h3 className="text-3xl md:text-4xl xl:text-5xl font-black text-foreground-950 leading-[0.98] tracking-tight uppercase mt-3">
                  {active.headline}
                </h3>
                <p className="text-sm md:text-base text-foreground-600 leading-relaxed max-w-2xl mt-4">
                  {active.sub}
                </p>

                <p className="text-xs font-black text-foreground-900 uppercase tracking-wide flex items-center gap-2 mt-5">
                  <span className="w-1.5 h-1.5 bg-primary-500 flex-shrink-0" aria-hidden="true"></span>
                  {active.detail}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-primary-50 border border-primary-200 text-primary-700 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-auto pt-7">
                  <button
                    type="button"
                    onClick={() => handleNav(active.ctaLink)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
                  >
                    {active.cta}
                    <i className="ri-arrow-right-line"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav(active.secondaryLink)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 text-primary-500 font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
                  >
                    {active.secondaryCta}
                    <i className="ri-arrow-right-up-line text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-6 px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary-50 border border-primary-200">
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 flex items-center justify-center bg-primary-100 border border-primary-300 flex-shrink-0">
              <i className="ri-question-line text-sm text-primary-600"></i>
            </div>
            <div>
              <p className="text-foreground-950 font-black text-sm mb-0.5">Noch Fragen zum Leistungsumfang?</p>
              <p className="text-foreground-500 text-xs">Wir beraten dich persönlich — kostenlos und unverbindlich.</p>
            </div>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespräch%20buchen`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 flex-shrink-0"
          >
            Beratungsgespräch buchen
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
}