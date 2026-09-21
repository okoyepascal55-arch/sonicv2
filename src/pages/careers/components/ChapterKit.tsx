import type { ReactNode } from 'react';

/**
 * Local-only presentational primitives for the Karriere v2 chapter system.
 * Scoped to src/pages/careers — not shared with other pages by design,
 * so this redesign can't destabilize layout elsewhere on the site.
 */

// Warm near-black used for dark chapter bands (Hero, Ausgezeichnet, Stellen) —
// matches the approved Karriere v2 design canvas exactly.
export const INK = 'oklch(0.13 0.005 118)';
export const INK_SOFT = 'oklch(0.16 0.006 118)';
// Muted lime for eyebrow labels sitting on white/near-white backgrounds.
export const LIME_MUTED = 'oklch(0.55 0.08 115)';

export function ChapterEyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
      <span
        className="text-[11px] font-black uppercase tracking-[0.24em]"
        style={{ color: dark ? 'oklch(var(--primary-500))' : LIME_MUTED }}
      >
        {children}
      </span>
    </div>
  );
}

export function ChapterNumeral({ n, dark = false }: { n: string; dark?: boolean }) {
  return (
    <span
      className="hidden lg:block flex-shrink-0 font-black leading-[0.8] tracking-[-0.06em] select-none"
      style={{
        fontSize: '92px',
        color: dark ? 'rgba(255,255,255,0.09)' : 'oklch(var(--foreground-950) / 0.1)',
      }}
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

export function Marker({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: 'oklch(var(--primary-500) / 0.9)',
        color: 'oklch(var(--foreground-950))',
        padding: '0.02em 0.16em',
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
      }}
    >
      {children}
    </span>
  );
}

export function ChapterHeader({
  n,
  eyebrow,
  heading,
  sub,
  dark = false,
  aside,
  headingMax = 'max-w-[620px]',
  headingSize = 'clamp(1.75rem, 3.2vw, 3.25rem)',
  absoluteNumeral = true,
  mb,
}: {
  n: string;
  eyebrow: string;
  heading: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  aside?: ReactNode;
  headingMax?: string;
  headingSize?: string;
  /**
   * When true, the chapter numeral is removed from the flex flow and placed
   * absolutely at the top-right of the header — so eyebrow, heading, and sub
   * all left-align with the content below rather than being indented by the numeral.
   */
  absoluteNumeral?: boolean;
  /** Override the bottom margin class. Defaults to 'mb-12 md:mb-14' (flex) or 'mb-8 md:mb-10' (absolute). */
  mb?: string;
}) {
  const marginBottom = mb ?? (absoluteNumeral ? 'mb-8 md:mb-10' : 'mb-12 md:mb-14');

  if (absoluteNumeral) {
    return (
      <div className={`relative ${marginBottom}`}>
        {/* Ghost numeral — out of flow, decorative top-right anchor */}
        <span
          className="hidden lg:block absolute top-0 right-0 font-black leading-[0.8] tracking-[-0.06em] select-none pointer-events-none"
          style={{
            fontSize: '120px',
            color: dark ? 'rgba(255,255,255,0.07)' : 'oklch(var(--foreground-950) / 0.07)',
          }}
          aria-hidden="true"
        >
          {n}
        </span>

        {/* Content — full-width, left-aligned with section grid */}
        <div className={`relative z-10 ${headingMax}`}>
          <ChapterEyebrow dark={dark}>{eyebrow}</ChapterEyebrow>
          <h2
            className={`font-black mb-4 ${dark ? 'text-white' : 'text-foreground-950'}`}
            style={{ fontSize: headingSize, lineHeight: 1.04, letterSpacing: '-0.035em' }}
          >
            {heading}
          </h2>
          {sub && (
            <p
              className="text-base md:text-[17px] leading-relaxed max-w-[560px]"
              style={{ color: dark ? 'rgba(255,255,255,0.55)' : 'oklch(var(--foreground-500))' }}
            >
              {sub}
            </p>
          )}
        </div>

        {aside && (
          <div className="hidden xl:flex mt-6 max-w-[480px]">{aside}</div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-8 md:gap-16 ${marginBottom}`}>
      <ChapterNumeral n={n} dark={dark} />
      <div className={`flex-1 ${headingMax}`}>
        <ChapterEyebrow dark={dark}>{eyebrow}</ChapterEyebrow>
        <h2
          className={`font-black mb-4 ${dark ? 'text-white' : 'text-foreground-950'}`}
          style={{ fontSize: headingSize, lineHeight: 1.04, letterSpacing: '-0.035em' }}
        >
          {heading}
        </h2>
        {sub && (
          <p
            className="text-base md:text-[17px] leading-relaxed max-w-[560px]"
            style={{ color: dark ? 'rgba(255,255,255,0.55)' : 'oklch(var(--foreground-500))' }}
          >
            {sub}
          </p>
        )}
      </div>
      {aside && <div className="hidden xl:block flex-shrink-0 w-[220px] mt-2">{aside}</div>}
    </div>
  );
}
