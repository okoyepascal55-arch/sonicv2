import { useEffect, useRef, useState, type ReactNode } from 'react';

// ── Simple SectionReveal (used on non-home pages) ──────────────────────────
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
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [delay, hasAnimated]);

  const distance = intensity === 'subtle' ? 20 : intensity === 'medium' ? 36 : 56;
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':    return `translateY(${distance}px)`;
      case 'down':  return `translateY(-${distance}px)`;
      case 'left':  return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      default:      return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        transform: prefersReducedMotion ? 'none' : (isVisible ? 'none' : getInitialTransform()),
        opacity: isVisible ? 1 : 0,
        transition: isVisible
          ? `transform ${prefersReducedMotion ? '0.15s' : '0.7s'} cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms,
             opacity ${prefersReducedMotion ? '0.15s' : '0.55s'} ease ${delay}ms`
          : 'none',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}

// ── StackedSectionReveal (homepage) ───────────────────────────────────────
// Smoothed: lower translate distance, gentler easing, no shimmer line,
// lower threshold so sections trigger earlier (less blank-screen time).
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
    // Lower threshold (0.02) + negative rootMargin = sections trigger when
    // just 2% is visible, earlier than before — reduces blank-screen time.
    // No stagger delay — each section animates independently as it enters.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      {
        threshold: 0.02,
        rootMargin: '0px 0px 0px 0px', // no negative offset — trigger as soon as visible
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        // Reduced translate (16px vs 36px before) — subtle, not jarring.
        // No scale — scale on full-width sections causes layout shift & repaints.
        // Faster duration (0.6s vs 0.85s) — feels snappier.
        transform: prefersReducedMotion ? 'none' : (isVisible ? 'none' : 'translateY(16px)'),
        opacity: isVisible ? 1 : 0,
        transition: isVisible
          ? `transform ${prefersReducedMotion ? '0.15s' : '0.6s'} cubic-bezier(0.22, 1, 0.36, 1),
             opacity ${prefersReducedMotion ? '0.15s' : '0.45s'} ease`
          : 'none',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
}
