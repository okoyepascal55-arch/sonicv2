import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useKarriereTicker } from '../useKarriereText';
import { REVIEW_LINKS } from './KarriereAwards';

// Rating items link straight to the reviews (the readable, keyboard-reachable links sit in „Ausgezeichnet“).
const linkFor = (icon: string) => (icon === 'ri-star-fill' ? REVIEW_LINKS.kununu : icon === 'ri-google-fill' ? REVIEW_LINKS.google : undefined);

export default function KarriereStatsTicker() {
  // Dashboard → Text → Karriere → „Karriere — Kennzahlen-Ticker“
  const STATS = useKarriereTicker();
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
          className="flex items-center gap-8 md:gap-14 animate-scroll-optimized whitespace-nowrap hover:[animation-play-state:paused]"
          aria-hidden="true"
        >
          {displayed.map((stat, i) => {
            const href = linkFor(stat.icon);
            const Item = href ? 'a' : 'div';
            return (
            <Item
              key={i}
              {...(href ? { href, target: '_blank', rel: 'nofollow noopener noreferrer', tabIndex: -1 } : {})}
              className={`flex items-center gap-3 flex-shrink-0 ${href ? 'group cursor-pointer' : ''}`}
            >
              {i % STATS.length === 0
                ? <span className="text-primary-500 text-[10px]">●</span>
                : <span className="text-primary-500/30 text-[10px]">·</span>}
              <i className={`${stat.icon} text-primary-500 text-sm`} />
              <span className={`text-sm font-black tabular-nums ${href ? 'text-white group-hover:text-primary-500' : 'text-white'}`}>{stat.value}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${href ? 'text-white/75 group-hover:text-primary-500 underline decoration-primary-500/50 underline-offset-4' : 'text-white/55'}`}>{stat.label}</span>
              {href && <i className="ri-arrow-right-up-line text-primary-500 text-sm" aria-hidden="true" />}
            </Item>
            );
          })}
        </div>
      </div>
    </div>
  );
}
