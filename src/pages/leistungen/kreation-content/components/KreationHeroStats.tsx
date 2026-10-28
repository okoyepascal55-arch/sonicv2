import { useEffect, useMemo, useState } from 'react';
import { useLeistungenText } from '@/hooks/useLeistungenText';

/* Values/labels: Dashboard → Text → Kreation & Content — Hero Kennzahlen & Button.
   A pure number (optionally with ">" / "+", e.g. ">47.000") counts up; text like "Seit 2007" or "Inhouse" is shown as is. */
const NUMERIC = /^\s*(>|\+)?\s*(\d{1,3}(?:\.\d{3})*|\d+)\s*(\+)?\s*$/;

type Stat = { display: string; label: string; target: number | null; prefix: string; suffix: string };

export default function KreationHeroStats() {
  const t = useLeistungenText('leistungen_kreation_hero_stats');
  const stats: Stat[] = useMemo(() => [1, 2, 3].map((n) => {
    const display = t[`s${n}-value`] ?? '';
    const m = display.match(NUMERIC);
    return {
      display,
      label: t[`s${n}-label`] ?? '',
      target: m ? Number(m[2].replace(/\./g, '')) : null,
      prefix: m?.[1] ?? '',
      suffix: m?.[3] ?? '',
    };
  }), [t]);

  const targetsKey = stats.map((s) => s.target ?? '').join('|');
  const [values, setValues] = useState(stats.map(() => 0));

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 1600;
    const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutQuart(progress);
      setValues(stats.map((stat) => Math.round((stat.target ?? 0) * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetsKey]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 mb-12" aria-label="Kreation Kennzahlen">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-black text-foreground-950 tabular-nums">
            {stat.target === null
              ? stat.display
              : `${stat.prefix}${(values[index] ?? 0).toLocaleString('de-DE')}${stat.suffix}`}
          </div>
          <div className="text-foreground-950/30 text-xs font-black uppercase tracking-widest mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
