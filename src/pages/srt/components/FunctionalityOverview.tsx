import { useState, useEffect, useRef } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';

const MODULES = [
  { id: 'planung',   number: '01', icon: 'ri-calendar-2-line',         title: 'Einsatzplanung',       subtitle: 'Drag-and-Drop Kalender',              detail: 'Plane Einsätze mit einem visuellen Drag-and-Drop-Kalender. Weise Aufgaben direkt Mitarbeitern zu, setze Prioritäten und verfolge den Status in Echtzeit.', img: 'https://readdy.ai/api/search-image?query=modern+enterprise+SaaS+dark+UI+scheduling+calendar+drag+drop+lime+green+retail+field+force&width=1200&height=680&seq=srt-func-01-plan&orientation=landscape' },
  { id: 'talentpool',number: '02', icon: 'ri-team-line',               title: 'Talentpool',           subtitle: 'Von Recruiting bis Abrechnung',        detail: 'Von Bewerbung bis Abrechnung: Onboarding, Fotos, Qualifikationen, Verfügbarkeiten und Gehaltsdaten liegen zentral im SRT. Kein Tool-Wechsel.', img: 'https://readdy.ai/api/search-image?query=HR+talent+management+dashboard+dark+UI+lime+green+employee+profiles+grid+SaaS&width=1200&height=680&seq=srt-func-02-talent&orientation=landscape' },
  { id: 'gps',       number: '03', icon: 'ri-map-pin-2-line',          title: 'GPS Check-in',         subtitle: 'Nur vor Ort — keine Umgehung möglich', detail: 'Das System prüft per GPS, ob der Mitarbeiter wirklich am Einsatzort ist. Erst dann wird die Zeiterfassung freigegeben. Transparenz für alle Seiten.', img: 'https://readdy.ai/api/search-image?query=GPS+tracking+map+dark+UI+retail+store+locations+field+force+lime+green+SaaS&width=1200&height=680&seq=srt-func-03-gps&orientation=landscape' },
  { id: 'extdaten',  number: '04', icon: 'ri-plug-line',               title: 'Datenintegration',     subtitle: 'ERP, WaWi & Hersteller-Apps',         detail: 'ERP-Systeme, Warenwirtschaft, Hersteller-Apps und Handelsdaten laufen in einer Oberfläche zusammen. Planogramme, WKZ-Daten, externe Reports.', img: 'https://readdy.ai/api/search-image?query=data+integration+API+ERP+dark+UI+lime+green+enterprise+SaaS+connected+systems&width=1200&height=680&seq=srt-func-04-ext&orientation=landscape' },
  { id: 'docintel',  number: '05', icon: 'ri-file-text-line',          title: 'Doc Intelligence',     subtitle: 'KI-gestützte Dokumentenverarbeitung',  detail: 'Rechnungen, Lieferscheine und Reports werden automatisch erkannt, klassifiziert und den richtigen Projekten zugeordnet. Spart Stunden manueller Arbeit.', img: 'https://readdy.ai/api/search-image?query=AI+document+processing+dark+UI+lime+green+enterprise+SaaS+invoice+automation&width=1200&height=680&seq=srt-func-05-doc&orientation=landscape' },
  { id: 'route',     number: '06', icon: 'ri-route-line',              title: 'Routenplanung',        subtitle: 'Optimierte Außendienst-Routen',        detail: 'Das SRT berechnet die effizienteste Route für jeden Außendienstmitarbeiter — unter Berücksichtigung von Einsatzorten, Zeitfenstern und Verkehrslage.', img: 'https://readdy.ai/api/search-image?query=route+optimization+map+dark+UI+field+sales+lime+green+SaaS+enterprise&width=1200&height=680&seq=srt-func-06-route&orientation=landscape' },
];

const INTERVAL = 4500;

