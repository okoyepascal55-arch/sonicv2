import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import type { MediaItem } from '@/lib/mediaStore';

interface FeaturesProps {
  featureIcons?: MediaItem[];
}

// Placeholder icon art — inline SVG gradient (works as <img src>) until a real wood icon is set via the dashboard.
const svgGradient = (hexA: string, hexB: string, size = 120) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hexA}"/><stop offset="1" stop-color="${hexB}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  )}`;

const FEATURES_BASE = [
  {
    number: '01',
    icon: 'ri-dashboard-line',
    woodIcon: svgGradient('#3a3320', '#17160f'),
    title: 'Echtzeit-Dashboard',
    description: 'Alle gewünschten Metriken auf einen Blick — live und übersichtlich dargestellt.',
    tags: ['Live-Daten', 'KPIs', 'Übersicht'],
  },
  {
    number: '02',
    icon: 'ri-bar-chart-grouped-line',
    woodIcon: svgGradient('#20323a', '#0f1517'),
    title: 'Performance-Tracking',
    description: 'Detaillierte Auswertung von Verkaufszahlen, Kampagnen-Performance und Top-/Flop-Listen.',
    tags: ['Verkaufszahlen', 'Rankings', 'Analyse'],
  },
  {
    number: '03',
    icon: 'ri-team-line',
    woodIcon: svgGradient('#2b3a20', '#12160e'),
    title: 'Team-Management',
    description: 'Zentrale Verwaltung von Recruiting, Einsätzen, Zielerreichung und Abrechnung. GPS-genau.',
    tags: ['HR App', 'Recruiting', 'GPS'],
  },
  {
    number: '04',
    icon: 'ri-file-chart-line',
    woodIcon: svgGradient('#302038', '#141118'),
    title: 'Reportings nach Wunsch',
    description: 'Automatisch generierte Berichte als Excel, PowerPoint oder SQL. Visualisiert und programmiert.',
    tags: ['Excel / PPT', 'SQL-Export', 'Custom'],
  },
  {
    number: '05',
    icon: 'ri-smartphone-line',
    woodIcon: svgGradient('#3a2820', '#17110e'),
    title: 'Mobile App',
    description: 'Zugriff auf alle Daten mit angepassten Ansichten. iOS & Android, offline-fähig.',
    tags: ['Mobile', 'Offline', 'iOS & Android'],
  },
  {
    number: '06',
    icon: 'ri-shield-check-line',
    woodIcon: svgGradient('#20383a', '#0e1617'),
    title: 'Datensicherheit',
    description: 'Höchste Sicherheitsstandards. End-to-End-Verschlüsselung, rollenbasierter Zugriff, Audit-Trails.',
    tags: ['Verschlüsselung', 'Rollenbasiert', 'DSGVO'],
  },
];

export default function Features({ featureIcons }: FeaturesProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="features" className="sonic-section-lg bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Compact header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5 md:mb-6 flex-wrap">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{"Die Lösung"}</span>
            <span className="text-[10px] font-black text-foreground-300 uppercase tracking-widest ml-auto">
              Seit 2008 · 15+ Versionen
            </span>
          </div>
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="leist-h2 text-foreground-950">
              SRT: Die <span className="text-primary-500">All-in-One</span> Software
            </h2>
            <p className="text-sm text-foreground-600 leading-relaxed lg:pb-1">
              Seit 2008 laufend weiterentwickelt, für maximalen Nutzwert. Seit 2024 mit KI-Features.
            </p>
          </div>
        </div>

        {/* Asymmetric bento — hero tile spans 3 cols × 2 rows, 5 smaller cards */}
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: 'auto auto',
            border: '1px solid oklch(0.885 0.004 110)',
          }}
        >
          {FEATURES_BASE.map((feat, idx) => {
            const isHero  = idx === 0;
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden transition-all duration-300 cursor-default"
                style={{
                  gridColumn: isHero ? 'span 3' : 'span 3',
                  gridRow:    isHero ? 'span 2' : 'span 1',
                  border: isHero
                    ? `2px solid ${isHovered ? 'oklch(0.81 0.19 115)' : 'oklch(0.81 0.19 115 / 0.35)'}`
                    : `1px solid oklch(0.885 0.004 110)`,
                  background: isHero ? 'oklch(0.13 0.005 118)' : '#fff',
                  minHeight: isHero ? '280px' : '160px',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Hero tile — large */}
                {isHero ? (
                  <div className="p-8 md:p-10 flex flex-col h-full justify-between">
                    <div>
                      <div className="w-12 h-12 overflow-hidden mb-6 border border-white/20">
                        <img
                          src={(featureIcons && featureIcons[idx]?.url) || feat.woodIcon}
                          alt={feat.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] mb-3" style={{ color: 'oklch(0.81 0.19 115)' }}>
                        {feat.number} / 06
                      </p>
                      <h3 className="leist-h2 text-white mb-4">{feat.title}</h3>
                      <p className="text-sm text-white/55 leading-relaxed max-w-xs">{feat.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-6">
                      {feat.tags.map((tag, ti) => (
                        <span key={ti} className="text-[9px] font-bold px-2.5 py-1 uppercase tracking-wide"
                          style={{ background: 'oklch(0.81 0.19 115 / 0.15)', color: 'oklch(0.81 0.19 115)', border: '1px solid oklch(0.81 0.19 115 / 0.3)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Smaller tiles */
                  <div className="p-5 flex flex-col h-full">
                    <div className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300"
                      style={{ background: isHovered ? 'oklch(0.81 0.19 115)' : 'transparent' }} />
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 overflow-hidden flex-shrink-0 border border-background-200/50">
                        <img
                          src={(featureIcons && featureIcons[idx]?.url) || feat.woodIcon}
                          alt={feat.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-foreground-950 leading-snug">{feat.title}</h3>
                        <span className="text-[9px] font-bold text-primary-500 uppercase tracking-widest">{feat.number} / 06</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-foreground-600 leading-relaxed flex-1">{feat.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {feat.tags.map((tag, ti) => (
                        <span key={ti} className="text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wide text-primary-500 bg-primary-500/8 border border-primary-500/15">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Slim CTA strip */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAFDF5] px-6 py-4 border border-background-200/50">
          <div>
            <p className="text-foreground-900 font-black text-xs mb-0.5">Noch Fragen zum Funktionsumfang?</p>
            <p className="text-foreground-500 text-[11px]">Wir zeigen dir das SRT live — kostenlos und unverbindlich.</p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Demo`}
            className="flex items-center gap-2 px-5 py-2.5 font-black text-foreground-950 text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap hover:scale-105 transition-all duration-300 group flex-shrink-0 bg-primary-500"
          >
            SRT Demo anfragen
            <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}