import { useState } from 'react';
import { useText } from '@/hooks/useText';

// Three key demo scenarios — enough to show range without overwhelming
const VIDEOS = [
  { id: 'live-reporting', icon: 'ri-live-line', title: 'Live Reporting', desc: 'Feld-Performance in Echtzeit. Keine manuellen Uploads.', videoId: 'jfKfPfyJRdk', tag: 'Echtzeit' },
  { id: 'einsatzplanung', icon: 'ri-map-pin-2-line', title: 'Einsatzplanung', desc: 'Standorte, Zeitfenster, Personalstärke — datenbasiert.', videoId: 'jfKfPfyJRdk', tag: 'Planung' },
  { id: 'analytics', icon: 'ri-bar-chart-grouped-line', title: 'Analytics', desc: 'Custom Reports, KPI-Sets, exportierbar.', videoId: 'jfKfPfyJRdk', tag: 'Analyse' },
];

export default function VideoShowcase() {
  const tBadge = useText('srt_video_showcase', 'srt-video-badge', 'SRT in Aktion');
  const tHeading = useText('srt_video_showcase', 'srt-video-heading', 'Sieh das SRT live.');
  const [active, setActive] = useState(0);

  return (
    <section id="srt-in-aktion" className="sonic-section-md px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="sonic-container">
        {/* Compact two-column header + tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950 uppercase m-0">{tHeading}</h2>
          </div>
          {/* Tab buttons inline with header */}
          <div className="flex gap-2 flex-shrink-0">
            {VIDEOS.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-1.5 px-3 py-2 font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  active === i
                    ? 'bg-foreground-950 text-primary-500'
                    : 'bg-[#FAFDF5] ring-1 ring-foreground-950/10 text-foreground-600 hover:ring-primary-500/40'
                }`}
              >
                <i className={`${v.icon} text-sm`} />
                <span className="hidden md:inline">{v.title}</span>
                <span className="md:hidden">{v.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fixed-height video — not full aspect-video bleed */}
        <div className="bg-foreground-950 overflow-hidden border-2 border-primary-500/20" style={{ height: 420 }}>
          <div className="relative w-full h-full">
            <img
              src={`https://img.youtube.com/vi/${VIDEOS[active].videoId}/maxresdefault.jpg`}
              alt={VIDEOS[active].title}
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              loading="lazy"
            />
            <iframe
              key={VIDEOS[active].videoId + active}
              src={`https://www.youtube.com/embed/${VIDEOS[active].videoId}?autoplay=1&mute=1&loop=1&playlist=${VIDEOS[active].videoId}`}
              title={VIDEOS[active].title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Bottom label overlay — no separate description bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground-950 via-foreground-950/60 to-transparent pt-12 px-5 pb-5 pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center border flex-shrink-0" style={{ borderColor: 'oklch(0.81 0.19 115 / 0.35)' }}>
                  <i className={`${VIDEOS[active].icon} text-primary-500 text-base`} />
                </div>
                <div>
                  <p className="text-xs text-primary-500 font-black uppercase tracking-widest leading-none mb-0.5">{VIDEOS[active].tag}</p>
                  <p className="text-background-50/55 text-xs leading-relaxed m-0">{VIDEOS[active].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal dot nav */}
        <div className="mt-3 flex items-center gap-1.5 justify-center">
          {VIDEOS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`transition-all duration-200 cursor-pointer ${
              active === i ? 'w-5 h-1 bg-primary-500' : 'w-1 h-1 bg-foreground-950/15 hover:bg-primary-500/40'
            }`} aria-label={`Video ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
