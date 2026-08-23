import { useEffect, useRef, useState } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const FALLBACK_STAT_ICONS = [
  'https://readdy.ai/api/search-image?query=finely%20hand%20carved%20walnut%20wood%20victory%20laurel%20wreath%20encircling%20an%20upward%20arrow%20sculptural%20relief%20carving%20deep%20shadow%20casting%20warm%20dark%20amber%20brown%20wood%20grain%20visible%20rich%20three%20dimensional%20craftsmanship%20museum%20quality%20artisan%20object%20centered%20on%20pure%20white%20matte%20background%20studio%20product%20photography%20sharp%20focus%20dramatic%20side%20lighting&width=120&height=120&seq=wood-leist-stat-laurel-v2&orientation=squarish',
  'https://readdy.ai/api/search-image?query=precision%20hand%20carved%20solid%20walnut%20wood%20balance%20scale%20with%20two%20equal%20pans%20sculptural%20three%20dimensional%20relief%20deep%20wood%20grain%20texture%20warm%20amber%20honey%20brown%20tone%20high%20contrast%20dramatic%20lighting%20centered%20museum%20quality%20artisan%20piece%20pure%20white%20studio%20background%20sharp%20product%20photography%20minimal&width=120&height=120&seq=wood-leist-stat-scale-v2&orientation=squarish',
  'https://readdy.ai/api/search-image?query=hand%20carved%20solid%20walnut%20wood%20group%20of%20three%20standing%20human%20figures%20team%20icon%20sculptural%20relief%20carving%20rich%20dark%20amber%20brown%20grain%20highly%20detailed%20three%20dimensional%20artisan%20quality%20centered%20on%20clean%20white%20studio%20background%20dramatic%20directional%20lighting%20sharp%20focus&width=120&height=120&seq=wood-leist-stat-team-v2&orientation=squarish',
  'https://readdy.ai/api/search-image?query=hand%20carved%20solid%20walnut%20wood%20precision%20compass%20rose%20eight%20point%20navigation%20star%20deeply%20incised%20relief%20carving%20rich%20dark%20amber%20brown%20grain%20highly%20detailed%20three%20dimensional%20military%20instrument%20quality%20centered%20on%20clean%20white%20studio%20background%20dramatic%20directional%20lighting%20sharp%20focus%20artisan%20craft&width=120&height=120&seq=wood-leist-stat-compass-v2&orientation=squarish',
];

const STAT_LABELS = ['Produkte verkauft', 'Umsatz generiert', 'Talente im Pool', 'Einsätze durchgeführt'];
const STAT_SUBS = [
  'Direkter Abverkauf am POS',
  'Für unsere Markenpartner',
  'Geschulte Brand Ambassadors',
  'Deutschlandweit seit 2007',
];
const STAT_VALUES = [3_700_000, 2_000, 2_000, 1_350_000];
const STAT_DISPLAY = [
  (v: number) => `>${(v / 1_000_000).toFixed(1).replace('.', ',')} Mio.`,
  (v: number) => `>${v >= 2000 ? '2' : (v / 1000).toFixed(1)} Mrd. €`,
  (v: number) => `>${v >= 2000 ? '2.000' : v.toLocaleString('de-DE')}`,
  (v: number) => `>${(v / 1_000_000).toFixed(2).replace('.', ',')} Mio.`,
];

