import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
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
          <div className="flex items-center gap-3 mb-5">
            <SectionBadge text="Die Lösung" variant="dark" />
            <span className="text-[10px] font-black text-foreground-300 uppercase tracking-widest">
              Seit 2008 · 15+ Versionen
            </span>
          </div>
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="sonic-h2 text-foreground-950">
              SRT: Die{' '}
              <span
                style={{
                  background: 'oklch(var(--primary-500) / 0.9)',
                  padding: '0.02em 0.16em',
                  boxDecorationBreak: 'clone',
                  WebkitBoxDecorationBreak: 'clone',
                }}
              >
                All-in-One
              </span>{' '}
              Software
            </h2>
            <p className="text-sm text-foreground-600 leading-relaxed lg:pb-1">
              Seit 2008 laufend weiterentwickelt, für maximalen Nutzwert. Seit 2024 mit KI-Features.
            </p>
          </div>
        </div>

        {/* Asymmetric bento — 6-col grid, hero spans 3 cols × 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {FEATURES_BASE.map((feat, idx) => {
            const isHovered = hoveredIdx === idx;
            const isHero = idx === 0;
            const lgSpan = isHero ? 'lg:col-span-3 lg:row-span-2' : idx <= 2 ? 'lg:col-span-3' : 'lg:col-span-2';
            return (
              <div
                key={idx}
                className={`group bg-white cursor-default relative overflow-hidden transition-all duration-300 sm:col-span-2 ${lgSpan}`}
                style={{
                  border: isHovered ? '2px solid oklch(var(--primary-500) / 0.4)' : '2px solid oklch(var(--background-200) / 0.5)',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Subtle lime top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300"
                  style={{ background: isHovered ? 'oklch(var(--primary-500))' : 'transparent' }} />

                <div className={isHero ? 'p-6 lg:p-8 flex flex-col h-full' : 'p-5'}>
                  {/* Icon + title row */}
                  <div className={`flex items-center gap-3 ${isHero ? 'mb-4' : 'mb-3'}`}>
                    <div className={`overflow-hidden flex-shrink-0 border border-background-200/50 ${isHero ? 'w-16 h-16' : 'w-10 h-10'}`}>
                      <img
                        src={(featureIcons && featureIcons[idx] && featureIcons[idx].url) || feat.woodIcon}
                        alt={feat.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className={isHero ? 'sonic-h2 text-foreground-950 leading-snug' : 'sonic-h3 text-foreground-950 leading-snug'}>{feat.title}</h3>
                      <span className="text-[9px] font-bold text-primary-500 uppercase tracking-widest">{feat.number} / 06</span>
                    </div>
                  </div>
                  <p className={`text-foreground-600 leading-relaxed mb-3 ${isHero ? 'text-sm max-w-md' : 'text-xs'}`}>{feat.description}</p>
                  <div className={`flex flex-wrap gap-1 ${isHero ? 'mt-auto' : ''}`}>
                    {feat.tags.map((tag, ti) => (
                      <span key={ti} className="text-[9px] font-bold px-2 py-0.5 uppercase tracking-wide text-primary-500 bg-primary-500/8 border border-primary-500/15">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
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