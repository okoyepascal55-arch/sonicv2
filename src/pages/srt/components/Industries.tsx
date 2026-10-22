import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { ProductGrid, MONO } from './SrtKit';

const USE_CASES = [
  { icon: 'ri-store-2-line', title: 'FMCG & Retail Execution', items: ['In-Store-Performance', 'Regal-Audits mit Fotodokumentation', 'POS-Material-Tracking'] },
  { icon: 'ri-heart-3-line', title: 'Beauty & Cosmetics', items: ['Beauty Advisor-Einsätze steuern', 'Für Retail und Events', 'Performance-Messung'] },
  { icon: 'ri-calendar-event-line', title: 'Event & Promotional Staffing', items: ['Personaleinsätze steuern', 'Material- und Warenflüsse tracken', 'Erfolge messen & vergleichen'] },
  { icon: 'ri-map-2-line', title: 'Field Sales & Territory', items: ['Regionen-basierte Planung', 'Besuchsberichte & Fotos', 'Analytics zu Regionen'] },
  { icon: 'ri-tools-line', title: 'Technischer Support CE', items: ['Servicetechniker-Einsätze planen', 'Warenfluss (Ersatzteile) tracken', 'Monitoring regionaler Abdeckung'] },
  { icon: 'ri-hospital-line', title: 'Gesundheit & Pflege', items: ['Pharmaberater-Regionen managen', 'Besuche planen und dokumentieren', 'Compliance / Dokumentationen'] },
];

export default function Industries() {
  const tBadge = useText('srt_industries', 'srt-industries-badge', 'Branchen & Use Cases');
  const tHeading = useText('srt_industries', 'srt-industries-heading', 'Von Retail Execution bis Gesundheit & Pharma.');
  const tSub = useText('srt_industries', 'srt-industries-sub', 'Das SRT ist bereit für jedes Projekt, bei dem Menschen zielorientiert und koordiniert eingesetzt werden.');
  const tCta = useText('srt_industries', 'srt-industries-cta', 'Deine SRT-Konfiguration finden');
  // Dashboard → Text → SRT → „SRT — Branchen & Use Cases: Karten“
  const it = useReviewText('srt_industries_items');
  const useCases = USE_CASES.map((uc, i) => ({
    ...uc,
    title: it[`i${i + 1}-title`] ?? uc.title,
    items: uc.items.map((item, j) => it[`i${i + 1}-item-${j + 1}`] ?? item).filter(Boolean),
  }));

  const scrollToAccess = () => {
    const el = document.getElementById('preise-zugang');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  return (
    <section id="branchen" className="sonic-section-md px-4 md:px-6 relative overflow-hidden bg-white">
      <ProductGrid light />
      <div className="sonic-container relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span></div>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <h2 className="sonic-h2 text-foreground-950">Von Retail Execution bis <span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>Gesundheit & Pharma.</span></h2>
            <p className="text-[15px] text-foreground-950/60 leading-relaxed md:text-right md:max-w-sm md:ml-auto">{tSub}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {useCases.map((uc, i) => (
            <article key={i} className="group relative overflow-hidden bg-white transition-all duration-300 hover:-translate-y-1" style={{ border: '1px solid rgba(0,0,0,0.09)', boxShadow: '0 12px 30px -22px rgba(0,0,0,0.3)' }}>
              {/* Configuration panel (22.10.2026): header bar like a setup screen in the tool */}
              <div className="flex items-center justify-between px-5 h-9" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', background: 'rgba(0,0,0,0.02)' }}>
                <span className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.45)' }}>Konfiguration {String(i + 1).padStart(2, '0')}</span>
                <span className="relative w-7 h-4 rounded-full transition-colors duration-300" style={{ background: 'oklch(0.81 0.19 115)' }} aria-hidden="true">
                  <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-white" />
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: 'oklch(0.81 0.19 115 / 0.14)' }}>
                    <i className={`${uc.icon} text-[17px]`} style={{ color: 'oklch(0.45 0.1 115)' }} aria-hidden="true" />
                  </div>
                  <h3 className="text-[16px] font-black text-foreground-950 leading-snug">{uc.title}</h3>
                </div>
                <ul className="space-y-2.5 m-0 p-0 list-none">
                  {uc.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[13px] text-foreground-950/65 leading-relaxed">
                      <i className="ri-checkbox-circle-fill text-[15px] flex-shrink-0 mt-[1px]" style={{ color: 'oklch(0.62 0.15 115)' }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-foreground-950/45 mb-4">Noch unsicher, wie das SRT zu deinem Use Case passt?</p>
          <button onClick={scrollToAccess} className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-foreground-950 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-500 hover:text-foreground-950 transition-all cursor-pointer">
            <i className="ri-compass-3-line" />{tCta}<i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}
