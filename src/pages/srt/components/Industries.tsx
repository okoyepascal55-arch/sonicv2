import { useText } from '@/hooks/useText';

const USE_CASES = [
  { icon: 'ri-store-2-line', title: 'FMCG & Retail Execution', items: ['In-Store-Performance', 'Regal-Audits, Planogramm-Compliance', 'POS-Material-Tracking'] },
  { icon: 'ri-heart-3-line', title: 'Beauty & Cosmetics', items: ['Beauty Advisor-Einsätze steuern', 'Für Retail und Events', 'Performance-Messung'] },
  { icon: 'ri-calendar-event-line', title: 'Event & Promotional Staffing', items: ['Personaleinsätze steuern', 'Material- und Warenflüsse tracken', 'Erfolge messen & vergleichen'] },
  { icon: 'ri-map-2-line', title: 'Field Sales & Territory', items: ['Regionen-basierte Planung', 'Routenplanung & -optimierung', 'Analytics zu Regionen'] },
  { icon: 'ri-tools-line', title: 'Technischer Support CE', items: ['Servicetechniker-Tourenplanung', 'Warenfluss (Ersatzteile) tracken', 'Monitoring regionaler Abdeckung'] },
  { icon: 'ri-hospital-line', title: 'Gesundheit & Pflege', items: ['Pharmaberater-Regionen managen', 'Hausbesuche planen und routen', 'Compliance / Dokumentationen'] },
];

export default function Industries() {
  const tBadge = useText('srt_industries', 'srt-industries-badge', 'Branchen & Use Cases');
  const tHeading = useText('srt_industries', 'srt-industries-heading', 'Von Retail Execution bis Healthcare.');
  const tSub = useText('srt_industries', 'srt-industries-sub', 'Das SRT ist bereit für jedes Projekt, bei dem Menschen zielorientiert und koordiniert eingesetzt werden.');
  const tCta = useText('srt_industries', 'srt-industries-cta', 'Deine SRT-Konfiguration finden');

  const scrollToAccess = () => {
    const el = document.getElementById('preise-zugang');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  return (
    <section id="branchen" className="sonic-section-lg px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="sonic-container relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">{tBadge}</span></div>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <h2 className="leist-h2 text-foreground-950 uppercase">Von Retail Execution bis <span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>Healthcare.</span></h2>
            <p className="text-sm text-foreground-600 leading-relaxed">{tSub}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {USE_CASES.map((uc) => (
            <article key={uc.title} className="bg-white border-2 border-foreground-950/[0.08] p-5 hover:border-primary-500/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[34px] h-[34px] flex items-center justify-center border flex-shrink-0" style={{ borderColor: 'oklch(0.81 0.19 115 / 0.3)' }}><i className={`${uc.icon} text-primary-500 text-[15px]`} /></div>
                <h3 className="text-[13.5px] font-black text-foreground-950 leading-snug uppercase">{uc.title}</h3>
              </div>
              <ul className="space-y-1.5 m-0 p-0 list-none">
                {uc.items.map((item) => <li key={item} className="flex items-start gap-2 text-xs text-foreground-600 leading-relaxed"><span className="w-1 h-1 bg-primary-500 flex-shrink-0 mt-1.5" />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-foreground-600 mb-4">Noch unsicher, wie das SRT zu deinem Use Case passt?</p>
          <button onClick={scrollToAccess} className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary-500 text-foreground-950 text-xs font-black uppercase tracking-widest hover:bg-foreground-950 hover:text-primary-500 transition-all cursor-pointer">
            <i className="ri-compass-3-line" />{tCta}<i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}
