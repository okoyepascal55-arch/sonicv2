import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

type PathId = 'sales' | 'staff';

const PATHS: Array<{
  id: PathId;
  badge: string;
  icon: string;
  title: string;
  headline: string;
  tagline: string;
  fallbackImage: string;
  stats: { value: string; label: string }[];
  roles: string[];
  perks: string[];
  steps: { step: string; title: string; desc: string }[];
  email: string;
}> = [
  {
    id: 'sales',
    badge: 'Internes Team',
    icon: 'ri-building-4-line',
    title: 'Sonic Sales Family',
    headline: 'Bürobasierte Karriere in Krefeld',
    tagline: 'Klare Aufstiegspfade, Mentoring, Hybridarbeit und eine echte Community.',
    fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png',
    stats: [
      { value: 'Ø 5,15 J.', label: 'Zugehörigkeit' },
      { value: '98 %', label: 'Zufriedenheit' },
      { value: 'Krefeld', label: 'Campus' },
      { value: 'Hybrid', label: 'Modell' },
    ],
    roles: ['Sales Representative', 'Account Manager', 'Team Lead', 'Business Development'],
    perks: ['Karrierepfade', 'Hybrides Arbeiten', 'Quartalsboni', 'Mentoring', 'Training', 'Gemeinschaft'],
    steps: [
      { step: '01', title: 'Einstieg', desc: 'Onboarding & erste Projekte' },
      { step: '02', title: 'Wachstum', desc: 'Eigenes Portfolio, Ziele übertreffen' },
      { step: '03', title: 'Leadership', desc: 'Teamverantwortung, Coaching' },
      { step: '04', title: 'Excellence', desc: 'Strategische Projekte, Management' },
    ],
    email: 'karriere@sonic-group.de',
  },
  {
    id: 'staff',
    badge: 'Field Team',
    icon: 'ri-store-2-line',
    title: 'Sonic Staff Family',
    headline: 'Flexibler Einsatz DACH-weit',
    tagline: '150+ Premium-Brands, Top-Incentives und maximale Flexibilität.',
    fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg',
    stats: [
      { value: '150+', label: 'Brands' },
      { value: '20.000+', label: 'Promoter:innen' },
      { value: 'DACH', label: 'Gebiet' },
      { value: 'Flex', label: 'Planung' },
    ],
    roles: ['Brand Promoter', 'Produktdemonstrateur', 'Messe-Specialist', 'Retail Berater'],
    perks: ['Flexible Zeiten', 'Incentive-Boni', 'Brand-Schulungen', 'DACH-weit', 'App-basiert', 'Top-Brands'],
    steps: [
      { step: '01', title: 'Registrierung', desc: 'SRT-App, Profil & Verfügbarkeiten' },
      { step: '02', title: 'Erste Einsätze', desc: 'Schulungen & erste Aufträge' },
      { step: '03', title: 'Top-Promoter', desc: 'Mehr Marken, bessere Konditionen' },
      { step: '04', title: 'Spezialist', desc: 'Exklusive Partnerschaften & Trainings' },
    ],
    email: 'staffjobs@sonic-group.de',
  },
];

