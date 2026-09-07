import { useText } from '@/hooks/useText';

const STEPS = [
  { number: '01', title: 'KPI-Definition', short: 'Erfolgskennzahlen definieren', icon: 'ri-focus-3-line', description: 'Gemeinsam definieren wir die Erfolgskennzahlen, die für dein Projekt entscheidend sind — Abverkauf, Standort-Performance, Mitarbeiter-KPIs.' },
  { number: '02', title: 'Datenintegration', short: 'Systeme verknüpfen', icon: 'ri-database-2-line', description: 'Unsere Daten zu Branchen, Outlets und Mitarbeitern werden mit deinen ERP-Daten verknüpft, damit das SRT zur Single Source of Truth wird.' },
  { number: '03', title: 'Dashboard-Setup', short: 'Visualisierung aufsetzen', icon: 'ri-layout-grid-line', description: 'Optisch sauber aufbereitet für den schnellen Überblick, oder Rohdaten-Stream für deine Tools — für laufende Kontrolle und Controlling.' },
  { number: '04', title: 'Team-Management', short: 'Field Force aufbauen', icon: 'ri-team-line', description: 'Wir stellen in Absprache mit dir das Field-Team zusammen, erstellen den Einsatzkalender und buchen die Mitarbeiter ein.' },
  { number: '05', title: 'Abrechnung', short: 'Transparent & automatisch', icon: 'ri-money-euro-circle-line', description: 'Wir rechnen die Einsätze inkl. Prämien mit den Mitarbeitern ab und buchen Fremdkosten ein — zentral erfasst.' },
  { number: '06', title: 'Reportings', short: 'Performance kontinuierlich tracken', icon: 'ri-file-chart-2-line', description: 'Auf Basis aller Daten zu Absatz, Umsatz und Kosten erhältst du aktuelle Reportings, mit denen du die Performance trackst.' },
];

export default function Zusammenarbeit() {
  const tBadge   = useText('srt_zusammenarbeit', 'srt-collab-badge',   'Zusammenarbeit');
  const tHeading = useText('srt_zusammenarbeit', 'srt-collab-heading', 'So funktioniert das SRT');

  return (
    <section id="zusammenarbeit" className="bg-white py-20 md:py-28 px-4 md:px-6 relative overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        aria-hidden="true" />

      <div className="sonic-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950 uppercase">{tHeading}</h2>
          </div>
          {/* Step count */}
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground-950/25">6 Schritte · End-to-End</p>
          </div>
        </div>

        {/* Steps — clean 2×3 grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px]" style={{ background: 'rgba(0,0,0,0.06)' }}>
          {STEPS.map((step, i) => (
            <div key={step.number} className="bg-white p-7 md:p-8 relative group hover:bg-[#FAFDF5] transition-colors duration-200">
              {/* Step connector line — top for all except first row */}
              <div className="absolute top-0 left-8 right-8 h-px bg-transparent" />

              {/* Number + icon row */}
              <div className="flex items-center justify-between mb-6">
                {/* Step icon */}
                <div className="w-10 h-10 flex items-center justify-center"
                  style={{ border: '1px solid oklch(0.55 0.08 115 / 0.3)', background: 'oklch(0.55 0.08 115 / 0.06)' }}>
                  <i className={`${step.icon} text-[16px]`} style={{ color: 'oklch(0.55 0.08 115)' }} />
                </div>
                {/* Ghost number */}
                <span className="font-black leading-none select-none" style={{ fontSize: 44, color: 'rgba(0,0,0,0.06)', lineHeight: 1 }}>{step.number}</span>
              </div>

              {/* Content */}
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary-500/60 mb-2">{step.number} / 06</p>
              <h3 className="text-[15px] font-black text-foreground-950 uppercase mb-1 leading-snug">{step.title}</h3>
              <p className="text-[11px] font-bold text-primary-600/70 mb-3 uppercase tracking-wide">{step.short}</p>
              <p className="text-[12px] text-foreground-950/45 leading-relaxed">{step.description}</p>

              {/* Progress indicator — bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, oklch(0.55 0.08 115 / ${0.2 + i * 0.12}) 0%, transparent 100%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
