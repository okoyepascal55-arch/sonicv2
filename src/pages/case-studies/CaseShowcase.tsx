import { useRef, useEffect } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

/* Real project photos (no masks) — replace or extend via Dashboard → Medien → Fallbeispiele → „Bildershowcase“. */
const BASE = '/images/Case Studies -Fallbsp';
const FALLBACK_IMAGES = [
  `${BASE}/SEB/Shooting_Miriam.webp`,
  `${BASE}/Garmin/5243_190035993.webp`,
  `${BASE}/SEB/Gruppe Braun (37).webp`,
  `${BASE}/Avoury/2.webp`,
  `${BASE}/SEB/image10.webp`,
  `${BASE}/SEB/Optigrill Tisch.webp`,
  `${BASE}/SEB/Komm-Zentrum (13).webp`,
  `${BASE}/Avoury/IMG-20230928-WA0000.webp`,
  `${BASE}/SEB/Bild_NecafeDolceGusto.webp`,
  `${BASE}/SEB/Gruppe Gold (5).webp`,
  `${BASE}/SEB/image12.webp`,
  `${BASE}/SEB/Komm-Zentrum (26).webp`,
];

export default function CaseShowcase() {
  const { images: dashImages } = useMediaStore('case_studies_pictorial_showcase');
  const tBadge = useText('case_studies_showcase', 'case-showcase-badge', 'Einblicke');
  const tHeading = useText('case_studies_showcase', 'case-showcase-heading', 'Aus unseren Projekten');
  const dash = dashImages.filter((img) => img.url).map((img) => resolveImageUrl(img.url));
  const images = dash.length > 0 ? dash : FALLBACK_IMAGES;

  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let animId = 0;
    let paused = false;
    const drift = () => {
      if (!paused) {
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      animId = requestAnimationFrame(drift);
    };
    animId = requestAnimationFrame(drift);
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    const touchEnd = () => { setTimeout(resume, 2000); };
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', touchEnd, { passive: true });
    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', touchEnd);
    };
  }, []);

  const displayed = [...images, ...images];

  return (
    <section className="bg-white py-10 md:py-14 overflow-hidden">
      <div className="sonic-container px-5 md:px-10 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span>
        </div>
        <h2 className="sonic-h2 text-foreground-950">{tHeading}</h2>
      </div>
      <div
        ref={trackRef}
        className="flex gap-3"
        style={{ overflowX: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
        aria-hidden="true"
      >
        {displayed.map((src, i) => (
          <div key={i} className="flex-shrink-0 relative overflow-hidden group" style={{ width: '220px', height: '280px' }}>
            <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