export default function KarrierepfadeSection() {
  const { images: pathImages } = useMediaStore('careers_path_images');

  const tBadge = useText('careers_paths', 'careers-paths-badge', 'Karrierepfade');
  const tHeading = useText('careers_paths', 'careers-paths-heading', 'Zwei Wege. Ein Ziel.');
  const tSub = useText('careers_paths', 'careers-paths-sub', 'Ob intern am Campus oder flexibel im Außendienst — bei Sonic gibt es einen Weg für dich.');
  const tSalesBadge = useText('careers_paths', 'careers-paths-sales-badge', 'Internes Team');
  const tSalesHeadline = useText('careers_paths', 'careers-paths-sales-headline', 'Bürobasierte Karriere in Krefeld');
  const tSalesDesc = useText('careers_paths', 'careers-paths-sales-desc', 'Klare Aufstiegspfade, Mentoring, Hybridarbeit und eine echte Community.');
  const tStaffBadge = useText('careers_paths', 'careers-paths-staff-badge', 'Field Team');
  const tStaffHeadline = useText('careers_paths', 'careers-paths-staff-headline', 'Flexibler Einsatz DACH-weit');
  const tStaffDesc = useText('careers_paths', 'careers-paths-staff-desc', '150+ Premium-Brands, Top-Incentives und maximale Flexibilität.');
  const tCta = useText('careers_paths', 'careers-paths-cta', 'Alle Stellen ansehen');

  const resolvedPaths = PATHS.map((path, i) => ({
    ...path,
    badge: path.id === 'sales' ? tSalesBadge : tStaffBadge,
    headline: path.id === 'sales' ? tSalesHeadline : tStaffHeadline,
    tagline: path.id === 'sales' ? tSalesDesc : tStaffDesc,
    image: pathImages[i]?.url || path.fallbackImage,
  }));

  const scrollToJobs = () => {
    const el = document.getElementById('stellenangebote');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="pfade" className="py-[88px] px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Section head */}
        <div className="max-w-[640px] mb-11">
          <div className="inline-flex items-center gap-2 bg-[#DCE94D] text-[#0B0B0C] text-xs font-bold uppercase tracking-[0.06em] px-3.5 py-[7px] pr-3.5 mb-5 ">
            <span className="w-1.5 h-1.5 bg-[#0B0B0C] " />
            {tBadge}
          </div>
          <h2 className="text-[clamp(28px,3.4vw,40px)] font-black text-[#0B0B0C] leading-[1.1] tracking-tight uppercase">
            {tHeading.split('. ')[0]}.{' '}
            <span className="text-[#C3D62A]">
              {tHeading.includes('.') ? tHeading.split('. ').slice(1).join('. ') : 'Ein Ziel.'}
            </span>
          </h2>
          <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-[520px]">
            {tSub}
          </p>
        </div>

        {/* Path grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {resolvedPaths.map((path) => (
            <div key={path.id} className="flex flex-col border-[1.5px] border-[#0B0B0C]  overflow-hidden">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/9] bg-[#0B0B0C]">
                <img
                  src={path.image}
                  alt={`${path.title} — ${path.headline}`}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(11,11,12,0) 40%, rgba(11,11,12,0.55) 100%)' }}
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#DCE94D] text-[#0B0B0C] text-[11px] font-black uppercase tracking-[0.04em] ">
                    <i className={`${path.icon} text-xs`} />
                    {path.badge}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-[26px]">
                <h3 className="text-[19px] font-black uppercase tracking-tight mb-1 text-[#0B0B0C]">
                  {path.title}
                </h3>
                <p className="text-[13px] font-bold text-[#0B0B0C]/70 mb-2">{path.headline}</p>
                <p className="text-[13px] leading-[1.55] text-[#6E6E68]">{path.tagline}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-px bg-[#E7E4D4] mt-5">
                  {path.stats.map((stat, i) => (
                    <div key={i} className="bg-white px-4 py-3">
                      <div className="text-[16px] font-black text-[#0B0B0C] leading-none tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-[#9A9A93] font-bold uppercase tracking-[0.04em] mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Steps */}
                <div className="mt-5 pt-5 border-t border-[#E7E4D4]">
                  <div className="text-[10px] font-black text-[#9A9A93] uppercase tracking-[0.08em] mb-3">
                    Dein Karrierepfad
                  </div>
                  <div className="flex flex-col gap-2">
                    {path.steps.map((step) => (
                      <div key={step.step} className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 flex-shrink-0 bg-[#0B0B0C] text-[#DCE94D] text-[10px] font-black ">
                          {step.step}
                        </span>
                        <div>
                          <span className="text-[12px] font-bold text-[#0B0B0C]">{step.title}</span>
                          <span className="text-[11px] text-[#9A9A93]"> — {step.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Roles + Perks */}
                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {path.roles.map((role) => (
                      <span
                        key={role}
                        className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.03em] bg-[#0B0B0C] text-white "
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {path.perks.map((perk) => (
                      <span
                        key={perk}
                        className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.03em] bg-[#FAFDF5] border border-[#E7E4D4] text-[#6E6E68] "
                      >
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 pt-14">
          <div className="bg-[#FAFDF5]  p-6 text-center">
            <div className="text-[20px] font-black uppercase tracking-tight text-[#0B0B0C]">
              Krefeld
            </div>
            <div className="text-[11px] text-[#9A9A93] uppercase tracking-[0.06em] mt-1 font-semibold">
              Sonic Campus
            </div>
          </div>
          <div className="bg-[#FAFDF5]  p-6 text-center">
            <div className="text-[20px] font-black uppercase tracking-tight text-[#0B0B0C]">
              Hybrid
            </div>
            <div className="text-[11px] text-[#9A9A93] uppercase tracking-[0.06em] mt-1 font-semibold">
              Arbeitsmodell
            </div>
          </div>
        </div>

        {/* CTA bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#0B0B0C]  p-[22px] md:px-7 mt-6 gap-4">
          <a
            href="mailto:karriere@sonic-group.de?subject=Initiativbewerbung"
            className="text-white font-bold text-sm hover:text-[#DCE94D] transition-colors"
          >
            Initiativbewerbung senden →
          </a>
          <button
            onClick={scrollToJobs}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#DCE94D] text-[#0B0B0C] font-bold text-sm hover:bg-[#C3D62A] transition-all duration-200 cursor-pointer whitespace-nowrap "
          >
            {tCta}
          </button>
        </div>
      </div>
    </section>
  );
}