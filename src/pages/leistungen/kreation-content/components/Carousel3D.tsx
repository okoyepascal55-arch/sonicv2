import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

interface MediaTile {
  src: string;
  alt: string;
}

const TILE_LABELS = [
  'Produktfotografie',
  'Brand Design',
  'Video Produktion',
  'CGI & 3D',
  'Social Content',
  'POS & Events',
  'Print & Packaging',
  'Beauty & Kosmetik',
  'Food & Lifestyle',
];

const FALLBACK_TILES: MediaTile[] = [
  {
    src: 'https://readdy.ai/api/search-image?query=professional%20product%20photography%20studio%20shoot%20consumer%20electronics%20packaging%20premium%20bright%20clean%20white%20background%20soft%20natural%20lighting%20commercial%20quality%20editorial%20photography%20minimalist%20modern&width=420&height=600&seq=c4-tile-01&orientation=portrait',
    alt: 'Produktfotografie',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=brand%20identity%20design%20creative%20agency%20visual%20design%20system%20typography%20color%20palette%20minimalist%20flat%20lay%20professional%20elegant%20premium%20studio%20photography%20clean%20white%20background%20modern%20editorial&width=420&height=600&seq=c4-tile-02&orientation=portrait',
    alt: 'Brand Design',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=video%20production%20studio%20professional%20camera%20crew%20filming%20product%20commercial%20creative%20agency%20bright%20clean%20cinematic%20lighting%20behind%20the%20scenes%20premium%20quality%20modern%20white%20studio&width=420&height=600&seq=c4-tile-03&orientation=portrait',
    alt: 'Video Produktion',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=3D%20CGI%20photorealistic%20product%20visualization%20render%20floating%20packaging%20consumer%20electronics%20bright%20studio%20lighting%20commercial%20quality%20clean%20white%20background%20premium%20editorial%20modern&width=420&height=600&seq=c4-tile-04&orientation=portrait',
    alt: 'CGI & 3D',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=social%20media%20content%20creation%20lifestyle%20photography%20product%20shoot%20vibrant%20editorial%20fashion%20beauty%20consumer%20goods%20clean%20professional%20studio%20bright%20white%20background%20modern%20commercial&width=420&height=600&seq=c4-tile-05&orientation=portrait',
    alt: 'Social Content',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=trade%20show%20exhibition%20booth%20design%20retail%20POS%20display%20premium%20brand%20activation%20event%20marketing%20professional%20bright%20clean%20lighting%20commercial%20quality%20modern%20white%20background&width=420&height=600&seq=c4-tile-06&orientation=portrait',
    alt: 'POS & Events',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=packaging%20design%20print%20production%20premium%20consumer%20goods%20unboxing%20experience%20bright%20clean%20studio%20photography%20commercial%20quality%20editorial%20minimalist%20white%20background%20modern&width=420&height=600&seq=c4-tile-07&orientation=portrait',
    alt: 'Print & Packaging',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=luxury%20cosmetics%20beauty%20product%20photography%20bright%20clean%20studio%20soft%20lighting%20premium%20brand%20editorial%20commercial%20quality%20minimalist%20white%20background%20modern%20elegant&width=420&height=600&seq=c4-tile-08&orientation=portrait',
    alt: 'Beauty & Kosmetik',
  },
  {
    src: 'https://readdy.ai/api/search-image?query=food%20photography%20gourmet%20restaurant%20dish%20professional%20studio%20bright%20clean%20lighting%20editorial%20commercial%20quality%20premium%20minimalist%20white%20background%20modern%20lifestyle&width=420&height=600&seq=c4-tile-09&orientation=portrait',
    alt: 'Food & Lifestyle',
  },
];

const TILE_W = 280;
const TILE_H = 420;
const RADIUS = 820;
const AUTO_SPEED = 8;

/* ── Film grain canvas — drawn once, reused as CSS background ── */
function useFilmGrain(): string {
  const [dataUrl, setDataUrl] = useState('');
  useEffect(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.floor(Math.random() * 255);
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = Math.floor(Math.random() * 28 + 4);
    }
    ctx.putImageData(imageData, 0, 0);
    setDataUrl(canvas.toDataURL('image/png'));
  }, []);
  return dataUrl;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ── Specular gloss overlay ── */
