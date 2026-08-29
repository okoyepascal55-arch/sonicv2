import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const PROBLEMS = [
  {
    num: '01', icon: 'ri-database-2-line',
    title: 'Getrennte Datensilos',
    headline: 'Daten liegen überall — nur nicht zusammen.',
    body: 'Die Realität im Retail: WaWi-Daten hier, Kampagnendaten dort, Einsatzplanung in einem Drittanbieter-Tool. Jede Abteilung pflegt ihre eigene Wahrheit. Ein ganzheitliches Bild der Performance entsteht — wenn überhaupt — nur durch aufwendige manuelle Zusammenführung.',
    impact: 'Entscheidungen basieren auf Datenschnipseln statt auf der vollständigen Realität.',
    tags: ['WaWi', 'Marketing', 'Silos'],
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20separated%20fragmented%20database%20cylinder%20storage%20units%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20isolated%20data%20sources%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-db-srt-problem-1&orientation=squarish',
  },
  {
    num: '02', icon: 'ri-eye-off-line',
    title: 'Keine Dashboards',
    headline: 'Was du nicht siehst, kannst du nicht steuern.',
    body: 'Ohne eine gemeinsame Datenbasis ist es schlicht unmöglich, aussagekräftige KPIs zu definieren und live zu monitoren. Kampagnen-Performance wird erst nach Wochen sichtbar — oft zu spät, um noch einzugreifen.',
    impact: 'Fehlgeleitete Ressourcen, verpasste Optimierungsfenster, frustrierte Stakeholder.',
    tags: ['KPI', 'Monitoring', 'Echtzeit'],
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20monitor%20computer%20screen%20dashboard%20display%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20empty%20screen%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-screen-srt-problem-2&orientation=squarish',
  },
  {
    num: '03', icon: 'ri-time-line',
    title: 'Verspätete Erkenntnisse',
    headline: 'Wer zu spät kommt, verliert den Marktanteil.',
    body: 'Manuelle Auswertungen, Excel-Konsolidierungen, wöchentliche Meetings nur um Datenstände zu berichten — das kostet Zeit, die am Markt fehlt. Wenn eine Kampagne schlecht läuft, erfährt das Management es erst Tage später.',
    impact: 'Reaktives statt proaktives Management. Wettbewerber, die schneller sehen, agieren schneller.',
    tags: ['Insights', 'Echtzeit', 'Reaktiv'],
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20clock%20hourglass%20time%20delay%20waiting%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20time%20passing%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-clock-srt-problem-3&orientation=squarish',
  },
];

export default function TheProblemReference() {
  const { images: woodIcons } = useMediaStore('srt_problem_wood_icons');
  const getWoodIcon = (idx: number) => woodIcons[idx]?.url ? resolveImageUrl(woodIcons[idx].url) : PROBLEMS[idx].woodIcon;
  const tBadge   = useText('srt_problem', 'srt-problem-badge',   'Deine Herausforderung');
  const tHeading = useText('srt_problem', 'srt-problem-heading', 'Datenquellen zusammenführen');
  const tIntro   = useText('srt_problem', 'srt-problem-p1',     'Für effizientes Performance-Marketing müssen Daten aus vielen Quellen in Echtzeit zusammenlaufen. Genau daran scheitern die meisten Unternehmen — nicht an der Strategie, sondern an der Infrastruktur.');
  const tCta     = useText('srt_problem', 'srt-problem-cta',    'Das SRT löst alle drei Probleme.');
  const tCtaSub  = useText('srt_problem', 'srt-problem-cta-sub','Eine Plattform. Alle Daten. Echtzeit.');
  const tCtaBtn  = useText('srt_problem', 'srt-problem-cta-btn','Lösung ansehen');

  return (
    <section id="das-problem" className="relative overflow-hidden bg-white px-6" style={{ paddingTop: 88, paddingBottom: 88 }}>
      {/* Ghost watermark */}
      <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none"
        style={{ fontSize: 'clamp(120px,18vw,220px)', color: 'transparent', WebkitTextStroke: '1px rgba(0,0,0,0.04)', letterSpacing: '-0.05em' }}>
        PROBLEM
      </div>

      <div className="max-w-[1280px] mx-auto relative">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="flex items-center gap-3">
            <span className="w-7 h-0.5 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-700">{tBadge}</span>
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary-500/30 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 items-end">
          <h2 className="sonic-h2 text-foreground-950 uppercase">{tHeading}</h2>
          <div className="md:pl-8 border-l-2 border-primary-500/40">
            <p className="text-base text-foreground-700 leading-relaxed mb-4">{tIntro}</p>
            <p className="text-sm text-foreground-500 leading-relaxed">Die drei häufigsten Probleme — und die direkte Antwort des SRT.</p>
          </div>
        </div>

        {/* Always-visible 3-col problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground-950/[0.08]">
          {PROBLEMS.map((problem, idx) => (
            <div key={problem.num} className="bg-white relative overflow-hidden group flex flex-col">
              {/* Lime top accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div className="p-8 flex flex-col flex-1">
                {/* Number + icon row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-black tabular-nums text-[56px] leading-none" style={{ color: 'rgba(0,0,0,0.06)', WebkitTextStroke: '1px rgba(0,0,0,0.10)' }}>
                    {problem.num}
                  </span>
                  <div className="w-12 h-12 overflow-hidden flex-shrink-0">
                    <img src={getWoodIcon(idx)} alt={problem.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>

                {/* Category */}
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 mb-2">{problem.title}</p>

                {/* Headline */}
                <h3 className="text-xl font-black leading-snug tracking-tight uppercase text-foreground-950 mb-4">
                  {problem.headline}
                </h3>

                {/* Body — always visible */}
                <p className="text-sm text-foreground-600 leading-relaxed flex-1">
                  {problem.body}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {problem.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black px-2.5 py-1 uppercase tracking-widest text-primary-600 bg-primary-500/10 border border-primary-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact bar — pinned to bottom */}
              <div className="bg-foreground-950 px-8 py-4 flex items-start gap-3">
                <i className="ri-alert-line text-primary-500 text-sm mt-0.5 flex-shrink-0" />
                <p className="text-xs text-white/65 leading-relaxed">{problem.impact}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-px flex flex-col sm:flex-row items-center justify-between gap-6 bg-foreground-950 px-8 py-6">
          <div>
            <p className="text-white font-black text-base leading-tight mb-1">
              <span className="text-primary-500">{tCta.split('.')[0]}.</span>
              {tCta.includes('.') ? ` ${tCta.split('.').slice(1).join('.')}` : ''}
            </p>
            <p className="text-foreground-500 text-sm">{tCtaSub}</p>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="flex items-center gap-2 bg-primary-500 text-foreground-950 px-7 py-3.5 font-black text-sm uppercase tracking-widest whitespace-nowrap"
          >
            {tCtaBtn}
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}
