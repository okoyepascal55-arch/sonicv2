import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const PROBLEMS = [
  {
    num: '01', sys: 'DATA.SILOS',
    title: 'Getrennte Datensilos',
    headline: 'Daten liegen überall — nur nicht zusammen.',
    body: 'WaWi, Marketing, Einsatzplanung — jede Abteilung eine eigene Wahrheit. Ein ganzheitliches Bild entsteht nur durch aufwendige manuelle Zusammenführung.',
    impact: 'Entscheidungen basieren auf Schnipseln statt vollständigen Fakten.',
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20separated%20fragmented%20database%20cylinder%20storage%20units%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20isolated%20data%20sources%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-db-srt-problem-1&orientation=squarish',
  },
  {
    num: '02', sys: 'BLIND.SPOT',
    title: 'Keine Dashboards',
    headline: 'Was du nicht siehst, kannst du nicht steuern.',
    body: 'Ohne gemeinsame Datenbasis: keine aussagekräftigen KPIs, kein Live-Monitoring. Kampagnen-Performance wird Wochen später sichtbar — zu spät zum Eingreifen.',
    impact: 'Fehlgeleitete Ressourcen. Verpasste Optimierungsfenster.',
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20monitor%20computer%20screen%20dashboard%20display%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20empty%20screen%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-screen-srt-problem-2&orientation=squarish',
  },
  {
    num: '03', sys: 'LATE.SIGNAL',
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

  const tBadge   = useText('srt_problem', 'srt-problem-badge',   'Deine Herausforderung');
  const tHeading = useText('srt_problem', 'srt-problem-heading', 'Datenquellen zusammenführen');
  const tSub     = useText('srt_problem', 'srt-problem-p1',      'Für effizientes Performance-Marketing müssen Daten aus vielen Quellen in Echtzeit zusammenlaufen. Genau daran scheitern die meisten Unternehmen — nicht an der Strategie, sondern an der Infrastruktur.');
  const tCta     = useText('srt_problem', 'srt-problem-cta-btn', 'Lösung ansehen');

  return (
    <section id="das-problem" className="relative overflow-hidden bg-foreground-950 py-20 md:py-28 px-4 md:px-6">
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(oklch(0.81 0.19 115) 1px, transparent 1px), linear-gradient(90deg, oklch(0.81 0.19 115) 1px, transparent 1px)', backgroundSize: '52px 52px' }}
        aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Section header — 2 col */}
        <div className="grid md:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
            </div>
            <h2 className="sonic-h2 text-white uppercase">{tHeading}</h2>
          </div>
          <div className="md:border-l md:border-white/10 md:pl-10">
            <p className="text-sm text-white/45 leading-relaxed mb-6">{tSub}</p>
            <button type="button"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary-500 hover:text-white transition-colors cursor-pointer">
              {tCta} <i className="ri-arrow-down-line" />
            </button>
          </div>
        </div>

        {/* 3 problem cards — horizontal strip */}
        <div className="grid md:grid-cols-3 gap-[1px]" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {PROBLEMS.map((p, i) => (
            <div key={p.num} className="relative flex flex-col bg-foreground-950 p-8 md:p-10 group transition-all duration-300 hover:bg-white/[0.03]">
              {/* Top lime sweep on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              {/* Sys label */}
              <span className="text-[8px] font-black uppercase tracking-[0.3em] mb-6 block" style={{ color: 'oklch(0.81 0.19 115 / 0.4)' }}>{p.sys}</span>

              {/* Icon + number row */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 overflow-hidden" style={{ border: '1px solid oklch(0.81 0.19 115 / 0.2)', background: 'oklch(0.81 0.19 115 / 0.06)' }}>
                  <img src={getWoodIcon(i)} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="font-black leading-none" style={{ fontSize: 64, color: 'rgba(255,255,255,0.05)', lineHeight: 1, WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}>
                  {p.num}
                </span>
              </div>

              {/* Content */}
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary-500/60 mb-2">{p.title}</p>
              <h3 className="text-[17px] md:text-[20px] font-black text-white leading-snug mb-4 uppercase">{p.headline}</h3>
              <p className="text-[12px] text-white/40 leading-relaxed flex-1">{p.body}</p>

              {/* Impact — bottom chip */}
              <div className="mt-6 flex items-start gap-2 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <i className="ri-error-warning-line text-primary-500/70 text-sm flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-white/35 leading-snug">{p.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
