import SectionBadge from '@/components/base/SectionBadge';
import { useState, useCallback } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import WoodenButton from '@/components/base/WoodenButton';

type PathId = 'sales' | 'staff';

const PATHS: Array<{
  id: PathId;
  badge: string;
  title: string;
  headline: string;
  tagline: string;
  fallbackImage: string;
  stats: { value: string; label: string }[];
  email: string;
}> = [
  {
    id: 'sales',
    badge: 'Internes Team',
    title: 'Sonic Sales Family',
    headline: 'Bürobasierte Karriere in Krefeld',
    tagline: 'Klare Aufstiegspfade, Mentoring, Hybridarbeit und eine echte Community am Campus.',
    fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png',
    stats: [
      { value: 'Ø 5,15 J.', label: 'Zugehörigkeit' },
      { value: '98 %', label: 'Zufriedenheit' },
      { value: 'Krefeld', label: 'Campus' },
      { value: 'Hybrid', label: 'Arbeitsmodell' },
    ],
    email: 'karriere@sonic-group.de',
  },
  {
    id: 'staff',
    badge: 'Field Team',
    title: 'Sonic Staff Family',
    headline: 'Flexibler Einsatz DACH-weit',
    tagline: '150+ Premium-Brands, Top-Incentives und maximale Flexibilität bei deiner Planung.',
    fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg',
    stats: [
      { value: '150+', label: 'Brands' },
      { value: '20.000+', label: 'Promoter:innen' },
      { value: 'DACH', label: 'Gebiet' },
      { value: 'Flex', label: 'Planung' },
    ],
    email: 'staffjobs@sonic-group.de',
  },
];

