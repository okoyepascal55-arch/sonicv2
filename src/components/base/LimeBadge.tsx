interface LimeBadgeProps {
  text: string;
  className?: string;
}

/**
 * LimeBadge — careers-style section eyebrow: solid lime square, black dot,
 * sharp corners. Mirrors the Karriere page's eyebrow motif.
 */
export default function LimeBadge({ text, className = '' }: LimeBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 bg-[#C8D400] text-[#0B0B0C] text-xs font-bold uppercase tracking-[0.06em] px-3.5 py-[7px] ${className}`}
    >
      <span className="w-1.5 h-1.5 bg-[#0B0B0C] flex-shrink-0" />
      {text}
    </div>
  );
}