interface SectionBadgeProps {
  text: string;
  /** "light" = on dark bg | "dark" = on light bg. Both render lime text on a tinted lime chip. */
  variant?: 'light' | 'dark';
  className?: string;
  animated?: boolean;
}

/**
 * SectionBadge — the single category label used above every section heading, site-wide.
 *
 * One visual language everywhere: a tinted lime chip (lime/18 fill, lime/35 border) with a
 * lime square dot and lime uppercase label. variant only nudges the tint depth so it reads
 * correctly on light vs dark backgrounds — the text is ALWAYS primary-500, never near-black.
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
      className={`inline-flex items-center gap-2 px-3.5 py-[7px] ${className}`}
      style={{
        background: isLight ? 'oklch(var(--primary-500) / 0.16)' : 'oklch(var(--primary-500) / 0.18)',
        border: '1px solid oklch(var(--primary-500) / 0.35)',
      }}
    >
      <div
        className={`w-1.5 h-1.5 flex-shrink-0 ${animated ? 'animate-badge-dot' : ''}`}
        style={{
          background: 'oklch(var(--primary-500))',
          borderRadius: 0,
        }}
      />
      <span
        className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap"
        style={{ color: 'oklch(var(--primary-500))' }}
      >
        {text}
      </span>
    </div>
  );
}
