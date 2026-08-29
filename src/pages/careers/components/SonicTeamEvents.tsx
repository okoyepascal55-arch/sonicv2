import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { ChapterHeader, Marker } from './ChapterKit';

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
    fallbackImage: '/images/Karriere/IMG_0002.webp',
    videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&rel=0&modestbranding=1',
  },
];

export default function SonicTeamEvents() {
  const [activeId, setActiveId] = useState('content');
  const [playing, setPlaying] = useState(false);
  const { images: eventImages } = useMediaStore('careers_events_images');
  const { images: eventVideos } = useMediaStore('careers_events_videos');

  const tBadge = useText('careers_events', 'careers-events-badge', 'Leben bei Sonic');
  const tHeading = useText('careers_events', 'careers-events-heading', 'Sonic ist mehr als ein Job.');
  const tSub = useText('careers_events', 'careers-events-sub', 'Von Content-Shootings bis Team-Events — bei Sonic ist jeder Moment eine Chance, zusammen etwas zu erleben.');

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

  const headingSentences = tHeading.split('. ').map((s) => (s.endsWith('.') ? s : `${s}.`));
  const headingMain = headingSentences[0] ?? tHeading;
  const headingAccent = headingSentences.length > 1 ? headingSentences.slice(1).join(' ') : '';

  return (
    <section id="leben" className="bg-white py-20 md:py-[104px] px-5 md:px-10 overflow-hidden">
      <div className="sonic-container">
        <ChapterHeader
          n="05"
          eyebrow={tBadge}
          heading={<>{headingMain} {headingAccent && <Marker>{headingAccent}</Marker>}</>}
          sub={tSub}
          headingMax="max-w-[660px]"
        />

        {/* Events block */}
        <div className="mb-16" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
          <div className="relative aspect-video overflow-hidden" style={{ background: 'oklch(0.13 0.005 118)' }}>
            {!playing ? (
              <div
                className="relative w-full h-full cursor-pointer group"
                onClick={() => setPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Video abspielen"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setPlaying(true); }}
              >
                <img src={current.image} alt={current.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105" style={{ background: 'oklch(var(--primary-500))' }}>
                    <div className="w-0 h-0 ml-1.5" style={{ borderTop: '11px solid transparent', borderBottom: '11px solid transparent', borderLeft: '19px solid #fff' }} />
                  </div>
                </div>
                <div
                  className="absolute left-7 bottom-6 px-3.5 py-[9px]"
                  style={{ background: 'rgba(12,13,11,0.42)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)' }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary-500 mb-0.5">{current.tag}</p>
                  <p className="text-sm font-black text-white">
                    {current.title} <span className="font-semibold text-white/60">· {current.stat}</span>
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                key={current.id}
                src={current.videoUrl}
                title={current.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            {resolvedEvents.map((ev, i) => {
              const isActive = ev.id === activeId;
              return (
                <button
                  key={ev.id}
                  onClick={() => selectEvent(ev.id)}
                  className="relative h-[132px] overflow-hidden text-left cursor-pointer"
                  style={{
                    borderRight: i < resolvedEvents.length - 1 ? '1px solid oklch(var(--foreground-950) / 0.1)' : undefined,
                    borderBottom: isActive ? '3px solid oklch(var(--primary-500))' : '3px solid transparent',
                  }}
                >
                  <img src={ev.image} alt={ev.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: isActive ? 'rgba(10,11,9,0.35)' : 'rgba(10,11,9,0.5)' }} />
                  <div className="absolute left-3.5 bottom-3">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-0.5" style={{ color: isActive ? 'oklch(var(--primary-500))' : 'rgba(255,255,255,0.6)' }}>{ev.tag}</p>
                    <p className="text-[13px] font-black text-white">{ev.title}</p>
                    <p className="text-[10px] font-semibold text-white/60">{ev.stat}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Campus */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-7 h-0.5 bg-primary-500" aria-hidden="true" />
          <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tCampusBadge}</span>
        </div>
        <h3 className="font-black mb-4 text-foreground-950" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.5rem)', lineHeight: 1.05, letterSpacing: '-0.035em' }}>
          {tCampusHeading.split(' ').slice(0, -1).join(' ')} <Marker>{tCampusHeading.split(' ').slice(-1)}</Marker>
        </h3>
        <p className="text-base md:text-[17px] leading-relaxed max-w-[520px] mb-8" style={{ color: 'oklch(var(--foreground-500))' }}>{tCampusSub}</p>

        <div style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
          <div className="relative aspect-video" style={{ background: 'oklch(0.13 0.005 118)' }}>
            <iframe
              src="https://my.matterport.com/show/?m=NUpWzUwWfMQ"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              title="Sonic Office Virtual Tour"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 px-6 py-6 md:px-8" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            <div className="flex flex-wrap gap-2">
              {[
                { icon: 'ri-drag-move-line', label: tCampusTip1 },
                { icon: 'ri-walk-line', label: tCampusTip2 },
                { icon: 'ri-fullscreen-line', label: tCampusTip3 },
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-3.5 py-[9px] text-xs font-bold text-foreground-800" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
                  <i className={`${item.icon} text-sm`} style={{ color: 'oklch(0.72 0.18 115)' }} />
                  {item.label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-5 flex-shrink-0">
              <div>
                <p className="text-sm font-black text-foreground-950 mb-0.5">{tCampusAddress}</p>
                <p className="text-xs" style={{ color: 'oklch(var(--foreground-500))' }}>{tCampusCity}</p>
              </div>
              <a
                href="https://maps.google.com/?q=Campus+Fichtenhain+46,+47807+Krefeld"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-foreground-950 text-white text-[11px] font-black uppercase tracking-[0.14em] hover:bg-primary-500 hover:text-foreground-950 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-map-pin-line text-sm" />
                {tCampusRoute}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
