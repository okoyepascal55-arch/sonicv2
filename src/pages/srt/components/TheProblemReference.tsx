import { useState } from 'react';
import { useText } from '@/hooks/useText';

const PROBLEMS = [
  { num: '01', icon: 'ri-database-2-line', title: 'Getrennte Datensilos', headline: 'Daten liegen überall — nur nicht zusammen.', body: 'Die Realität im Retail: WaWi-Daten hier, Kampagnendaten dort, Einsatzplanung in einem Drittanbieter-Tool. Jede Abteilung pflegt ihre eigene Wahrheit. Ein ganzheitliches Bild der Performance entsteht — wenn überhaupt — nur durch aufwendige manuelle Zusammenführung.', impact: 'Ergebnis: Wertvolle Zeit geht verloren. Entscheidungen basieren auf Datenschnipseln statt auf der vollständigen Realität.', tags: ['WaWi', 'Marketing', 'Silos', 'Manuell'] },
  { num: '02', icon: 'ri-eye-off-line', title: 'Keine Dashboards', headline: 'Was du nicht siehst, kannst du nicht steuern.', body: 'Ohne eine gemeinsame Datenbasis ist es schlicht unmöglich, aussagekräftige KPIs zu definieren und live zu monitoren. Kampagnen-Performance wird erst nach Wochen sichtbar — oft zu spät, um noch einzugreifen. Führungskräfte treffen Entscheidungen im Blindflug.', impact: 'Ergebnis: Fehlgeleitete Ressourcen, verpasste Optimierungsfenster, frustrierte Stakeholder.', tags: ['KPI', 'Monitoring', 'Dashboard', 'Echtzeit'] },
  { num: '03', icon: 'ri-time-line', title: 'Verspätete Erkenntnisse', headline: 'Wer zu spät kommt, verliert den Marktanteil.', body: 'Manuelle Auswertungen, Excel-Konsolidierungen, wöchentliche Meetings nur um Datenstände zu berichten — das kostet Zeit, die am Markt fehlt. Wenn eine Kampagne schlecht läuft, erfährt das Management es erst Tage oder Wochen später. Schnelle Nachjustierungen sind dann kaum noch möglich.', impact: 'Ergebnis: Reaktives statt proaktives Management. Wettbewerber, die schneller sehen, agieren schneller.', tags: ['Insights', 'Echtzeit', 'Verzug', 'Reaktiv'] },
];