function useCountUp(target: number, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    setCount(0);
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function StatCard({
  value,
  display,
  label,
  sub,
  woodIcon,
  delay,
  countActive,
  index,
}: {
  value: number;
  display: (v: number) => string;
  label: string;
  sub: string;
  woodIcon: string;
  delay: number;
  countActive: boolean;
  index: number;
}) {
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 1600, countActive);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTimeout(() => setEntered(true), delay);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  const isLime = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden cursor-default"
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms, background-color 0.25s ease, border-color 0.25s ease`,
        backgroundColor: hovered ? '#f8faef' : '#ffffff',
        border: `1px solid ${hovered ? 'rgba(200,212,0,0.45)' : 'rgba(0,0,0,0.07)'}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top-left corner accent */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <div className="absolute top-0 left-0 w-10 h-[2px] bg-gradient-to-r from-[#C8D400] to-transparent" />
        <div className="absolute top-0 left-0 w-[2px] h-10 bg-gradient-to-b from-[#C8D400] to-transparent" />
      </div>
      {/* Bottom-right corner accent */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <div className="absolute bottom-0 right-0 w-10 h-[2px] bg-gradient-to-l from-[#C8D400] to-transparent" />
        <div className="absolute bottom-0 right-0 w-[2px] h-10 bg-gradient-to-t from-[#C8D400] to-transparent" />
      </div>

      <div className="relative z-10 px-4 py-4 flex items-start gap-3">
        {/* Wood icon — small */}
        <div
          className="w-10 h-10 flex-shrink-0 overflow-hidden"
          style={{
            boxShadow: '0 2px 6px rgba(139,90,43,0.15)',
            outline: hovered ? '1.5px solid rgba(200,212,0,0.4)' : '1.5px solid rgba(0,0,0,0.04)',
            transition: 'outline 0.25s ease, transform 0.25s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        >
          <img src={woodIcon} alt={label} className="w-full h-full object-cover" loading="lazy" />
        </div>

        {/* Text stack */}
        <div className="flex-1 min-w-0">
          <div
            className="font-black tabular-nums leading-none mb-0.5"
            style={{
              fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
              letterSpacing: '-0.02em',
              color: isLime ? '#C8D400' : '#1a1a1a',
            }}
          >
            {display(count)}
          </div>
          <div className="text-[10px] font-black uppercase tracking-wider text-[#1a1a1a] leading-tight mb-0.5">
            {label}
          </div>
          <div className="text-[9.5px] text-foreground-400 leading-tight">{sub}</div>
        </div>
      </div>

      {/* Bottom sweep bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-primary-500"
        style={{ width: hovered ? '100%' : '0%', transition: 'width 0.4s ease' }}
      />
    </div>
  );
}

export default function LeistungenStats() {
  const { images: woodIcons } = useMediaStore('leistungen_stats_wood_icons');
  const [countActive, setCountActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const getWoodIcon = (index: number) => {
    const item = woodIcons[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_STAT_ICONS[index];
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setCountActive(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="zahlen"
      className="py-6 md:py-8 px-6 bg-white border-b border-foreground-100 relative overflow-hidden"
    >
      {/* Subtle lime top edge */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8D400] to-transparent opacity-50" />

      <div ref={sectionRef} className="relative z-10 max-w-6xl mx-auto">
        {/* Compact header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="inline-flex items-center gap-1.5 border border-[#C8D400]/40 px-2.5 py-0.5"
              style={{ background: 'rgba(200,212,0,0.06)' }}
            >
              <span className="w-1 h-1 bg-primary-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black text-[#C8D400] uppercase tracking-widest">
                Unsere Zahlen
              </span>
            </div>
            <h2 className="text-base md:text-lg font-black text-[#1a1a1a] leading-none tracking-tight uppercase">
              TRACK RECORD&nbsp;
              <span className="text-[#C8D400]">DER ÜBERZEUGT.</span>
            </h2>
          </div>
          {/* Accent bars */}
          <div className="hidden sm:flex items-center gap-1">
            {[14, 32, 50, 24].map((w, i) => (
              <div
                key={i}
                className="h-[2px] bg-primary-500"
                style={{
                  width: `${w}px`,
                  transform: 'skewX(-20deg)',
                  opacity: [0.2, 0.5, 1, 0.35][i],
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats grid — horizontal row of 4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          {STAT_VALUES.map((val, i) => (
            <StatCard
              key={i}
              value={val}
              display={STAT_DISPLAY[i]}
              label={STAT_LABELS[i]}
              sub={STAT_SUBS[i]}
              woodIcon={getWoodIcon(i)}
              delay={i * 100}
              countActive={countActive}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}