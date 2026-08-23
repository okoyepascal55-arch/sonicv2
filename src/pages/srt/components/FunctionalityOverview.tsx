import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
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
  { id: 'planung', number: '01', icon: 'ri-calendar-2-line', title: 'Planung von Aufgaben & Einsätzen', subtitle: 'Vollständige Einsatzplanung auf einen Blick', detail: 'Plane Einsätze mit einem visuellen Drag-and-Drop-Kalender. Weise Aufgaben direkt Mitarbeitern zu, setze Prioritäten und verfolge den Status in Echtzeit. Saisonale Schwankungen und wiederkehrende Einsätze werden einfach abgebildet.', img: 'https://readdy.ai/api/search-image?query=professional%20field%20force%20planning%20dashboard%20software%20dark%20interface%20with%20calendar%20task%20scheduling%20beautiful%20modern%20UI%20design%20on%20laptop%20screen%20workspace%20with%20warm%20wood%20desk%20accessories%20organized%20workflow%20management%20enterprise%20software%20sleek%20minimal%20design%20warm%20studio%20lighting&width=1200&height=700&seq=srt-func-plan-v4&orientation=landscape' },
  { id: 'talentpool', number: '02', icon: 'ri-team-line', title: 'Verwaltung des Talentpools', subtitle: 'Von Recruiting bis Abrechnung — alles in einem', detail: 'Von Bewerbung bis Abrechnung: Onboarding-Interviews, Fotos, Qualifikationen, Verfügbarkeiten und Gehaltsdaten liegen zentral im SRT. Kein Tool-Wechsel, keine Dateninseln.', img: 'https://readdy.ai/api/search-image?query=talent%20management%20HR%20employee%20profiles%20team%20database%20software%20beautiful%20modern%20dark%20interface%20with%20profile%20photos%20skills%20ratings%20analytics%20field%20force%20workforce%20management%20enterprise%20SaaS%20clean%20minimal%20design%20professional%20studio%20photography%20warm%20lighting&width=1200&height=700&seq=srt-func-talent-v4&orientation=landscape' },
  { id: 'gps', number: '03', icon: 'ri-map-pin-2-line', title: 'GPS-gestützter Einsatzort-Check-in', subtitle: 'Nur vor Ort — keine Umgehung möglich', detail: 'Kein Fake-Check-in möglich: Das System prüft per GPS, ob der Mitarbeiter wirklich am Einsatzort ist. Erst dann wird die Zeiterfassung freigegeben. Transparenz für alle Seiten.', img: 'https://readdy.ai/api/search-image?query=GPS%20location%20tracking%20mobile%20app%20field%20service%20check-in%20map%20pins%20real%20time%20location%20monitoring%20beautiful%20dark%20interface%20smartphone%20screen%20showing%20store%20location%20verification%20map%20overlay%20retail%20field%20operations%20professional%20clean%20minimal%20design%20warm%20studio%20photography&width=1200&height=700&seq=srt-func-gps-v4&orientation=landscape' },
  { id: 'extdaten', number: '04', icon: 'ri-plug-line', title: 'Einbindung externer Daten', subtitle: 'ERP, WaWi, Hersteller-Apps und mehr', detail: 'Verbinde ERP-Systeme, Warenwirtschaft, Hersteller-Apps und Handelsdaten nahtlos mit dem SRT. Planogramme, WKZ-Daten und externe Reports laufen in einer Oberfläche zusammen.', img: 'https://readdy.ai/api/search-image?query=enterprise%20data%20integration%20API%20connections%20ERP%20system%20dashboard%20beautiful%20modern%20dark%20interface%20data%20flow%20visualization%20connecting%20multiple%20enterprise%20software%20platforms%20SAP%20integration%20real%20time%20sync%20professional%20minimal%20SaaS%20UI%20warm%20studio%20lighting%20clean%20design&width=1200&height=700&seq=srt-func-ext-v4&orientation=landscape' },
  { id: 'docintel', number: '05', icon: 'ri-file-text-line', title: 'Document Intelligence', subtitle: 'Automatische Verarbeitung von Dokumenten', detail: 'KI-gestützte Dokumentenverarbeitung: Rechnungen, Lieferscheine und Reports werden automatisch erkannt, klassifiziert und den richtigen Projekten zugeordnet. Spart Stunden manueller Arbeit.', img: 'https://readdy.ai/api/search-image?query=AI%20document%20processing%20intelligence%20automated%20invoice%20scanning%20classification%20machine%20learning%20document%20analysis%20beautiful%20dark%20software%20interface%20with%20document%20thumbnails%20automatic%20tagging%20routing%20professional%20enterprise%20SaaS%20minimal%20clean%20design%20warm%20studio%20photography&width=1200&height=700&seq=srt-func-doc-v4&orientation=landscape' },
  { id: 'route', number: '06', icon: 'ri-route-line', title: 'Routenplanung', subtitle: 'Optimierte Routen für den Außendienst', detail: 'Das SRT berechnet automatisch die effizienteste Route für jeden Außendienstmitarbeiter — unter Berücksichtigung von Einsatzorten, Zeitfenstern und Verkehrslage.', img: 'https://readdy.ai/api/search-image?query=route%20optimization%20software%20field%20service%20representatives%20map%20view%20with%20optimized%20travel%20routes%20colored%20path%20overlays%20beautiful%20dark%20interface%20enterprise%20logistics%20planning%20multiple%20stops%20map%20pins%20distance%20calculation%20professional%20minimal%20SaaS%20UI%20warm%20studio%20lighting&width=1200&height=700&seq=srt-func-route-v4&orientation=landscape' },
];

export default function FunctionalityOverview() {
  const tBadge = useText('srt_functionality', 'srt-func-badge', 'Funktionsumfang');
  const tHeading = useText('srt_functionality', 'srt-func-heading', 'ALLES WAS FIELD-FORCE-MANAGEMENT BRAUCHT.');
  const tSub = useText('srt_functionality', 'srt-func-sub', '');
  const tDemoCta = useText('srt_functionality', 'srt-func-demo-cta', 'Demo anfragen');

  const [active, setActive] = useState(0);
  const mod = MODULES[active];

  return (
    <section id="funktionsumfang" className="bg-foreground-950 relative overflow-hidden py-20 px-4 md:px-6">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(oklch(var(--primary-500) / 0.8) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary-500) / 0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <SectionBadge text={tBadge} variant="light" />
            <span className="text-background-50/20 text-[10px] font-black uppercase tracking-widest hidden md:block">{MODULES.length} Module</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 items-end">
            <h2 className="font-black text-background-50 leading-tight tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              {tHeading}
            </h2>
            <p className="text-background-50/50 text-sm leading-relaxed max-w-md lg:pb-1">
              {tSub || 'Von der Einsatzplanung bis zur KI-gestützten Dokumentenverarbeitung — sechs Module, eine Plattform.'}
            </p>
          </div>
        </div>

        {/* Split layout: list left, image preview right */}
        <div className="grid lg:grid-cols-5 gap-0 border border-background-50/8">
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
                className="w-full h-full object-cover object-top transition-all duration-500"
                style={{ animation: 'fadeIn 0.35s ease-out' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground-950 via-foreground-950/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-primary-500 text-foreground-950 text-[10px] font-black px-2.5 py-1 uppercase tracking-wider">{mod.number}</span>
              </div>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <div className="w-7 h-7 flex items-center justify-center bg-primary-500/15 border border-primary-500/30">
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