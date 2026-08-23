interface SectionBadgeProps {
  text: string;
  /** "light" = lime badge on dark bg | "dark" = lime badge on light bg (slightly darker) */
  variant?: 'light' | 'dark';
  className?: string;
  animated?: boolean;
}

/**
 * SectionBadge — unified category label used above section headings across the entire site.
 *
 * variant="light"  → for dark / foreground-950 background sections (SRT, DualCTA, LVP dark areas)
 * variant="dark"   → for white / light background sections (Challenge, DarumSonic, Careers)
 */
export default function SectionBadge({
  text,
  variant = 'dark',
  className = '',
  animated = true,
}: SectionBadgeProps) {
  const isLight = variant === 'light';

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-1.5 ${className}`}
      style={{
        background: isLight ? 'oklch(var(--primary-500) / 0.15)' : 'oklch(var(--primary-500) / 0.20)',
        border: '1px solid oklch(var(--primary-500) / 0.30)',
      }}
    >
      <div
        className={`w-1.5 h-1.5 ${animated ? 'animate-badge-dot' : ''}`}
        style={{
          background: 'oklch(var(--primary-500))',
          borderRadius: 0,
        }}
      />
      <span
        className="text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap"
        style={{ color: isLight ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-950))' }}
      >
        {text}
      </span>
    </div>
  );
}