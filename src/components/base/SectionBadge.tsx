interface SectionBadgeProps {
  text: string;
  /** "light" = on dark bg | "dark" = on light bg. */
  variant?: 'light' | 'dark';
  className?: string;
  animated?: boolean;
}

/**
 * SectionBadge — the single eyebrow label used above every section heading, site-wide.
 *
 * One visual language everywhere: a 28px lime hairline rule + an uppercase label. variant
 * only picks the label color depth so it reads correctly against light vs dark backgrounds.
 */
export default function SectionBadge({
  text,
  variant = 'dark',
  className = '',
}: SectionBadgeProps) {
  const onDark = variant === 'light';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="w-7 h-0.5 flex-shrink-0" style={{ background: 'oklch(var(--primary-500))' }} aria-hidden="true" />
      <span
        className="text-[11px] font-black uppercase tracking-[0.24em] whitespace-nowrap"
        style={{ color: onDark ? 'oklch(var(--primary-500))' : 'oklch(0.55 0.08 115)' }}
      >
        {text}
      </span>
    </div>
  );
}