export default function KarrierepfadeSection() {
  const [active, setActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const { images: pathImages } = useMediaStore('careers_path_images');

  const tBadge = useText('careers_paths', 'careers-paths-badge', 'Karrierepfade');
  const tHeading = useText('careers_paths', 'careers-paths-heading', 'Zwei Wege. Ein Ziel.');
  const tSub = useText('careers_paths', 'careers-paths-sub', 'Ob intern am Campus oder flexibel im Außendienst — bei Sonic gibt es einen Weg für dich.');
  const tSalesBadge = useText('careers_paths', 'careers-paths-sales-badge', 'Internes Team');
  const tSalesHeadline = useText('careers_paths', 'careers-paths-sales-headline', 'Bürobasierte Karriere in Krefeld');
  const tSalesDesc = useText('careers_paths', 'careers-paths-sales-desc', 'Klare Aufstiegspfade, Mentoring, Hybridarbeit und eine echte Community am Campus.');
  const tStaffBadge = useText('careers_paths', 'careers-paths-staff-badge', 'Field Team');
  const tStaffHeadline = useText('careers_paths', 'careers-paths-staff-headline', 'Flexibler Einsatz DACH-weit');
  const tStaffDesc = useText('careers_paths', 'careers-paths-staff-desc', '150+ Premium-Brands, Top-Incentives und maximale Flexibilität bei deiner Planung.');
  const tCta = useText('careers_paths', 'careers-paths-cta', 'Alle Stellen ansehen');
  const tApply = useText('careers_paths', 'careers-paths-apply', 'Initiativbewerbung senden');

  const resolvedPaths = PATHS.map((path) => ({
    ...path,
    badge: path.id === 'sales' ? tSalesBadge : tStaffBadge,
    headline: path.id === 'sales' ? tSalesHeadline : tStaffHeadline,
    tagline: path.id === 'sales' ? tSalesDesc : tStaffDesc,
  }));

  const path = resolvedPaths[active];

  const goTo = useCallback(
    (i: number) => {
      if (i === active) return;
      setTransitioning(true);
      setTimeout(() => {
        setActive(i);
        setTransitioning(false);
      }, 240);
    },
    [active]
  );

  const scrollToJobs = () => {
    const el = document.getElementById('stellenangebote');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Split "ZWEI WEGE. EIN ZIEL." → main "ZWEI WEGE." / accent "EIN ZIEL."
  const sentences = tHeading.split('. ').map((s) => (s.endsWith('.') ? s : `${s}.`));
  const headingMain = sentences[0] ?? tHeading;
  const headingAccent = sentences.length > 1 ? sentences.slice(1).join(' ') : '';

  return (
    <section id="pfade" className="sonic-section-lg relative bg-background-100 overflow-hidden">
      <div className="max-w-full max-w-[1280px] mx-auto px-6 md:px-10">
        {/* ── HEADER + SELECTOR ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 md:mb-12">
          <div className="max-w-xl">
            <SectionBadge text={tBadge} variant="dark" className="mb-5" />
            <h2 className="sonic-h2 text-foreground-950">
              {headingMain}{' '}
              {headingAccent && <span className="text-primary-500">{headingAccent}</span>}
            </h2>
            <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-[440px]">{tSub}</p>
          </div>

          {/* Numbered selector tabs */}
          <div className="flex items-stretch gap-0 flex-shrink-0 border border-black/10 overflow-hidden">
            {resolvedPaths.map((p, i) => {
              const isActive = active === i;
              return (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-2.5 px-4 md:px-5 py-3 text-left whitespace-nowrap cursor-pointer transition-colors duration-300 border-r last:border-r-0 border-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] focus-visible:ring-inset ${
                    isActive ? 'bg-foreground-950' : 'bg-white hover:bg-[#FAFDF5]'
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-6 h-6 text-[10px] font-black transition-colors duration-300 ${
                      isActive ? 'bg-primary-500 text-foreground-950' : 'border border-black/15 text-black/40'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-sm font-black leading-none transition-colors duration-300"
                    style={{ color: isActive ? '#FFFFFF' : 'rgba(0,0,0,0.6)' }}
                  >
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── SPLIT CARD (photo + dark panel) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] bg-white border border-[#E7E4D4] overflow-hidden">
          {/* Left — full-bleed image */}
          <div className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[560px] bg-foreground-950">
            <img
              key={`path-${path.id}`}
              src={pathImages[active]?.url || path.fallbackImage}
              alt={`${path.title} — ${path.headline}`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300 ${
                transitioning ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/20 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">
              {path.badge}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div className="text-[clamp(32px,4vw,52px)] font-black text-white leading-none tracking-tight">
                {path.title}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="w-1 h-1 bg-primary-500" />
                <span className="text-sm font-black text-white">{path.headline}</span>
              </div>
            </div>
          </div>

          {/* Right — dark ink panel */}
          <div className="bg-foreground-950 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="text-primary-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                {String(active + 1).padStart(2, '0')} / {String(resolvedPaths.length).padStart(2, '0')}
              </div>

              <h2
                key={`headline-${active}`}
                className="sonic-h2 text-white"
              >
                {path.headline}
              </h2>

              <p key={`tagline-${active}`} className="text-sm leading-relaxed text-white/55 mt-4 max-w-md">
                {path.tagline}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                {path.stats.map((m) => (
                  <div key={m.label} className="border border-white/10 px-4 py-3.5">
                    <div className="text-xl font-black text-primary-500 leading-none tabular-nums">{m.value}</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer nav + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 mt-8 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo((active - 1 + resolvedPaths.length) % resolvedPaths.length)}
                  className="w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 hover:bg-primary-500 hover:text-foreground-950 border border-white/15 text-white/60"
                  aria-label="Vorheriger Karrierepfad"
                >
                  <i className="ri-arrow-left-line" />
                </button>
                <button
                  onClick={() => goTo((active + 1) % resolvedPaths.length)}
                  className="w-9 h-9 flex items-center justify-center text-base cursor-pointer transition-colors duration-200 hover:bg-primary-500 hover:text-foreground-950 border border-white/15 text-white/60"
                  aria-label="Nächster Karrierepfad"
                >
                  <i className="ri-arrow-right-line" />
                </button>
              </div>
              <a
                href={`mailto:${path.email}?subject=Initiativbewerbung`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-[0.06em] hover:bg-white transition-colors whitespace-nowrap cursor-pointer"
              >
                {tApply}
                <i className="ri-arrow-right-line" />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA bar ── */}
        <div className="sonic-container mt-8 md:mt-10">
          <div className="border border-[#E7E4D4] py-6 md:py-7 px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAFDF5]">
            <div className="text-center sm:text-left">
              <p className="text-sm md:text-[15px] font-black text-foreground-950 leading-relaxed">
                Noch unsicher, welcher Weg zu dir passt?{' '}
                <span className="text-primary-500">Wir finden ihn gemeinsam.</span>
              </p>
              <p className="text-xs text-[#6E6E68] mt-1 hidden sm:block">
                Offene Stellen am Campus Krefeld und DACH-weit im Außendienst
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToJobs}
              className="inline-flex items-center gap-2 bg-foreground-950 text-white px-6 py-3 font-black hover:bg-primary-500 hover:text-foreground-950 transition-colors duration-300 whitespace-nowrap cursor-pointer text-xs flex-shrink-0"
            >
              <i className="ri-briefcase-line text-sm" />
              {tCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}