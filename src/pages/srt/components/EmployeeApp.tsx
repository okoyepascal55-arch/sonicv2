import { useState, useEffect, useCallback } from 'react';
import PhoneFrame from '@/components/base/PhoneFrame';
import SectionBadge from '@/components/base/SectionBadge';
import FloatingBadge from '@/components/base/FloatingBadge';
import { useText } from '@/hooks/useText';

const STEPS = [
  { number: '01', tag: 'SCHICHT', icon: 'ri-calendar-check-line', title: 'Aufgaben einsehen', desc: 'Die Mitarbeiterin sieht auf den ersten Blick, wann und wo der nächste Einsatz eingeplant ist.', screen: 'shift' },
  { number: '02', tag: 'CHECK-IN', icon: 'ri-map-pin-2-line', title: 'Vor Ort einchecken', desc: 'GPS-gestützte Eincheckung nur vor Ort möglich. Arbeitszeiterfassung startet automatisch.', screen: 'checkin' },
  { number: '03', tag: 'ZIELE', icon: 'ri-focus-3-line', title: 'Zielerreichung tracken', desc: 'Ziele und Status der Zielerreichung einsehen. Verkaufstaktiken, die funktionieren, direkt sichtbar.', screen: 'targets' },
  { number: '04', tag: 'PAYROLL', icon: 'ri-money-euro-circle-line', title: 'Abrechnung erhalten', desc: 'Transparente Gehaltsabrechnung direkt in der App. Provisionen, Boni — alles nachvollziehbar.', screen: 'payroll' },
];

