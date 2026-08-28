import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore } from '@/lib/mediaStore';
import WoodenButton from '@/components/base/WoodenButton';

const SERVICES = [
  {
    id: 'daten-software',
    number: '01',
    category: 'Daten & Software',
    headline: 'Echtzeit-Intelligenz',
    sub: 'Vollständige Datentransparenz — von der ersten Stunde. Kein Blindflug, keine Silos. Entscheide auf Basis echter Zahlen.',
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
    cta: 'Events & Messen',
    ctaLink: '/leistungen/events-messen',
    secondaryCta: 'Warehouse & Logistik',
    secondaryLink: '/leistungen/warehouse-logistik',
    tags: ['Roadshows', 'Events', 'Warehouse'],
  },
];

const FALLBACK_IMAGES: string[] = [
  'https://readdy.ai/api/search-image?query=Modern%20data%20analytics%20command%20center%20with%20multiple%20large%20monitors%20displaying%20glowing%20real-time%20performance%20dashboards%20charts%20and%20KPI%20metrics%20in%20bright%20lime%20green%20and%20clean%20white%20on%20deep%20charcoal%20black%20background%2C%20futuristic%20technology%20control%20room%20aesthetic%2C%20cinematic%20editorial%20photography%2C%20subtle%20green%20ambient%20glow%2C%20high%20contrast%20moody%20atmosphere%2C%20professional%20corporate%20technology%20scene%2C%20sharp%20detail%2C%20wide%20composition&width=1200&height=800&seq=servicegrid-pictorial-01&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Diverse%20team%20of%20professional%20retail%20brand%20ambassadors%20and%20sales%20promoters%20standing%20confidently%20together%20in%20a%20modern%20industrial%20studio%20space%2C%20wearing%20smart%20casual%20clothing%2C%20dramatic%20editorial%20lighting%20with%20deep%20charcoal%20background%20and%20subtle%20bright%20lime%20green%20accent%20rim%20light%2C%20cinematic%20corporate%20team%20photography%2C%20authentic%20confident%20expressions%2C%20professional%20portrait%20composition%2C%20high%20detail&width=1200&height=800&seq=servicegrid-pictorial-02&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Premium%20consumer%20electronics%20product%20elegantly%20displayed%20on%20sleek%20modern%20retail%20shelving%20at%20point%20of%20sale%2C%20bright%20lime%20green%20accent%20lighting%20illuminating%20the%20product%20against%20dark%20charcoal%20store%20interior%2C%20editorial%20commercial%20photography%2C%20cinematic%20depth%20of%20field%2C%20clean%20minimal%20composition%2C%20high%20contrast%20product%20display%2C%20professional%20retail%20merchandising%20environment%2C%20sharp%20detail&width=1200&height=800&seq=servicegrid-pictorial-03&orientation=landscape',
  'https://readdy.ai/api/search-image?query=Large%20scale%20trade%20show%20exhibition%20event%20hall%20with%20branded%20booth%20and%20crowd%20of%20engaged%20visitors%2C%20dramatic%20dark%20atmosphere%20with%20bright%20lime%20green%20accent%20lighting%20and%20spotlights%2C%20cinematic%20editorial%20event%20photography%2C%20wide%20angle%20corporate%20marketing%20scene%2C%20deep%20charcoal%20tones%2C%20energetic%20yet%20professional%20atmosphere%2C%20high%20detail%2C%20immersive%20composition&width=1200&height=800&seq=servicegrid-pictorial-04&orientation=landscape',
];

interface Props {
  sectionRef?: React.RefObject<HTMLElement>;
}

export default function ServiceGrid({ sectionRef }: Props) {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const { images: gridImages } = useMediaStore('leistungen_servicegrid_images');

  const resolvedImages = SERVICES.map((_, i) => gridImages[i]?.url || FALLBACK_IMAGES[i]);

  const s = SERVICES[active];

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
      <div className="sonic-container">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Leistungsspektrum</span>
          </div>
            <div className="w-10 h-px bg-primary-500/40" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="leist-h2 text-foreground-950 uppercase">
              VIER KATEGORIEN.<br />EIN <span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>SYSTEM</span>.
            </h2>
            <p className="text-foreground-500 text-sm leading-relaxed max-w-xs lg:text-right lg:pb-1">
              Jede Leistung einzeln buchbar — oder als integriertes Full-Service-Paket.
            </p>
          </div>
        </div>

        {/* Tab row — continuous hairline frame joining into content below (no gap, no border-bottom) */}
        <div
          className="flex flex-wrap overflow-hidden"
          style={{ border: '1px solid oklch(0.885 0.004 110)', borderBottom: 'none' }}
          role="tablist"
          aria-label="Leistungskategorien"
        >
          {SERVICES.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className="whitespace-nowrap inline-flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-wide transition-all duration-200 cursor-pointer px-4 md:px-6 py-3.5"
                style={{
                  background: isActive ? 'oklch(0.16 0.006 118)' : '#fff',
                  color: isActive ? 'oklch(0.81 0.19 115)' : 'oklch(0.42 0.006 260)',
                  borderRight: i < 3 ? '1px solid oklch(0.885 0.004 110)' : undefined,
                }}
              >
                <span className="tabular-nums" style={{ color: isActive ? 'oklch(0.81 0.19 115)' : 'oklch(0.55 0.08 115)' }}>
                  {item.number}
                </span>
                {item.category}
              </button>
            );
          })}
        </div>

        {/* Image + caption — one continuous border joining the tab row above */}
        <div style={{ border: '1px solid oklch(0.885 0.004 110)', borderTop: 'none' }}>
        <div className="relative overflow-hidden bg-foreground-950">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/10] md:min-h-[520px] xl:min-h-[560px]">
            <img
              key={s.id}
              src={resolvedImages[active]}
              alt={`${s.category} — ${s.headline}`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span className="absolute top-4 left-5 px-3 py-1 bg-primary-500 text-foreground-950 text-xs font-black tracking-widest">
              {s.number}
            </span>
          </div>
        </div>

        {/* Bottom caption bar — attached to the image */}
        <div className="bg-foreground-950 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 md:gap-6 px-5 md:px-8 py-6 md:py-8">
            <div className="min-w-0">
              <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.18em] text-primary-500 mb-2">
                {s.category}
              </p>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black leading-tight mb-2">
                {s.headline}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed max-w-2xl">
                {s.sub}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-white/10 border border-white/20 text-white/90 whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleNav(s.ctaLink)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary-500 text-foreground-950 font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-950"
              >
                {s.cta}
                <i className="ri-arrow-right-line"></i>
              </button>
              <button
                type="button"
                onClick={() => handleNav(s.secondaryLink)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-primary-500 font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:text-white border border-white/15 hover:border-primary-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-950"
              >
                {s.secondaryCta}
                <i className="ri-arrow-right-up-line text-sm"></i>
              </button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-1.5 px-5 md:px-8 pb-5">
            {SERVICES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={item.category}
                className="h-1 cursor-pointer transition-all duration-300"
                style={{
                  width: i === active ? 32 : 12,
                  background: i === active ? 'oklch(var(--primary-500))' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
            <span className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 tabular-nums">
              {String(active + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        </div>{/* end continuous-border frame */}

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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-foreground-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 flex-shrink-0"
          >
            Beratungsgespräch buchen
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
}