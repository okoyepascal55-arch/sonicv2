import { useEffect, useMemo, useState } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const LABELS = [
  'Produktfotografie', 'Brand Design', 'Video Produktion', 'CGI & 3D',
  'Social Content', 'POS & Events', 'Print & Packaging', 'Beauty', 'Food & Lifestyle',
];

const FALLBACKS = [
  'https://readdy.ai/api/search-image?query=professional%20product%20photography%20studio%20shoot%20consumer%20electronics%20packaging%20premium%20bright%20clean%20white%20background%20soft%20natural%20lighting%20commercial%20quality%20editorial%20photography%20minimalist%20modern&width=420&height=600&seq=c4-tile-01&orientation=portrait',
  'https://readdy.ai/api/search-image?query=brand%20identity%20design%20creative%20agency%20visual%20design%20system%20typography%20color%20palette%20minimalist%20flat%20lay%20professional%20elegant%20premium%20studio%20photography%20clean%20white%20background%20modern%20editorial&width=420&height=600&seq=c4-tile-02&orientation=portrait',
  'https://readdy.ai/api/search-image?query=video%20production%20studio%20professional%20camera%20crew%20filming%20product%20commercial%20creative%20agency%20bright%20clean%20cinematic%20lighting%20behind%20the%20scenes%20premium%20quality%20modern%20white%20studio&width=420&height=600&seq=c4-tile-03&orientation=portrait',
  'https://readdy.ai/api/search-image?query=3D%20CGI%20photorealistic%20product%20visualization%20render%20floating%20packaging%20consumer%20electronics%20bright%20studio%20lighting%20commercial%20quality%20clean%20white%20background%20premium%20editorial%20modern&width=420&height=600&seq=c4-tile-04&orientation=portrait',
  'https://readdy.ai/api/search-image?query=social%20media%20content%20creation%20lifestyle%20photography%20product%20shoot%20vibrant%20editorial%20fashion%20beauty%20consumer%20goods%20clean%20professional%20studio%20bright%20white%20background%20modern%20commercial&width=420&height=600&seq=c4-tile-05&orientation=portrait',
  'https://readdy.ai/api/search-image?query=trade%20show%20exhibition%20booth%20design%20retail%20POS%20display%20premium%20brand%20activation%20event%20marketing%20professional%20bright%20clean%20lighting%20commercial%20quality%20modern%20white%20background&width=420&height=600&seq=c4-tile-06&orientation=portrait',
  'https://readdy.ai/api/search-image?query=packaging%20design%20print%20production%20premium%20consumer%20goods%20unboxing%20experience%20bright%20clean%20studio%20photography%20commercial%20quality%20editorial%20minimalist%20white%20background%20modern&width=420&height=600&seq=c4-tile-07&orientation=portrait',
  'https://readdy.ai/api/search-image?query=luxury%20cosmetics%20beauty%20product%20photography%20bright%20clean%20studio%20soft%20lighting%20premium%20brand%20editorial%20commercial%20quality%20minimalist%20white%20background%20modern%20elegant&width=420&height=600&seq=c4-tile-08&orientation=portrait',
  'https://readdy.ai/api/search-image?query=food%20photography%20gourmet%20restaurant%20dish%20professional%20studio%20bright%20clean%20lighting%20editorial%20commercial%20quality%20premium%20minimalist%20white%20background%20modern%20lifestyle&width=420&height=600&seq=c4-tile-09&orientation=portrait',
];
const TILE_W = 220;
const TILE_H = 320;
const RADIUS = 480;

export default function Carousel3DReference() {
  const { images } = useMediaStore('leistungen_kreation_carousel_images');
  const tiles = useMemo(() => LABELS.map((label, i) => ({ alt: label, src: images[i]?.url ? resolveImageUrl(images[i].url) : FALLBACKS[i] })), [images]);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setAngle(value => value + 2), 150);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative flex items-center justify-center overflow-hidden" style={{ height: '480px', perspective: '1800px', margin: '0 -40px' }} aria-label="Kreation Showcase Carousel">
        {tiles.map((tile, i) => {
          const angleStep = 360 / tiles.length;
          let angleDeg = i * angleStep - angle;
          angleDeg = ((angleDeg % 360) + 540) % 360 - 180;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = Math.sin(angleRad) * RADIUS;
          const z = Math.cos(angleRad) * RADIUS - RADIUS;
          const rotateY = -angleDeg;
          const cosAngle = Math.cos(angleRad);
          const scale = 0.55 + 0.45 * ((cosAngle + 1) / 2);
          const zIndex = Math.round(50 + cosAngle * 40);
          const absAngle = Math.abs(angleDeg);
          const isVisible = absAngle < 150;
          const isCenter = absAngle < 8;
          const brightness = 0.75 + 0.25 * ((cosAngle + 1) / 2);

          return (
            <div key={tile.alt} className="absolute" style={{ width: TILE_W, height: TILE_H, marginLeft: -TILE_W / 2, marginTop: -TILE_H / 2, top: '50%', left: '50%', transform: `translate(-50%,-50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`, zIndex, opacity: isVisible ? 1 : 0, filter: `brightness(${brightness})`, transition: 'transform 0.15s ease', pointerEvents: isVisible ? 'auto' : 'none' }}>
              <div className="relative w-full h-full overflow-hidden bg-white" style={{ boxShadow: isCenter ? '0 32px 80px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.14)' : '0 10px 32px rgba(0,0,0,0.14)' }}>
                <img src={tile.src} alt={tile.alt} className="absolute inset-0 w-full object-cover object-top" style={{ height: 'calc(100% - 30px)' }} draggable={false} />
                <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-white flex items-center justify-center"><span className="text-[9px] font-black tracking-[0.15em] uppercase text-black/40">{tile.alt}</span></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2 py-2 pb-10 opacity-40"><i className="ri-drag-move-line text-[13px] text-black/50" /><span className="text-[11px] font-black uppercase tracking-[0.1em] text-black/40">Automatisch rotierend — Referenzen aus echten Projekten</span></div>
    </>
  );
}