function GlossOverlay({ angleFromCenter }: { angleFromCenter: number }) {
  const normalizedAngle = Math.max(-1, Math.min(1, angleFromCenter / 90));
  const glossX = 50 + normalizedAngle * 30;
  const glossOpacity = 0.07 + 0.06 * (1 - Math.abs(normalizedAngle));
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,${glossOpacity * 2.5}) 0%, rgba(255,255,255,${glossOpacity}) ${glossX}%, transparent ${glossX + 25}%)`,
        zIndex: 2,
      }}
    />
  );
}

/* ── Polaroid frame — white border + thick bottom + caption area ── */
function PolaroidFrame({ isCenter, label, lockProgress }: { isCenter: boolean; label: string; lockProgress: number }) {
  return (
    <>
      {/* White polaroid border — thicker at bottom for caption area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: isCenter
            ? 'inset 0 0 0 10px rgba(255,255,255,0.96), inset 0 -36px 0 rgba(255,255,255,0.96)'
            : 'inset 0 0 0 8px rgba(255,255,255,0.88), inset 0 -30px 0 rgba(255,255,255,0.88)',
          zIndex: 4,
          transition: 'box-shadow 0.4s ease',
        }}
      />
      {/* Outer edge shadow — like a real photo print sitting on a surface */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: isCenter
            ? '0 0 0 1px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.5)'
            : '0 0 0 1px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.35)',
          zIndex: 5,
          transition: 'box-shadow 0.4s ease',
        }}
      />
      {/* Caption text in the white bottom strip */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none flex flex-col items-center justify-center"
        style={{
          height: isCenter ? '36px' : '30px',
          zIndex: 6,
          transition: 'height 0.4s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'inherit',
            fontSize: '9px',
            fontWeight: 900,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.35)',
            opacity: isCenter ? 1 : 0.6,
            transition: 'opacity 0.4s ease',
          }}
        >
          {label}
        </span>
        {/* Lime accent line draws along bottom of caption area */}
        {isCenter && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              width: `${Math.round(lockProgress * 100)}%`,
              background: '#C8D400',
              transition: lockProgress > 0
                ? 'width 0.38s cubic-bezier(0.16,1,0.3,1)'
                : 'width 0.18s ease-in',
            }}
          />
        )}
      </div>
    </>
  );
}

/* ── Ground reflection ── */
function GroundReflection({
  src,
  scale,
  brightness,
}: {
  src: string;
  scale: number;
  brightness: number;
}) {
  const reflectionOpacity = Math.max(0, (scale - 0.6) / 0.4) * 0.18;
  if (reflectionOpacity < 0.02) return null;
  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        width: `${TILE_W}px`,
        height: `${TILE_H * 0.22}px`,
        top: `${TILE_H}px`,
        left: 0,
        transform: 'scaleY(-1)',
        opacity: reflectionOpacity,
        filter: `blur(3px) brightness(${brightness * 0.7})`,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)',
        zIndex: 0,
      }}
    >
      <img
        src={src}
        alt=""
        className="w-full object-cover object-top"
        style={{ height: `${TILE_H * 0.22}px` }}
        draggable={false}
      />
    </div>
  );
}

export default function Carousel3D() {
  const { images: carouselImages } = useMediaStore('leistungen_kreation_carousel_images');
  const TILES = useMemo(() => {
    return TILE_LABELS.map((label, i) => {
      const dashItem = carouselImages[i];
      return { src: dashItem?.url ? resolveImageUrl(dashItem.url) : FALLBACK_TILES[i].src, alt: label };
    });
  }, [carouselImages]);
  const TOTAL = TILES.length;
  const ANGLE_STEP = 360 / TOTAL;

  // Animation state
  const [displayIndex, setDisplayIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isUserInteracting = useRef(false);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Pop-in reveal
  const sectionRef = useRef<HTMLDivElement>(null);
  const [popScale, setPopScale] = useState(0.3);
  const [popOpacity, setPopOpacity] = useState(0);
  const [hasPopped, setHasPopped] = useState(false);

  // Drag
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

  // Center tile parallax tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  // Ambient light angle
  const [lightAngle, setLightAngle] = useState(0);

  // Center tile label — track which tile is closest to center + its proximity
  const [centerLabel, setCenterLabel] = useState({ text: TILES[0].alt, opacity: 1 });

  // Lime accent line — lock progress (0→1 as tile settles to center)
  const [lockProgress, setLockProgress] = useState(0);

  // Film grain texture
  const grainDataUrl = useFilmGrain();

  const prefersReducedMotion = usePrefersReducedMotion();

  /* ── Pop-in on scroll into view ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPopped) {
          setHasPopped(true);
          let start: number | null = null;
          const duration = 1100;
          const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
          const tick = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = easeOutExpo(progress);
            setPopScale(0.3 + 0.7 * eased);
            setPopOpacity(eased);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasPopped]);

  /* ── Main animation loop ── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const loop = (timestamp: number) => {
      const dt = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0;
      lastTimeRef.current = timestamp;

      if (!isUserInteracting.current) {
        targetIndexRef.current += (AUTO_SPEED * dt) / ANGLE_STEP;
      }

      const current = currentIndexRef.current;
      const target = targetIndexRef.current;
      let diff = target - current;
      while (diff > TOTAL / 2) diff -= TOTAL;
      while (diff < -TOTAL / 2) diff += TOTAL;

      const next = current + diff * 0.08;
      currentIndexRef.current = next;
      setDisplayIndex(next);
      setLightAngle((next * ANGLE_STEP) % 360);

      let closestTile = 0;
      let closestAngle = Infinity;
      for (let i = 0; i < TOTAL; i++) {
        let a = (i - next) * ANGLE_STEP;
        while (a > 180) a -= 360;
        while (a < -180) a += 360;
        if (Math.abs(a) < closestAngle) {
          closestAngle = Math.abs(a);
          closestTile = i;
        }
      }
      const labelOpacity = Math.max(0, 1 - Math.max(0, closestAngle - 8) / 22);
      setCenterLabel({ text: TILES[closestTile % TOTAL].alt, opacity: labelOpacity });

      const lineProg = Math.max(0, Math.min(1, (10 - closestAngle) / 8));
      setLockProgress(lineProg);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (animFrameRef.current) return;
      lastTimeRef.current = 0; // reset dt so the carousel doesn't jump on resume
      animFrameRef.current = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    };

    /* ── Pause auto-rotation while the carousel is off-screen ── */
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { rootMargin: '120px' }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);

    startLoop();
    return () => {
      stopLoop();
      obs.disconnect();
    };
  }, [prefersReducedMotion]);

  const pauseAutoScroll = useCallback(() => {
    isUserInteracting.current = true;
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 2500);
  }, []);

  const moveTo = useCallback(
    (newTarget: number) => {
      pauseAutoScroll();
      targetIndexRef.current = newTarget;
    },
    [pauseAutoScroll]
  );

  const moveBy = useCallback(
    (delta: number) => {
      pauseAutoScroll();
      targetIndexRef.current += delta;
    },
    [pauseAutoScroll]
  );

  /* Keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') moveBy(-1);
      if (e.key === 'ArrowRight') moveBy(1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [moveBy]);

  /* Center tile parallax tilt */
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -4, y: dx * 4 });
  }, []);

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  /* Drag */
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
    setIsDraggingState(false);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pauseAutoScroll();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 6) {
      isDragging.current = true;
      setIsDraggingState(true);
    }
    if (isDragging.current) {
      targetIndexRef.current -= e.movementX / 90;
    }
  };

  const onPointerUp = () => {
    dragStartX.current = null;
    isDragging.current = false;
    setIsDraggingState(false);
  };

  /* Per-tile data */
  const getTileData = (tileIndex: number) => {
    let angleDeg = (tileIndex - displayIndex) * ANGLE_STEP;
    while (angleDeg > 180) angleDeg -= 360;
    while (angleDeg < -180) angleDeg += 360;

    const angleRad = (angleDeg * Math.PI) / 180;
    const x = Math.sin(angleRad) * RADIUS;
    const z = Math.cos(angleRad) * RADIUS - RADIUS;
    const rotateY = -angleDeg;
    const cosAngle = Math.cos(angleRad);

    const scale = 0.6 + 0.4 * ((cosAngle + 1) / 2);
    const zIndex = Math.round(50 + cosAngle * 40);
    const absAngle = Math.abs(angleDeg);
    const isVisible = absAngle < 160;
    const isCenter = absAngle < 8;
    const dofBlur = isCenter ? 0 : Math.max(0, (absAngle - 20) / 140) * 1.2;
    const brightness = 0.78 + 0.22 * ((cosAngle + 1) / 2);
    const lightDiff = ((angleDeg - lightAngle * 0.05) + 360) % 360;
    const lightFacing = Math.cos((lightDiff * Math.PI) / 180);
    const ambientBoost = isCenter ? 0 : Math.max(0, lightFacing) * 0.04;

    return {
      x, z, rotateY, scale, zIndex, isVisible, isCenter,
      dofBlur, brightness: brightness + ambientBoost, angleDeg,
    };
  };

  /* ── Reduced-motion fallback ── */
  if (prefersReducedMotion) {
    return (
      <div
        ref={sectionRef}
        className="relative w-full"
        style={{ paddingTop: '80px', paddingBottom: '80px' }}
      >
        <div
          className="flex items-center justify-center gap-4 px-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {TILES.map((tile, i) => (
            <button
              key={i}
              className="flex-shrink-0 overflow-hidden cursor-pointer focus:outline-none"
              style={{ width: `${TILE_W}px`, height: `${TILE_H}px`, borderRadius: 0 }}
              onClick={() => moveTo(i)}
              aria-label={tile.alt}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                className="w-full h-full object-cover object-top"
              />
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => moveBy(-1)}
            className="w-10 h-10 flex items-center justify-center border border-foreground-950/20 text-foreground-950/60 hover:border-foreground-950 hover:text-foreground-950 transition-all duration-200 cursor-pointer"
            style={{ borderRadius: 0 }}
            aria-label="Vorheriges"
          >
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
          <button
            onClick={() => moveBy(1)}
            className="w-10 h-10 flex items-center justify-center border border-foreground-950/20 text-foreground-950/60 hover:border-foreground-950 hover:text-foreground-950 transition-all duration-200 cursor-pointer"
            style={{ borderRadius: 0 }}
            aria-label="Nächstes"
          >
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
        </div>
      </div>
    );
  }

  /* ── Full 3D circular carousel ── */
  return (
    <div
      ref={sectionRef}
      className="relative w-full select-none overflow-hidden"
      style={{
        /* No background — inherits hero's white seamlessly */
        paddingTop: '40px',
        paddingBottom: '100px',
        transform: `scale(${popScale})`,
        opacity: popOpacity,
        transformOrigin: 'center center',
      }}
    >
      {/* ── Film grain texture — tiled over the entire section ── */}
      {grainDataUrl && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${grainDataUrl})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            opacity: 0.55,
            mixBlendMode: 'multiply',
            zIndex: 10,
          }}
        />
      )}

      {/* Ambient radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(200,212,0,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Overhead studio light — drifts with rotation */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-80px',
          left: `${50 + Math.sin((lightAngle * Math.PI) / 180) * 8}%`,
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.45) 0%, transparent 70%)',
          transition: 'left 0.8s ease',
        }}
      />

      {/* 3D Stage */}
      <div
        ref={stageRef}
        className="relative flex items-center justify-center"
        style={{
          height: `${TILE_H + 220}px`,
          perspective: '1800px',
          perspectiveOrigin: '50% 48%',
          cursor: isDraggingState ? 'grabbing' : 'grab',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        role="region"
        aria-label="Kreation Showcase Carousel"
        tabIndex={0}
      >
        {/* Anchor */}
        <div style={{ position: 'relative', width: 0, height: 0, transformStyle: 'preserve-3d' }}>
          {TILES.map((tile, i) => {
            const {
              x, z, rotateY, scale, zIndex, isVisible, isCenter, dofBlur, brightness, angleDeg,
            } = getTileData(i);

            const tiltTransform = isCenter
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : '';

            const tileStyle: React.CSSProperties = {
              position: 'absolute',
              width: `${TILE_W}px`,
              height: `${TILE_H}px`,
              marginLeft: `-${TILE_W / 2}px`,
              marginTop: `-${TILE_H / 2}px`,
              transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale}) ${tiltTransform}`,
              zIndex,
              opacity: isVisible ? 1 : 0,
              filter: `brightness(${brightness}) blur(${dofBlur}px)`,
              pointerEvents: isVisible ? 'auto' : 'none',
              willChange: 'transform, filter',
              cursor: isCenter ? 'default' : 'pointer',
              transition: isCenter ? 'transform 0.15s ease' : 'opacity 0.3s ease',
            };

            return (
              <div
                key={i}
                style={tileStyle}
                onClick={() => {
                  if (!isDragging.current && !isCenter) {
                    const ad = ((i - displayIndex) * ANGLE_STEP + 180 + 3600) % 360 - 180;
                    moveTo(displayIndex + ad / ANGLE_STEP);
                  }
                }}
              >
                <div
                  className="w-full h-full overflow-hidden relative"
                  style={{
                    borderRadius: 0,
                    /* Polaroid-style drop shadow — heavier for center tile */
                    boxShadow: isCenter
                      ? '0 32px 80px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.14), 2px 4px 0 rgba(0,0,0,0.04)'
                      : '0 10px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07), 1px 2px 0 rgba(0,0,0,0.03)',
                    background: '#fff',
                  }}
                >
                  <img
                    src={tile.src}
                    alt={tile.alt}
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                    style={{
                      transform: isCenter ? 'scale(1.02)' : 'scale(1)',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <GlossOverlay angleFromCenter={angleDeg} />
                  {/* Polaroid frame with caption + lime accent line */}
                  <PolaroidFrame
                    isCenter={isCenter}
                    label={centerLabel.text}
                    lockProgress={lockProgress}
                  />
                  {!isCenter && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.10) 100%)',
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>
                <GroundReflection src={tile.src} scale={scale} brightness={brightness} />
              </div>
            );
          })}
        </div>

        {/* Ground plane shadow */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '60px',
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.08) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>

      {/* Drag hint */}
      <div
        className="flex items-center justify-center gap-2 mt-1"
        style={{ opacity: popOpacity * 0.4 }}
      >
        <i className="ri-drag-move-line text-sm text-foreground-950/35" />
        <span className="text-xs font-black uppercase tracking-widest text-foreground-950/30">
          Ziehen oder klicken
        </span>
      </div>
    </div>
  );
}
