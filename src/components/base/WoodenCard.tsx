import { ReactNode, useState, useId } from 'react';

interface WoodenCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  borderRadius?: number;
}

export default function WoodenCard({ children, className = '', hover = true, borderRadius = 0 }: WoodenCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const uniqueId = useId();

  return (
    <div
      className={`
        relative bg-white p-8 shadow-lg
        ${hover ? 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-moderate ease-sonic-spring group' : ''}
        ${className}
      `}
      style={{ borderRadius: `${borderRadius}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle green background highlight */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.03] via-transparent to-primary-500/[0.05] pointer-events-none" 
        style={{ borderRadius: `${borderRadius}px` }}
      />
      
      {/* Single Solid SVG Border Line */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        style={{ borderRadius: `${borderRadius}px` }}
      >
        <defs>
          <linearGradient id={`card-sketch-single-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'oklch(var(--primary-500))', stopOpacity: isHovered ? 1 : 0.2 }} />
            <stop offset="50%" style={{ stopColor: 'oklch(var(--primary-600))', stopOpacity: isHovered ? 1 : 0.12 }} />
            <stop offset="100%" style={{ stopColor: 'oklch(var(--primary-500))', stopOpacity: isHovered ? 1 : 0.2 }} />
          </linearGradient>
        </defs>
        
        {/* Single solid line */}
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx={borderRadius - 2}
          ry={borderRadius - 2}
          fill="none"
          stroke={`url(#card-sketch-single-${uniqueId})`}
          strokeWidth={isHovered ? 2.5 : 0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all ease-out"
          style={{
            filter: isHovered ? 'drop-shadow(0 0 8px oklch(var(--primary-500) / 0.6))' : 'none',
            transitionDuration: '1.2s',
          }}
        />
      </svg>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}