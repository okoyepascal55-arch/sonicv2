import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { MONO, HAIR, MUTED, PAPER } from './SrtKit';

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
    <section id="branchen" className="py-16 md:py-24 px-4 md:px-6 relative" style={{ background: PAPER }}>
      <div className="sonic-container relative z-10">
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span></div>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <h2 className="sonic-h2 text-foreground-950">Von Retail Execution bis <span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>Gesundheit & Pharma.</span></h2>
            <p className="text-[15px] text-foreground-950/60 leading-relaxed md:text-right md:max-w-sm md:ml-auto">{tSub}</p>
          </div>
        </div>
        {/* Plain 3×2 grid of text blocks divided by hairlines (light redesign 22.10.2026) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3" style={{ borderTop: `1px solid ${HAIR}`, borderLeft: `1px solid ${HAIR}` }}>
          {useCases.map((uc, i) => (
            <article key={i} className="p-7 md:p-8 bg-transparent hover:bg-white transition-colors duration-300" style={{ borderRight: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
              <div className="flex items-center justify-between mb-5">
                <i className={`${uc.icon} text-[20px] text-foreground-950/70`} aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.3)' }}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-[18px] font-black text-foreground-950 leading-snug mb-4">{uc.title}</h3>
              <ul className="space-y-2 m-0 p-0 list-none">
                {uc.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[14px] leading-relaxed" style={{ color: MUTED }}>
                    <span className="w-1 h-1 mt-[10px] flex-shrink-0 bg-primary-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-[14px] mb-4" style={{ color: MUTED }}>Noch unsicher, wie das SRT zu deinem Use Case passt?</p>
          <button onClick={scrollToAccess} className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-foreground-950 text-white text-xs font-black uppercase tracking-widest hover:bg-primary-500 hover:text-foreground-950 transition-all cursor-pointer">
            <i className="ri-compass-3-line" />{tCta}<i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>
    </section>
  );
}
