import { useEffect, useMemo, useState } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const LABELS = [
  'Produktfotografie', 'Brand Design', 'Video Produktion', 'CGI & 3D',
  'Social Content', 'POS & Events', 'Print & Packaging', 'Beauty', 'Food & Lifestyle',
];

const gradient = (hue: number) => `linear-gradient(135deg, oklch(0.24 0.05 ${hue}), oklch(0.13 0.005 118))`;
const FALLBACKS = LABELS.map((_, i) => gradient([115, 145, 175, 205, 235, 265, 295, 325, 55][i]));
const TILE_W = 220;
const TILE_H = 320;
const RADIUS = 480;

export default function Carousel3DReference() {
  const { images } = useMediaStore('leistungen_kreation_carousel_images');
  const tiles = useMemo(() => LABELS.map((label, i) => ({ alt: label, src: images[i]?.url ? resolveImageUrl(images[i].url) : FALLBACKS[i], isMedia: Boolean(images[i]?.url) })), [images]);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setAngle(value => value + 4), 100);
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
                {tile.isMedia ? <img src={tile.src} alt={tile.alt} className="absolute inset-0 w-full object-cover object-top" style={{ height: 'calc(100% - 30px)' }} draggable={false} /> : <div aria-hidden="true" className="absolute inset-0" style={{ height: 'calc(100% - 30px)', background: tile.src }} />}
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
