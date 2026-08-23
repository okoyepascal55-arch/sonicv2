import { useEffect, useRef, useState } from 'react';
import ClientProof from '@/components/feature/ClientProof';
import SectionBadge from '@/components/base/SectionBadge';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

interface Stat {
  woodIcon: string;
  value: string;
  unit: string;
  label: string;
  sublabel: string;
}

export default function Proof() {
  const tBadge = useText('srt_proof', 'srt-proof-badge', 'SRT in Zahlen');
  const tHeading = useText('srt_proof', 'srt-proof-heading', 'Die Bilanz spricht für sich.');
  const tSub = useText('srt_proof', 'srt-proof-sub', '');
  const tCta = useText('srt_proof', 'srt-proof-cta', 'SRT Demo anfragen');

  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const { images: woodIcons } = useMediaStore('srt_proof_wood_icons');

  const getStatIcon = (idx: number): string => woodIcons[idx]?.url || STATS_DATA[idx].fallbackWoodIcon;

  const STATS_DATA = [
    { value: '>3,7', unit: 'Mio.', label: 'Produkte verkauft', sublabel: 'Seit Gründung 2008', fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20shopping%20bag%20retail%20product%20sold%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20bag%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-zahlen-bag&orientation=squarish' },
    { value: '>2', unit: 'Mrd.', label: 'Umsatz generiert', sublabel: 'In Euro', fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20money%20euro%20coin%20revenue%20profit%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20coin%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-zahlen-coin&orientation=squarish' },
    { value: '>1,35', unit: 'Mio.', label: 'Einsätze getrackt', sublabel: 'Durch das SRT', fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20map%20pin%20location%20tracking%20assignments%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20pin%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-zahlen-pin&orientation=squarish' },
    { value: '>2000', unit: '', label: 'Talente im Pool', sublabel: 'Festangestellt', fallbackWoodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20team%20people%20group%20talent%20pool%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20people%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=80&height=80&seq=wood-srt-zahlen-team&orientation=squarish' },
  ];

  const STATS: Stat[] = STATS_DATA.map((s, i) => ({ ...s, woodIcon: getStatIcon(i) }));

  function useCountUp(target: number, duration = 1400, active = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!active) return;
      let start = 0;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); } else { setCount(start); }
      }, 16);
      return () => clearInterval(timer);
    }, [active, target, duration]);
    return count;
  }

  function AnimatedStat({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
    const numericValue = parseFloat(stat.value.replace(/[^0-9.,]/g, '').replace(',', '.'));
    const raw = useCountUp(numericValue, 1200 + index * 100, active);
    const display = numericValue >= 1000 ? Math.round(raw).toLocaleString('de-DE') : raw.toFixed(numericValue % 1 !== 0 ? 2 : 0).replace('.', ',');

    return (
      <div className="relative group flex flex-col items-center text-center p-6 md:p-8 bg-white border border-background-200/70 hover:border-primary-500/30 hover:bg-[#FAFDF5] transition-all duration-300">
        <div className="flex items-baseline justify-center gap-0.5 mb-1.5">
          <span className="text-primary-500 font-black text-xs">{'>'}</span>
          <span className="font-black text-foreground-950 leading-none tabular-nums" style={{ fontSize: 'clamp(28px,3vw,42px)', letterSpacing: '-0.03em' }}>{display}</span>
          {stat.unit && <span className="text-primary-500 font-black text-sm">{stat.unit}</span>}
        </div>
        <p className="text-foreground-950 font-black text-xs md:text-sm leading-tight tracking-tight">{stat.label}</p>
        <p className="text-foreground-500 text-[10px] font-semibold uppercase tracking-widest mt-1">{stat.sublabel}</p>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-12 h-0.5 bg-primary-500 transition-all duration-400" />
      </div>
    );
  }

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setTriggered(true); }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white">
      <ClientProof />
      <div ref={sectionRef} className="py-14 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="mb-3"><SectionBadge text={tBadge} variant="dark" /></div>
              <h2 className="font-black text-foreground-950 leading-tight tracking-tight" style={{ fontSize: 'clamp(24px,3vw,40px)' }}>{tHeading.split('.')[0] || tHeading}.<br />{tHeading.includes('.') ? tHeading.split('.').slice(1).join('.').trim() : 'für sich.'}</h2>
            </div>
            <p className="text-foreground-500 text-xs max-w-xs text-right leading-relaxed hidden md:block">
              {tSub || 'Tatsächlich gemessene Ergebnisse aus über 15 Jahren Retail-Aktivierungen.'}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-background-200/70">
            {STATS.map((stat, i) => (<AnimatedStat key={i} stat={stat} active={triggered} index={i} />))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-background-200/70">
            <div className="flex items-center gap-2">
              <i className="ri-verified-badge-line text-primary-500 text-sm" />
              <span className="text-xs text-foreground-500 font-semibold">Daten auf Basis tatsächlicher Projekte seit 2008</span>
            </div>
            <button onClick={() => {
              const el = document.getElementById('zugang');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
            }}
              className="flex items-center gap-2 text-foreground-950 font-black text-xs uppercase tracking-widest hover:text-primary-500 transition-colors duration-200 cursor-pointer group">
              {tCta}
              <i className="ri-arrow-right-line transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}