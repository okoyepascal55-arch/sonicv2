import { useEffect, useState } from 'react';

const STATS = [
  { target: 480, suffix: '+', label: 'Kampagnen' },
  { target: 12000, suffix: '+', label: 'Assets produziert' },
  { target: 6, suffix: '', label: 'Inhouse-Studios' },
];

export default function KreationHeroStats() {
  const [started, setStarted] = useState(false);
  const [values, setValues] = useState(STATS.map(() => 0));

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    setStarted(true);
    const duration = 1600;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutQuart(progress);
      setValues(STATS.map(stat => Math.round(stat.target * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-10 mb-12" aria-label="Kreation Kennzahlen">
      {STATS.map((stat, index) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl font-black text-foreground-950 tabular-nums">
            {started ? values[index].toLocaleString('de-DE') : '0'}{stat.suffix}
          </div>
          <div className="text-foreground-950/30 text-xs font-black uppercase tracking-widest mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
