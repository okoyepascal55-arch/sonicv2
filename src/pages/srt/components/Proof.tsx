import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { useMediaStore } from '@/lib/mediaStore';

const STATS = [
  { value: '1.000', prefix: '>', label: 'Stores betreut', sublabel: 'In Sonic-Projekten', icon: 'ri-store-2-line', sys: 'Stores', trend: 'Im Handel' },
  { value: '2 Mrd.', prefix: '>', label: 'Umsatz generiert', sublabel: 'In Euro', icon: 'ri-money-euro-circle-line', sys: 'Umsatz', trend: 'Für unsere Kunden' },
  { value: '1,3 Mio.', prefix: '>', label: 'Einsätze getrackt', sublabel: 'Durch das SRT', icon: 'ri-map-pin-2-line', sys: 'Einsätze', trend: 'Im SRT' },
  { value: '1.800', prefix: '>', label: 'Menschen im Talentpool', sublabel: 'Aktiv', icon: 'ri-team-line', sys: 'Talentpool', trend: 'DACH-weit' },
];

export default function Proof() {
  const tBadge   = useText('srt_proof', 'srt-proof-badge',   'SRT in Zahlen');
  // Dashboard → Text → SRT → „SRT — In Zahlen: Kennzahlen“
  const pt = useReviewText('srt_proof_stats');
  // Dashboard → Text → SRT → „SRT — Kurzlabels (Problem & Zahlen)“
  const lb = useReviewText('srt_short_labels');
  const stats = STATS.map((st, i) => ({
    ...st,
    value: pt[`s${i + 1}-value`] ?? st.value,
    label: pt[`s${i + 1}-label`] ?? st.label,
    sublabel: pt[`s${i + 1}-sublabel`] ?? st.sublabel,
    trend: pt[`s${i + 1}-trend`] ?? st.trend,
    sys: lb[`proof-${i + 1}`] || st.sys,
  }));

  // „SRT in Zahlen“ as the wooden LIVE strip used on Home and Karriere (22.10.2026):
  // wood texture from the dashboard (Home → LiveMetrics background), the four SRT figures running through.
  // Headline texts stay in the dashboard; the strip itself is the whole section.
  const { images: woodBg } = useMediaStore('home_livemetrics_wood_bg');
  const woodUrl = woodBg[0]?.url || '';

  const Items = ({ k }: { k: string }) => (
    <>
      <span className="flex items-center gap-2 flex-shrink-0">
        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse-slow" />
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white drop-shadow-md whitespace-nowrap">LIVE</span>
      </span>
      {stats.map((st, i) => (
        <span key={`${k}-${i}`} className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <span className="text-primary-500 drop-shadow-md text-xs">•</span>
          <i className={`${st.icon} text-primary-500 drop-shadow-md text-xs sm:text-sm`} aria-hidden="true" />
          <span className="text-xs sm:text-sm tabular-nums font-black text-white drop-shadow-md whitespace-nowrap">{st.prefix}{st.value}</span>
          <span className="text-[10px] sm:text-xs text-white/90 drop-shadow-md font-bold whitespace-nowrap">{st.label}</span>
        </span>
      ))}
      <span className="flex items-center gap-2 flex-shrink-0">
        <span className="text-primary-500 drop-shadow-md text-xs">•</span>
        <span className="text-[10px] sm:text-xs text-white/80 drop-shadow-md font-bold whitespace-nowrap">SRT</span>
      </span>
    </>
  );

  return (
    <section id="srt-proof" aria-label={tBadge} className="relative overflow-hidden border-y border-foreground-200/40" style={{ paddingTop: '10px', paddingBottom: '10px', background: 'oklch(0.13 0.005 118)' }}>
      <div className="absolute inset-0" aria-hidden="true">
        {woodUrl && <img src={woodUrl} alt="" className="w-full h-full object-cover" loading="lazy" />}
        <div className="absolute inset-0 bg-foreground-950/50" />
      </div>
      <div className="relative z-10 overflow-hidden">
        <div className="flex items-center gap-6 md:gap-8 animate-scroll-optimized whitespace-nowrap py-1.5 sm:py-2 motion-reduce:animate-none" aria-hidden="true">
          <Items k="a" />
          <Items k="b" />
          <Items k="c" />
        </div>
        <ul className="sr-only">
          {stats.map((st, i) => <li key={i}>{st.label}: {st.prefix}{st.value}</li>)}
        </ul>
      </div>
    </section>
  );
}
