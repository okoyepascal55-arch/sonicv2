import { useState } from 'react';
import { useMediaStore } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { ChapterHeader, Marker } from './ChapterKit';
import { useKarriereEventLines } from '../useKarriereText';
import { IMAGE_PLACEHOLDER } from '@/lib/imagePlaceholder';

const EVENTS = [
  {
    id: 'content',
    tag: 'Kreation',
    title: 'Content Creation',
    stat: 'Shootings & Videos für unsere Kunden',
    fallbackImage: IMAGE_PLACEHOLDER,
    videoUrl: 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&rel=0&modestbranding=1',
  },
  {
    id: 'team',
    tag: 'Intern',
    title: 'Team Events',
    stat: 'Sommerfest, Grillen, gemeinsame Mittagessen',
    fallbackImage: IMAGE_PLACEHOLDER,
    videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&rel=0&modestbranding=1',
  },
  {
    id: 'promoter',
    tag: 'Extern',
    title: 'Promoter Events',
    stat: 'Kick-offs, Trainings & Contests',
    fallbackImage: IMAGE_PLACEHOLDER,
    videoUrl: 'https://www.youtube.com/embed/2H1rFHQsG4g?autoplay=1&mute=1&rel=0&modestbranding=1',
  },
  {
    id: 'roadshow',
    tag: 'Unterwegs',
    title: 'Roadshows & Messen',
    stat: 'Über 200 Events',
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
  const tHeading = useText('careers_events', 'careers-events-heading', 'Voller Einsatz. Echtes Team.');
  const tSub = useText('careers_events', 'careers-events-sub', 'Von Content-Shootings bis Team-Events — bei Sonic ist jeder Moment eine Chance, zusammen etwas zu erleben.');

  // Dashboard → Text → Karriere → „Karriere — Team Events (Zeilen unter den Titeln)“
  const eventLines = useKarriereEventLines();
  const resolvedEvents = EVENTS.map((ev, i) => ({
    ...ev,
    stat: eventLines[ev.id as keyof typeof eventLines] ?? ev.stat,
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
    <section id="leben" className="bg-white pt-10 md:pt-14 pb-14 md:pb-20 px-5 md:px-10 overflow-hidden">
      <div className="sonic-container">
        <ChapterHeader
          n="04"
          eyebrow={tBadge}
          heading={<>{headingMain} {headingAccent && <Marker>{headingAccent}</Marker>}</>}
          sub={tSub}
          headingMax="max-w-full"
        />

        {/* Events block — „Büro erkunden“ (360° tour) removed 18.11.2026; section ends here */}
        <div>
          <div className="relative overflow-hidden" style={{ background: "oklch(0.13 0.005 118)", minHeight: "520px" }}>
            {!playing ? (
              <div
                className="absolute inset-0 cursor-pointer group"
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            {resolvedEvents.map((ev) => {
              const isActive = ev.id === activeId;
              return (
                <button
                  key={ev.id}
                  onClick={() => selectEvent(ev.id)}
                  className="relative h-[132px] overflow-hidden text-left cursor-pointer"
                  style={{ background: 'oklch(0.13 0.005 118)' }}
                  aria-pressed={isActive}
                >
                  <img src={ev.image} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: isActive ? 'none' : 'grayscale(1) brightness(0.7)', transition: 'filter 0.4s ease' }} loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,11,9,0.85) 0%, rgba(10,11,9,0.2) 70%)' }} />
                  <span className="absolute top-0 left-0 h-1 transition-all duration-500" style={{ width: isActive ? '100%' : '0%', background: 'oklch(var(--primary-500))' }} aria-hidden="true" />
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

      </div>
    </section>
  );
}
