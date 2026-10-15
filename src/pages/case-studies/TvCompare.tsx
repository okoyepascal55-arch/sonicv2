import { useState } from 'react';
import { useTextSection } from '@/hooks/useText';
import { TV_COMPARE } from '@/lib/textStoreTvCompare';

/* TV & Sound — three brands side by side (15.10.2026).
   One question per row, the three brands across: the reader compares in a single glance.
   All text: Dashboard → Text → Fallbeispiele → „Fallbeispiel TV & Sound — Vergleich der 3 Marken“. */

const INK = 'oklch(0.13 0.005 118)';
const LIME = 'oklch(0.81 0.19 115)';
const RULE = '1px solid oklch(var(--foreground-950) / 0.1)';
const TL_START = 2009;
const TL_END = 2026;

export function useTvCompare() {
  const t = useTextSection('case_tvsound_compare');
  const pick = (id: string, fallback: string) => (t[id]?.trim() ? t[id] : fallback);
  return {
    eyebrow: pick('tvc-eyebrow', TV_COMPARE.eyebrow),
    heading: pick('tvc-heading', TV_COMPARE.heading),
    mandates: TV_COMPARE.mandates.map((m, i) => ({
      ...m,
      client: pick(`tvc-m${i + 1}-client`, m.client),
      period: pick(`tvc-m${i + 1}-period`, m.period),
      status: pick(`tvc-m${i + 1}-status`, m.status),
      tagline: pick(`tvc-m${i + 1}-tagline`, m.tagline),
    })),
    rows: TV_COMPARE.rows.map((r, ri) => ({
      label: pick(`tvc-r${ri + 1}-label`, r.label),
      values: r.values.map((v, mi) => pick(`tvc-r${ri + 1}-m${mi + 1}`, v)),
      isTags: ri === TV_COMPARE.rows.length - 1,
    })),
    note: pick('tvc-note', TV_COMPARE.note),
  };
}

function Cell({ value, isTags, isText }: { value: string; isTags: boolean; isText: boolean }) {
  const v = value.trim();
  if (!v || v === '–' || v === '-') {
    return <span className="text-[15px] font-bold" style={{ color: 'oklch(var(--foreground-950) / 0.25)' }} aria-label="keine Angabe">–</span>;
  }
  if (isTags) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {v.split('|').map((s) => s.trim()).filter(Boolean).map((s) => (
          <span key={s} className="text-[10px] font-black uppercase tracking-[0.12em] text-foreground-950 px-2 py-1" style={{ border: '1px solid oklch(var(--primary-500) / 0.7)' }}>{s}</span>
        ))}
      </div>
    );
  }
  const [main, ...rest] = v.split(' · ');
  const extra = rest.join(' · ');
  return (
    <div>
      <p className={isText ? 'text-[15px] font-bold leading-snug text-foreground-950' : 'font-black text-foreground-950 tabular-nums leading-none'} style={isText ? undefined : { fontSize: 'clamp(22px,2.2vw,30px)', letterSpacing: '-0.03em' }}>
        {main}
      </p>
      {extra && <p className="mt-1.5 text-[12px] font-semibold leading-snug" style={{ color: 'oklch(var(--foreground-500))' }}>{extra}</p>}
    </div>
  );
}

