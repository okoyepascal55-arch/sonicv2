import { useState } from 'react';
import { useText } from '@/hooks/useText';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const SCENARIOS = [
  { id: 'live-reporting', icon: 'ri-live-line',                title: 'Live Reporting',  desc: 'Feld-Performance in Echtzeit. Keine manuellen Uploads.',        tag: 'Echtzeit', fallbackId: 'jfKfPfyJRdk' },
  { id: 'einsatzplanung', icon: 'ri-map-pin-2-line',           title: 'Einsatzplanung',  desc: 'Standorte, Zeitfenster, Personalstärke — datenbasiert.',         tag: 'Planung',  fallbackId: 'jfKfPfyJRdk' },
  { id: 'analytics',      icon: 'ri-bar-chart-grouped-line',   title: 'Analytics',       desc: 'Custom Reports, KPI-Sets, exportierbar.',                        tag: 'Analyse',  fallbackId: 'jfKfPfyJRdk' },
];

type MediaType = 'youtube' | 'video' | 'image' | 'none';

function detectMediaType(url: string): MediaType {
  if (!url) return 'none';
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
  if (lower.match(/\.(mp4|webm|mov|ogg)(\?|$)/)) return 'video';
  return 'image';
}

function extractYouTubeId(url: string): string {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : '';
}

function MediaPlayer({ url, type, fallbackId, title, active }: { url: string; type: MediaType; fallbackId: string; title: string; active: boolean }) {
  if (type === 'youtube' || type === 'none') {
    const id = type === 'youtube' ? extractYouTubeId(url) : fallbackId;
    return (
      <>
        <img
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-[0.4]"
          loading="lazy"
        />
        <iframe
          key={id + String(active)}
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </>
    );
  }
  if (type === 'video') {
    return (
      <video
        key={url}
        src={url}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  // image
  return (
    <img
      src={url}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
  );
}

export default function VideoShowcase() {
  const tBadge   = useText('srt_video_showcase', 'srt-video-badge',   'SRT in Aktion');
  const tHeading = useText('srt_video_showcase', 'srt-video-heading', 'Sieh das SRT live.');

  const { images: media1 } = useMediaStore('srt_video_media_1');
  const { images: media2 } = useMediaStore('srt_video_media_2');
  const { images: media3 } = useMediaStore('srt_video_media_3');
  const mediaSlots = [media1, media2, media3];

  const [active, setActive] = useState(0);

  const getMedia = (idx: number) => {
    const slot = mediaSlots[idx];
    const url = slot[0]?.url ? resolveImageUrl(slot[0].url) : '';
    const type = detectMediaType(url);
    return { url, type };
  };

  const current = getMedia(active);

  return (
    <section id="srt-in-aktion" className="bg-white py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        aria-hidden="true" />

      <div className="sonic-container relative z-10">
        {/* Header + tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
            </div>
            <h2 className="sonic-h2 text-foreground-950 uppercase">{tHeading}</h2>
          </div>
          {/* Scenario tabs */}
          <div className="flex gap-[2px] flex-shrink-0">
            {SCENARIOS.map((s, i) => (
              <button key={s.id} onClick={() => setActive(i)} type="button"
                className={`flex items-center gap-2 px-4 py-2.5 font-black text-[11px] uppercase tracking-wide transition-all cursor-pointer ${
                  active === i
                    ? 'bg-foreground-950 text-primary-500'
                    : 'bg-foreground-950/[0.06] text-foreground-950/50 hover:bg-foreground-950/[0.10]'
                }`}>
                <i className={s.icon} />
                <span className="hidden md:inline">{s.title}</span>
                <span className="md:hidden">{s.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Media viewport */}
        <div className="relative overflow-hidden bg-foreground-950" style={{ aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.08)' }}>
          <MediaPlayer
            url={current.url}
            type={current.type}
            fallbackId={SCENARIOS[active].fallbackId}
            title={SCENARIOS[active].title}
            active={active === active}
          />

          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Scenario info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 flex items-end justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ background: 'oklch(0.81 0.19 115 / 0.15)', border: '1px solid oklch(0.81 0.19 115 / 0.35)' }}>
                <i className={`${SCENARIOS[active].icon} text-primary-500 text-sm`} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary-500 mb-0.5">{SCENARIOS[active].tag}</p>
                <p className="text-white/60 text-xs leading-relaxed">{SCENARIOS[active].desc}</p>
              </div>
            </div>

            {/* Media type indicator */}
            <div className="flex-shrink-0 ml-4">
              <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}>
                {current.type === 'none' || current.type === 'youtube' ? 'YouTube' : current.type === 'video' ? 'Video' : 'Bild'}
              </span>
            </div>
          </div>

          {/* Progress dots */}
          <div className="absolute top-5 right-5 flex gap-1.5">
            {SCENARIOS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} type="button"
                className={`transition-all cursor-pointer ${active === i ? 'w-5 h-1.5 bg-primary-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-primary-500/50'}`}
                aria-label={`Szenario ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Dashboard note */}
        <p className="text-[10px] text-foreground-950/25 text-center mt-3 font-bold uppercase tracking-widest">
          YouTube-Link · Video-Datei · oder Bild — über das Dashboard steuerbar
        </p>
      </div>
    </section>
  );
}
