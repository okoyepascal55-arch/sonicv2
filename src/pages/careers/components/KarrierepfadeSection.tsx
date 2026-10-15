import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useText } from '@/hooks/useText';
import { ChapterHeader, Marker, INK } from './ChapterKit';
import { useCareerPaths, scrollToJobs, JOBS_ANCHOR, type CareerPath } from '../usePathData';

/* Karrierepfade — split-image chooser (15.10.2026, built from the Karrierepfade spec on the
   light Karriere system: white section, dark photo panels, lime accents — same as Spirit & Faces). */

const LIME = 'oklch(0.81 0.19 115)';
const EASE = 'cubic-bezier(0.2, 0.7, 0.2, 1)';

function Stats({ stats, compact = false }: { stats: CareerPath['stats']; compact?: boolean }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
      {stats.map((s) => (
        <div key={s.label} className="min-w-0">
          <p className={`font-black text-white leading-tight ${compact ? 'text-[15px]' : 'text-[16px] md:text-[18px]'}`}>{s.value}</p>
          <p className="mt-1 text-[9px] font-black uppercase tracking-[0.12em] leading-snug" style={{ color: 'rgba(255,255,255,0.62)' }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

function Buttons({ path, apply, details }: { path: CareerPath; apply: string; details: string }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <a
        href={`#${JOBS_ANCHOR}`}
        onClick={(e) => { e.stopPropagation(); scrollToJobs(e); }}
        className="inline-flex items-center gap-2.5 px-5 py-[15px] bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-[0.15em] hover:bg-white transition-colors duration-200"
      >
        {apply}
        <i className="ri-arrow-right-line text-sm" aria-hidden="true" />
      </a>
      <Link
        to={`/karriere/team?path=${path.slug}`}
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-2.5 px-5 py-[15px] text-white text-[11px] font-extrabold uppercase tracking-[0.15em] hover:text-primary-500 hover:border-primary-500 transition-colors duration-200"
        style={{ border: '1px solid rgba(255,255,255,0.4)' }}
      >
        {details}
      </Link>
    </div>
  );
}

export default function KarrierepfadeSection() {
  const tBadge = useText('careers_paths', 'careers-paths-badge', 'Karrierepfade');
  const tHeading = useText('careers_paths', 'careers-paths-heading', 'Zwei Wege. Ein Ziel.');
  const tSub = useText('careers_paths', 'careers-paths-sub', 'Ob am Campus oder am POS – bei uns gibt es einen Weg für dich.');
  const tApply = useText('careers_paths', 'careers-paths-apply', 'Jetzt bewerben');
  const tDetails = useText('careers_paths', 'careers-paths-details', 'Benefits & Ablauf');
  const tOpen = useText('careers_paths', 'careers-paths-open', 'Öffnen');

  const paths = useCareerPaths();
  const [open, setOpen] = useState(0);

  // "Zwei Wege. Ein Ziel." → "Zwei Wege." + marker "Ein Ziel."
  const sentences = tHeading.split('. ').map((s) => (s.endsWith('.') ? s : `${s}.`));
  const headingMain = sentences[0] ?? tHeading;
  const headingAccent = sentences.length > 1 ? sentences.slice(1).join(' ') : '';

  return (
    <section id="pfade" className="bg-white py-10 md:py-14 px-5 md:px-10">
      <div className="sonic-container">
        <ChapterHeader
          n="01"
          eyebrow={tBadge}
          heading={<>{headingMain} {headingAccent && <Marker>{headingAccent}</Marker>}</>}
          sub={tSub}
          headingMax="max-w-full"
          absoluteNumeral={true}
        />

        {/* ── Desktop: two panels side by side, one open ── */}
        <div className="hidden lg:flex gap-2" style={{ height: 'clamp(560px, 46vw, 640px)' }} role="group" aria-label="Karrierepfad auswählen">
          {paths.map((path, i) => {
            const isOpen = i === open;
            return (
              <div
                key={path.slug}
                onClick={() => setOpen(i)}
                className="relative overflow-hidden min-w-0 cursor-pointer"
                style={{ flex: isOpen ? '3 1 0%' : '1 1 0%', background: INK, transition: `flex 0.5s ${EASE}` }}
              >
                <img
                  src={path.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: isOpen ? 'none' : 'grayscale(1) brightness(0.6)', transition: 'filter 0.4s ease' }}
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: isOpen ? 'linear-gradient(180deg, rgba(10,10,10,0) 18%, rgba(10,10,10,0.78) 52%, rgba(10,10,10,0.96) 100%)' : 'linear-gradient(180deg, rgba(10,10,10,0) 30%, rgba(10,10,10,0.92) 100%)', transition: 'background 0.4s ease' }} />
                <span className="absolute top-0 left-0 h-1 pointer-events-none" style={{ width: isOpen ? '100%' : '0%', background: LIME, transition: `width 0.6s ${EASE}` }} aria-hidden="true" />

                <div className="absolute left-9 right-9 bottom-9 flex flex-col gap-[18px]">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: LIME }}>{path.badge}</span>
                  <h3
                    className="font-black text-white leading-none"
                    style={{ fontSize: isOpen ? '60px' : '30px', letterSpacing: '-0.02em', transition: `font-size 0.4s ${EASE}` }}
                  >
                    {path.title}
                  </h3>
                  {isOpen ? (
                    <div className="flex flex-col gap-[22px] max-w-[560px] animate-fadeIn">
                      <p className="text-[14px] leading-[1.7]" style={{ color: '#D6D6D6', textWrap: 'pretty' } as React.CSSProperties}>{path.description}</p>
                      <Stats stats={path.stats} />
                      <Buttons path={path} apply={tApply} details={tDetails} />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setOpen(i); }}
                      className="self-start inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-white hover:text-primary-500 transition-colors"
                      aria-label={`${path.title} ${tOpen.toLowerCase()}`}
                    >
                      {tOpen}
                      <i className="ri-arrow-right-line" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile / tablet: stacked, closed panel 120px, open panel full ── */}
        <div className="lg:hidden flex flex-col gap-2">
          {paths.map((path, i) => {
            const isOpen = i === open;
            return (
              <div
                key={path.slug}
                className="relative overflow-hidden"
                style={{ background: INK, minHeight: isOpen ? 560 : 120, transition: `min-height 0.5s ${EASE}` }}
              >
                <img
                  src={path.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: isOpen ? 'none' : 'grayscale(1) brightness(0.6)', transition: 'filter 0.4s ease' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: isOpen ? 'linear-gradient(180deg, rgba(10,10,10,0.05) 10%, rgba(10,10,10,0.95) 62%)' : 'rgba(10,10,10,0.55)' }} />
                <span className="absolute top-0 left-0 h-1" style={{ width: isOpen ? '100%' : '0%', background: LIME }} aria-hidden="true" />
                {isOpen ? (
                  <div className="relative flex flex-col justify-end gap-4 p-6 animate-fadeIn" style={{ minHeight: 560 }}>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: LIME }}>{path.badge}</span>
                    <h3 className="font-black text-white leading-none text-[40px]" style={{ letterSpacing: '-0.02em' }}>{path.title}</h3>
                    <p className="text-[14px] leading-[1.7]" style={{ color: '#D6D6D6' }}>{path.description}</p>
                    <Stats stats={path.stats} compact />
                    <Buttons path={path} apply={tApply} details={tDetails} />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className="relative w-full h-[120px] flex items-end justify-between gap-4 p-6 text-left"
                    aria-expanded={false}
                  >
                    <span className="block">
                      <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] mb-2" style={{ color: LIME }}>{path.badge}</span>
                      <span className="block font-black text-white text-[26px] leading-none" style={{ letterSpacing: '-0.02em' }}>{path.title}</span>
                    </span>
                    <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-white">
                      {tOpen}
                      <i className="ri-arrow-right-line" aria-hidden="true" />
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