export default function TvCompare() {
  const d = useTvCompare();
  const [mobileIdx, setMobileIdx] = useState(d.mandates.length - 1);
  const span = TL_END - TL_START + 1; // years 2009 … 2026 inclusive
  // First row is a sentence („Ausgangslage“), the others are figures
  const isTextRow = (ri: number) => ri === 0;

  return (
    <div className="mb-14">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-3">
        <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
        <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{d.eyebrow}</span>
      </div>
      <h3 className="font-black text-foreground-950 mb-8" style={{ fontSize: 'clamp(24px,2.6vw,36px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>{d.heading}</h3>

      {/* Timeline 2009 → today */}
      <div className="mb-8" aria-hidden="true">
        <div className="relative h-2" style={{ background: 'oklch(var(--foreground-950) / 0.08)' }}>
          {d.mandates.map((m, i) => (
            <span
              key={i}
              className="absolute top-0 bottom-0"
              style={{
                left: `${((m.start - TL_START) / span) * 100}%`,
                width: `calc(${((m.end + 1 - m.start) / span) * 100}% - 2px)`,
                background: `oklch(var(--primary-500) / ${0.5 + i * 0.25})`,
              }}
            />
          ))}
        </div>
        <div className="relative h-5 mt-1.5">
          {[2009, 2015, 2020, 2025].map((yr) => (
            <span key={yr} className={`absolute text-[10px] font-bold tabular-nums ${yr === 2025 ? 'hidden sm:inline' : ''}`} style={{ left: `${((yr - TL_START) / span) * 100}%`, color: 'oklch(var(--foreground-400))', transform: yr === TL_START ? 'none' : 'translateX(-50%)' }}>{yr}</span>
          ))}
          <span className="absolute right-0 text-[10px] font-bold" style={{ color: 'oklch(var(--foreground-400))' }}>heute</span>
        </div>
      </div>

      {/* ── Desktop: comparison table ── */}
      <div className="hidden md:block" role="table" aria-label={d.heading}>
        {/* Header row: the three brands */}
        <div role="row" className="grid grid-cols-[minmax(150px,1.1fr)_repeat(3,minmax(0,2fr))] gap-2">
          <div role="columnheader" />
          {d.mandates.map((m, i) => {
            const live = i === d.mandates.length - 1;
            return (
              <div key={i} role="columnheader" className="relative p-6 lg:p-7 flex flex-col gap-3" style={{ background: INK }}>
                <span className="absolute top-0 left-0 right-0 h-1" style={{ background: live ? LIME : 'oklch(var(--primary-500) / 0.4)' }} aria-hidden="true" />
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: LIME }}>Marke {String(i + 1).padStart(2, '0')}</span>
                  <span
                    className="text-[9px] font-black uppercase tracking-[0.16em] px-2 py-0.5"
                    style={live ? { background: LIME, color: INK } : { border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="font-black text-white leading-tight" style={{ fontSize: 'clamp(18px,1.7vw,22px)', letterSpacing: '-0.02em' }}>{m.client}</p>
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/50 tabular-nums">{m.period}</p>
                <p className="text-[13px] leading-[1.55] text-white/75">{m.tagline}</p>
              </div>
            );
          })}
        </div>

        {/* Rows: one question, three answers */}
        {d.rows.map((r, ri) => (
          <div key={ri} role="row" className="grid grid-cols-[minmax(150px,1.1fr)_repeat(3,minmax(0,2fr))] gap-2" style={{ borderBottom: RULE }}>
            <div role="rowheader" className="py-5 pr-4 flex items-start">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground-950 pt-1">{r.label}</span>
            </div>
            {r.values.map((v, mi) => (
              <div key={mi} role="cell" className="py-5 px-6 lg:px-7">
                <Cell value={v} isTags={r.isTags} isText={isTextRow(ri)} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── Mobile: pick a brand, same rows ── */}
      <div className="md:hidden">
        <div className="grid grid-cols-3 gap-1.5 mb-2" role="tablist" aria-label="Marke auswählen">
          {d.mandates.map((m, i) => {
            const on = i === mobileIdx;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setMobileIdx(i)}
                className="py-3 px-2 text-left"
                style={{ background: on ? INK : 'transparent', border: on ? `1px solid ${INK}` : RULE }}
              >
                <span className="block text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: on ? LIME : 'oklch(var(--foreground-500))' }}>Marke {String(i + 1).padStart(2, '0')}</span>
                <span className={`block mt-1 text-[11px] font-black leading-tight ${on ? 'text-white' : 'text-foreground-950'}`}>{m.period}</span>
              </button>
            );
          })}
        </div>
        {(() => {
          const m = d.mandates[mobileIdx];
          return (
            <div role="tabpanel">
              <div className="p-5 flex flex-col gap-2" style={{ background: INK }}>
                <span className="text-[9px] font-black uppercase tracking-[0.16em] self-start px-2 py-0.5" style={mobileIdx === d.mandates.length - 1 ? { background: LIME, color: INK } : { border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}>{m.status}</span>
                <p className="font-black text-white text-[20px] leading-tight">{m.client}</p>
                <p className="text-[13px] leading-[1.55] text-white/75">{m.tagline}</p>
              </div>
              {d.rows.map((r, ri) => (
                <div key={ri} className="py-4" style={{ borderBottom: RULE }}>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground-950 mb-2">{r.label}</p>
                  <Cell value={r.values[mobileIdx]} isTags={r.isTags} isText={isTextRow(ri)} />
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      <p className="text-[12px] mt-4 leading-relaxed" style={{ color: 'oklch(var(--foreground-500))' }}>{d.note}</p>
    </div>
  );
}
