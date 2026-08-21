import { useState, useEffect } from 'react';

interface ScrollToTopButtonProps {
  /** Scroll distance in px before the button appears. Default: 400 */
  threshold?: number;
}

export default function ScrollToTopButton({ threshold = 400 }: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setVisible(scrollY > threshold);
        setScrollPct(docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle progress ring
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPct / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Zurück nach oben"
      className={`
        fixed bottom-8 right-8 z-50 group
        flex items-center justify-center
        w-12 h-12
        bg-foreground-950 hover:bg-primary-500
        transition-all duration-500 ease-out cursor-pointer
        ${visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
        }
      `}
      style={{ borderRadius: 0 }}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 48 48"
        fill="none"
      >
        {/* Track */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="rgba(200,212,0,0.2)"
          strokeWidth="2"
          fill="none"
        />
        {/* Progress */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="#C8D400"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          className="transition-all duration-200"
        />
      </svg>

      {/* Arrow icon */}
      <i className="ri-arrow-up-line text-white group-hover:text-foreground-950 text-base relative z-10 transition-colors duration-300" />

      {/* Tooltip */}
      <span
        className="
          absolute right-full mr-3 top-1/2 -translate-y-1/2
          bg-foreground-950 text-white text-xs font-black uppercase tracking-widest
          px-3 py-1.5 whitespace-nowrap
          opacity-0 group-hover:opacity-100
          translate-x-2 group-hover:translate-x-0
          transition-all duration-200 pointer-events-none
        "
        style={{ borderRadius: 0 }}
      >
        Nach oben
      </span>
    </button>
  );
}
