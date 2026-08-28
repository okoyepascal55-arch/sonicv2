import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';

interface Module {
  id: string;
  number: string;
  icon: string;
  title: string;
  subtitle: string;
  detail: string;
  img: string;
}

const MODULES: Module[] = [
  { id: 'planung', number: '01', icon: 'ri-calendar-2-line', title: 'Planung von Aufgaben & Einsätzen', subtitle: 'Vollständige Einsatzplanung auf einen Blick', detail: 'Plane Einsätze mit einem visuellen Drag-and-Drop-Kalender. Weise Aufgaben direkt Mitarbeitern zu, setze Prioritäten und verfolge den Status in Echtzeit. Saisonale Schwankungen und wiederkehrende Einsätze werden einfach abgebildet.', img: 'https://readdy.ai/api/search-image?query=modern%20software%20dashboard%20task%20scheduling%20calendar%20view%20drag%20drop%20dark%20UI%20lime%20green%20accent%20retail%20field%20force%20management%20professional%20enterprise%20SaaS%20interface%20data%20visualization%20clean%20minimal%20dark%20background&width=900&height=520&seq=srt-func-01-plan&orientation=landscape' },
  { id: 'talentpool', number: '02', icon: 'ri-team-line', title: 'Verwaltung des Talentpools', subtitle: 'Von Recruiting bis Abrechnung — alles in einem', detail: 'Von Bewerbung bis Abrechnung: Onboarding-Interviews, Fotos, Qualifikationen, Verfügbarkeiten und Gehaltsdaten liegen zentral im SRT. Kein Tool-Wechsel, keine Dateninseln.', img: 'https://readdy.ai/api/search-image?query=HR%20talent%20management%20dashboard%20employee%20profiles%20grid%20staff%20pool%20dark%20UI%20lime%20green%20accent%20enterprise%20software%20interface%20professional%20SaaS%20platform%20retail%20promoter%20database%20clean%20minimal&width=900&height=520&seq=srt-func-02-talent&orientation=landscape' },
  { id: 'gps', number: '03', icon: 'ri-map-pin-2-line', title: 'GPS-gestützter Einsatzort-Check-in', subtitle: 'Nur vor Ort — keine Umgehung möglich', detail: 'Kein Fake-Check-in möglich: Das System prüft per GPS, ob der Mitarbeiter wirklich am Einsatzort ist. Erst dann wird die Zeiterfassung freigegeben. Transparenz für alle Seiten.', img: 'https://readdy.ai/api/search-image?query=GPS%20location%20tracking%20map%20interface%20dark%20UI%20multiple%20pins%20retail%20store%20locations%20field%20force%20check-in%20software%20dashboard%20lime%20green%20accent%20enterprise%20SaaS%20professional%20clean%20minimal%20dark%20background&width=900&height=520&seq=srt-func-03-gps&orientation=landscape' },
  { id: 'extdaten', number: '04', icon: 'ri-plug-line', title: 'Einbindung externer Daten', subtitle: 'ERP, WaWi, Hersteller-Apps und mehr', detail: 'Verbinde ERP-Systeme, Warenwirtschaft, Hersteller-Apps und Handelsdaten nahtlos mit dem SRT. Planogramme, WKZ-Daten und externe Reports laufen in einer Oberfläche zusammen.', img: 'https://readdy.ai/api/search-image?query=data%20integration%20platform%20API%20connections%20ERP%20WMS%20enterprise%20software%20dark%20UI%20lime%20green%20accent%20connected%20systems%20diagram%20SaaS%20dashboard%20professional%20clean%20minimal%20dark%20background%20data%20flow&width=900&height=520&seq=srt-func-04-ext&orientation=landscape' },
  { id: 'docintel', number: '05', icon: 'ri-file-text-line', title: 'Document Intelligence', subtitle: 'Automatische Verarbeitung von Dokumenten', detail: 'KI-gestützte Dokumentenverarbeitung: Rechnungen, Lieferscheine und Reports werden automatisch erkannt, klassifiziert und den richtigen Projekten zugeordnet. Spart Stunden manueller Arbeit.', img: 'https://readdy.ai/api/search-image?query=AI%20document%20processing%20intelligence%20software%20interface%20dark%20UI%20invoice%20receipt%20classification%20automation%20lime%20green%20accent%20machine%20learning%20enterprise%20SaaS%20professional%20clean%20minimal%20dashboard&width=900&height=520&seq=srt-func-05-doc&orientation=landscape' },
  { id: 'route', number: '06', icon: 'ri-route-line', title: 'Routenplanung', subtitle: 'Optimierte Routen für den Außendienst', detail: 'Das SRT berechnet automatisch die effizienteste Route für jeden Außendienstmitarbeiter — unter Berücksichtigung von Einsatzorten, Zeitfenstern und Verkehrslage.', img: 'https://readdy.ai/api/search-image?query=route%20optimization%20software%20map%20interface%20dark%20UI%20field%20sales%20representative%20route%20planning%20multiple%20stops%20efficiency%20lime%20green%20accent%20enterprise%20SaaS%20dashboard%20professional%20clean%20minimal&width=900&height=520&seq=srt-func-06-route&orientation=landscape' },
];

