interface WoodenDividerProps {
  variant?: 'horizontal' | 'vertical' | 'diagonal';
  className?: string;
}

export default function WoodenDivider({ variant = 'horizontal', className = '' }: WoodenDividerProps) {
  if (variant === 'vertical') {
    return (
      <div className={`relative w-6 h-full overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
        <svg className="absolute inset-0 w-full h-[200%] animate-wave-1" style={{ left: '0px' }} viewBox="0 0 24 2000" preserveAspectRatio="none">
          <path d="M12,0 Q6,50 12,100 T12,200 T12,300 T12,400 T12,500 T12,600 T12,700 T12,800 T12,900 T12,1000" fill="none" style={{ stroke: 'oklch(var(--primary-500))', strokeWidth: '2.5px', strokeLinecap: 'round' as const, strokeOpacity: 1 }} />
        </svg>
        <svg className="absolute inset-0 w-full h-[200%] animate-wave-2" style={{ left: '4px' }} viewBox="0 0 24 2000" preserveAspectRatio="none">
          <path d="M12,0 Q18,50 12,100 T12,200 T12,300 T12,400 T12,500 T12,600 T12,700 T12,800 T12,900 T12,1000" fill="none" style={{ stroke: 'oklch(var(--primary-600))', strokeWidth: '2px', strokeLinecap: 'round' as const, strokeOpacity: 0.9 }} />
        </svg>
        <svg className="absolute inset-0 w-full h-[200%] animate-wave-3" style={{ left: '8px' }} viewBox="0 0 24 2000" preserveAspectRatio="none">
          <path d="M12,0 Q6,50 12,100 T12,200 T12,300 T12,400 T12,500 T12,600 T12,700 T12,800 T12,900 T12,1000" fill="none" style={{ stroke: 'oklch(var(--primary-500))', strokeWidth: '1.5px', strokeLinecap: 'round' as const, strokeOpacity: 0.7 }} />
        </svg>
      </div>
    );
  }

  // THE ONE APPROVED DIVIDER — smaller, thinner 3-line animated wave
  return (
    <div className={`relative w-full h-6 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Line 1 — Primary lime, slightly thinner */}
      <svg className="absolute w-[200%] h-full animate-wave-1" style={{ top: '0px' }} viewBox="0 0 2000 24" preserveAspectRatio="none">
        <path d="M0,12 Q50,6 100,12 T200,12 T300,12 T400,12 T500,12 T600,12 T700,12 T800,12 T900,12 T1000,12 T1100,12 T1200,12 T1300,12 T1400,12 T1500,12 T1600,12 T1700,12 T1800,12 T1900,12 T2000,12" fill="none" style={{ stroke: 'oklch(var(--primary-500))', strokeWidth: '1.8px', strokeLinecap: 'round' as const, strokeOpacity: 1 }} />
      </svg>
      {/* Line 2 — Darker */}
      <svg className="absolute w-[200%] h-full animate-wave-2" style={{ top: '4px' }} viewBox="0 0 2000 24" preserveAspectRatio="none">
        <path d="M0,12 Q50,18 100,12 T200,12 T300,12 T400,12 T500,12 T600,12 T700,12 T800,12 T900,12 T1000,12 T1100,12 T1200,12 T1300,12 T1400,12 T1500,12 T1600,12 T1700,12 T1800,12 T1900,12 T2000,12" fill="none" style={{ stroke: 'oklch(var(--primary-600))', strokeWidth: '2px', strokeLinecap: 'round' as const, strokeOpacity: 0.9 }} />
      </svg>
      {/* Line 3 — Lighter accent */}
      <svg className="absolute w-[200%] h-full animate-wave-3" style={{ top: '8px' }} viewBox="0 0 2000 24" preserveAspectRatio="none">
        <path d="M0,12 Q50,6 100,12 T200,12 T300,12 T400,12 T500,12 T600,12 T700,12 T800,12 T900,12 T1000,12 T1100,12 T1200,12 T1300,12 T1400,12 T1500,12 T1600,12 T1700,12 T1800,12 T1900,12 T2000,12" fill="none" style={{ stroke: 'oklch(var(--primary-500))', strokeWidth: '1.5px', strokeLinecap: 'round' as const, strokeOpacity: 0.7 }} />
      </svg>
    </div>
  );
}