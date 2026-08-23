import { useState, useRef, useEffect } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useText } from '@/hooks/useText';

const STEPS = [
  { number: '01', title: 'KPI-Definition', icon: 'ri-focus-3-line', short: 'Erfolgskennzahlen definieren', description: 'Gemeinsam definieren wir die Erfolgskennzahlen, die für dein Projekt entscheidend sind. Welche Metriken zählen wirklich — Abverkauf, Standort-Performance, Mitarbeiter-KPIs?', deliverable: 'KPI-Framework', details: ['Workshop zur Zieldefinition', 'Festlegung primärer & sekundärer KPIs', 'Benchmark-Referenzwerte vereinbaren', 'Reporting-Frequenz und -Format abstimmen'] },
  { number: '02', title: 'Datenintegration', icon: 'ri-database-2-line', short: 'Systeme verknüpfen', description: 'Unsere Daten zu Branchen, Outlets und Mitarbeitern werden mit deinen ERP-Daten und evtl. externen Daten verknüpft, damit das SRT zur Single Source of Truth wird.', deliverable: 'Daten-Mapping', details: ['ERP- & WaWi-Anbindung', 'Externe Datenfeeds (Marktforschung, POS)', 'Historische Daten migrieren', 'End-to-End-Verschlüsselung einrichten'] },
  { number: '03', title: 'Dashboard-Setup', icon: 'ri-layout-grid-line', short: 'Visualisierung aufsetzen', description: 'Optisch sauber aufbereitet für den schnellen Überblick und/oder Rohdaten-Stream für deine Tools. Für laufende Kontrolle und für\'s Controlling.', deliverable: 'Live Dashboard', details: ['Custom-View nach deinen Anforderungen', 'KPI-Tiles, Charts, Ranking-Listen', 'Export-Formate: Excel, PowerPoint, SQL', 'Rollenbasierte Zugriffsrechte'] },
  { number: '04', title: 'Team-Management', icon: 'ri-team-line', short: 'Field Force aufbauen', description: 'Wir stellen in Absprache mit dir das Field-Team zusammen, erstellen den Einsatzkalender und buchen die Mitarbeiter ein.', deliverable: 'Einsatzplan', details: ['Talentpool-Matching nach Profil', 'Einsatzkalender & Schichtplanung', 'Briefing & Onboarding der Mitarbeiter', 'GPS-Check-in-Konfiguration je Standort'] },
  { number: '05', title: 'Abrechnung', icon: 'ri-money-euro-circle-line', short: 'Transparent & automatisch', description: 'Wir rechnen die Einsätze inkl. Prämien mit den Mitarbeitern ab und buchen u.a. Fremdkosten ein. So werden alle Ausgaben zentral erfasst.', deliverable: 'Abrechnung', details: ['Automatische Gehaltsabrechnung', 'Prämien & Boni-Berechnung', 'Fremdkosten-Buchung & Übersicht', 'Vollständige Audit-Trails'] },
  { number: '06', title: 'Reportings', icon: 'ri-file-chart-2-line', short: 'Performance kontinuierlich tracken', description: 'Auf Basis aller Daten zu Absatz, Umsatz, Kosten etc. erhältst du aktuelle Reportings, mit denen du die Performance tracken kannst.', deliverable: 'Report-Paket', details: ['Automatisch generierte Berichte', 'Abverkauf, Umsatz & Kostenanalyse', 'Top-/Flop-Listen & Low-Performer-Index', 'Prognosen für Folge-Kampagnen'] },
];

