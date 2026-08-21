import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  /**
   * "lime"   = lime-tinted, for dark background contexts
   * "dark"   = dark-tinted, for light background contexts (default)
   * "subtle" = ultra-light, for secondary / inactive states
   */
  variant?: 'lime' | 'dark' | 'subtle';
  className?: string;
}

/**
 * Tag — unified small pill/label across the site.
 *
 * variant="lime"   → uses primary-500 with low opacity (dark sections)
 * variant="dark"   → uses foreground-950 at low opacity (light sections)
 * variant="subtle" → uses foreground-400 at low opacity (inactive/secondary)
 */
export default function Tag({ children, variant = 'dark', className = '' }: TagProps) {
  const styles: Record<string, React.CSSProperties> = {
    lime: {
      background: 'oklch(var(--primary-500) / 0.12)',
      color: 'oklch(var(--primary-500))',
      border: '1px solid oklch(var(--primary-500) / 0.25)',
    },
    dark: {
      background: 'oklch(var(--foreground-950) / 0.06)',
      color: 'oklch(var(--foreground-500))',
      border: '1px solid transparent',
    },
    subtle: {
      background: 'oklch(var(--foreground-950) / 0.03)',
      color: 'oklch(var(--foreground-400))',
      border: '1px solid transparent',
    },
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-black px-2.5 py-1 uppercase tracking-wider whitespace-nowrap ${className}`}
      style={styles[variant]}
    >
      {children}
    </span>
  );
}