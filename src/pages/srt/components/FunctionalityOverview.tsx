import { useState, useEffect, useRef } from 'react';
import { useMotionPaused } from '@/lib/motion';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { WindowBar, ProductGrid, Mono } from './SrtKit';

const MODULES = [
  { id: 'planung',   number: '01', icon: 'ri-calendar-2-line',         title: 'Einsatzplanung',       subtitle: 'Drag-and-Drop Kalender',              detail: 'Plane Einsätze mit einem visuellen Drag-and-Drop-Kalender. Weise Aufgaben direkt Mitarbeitern zu, setze Prioritäten und verfolge den Status in Echtzeit.', img: 'https://readdy.ai/api/search-image?query=modern+enterprise+SaaS+dark+UI+scheduling+calendar+drag+drop+lime+green+retail+field+force&width=1200&height=680&seq=srt-func-01-plan&orientation=landscape' },
  { id: 'talentpool',number: '02', icon: 'ri-team-line',               title: 'Talentpool',           subtitle: 'Von Recruiting bis Abrechnung',        detail: 'Von Bewerbung bis Abrechnung: Onboarding, Fotos, Qualifikationen, Verfügbarkeiten und Gehaltsdaten liegen zentral im SRT. Kein Tool-Wechsel.', img: 'https://readdy.ai/api/search-image?query=HR+talent+management+dashboard+dark+UI+lime+green+employee+profiles+grid+SaaS&width=1200&height=680&seq=srt-func-02-talent&orientation=landscape' },
  { id: 'gps',       number: '03', icon: 'ri-map-pin-2-line',          title: 'GPS Check-in',         subtitle: 'Nur vor Ort — keine Umgehung möglich', detail: 'Das System prüft per GPS, ob der Mitarbeiter wirklich am Einsatzort ist. Erst dann wird die Zeiterfassung freigegeben. Transparenz für alle Seiten.', img: 'https://readdy.ai/api/search-image?query=GPS+tracking+map+dark+UI+retail+store+locations+field+force+lime+green+SaaS&width=1200&height=680&seq=srt-func-03-gps&orientation=landscape' },
  { id: 'extdaten',  number: '04', icon: 'ri-plug-line',               title: 'Datenintegration',     subtitle: 'Online-Shops, Hersteller-Apps & Handelsdaten', detail: 'Daten aus Online-Shops, Hersteller-Apps und dem Handel laufen im SRT in einer Oberfläche zusammen — inklusive WKZ-Handling.', img: 'https://readdy.ai/api/search-image?query=data+integration+API+ERP+dark+UI+lime+green+enterprise+SaaS+connected+systems&width=1200&height=680&seq=srt-func-04-ext&orientation=landscape' },
  { id: 'docintel',  number: '05', icon: 'ri-file-text-line',          title: 'Dokumenten-KI',     subtitle: 'KI-gestützte Dokumentenverarbeitung',  detail: 'Rechnungen, Lieferscheine und Reports werden automatisch erkannt, klassifiziert und den richtigen Projekten zugeordnet. Spart Stunden manueller Arbeit.', img: 'https://readdy.ai/api/search-image?query=AI+document+processing+dark+UI+lime+green+enterprise+SaaS+invoice+automation&width=1200&height=680&seq=srt-func-05-doc&orientation=landscape' },
  { id: 'route',     number: '06', icon: 'ri-route-line',              title: 'Routenplanung',        subtitle: 'In Entwicklung · ab 2026/27',          detail: 'Geplant für 2026/27: Das SRT soll Routen für den Außendienst planen — auf Basis von Einsatzorten und Zeitfenstern.', img: 'https://readdy.ai/api/search-image?query=route+optimization+map+dark+UI+field+sales+lime+green+SaaS+enterprise&width=1200&height=680&seq=srt-func-06-route&orientation=landscape' },
];

const INTERVAL = 4500;