export default function Zusammenarbeit() {
  const tBadge = useText('srt_zusammenarbeit', 'srt-collab-badge', 'Zusammenarbeit');
  const tHeading = useText('srt_zusammenarbeit', 'srt-collab-heading', 'SO FUNKTIONIERT DAS SRT.');
  const tSub = useText('srt_zusammenarbeit', 'srt-collab-sub', '');

  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="zusammenarbeit" className="sonic-section-lg px-4 md:px-6 bg-white relative overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}
    >
      <div className="sonic-container relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <SectionBadge text={tBadge} variant="dark" />
            <span className="text-[10px] font-black text-foreground-300 uppercase tracking-widest hidden md:block">6 Schritte</span>
          </div>
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="font-black text-foreground-950 leading-tight tracking-tight" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
              {tHeading}
            </h2>
            <p className="text-foreground-600 text-sm leading-relaxed lg:pb-1">
              {tSub || 'Von der ersten KPI-Definition bis zum laufenden Reporting — in 6 strukturierten Schritten wird das SRT zur zentralen Datenbasis deines Projekts.'}
            </p>
          </div>
        </div>

        {/* Accordions — pure white, lime accents */}
        <div className="space-y-[1px]">
          {STEPS.map((step, i) => {
            const isOpen = activeStep === i;
            return (
              <div key={step.number} className="group">
                <button onClick={() => setActiveStep(isOpen ? null : i)}
                  className={`w-full flex items-center gap-5 px-5 py-4 transition-all duration-200 cursor-pointer text-left border-l-4 ${
                    isOpen
                      ? 'bg-foreground-950 border-primary-500'
                      : 'bg-white border-transparent hover:border-primary-500/40'
                  }`}
                  style={{ borderBottom: i < STEPS.length - 1 ? '1px solid oklch(var(--background-200) / 0.5)' : 'none' }}>
                  <span className={`text-2xl font-black leading-none tabular-nums flex-shrink-0 w-10 transition-colors duration-200 ${
                    isOpen ? 'text-primary-500' : 'text-foreground-200 group-hover:text-primary-500/50'
                  }`}>{step.number}</span>

                  <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isOpen ? 'bg-primary-500/15 text-primary-500' : 'bg-[#FAFDF5] text-foreground-500 group-hover:text-primary-500/70'
                  }`}>
                    <i className={`${step.icon} text-base`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`font-black text-sm uppercase tracking-wide transition-colors duration-200 ${isOpen ? 'text-background-50' : 'text-foreground-950'}`}>
                        {step.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-foreground-500 hidden sm:block">
                        — {step.short}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 border flex-shrink-0 hidden md:block transition-all duration-200 ${
                    isOpen ? 'border-primary-500/40 text-primary-500 bg-primary-500/10' : 'border-background-200 text-foreground-500 bg-background-50'
                  }`}>{step.deliverable}</span>

                  <div className={`w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen ? 'text-primary-500 rotate-180' : 'text-foreground-400'
                  }`}>
                    <i className="ri-arrow-down-s-line text-base" />
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="bg-foreground-950 border-l-4 border-primary-500 px-6 pb-6 pt-2">
                    <div className="ml-0 md:ml-[112px] grid md:grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <p className="text-background-50/70 text-xs leading-relaxed mb-4">{step.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {step.details.slice(0, 2).map((d) => (
                            <span key={d} className="text-[10px] font-bold text-primary-500 bg-primary-500/10 border border-primary-500/20 px-2.5 py-1">{d}</span>
                          ))}
                        </div>
                      </div>
                      <div className="border-l border-background-50/10 pl-5">
                        <p className="text-background-50/35 text-[10px] font-black uppercase tracking-widest mb-3">Inhalte</p>
                        <ul className="space-y-1.5">
                          {step.details.map((d, di) => (
                            <li key={di} className="flex items-start gap-2 text-background-50/55 text-xs">
                              <span className="w-3 h-3 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <i className="ri-check-line text-primary-500 text-xs" />
                              </span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slim step navigator */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {STEPS.map((s, i) => (
            <button key={s.number} onClick={() => setActiveStep(activeStep === i ? null : i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                activeStep === i
                  ? 'bg-foreground-950 text-primary-500 border-foreground-950'
                  : 'bg-background-50 text-foreground-500 border-background-200 hover:border-primary-500/50 hover:text-foreground-950'
              }`}>
              <span className={activeStep === i ? 'text-primary-500' : 'text-foreground-300'}>{s.number}</span>
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}