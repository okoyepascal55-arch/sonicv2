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
];

export default function SonicTeamEvents() {
  const [activeId, setActiveId] = useState('content');
  const [playing, setPlaying] = useState(false);
  const { images: eventImages } = useMediaStore('careers_events_images');
  const { images: eventVideos } = useMediaStore('careers_events_videos');

  const tBadge = useText('careers_events', 'careers-events-badge', 'Leben bei Sonic');
  const tHeading = useText('careers_events', 'careers-events-heading', 'Wir arbeiten hart. Wir feiern noch mehr.');

  const tCampusBadge = useText('careers_campus', 'careers-campus-badge', 'Unser Campus');
  const tCampusHeading = useText('careers_campus', 'careers-campus-heading', 'BÜRO ERKUNDEN');
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
    <section id="leben" className="py-[88px] px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="max-w-[640px] mb-11">
          <div className="inline-flex items-center gap-2 bg-[#DCE94D] text-[#0B0B0C] text-xs font-bold uppercase tracking-[0.06em] px-3.5 py-[7px] pr-3.5 mb-5 ">
            <span className="w-1.5 h-1.5 bg-[#0B0B0C] " />
            {tBadge}
          </div>
          <h2 className="text-[clamp(28px,3.4vw,40px)] font-black text-[#0B0B0C] leading-[1.1] tracking-tight uppercase">
            {tHeading.split('. ')[0]}.{' '}
            <span className="text-[#C3D62A]">
              {tHeading.includes('.') ? tHeading.split('. ').slice(1).join('. ') : 'Wir feiern noch mehr.'}
            </span>
          </h2>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resolvedEvents.map((ev) => {
            const isActive = ev.id === activeId;
            return (
              <button
                key={ev.id}
                onClick={() => selectEvent(ev.id)}
                className="text-left cursor-pointer"
              >
                <div className="relative  overflow-hidden bg-[#0B0B0C] aspect-[16/10]">
                  {/* Event image */}
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Dark overlay for readability */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to bottom, rgba(11,11,12,0.35) 0%, rgba(11,11,12,0.55) 100%)',
                    }}
                  />
                  {/* Subtle repeating pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: 'repeating-linear-gradient(45deg, #1E1E20 0 8px, #171718 8px 16px)',
                    }}
                  />
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-[#DCE94D] " />
                  )}

                  {/* Tag */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-block bg-[#DCE94D] text-[#0B0B0C] text-[10px] font-black uppercase px-2.5 py-1 ">
                      {ev.tag}
                    </span>
                  </div>

                  {/* Play button */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-[52px] h-[52px]  bg-[#DCE94D] flex items-center justify-center">
                      <i className="ri-play-fill text-xl text-[#0B0B0C] ml-0.5" />
                    </div>
                  </div>

                  {/* Caption */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 z-10"
                    style={{
                      background: 'linear-gradient(0deg, rgba(0,0,0,0.75), transparent)',
                    }}
                  >
                    <h5 className="text-sm font-bold text-white">{ev.title}</h5>
                    <span className="text-[11px] text-[#DCE94D]">{ev.stat}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active event — expanded video player */}
        <div className="mt-6 border border-[#0B0B0C] bg-[#0B0B0C] overflow-hidden">
          {playing ? (
            <div className="relative w-full aspect-video">
              <iframe
                key={current.id}
                src={current.videoUrl}
                title={current.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="relative w-full aspect-video block cursor-pointer"
            >
              <img
                src={current.image}
                alt={current.title}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(11,11,12,0.35) 0%, rgba(11,11,12,0.7) 100%)',
                }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-[72px] h-[72px] bg-[#DCE94D] flex items-center justify-center">
                  <i className="ri-play-fill text-3xl text-[#0B0B0C] ml-1" />
                </div>
              </div>
              <span className="absolute bottom-5 left-0 right-0 text-center text-white/80 text-xs font-bold uppercase tracking-[0.2em]">
                Klicken zum Abspielen
              </span>
            </button>
          )}

          <div className="px-5 py-4 flex items-center justify-between gap-4 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#DCE94D] text-[#0B0B0C] text-[10px] font-black uppercase px-2 py-0.5">
                  {current.tag}
                </span>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">
                  {current.title}
                </h4>
              </div>
              <p className="text-xs text-white/55">{current.stat}</p>
            </div>
            <span className="text-[11px] font-bold text-[#DCE94D] whitespace-nowrap hidden sm:block">
              {playing ? 'Wird abgespielt' : 'Bereit'}
            </span>
          </div>
        </div>

        {/* Campus tour */}
        <div className="mt-14 pt-12 border-t border-[#E7E4D4]">
          <div className="max-w-[640px] mb-8">
            <div className="inline-flex items-center gap-2 bg-[#DCE94D] text-[#0B0B0C] text-xs font-bold uppercase tracking-[0.06em] px-3.5 py-[7px] pr-3.5 mb-5">
              <span className="w-1.5 h-1.5 bg-[#0B0B0C]" />
              {tCampusBadge}
            </div>
            <h3 className="text-[clamp(24px,3vw,34px)] font-black text-[#0B0B0C] leading-[1.1] tracking-tight uppercase">
              {tCampusHeading}
            </h3>
            <p className="text-[15px] text-[#6E6E68] mt-3 leading-[1.5] max-w-[520px]">
              {tCampusSub}
            </p>
          </div>

          <div className="relative overflow-hidden border border-[#0B0B0C] bg-[#0B0B0C]">
            <div className="relative w-full" style={{ paddingBottom: '50%' }}>
              <iframe
                src="https://my.matterport.com/show/?m=NUpWzUwWfMQ"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                title="Sonic Office Virtual Tour"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-4">
            {[
              { icon: 'ri-drag-move-line', label: tCampusTip1 },
              { icon: 'ri-walk-line', label: tCampusTip2 },
              { icon: 'ri-fullscreen-line', label: tCampusTip3 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-3.5 py-2 bg-[#FAFDF5] border border-[#E7E4D4]">
                <i className={`${item.icon} text-sm text-[#C3D62A]`} />
                <span className="text-xs font-bold text-[#0B0B0C]">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#FAFDF5] border border-[#E7E4D4] p-5">
            <div className="flex items-center gap-3">
              <i className="ri-map-pin-line text-lg text-[#C3D62A]" />
              <div>
                <p className="font-black text-sm text-[#0B0B0C]">{tCampusAddress}</p>
                <p className="text-xs text-[#6E6E68]">{tCampusCity}</p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Campus+Fichtenhain+46,+47807+Krefeld"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#DCE94D] text-[#0B0B0C] font-bold text-xs hover:bg-[#C3D62A] transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-map-pin-line text-sm" />
              {tCampusRoute}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}