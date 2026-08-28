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
  const tBadge = useText('srt_zusammenarbeit', 'srt-collab-badge', 'Zusammenarbeit');
  const tHeading = useText('srt_zusammenarbeit', 'srt-collab-heading', 'So funktioniert das SRT');
  const tSub = useText('srt_zusammenarbeit', 'srt-collab-sub', '');

  return (
    <section id="zusammenarbeit" className="sonic-section-md px-4 md:px-6 bg-[#FAFDF5]">
      <div className="sonic-container">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-0.5 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="sonic-h2 text-foreground-950 uppercase m-0">{tHeading}</h2>
            {tSub && <p className="text-sm text-foreground-950/50 max-w-sm">{tSub}</p>}
          </div>
        </div>

        {/* Always-visible 2×3 grid — no accordion, no click required */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground-950/[0.07]">
          {STEPS.map((step) => (
            <div key={step.number} className="bg-[#FAFDF5] p-6 relative">
              {/* Step number — large ghost */}
              <span className="absolute top-4 right-5 text-[52px] font-black leading-none text-foreground-950/[0.05] select-none">{step.number}</span>
              {/* Icon + number label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 flex items-center justify-center border border-primary-500/25 bg-primary-500/8 flex-shrink-0">
                  <i className={`${step.icon} text-primary-600 text-base`} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-foreground-950/35">{step.number} / 06</span>
              </div>
              <h3 className="text-[13px] font-black uppercase text-foreground-950 mb-1 leading-snug">{step.title}</h3>
              <p className="text-[11px] font-semibold text-primary-600 mb-3 uppercase tracking-wide">{step.short}</p>
              <p className="text-xs text-foreground-950/50 leading-relaxed m-0">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
