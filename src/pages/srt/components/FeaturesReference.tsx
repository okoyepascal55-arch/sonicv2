import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { WoodIcon, SrtHeader, PAPER, HAIR, MUTED, MONO } from './SrtKit';

const FEATURES = [
  { number: '01', icon: 'ri-dashboard-line', title: 'Echtzeit-Dashboard', description: 'Alle gewünschten Metriken auf einen Blick — live und übersichtlich dargestellt, für schnellere Entscheidungen.', tags: ['Live-Daten', 'KPIs', 'Echtzeit'], woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20dashboard%20monitor%20screen%20display%20analytics%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-dashboard-v1&orientation=squarish' },
  { number: '02', icon: 'ri-bar-chart-grouped-line', title: 'Performance-Tracking', description: 'Verkaufszahlen, Top-/Flop-Listen.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20bar%20chart%20performance%20analytics%20graph%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-chart-v1&orientation=squarish' },
  { number: '03', icon: 'ri-team-line', title: 'Team-Management', description: 'Recruiting, Einsätze, GPS-genau.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20team%20people%20group%20management%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-team-v1&orientation=squarish' },
  { number: '04', icon: 'ri-file-chart-line', title: 'Reportings', description: 'Excel, PPT, SQL.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20document%20file%20report%20paper%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-report-v1&orientation=squarish' },
  { number: '05', icon: 'ri-smartphone-line', title: 'Mobile App', description: 'Mobil. Einhändig. Intuitiv.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20smartphone%20mobile%20phone%20app%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-mobile-v1&orientation=squarish' },
  { number: '06', icon: 'ri-shield-check-line', title: 'Datensicherheit', description: 'DSGVO-konform.', woodIcon: 'https://readdy.ai/api/search-image?query=wooden%20shield%20security%20protection%20lock%20icon%20carved%20from%20solid%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=120&height=120&seq=wood-srt-shield-v1&orientation=squarish' },
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
          <span className="text-[7px] text-white/25">Sonic Reporting Tool</span>
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
              { name: 'Store Berlin', val: '€4.210', status: true },
              { name: 'Store Hamburg', val: '€3.880', status: true },
              { name: 'Store München', val: '€2.140', status: false },
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
  // Unterzeile: Dashboard → Text → SRT → „SRT — All-in-One: Kacheln“ (sub)
  const tCta     = useText('srt_features', 'srt-features-cta',     'Demo anfragen');
  // Dashboard → Text → SRT → „SRT — CTA-Texte (Demo)“
  const ct       = useReviewText('srt_cta_texts');
  // Dashboard → Text → SRT → „SRT — All-in-One: Kacheln“
  const fc       = useReviewText('srt_features_cards');
  const features = FEATURES.map((f, i) => ({
    ...f,
    title: fc[`f${i + 1}-title`] ?? f.title,
    description: fc[`f${i + 1}-desc`] ?? f.description,
    tags: i === 0 ? [fc['f1-tag-1'], fc['f1-tag-2'], fc['f1-tag-3']].filter(Boolean) : f.tags,
  }));

  const iconSrc = (idx: number, fallback: string) => {
    const media = featureIcons[idx];
    return media?.url ? resolveImageUrl(media.url) : fallback;
  };

  const card = { background: PAPER, border: `1px solid ${HAIR}` } as const;

  return (
    <section className="px-4 md:px-6 py-16 md:py-24 bg-white relative" id="features">
      <div className="sonic-container">
        <SrtHeader
          eyebrow={tBadge}
          title={<>SRT: Die <span className="px-[0.16em] py-[0.02em] bg-primary-500 text-foreground-950" style={{ boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>All-in-One</span> Software</>}
          side={<p>{fc.sub}</p>}
        />

        {/* Light bento (22.10.2026): soft surfaces, the dashboard shown as a product screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* F1 — product card */}
          <div className="md:col-span-4 md:row-span-2 flex flex-col overflow-hidden group" style={card}>
            <div className="p-7 md:p-9 pb-0">
              <div className="flex items-start justify-between mb-6">
                <WoodIcon src={iconSrc(0, features[0].woodIcon)} alt={features[0].title} size={56} />
                <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.35)' }}>01 / 06</span>
              </div>
              <h3 className="text-[24px] md:text-[28px] font-black text-foreground-950 mb-3 leading-tight" style={{ letterSpacing: '-0.02em' }}>{features[0].title}</h3>
              <p className="text-[15px] leading-relaxed max-w-[460px]" style={{ color: MUTED }}>{features[0].description}</p>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {features[0].tags?.map(tag => (
                  <span key={tag} className="text-[11px] font-bold px-2.5 py-1 bg-white text-foreground-950/70" style={{ border: `1px solid ${HAIR}` }}>{tag}</span>
                ))}
              </div>
            </div>
            {/* Product screenshot, slightly cropped at the bottom like a hero shot */}
            <div className="relative mt-8 mx-7 md:mx-9 -mb-px flex-1 min-h-[230px] overflow-hidden transition-transform duration-500 group-hover:-translate-y-1"
              style={{ border: `1px solid ${HAIR}`, borderBottom: 'none', boxShadow: '0 30px 60px -30px rgba(0,0,0,0.45)' }}>
              {f1BgSrc
                ? <img src={f1BgSrc} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-top" />
                : <DashboardPreview />}
            </div>
          </div>

          {/* F2 + F3 */}
          {features.slice(1, 3).map((f, idx) => (
            <div key={f.number} className="md:col-span-2 p-7 flex flex-col transition-transform duration-300 hover:-translate-y-1" style={card}>
              <div className="flex items-start justify-between mb-6">
                <WoodIcon src={iconSrc(idx + 1, f.woodIcon)} alt={f.title} size={48} delay={(idx + 1) * 120} />
                <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.35)' }}>{f.number} / 06</span>
              </div>
              <h3 className="text-[18px] font-black text-foreground-950 mb-1.5">{f.title}</h3>
              <p className="text-[14px] leading-snug" style={{ color: MUTED }}>{f.description}</p>
            </div>
          ))}

          {/* F4, F5, F6 */}
          {features.slice(3).map((f, idx) => (
            <div key={f.number} className="md:col-span-2 p-7 flex flex-col transition-transform duration-300 hover:-translate-y-1" style={card}>
              <div className="flex items-start justify-between mb-6">
                <WoodIcon src={iconSrc(idx + 3, f.woodIcon)} alt={f.title} size={48} delay={(idx + 3) * 120} />
                <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.35)' }}>{f.number} / 06</span>
              </div>
              <h3 className="text-[18px] font-black text-foreground-950 mb-1.5">{f.title}</h3>
              <p className="text-[14px] leading-snug" style={{ color: MUTED }}>{f.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 pt-8" style={{ borderTop: `1px solid ${HAIR}` }}>
          <div className="text-center sm:text-left">
            <p className="text-foreground-950 font-black text-[16px]">{ct['features-headline']}</p>
            <p className="text-[14px]" style={{ color: MUTED }}>{ct['features-line']}</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo`}
            className="flex items-center gap-2 px-6 py-3.5 bg-foreground-950 text-white font-black text-xs uppercase tracking-widest whitespace-nowrap hover:bg-primary-500 hover:text-foreground-950 transition-colors">
            {tCta} <i className="ri-arrow-right-line" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
