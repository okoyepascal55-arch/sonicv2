import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { WoodIcon, SrtHeader, MONO, HAIR, MUTED } from './SrtKit';

const PROBLEMS = [
  {
    num: '01', sys: 'Datensilos',
    title: 'Getrennte Datensilos',
    headline: 'Daten liegen überall — nur nicht zusammen.',
    body: 'WaWi, Marketing, Einsatzplanung — jede Abteilung eine eigene Wahrheit. Ein ganzheitliches Bild entsteht nur durch aufwendige manuelle Zusammenführung.',
    impact: 'Entscheidungen basieren auf Schnipseln statt vollständigen Fakten.',
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20separated%20fragmented%20database%20cylinder%20storage%20units%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20isolated%20data%20sources%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-db-srt-problem-1&orientation=squarish',
  },
  {
    num: '02', sys: 'Blinder Fleck',
    title: 'Keine Dashboards',
    headline: 'Was du nicht siehst, kannst du nicht steuern.',
    body: 'Ohne gemeinsame Datenbasis: keine aussagekräftigen KPIs, kein Live-Monitoring. Kampagnen-Performance wird Wochen später sichtbar — zu spät zum Eingreifen.',
    impact: 'Fehlgeleitete Ressourcen. Verpasste Optimierungsfenster.',
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20monitor%20computer%20screen%20dashboard%20display%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20empty%20screen%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-screen-srt-problem-2&orientation=squarish',
  },
  {
    num: '03', sys: 'Späte Signale',
    title: 'Verspätete Erkenntnisse',
    headline: 'Wer zu spät sieht, verliert den Marktanteil.',
    body: 'Excel-Konsolidierungen, wöchentliche Status-Meetings — das kostet Zeit, die am Markt fehlt. Schlechte Kampagnen-Performance erfährt das Management erst Tage später.',
    impact: 'Reaktiv statt proaktiv. Der Wettbewerb handelt schneller.',
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20clock%20hourglass%20time%20delay%20waiting%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20time%20passing%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-clock-srt-problem-3&orientation=squarish',
  },
];

export default function TheProblemReference() {
  const { images: woodIcons } = useMediaStore('srt_problem_wood_icons');
  const getWoodIcon = (idx: number) => woodIcons[idx]?.url ? resolveImageUrl(woodIcons[idx].url) : PROBLEMS[idx].woodIcon;

  // Dashboard → Text → SRT → „SRT — Kurzlabels (Problem & Zahlen)“
  const lb = useReviewText('srt_short_labels');
  const tBadge   = useText('srt_problem', 'srt-problem-badge',   'Deine Herausforderung');
  const tHeading = useText('srt_problem', 'srt-problem-heading', 'Datenquellen zusammenführen');
  const tSub     = useText('srt_problem', 'srt-problem-p1',      'Für erfolgreiche Retail- und Field-Force-Projekte müssen Daten aus vielen Quellen live zusammenlaufen. Genau daran scheitern viele Projekte — nicht an der Strategie, sondern an der Infrastruktur.');
  const tCta     = useText('srt_problem', 'srt-problem-cta-btn', 'Lösung ansehen');

  return (
    <section id="das-problem" className="relative bg-white py-16 md:py-24 px-4 md:px-6">
      <div className="sonic-container">
        <SrtHeader
          eyebrow={tBadge}
          title={tHeading}
          side={<>
            <p className="mb-5">{tSub}</p>
            <button type="button"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-foreground-950 hover:text-primary-600 transition-colors cursor-pointer">
              {tCta} <i className="ri-arrow-down-line" aria-hidden="true" />
            </button>
          </>}
        />

        {/* Three problems — calm columns divided by hairlines (light redesign 22.10.2026) */}
        <div className="grid md:grid-cols-3" style={{ borderTop: `1px solid ${HAIR}` }}>
          {PROBLEMS.map((p, i) => (
            <div key={p.num} className={`flex flex-col pt-10 pb-2 md:pb-0 ${i > 0 ? 'md:pl-10' : ''} ${i < 2 ? 'md:pr-10 md:border-r' : ''} ${i > 0 ? 'border-t md:border-t-0' : ''}`} style={{ borderColor: HAIR }}>
              <div className="flex items-start justify-between mb-8">
                <WoodIcon src={getWoodIcon(i)} alt={p.title} size={56} delay={i * 140} />
                <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.35)' }}>{p.num} — {lb[`problem-${i + 1}`] || p.sys}</span>
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] mb-3" style={{ color: 'oklch(0.55 0.08 115)' }}>{p.title}</p>
              <h3 className="text-[21px] md:text-[23px] font-black text-foreground-950 leading-snug mb-4" style={{ letterSpacing: '-0.015em' }}>{p.headline}</h3>
              <p className="text-[15px] leading-relaxed flex-1" style={{ color: MUTED }}>{p.body}</p>
              <p className="mt-8 pt-5 text-[13px] leading-snug text-foreground-950/75 flex gap-2.5" style={{ borderTop: `1px solid ${HAIR}` }}>
                <i className="ri-arrow-right-down-line text-primary-600 flex-shrink-0" aria-hidden="true" />{p.impact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
