import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';

const FEATURES = [
  { number: '01', icon: 'ri-dashboard-line', title: 'Echtzeit-Dashboard', description: 'Alle gewünschten Metriken auf einen Blick — live und übersichtlich dargestellt, für schnellere Entscheidungen.', tags: ['Live-Daten', 'KPIs'] },
  { number: '02', icon: 'ri-bar-chart-grouped-line', title: 'Performance-Tracking', description: 'Verkaufszahlen, Top-/Flop-Listen.' },
  { number: '03', icon: 'ri-team-line', title: 'Team-Management', description: 'Recruiting, Einsätze, GPS-genau.' },
  { number: '04', icon: 'ri-file-chart-line', title: 'Reportings', description: 'Excel, PPT, SQL.' },
  { number: '05', icon: 'ri-smartphone-line', title: 'Mobile App', description: 'iOS & Android, offline.' },
  { number: '06', icon: 'ri-shield-check-line', title: 'Datensicherheit', description: 'AES-256, DSGVO.' },
];

export default function FeaturesReference() {
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
          <h2 className="m-0 text-[clamp(36px,4vw,48px)] font-black leading-[1.04] tracking-[-0.035em] uppercase text-foreground-950">SRT: Die <span className="px-[0.16em] py-[0.02em] bg-primary-500/90 text-foreground-950" style={{ boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>All-in-One</span> Software</h2>
          <p className="m-0 text-sm text-foreground-950/50">{tSub}</p>
        </div>

        <div className="grid grid-cols-6 gap-[3px]">
          <div className="col-span-6 md:col-span-3 row-span-2 border-2 border-primary-500/35 p-7 relative overflow-hidden bg-[#FAFDF5] min-h-[280px]">
            <span className="absolute top-3 right-4 text-[64px] font-black leading-none text-foreground-950/[0.04]">01</span>
            <div className="w-[46px] h-[46px] flex items-center justify-center bg-primary-500 mb-[18px]"><i className="ri-dashboard-line text-[21px] text-foreground-950" /></div>
            <h3 className="m-0 mb-2 text-xl font-black text-foreground-950 uppercase">Echtzeit-Dashboard</h3>
            <p className="m-0 mb-4 text-[13px] leading-[1.6] text-foreground-950/50 max-w-[300px]">{FEATURES[0].description}</p>
            <div className="flex flex-wrap gap-1.5">{FEATURES[0].tags?.map(tag => <span key={tag} className="text-[10px] font-extrabold px-2.5 py-1 bg-primary-500/12 border border-primary-500/25 text-foreground-950">{tag}</span>)}</div>
          </div>

          {FEATURES.slice(1, 3).map(feature => (
            <div key={feature.number} className="col-span-6 md:col-span-3 border-2 border-foreground-950/8 p-5 flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary-500/10 flex-shrink-0"><i className={`${feature.icon} text-lg text-primary-600`} /></div>
              <div><h3 className="m-0 mb-1 text-sm font-black text-foreground-950 uppercase">{feature.title}</h3><p className="m-0 text-[11.5px] text-foreground-950/45">{feature.description}</p></div>
            </div>
          ))}

          {FEATURES.slice(3).map(feature => (
            <div key={feature.number} className="col-span-6 md:col-span-2 border-2 border-foreground-950/8 p-[18px]">
              <i className={`${feature.icon} text-xl text-primary-600 mb-2.5 block`} />
              <h3 className="m-0 mb-1 text-[13px] font-black text-foreground-950 uppercase">{feature.title}</h3>
              <p className="m-0 text-[11px] leading-[1.5] text-foreground-950/45">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-[18px] bg-[#FAFDF5] border border-foreground-950/[0.06]">
          <div><p className="m-0 text-foreground-950 font-black text-xs">Noch Fragen zum Funktionsumfang?</p><p className="m-0 text-foreground-950/40 text-[11px]">Wir zeigen dir das SRT live — kostenlos und unverbindlich.</p></div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo`} className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-foreground-950 font-black text-xs uppercase tracking-widest whitespace-nowrap">{tCta}<i className="ri-arrow-right-line" /></a>
        </div>
      </div>
    </section>
  );
}
