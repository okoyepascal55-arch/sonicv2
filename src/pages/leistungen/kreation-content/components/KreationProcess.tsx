import { useEffect, useRef, useState } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { useLeistungenText, splitList } from '@/hooks/useLeistungenText';

/* Lösung as one process line (28.10.2026) — replaces the four separate cards and the
   Disziplinen strip. Texts: Text → Kreation & Content — Lösung (Karten) + Solution Heading/Sub.
   Icons: Media → Kreation — Lösung Wood Icons (unchanged slot). One orchestrated reveal:
   the lime line draws across, the wooden icons land on it one after another. */
type Step = { num: string; icon: string; title: string; desc: string; tags: string[] };

export default function KreationProcess({ fallbackIcons }: { fallbackIcons: string[] }) {
  const { images: woodIcons } = useMediaStore('leistungen_kreation_solution_wood_icons');
  const tSol = useLeistungenText('leistungen_kreation_solutions');
  const tHeading = useText('leistungen_kreation_content', 'kreation-solution-heading', 'Content aus einer Hand. Inhouse.');
  const tSub = useText('leistungen_kreation_content', 'kreation-solution-sub', 'Ein Team für Konzept, Design und Rollout.');
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setShown(true); return; }
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps: Step[] = [0, 1, 2, 3].map((i) => ({
    num: String(i + 1).padStart(2, '0'),
    icon: woodIcons[i]?.url ? resolveImageUrl(woodIcons[i].url) : fallbackIcons[i],
    title: tSol[`c${i + 1}-title`] ?? '',
    desc: tSol[`c${i + 1}-desc`] ?? '',
    tags: splitList(tSol[`c${i + 1}-tags`]),
  }));

  return (
    <section id="loesung" className="sonic-section-md px-4 md:px-6 bg-white">
      <div className="sonic-container">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tSol['eyebrow']}</span></div>
            <h2 className="sonic-h2 text-foreground-950">{tHeading}</h2>
          </div>
          <p className="text-[15px] md:text-[16px] leading-relaxed max-w-md text-foreground-500">{tSub}</p>
        </div>

        <div ref={ref} className="relative">
          {/* The line — horizontal on desktop, vertical on mobile */}
          <div className="hidden lg:block absolute left-0 right-0 h-0.5 bg-foreground-950/10" style={{ top: 36 }} aria-hidden="true">
            <div className="h-full bg-primary-500 origin-left" style={{ transform: `scaleX(${shown ? 1 : 0})`, transition: 'transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)' }} />
          </div>
          <div className="lg:hidden absolute top-0 bottom-0 w-0.5 bg-foreground-950/10" style={{ left: 35 }} aria-hidden="true">
            <div className="w-full h-full bg-primary-500 origin-top" style={{ transform: `scaleY(${shown ? 1 : 0})`, transition: 'transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)' }} />
          </div>

          <ol className="relative grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.num} className="group relative flex lg:flex-col gap-6 lg:gap-0">
                <div className="relative flex-shrink-0 w-[72px] h-[72px] bg-white p-1.5 lg:mb-7" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
                  <img
                    src={s.icon}
                    alt=""
                    className={`srt-wood w-full h-full object-cover ${shown ? 'srt-wood-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.35 + i * 0.3}s` }}
                    loading="lazy"
                  />
                  <span className="absolute -top-2.5 -right-2.5 bg-foreground-950 text-primary-500 text-[10px] font-black tabular-nums px-1.5 py-0.5">{s.num}</span>
                </div>
                <div className="min-w-0 pt-1 lg:pt-0 lg:pr-4">
                  <h3 className="text-foreground-950 font-black text-lg leading-tight tracking-tight mb-3">{s.title}</h3>
                  <p className="text-foreground-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-0.5 text-foreground-950 bg-primary-500/10 border border-primary-500/25">{tag}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