export default function FunctionalityOverview() {
  const tBadge = useText('srt_functionality', 'srt-func-badge', 'Funktionsumfang');
  const tHeading = useText('srt_functionality', 'srt-func-heading', 'Alles, was Field-Force-Management braucht.');
  const tSub = useText('srt_functionality', 'srt-func-sub', '');
  const tDemoCta = useText('srt_functionality', 'srt-func-demo-cta', 'Demo anfragen');

  const [active, setActive] = useState(0);
  const mod = MODULES[active];

  return (
    <section id="funktionsumfang" className="sonic-section-lg bg-foreground-950 relative overflow-hidden px-4 md:px-6">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(oklch(var(--primary-500) / 0.8) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary-500) / 0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="sonic-container relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5 md:mb-6 flex-wrap">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
            <span className="text-background-50/20 text-[10px] font-black uppercase tracking-widest hidden md:block ml-auto">{MODULES.length} Module</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="sonic-h2 text-background-50 uppercase">
              {tHeading}
            </h2>
            <p className="text-background-50/50 text-sm leading-relaxed max-w-md lg:pb-1">
              {tSub || 'Von der Einsatzplanung bis zur KI-gestützten Dokumentenverarbeitung — sechs Module, eine Plattform.'}
            </p>
          </div>
        </div>

        {/* Split layout: list left, image preview right */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-0 border border-background-50/8">
          {/* Left: module list */}
          <div className="lg:col-span-2 flex flex-col">
            {MODULES.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActive(i)}
                className={`group flex items-start gap-4 px-5 py-4 text-left transition-all duration-200 cursor-pointer border-l-4 ${
                  active === i
                    ? 'bg-primary-500/8 border-primary-500'
                    : 'border-transparent hover:bg-background-50/4 hover:border-primary-500/30'
                }`}
                style={{ borderBottom: i < MODULES.length - 1 ? '1px solid oklch(var(--background-50) / 0.06)' : 'none' }}
              >
                <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-200 ${
                  active === i ? 'bg-primary-500 text-foreground-950' : 'bg-background-50/6 text-background-50/30 group-hover:text-primary-500/70'
                }`}>
                  <span className="text-xs font-black tabular-nums">{m.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-black text-sm uppercase tracking-wide leading-snug transition-colors duration-200 ${
                    active === i ? 'text-primary-500' : 'text-background-50 group-hover:text-background-50/90'
                  }`}>{m.title}</h3>
                  <p className={`text-xs mt-0.5 transition-all duration-300 ${
                    active === i ? 'text-background-50/50 max-h-10 opacity-100' : 'text-background-50/25 max-h-0 opacity-0 overflow-hidden'
                  }`}>{m.subtitle}</p>
                </div>
                {active === i && <i className="ri-arrow-right-s-line text-primary-500 text-lg flex-shrink-0 mt-1" />}
              </button>
            ))}
          </div>

          {/* Right: image preview + detail */}
          <div className="lg:col-span-3 bg-background-50/4 border-l border-background-50/8 flex flex-col">
            <div className="relative overflow-hidden" style={{ height: '260px' }}>
              <img
                key={mod.img}
                src={mod.img}
                alt={mod.title}
                className="w-full h-full object-cover transition-opacity duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground-950 via-foreground-950/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-primary-500 text-foreground-950 text-[10px] font-black px-2.5 py-1 uppercase tracking-wider">{mod.number}</span>
              </div>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <div className="w-7 h-7 flex items-center justify-center border" style={{ borderColor: "oklch(0.81 0.19 115 / 0.3)" }}>
                  <i className={`${mod.icon} text-primary-500 text-sm`} />
                </div>
                <span className="text-primary-500 text-xs font-black uppercase tracking-widest">{mod.subtitle}</span>
              </div>
            </div>
            <div className="p-5 flex-1">
              <p className="text-background-50/60 text-xs leading-relaxed">{mod.detail}</p>
            </div>

            {/* Dot nav */}
            <div className="px-5 pb-4 flex items-center gap-2">
              {MODULES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 cursor-pointer ${
                    active === i ? 'w-6 h-1.5 bg-primary-500' : 'w-1.5 h-1.5 bg-background-50/15 hover:bg-primary-500/40'
                  }`}
                  aria-label={`Modul ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Slim CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-background-50/3 border border-background-50/6 px-6 py-4">
          <div>
            <p className="text-background-50/70 font-black text-xs mb-0.5">Alle Funktionen live erleben?</p>
            <p className="text-background-50/30 text-[11px]">Wir zeigen dir das SRT live — kostenlos und unverbindlich.</p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo%20anfragen`}
            className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 px-5 py-2.5 font-black text-xs uppercase tracking-widest hover:bg-background-50 hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap group flex-shrink-0"
          >
            {tDemoCta}
            <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>

    </section>
  );
}