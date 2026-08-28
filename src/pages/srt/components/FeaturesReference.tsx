import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const FEATURES = [
  { number: '01', icon: 'ri-dashboard-line', title: 'Echtzeit-Dashboard', description: 'Alle gewünschten Metriken auf einen Blick — live und übersichtlich dargestellt, für schnellere Entscheidungen.', tags: ['Live-Daten', 'KPIs'], woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20dashboard%20monitor%20screen%20display%20analytics%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-dashboard-v1&orientation=squarish' },
  { number: '02', icon: 'ri-bar-chart-grouped-line', title: 'Performance-Tracking', description: 'Verkaufszahlen, Top-/Flop-Listen.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20bar%20chart%20performance%20analytics%20graph%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-chart-v1&orientation=squarish' },
  { number: '03', icon: 'ri-team-line', title: 'Team-Management', description: 'Recruiting, Einsätze, GPS-genau.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20team%20people%20group%20management%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-team-v1&orientation=squarish' },
  { number: '04', icon: 'ri-file-chart-line', title: 'Reportings', description: 'Excel, PPT, SQL.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20document%20file%20report%20paper%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-report-v1&orientation=squarish' },
  { number: '05', icon: 'ri-smartphone-line', title: 'Mobile App', description: 'iOS & Android, offline.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20smartphone%20mobile%20phone%20app%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-mobile-v1&orientation=squarish' },
  { number: '06', icon: 'ri-shield-check-line', title: 'Datensicherheit', description: 'AES-256, DSGVO.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20shield%20security%20protection%20lock%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-shield-v1&orientation=squarish' },
];

export default function FeaturesReference() {
  const { images: featureIcons } = useMediaStore('srt_feature_icons');
  const tBadge = useText('srt_features', 'srt-features-badge', 'Die Lösung');
  const tHeading = useText('srt_features', 'srt-features-heading', 'SRT: Die All-in-One Software');
  const tSub = useText('srt_features', 'srt-features-sub', 'Seit 2008 laufend weiterentwickelt, für maximalen Nutzwert. Seit 2024 mit KI-Features.');
  const tCta = useText('srt_features', 'srt-features-cta', 'SRT Demo anfragen');

  return (
    <section className="px-6 py-[88px] bg-white" id="features">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center gap-4 mb-5">
          <span className="inline-flex items-center gap-3"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black tracking-[0.24em] uppercase text-primary-600">{tBadge}</span></span>
          <span className="text-[11px] font-black uppercase tracking-[0.1em] text-foreground-950/25 ml-auto">Seit 2008 · 15+ Versionen</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-end mb-8">
          <h2 className="sonic-h2 text-foreground-950 uppercase">SRT: Die <span className="px-[0.16em] py-[0.02em] bg-primary-500/90 text-foreground-950" style={{ boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>All-in-One</span> Software</h2>
          <p className="m-0 text-sm text-foreground-950/50">{tSub}</p>
        </div>

        <div className="grid grid-cols-6 gap-[3px]">
          <div className="col-span-6 md:col-span-3 row-span-2 border-2 border-primary-500/35 relative overflow-hidden bg-[#FAFDF5] min-h-[280px]">
            {/* Dashboard bg — bottom half visible, cream gradient protects text area */}
            <img
              src="https://readdy.ai/api/search-image?query=modern%20enterprise%20SaaS%20dashboard%20interface%20dark%20theme%20lime%20green%20accent%20real-time%20analytics%20charts%20KPI%20widgets%20retail%20field%20force%20management%20software%20clean%20professional%20data%20visualization%20overview%20panel&width=900&height=520&seq=srt-f1-hero-bg&orientation=landscape"
              alt="" aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.25]"
              loading="lazy"
            />
            {/* Gradient: solid cream at top (text area) → transparent at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAFDF5] via-[#FAFDF5]/80 to-transparent pointer-events-none" />
            {/* Ghost number — on card, not inside content div */}
            <span className="absolute top-4 right-5 text-[64px] font-black leading-none text-foreground-950/[0.05] select-none z-10 pointer-events-none">01</span>
            {/* Content */}
            <div className="relative z-20 p-7">
              <div className="w-[46px] h-[46px] overflow-hidden flex items-center justify-center bg-primary-500 mb-[18px]">
                {featureIcons[0]?.url ? <img src={featureIcons[0].url} alt={FEATURES[0].title} className="w-full h-full object-cover" loading="lazy" /> : <img src={FEATURES[0].woodIcon} alt={FEATURES[0].title} className="w-full h-full object-cover" loading="lazy" />}
              </div>
              <h3 className="m-0 mb-2 text-xl font-black text-foreground-950 uppercase">Echtzeit-Dashboard</h3>
              <p className="m-0 mb-4 text-[13px] leading-[1.6] text-foreground-950/50 max-w-[300px]">{FEATURES[0].description}</p>
              <div className="flex flex-wrap gap-1.5">{FEATURES[0].tags?.map(tag => <span key={tag} className="text-[10px] font-extrabold px-2.5 py-1 bg-primary-500/12 border border-primary-500/25 text-foreground-950">{tag}</span>)}</div>
            </div>
          </div>

          {FEATURES.slice(1, 3).map((feature, idx) => {
            const media = featureIcons[idx + 1];
            return (
              <div key={feature.number} className="col-span-6 md:col-span-3 border-2 border-foreground-950/8 p-5 flex items-center gap-4">
                <div className="w-10 h-10 overflow-hidden flex items-center justify-center bg-primary-500/10 flex-shrink-0">
                  {media?.url ? <img src={media.url} alt={feature.title} className="w-full h-full object-cover" loading="lazy" /> : <img src={feature.woodIcon} alt={feature.title} className="w-full h-full object-cover" loading="lazy" />}
                </div>
                <div><h3 className="m-0 mb-1 text-sm font-black text-foreground-950 uppercase">{feature.title}</h3><p className="m-0 text-[11.5px] text-foreground-950/45">{feature.description}</p></div>
              </div>
            );
          })}

          {FEATURES.slice(3).map((feature, idx) => {
            const media = featureIcons[idx + 3];
            return (
              <div key={feature.number} className="col-span-6 md:col-span-2 border-2 border-foreground-950/8 p-[18px]">
                <div className="w-10 h-10 overflow-hidden flex items-center justify-center mb-2.5 bg-primary-500/10">
                  {media?.url ? <img src={media.url} alt={feature.title} className="w-full h-full object-cover" loading="lazy" /> : <img src={feature.woodIcon} alt={feature.title} className="w-full h-full object-cover" loading="lazy" />}
                </div>
                <h3 className="m-0 mb-1 text-[13px] font-black text-foreground-950 uppercase">{feature.title}</h3>
                <p className="m-0 text-[11px] leading-[1.5] text-foreground-950/45">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-[18px] bg-[#FAFDF5] border border-foreground-950/[0.06]">
          <div><p className="m-0 text-foreground-950 font-black text-xs">Noch Fragen zum Funktionsumfang?</p><p className="m-0 text-foreground-950/40 text-[11px]">Wir zeigen dir das SRT live — kostenlos und unverbindlich.</p></div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo`} className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-foreground-950 font-black text-xs uppercase tracking-widest whitespace-nowrap">{tCta}<i className="ri-arrow-right-line" /></a>
        </div>
      </div>
    </section>
  );
}
