import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const STATS = [
  { icon: 'ri-star-fill', value: '4.8/5', label: 'Kununu Score' },
  { icon: 'ri-time-line', value: 'Ø 5,15 J.', label: 'Betriebszugehörigkeit' },
  { icon: 'ri-user-community-line', value: '2.000+', label: 'Talente im Netzwerk' },
];

export default function KarriereStatsTicker() {
  const { images: woodBgImages } = useMediaStore('home_livemetrics_wood_bg');
  const woodBgUrl = woodBgImages[0]?.url
    ? resolveImageUrl(woodBgImages[0].url)
    : 'https://readdy.ai/api/search-image?query=warm%20chestnut%20brown%20hardwood%20plank%20natural%20wood%20grain%20texture%20rich%20amber%20brown%20tone%20oak%20walnut%20surface%20close%20up%20macro%20photography%20dark%20rich%20finish&width=1920&height=100&seq=wood-ticker-karriere&orientation=landscape';

  const displayed = [...STATS, ...STATS];

  return (
    <div className="relative overflow-hidden w-full" style={{ borderTop: '1px solid oklch(0.81 0.19 115 / 0.12)' }}>
      <div className="absolute inset-0" aria-hidden="true">
        <img src={woodBgUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-foreground-950/65" />
      </div>
      <div className="relative z-10 overflow-hidden py-3 md:py-4">
        <div
          className="flex items-center gap-8 md:gap-14 animate-scroll-optimized whitespace-nowrap"
          aria-hidden="true"
        >
          {displayed.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              {i % STATS.length === 0
                ? <span className="text-primary-500 text-[10px]">●</span>
                : <span className="text-primary-500/30 text-[10px]">·</span>}
              <i className={`${stat.icon} text-primary-500 text-sm`} />
              <span className="text-sm font-black text-white tabular-nums">{stat.value}</span>
              <span className="text-[10px] font-bold text-white/55 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
