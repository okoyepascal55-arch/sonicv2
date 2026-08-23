import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useText } from '@/hooks/useText';

const VIDEOS = [
  { id: 'live-reporting', icon: 'ri-live-line', title: 'Live Reporting', desc: 'Sieh Feld-Performance-Daten in Echtzeit fließen. Keine Verzögerungen, kein manuelles Hochladen.', videoId: 'jfKfPfyJRdk', tag: 'Echtzeit' },
  { id: 'dashboard', icon: 'ri-dashboard-3-line', title: 'Dashboard', desc: 'Navigiere deinen gesamten Betrieb von einem Bildschirm aus. Custom-Views und exportierbare Reports.', videoId: 'jfKfPfyJRdk', tag: 'Überblick' },
  { id: 'team-performance', icon: 'ri-team-line', title: 'Team-Performance', desc: 'Verfolge individuelle und Team-Metriken. Top-Performer, Schulungsbedarf, Standortoptimierung.', videoId: 'jfKfPfyJRdk', tag: 'HR & Teams' },
  { id: 'einsatzplanung', icon: 'ri-map-pin-2-line', title: 'Einsatzplanung', desc: 'Standorte, Zeitfenster, Personalstärke — datenbasiert optimiert mit Saisonalität und Historie.', videoId: 'jfKfPfyJRdk', tag: 'Planung' },
  { id: 'forecasting', icon: 'ri-line-chart-line', title: 'Forecasting', desc: 'Prognosen bevor der erste Einsatz startet. Sell-out-Vorhersagen auf Basis von 1,35 Mio. Einsätzen.', videoId: 'jfKfPfyJRdk', tag: 'Prognose' },
  { id: 'analytics', icon: 'ri-bar-chart-grouped-line', title: 'Analytics', desc: 'Baue die Reports die du brauchst. Definiere Parameter, setze KPIs, bekomme Antworten.', videoId: 'jfKfPfyJRdk', tag: 'Analyse' },
];

export default function VideoShowcase() {
  const tBadge = useText('srt_video_showcase', 'srt-video-badge', 'SRT in Aktion');
  const tHeading = useText('srt_video_showcase', 'srt-video-heading', 'SIEH DAS SRT LIVE.');
  const tSub = useText('srt_video_showcase', 'srt-video-sub', 'Jede Funktion demonstriert. Wähle eine Funktion und sieh zu.');

  const [active, setActive] = useState(0);

  return (
    <section id="srt-in-aktion" className="sonic-section-lg px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="sonic-container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <SectionBadge text={tBadge} variant="dark" />
          </div>
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="font-black text-foreground-950 leading-none tracking-tight" style={{ fontSize: 'clamp(32px,5vw,60px)' }}>
              {tHeading}
            </h2>
            <p className="text-foreground-600 text-sm leading-relaxed lg:pb-1">
              {tSub}
            </p>
          </div>
        </div>

        {/* Pill tabs — like EventsShowcase */}
        <div className="flex flex-wrap gap-2 mb-6 justify-start">
          {VIDEOS.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 font-bold text-xs transition-all whitespace-nowrap cursor-pointer ${
                active === i
                  ? 'bg-white ring-2 ring-primary-500 text-primary-500'
                  : 'bg-[#FAFDF5] hover:bg-white ring-1 ring-background-200 hover:ring-primary-500/40 text-foreground-600'
              }`}
              style={{ borderRadius: 0 }}
            >
              <i className={`${v.icon} text-sm`} />
              <span className="hidden sm:inline">{v.title}</span>
              <span className="sm:hidden text-[10px]">{v.tag}</span>
            </button>
          ))}
        </div>

        {/* Video panel */}
        <div className="bg-foreground-950 overflow-hidden border-2 border-primary-500/20">
          <div className="relative aspect-video">
            <iframe
              key={VIDEOS[active].videoId + active}
              src={`https://www.youtube.com/embed/${VIDEOS[active].videoId}?autoplay=1&mute=1&loop=1&playlist=${VIDEOS[active].videoId}`}
              title={VIDEOS[active].title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-foreground-950 to-transparent pointer-events-none" />
          </div>

          {/* Description bar below video */}
          <div className="px-6 py-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
              <i className={`${VIDEOS[active].icon} text-primary-500 text-lg`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-black text-background-50">{VIDEOS[active].title}</h3>
                <span className="text-[10px] font-bold text-primary-500 bg-primary-500/10 border border-primary-500/20 px-2 py-0.5 uppercase tracking-wider whitespace-nowrap">
                  {VIDEOS[active].tag}
                </span>
              </div>
              <p className="text-background-50/45 text-xs leading-relaxed">{VIDEOS[active].desc}</p>
            </div>
          </div>
        </div>

        {/* Dot nav */}
        <div className="mt-3 flex items-center gap-2 justify-center">
          {VIDEOS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`transition-all duration-200 cursor-pointer ${
              active === i ? 'w-6 h-1.5 bg-primary-500' : 'w-1.5 h-1.5 bg-background-200 hover:bg-primary-500/40'
            }`} aria-label={`Video ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}