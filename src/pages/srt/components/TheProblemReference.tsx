import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { WoodIcon, WindowBar, ProductGrid, Mono } from './SrtKit';

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
    <section id="das-problem" className="relative overflow-hidden bg-foreground-950 py-10 md:py-14 px-4 md:px-6">
      <ProductGrid />

      <div className="sonic-container relative z-10">
        {/* Section header — 2 col */}
        <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
            </div>
            <h2 className="sonic-h2 text-white ">{tHeading}</h2>
          </div>
          <div className="md:border-l md:border-white/10 md:pl-10">
            <p className="text-[15px] text-white/60 leading-relaxed mb-6">{tSub}</p>
            <button type="button"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-500 hover:text-white transition-colors cursor-pointer">
              {tCta} <i className="ri-arrow-down-line" />
            </button>
          </div>
        </div>

        {/* 3 problem cards — app panels (22.10.2026): window bar, animated wooden icon, mono labels */}
        <div className="grid md:grid-cols-3 gap-3">
          {PROBLEMS.map((p, i) => (
            <div key={p.num} className="relative flex flex-col group transition-colors duration-300" style={{ background: 'oklch(0.155 0.006 118)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
              <WindowBar title={lb[`problem-${i + 1}`] || p.sys} status="" />
              <div className="flex flex-col flex-1 p-7 md:p-8">
                <div className="flex items-start justify-between mb-7">
                  <WoodIcon src={getWoodIcon(i)} alt={p.title} size={60} delay={i * 140} />
                  <Mono dim>{p.num} / 03</Mono>
                </div>
                <Mono className="mb-2.5 block">{p.title}</Mono>
                <h3 className="text-[19px] md:text-[21px] font-black text-white leading-snug mb-4">{p.headline}</h3>
                <p className="text-[14px] text-white/55 leading-relaxed flex-1">{p.body}</p>
                <div className="mt-7 flex items-start gap-2.5 px-3.5 py-3" style={{ background: 'oklch(0.81 0.19 115 / 0.06)', border: '1px solid oklch(0.81 0.19 115 / 0.18)' }}>
                  <i className="ri-error-warning-line text-primary-500 text-sm flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-[12px] text-white/70 leading-snug">{p.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
