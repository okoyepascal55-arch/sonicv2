import { useMediaStore } from '@/lib/mediaStore';
import { useLeistungenText } from '@/hooks/useLeistungenText';

// „Unsere Zahlen“ as the wooden LIVE strip used on Home, Karriere and SRT (28.10.2026).
// Values, labels and the heading stay in the dashboard (Text → Leistungen → Zahlen);
// the wood texture is the shared one from Home → LiveMetrics background.
const ICONS = ['ri-store-2-line', 'ri-money-euro-circle-line', 'ri-team-line', 'ri-map-pin-2-line'];

export default function LeistungenStats() {
  const t = useLeistungenText('leistungen_overview_stats');
  const stats = [1, 2, 3, 4]
    .map((n, i) => ({ display: t[`stat${n}-value`] ?? '', label: t[`stat${n}-label`] ?? '', sub: t[`stat${n}-sub`] ?? '', icon: ICONS[i] }))
    .filter((st) => st.display || st.label);
  const heading = [t['heading'], t['heading-accent']].filter(Boolean).join(' ');

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
          <span className="text-xs sm:text-sm tabular-nums font-black text-white drop-shadow-md whitespace-nowrap">{st.display}</span>
          <span className="text-[10px] sm:text-xs text-white/90 drop-shadow-md font-bold whitespace-nowrap">{st.label}</span>
        </span>
      ))}
      {t['eyebrow'] && (
        <span className="flex items-center gap-2 flex-shrink-0">
          <span className="text-primary-500 drop-shadow-md text-xs">•</span>
          <span className="text-[10px] sm:text-xs text-white/80 drop-shadow-md font-bold whitespace-nowrap uppercase">{t['eyebrow']}</span>
        </span>
      )}
    </>
  );

  return (
    <section aria-label={heading || 'Unsere Zahlen'} className="relative overflow-hidden border-y border-foreground-200/40" style={{ paddingTop: '10px', paddingBottom: '10px', background: 'oklch(0.13 0.005 118)' }}>
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
          {stats.map((st, i) => <li key={i}>{st.label}: {st.display}{st.sub ? ` (${st.sub})` : ''}</li>)}
        </ul>
      </div>
    </section>
  );
}
