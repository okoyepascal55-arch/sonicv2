import SectionBadge from '@/components/base/SectionBadge';
import { useText } from '@/hooks/useText';

export default function AlwaysIncluded() {
  const tBadge = useText('losungen_always', 'losungen-always-badge', 'Immer dabei');
  const tHeading = useText('losungen_always', 'losungen-always-heading', 'GANZ GLEICH WO DU STEHST');
  const tSub = useText('losungen_always', 'losungen-always-sub', 'Du bekommst immer das vollständige Paket — ohne Extras, ohne Überraschungen.');
  const features = [
    {
      icon: 'ri-team-line',
      title: 'FESTANGESTELLTE TALENTE',
      description: 'Aus unserem Pool von 2.000 Markenbotschaftern. Geschult, motiviert, zuverlässig — keine Freelancer.',
      image: 'https://readdy.ai/api/search-image?query=wooden%20team%20people%20group%20talent%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-always-team-v2&orientation=squarish',
      stat: '>2.000',
      statLabel: 'Talente im Pool',
    },
    {
      icon: 'ri-bar-chart-box-line',
      title: 'DATENBASIERTE PLANUNG',
      description: 'Das Sonic Reporting Tool (SRT) liefert Forecasts, Standortanalysen und ROI-Prognosen. Keine Bauchentscheidungen.',
      image: 'https://readdy.ai/api/search-image?query=wooden%20data%20analytics%20chart%20graph%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-always-data-v2&orientation=squarish',
      stat: '100%',
      statLabel: 'Datenbasiert',
    },
    {
      icon: 'ri-dashboard-line',
      title: 'LIVE-REPORTING VIA SRT',
      description: 'Echtzeit-Dashboards, angedockt an deine Software. Volle Transparenz, null Blackbox — ab Tag 1.',
      image: 'https://readdy.ai/api/search-image?query=wooden%20dashboard%20monitor%20screen%20display%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-always-dash-v2&orientation=squarish',
      stat: 'Live',
      statLabel: 'Echtzeit-Zugriff',
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header — homepage style */}
        <div className="text-center mb-16">
          <SectionBadge text={tBadge} variant="dark" className="mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4 leading-tight tracking-tight uppercase">
            GANZ GLEICH WO<br />
            <span className="text-[#1a1a1a]">DU STEHST</span>
          </h2>
          <p className="text-base text-foreground-600 max-w-xl mx-auto mt-4">
            {tSub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="skeu-card group relative bg-white overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default"
              style={{
                boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'linear-gradient(145deg, #1a1a1a 0%, #111 100%)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 28px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(200,212,0,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#ffffff';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.06)';
              }}
            >
              {/* Lime top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500/30 group-hover:h-[3px] group-hover:bg-primary-500 transition-all duration-500" style={{ boxShadow: undefined }} />

              <div className="p-8 flex flex-col h-full min-h-[320px]">
                {/* Wooden icon */}
                <div
                  className="w-16 h-16 overflow-hidden mb-6 transition-all duration-500"
                  style={{ outline: '1px solid rgba(0,0,0,0.08)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.outline = '1px solid rgba(200,212,0,0.4)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.outline = '1px solid rgba(0,0,0,0.08)'; }}
                >
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                </div>

                {/* Stat badge */}
                <div className="inline-flex items-baseline gap-1.5 mb-4">
                  <span className="text-3xl font-black text-[#C8D400] leading-none">{feature.stat}</span>
                  <span className="text-xs font-black text-foreground-400 uppercase tracking-wide group-hover:text-white/40 transition-colors duration-500">{feature.statLabel}</span>
                </div>

                <h3 className="text-sm font-black mb-3 leading-tight tracking-wider text-[#1a1a1a] group-hover:text-white transition-colors duration-500">
                  {feature.title}
                </h3>

                <div className="h-px bg-black/8 group-hover:bg-white/10 mb-4 transition-colors duration-500" />

                <p className="text-sm leading-relaxed text-foreground-500 group-hover:text-white/65 transition-colors duration-500 flex-1">
                  {feature.description}
                </p>

                {/* Icon */}
                <div className="mt-6 w-10 h-10 flex items-center justify-center bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-500">
                  <i className={`${feature.icon} text-lg text-[#C8D400]`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
