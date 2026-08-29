import { useState, useEffect, useRef } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';

const MODULES = [
  { id: 'planung',   number: '01', icon: 'ri-calendar-2-line', title: 'Planung', subtitle: 'Drag-and-Drop Einsatzkalender', detail: 'Visuelle Einsatzplanung mit Drag-and-Drop. Aufgaben direkt Mitarbeitern zuweisen, Prioritäten setzen und Status in Echtzeit verfolgen.', img: 'https://readdy.ai/api/search-image?query=modern%20software%20dashboard%20task%20scheduling%20calendar%20view%20drag%20drop%20dark%20UI%20lime%20green%20accent%20retail%20field%20force%20management%20professional%20enterprise%20SaaS%20interface%20data%20visualization%20clean%20minimal%20dark%20background&width=900&height=520&seq=srt-func-01-plan&orientation=landscape' },
  { id: 'talentpool',number: '02', icon: 'ri-team-line',        title: 'Talentpool', subtitle: 'Von Recruiting bis Abrechnung', detail: 'Onboarding, Fotos, Qualifikationen, Verfügbarkeiten und Gehaltsdaten — zentral im SRT, ohne Tool-Wechsel.', img: 'https://readdy.ai/api/search-image?query=HR%20talent%20management%20dashboard%20employee%20profiles%20grid%20staff%20pool%20dark%20UI%20lime%20green%20accent%20enterprise%20software%20interface%20professional%20SaaS%20platform%20retail%20promoter%20database%20clean%20minimal&width=900&height=520&seq=srt-func-02-talent&orientation=landscape' },
  { id: 'gps',       number: '03', icon: 'ri-map-pin-2-line',   title: 'GPS Check-in', subtitle: 'Nur vor Ort — keine Umgehung', detail: 'GPS-Prüfung beim Check-in: Erst wenn der Mitarbeiter am Einsatzort ist, wird die Zeiterfassung freigegeben.', img: 'https://readdy.ai/api/search-image?query=GPS%20location%20tracking%20map%20interface%20dark%20UI%20multiple%20pins%20retail%20store%20locations%20field%20force%20check-in%20software%20dashboard%20lime%20green%20accent%20enterprise%20SaaS%20professional%20clean%20minimal%20dark%20background&width=900&height=520&seq=srt-func-03-gps&orientation=landscape' },
  { id: 'extdaten',  number: '04', icon: 'ri-plug-line',         title: 'Datenintegration', subtitle: 'ERP, WaWi & Hersteller-Apps', detail: 'ERP-Systeme, Warenwirtschaft, Hersteller-Apps und Handelsdaten laufen in einer Oberfläche zusammen.', img: 'https://readdy.ai/api/search-image?query=data%20integration%20platform%20API%20connections%20ERP%20WMS%20enterprise%20software%20dark%20UI%20lime%20green%20accent%20connected%20systems%20diagram%20SaaS%20dashboard%20professional%20clean%20minimal%20dark%20background%20data%20flow&width=900&height=520&seq=srt-func-04-ext&orientation=landscape' },
  { id: 'docintel',  number: '05', icon: 'ri-file-text-line',   title: 'Doc Intelligence', subtitle: 'KI-gestützte Verarbeitung', detail: 'Rechnungen, Lieferscheine und Reports werden automatisch erkannt, klassifiziert und den richtigen Projekten zugeordnet.', img: 'https://readdy.ai/api/search-image?query=AI%20document%20processing%20intelligence%20software%20interface%20dark%20UI%20invoice%20receipt%20classification%20automation%20lime%20green%20accent%20machine%20learning%20enterprise%20SaaS%20professional%20clean%20minimal%20dashboard&width=900&height=520&seq=srt-func-05-doc&orientation=landscape' },
  { id: 'route',     number: '06', icon: 'ri-route-line',        title: 'Routenplanung', subtitle: 'Optimierte Außendienst-Routen', detail: 'Das SRT berechnet die effizienteste Route — unter Berücksichtigung von Einsatzorten, Zeitfenstern und Verkehrslage.', img: 'https://readdy.ai/api/search-image?query=route%20optimization%20software%20map%20interface%20dark%20UI%20field%20sales%20representative%20route%20planning%20multiple%20stops%20efficiency%20lime%20green%20accent%20enterprise%20SaaS%20dashboard%20professional%20clean%20minimal&width=900&height=520&seq=srt-func-06-route&orientation=landscape' },
];

