import { useState } from 'react';
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
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="zusammenarbeit" className="sonic-section-lg px-4 md:px-6 bg-[#FAFDF5]">
      <div className="sonic-container">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span><span className="text-[11px] font-black text-foreground-950/25 uppercase ml-2">6 Schritte</span></div>
          <h2 className="leist-h2 text-foreground-950 uppercase mb-2">{tHeading}</h2>
          {tSub && <p className="text-sm text-foreground-950/50">{tSub}</p>}
        </div>
        <div className="border border-foreground-950/[0.08] bg-white">
          {STEPS.map((step, i) => {
            const isOpen = open === i;
            return (
              <div key={step.number}>
                <button onClick={() => setOpen(isOpen ? null : i)} className={`w-full flex items-center gap-4 px-5 md:px-[22px] py-[18px] text-left border-l-4 cursor-pointer transition-colors ${isOpen ? 'bg-foreground-950 border-primary-500' : 'bg-white border-transparent hover:border-primary-500/40'}`} style={{ borderBottom: i < STEPS.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <span className={`text-[22px] font-black w-8 flex-shrink-0 ${isOpen ? 'text-primary-500' : 'text-foreground-950/35'}`}>{step.number}</span>
                  <div className={`w-[30px] h-[30px] flex items-center justify-center border flex-shrink-0 ${isOpen ? 'border-primary-500/30' : 'border-primary-500/20'}`}><i className={`${step.icon} text-[13px] ${isOpen ? 'text-primary-500' : 'text-primary-600'}`} /></div>
                  <h3 className={`flex-1 text-sm font-black uppercase ${isOpen ? 'text-background-50' : 'text-foreground-950'}`}>{step.title} <span className="font-semibold normal-case opacity-60">— {step.short}</span></h3>
                  <i className={`ri-arrow-down-s-line text-lg transition-transform ${isOpen ? 'text-primary-500 rotate-180' : 'text-foreground-400'}`} />
                </button>
                {isOpen && <div className="bg-foreground-950 border-l-4 border-primary-500 px-[22px] py-5 pl-[68px]"><p className="m-0 text-[13px] leading-[1.7] text-background-50/65">{step.description}</p></div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
