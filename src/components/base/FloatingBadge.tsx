interface FloatingBadgeProps {
  icon: string;
  text: string;
  variant?: 'lime' | 'dark';
  className?: string;
}

export default function FloatingBadge({ icon, text, variant = 'lime', className = '' }: FloatingBadgeProps) {
  const isLime = variant === 'lime';
  return (
    <div
      className={`absolute flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wide whitespace-nowrap ${className}`}
      style={{
        background: isLime ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-950))',
        color: isLime ? 'oklch(var(--foreground-950))' : 'oklch(var(--primary-500))',
        boxShadow: isLime
          ? '0 4px 16px oklch(var(--primary-500) / 0.35), 0 2px 6px rgba(0,0,0,0.1)'
          : '0 4px 16px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.1)',
      }}
    >
      <i className={`${icon} text-xs`} />
      <span>{text}</span>
    </div>
  );
}