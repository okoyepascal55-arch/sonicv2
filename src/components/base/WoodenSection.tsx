interface WoodenSectionProps {
  children: React.ReactNode;
  variant?: 'light' | 'medium' | 'white';
  className?: string;
}

export default function WoodenSection({
  children,
  variant = 'white',
  className = '',
}: WoodenSectionProps) {
  const variantClasses = {
    white: 'bg-background-50',
    light: 'bg-background-200/70',
    medium: 'bg-background-100',
  };

  return (
    <section className={`relative ${variantClasses[variant]} ${className}`}>
      <div className="relative z-10">{children}</div>
    </section>
  );
}