const INTERVAL = 3200;

export default function FunctionalityOverview() {
  const { images: moduleImages } = useMediaStore('srt_functionality_images');
  const getImg = (idx: number) => moduleImages[idx]?.url ? resolveImageUrl(moduleImages[idx].url) : MODULES[idx].img;

  const tBadge   = useText('srt_functionality', 'srt-func-badge',    'Funktionsumfang');
  const tHeading = useText('srt_functionality', 'srt-func-heading',  'Alles, was Field-Force-Management braucht.');
  const tDemoCta = useText('srt_functionality', 'srt-func-demo-cta', 'Demo anfragen');

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % MODULES.length);
    }, INTERVAL);
  };

  useEffect(() => {
    if (!paused) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused]);

  const select = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(i);
    setPaused(true);
    setTimeout(() => { setPaused(false); }, 6000);
  };

  const mod = MODULES[active];

  return (
    <section id="funktionsumfang" className="sonic-section-lg bg-foreground-950 relative overflow-hidden px-4 md:px-6">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(oklch(var(--primary-500) / 0.8) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary-500) / 0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="sonic-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
              <span className="text-background-50/20 text-[10px] font-black hidden md:block">— {MODULES.length} Module</span>
            </div>
            <h2 className="sonic-h2 text-background-50 uppercase">{tHeading}</h2>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo%20anfragen`}
            className="inline-flex items-center gap-2 border border-primary-500/30 text-primary-500 hover:bg-primary-500 hover:text-foreground-950 px-5 py-2.5 font-black text-xs uppercase tracking-widest transition-all duration-200 whitespace-nowrap self-start md:self-auto"
          >
            {tDemoCta}
            <i className="ri-arrow-right-line" />
          </a>
        </div>

        {/* Main layout: screenshot (left) + module grid (right) */}
        <div className="grid md:grid-cols-[1fr_340px] lg:grid-cols-[1fr_380px] gap-px bg-background-50/[0.06]">

          {/* Screenshot panel — auto-cycles */}
          <div className="relative bg-foreground-950 overflow-hidden" style={{ minHeight: 420 }}>
            <img
              key={active}
              src={getImg(active)}
              alt={mod.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fade-in"
              loading="lazy"
              style={{ animation: 'srtModFade 0.4s ease forwards' }}
            />
            <style>{`@keyframes srtModFade { from { opacity: 0; transform: scale(1.02); } to { opacity: 1; transform: scale(1); } }`}</style>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground-950 via-foreground-950/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground-950/40 pointer-events-none" />

            {/* Active module info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-500 mb-1.5">{mod.number} / 06</p>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-2">{mod.title}</h3>
              <p className="text-sm text-white/55 leading-relaxed max-w-[440px]">{mod.detail}</p>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
              {!paused && (
                <div
                  key={active}
                  className="h-full bg-primary-500"
                  style={{ animation: `linearGrow ${INTERVAL}ms linear forwards` }}
                />
              )}
            </div>
            <style>{`@keyframes linearGrow { from { width: 0% } to { width: 100% } }`}</style>
          </div>

          {/* Module grid — 6 pills, all visible */}
          <div className="grid grid-cols-2 md:grid-cols-1 bg-foreground-950">
            {MODULES.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => select(i)}
                className={`relative flex items-start gap-3 px-5 py-4 text-left transition-all duration-200 cursor-pointer group ${
                  active === i ? 'bg-primary-500/10' : 'hover:bg-background-50/4'
                }`}
                style={{ borderBottom: i < MODULES.length - 1 ? '1px solid oklch(var(--background-50) / 0.06)' : 'none' }}
              >
                {/* Active lime bar left */}
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-primary-500 transition-opacity duration-200 ${active === i ? 'opacity-100' : 'opacity-0'}`} />

                <div className={`w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm transition-all duration-200 ${
                  active === i ? 'bg-primary-500 text-foreground-950' : 'bg-background-50/8 text-background-50/35 group-hover:text-primary-500/70'
                }`}>
                  <i className={m.icon} />
                </div>
                <div className="min-w-0">
                  <p className={`text-xs font-black uppercase tracking-wide leading-tight transition-colors duration-200 ${active === i ? 'text-primary-500' : 'text-background-50/70'}`}>
                    {m.title}
                  </p>
                  <p className="text-[10px] text-background-50/30 mt-0.5 leading-snug">{m.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