export default function TheProblemReference() {
  const [open, setOpen] = useState<number | null>(null);
  const tBadge = useText('srt_problem', 'srt-problem-badge', 'Deine Herausforderung');
  const tHeading = useText('srt_problem', 'srt-problem-heading', 'Datenquellen zusammenführen');
  const tIntro = useText('srt_problem', 'srt-problem-p1', 'Für effizientes Performance-Marketing müssen Daten aus vielen Quellen in Echtzeit zusammenlaufen. Genau daran scheitern die meisten Unternehmen — nicht an der Strategie, sondern an der Infrastruktur.');
  const tCta = useText('srt_problem', 'srt-problem-cta', 'Das SRT löst alle drei Probleme.');
  const tCtaSub = useText('srt_problem', 'srt-problem-cta-sub', 'Eine Plattform. Alle Daten. Echtzeit.');
  const tCtaBtn = useText('srt_problem', 'srt-problem-cta-btn', 'Lösung ansehen');

  return (
    <section className="relative overflow-hidden bg-white px-6" style={{ paddingTop: 88, paddingBottom: 88 }}>
      <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 font-black leading-none pointer-events-none select-none" style={{ fontSize: 'clamp(120px,18vw,220px)', color: 'transparent', WebkitTextStroke: '1px rgba(0,0,0,0.04)', letterSpacing: '-0.05em' }}>PROBLEM</div>
      <div className="max-w-[1280px] mx-auto relative">
        <div className="flex items-center gap-4 mb-8"><span className="flex items-center gap-3"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-700">{tBadge}</span></span><div className="flex-1 h-px bg-gradient-to-r from-primary-500/30 to-transparent" /></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-end">
          <h2 className="leist-h2 text-foreground-950 uppercase">{tHeading}</h2>
          <div className="md:pl-8 border-l-2 border-primary-500/40"><p className="text-base text-foreground-700 leading-relaxed mb-5">{tIntro}</p><p className="text-sm text-foreground-500 leading-relaxed">Die drei häufigsten Probleme, die wir bei unseren Kunden beobachten — und für die das SRT die direkte Antwort ist.</p></div>
        </div>

        <div>
          {PROBLEMS.map((problem, index) => {
            const isOpen = open === index;
            return (
              <div key={problem.num} className="relative border-t border-foreground-950/10">
                <button type="button" className="w-full text-left px-6 md:px-8 py-8 cursor-pointer transition-colors hover:bg-[#FAFDF5]" onClick={() => setOpen(isOpen ? null : index)} aria-expanded={isOpen}>
                  <div className="grid md:grid-cols-[80px_1fr_auto] gap-4 md:gap-8 items-start">
                    <div className="hidden md:block"><span className="font-black leading-none tabular-nums" style={{ fontSize: 56, color: isOpen ? 'oklch(0.81 0.19 115)' : 'rgba(0,0,0,0.08)', WebkitTextStroke: isOpen ? undefined : '1px rgba(0,0,0,0.12)' }}>{problem.num}</span></div>
                    <div>
                      <div className="flex items-center gap-3 mb-2"><span className="flex w-8 h-8 items-center justify-center border" style={{ borderColor: 'oklch(0.81 0.19 115 / 0.3)', background: 'transparent' }}><i className={`${problem.icon} text-sm text-primary-600`} /></span><span className="text-[10px] font-black uppercase tracking-widest text-foreground-500">{problem.title}</span></div>
                      <h3 className="text-xl md:text-2xl font-black leading-tight tracking-tight uppercase text-foreground-950">{problem.headline}</h3>
                      <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: isOpen ? 500 : 0, opacity: isOpen ? 1 : 0 }}>
                        <div className="pt-5 grid md:grid-cols-[3fr_2fr] gap-6 md:gap-8">
                          <p className="text-sm text-foreground-700 leading-relaxed">{problem.body}</p>
                          <div className="flex flex-col gap-3"><div className="flex gap-3 items-start bg-foreground-950 px-4 py-4"><i className="ri-alert-line text-primary-500 text-sm mt-0.5" /><p className="text-xs text-white/75 leading-relaxed">{problem.impact}</p></div><div className="flex flex-wrap gap-1.5">{problem.tags.map(tag => <span key={tag} className="text-[9px] font-black px-2.5 py-1 uppercase tracking-widest text-primary-600 bg-primary-500/10 border border-primary-500/20">{tag}</span>)}</div></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1"><span className="hidden md:block text-[10px] font-bold text-foreground-500 whitespace-nowrap">{isOpen ? 'Einklappen' : 'Mehr lesen'}</span><span className="w-8 h-8 flex items-center justify-center border transition-transform" style={{ borderColor: isOpen ? 'oklch(0.81 0.19 115)' : 'rgba(0,0,0,0.12)', background: isOpen ? 'oklch(0.81 0.19 115)' : 'transparent', transform: isOpen ? 'rotate(180deg)' : 'none' }}><i className="ri-arrow-down-s-line" /></span></div>
                  </div>
                </button>
              </div>
            );
          })}
          <div className="border-t border-foreground-950/10" />
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-foreground-950 px-8 py-7">
          <div><p className="text-white font-black text-lg leading-tight mb-1"><span className="text-primary-500">{tCta.split('.')[0] || tCta}.</span>{tCta.includes('.') ? ` ${tCta.split('.').slice(1).join('.')}` : ''}</p><p className="text-foreground-500 text-sm">{tCtaSub}</p></div>
          <button type="button" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="flex items-center gap-2 bg-primary-500 text-foreground-950 px-7 py-3.5 font-black text-sm uppercase tracking-widest whitespace-nowrap">{tCtaBtn}<i className="ri-arrow-right-line" /></button>
        </div>
      </div>
    </section>
  );
}
