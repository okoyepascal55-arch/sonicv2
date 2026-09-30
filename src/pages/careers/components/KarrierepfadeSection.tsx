import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { ChapterHeader, Marker } from './ChapterKit';
import { useKarrierePath } from '../useKarriereText';
import type { PathTab } from '../content';

/* Small square pill — same language as the Kultur tags (flat, lime hairline). */
const pillBase = 'px-3 py-1.5 text-[10px] md:text-[11px] font-black uppercase tracking-[0.12em] transition-colors duration-200 cursor-pointer';

function PathTabs({ tabs }: { tabs: PathTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0];
  if (!tab) return null;
  const hair = '1px solid oklch(var(--foreground-950) / 0.08)';
  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => {
          const on = t.id === tab.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t.id)}
              className={`${pillBase} ${on ? 'bg-primary-500 text-foreground-950' : 'text-foreground-950/70 hover:text-foreground-950'}`}
              style={{ border: on ? '1px solid oklch(var(--primary-500))' : '1px solid oklch(var(--primary-500) / 0.45)' }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 p-5 md:p-6 lg:min-h-[268px]" role="tabpanel" style={{ border: hair, background: 'oklch(var(--foreground-950) / 0.02)' }}>
        {tab.id === 'gehalt' && (
          <>
            <p className="text-[13px] font-black text-foreground-950 mb-4">{tab.heading}</p>
            <ul className="space-y-3">
              {tab.rows.map((r) => (
                <li key={r.title} className="grid grid-cols-1 sm:grid-cols-[132px_1fr] gap-1 sm:gap-3 items-baseline">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-primary-600">{r.title}</span>
                  <span className="text-[13px] leading-[1.6]" style={{ color: 'oklch(var(--foreground-600))' }}>{r.text}</span>
                </li>
              ))}
            </ul>
            <p className="text-[12px] mt-4 pt-4" style={{ borderTop: hair, color: 'oklch(var(--foreground-500))' }}>{tab.note}</p>
          </>
        )}
        {tab.id === 'benefits' && (
          <div className="flex flex-wrap gap-2">
            {tab.items.map((it) => (
              <span key={it} className="px-2.5 py-1 text-[11px] font-bold text-foreground-950/75" style={{ border: '1px solid oklch(var(--foreground-950) / 0.12)', background: '#fff' }}>
                {it}
              </span>
            ))}
          </div>
        )}
        {tab.id === 'wachsen' && (
          <ul className="space-y-3">
            {tab.rows.map((r) => (
              <li key={r.title} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-3 items-baseline">
                <span className="text-[12px] font-black text-foreground-950">{r.title}</span>
                <span className="text-[13px] leading-[1.6]" style={{ color: 'oklch(var(--foreground-600))' }}>{r.text}</span>
              </li>
            ))}
          </ul>
        )}
        {tab.id === 'bewerbung' && (
          <ol className="space-y-2.5">
            {tab.steps.map((st, i) => (
              <li key={i} className="flex items-baseline gap-3">
                <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-[11px] font-black bg-foreground-950 text-primary-500 tabular-nums">{i + 1}</span>
                <span className="text-[13px] leading-[1.6]" style={{ color: 'oklch(var(--foreground-600))' }}>{st}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

type PathId = 'sales' | 'staff';

const PATHS: Array<{ id: PathId; badge: string; fallbackImage: string; email: string }> = [
  { id: 'sales', badge: 'Krefeld', fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png', email: 'karriere@sonic-group.de' },
  { id: 'staff', badge: 'Deutschlandweit', fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2023/02/POS_NEU.jpg', email: 'staffjobs@sonic-group.de' },
];

export default function KarrierepfadeSection() {
  const { images: pathImages } = useMediaStore('careers_path_images');

  const tBadge = useText('careers_paths', 'careers-paths-badge', 'Karrierepfade');
  const tHeading = useText('careers_paths', 'careers-paths-heading', 'Zwei Wege. Ein Ziel.');
  const tSub = useText('careers_paths', 'careers-paths-sub', 'Ob am Campus oder am POS – bei uns gibt es einen Weg für dich.');
  const tSalesBadge = useText('careers_paths', 'careers-paths-sales-badge', 'Krefeld');
  const tSalesHeadline = useText('careers_paths', 'careers-paths-sales-headline', 'Dein Job am Campus in Krefeld');
  const tSalesDesc = useText('careers_paths', 'careers-paths-sales-desc', 'Projektmanagement, HR, IT, Finance, Kreation: Hier planen und steuern wir die Projekte unserer Kunden. Mit klaren Aufgaben, Mentoring, hybridem Arbeiten und einem Team, das zusammenhält.');
  const tStaffBadge = useText('careers_paths', 'careers-paths-staff-badge', 'Deutschlandweit');
  const tStaffHeadline = useText('careers_paths', 'careers-paths-staff-headline', 'Dein Einsatz am Point of Sale');
  const tStaffDesc = useText('careers_paths', 'careers-paths-staff-desc', 'Du berätst, verkaufst und präsentierst Marken wie Garmin, Canon oder Groupe SEB direkt im Handel – deutschlandweit, mit festen Einsatzorten und -zeiten. Vor jedem Projekt wirst du geschult, und im Projektteam hast du einen festen Ansprechpartner.');
  const tApply = useText('careers_paths', 'careers-paths-apply', 'Initiativbewerbung senden');
  const tAside = useText('careers_paths', 'careers-paths-aside', 'Nicht sicher, welcher Weg zu dir passt? Schick uns eine Initiativbewerbung – wir finden gemeinsam die passende Aufgabe.');

  // Titles, stats and tabs: Dashboard → Text → Karriere → „Karriere — Campus Team & POS Team“
  const sales = useKarrierePath('sales');
  const staff = useKarrierePath('staff');
  const details = { sales, staff };

  const resolvedPaths = PATHS.map((path, i) => ({
    ...path,
    title: details[path.id].title,
    stats: details[path.id].stats,
    tabs: details[path.id].tabs,
    badge: path.id === 'sales' ? tSalesBadge : tStaffBadge,
    headline: path.id === 'sales' ? tSalesHeadline : tStaffHeadline,
    tagline: path.id === 'sales' ? tSalesDesc : tStaffDesc,
    image: pathImages[i]?.url || path.fallbackImage,
  }));

  // Split "Zwei Wege. Ein Ziel." → main "Zwei Wege." / marker "Ein Ziel."
  const sentences = tHeading.split('. ').map((s) => (s.endsWith('.') ? s : `${s}.`));
  const headingMain = sentences[0] ?? tHeading;
  const headingAccent = sentences.length > 1 ? sentences.slice(1).join(' ') : '';

  return (
    <section id="pfade" className="bg-white py-20 md:py-[104px] px-5 md:px-10">
      <div className="sonic-container">
        {/*
          absoluteNumeral — removes "01" from flex flow so heading/sub align
          flush-left with the path cards below. Numeral floats top-right decoratively.
        */}
        <ChapterHeader
          n="01"
          eyebrow={tBadge}
          heading={<>{headingMain} {headingAccent && <Marker>{headingAccent}</Marker>}</>}
          sub={tSub}
          headingMax="max-w-[620px]"
          absoluteNumeral={true}
          aside={
            <p
              className="text-[12px] font-bold leading-[1.7] tracking-[0.04em] uppercase pl-6"
              style={{ borderLeft: '1px solid oklch(var(--foreground-950) / 0.12)', color: 'oklch(var(--foreground-500))' }}
            >
              {tAside}
            </p>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0.5">
          {resolvedPaths.map((path) => (
            <div key={path.id} className="flex flex-col" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
              {/* Image */}
              <div className="relative h-[280px] md:h-[340px] overflow-hidden" style={{ background: 'oklch(0.13 0.005 118)' }}>
                <img src={path.image} alt={`${path.title} — ${path.headline}`} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.92) 0%, rgba(10,11,9,0.2) 60%, transparent 100%)' }} />
                <div
                  className="absolute top-5 left-5 px-3.5 py-[7px] text-[10px] font-black uppercase tracking-[0.2em] text-primary-500"
                  style={{ background: 'rgba(12,13,11,0.42)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  {path.badge}
                </div>
                <div className="absolute left-0 right-0 bottom-0 p-7">
                  <p className="text-3xl md:text-[44px] font-black leading-none tracking-[-0.035em] text-white mb-2.5">{path.title}</p>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1 h-1 bg-primary-500" />
                    <span className="text-[13px] font-black text-white">{path.headline}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 p-7 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-[15px] leading-[1.75] mb-8 lg:min-h-[105px]" style={{ color: 'oklch(var(--foreground-500))' }}>
                    {path.tagline}
                  </p>
                  <div className="grid grid-cols-2" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.08)', borderLeft: '1px solid oklch(var(--foreground-950) / 0.08)' }}>
                    {path.stats.map((s) => (
                      <div key={s.label} className="px-4 md:px-5 py-[18px] min-w-0" style={{ borderRight: '1px solid oklch(var(--foreground-950) / 0.08)', borderBottom: '1px solid oklch(var(--foreground-950) / 0.08)' }}>
                        <p className="text-[19px] md:text-[22px] font-black leading-none tracking-[-0.03em] text-foreground-950 tabular-nums mb-1.5">{s.value}</p>
                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.16em] leading-snug" style={{ color: 'oklch(var(--foreground-400))' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <PathTabs tabs={path.tabs} />
                </div>
                <a
                  href={`mailto:${path.email}?subject=Initiativbewerbung`}
                  className="mt-8 inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-foreground-950 text-white text-[11px] font-black uppercase tracking-[0.14em] hover:bg-primary-500 hover:text-foreground-950 transition-colors duration-200 cursor-pointer"
                >
                  {tApply}
                  <i className="ri-arrow-right-line text-sm" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
