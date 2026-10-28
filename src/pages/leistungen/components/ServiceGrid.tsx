import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaStore } from '@/lib/mediaStore';
import WoodenButton from '@/components/base/WoodenButton';
import { useLeistungenText, splitList } from '@/hooks/useLeistungenText';

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
    headline: 'Geschulte Promoter:innen',
    sub: 'Menschen aus unserem Talentpool, ausgewählt nach Profil, Know-how, Erfahrung und Marken-Fit — geschult, persönlich betreut und deutschlandweit im Einsatz.',
    cta: 'Talentpool erkunden',
    ctaLink: '/leistungen/talentpool',
    secondaryCta: 'Staffing ansehen',
    secondaryLink: '/leistungen/staff-as-a-service',
    tags: ['Recruiting', 'Field Force', 'Standort-Check-in'],
  },
  {
    id: 'pos-video',
    number: '03',
    category: 'POS & Live Video',
    headline: 'Sichtbarkeit am POS',
    sub: 'Physische Präsenz trifft digitale Live-Beratung. Vom Regal bis zum QR-Code — nahtlose Customer Experience.',
    cta: 'POS Full Service',
    ctaLink: '/leistungen/pos-full-service',
    secondaryCta: 'Live Video',
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
  const { images: gridImages } = useMediaStore('leistungen_servicegrid_bg');
  const t = useLeistungenText('leistungen_overview_services');
  const services = SERVICES.map((sv, i) => {
    const n = i + 1;
    return {
      ...sv,
      category: t[`s${n}-category`] || sv.category,
      headline: t[`s${n}-headline`] || sv.headline,
      sub: t[`s${n}-sub`] || sv.sub,
      cta: t[`s${n}-cta`] || sv.cta,
      secondaryCta: t[`s${n}-cta2`] || sv.secondaryCta,
      tags: t[`s${n}-tags`] ? splitList(t[`s${n}-tags`]) : sv.tags,
    };
  });

  const resolvedImages = SERVICES.map((_, i) => gridImages[i]?.url || FALLBACK_IMAGES[i]);

  const s = services[active];

  const handleNav = (link: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(link);
  };

  return (
    <section
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
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{t['eyebrow']}</span>
          </div>
            <div className="w-10 h-px bg-primary-500/40" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="sonic-h2 text-foreground-950">
              {t['heading']}<br />Ein <span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{t['heading-accent']}</span>.
            </h2>
            <p className="text-foreground-500 text-sm leading-relaxed max-w-xs lg:text-right lg:pb-1">
              {t['sub']}
            </p>
          </div>
        </div>

        {/* ── Card — same card language as the homepage "Unsere Leistungen" (28.10.2026):
             equal-column selector strip, 16:9 image with burned-in title, light caption bar ── */}
        <div className="relative overflow-hidden" style={{ background: '#ffffff', border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
          {/* Selector strip — 4 equal columns */}
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderBottom: '1px solid oklch(var(--foreground-950) / 0.1)' }}
            role="tablist"
            aria-label="Leistungskategorien"
          >
            {services.map((item, i) => {
              const isActive = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
                  style={{
                    background: isActive ? 'oklch(var(--foreground-950))' : '#fff',
                    borderRight: '1px solid oklch(var(--foreground-950) / 0.08)',
                    borderBottom: isActive ? '2px solid oklch(var(--primary-500))' : '2px solid transparent',
                    minHeight: '60px',
                  }}
                >
                  <span className="font-black leading-none tabular-nums" style={{ fontSize: '14px', letterSpacing: '-0.03em', color: isActive ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-300))' }}>
                    {item.number}
                  </span>
                  <span className="text-center leading-tight text-[9px] sm:text-[10px] font-black uppercase tracking-[0.08em]" style={{ color: isActive ? 'rgba(255,255,255,0.7)' : 'oklch(var(--foreground-500))' }}>
                    {item.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Image — 16/9 with the headline burned in, like the homepage */}
          <div className="relative overflow-hidden bg-foreground-950">
            <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
              <img
                key={s.id}
                src={resolvedImages[active]}
                alt={`${s.category} — ${s.headline}`}
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />
              <span className="absolute top-4 left-5 px-3 py-1 bg-primary-500 text-foreground-950 text-xs font-black tracking-widest">
                {s.number}
              </span>
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 md:px-8 md:pb-5 pointer-events-none">
                <p className="font-black text-white leading-none uppercase tracking-tight" style={{ fontSize: 'clamp(18px, 3.5vw, 28px)', letterSpacing: '-0.025em', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                  {s.headline}
                </p>
              </div>
            </div>
          </div>

          {/* Caption bar — light, matches the homepage micro-bar language */}
          <div className="px-5 md:px-8 py-5 md:py-6" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.08)' }}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: 'oklch(0.55 0.08 115)' }}>
                  {s.category}
                </p>
                <p className="text-sm text-foreground-600 leading-relaxed mb-4 max-w-2xl">
                  {s.sub}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-black px-2 py-0.5 uppercase tracking-widest text-foreground-950 bg-primary-500/10 border border-primary-500/25 whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => handleNav(s.ctaLink)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 font-black text-xs uppercase tracking-[0.14em] transition-all duration-200 cursor-pointer whitespace-nowrap hover:bg-primary-500 hover:text-foreground-950"
                  style={{ background: 'oklch(var(--foreground-950))', color: '#fff', minHeight: '44px' }}
                >
                  {s.cta}
                  <i className="ri-arrow-right-line text-sm"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav(s.secondaryLink)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 font-black text-xs uppercase tracking-[0.14em] transition-colors duration-200 cursor-pointer whitespace-nowrap border-2 border-foreground-950/12 text-foreground-950/70 hover:border-foreground-950 hover:text-foreground-950"
                  style={{ minHeight: '44px' }}
                >
                  {s.secondaryCta}
                  <i className="ri-arrow-right-up-line text-sm"></i>
                </button>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-1.5 mt-5">
              {services.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={item.category}
                  className="tap-target h-1 cursor-pointer transition-all duration-300"
                  style={{ width: i === active ? 32 : 12, background: i === active ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-950) / 0.12)' }}
                />
              ))}
              <span className="ml-3 text-[10px] font-black uppercase tracking-[0.2em] text-foreground-400 tabular-nums">
                {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}