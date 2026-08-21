import { useEffect, useRef, useState, type ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  intensity = 'subtle',
}: SectionRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [delay, hasAnimated]);

  const distance = intensity === 'subtle' ? 28 : intensity === 'medium' ? 48 : 72;

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return `translateY(${distance}px) scale(0.992)`;
      case 'down': return `translateY(-${distance}px) scale(0.992)`;
      case 'left': return `translateX(${distance}px) scale(0.992)`;
      case 'right': return `translateX(-${distance}px) scale(0.992)`;
      default: return `translateY(${distance}px) scale(0.992)`;
    }
  };

  // Reduced motion: no translate, instant fade.
  // NOTE: no `filter: blur()` — blurring full-width sections caused visible
  // scroll flicker and expensive repaints. Opacity + transform are GPU-cheap.
  const transform = prefersReducedMotion
    ? 'translateY(0) translateX(0) scale(1)'
    : (isVisible ? 'translateY(0) translateX(0) scale(1)' : getInitialTransform());
  const opacity = isVisible ? 1 : 0;

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        transform,
        opacity,
        transition: isVisible
          ? `transform ${prefersReducedMotion ? '0.2s' : '0.85s'} cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
             opacity ${prefersReducedMotion ? '0.2s' : '0.65s'} cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
          : 'none',
      }}
    >
      {/* Lime top-edge shimmer — grows from center, then fades */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] pointer-events-none z-10"
        style={{
          width: isVisible ? '200px' : '0px',
          background: 'linear-gradient(90deg, transparent, #C8D400, transparent)',
          opacity: isVisible ? 0.5 : 0,
          transition: `width ${prefersReducedMotion ? '0.2s' : '0.8s'} cubic-bezier(0.16, 1, 0.3, 1) ${delay + 80}ms,
                       opacity ${prefersReducedMotion ? '0.2s' : '1s'} ease-out ${delay + 80}ms`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ── Stacked Card Reveal ────────────────────────────────────────────────────
interface StackedSectionRevealProps {
  children: ReactNode;
  className?: string;
  index: number;
  totalSections: number;
}

export function StackedSectionReveal({
  children,
  className = '',
  index,
  totalSections,
}: StackedSectionRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, index * (prefersReducedMotion ? 0 : 55));
        }
      },
      {
        threshold: 0.04,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [index, hasAnimated, prefersReducedMotion]);

  // Depth offset — sections further down the stack start slightly lower.
  // NOTE: no `zIndex` stacking — dynamic z-index (totalSections - index) made
  // earlier sections paint over later ones, causing visible overlap/ghosting.
  // Sections flow in normal document order instead.
  const depthOffset = Math.min((totalSections - index - 1) * 1.5, 12);
  const translateY = isVisible ? 0 : 36 + depthOffset;
  const scale = isVisible ? 1 : 0.988 - depthOffset * 0.001;

  const transform = prefersReducedMotion
    ? 'translateY(0) scale(1)'
    : (isVisible ? 'translateY(0) scale(1)' : `translateY(${translateY}px) scale(${scale})`);
  const opacity = isVisible ? 1 : 0;

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        transform,
        opacity,
        transition: isVisible
          ? `transform ${prefersReducedMotion ? '0.2s' : '0.85s'} cubic-bezier(0.16, 1, 0.3, 1) ${index * (prefersReducedMotion ? 0 : 40)}ms,
             opacity ${prefersReducedMotion ? '0.2s' : '0.6s'} cubic-bezier(0.16, 1, 0.3, 1) ${index * (prefersReducedMotion ? 0 : 40)}ms`
          : 'none',
      }}
    >
      {/* Lime shimmer line — grows from center, then fades */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] pointer-events-none z-10"
        style={{
          width: isVisible ? '180px' : '0px',
          background: 'linear-gradient(90deg, transparent, #C8D400, transparent)',
          opacity: isVisible ? 0.45 : 0,
          transition: `width ${prefersReducedMotion ? '0.2s' : '0.9s'} cubic-bezier(0.16, 1, 0.3, 1) ${index * (prefersReducedMotion ? 0 : 40) + 100}ms,
                       opacity ${prefersReducedMotion ? '0.2s' : '1.2s'} ease-out ${index * (prefersReducedMotion ? 0 : 40) + 100}ms`,
        }}
      />

      {children}
    </div>
  );
}