function PhoneScreen({ screen }: { screen: string }) {
  switch (screen) {
    case 'shift':
      return (
        <div className="h-full flex flex-col p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xs font-black text-primary-500 uppercase tracking-wider">Meine Einsätze</span>
            <span className="text-3xs text-foreground-600">KW 16 · Apr 2026</span>
          </div>
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="bg-foreground-900 border border-primary-500/30 p-2.5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-0.5 h-full bg-primary-500" />
              <div className="flex items-center gap-2 mb-1.5 pl-1.5">
                <div className="w-5 h-5 bg-primary-500/20 flex items-center justify-center">
                  <i className="ri-store-2-line text-primary-500 text-2xs" />
                </div>
                <span className="text-3xs font-bold text-background-50">MediaMarkt Berlin-Mitte</span>
                <span className="ml-auto text-3xs text-primary-500 font-black">10:00–18:00</span>
              </div>
              <div className="flex gap-1.5 pl-1.5">
                <span className="text-[7px] bg-primary-500/15 text-primary-500 px-1.5 py-0.5 font-bold">Samsung S25</span>
                <span className="text-[7px] bg-background-50/5 text-foreground-500 px-1.5 py-0.5">Brand Promoter</span>
                <span className="text-[7px] bg-green-500/15 text-green-400 px-1.5 py-0.5 font-bold ml-auto">Heute</span>
              </div>
            </div>
            <div className="bg-foreground-900 border border-background-50/8 p-2.5 opacity-60">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 bg-background-50/5 flex items-center justify-center">
                  <i className="ri-store-2-line text-foreground-600 text-2xs" />
                </div>
                <span className="text-3xs font-bold text-foreground-300">Saturn Altona, Hamburg</span>
                <span className="ml-auto text-3xs text-foreground-600">Mo, 17.04</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-[7px] bg-background-50/5 text-foreground-600 px-1.5 py-0.5">Dyson V15</span>
                <span className="text-[7px] bg-background-50/5 text-foreground-600 px-1.5 py-0.5">10:00–17:00</span>
              </div>
            </div>
            <div className="bg-foreground-900 border border-background-50/5 p-2.5 opacity-35">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 bg-background-50/5 flex items-center justify-center">
                  <i className="ri-store-2-line text-foreground-700 text-2xs" />
                </div>
                <span className="text-3xs font-bold text-foreground-600">Expert Theresienstr., München</span>
                <span className="ml-auto text-3xs text-foreground-700">Mi, 19.04</span>
              </div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-background-50/8 flex items-center justify-between">
            <span className="text-[7px] text-foreground-600">3 Einsätze diese Woche · 3 Städte</span>
            <span className="text-[7px] text-primary-500 font-bold">24,0 Std geplant</span>
          </div>
        </div>
      );
    case 'checkin':
      return (
        <div className="h-full flex flex-col p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xs font-black text-primary-500 uppercase tracking-wider">GPS Check-in</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-400 animate-pulse" />
              <span className="text-[7px] text-green-400">Signal stark</span>
            </div>
          </div>
          <div className="flex-1 bg-foreground-900 border border-primary-500/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-background-50/10 border border-background-50/20 flex items-center justify-center">
                <i className="ri-store-2-line text-background-50/60 text-3xs" />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-primary-500/20 flex items-center justify-center border border-primary-500/40">
                <i className="ri-map-pin-2-fill text-primary-500 text-sm" />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-primary-500/10 animate-pulse" />
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-foreground-950/60 px-2 py-1 flex items-center justify-between">
                <span className="text-[7px] text-foreground-500">MediaMarkt Berlin-Mitte</span>
                <span className="text-[7px] text-primary-500 font-bold">12 m</span>
              </div>
            </div>
          </div>
          <div className="mt-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-primary-500" /><span className="text-3xs text-foreground-500">Accuracy: ±8 m</span></div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-primary-500" /><span className="text-3xs text-foreground-500">09:58 Uhr</span></div>
            </div>
            <button className="w-full bg-primary-500 text-foreground-950 py-2.5 text-2xs font-black uppercase tracking-wider hover:bg-background-50 transition-colors cursor-pointer">JETZT EINCHECKEN</button>
          </div>
        </div>
      );
    case 'targets':
      return (
        <div className="h-full flex flex-col p-3">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-3xs font-black text-primary-500 uppercase tracking-wider">Ziele KW 16</span>
            <div className="bg-primary-500/15 px-1.5 py-0.5"><span className="text-[7px] text-primary-500 font-black">94,7% erreicht</span></div>
          </div>
          <div className="flex-1 space-y-2.5 overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-1"><span className="text-3xs text-background-50 font-bold">Verkäufe (Woche)</span><span className="text-3xs text-primary-500 font-black">18 / 25</span></div>
              <div className="h-1.5 bg-background-50/10 overflow-hidden"><div className="h-full bg-primary-500" style={{ width: '72%' }} /></div>
              <span className="text-[7px] text-foreground-600">72% — Δ +3 seit gestern</span>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1"><span className="text-3xs text-background-50 font-bold">Upsell-Quote</span><span className="text-3xs text-primary-500 font-black">34% <span className="text-green-400 text-[7px]">+8%</span></span></div>
              <div className="h-1.5 bg-background-50/10 overflow-hidden"><div className="h-full bg-primary-500" style={{ width: '68%' }} /></div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1"><span className="text-3xs text-background-50 font-bold">Kundenbewertung</span><span className="text-3xs text-primary-500 font-black">4,8 / 5,0</span></div>
              <div className="h-1.5 bg-background-50/10 overflow-hidden"><div className="h-full bg-primary-500" style={{ width: '96%' }} /></div>
            </div>
            <div className="bg-foreground-900 border border-primary-500/20 p-2 mt-1">
              <div className="flex items-center gap-1.5 mb-0.5"><i className="ri-lightbulb-line text-primary-500 text-3xs" /><span className="text-[7px] text-primary-500 font-black uppercase tracking-wider">KI-Tipp</span></div>
              <div className="text-3xs text-background-50/75 leading-snug">Bundle S25 + SmartTag2 erhöht Upsell um x23%</div>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-background-50/10 flex items-center justify-between">
            <span className="text-[7px] text-foreground-600">Rang 4 / 128 Mitarbeiter</span>
            <span className="text-[7px] text-primary-500 font-black">▲ Top 5%</span>
          </div>
        </div>
      );
    case 'payroll':
      return (
        <div className="h-full flex flex-col p-3">
          <div className="flex items-center justify-between mb-2.5"><span className="text-3xs font-black text-primary-500 uppercase tracking-wider">Lohnabrechnung</span><span className="text-3xs text-foreground-600">April 2026</span></div>
          <div className="flex-1 space-y-1.5 overflow-hidden">
            <div className="bg-foreground-900 border border-background-50/8 p-2 flex items-center justify-between"><div><div className="text-3xs text-background-50 font-bold">Grundgehalt</div><div className="text-[7px] text-foreground-600">96,0 Std × €14,50 brutto</div></div><span className="text-2xs text-background-50 font-black">€1.392,00</span></div>
            <div className="bg-foreground-900 border border-background-50/8 p-2 flex items-center justify-between"><div><div className="text-3xs text-background-50 font-bold">Provision Samsung</div><div className="text-[7px] text-foreground-600">18 Verkäufe × €12,00</div></div><span className="text-2xs text-primary-500 font-black">€216,00</span></div>
            <div className="bg-foreground-900 border border-background-50/8 p-2 flex items-center justify-between"><div><div className="text-3xs text-background-50 font-bold">Zielerreichungsbonus</div><div className="text-[7px] text-foreground-600">94,7% → Stufe Silber</div></div><span className="text-2xs text-primary-500 font-black">€142,50</span></div>
            <div className="bg-foreground-900 border border-background-50/8 p-2 flex items-center justify-between"><div><div className="text-3xs text-background-50 font-bold">Fahrtkosten</div><div className="text-[7px] text-foreground-600">3 Einsätze × €18,00</div></div><span className="text-2xs text-foreground-300 font-black">€54,00</span></div>
            <div className="border-t border-primary-500/30 pt-1.5 flex items-center justify-between"><span className="text-3xs text-background-50 font-black uppercase">Brutto-Gesamt</span><span className="text-sm text-primary-500 font-black">€1.804,50</span></div>
            <div className="bg-primary-500/10 border border-primary-500/20 p-1.5"><div className="flex items-center gap-1.5"><i className="ri-check-double-line text-primary-500 text-2xs" /><span className="text-3xs text-primary-500 font-bold">Ausgezahlt 30.04.2026 · SEPA</span></div></div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function EmployeeApp() {
  const tBadge = useText('srt_employee_app', 'srt-app-badge', 'SRT aus Mitarbeitersicht');
  const tHeading = useText('srt_employee_app', 'srt-app-heading', 'DIE EINSATZ-APP FÜR DIE FIELD FORCE.');
  const tSub = useText('srt_employee_app', 'srt-app-sub', '');

  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextStep = useCallback(() => { setActiveStep((p) => (p + 1) % STEPS.length); }, []);

  useEffect(() => {
    if (isPaused) return;
    const i = setInterval(nextStep, 5000);
    return () => clearInterval(i);
  }, [isPaused, nextStep]);

  return (
    <section id="team-app" className="sonic-section-md px-6 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <SectionBadge text={tBadge} variant="dark" />
          </div>
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="font-black text-foreground-950 leading-tight tracking-tight" style={{ fontSize: 'clamp(28px,4vw,42px)' }}>
              {tHeading}
            </h2>
            <p className="text-foreground-600 text-sm leading-relaxed lg:pb-1">
              {tSub || 'Alles was Außendienstmitarbeiter im Einsatz brauchen — direkt auf dem Smartphone. iOS & Android, offline-fähig.'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Step buttons — compact */}
          <div className="space-y-2">
            {STEPS.map((step, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                className={`w-full text-left flex items-center gap-4 p-4 transition-all duration-300 cursor-pointer group ${
                  activeStep === i
                    ? 'border-l-4 border-primary-500 bg-primary-500/5'
                    : 'border-l-4 border-transparent hover:bg-[#FAFDF5] hover:border-primary-500/30'
                }`}>
                <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  activeStep === i ? 'bg-primary-500 text-foreground-950' : 'bg-[#FAFDF5] text-foreground-500 group-hover:bg-[#F0F5DE]'
                }`}>
                  <i className={`${step.icon} text-base`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-2xs font-black uppercase tracking-widest transition-colors ${activeStep === i ? 'text-primary-500' : 'text-foreground-500'}`}>{step.number}</span>
                    <h3 className={`text-sm font-black transition-colors ${activeStep === i ? 'text-foreground-950' : 'text-foreground-800'}`}>{step.title}</h3>
                  </div>
                  {activeStep === i && <p className="text-xs text-foreground-600 leading-relaxed">{step.desc}</p>}
                </div>
              </button>
            ))}
          </div>

          {/* Phone — unchanged */}
          <div className="relative flex justify-center">
            <PhoneFrame width={260}>
              <div className="bg-foreground-950" style={{ height: 450 }}>
                <div className="h-6 bg-foreground-950 flex items-center justify-between px-3">
                  <span className="text-[7px] text-foreground-600 font-bold">9:41</span>
                  <div className="flex items-center gap-1">
                    <i className="ri-signal-wifi-line text-foreground-600 text-3xs" />
                    <i className="ri-battery-fill text-primary-500 text-3xs" />
                  </div>
                </div>
                <div className="h-8 bg-foreground-950 border-b border-background-50/5 flex items-center px-3">
                  <div className="w-5 h-5 bg-primary-500 flex items-center justify-center mr-2">
                    <i className="ri-cpu-line text-foreground-950 text-2xs" />
                  </div>
                  <span className="text-3xs font-black text-background-50 uppercase tracking-wider">SRT Team</span>
                  <span className="ml-auto text-[7px] text-primary-500 font-bold uppercase">{STEPS[activeStep].tag}</span>
                </div>
                <div style={{ height: 'calc(100% - 56px)' }}>
                  <PhoneScreen screen={STEPS[activeStep].screen} />
                </div>
              </div>
            </PhoneFrame>
            <FloatingBadge icon="ri-smartphone-line" text="iOS & Android" className="-top-2 -right-4" />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {STEPS.map((_, i) => (
                <button key={i} onClick={() => setActiveStep(i)} className={`transition-all duration-300 cursor-pointer ${
                  activeStep === i ? 'w-6 h-1.5 bg-primary-500' : i < activeStep ? 'w-1.5 h-1.5 bg-primary-500/50' : 'w-1.5 h-1.5 bg-foreground-300'
                }`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}