export default function FunctionalityOverview() {
  const { images: moduleImages } = useMediaStore('srt_functionality_images');
  const getImg = (idx: number) => moduleImages[idx]?.url ? resolveImageUrl(moduleImages[idx].url) : MODULES[idx].img;

  const tBadge   = useText('srt_functionality', 'srt-func-badge',    'Funktionsumfang');
  const tHeading = useText('srt_functionality', 'srt-func-heading',  'Alles, was Field-Force-Management braucht.');
  const tDemoCta = useText('srt_functionality', 'srt-func-demo-cta', 'Demo anfragen');

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setActive(p => (p + 1) % MODULES.length), INTERVAL);
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused]);

  const select = (i: number) => {
    if (timer.current) clearInterval(timer.current);
    setActive(i);
    setPaused(true);
    setTimeout(() => { setPaused(false); }, 8000);
  };

  const mod = MODULES[active];

  return (
    <section id="funktionsumfang" className="bg-white relative overflow-hidden py-20 md:py-28">
      {/* data grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.4) 1px, transparent 1px)', backgroundSize: '52px 52px' }}
        aria-hidden="true" />

      <div className="sonic-container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-foreground-950/20">— 6 Module</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950 uppercase">{tHeading}</h2>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-foreground-950 hover:text-primary-500 transition-colors whitespace-nowrap self-start md:self-auto"
            style={{ border: '1px solid oklch(0.13 0.005 118 / 0.25)' }}>
            {tDemoCta} <i className="ri-arrow-right-line" />
          </a>
        </div>

        {/* Main layout: screenshot (full-width) + modules below */}
        <div className="flex flex-col gap-[2px]">

          {/* Screenshot viewport — taller, more breathing room */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '16/7', minHeight: 280, border: '1px solid rgba(255,255,255,0.08)' }}>
            <img
              key={active}
              src={getImg(active)}
              alt={mod.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ animation: 'srtFuncFade 0.35s ease forwards' }}
              loading="lazy"
            />
            <style>{`@keyframes srtFuncFade { from { opacity: 0; transform: scale(1.015) } to { opacity: 1; transform: scale(1) } }`}</style>

            {/* Dark gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground-950 via-foreground-950/15 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/40 to-transparent pointer-events-none" />

            {/* Module info overlay — bottom-left */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary-500 mb-1.5">{mod.number} / 06 — {mod.subtitle}</p>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-2">{mod.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-[560px]">{mod.detail}</p>
                </div>
                {/* Progress bar */}
                <div className="hidden md:block ml-8 flex-shrink-0 w-32">
                  <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                    {!paused && (
                      <div key={active} className="h-full bg-primary-500"
                        style={{ animation: `srtProg ${INTERVAL}ms linear forwards` }} />
                    )}
                    <style>{`@keyframes srtProg { from { width: 0% } to { width: 100% } }`}</style>
                  </div>
                  <p className="text-[8px] text-white/20 mt-1 text-right">{mod.number} / 06</p>
                </div>
              </div>
            </div>
          </div>

          {/* Module tabs — 6 items in a 2×3 grid, full-width, generous */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[2px]">
            {MODULES.map((m, i) => (
              <button key={m.id} type="button" onClick={() => select(i)}
                className={`relative flex flex-col p-5 md:p-6 text-left transition-all duration-200 cursor-pointer group ${
                  active === i ? 'bg-foreground-950' : 'bg-white hover:bg-foreground-950/[0.03]'
                }`}
                style={{ border: active === i ? '1px solid oklch(0.81 0.19 115 / 0.35)' : '1px solid rgba(0,0,0,0.08)' }}>
                {/* Active top accent */}
                {active === i && <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500" />}

                {/* Icon */}
                <div className={`w-9 h-9 flex items-center justify-center mb-4 flex-shrink-0 transition-all duration-200 ${active === i ? 'bg-foreground-950' : 'bg-foreground-950/[0.06]'}`}>
                  <i className={`${m.icon} text-sm ${active === i ? 'text-primary-500' : 'text-foreground-950/40 group-hover:text-foreground-950/60'}`} />
                </div>

                {/* Text */}
                <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: active === i ? 'oklch(0.81 0.19 115)' : 'rgba(0,0,0,0.3)' }}>
                  {m.number}
                </p>
                <p className={`text-[12px] font-black uppercase leading-snug mb-1 ${active === i ? 'text-white' : 'text-foreground-950/70'}`}>
                  {m.title}
                </p>
                <p className="text-[10px] leading-snug" style={{ color: active === i ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)' }}>
                  {m.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
