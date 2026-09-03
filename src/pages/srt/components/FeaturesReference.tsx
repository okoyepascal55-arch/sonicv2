import { useState } from 'react';
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

// Built-in HTML/CSS dashboard preview — no image needed, renders as designed software
function DashboardPreview() {
  const kpis = [
    { label: 'Umsatz heute', value: '€ 24.180', delta: '+6.4%', up: true },
    { label: 'Aktive Einsätze', value: '147', delta: '+12', up: true },
    { label: 'Ziel-Erreichung', value: '91,2 %', delta: '−2.1%', up: false },
  ];
  const bars = [65, 80, 55, 90, 72, 88, 44, 78, 85];
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: 'oklch(0.11 0.005 118)' }}>
      {/* App chrome / top bar */}
      <div className="flex items-center gap-2 px-3 py-2 flex-shrink-0" style={{ background: 'oklch(0.09 0.004 118)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full" style={{ background: 'oklch(0.81 0.19 115 / 0.6)' }} />
        </div>
        <div className="flex-1 mx-3" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '2px', padding: '2px 8px' }}>
          <span className="text-[7px] text-white/25">app.sonic-srt.de/dashboard</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-400 animate-pulse" style={{ borderRadius: '50%' }} />
          <span className="text-[7px] text-white/30">Live</span>
        </div>
      </div>

      {/* Dashboard body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar nav */}
        <div className="flex-shrink-0 flex flex-col gap-1 py-3 px-2" style={{ width: 36, background: 'oklch(0.10 0.004 118)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          {['ri-dashboard-line', 'ri-bar-chart-grouped-line', 'ri-map-pin-2-line', 'ri-team-line', 'ri-settings-4-line'].map((ic, i) => (
            <div key={i} className="w-7 h-7 flex items-center justify-center"
              style={{ background: i === 0 ? 'oklch(0.81 0.19 115 / 0.15)' : 'transparent', borderLeft: i === 0 ? '2px solid oklch(0.81 0.19 115)' : '2px solid transparent' }}>
              <i className={`${ic} text-[10px]`} style={{ color: i === 0 ? 'oklch(0.81 0.19 115)' : 'rgba(255,255,255,0.25)' }} />
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 overflow-hidden flex flex-col gap-2">
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-1.5">
            {kpis.map((k) => (
              <div key={k.label} className="p-2" style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[6px] text-white/35 mb-1 uppercase tracking-wide">{k.label}</p>
                <p className="text-[11px] font-black text-white leading-none">{k.value}</p>
                <p className="text-[6px] mt-0.5 font-bold" style={{ color: k.up ? 'oklch(0.81 0.19 115)' : '#f87171' }}>{k.delta}</p>
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div className="flex-1 p-2" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', minHeight: 0 }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[6px] text-white/35 uppercase tracking-wide">Tages-Performance</span>
              <span className="text-[6px]" style={{ color: 'oklch(0.81 0.19 115 / 0.6)' }}>KW 16 · 2026</span>
            </div>
            <div className="flex items-end gap-px h-[40px]">
              {bars.map((h, i) => (
                <div key={i} className="flex-1" style={{ height: `${h}%`, background: i === 7 ? 'oklch(0.81 0.19 115)' : 'oklch(0.81 0.19 115 / 0.25)' }} />
              ))}
            </div>
          </div>

          {/* Data table rows */}
          <div style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
            {[
              { name: 'MediaMarkt Berlin', val: '€4.210', status: true },
              { name: 'Saturn Hamburg', val: '€3.880', status: true },
              { name: 'Expert München', val: '€2.140', status: false },
            ].map((r) => (
              <div key={r.name} className="flex items-center px-2 py-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="w-1 h-1 mr-2 flex-shrink-0" style={{ background: r.status ? 'oklch(0.81 0.19 115)' : 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
                <span className="text-[6px] text-white/50 flex-1">{r.name}</span>
                <span className="text-[6px] font-bold text-white/70">{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesReference() {
  const { images: featureIcons } = useMediaStore('srt_feature_icons');
  const { images: sectionImages } = useMediaStore('srt_section_images');
  const f1BgSrc = sectionImages[0]?.url ? resolveImageUrl(sectionImages[0].url) : null;

  const tBadge   = useText('srt_features', 'srt-features-badge',   'Die Lösung');
  const tHeading = useText('srt_features', 'srt-features-heading', 'SRT: Die All-in-One Software');
  const tSub     = useText('srt_features', 'srt-features-sub',     'Seit 2008 laufend weiterentwickelt, für maximalen Nutzwert. Seit 2024 mit KI-Features.');
  const tCta     = useText('srt_features', 'srt-features-cta',     'SRT Demo anfragen');

  const getIcon = (idx: number, fallback: string, title: string) => {
    const media = featureIcons[idx];
    return <img src={media?.url ? resolveImageUrl(media.url) : fallback} alt={title} className="w-full h-full object-cover" loading="lazy" />;
  };

  return (
    <section className="px-4 md:px-6 py-16 md:py-24 bg-foreground-950 relative overflow-hidden" id="features">
      {/* Data grid backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(oklch(0.81 0.19 115) 1px, transparent 1px), linear-gradient(90deg, oklch(0.81 0.19 115) 1px, transparent 1px)', backgroundSize: '56px 56px' }}
        aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <span className="w-7 h-0.5 bg-primary-500" />
          <span className="text-[11px] font-black tracking-[0.24em] uppercase" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
          <span className="ml-auto text-[9px] font-black uppercase tracking-[0.2em] text-white/15 hidden md:block">Seit 2008 · 15+ Versionen</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-end mb-8">
          <h2 className="sonic-h2 text-white uppercase">
            SRT: Die <span className="px-[0.16em] py-[0.02em] bg-primary-500 text-foreground-950" style={{ boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>All-in-One</span> Software
          </h2>
          <p className="text-sm text-white/35 leading-relaxed">{tSub}</p>
        </div>

        {/* Bento */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-[2px]">

          {/* F1 — Hero card with live dashboard preview */}
          <div className="md:col-span-3 md:row-span-2 relative overflow-hidden" style={{ minHeight: 340, border: '1px solid oklch(0.81 0.19 115 / 0.35)' }}>
            {/* Top lime accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500 to-primary-500/20 z-30" />
            {/* Left lime edge */}
            <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-gradient-to-b from-primary-500 via-primary-500/50 to-transparent z-30" />

            {/* Dashboard preview or uploaded image */}
            <div className="absolute inset-0 z-10">
              {f1BgSrc
                ? <img src={f1BgSrc} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                : <DashboardPreview />}
            </div>

            {/* Gradient over dashboard: solid dark at top (text), transparent at bottom */}
            <div className="absolute inset-0 z-20 pointer-events-none"
              style={{ background: 'linear-gradient(180deg, oklch(0.13 0.005 118) 0%, oklch(0.13 0.005 118 / 0.7) 50%, transparent 100%)' }} />

            {/* Content — top-anchored */}
            <div className="relative z-30 p-7 md:p-8">
              <div className="w-11 h-11 overflow-hidden flex items-center justify-center mb-5 bg-primary-500">
                {getIcon(0, FEATURES[0].woodIcon, FEATURES[0].title)}
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] block mb-2" style={{ color: 'oklch(0.81 0.19 115 / 0.7)' }}>Modul 01 / 06</span>
              <h3 className="text-[22px] md:text-[26px] font-black text-white uppercase mb-3 leading-tight">{FEATURES[0].title}</h3>
              <p className="text-[13px] leading-relaxed text-white/45 max-w-[280px]">{FEATURES[0].description}</p>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {FEATURES[0].tags?.map(tag => (
                  <span key={tag} className="text-[9px] font-bold px-2.5 py-1" style={{ border: '1px solid oklch(0.81 0.19 115 / 0.4)', color: 'oklch(0.81 0.19 115)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* F2 + F3 */}
          {FEATURES.slice(1, 3).map((f, idx) => (
            <div key={f.number} className="md:col-span-3 flex items-center gap-4 p-5 group transition-colors duration-200"
              style={{ background: 'oklch(0.15 0.005 118)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-11 h-11 overflow-hidden flex-shrink-0 transition-all duration-200 group-hover:scale-105"
                style={{ background: 'oklch(0.81 0.19 115 / 0.10)', border: '1px solid oklch(0.81 0.19 115 / 0.25)' }}>
                {getIcon(idx + 1, f.woodIcon, f.title)}
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 block mb-0.5">{f.number} / 06</span>
                <h3 className="text-[13px] font-black text-white uppercase mb-1">{f.title}</h3>
                <p className="text-[11px] text-white/35 leading-snug">{f.description}</p>
              </div>
              <div className="ml-auto pl-4">
                <i className={`${f.icon} text-[20px] text-white/8 group-hover:text-primary-500/20 transition-colors duration-200`} />
              </div>
            </div>
          ))}

          {/* F4, F5, F6 */}
          {FEATURES.slice(3).map((f, idx) => (
            <div key={f.number} className="md:col-span-2 p-5 flex flex-col group transition-all duration-200"
              style={{ background: 'oklch(0.135 0.005 118)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 overflow-hidden transition-all duration-200 group-hover:scale-105"
                  style={{ background: 'oklch(0.81 0.19 115 / 0.10)', border: '1px solid oklch(0.81 0.19 115 / 0.18)' }}>
                  {getIcon(idx + 3, f.woodIcon, f.title)}
                </div>
                <span className="text-[9px] font-black text-white/15">{f.number}</span>
              </div>
              <h3 className="text-[12px] font-black text-white uppercase mb-2 leading-snug">{f.title}</h3>
              <p className="text-[10.5px] text-white/30 leading-snug flex-1">{f.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-[2px] flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-[18px]"
          style={{ background: 'oklch(0.81 0.19 115 / 0.07)', border: '1px solid oklch(0.81 0.19 115 / 0.2)' }}>
          <div>
            <p className="text-white font-black text-[13px]">Noch Fragen zum Funktionsumfang?</p>
            <p className="text-white/35 text-[11px]">Wir zeigen dir das SRT live — kostenlos und unverbindlich.</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo`}
            className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-foreground-950 font-black text-xs uppercase tracking-widest whitespace-nowrap hover:bg-white transition-colors">
            {tCta} <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>
    </section>
  );
}