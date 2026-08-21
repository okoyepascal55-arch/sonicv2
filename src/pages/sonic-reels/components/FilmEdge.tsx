// ── Film negative edge — dotted sprocket perforations (top/bottom frame) ──
// Renders a full-width bar that reads like the perforated border of a 35mm
// negative. The "dotted" nature comes from a repeating sprocket-hole pattern.
export default function FilmEdge({ accent, code }: { accent: string; code: string }) {
  return (
    <div
      className="relative w-full h-8 select-none overflow-hidden"
      style={{ background: '#0d0b08', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Sprocket perforations (repeating dotted holes) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'30\' height=\'26\'%3E%3Crect x=\'6\' y=\'8\' width=\'17\' height=\'11\' rx=\'2\' fill=\'%23050504\' stroke=\'%23ffffff\' stroke-opacity=\'0.06\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: 'center',
        }}
      />
      {/* Accent hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `${accent}2e` }} />
      {/* Edge markings */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', letterSpacing: '0.28em', color: `${accent}55`, fontWeight: 900 }}>
          {code}
        </span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', letterSpacing: '0.28em', color: 'rgba(255,255,255,0.2)', fontWeight: 900 }}>
          35MM
        </span>
      </div>
    </div>
  );
}