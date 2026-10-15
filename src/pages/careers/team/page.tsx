import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { useText } from '@/hooks/useText';
import { INK } from '../components/ChapterKit';
import WoodenDivider from '@/components/base/WoodenDivider';
import { useCareerPaths, JOBS_ANCHOR } from '../usePathData';
import type { PathTab } from '../content';

/* Karrierepfad detail page — /karriere/team?path=campus | pos (unknown → campus).
   Light Karriere system: white page, dark photo hero, lime accents, no rounded corners. */

const LIME = 'oklch(0.81 0.19 115)';
const RULE = '1px solid oklch(var(--foreground-950) / 0.1)';
const MUTED = 'oklch(var(--foreground-500))';

function hasContent(tab: PathTab): boolean {
  if (tab.id === 'benefits') return tab.items.some((x) => x.trim());
  if (tab.id === 'bewerbung') return tab.steps.some((x) => x.trim());
  return tab.rows.some((r) => r.title.trim() || r.text.trim());
}

function SectionBody({ tab }: { tab: PathTab }) {
  if (tab.id === 'benefits') {
    return (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        {tab.items.filter((x) => x.trim()).map((item) => (
          <li key={item} className="flex items-center gap-3.5 py-3.5" style={{ borderBottom: RULE }}>
            <span className="w-3 h-0.5 flex-shrink-0" style={{ background: LIME }} aria-hidden="true" />
            <span className="text-[15px] font-semibold text-foreground-950">{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (tab.id === 'bewerbung') {
    const steps = tab.steps.filter((x) => x.trim());
    return (
      <ol>
        {steps.map((step, i) => (
          <li key={i} className="grid grid-cols-[48px_1fr]">
            <div className="flex flex-col items-start">
              <span className="w-8 h-8 flex items-center justify-center text-[11px] font-black bg-primary-500 text-foreground-950 tabular-nums" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {i < steps.length - 1 && <span className="ml-[15.5px] w-px flex-1 min-h-[16px]" style={{ background: 'oklch(var(--foreground-950) / 0.2)' }} aria-hidden="true" />}
            </div>
            <p className="text-[16px] font-bold text-foreground-950 pt-1.5 pb-[26px] pl-2">{step}</p>
          </li>
        ))}
      </ol>
    );
  }
  // Gehalt / Wachsen: titled rows
  return (
    <div>
      {tab.id === 'gehalt' && tab.heading && <p className="text-[18px] font-black text-foreground-950 mb-4">{tab.heading}</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
        {tab.rows.filter((r) => r.title.trim() || r.text.trim()).map((r) => (
          <li key={r.title} className="py-4" style={{ borderBottom: RULE }}>
            <span className="flex items-center gap-3.5">
              <span className="w-3 h-0.5 flex-shrink-0" style={{ background: LIME }} aria-hidden="true" />
              <span className="text-[15px] font-black text-foreground-950">{r.title}</span>
            </span>
            <span className="block mt-1.5 pl-[26px] text-[14px] leading-[1.7]" style={{ color: MUTED }}>{r.text}</span>
          </li>
        ))}
      </ul>
      {tab.id === 'gehalt' && tab.note && <p className="mt-5 text-[13px] leading-[1.7]" style={{ color: MUTED }}>{tab.note}</p>}
    </div>
  );
}

export default function CareerTeamPage() {
  const [params] = useSearchParams();
  const paths = useCareerPaths();
  const idx = params.get('path') === 'pos' ? 1 : 0;
  const path = paths[idx];
  const other = paths[1 - idx];

  const tBack = useText('careers_path_page', 'path-page-back', 'Alle Karrierepfade');
  const tIntro = useText('careers_path_page', 'path-page-intro-label', 'Dein Job');
  const tApply = useText('careers_paths', 'careers-paths-apply', 'Jetzt bewerben');
  const tCtaBefore = useText('careers_path_page', 'path-page-cta', 'Bereit für das');
  const tOr = useText('careers_path_page', 'path-page-or', 'Oder lieber');

  useSEO({
    title: `${path.title} | Karriere bei Sonic`,
    description: `${path.subline}: ${path.description}`.slice(0, 158),
    canonical: `https://sonic-group.de/karriere/team?path=${path.slug}`,
    ogTitle: `${path.title} — Karriere bei Sonic`,
    ogDescription: path.subline,
  });

  // Switching team via the cross-link keeps this page mounted → start at the top again
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [path.slug]);

  const sections = path.tabs.filter(hasContent);
  const applyHref = `/karriere#${JOBS_ANCHOR}`;

  return (
    <div className="bg-white min-h-[100dvh] pt-[88px] md:pt-[104px] pb-10 md:pb-14">
      <div className="sonic-container px-5 md:px-10">
        {/* 4.1 Hero */}
        <div className="relative overflow-hidden" style={{ height: 'clamp(420px, 40vw, 520px)', background: INK }}>
          <img src={path.image} alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,.55) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 45%, rgba(10,10,10,.95) 100%)' }} />
          <Link
            to="/karriere#pfade"
            className="absolute left-6 md:left-10 lg:left-16 top-6 md:top-10 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-white hover:text-primary-500 transition-colors"
          >
            <i className="ri-arrow-left-line" aria-hidden="true" />
            {tBack}
          </Link>
          <div className="absolute left-6 right-6 md:left-10 md:right-10 lg:left-16 lg:right-16 bottom-8 md:bottom-12 flex flex-wrap items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: LIME }}>{path.badge}</span>
              <h1 className="font-black text-white" style={{ fontSize: 'clamp(44px, 6vw, 76px)', lineHeight: 0.95, letterSpacing: '-0.03em' }}>{path.title}</h1>
              <p className="text-[15px] font-bold" style={{ color: '#D6D6D6' }}>{path.subline}</p>
            </div>
            <Link
              to={applyHref}
              className="inline-flex items-center gap-2.5 px-[22px] py-4 bg-primary-500 text-foreground-950 text-[11px] font-black uppercase tracking-[0.15em] hover:bg-white transition-colors"
            >
              {tApply}
              <i className="ri-arrow-right-line text-sm" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* 4.2 Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6">
          {path.stats.map((s) => (
            <div key={s.label} className="py-6 flex flex-col gap-1.5" style={{ borderTop: RULE }}>
              <span className="text-[22px] md:text-[24px] font-black text-foreground-950 leading-tight">{s.value}</span>
              <span className="text-[9px] font-extrabold uppercase tracking-[0.15em]" style={{ color: MUTED }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* 4.3 Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-4 lg:gap-12 pt-10 pb-6">
          <div className="flex items-center gap-2.5 lg:items-start lg:pt-1.5">
            <span className="w-[18px] h-0.5 flex-shrink-0 lg:mt-1.5" style={{ background: LIME }} aria-hidden="true" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tIntro}</span>
          </div>
          <p className="text-[18px] md:text-[20px] font-bold leading-[1.6] text-foreground-950">{path.description}</p>
        </div>

      </div>

      {/* Same chapter divider as on /karriere: hero + intro → content */}
      <div className="py-6 md:py-8"><WoodenDivider /></div>

      <div className="sonic-container px-5 md:px-10">
        {/* 4.4 Content sections */}
        {sections.map((tab, i) => (
          <section key={tab.id} className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-6 lg:gap-12 py-10 md:py-12" style={{ borderTop: i === 0 ? 'none' : RULE }}>
            <div className="flex flex-col gap-2.5">
              <span className="text-[11px] font-extrabold tracking-[0.15em] tabular-nums" style={{ color: MUTED }}>{String(i + 1).padStart(2, '0')}</span>
              <h2 className="text-[28px] md:text-[32px] font-black text-foreground-950" style={{ letterSpacing: '-0.01em' }}>{tab.label}</h2>
            </div>
            <SectionBody tab={tab} />
          </section>
        ))}

        {/* 4.5 CTA bar */}
        <div className="mt-6 bg-primary-500 px-6 py-8 md:px-10 md:py-9 flex flex-wrap items-center justify-between gap-6">
          <p className="text-[22px] md:text-[28px] font-black text-foreground-950" style={{ letterSpacing: '-0.01em' }}>
            {tCtaBefore} {path.title}?
          </p>
          <Link
            to={applyHref}
            className="inline-flex items-center gap-2.5 px-[22px] py-4 bg-foreground-950 text-white text-[11px] font-black uppercase tracking-[0.15em] hover:bg-white hover:text-foreground-950 transition-colors"
          >
            {tApply}
            <i className="ri-arrow-right-line text-sm" aria-hidden="true" />
          </Link>
        </div>

        {/* 4.6 Cross-link */}
        <Link
          to={`/karriere/team?path=${other.slug}`}
          className="group flex items-center justify-between gap-6 py-7"
          style={{ borderBottom: RULE }}
        >
          <span className="flex flex-col gap-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]" style={{ color: MUTED }}>{tOr}</span>
            <span className="text-[22px] font-black text-foreground-950 group-hover:text-primary-600 transition-colors">{other.title}</span>
          </span>
          <i className="ri-arrow-right-line text-[22px]" style={{ color: 'oklch(0.55 0.08 115)' }} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