export default function FunctionalityOverview() {
  const { images: moduleImages } = useMediaStore('srt_functionality_images');
  const getImg = (idx: number) => moduleImages[idx]?.url ? resolveImageUrl(moduleImages[idx].url) : MODULES[idx].img;

  const tBadge   = useText('srt_functionality', 'srt-func-badge',    'Funktionsumfang');
  const tHeading = useText('srt_functionality', 'srt-func-heading',  'Die Module hinter dem Dashboard.');
  const tDemoCta = useText('srt_functionality', 'srt-func-demo-cta', 'Demo anfragen');
  // Dashboard → Text → SRT → „SRT — Funktionsumfang: 6 Module“
  const mt = useReviewText('srt_modules');
  const modules = MODULES.map((m, i) => ({
    ...m,
    title: mt[`m${i + 1}-title`] ?? m.title,
    subtitle: mt[`m${i + 1}-subtitle`] ?? m.subtitle,
    detail: mt[`m${i + 1}-detail`] ?? m.detail,
  }));

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setActive(p => (p + 1) % MODULES.length), INTERVAL);
  };

  const motionPaused = useMotionPaused();
  useEffect(() => {
    if (!paused && !motionPaused) startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, motionPaused]);

  const select = (i: number) => {
    if (timer.current) clearInterval(timer.current);
    setActive(i);
    setPaused(true);
    setTimeout(() => { setPaused(false); }, 8000);
  };

  const mod = modules[active];

  return (
    <section id="funktionsumfang" className="bg-foreground-950 relative overflow-hidden py-10 md:py-14 px-4 md:px-6">
      <ProductGrid />

      <div className="sonic-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
              <Mono dim>— 6 Module</Mono>
            </div>
            <h2 className="sonic-h2 text-white">{tHeading}</h2>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo`}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white hover:text-primary-500 hover:border-primary-500 transition-colors whitespace-nowrap self-start md:self-auto"
            style={{ border: '1px solid rgba(255,255,255,0.25)' }}>
            {tDemoCta} <i className="ri-arrow-right-line" />
          </a>
        </div>

        {/* Main layout: screenshot (full-width) + modules below */}
        <div className="flex flex-col gap-3">

          {/* Module preview in an app window (22.10.2026) */}
          <div className="flex flex-col overflow-hidden" style={{ background: 'oklch(0.155 0.006 118)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 80px -30px rgba(0,0,0,0.8)' }}>
          <WindowBar title={<>SRT · Module · {mod.title}</>} />
          <div className="relative overflow-hidden" style={{ aspectRatio: '16/7', minHeight: 280 }}>
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
                  <p className="mb-2"><Mono>Modul {mod.number} / 06 — {mod.subtitle}</Mono></p>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2">{mod.title}</h3>
                  <p className="text-[15px] text-white/70 leading-relaxed max-w-[620px]">{mod.detail}</p>
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
                  <p className="mt-1.5 text-right"><Mono dim>{mod.number} / 06</Mono></p>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Module tabs — 6 items in a 2×3 grid, full-width, generous */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {modules.map((m, i) => (
              <button key={m.id} type="button" onClick={() => select(i)}
                className={`relative flex flex-col p-5 md:p-6 text-left transition-all duration-200 cursor-pointer group ${
                  active === i ? '' : 'hover:bg-white/[0.04]'
                }`}
                style={{ background: active === i ? 'oklch(0.81 0.19 115 / 0.08)' : 'oklch(0.155 0.006 118)', border: active === i ? '1px solid oklch(0.81 0.19 115 / 0.55)' : '1px solid rgba(255,255,255,0.08)' }}>
                {/* Active top accent */}
                {active === i && <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500" />}

                {/* Icon */}
                <div className="w-9 h-9 flex items-center justify-center mb-4 flex-shrink-0 transition-all duration-200" style={{ background: active === i ? 'oklch(0.81 0.19 115 / 0.15)' : 'rgba(255,255,255,0.05)' }}>
                  <i className={`${m.icon} text-sm ${active === i ? 'text-primary-500' : 'text-white/45 group-hover:text-white/70'}`} />
                </div>

                {/* Text */}
                <p className="mb-2"><Mono dim={active !== i}>{m.number}</Mono></p>
                <p className={`text-[13px] font-black uppercase leading-snug mb-1 ${active === i ? 'text-white' : 'text-white/75'}`}>
                  {m.title}
                </p>
                <p className="text-[11px] leading-snug" style={{ color: active === i ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.45)' }}>
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
