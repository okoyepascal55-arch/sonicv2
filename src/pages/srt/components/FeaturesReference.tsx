import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const FEATURES = [
  { number: '01', icon: 'ri-dashboard-line', title: 'Echtzeit-Dashboard', description: 'Alle gewünschten Metriken auf einen Blick — live und übersichtlich dargestellt, für schnellere Entscheidungen.', tags: ['Live-Daten', 'KPIs', 'Echtzeit'], woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20dashboard%20monitor%20screen%20display%20analytics%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-dashboard-v1&orientation=squarish' },
  { number: '02', icon: 'ri-bar-chart-grouped-line', title: 'Performance-Tracking', description: 'Verkaufszahlen, Top-/Flop-Listen.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20bar%20chart%20performance%20analytics%20graph%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-chart-v1&orientation=squarish' },
  { number: '03', icon: 'ri-team-line', title: 'Team-Management', description: 'Recruiting, Einsätze, GPS-genau.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20team%20people%20group%20management%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-team-v1&orientation=squarish' },
  { number: '04', icon: 'ri-file-chart-line', title: 'Reportings', description: 'Excel, PPT, SQL.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20document%20file%20report%20paper%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-report-v1&orientation=squarish' },
  { number: '05', icon: 'ri-smartphone-line', title: 'Mobile App', description: 'iOS & Android, offline.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20smartphone%20mobile%20phone%20app%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-mobile-v1&orientation=squarish' },
  { number: '06', icon: 'ri-shield-check-line', title: 'Datensicherheit', description: 'AES-256, DSGVO.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20shield%20security%20protection%20lock%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-shield-v1&orientation=squarish' },
];

export default function FeaturesReference() {
  const { images: featureIcons } = useMediaStore('srt_feature_icons');
  const { images: sectionImages } = useMediaStore('srt_section_images');
  const f1BgSrc = sectionImages[0]?.url
    ? resolveImageUrl(sectionImages[0].url)
    : 'https://readdy.ai/api/search-image?query=modern%20enterprise%20SaaS%20dashboard%20interface%20dark%20theme%20lime%20green%20accent%20real-time%20analytics%20charts%20KPI%20widgets%20retail%20field%20force%20management%20software%20clean%20professional%20data%20visualization%20overview%20panel&width=900&height=520&seq=srt-f1-hero-bg&orientation=landscape';

  const tBadge   = useText('srt_features', 'srt-features-badge',   'Die Lösung');
  const tHeading = useText('srt_features', 'srt-features-heading', 'SRT: Die All-in-One Software');
  const tSub     = useText('srt_features', 'srt-features-sub',     'Seit 2008 laufend weiterentwickelt, für maximalen Nutzwert. Seit 2024 mit KI-Features.');
  const tCta     = useText('srt_features', 'srt-features-cta',     'SRT Demo anfragen');

  const getIcon = (idx: number, fallback: string, title: string) => {
    const media = featureIcons[idx];
    return <img src={media?.url ? resolveImageUrl(media.url) : fallback} alt={title} className="w-full h-full object-cover" loading="lazy" />;
  };

  return (
    <section className="px-4 md:px-6 py-[72px] md:py-[88px] bg-foreground-950 relative overflow-hidden" id="features">
      {/* Subtle data grid texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(oklch(0.81 0.19 115) 1px, transparent 1px), linear-gradient(90deg, oklch(0.81 0.19 115) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <span className="inline-flex items-center gap-3">
            <span className="w-7 h-0.5 bg-primary-500" />
            <span className="text-[11px] font-black tracking-[0.24em] uppercase" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/15 ml-auto hidden md:block">Seit 2008 · 15+ Versionen · 2.000+ Nutzer</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-end mb-8">
          <h2 className="sonic-h2 text-background-50 uppercase">
            SRT: Die <span className="px-[0.16em] py-[0.02em] bg-primary-500/90 text-foreground-950" style={{ boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>All-in-One</span> Software
          </h2>
          <p className="text-sm text-white/40 leading-relaxed">{tSub}</p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-6 gap-[2px]">

          {/* F1 — Hero card: dark with dashboard bg */}
          <div className="col-span-6 md:col-span-3 row-span-2 relative overflow-hidden bg-foreground-950"
            style={{ border: '1px solid oklch(0.81 0.19 115 / 0.30)', minHeight: '280px' }}>
            {/* Dashboard bg image */}
            <img src={f1BgSrc} alt="" aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ opacity: 0.18 }} loading="lazy" />
            {/* Gradient protect text */}
            <div className="absolute inset-0 bg-gradient-to-b from-foreground-950/95 via-foreground-950/60 to-foreground-950/30 pointer-events-none" />
            {/* Lime left edge glow */}
            <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-500 to-transparent opacity-60" />
            {/* Top lime accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary-500 via-primary-500/40 to-transparent" />
            {/* Ghost number */}
            <span className="absolute top-3 right-4 text-[72px] font-black leading-none text-white/[0.04] select-none z-10 pointer-events-none">01</span>
            {/* Content */}
            <div className="relative z-20 p-7 md:p-8 flex flex-col h-full">
              {/* Icon — lime bg */}
              <div className="w-[44px] h-[44px] overflow-hidden flex items-center justify-center bg-primary-500 mb-5 flex-shrink-0">
                {getIcon(0, FEATURES[0].woodIcon, FEATURES[0].title)}
              </div>
              {/* Module label */}
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary-500/70 mb-2">Modul 01 / 06</span>
              <h3 className="text-xl font-black text-white uppercase mb-3 leading-tight">{FEATURES[0].title}</h3>
              <p className="text-[13px] leading-[1.6] text-white/45 max-w-[300px] flex-1">{FEATURES[0].description}</p>
              {/* Data chips */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {FEATURES[0].tags?.map(tag => (
                  <span key={tag} className="text-[9px] font-bold px-2.5 py-1 text-primary-500"
                    style={{ border: '1px solid oklch(0.81 0.19 115 / 0.3)', background: 'oklch(0.81 0.19 115 / 0.08)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* F2 + F3 — Horizontal cards */}
          {FEATURES.slice(1, 3).map((f, idx) => (
            <div key={f.number} className="col-span-6 md:col-span-3 flex items-center gap-4 p-5"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'oklch(0.15 0.005 118)' }}>
              <div className="w-10 h-10 overflow-hidden flex-shrink-0" style={{ background: 'oklch(0.81 0.19 115 / 0.10)', border: '1px solid oklch(0.81 0.19 115 / 0.20)' }}>
                {getIcon(idx + 1, f.woodIcon, f.title)}
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 block mb-0.5">{f.number} / 06</span>
                <h3 className="text-[13px] font-black text-white uppercase mb-1">{f.title}</h3>
                <p className="text-[11px] text-white/35 leading-snug">{f.description}</p>
              </div>
            </div>
          ))}

          {/* F4, F5, F6 — Bottom row */}
          {FEATURES.slice(3).map((f, idx) => (
            <div key={f.number} className="col-span-6 md:col-span-2 p-5 flex flex-col"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'oklch(0.14 0.005 118)' }}>
              <div className="w-9 h-9 overflow-hidden mb-3 flex-shrink-0" style={{ background: 'oklch(0.81 0.19 115 / 0.10)', border: '1px solid oklch(0.81 0.19 115 / 0.15)' }}>
                {getIcon(idx + 3, f.woodIcon, f.title)}
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">{f.number}</span>
              <h3 className="text-[12px] font-black text-white uppercase mb-1 leading-snug">{f.title}</h3>
              <p className="text-[10.5px] text-white/30 leading-snug">{f.description}</p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-[2px] flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-[18px]"
          style={{ background: 'oklch(0.81 0.19 115 / 0.06)', border: '1px solid oklch(0.81 0.19 115 / 0.15)' }}>
          <div>
            <p className="text-white font-black text-xs">Noch Fragen zum Funktionsumfang?</p>
            <p className="text-white/30 text-[11px]">Wir zeigen dir das SRT live — kostenlos und unverbindlich.</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo`}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-foreground-950 font-black text-xs uppercase tracking-widest whitespace-nowrap hover:bg-white transition-colors">
            {tCta} <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}
