import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  /** Total width of the phone including frame. Default 264px */
  width?: number;
  className?: string;
}

/* ═══════════════════════════════════════════════════════════════════
   PHONE FRAME PALETTE — named const for maintainability
   All near-black values used for realistic device rendering.
   ═══════════════════════════════════════════════════════════════════ */
const PHONE = {
  bezel: '#272727',
  bezelMid: '#1b1b1b',
  bezelDark: '#191919',
  bezelDeep: '#202020',
  bezelLight: '#252525',
  button: '#131313',
  buttonMid: '#2b2b2b',
  buttonEdge: '#1e1e1e',
  cameraBar: '#0b0b0b',
  cameraBarBorder: 'rgba(0,0,0,0.85)',
  lens: '#2e2e2e',
  lensDark: '#0a0a0a',
  lensMid: '#141414',
  faceSensor: '#141414',
  screen: '#080808',
  screenShadow: 'rgba(0,0,0,0.90)',
  bottomBar: '#0b0b0b',
  bottomBarBorder: 'rgba(0,0,0,0.85)',
  homeIndicator: 'rgba(255,255,255,0.08)',
  homeIndicatorBright: 'rgba(255,255,255,0.22)',
  speakerDot: 'rgba(255,255,255,0.10)',
  speakerDotLime: 'rgba(200,212,0,0.25)',
  glassSheen: 'rgba(255,255,255,0.028)',
  glassSheenFaint: 'rgba(255,255,255,0.009)',
  lime: 'oklch(var(--primary-500))',
  limeGlow: 'rgba(200,212,0,0.75)',
  limeSpeakerGlow: 'rgba(200,212,0,0.3)',
} as const;

/**
 * Skeuomorphic dark-titanium phone frame — sharp-corner CI.
 * Renders: metallic gradient body, physical side buttons (volume left / power right),
 * top camera bar with lens + lime status dot + ear speaker,
 * screen area with depth shadow + glass sheen overlay,
 * bottom speaker grille dots + home indicator bar.
 *
 * Usage: wrap your screen content (status bar + app header + body) as children.
 * The frame adds ~72px of total vertical overhead (camera bar 22px + bottom 24px + padding 12px×2px).
 */
export default function PhoneFrame({ children, width = 264, className = '' }: PhoneFrameProps) {
  const pad = 11;
  const screenW = width - pad * 2;

  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width }}
    >
      {/* ── Left: Volume Down + Volume Up ─────────────── */}
      <div
        className="absolute"
        style={{ left: -6, top: 78, display: 'flex', flexDirection: 'column', gap: 9 }}
      >
        {[26, 40].map((h, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: h,
              background: `linear-gradient(90deg, ${PHONE.button} 0%, ${PHONE.buttonMid} 60%, ${PHONE.buttonEdge} 100%)`,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.6)',
            }}
          />
        ))}
      </div>

      {/* ── Right: Power button with lime brand accent ─── */}
      <div className="absolute" style={{ right: -6, top: 108 }}>
        <div
          style={{
            width: 6,
            height: 40,
            background: `linear-gradient(270deg, ${PHONE.button} 0%, ${PHONE.buttonMid} 60%, ${PHONE.buttonEdge} 100%)`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.6)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Lime accent stripe — top of power button */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 5,
              background: PHONE.lime,
              boxShadow: `0 0 6px ${PHONE.limeGlow}`,
            }}
          />
        </div>
      </div>

      {/* ── Main body ─────────────────────────────────── */}
      <div
        style={{
          background:
            `linear-gradient(160deg, ${PHONE.bezel} 0%, ${PHONE.bezelMid} 28%, ${PHONE.bezelDark} 55%, ${PHONE.bezelDeep} 80%, ${PHONE.bezelLight} 100%)`,
          padding: `${pad}px`,
          boxShadow:
            '0 40px 90px rgba(0,0,0,0.70), 0 8px 24px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.055), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.55)',
        }}
      >
        {/* ── Camera / sensor bar ────────────────────── */}
        <div
          style={{
            width: screenW,
            height: 22,
            background: PHONE.cameraBar,
            borderBottom: `1px solid ${PHONE.cameraBarBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 2,
          }}
        >
          {/* Camera lens */}
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background:
                `radial-gradient(circle at 35% 35%, ${PHONE.lens} 0%, ${PHONE.lensDark} 55%, ${PHONE.lensMid} 100%)`,
              boxShadow:
                '0 0 0 1.5px rgba(255,255,255,0.07), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          />
          {/* Lime status indicator */}
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: PHONE.lime,
              boxShadow: `0 0 6px ${PHONE.limeGlow}`,
            }}
          />
          {/* Ear speaker grille */}
          <div
            style={{
              width: 28,
              height: 4,
              background:
                'repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 2px, transparent 2px, transparent 4px)',
            }}
          />
          {/* Face sensor dot */}
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: PHONE.faceSensor,
              boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
            }}
          />
        </div>

        {/* ── Screen area ────────────────────────────── */}
        <div
          style={{
            width: screenW,
            background: PHONE.screen,
            overflow: 'hidden',
            boxShadow:
              'inset 0 3px 10px rgba(0,0,0,0.90), inset 0 0 0 1px rgba(0,0,0,0.8)',
            position: 'relative',
          }}
        >
          {/* Glass sheen overlay — subtle angled reflection */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '52%',
              height: '100%',
              background:
                `linear-gradient(128deg, ${PHONE.glassSheen} 0%, ${PHONE.glassSheenFaint} 45%, transparent 100%)`,
              pointerEvents: 'none',
              zIndex: 30,
            }}
          />
          {/* Screen content */}
          {children}
        </div>

        {/* ── Bottom speaker grille + home indicator ─── */}
        <div
          style={{
            width: screenW,
            height: 27,
            background: PHONE.bottomBar,
            borderTop: `1px solid ${PHONE.bottomBarBorder}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            marginTop: 2,
          }}
        >
          {/* Speaker grille dots */}
          <div style={{ display: 'flex', gap: 4 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 2.5,
                  height: 2.5,
                  borderRadius: '50%',
                  background:
                    i === 4
                      ? PHONE.speakerDotLime
                      : PHONE.speakerDot,
                  boxShadow:
                    i === 4 ? `0 0 3px ${PHONE.limeSpeakerGlow}` : undefined,
                }}
              />
            ))}
          </div>
          {/* Home indicator bar */}
          <div
            style={{
              width: 52,
              height: 3,
              background:
                `linear-gradient(90deg, ${PHONE.homeIndicator}, ${PHONE.homeIndicatorBright}, ${PHONE.homeIndicator})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
