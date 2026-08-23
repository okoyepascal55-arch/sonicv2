interface WoodenButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function WoodenButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
}: WoodenButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-black uppercase tracking-wider whitespace-nowrap relative overflow-hidden transition-all duration-moderate ease-sonic-spring';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: [
      'bg-primary-500 text-foreground-950',
      'border-2 border-transparent',
      'hover:bg-primary-500 hover:scale-105 hover:ring-2 hover:ring-primary-500/30',
      'active:scale-95 active:bg-primary-600',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background-50',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:ring-0',
    ].join(' '),
    secondary: [
      'bg-foreground-950 text-background-50',
      'border-2 border-transparent',
      'hover:bg-foreground-950 hover:scale-105 hover:ring-2 hover:ring-primary-500/30',
      'active:scale-95 active:bg-foreground-900',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background-50',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:ring-0',
    ].join(' '),
    outline: [
      'border-2 border-foreground-300 text-foreground-950 bg-transparent',
      'hover:border-primary-500 hover:scale-105 hover:ring-2 hover:ring-primary-500/20',
      'active:scale-95 active:border-primary-600',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background-50',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:ring-0 disabled:hover:border-foreground-300',
    ].join(' '),
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {/* Hover shimmer sweep — optical polish, not distracting */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/10 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-moderate pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
      >
        {content}
      </a>
    );
  }

  if (href && disabled) {
    return (
      <span
        className={classes}
        aria-disabled="true"
      >
        {content}
      </span>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}