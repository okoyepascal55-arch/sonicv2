import { useRef, useEffect } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const FALLBACK_IMAGES = [
  'https://readdy.ai/api/search-image?query=team%20office%20collaboration%20creative%20agency%20candid%20modern%20workspace%20authentic%20moment&width=300&height=400&seq=cs-01&orientation=portrait',
  'https://readdy.ai/api/search-image?query=team%20event%20celebration%20office%20party%20creative%20agency%20authentic%20moment%20group&width=300&height=400&seq=cs-02&orientation=portrait',
  'https://readdy.ai/api/search-image?query=coworkers%20laughing%20casual%20office%20moment%20creative%20agency%20workplace%20authentic&width=300&height=400&seq=cs-03&orientation=portrait',
  'https://readdy.ai/api/search-image?query=team%20meeting%20brainstorming%20creative%20agency%20whiteboard%20collaboration%20office&width=300&height=400&seq=cs-04&orientation=portrait',
  'https://readdy.ai/api/search-image?query=office%20kitchen%20casual%20break%20team%20coworkers%20creative%20agency%20authentic&width=300&height=400&seq=cs-05&orientation=portrait',
  'https://readdy.ai/api/search-image?query=team%20outdoor%20event%20company%20trip%20creative%20agency%20employees%20casual&width=300&height=400&seq=cs-06&orientation=portrait',
];

export default function CareerShowcase() {
  const { images: dashImages } = useMediaStore('careers_pictorial_showcase');
  const images = dashImages.length > 0
    ? dashImages.map(img => resolveImageUrl(img.url))
    : FALLBACK_IMAGES;

  const trackRef = useRef<HTMLDivElement>(null);

  // Subtle auto-slow-scroll
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let animId = 0;
    let paused = false;
    const drift = () => {
      if (!paused && el) {
        el.scrollLeft += 0.3;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) el.scrollLeft = 0;
      }
      animId = requestAnimationFrame(drift);
    };
    animId = requestAnimationFrame(drift);
    el.addEventListener('mouseenter', () => { paused = true; });
    el.addEventListener('mouseleave', () => { paused = false; });
    el.addEventListener('touchstart', () => { paused = true; });
    el.addEventListener('touchend', () => { setTimeout(() => { paused = false; }, 1500); });
    return () => cancelAnimationFrame(animId);
  }, []);

  // Duplicate for seamless loop
  const displayed = [...images, ...images];

  return (
    <div className="py-8 overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: 'grab' }}
      >
        {displayed.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative overflow-hidden group"
            style={{
              width: '96px',
              height: '120px',
              transform: i % 3 === 1 ? 'translateY(8px)' : i % 3 === 2 ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'transform 0.4s ease',
            }}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              style={{ filter: 'grayscale(0.2)' }}
              loading="lazy"
            />
            {/* Subtle lime flip-border on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
