import { useText, useTextSection } from '@/hooks/useText';
import { useInView, LIME, MONO, SrtHeader, HAIR, MUTED, PAPER } from './SrtKit';

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

  const { ref: flowRef, seen } = useInView<HTMLOListElement>(0.2);

  return (
    <section id="zusammenarbeit" className="py-16 md:py-24 px-4 md:px-6 relative" style={{ background: PAPER }}>
      <div className="sonic-container">
        <SrtHeader eyebrow={tBadge} title={tHeading}
          side={<p className="text-[11px] uppercase tracking-[0.16em] md:text-right" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.4)' }}>6 Schritte · End-to-End</p>} />

        {/* Minimal pipeline (22.10.2026): one thin line, six numbered dots, text only — the line draws once */}
        <ol ref={flowRef} className="relative grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Line — horizontal on desktop, vertical on phones/tablets */}
          <span className="hidden lg:block absolute left-0 right-0 top-[9px] h-px" style={{ background: HAIR }} aria-hidden="true">
            <span className="block h-full" style={{ background: LIME, width: seen ? '100%' : '0%', transition: 'width 2.4s cubic-bezier(0.22, 1, 0.36, 1)' }} />
          </span>
          <span className="lg:hidden absolute left-[9px] top-1 bottom-1 w-px" style={{ background: HAIR }} aria-hidden="true">
            <span className="block w-full" style={{ background: LIME, height: seen ? '100%' : '0%', transition: 'height 2.4s cubic-bezier(0.22, 1, 0.36, 1)' }} />
          </span>
          {steps.map((step, i) => (
            <li key={step.number} className="relative pl-10 lg:pl-0"
              style={{ opacity: seen ? 1 : 0, transform: seen ? 'none' : 'translateY(10px)', transition: `opacity 0.6s ease ${0.3 + i * 0.25}s, transform 0.6s ease ${0.3 + i * 0.25}s` }}>
              <span className="absolute lg:static left-0 top-0 flex w-[19px] h-[19px] items-center justify-center rounded-full bg-white" style={{ border: `1px solid ${seen ? LIME : HAIR}`, transition: `border-color 0.3s ease ${0.3 + i * 0.4}s` }} aria-hidden="true">
                <span className="w-[7px] h-[7px] rounded-full" style={{ background: seen ? LIME : 'rgba(0,0,0,0.15)', transition: `background 0.3s ease ${0.3 + i * 0.4}s` }} />
              </span>
              <p className="lg:mt-6 text-[11px] uppercase tracking-[0.16em] mb-2" style={{ fontFamily: MONO, color: 'rgba(0,0,0,0.4)' }}>Schritt {step.number}</p>
              <h3 className="text-[17px] font-black text-foreground-950 mb-1 leading-snug" style={{ hyphens: 'auto', overflowWrap: 'break-word' }}>{step.title}</h3>
              <p className="text-[11px] font-bold uppercase tracking-wide mb-3" style={{ color: 'oklch(0.5 0.1 115)' }}>{step.short}</p>
              <p className="text-[14px] leading-relaxed" style={{ color: MUTED }}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
