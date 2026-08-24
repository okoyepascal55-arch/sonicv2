import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { ChapterHeader, Marker } from './ChapterKit';

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
  const tApply = useText('careers_paths', 'careers-paths-apply', 'Initiativbewerbung senden');

  const resolvedPaths = PATHS.map((path, i) => ({
    ...path,
    badge: path.id === 'sales' ? tSalesBadge : tStaffBadge,
    headline: path.id === 'sales' ? tSalesHeadline : tStaffHeadline,
    tagline: path.id === 'sales' ? tSalesDesc : tStaffDesc,
    image: pathImages[i]?.url || path.fallbackImage,
  }));

  // Split "Zwei Wege. Ein Ziel." → main "Zwei Wege." / marker "Ein Ziel."
  const sentences = tHeading.split('. ').map((s) => (s.endsWith('.') ? s : `${s}.`));
  const headingMain = sentences[0] ?? tHeading;
  const headingAccent = sentences.length > 1 ? sentences.slice(1).join(' ') : '';

  return (
    <section id="pfade" className="bg-white py-20 md:py-[104px] px-5 md:px-10">
      <div className="sonic-container">
        <ChapterHeader
          n="01"
          eyebrow={tBadge}
          heading={<>{headingMain} {headingAccent && <Marker>{headingAccent}</Marker>}</>}
          sub={tSub}
          headingMax="max-w-[620px]"
          aside={
            <p
              className="text-[12px] font-bold leading-[1.7] tracking-[0.04em] uppercase pl-6"
              style={{ borderLeft: '1px solid oklch(var(--foreground-950) / 0.12)', color: 'oklch(var(--foreground-500))' }}
            >
              Erst orientieren, dann bewerben — beide Wege mit denselben Kennzahlen vergleichbar.
            </p>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
          {resolvedPaths.map((path) => (
            <div key={path.id} className="flex flex-col" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
              {/* Image */}
              <div className="relative h-[280px] md:h-[340px] overflow-hidden" style={{ background: 'oklch(0.13 0.005 118)' }}>
                <img src={path.image} alt={`${path.title} — ${path.headline}`} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.92) 0%, rgba(10,11,9,0.2) 60%, transparent 100%)' }} />
                <div
                  className="absolute top-5 left-5 px-3.5 py-[7px] text-[10px] font-black uppercase tracking-[0.2em] text-primary-500"
                  style={{ background: 'rgba(12,13,11,0.42)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  {path.badge}
                </div>
                <div className="absolute left-0 right-0 bottom-0 p-7">
                  <p className="text-3xl md:text-[44px] font-black leading-none tracking-[-0.035em] text-white mb-2.5">{path.title}</p>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 bg-primary-500" />
                    <span className="text-[13px] font-black text-white">{path.headline}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 p-7 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[15px] leading-[1.75] mb-8" style={{ color: 'oklch(var(--foreground-500))' }}>
                    {path.tagline}
                  </p>
                  <div className="grid grid-cols-2" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.08)', borderLeft: '1px solid oklch(var(--foreground-950) / 0.08)' }}>
                    {path.stats.map((s) => (
                      <div key={s.label} className="px-5 py-[18px]" style={{ borderRight: '1px solid oklch(var(--foreground-950) / 0.08)', borderBottom: '1px solid oklch(var(--foreground-950) / 0.08)' }}>
                        <p className="text-[22px] font-black leading-none tracking-[-0.03em] text-foreground-950 tabular-nums mb-1.5">{s.value}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'oklch(var(--foreground-400))' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href={`mailto:${path.email}?subject=Initiativbewerbung`}
                  className="mt-8 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-foreground-950 text-white text-[11px] font-black uppercase tracking-[0.14em] hover:bg-primary-500 hover:text-foreground-950 transition-colors duration-200 cursor-pointer"
                >
                  {tApply}
                  <i className="ri-arrow-right-line text-sm" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
