import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const EVENTS = [
  {
    id: 'content',
    tag: 'Kreation',
    title: 'Content Creation',
    stat: '50+ Shoots pro Monat',
    fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2025/10/image002Sonic-Hp.png',
    videoUrl: 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&rel=0&modestbranding=1',
  },
  {
    id: 'team',
    tag: 'Intern',
    title: 'Team Events',
    stat: '50+ Events pro Jahr',
    fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2023/01/7-1.jpg',
    videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&rel=0&modestbranding=1',
  },
  {
    id: 'promoter',
    tag: 'Extern',
    title: 'Promoter Events',
    stat: '98% Zufriedenheit',
    fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg',
    videoUrl: 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&rel=0&modestbranding=1',
  },
  {
    id: 'roadshow',
    tag: 'Unterwegs',
    title: 'Roadshows & Messen',
    stat: '100+ Städte pro Jahr',
    fallbackImage: 'https://www.sonic-group.de/wp-content/uploads/2023/02/EVENT_NEU.jpg',
    videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&rel=0&modestbranding=1',
  },
];

export default function SonicTeamEvents() {
  const [activeId, setActiveId] = useState('content');
  const [playing, setPlaying] = useState(false);
  const { images: eventImages } = useMediaStore('careers_events_images');
  const { images: eventVideos } = useMediaStore('careers_events_videos');

  const tBadge = useText('careers_events', 'careers-events-badge', 'Leben bei Sonic');
  const tHeading = useText('careers_events', 'careers-events-heading', 'Wir arbeiten hart. Wir feiern noch mehr.');

  const tCampusBadge = useText('careers_campus', 'careers-campus-badge', 'Unser Campus');
  const tCampusHeading = useText('careers_campus', 'careers-campus-heading', 'Büro erkunden');
  const tCampusSub = useText('careers_campus', 'careers-campus-sub', '360°-Rundgang durch unseren Hauptsitz in Krefeld — Campus Fichtenhain 46.');
  const tCampusAddress = useText('careers_campus', 'careers-campus-address', 'Campus Fichtenhain 46');
  const tCampusCity = useText('careers_campus', 'careers-campus-city', '47807 Krefeld, Deutschland');
  const tCampusRoute = useText('careers_campus', 'careers-campus-route', 'Route planen');
  const tCampusTip1 = useText('careers_campus', 'careers-campus-tip-1', 'Klicken & Ziehen zum Umsehen');
  const tCampusTip2 = useText('careers_campus', 'careers-campus-tip-2', 'Kreise klicken zum Bewegen');
  const tCampusTip3 = useText('careers_campus', 'careers-campus-tip-3', 'Vollbild für beste Erfahrung');

  const resolvedEvents = EVENTS.map((ev, i) => ({
    ...ev,
    image: eventImages[i]?.url || ev.fallbackImage,
    videoUrl: eventVideos[i]?.url || ev.videoUrl,
  }));

  const current = resolvedEvents.find((e) => e.id === activeId) ?? resolvedEvents[0];

  const selectEvent = (id: string) => {
    setActiveId(id);
    setPlaying(true);
  };

  return (
    <section id="leben" className="sonic-section-lg px-4 md:px-6 bg-white">
      <div className="sonic-container space-y-14 md:space-y-20">
        {/* ── Events Card ── */}
        <div
          className="relative overflow-hidden bg-white"
          style={{
            boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 8px 32px rgba(15,23,42,0.05)',
            border: '1px solid rgba(15,23,42,0.05)',
          }}
        >
          <div className="px-6 pt-10 pb-8 md:px-12 md:pt-14 md:pb-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
              <h2 className="sonic-h2 text-foreground-950">
                {tHeading.split('. ')[0]}.{' '}
                <span className="text-primary-500">
                  {tHeading.includes('.') ? tHeading.split('. ').slice(1).join('. ') : 'Wir feiern noch mehr.'}
                </span>
              </h2>
              <p className="mt-4 text-sm md:text-base font-bold text-[#6E6E68] tracking-wide max-w-xl mx-auto leading-relaxed">
                Von Content-Shootings bis Team-Events — bei Sonic ist jeder Moment eine Chance, zusammen etwas zu erleben.
              </p>
            </div>

            {/* Video Player */}
            <div
              className="relative mx-auto overflow-hidden bg-[#1a1a1a]"
              style={{
                maxWidth: 960,
                boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
              }}
            >
              {!playing ? (
                <div
                  className="relative w-full cursor-pointer group"
                  style={{ aspectRatio: '16/9' }}
                  onClick={() => setPlaying(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Play Sonic video"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setPlaying(true);
                  }}
                >
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/30" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative">
                      <div
                        className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 border border-primary-500/30 animate-ping opacity-60"
                        style={{ borderRadius: '50%', animationDuration: '2.5s' }}
                      />
                      <div
                        className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95"
                        style={{
                          backgroundColor: 'oklch(var(--primary-500))',
                          borderRadius: '50%',
                          boxShadow: '0 8px 32px rgba(200,212,0,0.35), 0 2px 8px rgba(0,0,0,0.15)',
                        }}
                      >
                        <div
                          className="w-0 h-0 ml-1"
                          style={{
                            borderTop: '10px solid transparent',
                            borderBottom: '10px solid transparent',
                            borderLeft: '18px solid #fff',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-5 left-0 right-0 text-center z-10">
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] transition-opacity duration-300 group-hover:opacity-0">
                      {current.title} — Klicken zum Abspielen
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    key={current.id}
                    src={current.videoUrl}
                    title={current.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {/* Event selector thumbnails */}
            <div className="flex justify-center gap-3 md:gap-4 mt-6 md:mt-8 flex-wrap">
              {resolvedEvents.map((ev) => {
                const isActive = ev.id === activeId;
                return (
                  <button
                    key={ev.id}
                    onClick={() => selectEvent(ev.id)}
                    className="relative overflow-hidden cursor-pointer group"
                    style={{
                      width: 160,
                      height: 100,
                      border: isActive ? '2px solid oklch(var(--primary-500))' : '2px solid transparent',
                      boxShadow: isActive ? '0 4px 12px rgba(200,212,0,0.2)' : '0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  >
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 z-10">
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">
                        {ev.tag}
                      </span>
                      <p className="text-xs font-bold text-white truncate">{ev.title}</p>
                    </div>
                    {isActive && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 flex items-center justify-center">
                        <i className="ri-check-line text-[10px] text-foreground-950 font-bold" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Campus Card ── */}
        <div
          className="relative overflow-hidden bg-white"
          style={{
            boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 8px 32px rgba(15,23,42,0.05)',
            border: '1px solid rgba(15,23,42,0.05)',
          }}
        >
          <div className="px-6 pt-10 pb-8 md:px-12 md:pt-14 md:pb-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
              <h2 className="sonic-h2 text-foreground-950">
                {tCampusHeading.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-primary-500">
                  {tCampusHeading.split(' ').slice(-1)}
                </span>
              </h2>
              <p className="mt-4 text-sm md:text-base font-bold text-[#6E6E68] tracking-wide max-w-xl mx-auto leading-relaxed">
                {tCampusSub}
              </p>
            </div>

            {/* 360 Tour */}
            <div
              className="relative mx-auto overflow-hidden bg-[#1a1a1a]"
              style={{
                maxWidth: 960,
                boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
              }}
            >
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <iframe
                  src="https://my.matterport.com/show/?m=NUpWzUwWfMQ"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  title="Sonic Office Virtual Tour"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Tips + Address */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6 md:mt-8">
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: 'ri-drag-move-line', label: tCampusTip1 },
                  { icon: 'ri-walk-line', label: tCampusTip2 },
                  { icon: 'ri-fullscreen-line', label: tCampusTip3 },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 bg-[#FAFDF5] border border-[#E7E4D4]"
                  >
                    <i className={`${item.icon} text-sm text-primary-500`} />
                    <span className="text-xs font-bold text-foreground-950">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <i className="ri-map-pin-line text-lg text-primary-500" />
                  <div>
                    <p className="font-black text-sm text-foreground-950">{tCampusAddress}</p>
                    <p className="text-xs text-[#6E6E68]">{tCampusCity}</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Campus+Fichtenhain+46,+47807+Krefeld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary-500 text-foreground-950 font-bold text-xs hover:bg-white transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-map-pin-line text-sm" />
                  {tCampusRoute}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}