import { useText, useTextSection } from '@/hooks/useText';
import { ProductGrid, useInView, LIME, MONO } from './SrtKit';

const STEPS = [
  { number: '01', title: 'KPI-Definition', short: 'Erfolgskennzahlen definieren', icon: 'ri-focus-3-line', description: 'Gemeinsam definieren wir die Erfolgskennzahlen, die für dein Projekt entscheidend sind — Abverkauf, Standort-Performance, Mitarbeiter-KPIs.' },
  { number: '02', title: 'Datenintegration', short: 'Daten verknüpfen', icon: 'ri-database-2-line', description: 'Unsere Daten zu Branchen, Outlets und Mitarbeitern werden mit deinen Daten verknüpft, damit das SRT zur zentralen Datenbasis wird.' },
  { number: '03', title: 'Dashboard-Setup', short: 'Visualisierung aufsetzen', icon: 'ri-layout-grid-line', description: 'Optisch sauber aufbereitet für den schnellen Überblick — oder als PowerPoint-, Excel- oder SQL-Reporting für laufende Kontrolle und Controlling.' },
  { number: '04', title: 'Team-Management', short: 'Field Force aufbauen', icon: 'ri-team-line', description: 'Wir stellen in Absprache mit dir das Field-Team zusammen, erstellen den Einsatzkalender und buchen die Mitarbeiter ein.' },
  { number: '05', title: 'Abrechnung', short: 'Transparent & automatisch', icon: 'ri-money-euro-circle-line', description: 'Wir rechnen die Einsätze inkl. Prämien mit den Mitarbeitern ab und buchen Fremdkosten ein — zentral erfasst.' },
  { number: '06', title: 'Reportings', short: 'Performance kontinuierlich tracken', icon: 'ri-file-chart-2-line', description: 'Auf Basis aller Daten zu Absatz, Umsatz und Kosten erhältst du aktuelle Reportings, mit denen du die Performance trackst.' },
];

export default function Zusammenarbeit() {
  const tBadge   = useText('srt_zusammenarbeit', 'srt-collab-badge',   'Zusammenarbeit');
  const tHeading = useText('srt_zusammenarbeit', 'srt-collab-heading', 'So funktioniert das SRT');
  // Dashboard → Text → SRT → „Zusammenarbeit — 6-Step Process“
  const ts = useTextSection('srt_zusammenarbeit');
  const steps = STEPS.map((st, i) => ({
    ...st,
    title: ts[`srt-collab-step-${i + 1}`] ?? st.title,
    short: ts[`srt-collab-step-${i + 1}-short`] ?? st.short,
    description: ts[`srt-collab-step-${i + 1}-desc`] ?? st.description,
  }));

  const { ref: flowRef, seen } = useInView<HTMLDivElement>(0.2);

  return (
    <section id="zusammenarbeit" className="bg-white py-10 md:py-14 px-4 md:px-6 relative overflow-hidden">
      <ProductGrid light />

      <div className="sonic-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950 ">{tHeading}</h2>
          </div>
          {/* Step count */}
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.4)' }}>6 Schritte · End-to-End</p>
          </div>
        </div>

        {/* Steps as a workflow pipeline (22.10.2026): the lime line runs 01 → 06 when the section comes into view.
            Desktop: one row with a rail; tablet/phone: vertical timeline. */}
        <div ref={flowRef} className="relative">
          {/* Desktop rail */}
          <div className="hidden xl:block relative mb-6 h-11" aria-hidden="true">
            <div className="absolute left-[8.33%] right-[8.33%] top-1/2 h-[2px] -translate-y-1/2" style={{ background: 'rgba(0,0,0,0.08)' }} />
            <div className="absolute left-[8.33%] top-1/2 h-[2px] -translate-y-1/2" style={{ background: LIME, width: seen ? '83.34%' : '0%', transition: 'width 2.6s cubic-bezier(0.22, 1, 0.36, 1)' }} />
            <div className="relative grid grid-cols-6 h-full">
              {steps.map((step, i) => (
                <div key={step.number} className="flex items-center justify-center">
                  <span className="w-11 h-11 flex items-center justify-center text-[12px] font-bold"
                    style={{ fontFamily: MONO, background: seen ? LIME : '#fff', color: 'oklch(0.13 0.005 118)', border: `2px solid ${LIME}`, transition: `background 0.3s ease ${0.25 + i * 0.42}s, transform 0.3s ease ${0.25 + i * 0.42}s`, transform: seen ? 'scale(1)' : 'scale(0.9)' }}>
                    {step.number}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical line for tablet/phone */}
          <div className="xl:hidden absolute left-[21px] top-2 bottom-2 w-[2px]" style={{ background: 'rgba(0,0,0,0.08)' }} aria-hidden="true">
            <div className="w-full" style={{ background: LIME, height: seen ? '100%' : '0%', transition: 'height 2.6s cubic-bezier(0.22, 1, 0.36, 1)' }} />
          </div>

          <ol className="grid grid-cols-1 xl:grid-cols-6 gap-4 xl:gap-3">
            {steps.map((step, i) => (
              <li key={step.number} className="relative pl-14 xl:pl-0">
                <span className="xl:hidden absolute left-0 top-5 w-11 h-11 flex items-center justify-center text-[12px] font-bold"
                  style={{ fontFamily: MONO, background: LIME, color: 'oklch(0.13 0.005 118)' }} aria-hidden="true">{step.number}</span>
                <div className="h-full bg-white p-6 xl:p-5 2xl:p-6 group hover:-translate-y-1 transition-transform duration-300"
                  style={{ border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 12px 30px -20px rgba(0,0,0,0.25)', opacity: seen ? 1 : 0, transform: seen ? undefined : 'translateY(12px)', transition: `opacity 0.6s ease ${0.2 + i * 0.12}s, transform 0.6s ease ${0.2 + i * 0.12}s` }}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 flex items-center justify-center" style={{ background: 'oklch(0.81 0.19 115 / 0.14)' }}>
                      <i className={`${step.icon} text-[17px]`} style={{ color: 'oklch(0.45 0.1 115)' }} aria-hidden="true" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.4)' }}>Schritt {step.number}</span>
                  </div>
                  <h3 className="text-[16px] xl:text-[15px] 2xl:text-[16px] font-black text-foreground-950 mb-1 leading-snug" style={{ hyphens: 'auto', overflowWrap: 'break-word' }}>{step.title}</h3>
                  <p className="text-[11px] font-bold mb-3 uppercase tracking-wide" style={{ color: 'oklch(0.5 0.1 115)' }}>{step.short}</p>
                  <p className="text-[13px] text-foreground-950/60 leading-relaxed">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
