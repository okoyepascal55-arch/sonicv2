import { useRef, useEffect } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const FALLBACK_IMAGES = [
  'https://readdy.ai/api/search-image?query=team%20office%20collaboration%20creative%20agency%20candid%20modern%20workspace%20authentic%20moment&width=360&height=480&seq=cs-01&orientation=portrait',
  'https://readdy.ai/api/search-image?query=team%20event%20celebration%20office%20party%20creative%20agency%20authentic%20moment%20group&width=360&height=480&seq=cs-02&orientation=portrait',
  'https://readdy.ai/api/search-image?query=coworkers%20laughing%20casual%20office%20moment%20creative%20agency%20workplace%20authentic&width=360&height=480&seq=cs-03&orientation=portrait',
  'https://readdy.ai/api/search-image?query=team%20meeting%20brainstorming%20creative%20agency%20whiteboard%20collaboration%20office&width=360&height=480&seq=cs-04&orientation=portrait',
  'https://readdy.ai/api/search-image?query=office%20kitchen%20casual%20break%20team%20coworkers%20creative%20agency%20authentic&width=360&height=480&seq=cs-05&orientation=portrait',
  'https://readdy.ai/api/search-image?query=team%20outdoor%20event%20company%20trip%20creative%20agency%20employees%20casual&width=360&height=480&seq=cs-06&orientation=portrait',
  'https://readdy.ai/api/search-image?query=creative%20team%20desk%20work%20laptop%20creative%20agency%20professional%20candid&width=360&height=480&seq=cs-07&orientation=portrait',
  'https://readdy.ai/api/search-image?query=office%20presentation%20team%20discussion%20modern%20creative%20space%20authentic%20work&width=360&height=480&seq=cs-08&orientation=portrait',
];

export default function CareerShowcase() {
  const { images: dashImages } = useMediaStore('careers_pictorial_showcase');
  const images = dashImages.length > 0
    ? dashImages.map(img => resolveImageUrl(img.url))
    : FALLBACK_IMAGES;

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let animId = 0;
    let paused = false;
    const SPEED = 0.6; // px per frame
    const drift = () => {
      if (!paused && el) {
        el.scrollLeft += SPEED;
        // Seamless loop: when we've scrolled half (one full set), reset to 0
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      animId = requestAnimationFrame(drift);
    };
    animId = requestAnimationFrame(drift);
    el.addEventListener('mouseenter', () => { paused = true; });
    el.addEventListener('mouseleave', () => { paused = false; });
    el.addEventListener('touchstart', () => { paused = true; }, { passive: true });
    el.addEventListener('touchend', () => { setTimeout(() => { paused = false; }, 2000); }, { passive: true });
    return () => cancelAnimationFrame(animId);
  }, []);

  // Duplicate for seamless infinite loop
  const displayed = [...images, ...images];

  return (
    // Full-bleed: -mx-5 md:-mx-10 matches the parent section's px-5 md:px-10 padding
    <div className="overflow-hidden -mx-5 md:-mx-10 mt-10">
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        aria-hidden="true"
      >
        {displayed.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative overflow-hidden group"
            style={{ width: '160px', height: '210px' }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
