import { useEffect, useRef, useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import WoodenButton from '@/components/base/WoodenButton';

const PHOTOS = [
  {
    src: 'https://readdy.ai/api/search-image?query=professional%20product%20photography%20studio%20shoot%20consumer%20electronics%20packaging%20premium%20dark%20moody%20atmospheric%20lighting%20dramatic%20shadows%20commercial%20quality%20editorial%20photography&width=400&height=560&seq=rpg-kreation-01&orientation=portrait',
    label: 'Produktfoto',
    tag: 'FOTO',
    rotate: -14,
    x: -420,
    y: 20,
    scale: 0.88,
    zIndex: 1,
  },
  {
    src: 'https://readdy.ai/api/search-image?query=brand%20identity%20design%20creative%20agency%20visual%20design%20system%20typography%20color%20palette%20minimalist%20flat%20lay%20professional%20elegant%20premium%20studio%20photography&width=400&height=560&seq=rpg-kreation-02&orientation=portrait',
    label: 'Brand Design',
    tag: 'DESIGN',
    rotate: -7,
    x: -220,
    y: -10,
    scale: 0.93,
    zIndex: 2,
  },
  {
    src: 'https://readdy.ai/api/search-image?query=video%20production%20studio%20professional%20camera%20crew%20filming%20product%20commercial%20creative%20agency%20dark%20dramatic%20lighting%20cinematic%20quality%20behind%20the%20scenes&width=400&height=560&seq=rpg-kreation-03&orientation=portrait',
    label: 'Video',
    tag: 'VIDEO',
    rotate: 0,
    x: 0,
    y: 0,
    scale: 1,
    zIndex: 10,
  },
  {
    src: 'https://readdy.ai/api/search-image?query=3D%20CGI%20photorealistic%20product%20visualization%20render%20floating%20packaging%20consumer%20electronics%20dramatic%20studio%20lighting%20lime%20green%20accent%20commercial%20quality&width=400&height=560&seq=rpg-kreation-04&orientation=portrait',
    label: 'CGI & 3D',
    tag: 'CGI',
    rotate: 7,
    x: 220,
    y: -10,
    scale: 0.93,
    zIndex: 2,
  },
  {
    src: 'https://readdy.ai/api/search-image?query=social%20media%20content%20creation%20lifestyle%20photography%20product%20shoot%20vibrant%20colorful%20editorial%20fashion%20beauty%20consumer%20goods%20clean%20white%20background%20professional&width=400&height=560&seq=rpg-kreation-05&orientation=portrait',
    label: 'Social Content',
    tag: 'SOCIAL',
    rotate: 14,
    x: 420,
    y: 20,
    scale: 0.88,
    zIndex: 1,
  },
];

const FALLBACK_PHOTOS = [
  'https://readdy.ai/api/search-image?query=professional%20product%20photography%20studio%20shoot%20consumer%20electronics%20packaging%20premium%20dark%20moody%20atmospheric%20lighting%20dramatic%20shadows%20commercial%20quality%20editorial%20photography&width=400&height=560&seq=rpg-kreation-01&orientation=portrait',
  'https://readdy.ai/api/search-image?query=brand%20identity%20design%20creative%20agency%20visual%20design%20system%20typography%20color%20palette%20minimalist%20flat%20lay%20professional%20elegant%20premium%20studio%20photography&width=400&height=560&seq=rpg-kreation-02&orientation=portrait',
  'https://readdy.ai/api/search-image?query=video%20production%20studio%20professional%20camera%20crew%20filming%20product%20commercial%20creative%20agency%20dark%20dramatic%20lighting%20cinematic%20quality%20behind%20the%20scenes&width=400&height=560&seq=rpg-kreation-03&orientation=portrait',
  'https://readdy.ai/api/search-image?query=3D%20CGI%20photorealistic%20product%20visualization%20render%20floating%20packaging%20consumer%20electronics%20dramatic%20studio%20lighting%20lime%20green%20accent%20commercial%20quality&width=400&height=560&seq=rpg-kreation-04&orientation=portrait',
  'https://readdy.ai/api/search-image?query=social%20media%20content%20creation%20lifestyle%20photography%20product%20shoot%20vibrant%20colorful%20editorial%20fashion%20beauty%20consumer%20goods%20clean%20white%20background%20professional&width=400&height=560&seq=rpg-kreation-05&orientation=portrait',
];

export default function RotatingPhotoGrid() {
  const { images: gridPhotos } = useMediaStore('leistungen_kreation_photo_grid');
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const getPhotoSrc = (index: number) => {
    const item = gridPhotos[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_PHOTOS[index];
  };

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Gentle float animation
  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      setFloatOffset(Math.sin(elapsed * 0.6) * 8);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white"
      style={{ paddingTop: '48px', paddingBottom: '64px' }}
    >
      {/* Lime ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '700px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(200,212,0,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Section label */}
      <div className="text-center mb-10 md:mb-12 relative z-10 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Unsere Arbeit</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground-950 leading-tight tracking-tight">
          Kreation, die<br /><span className="text-primary-500">verkauft.</span>
        </h2>
      </div>

      {/* Desktop photo fan */}
      <div className="hidden sm:flex relative items-center justify-center" style={{ height: '420px' }}>
        {PHOTOS.map((photo, i) => {
          const isHov = hovered === i;
          const isCenter = i === 2;
          const baseY = isCenter ? floatOffset : photo.y + floatOffset * 0.5;

          return (
            <div
              key={i}
              className="absolute cursor-pointer"
              style={{
                width: '200px',
                height: '280px',
                transform: `translateX(${photo.x}px) translateY(${isHov ? baseY - 24 : baseY}px) rotate(${isHov ? 0 : photo.rotate}deg) scale(${isHov ? 1.08 : photo.scale})`,
                zIndex: isHov ? 20 : photo.zIndex,
                transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
                boxShadow: isHov
                  ? '0 32px 64px rgba(0,0,0,0.7), 0 0 0 2px rgba(200,212,0,0.6), 0 0 40px rgba(200,212,0,0.2)'
                  : '0 16px 40px rgba(0,0,0,0.5)',
                opacity: visible ? 1 : 0,
                transitionDelay: visible ? `${i * 80}ms` : '0ms',
                willChange: 'transform',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={getPhotoSrc(i)}
                  alt={photo.label}
                  className="w-full h-full object-cover object-top transition-transform duration-700"
                  style={{ transform: isHov ? 'scale(1.08)' : 'scale(1)' }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-400"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)',
                    opacity: isHov ? 1 : 0.65,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 0 2px oklch(var(--primary-500))', opacity: isHov ? 1 : 0 }}
                />
                <div
                  className="absolute top-3 left-3 px-2 py-1 text-[9px] font-black uppercase tracking-widest"
                  style={{ background: isHov ? 'oklch(var(--primary-500))' : 'rgba(200,212,0,0.85)', color: '#111' }}
                >
                  {photo.tag}
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-4 transition-all duration-400"
                  style={{ transform: isHov ? 'translateY(0)' : 'translateY(4px)', opacity: isHov ? 1 : 0.75 }}
                >
                  <span className="text-background-50 text-xs font-black uppercase tracking-wider">{photo.label}</span>
                </div>
                {isCenter && (
                  <div
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 text-[8px] font-black uppercase tracking-wider"
                    style={{ background: 'rgba(200,212,0,0.15)', border: '0.5px solid rgba(200,212,0,0.5)', color: 'oklch(var(--primary-500))' }}
                  >
                    <div className="w-1.5 h-1.5 animate-pulse" style={{ background: 'oklch(var(--primary-500))' }} />
                    LIVE
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: horizontal scroll strip */}
      <div className="sm:hidden flex gap-3 overflow-x-auto pb-2 px-4" style={{ scrollbarWidth: 'none' }}>
        {PHOTOS.map((photo, i) => (
          <div key={i} className="flex-shrink-0 relative overflow-hidden" style={{ width: '160px', height: '220px' }}>
            <img src={getPhotoSrc(i)} alt={photo.label} className="w-full h-full object-cover object-top" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary-500 text-foreground-950 text-[8px] font-black uppercase tracking-widest">{photo.tag}</div>
            <div className="absolute bottom-3 left-3">
              <span className="text-white text-[10px] font-black uppercase tracking-wide">{photo.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Category labels below — desktop only */}
      <div className="hidden sm:flex items-center justify-center gap-8 mt-10 relative z-10 flex-wrap px-4">
        {PHOTOS.map((photo, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="h-0.5 transition-all duration-300"
              style={{ background: hovered === i ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.15)', width: hovered === i ? '32px' : '20px' }}
            />
            <span
              className="text-[10px] font-black uppercase tracking-widest transition-colors duration-300"
              style={{ color: hovered === i ? 'oklch(var(--primary-500))' : 'rgba(0,0,0,0.35)' }}
            >
              {photo.label}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-10 md:mt-12 relative z-10 px-4">
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Kreation%20Portfolio%20anfragen`}
          className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-foreground-950 hover:text-background-50 cursor-pointer bg-primary-500 text-foreground-950"
        >
          <i className="ri-image-line" />
          Portfolio anfragen
          <i className="ri-arrow-right-line" />
        </a>
      </div>
    </div>
  );
}