import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import WoodenButton from '@/components/base/WoodenButton';

const caseStudies = [
  {
    id: 'garmin',
    brand: 'Garmin',
    campaignType: 'Retail Activation & POS Full-Service',
    headline: 'Sportlich nach vorn',
    subline: '#beatyesterday: Seit 2021 — Retail-Partnerschaft im DACH-Raum',
    metric: '+116%',
    metricLabel: 'Umsatzwachstum 2021–2024',
    since: '2021',
    tag: 'POS Full-Service',
    modules: '5 Module',
    images: [
      '/images/Case Studies -Fallbsp/Garmin/210330_Banner_Kacheln_310x150px_Seite_13_Reporting (1).webp',
      '/images/Case Studies -Fallbsp/Garmin/210330_Banner_Kacheln_310x150px_Seite_13_Reporting.webp',
      '/images/Case Studies -Fallbsp/Garmin/5243_190035993.webp',
      '/images/Case Studies -Fallbsp/Garmin/5243_190036664.webp',
      '/images/Case Studies -Fallbsp/Garmin/5279_10060291 (1).webp',
      '/images/Case Studies -Fallbsp/Garmin/5279_10060291.webp',
      '/images/Case Studies -Fallbsp/Garmin/5315_195525779.webp',
      '/images/Case Studies -Fallbsp/Garmin/5431_162510371 (1).webp',
      '/images/Case Studies -Fallbsp/Garmin/5431_162510371.webp',
      '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_1000_A26_Front.webp',
      '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_1000_B26_Front.webp',
      '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_CDU-Light_600_A26_Front.webp',
      '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_Unterschrank-Light_1000_A26_Front.webp',
      '/images/Case Studies -Fallbsp/Garmin/Garmin_POS_Unterschrank-Light_600_A26_Front.webp',
      '/images/Case Studies -Fallbsp/Garmin/MM Chemnitz_Rene G.webp',
      '/images/Case Studies -Fallbsp/Garmin/MM Hückelhoven_Chris L (1).webp',
      '/images/Case Studies -Fallbsp/Garmin/MM Hückelhoven_Chris L.webp',
      '/images/Case Studies -Fallbsp/Garmin/Saturn Frankfurt_Redouan B.webp',
      '/images/Case Studies -Fallbsp/Garmin/Tacx_Neu (1).webp',
      '/images/Case Studies -Fallbsp/Garmin/Tacx_Neu.webp'
    ],
  },
  {
    id: 'groupe-seb',
    brand: 'Groupe SEB',
    campaignType: 'Multi-Brand Field Force & Live-Video',
    headline: 'Partnerschaft mit Performance',
    subline: 'Tefal, Rowenta, Krups, WMF — Multi-Brand-Aktivierung seit 2019',
    metric: '+130%',
    metricLabel: 'Umsatzwachstum pro Einsatztag 2019–2024',
    since: '2019',
    tag: 'Multi-Brand',
    modules: '6 Module',
    images: [
      '/images/Case Studies -Fallbsp/SEB/20250604_205405_187.webp',
      '/images/Case Studies -Fallbsp/SEB/Außenansicht.webp',
      '/images/Case Studies -Fallbsp/SEB/Bild_NecafeDolceGusto.webp',
      '/images/Case Studies -Fallbsp/SEB/Gruppe Braun (37).webp',
      '/images/Case Studies -Fallbsp/SEB/Gruppe Gold (5).webp',
      '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (13).webp',
      '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (26).webp',
      '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (34).webp',
      '/images/Case Studies -Fallbsp/SEB/Komm-Zentrum (37).webp',
      '/images/Case Studies -Fallbsp/SEB/Optigrill Tisch.webp',
      '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam.webp',
      '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam1.webp',
      '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam12.webp',
      '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam2.webp',
      '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam4.webp',
      '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam5.webp',
      '/images/Case Studies -Fallbsp/SEB/Shooting_Miriam7.webp',
      '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2020-07-30 at 15.11.27.webp',
      '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2020-07-31 at 12.12.37 (2).webp',
      '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2020-07-31 at 12.12.39.webp',
      '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2024-02-22 at 11.50.47.webp',
      '/images/Case Studies -Fallbsp/SEB/WhatsApp Image 2026-03-03 at 13.11.27 (7).webp',
      '/images/Case Studies -Fallbsp/SEB/image10.webp',
      '/images/Case Studies -Fallbsp/SEB/image12.webp',
      '/images/Case Studies -Fallbsp/SEB/image16.webp',
      '/images/Case Studies -Fallbsp/SEB/image17.webp',
      '/images/Case Studies -Fallbsp/SEB/image7.webp'
    ],
  },
  {
    id: 'philips',
    brand: 'Philips',
    campaignType: 'Field Force, Training & Digital',
    headline: 'Erfolgreichster europäischer Markt',
    subline: 'End-to-End von Schulung über Field Force bis Digital — seit 2021',
    metric: '+54%',
    metricLabel: 'Absatzwachstum pro Einsatztag 2021–2024',
    since: '2021',
    tag: 'Field Force',
    modules: '6 Module',
    images: [
      '/images/Case Studies -Fallbsp/Philips/5589_23290336.webp',
      '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2 (1).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2 (2).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2 (3).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2 (4).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW4_SA_Möncke_2.webp',
      '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT (1).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT (2).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT (3).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT (4).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW6_MM_Dornbirn_AT.webp',
      '/images/Case Studies -Fallbsp/Philips/ALW6_Media Markt Ingolstadt - Eriagstr. 28 - 85046 Ingolstadt1 (1).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW6_Media Markt Ingolstadt - Eriagstr. 28 - 85046 Ingolstadt1 (2).webp',
      '/images/Case Studies -Fallbsp/Philips/ALW6_Media Markt Ingolstadt - Eriagstr. 28 - 85046 Ingolstadt1.webp',
      '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-30 at 15.11.27 (1).webp',
      '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-30 at 15.11.27.webp',
      '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-31 at 12.12.37 (2) (1).webp',
      '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-31 at 12.12.37 (2).webp',
      '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-31 at 12.12.39 (1).webp',
      '/images/Case Studies -Fallbsp/Philips/WhatsApp Image 2020-07-31 at 12.12.39.webp'
    ],
  },
  {
    id: 'avoury',
    brand: 'Avoury',
    campaignType: 'Field Force, Recruiting & Datenoptimierung',
    headline: 'Heißes Wachstum mit Tee',
    subline: 'Avoury One by Melitta — datenbasiertes Matching für maximalen Absatz',
    metric: '+1.187%',
    metricLabel: 'Umsatzwachstum pro Einsatztag 2021–2023',
    since: '2021',
    tag: 'Datenoptimierung',
    modules: '5 Module',
    images: [
      '/images/Case Studies -Fallbsp/Avoury/0c841385-a52b-4462-a08e-42922772ffa7.webp',
      '/images/Case Studies -Fallbsp/Avoury/2.webp',
      '/images/Case Studies -Fallbsp/Avoury/46a17f65-5760-48a1-9d54-6269a08b705f.webp',
      '/images/Case Studies -Fallbsp/Avoury/Banner_Skyscraper_2_160x600.webp',
      '/images/Case Studies -Fallbsp/Avoury/Banner_Skyscraper_3_160x600.webp',
      '/images/Case Studies -Fallbsp/Avoury/IMG-20230928-WA0000.webp',
      '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_01.webp',
      '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_05.webp',
      '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_07.webp',
      '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_08.webp',
      '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_02.webp',
      '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_06.webp',
      '/images/Case Studies -Fallbsp/Avoury/TEAGLOO_V4_MASSE_THEKE.webp',
      '/images/Case Studies -Fallbsp/Avoury/b111db44-a0cf-4eea-b5b7-5a0fd48e1762.webp',
      '/images/Case Studies -Fallbsp/Avoury/ce8dc1a9-9db2-48e8-bc91-de257f9c7da7.webp',
      '/images/Case Studies -Fallbsp/Avoury/d131a95d-592d-41a8-beb7-a893c1b2faa6.webp',
      '/images/Case Studies -Fallbsp/Avoury/d3b2ba5d-0462-4429-ad76-536f27b6a445.webp',
      '/images/Case Studies -Fallbsp/Avoury/f2d4262a-2c1b-4abd-b0a3-406901a73db0.webp'
    ],
  },
];

export default function CaseStudiesGrid() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="sonic-section-lg md:px-4 md:px-6 bg-foreground-950 relative overflow-hidden">
      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #C8D400 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="sonic-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionBadge text="Alle Fallbeispiele" variant="light" className="mb-6" />
          <h2 className="sonic-h2 text-white mb-4">
            ECHTE MARKEN.<br />
            <span className="text-primary-500">ECHTE ERGEBNISSE.</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Vier Partnerschaften. Messbare Wachstumskurven. Datenbasierte Optimierung — Jahr für Jahr.
          </p>
        </div>

        {/* Grid — bento-style asymmetric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseStudies.map((study, index) => {
            // Featured card (Garmin, index 0): spans 2 cols on lg
            const isFeature = index === 0;
            const colClass = isFeature ? 'lg:col-span-2' : '';
            const heightClass = isFeature ? 'min-h-[280px] sm:min-h-[380px] lg:min-h-[500px]' : 'min-h-[280px] md:min-h-[360px]';
            return (
            <div
              key={study.id}
              className={`relative overflow-hidden cursor-pointer group ${colClass} ${heightClass}`}
              style={{ borderRadius: 0 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Full-bleed photo */}
              <img
                src={study.images[0]}
                alt={study.brand}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ${hoveredCard === index ? 'scale-110' : 'scale-100'}`}
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/15" />

              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-primary-500/8 transition-opacity duration-500 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`} />

              {/* Bottom lime accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-primary-500 transition-all duration-500 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`} />
              <div className={`absolute top-0 left-0 bottom-0 w-0.5 bg-primary-500 transition-all duration-500 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`} />

              {/* Since badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="inline-flex items-center gap-2 bg-black/55 border border-white/[0.08] px-3 py-1.5 rounded-sm">
                  <span className="text-primary-500 font-black text-sm font-sans tabular-nums">{study.metric}</span>
                  <span className="text-white/60 text-[10px] font-bold truncate max-w-[120px]">{study.metricLabel}</span>
                </div>
              </div>

              {/* Tag chip */}
              <div className="absolute top-16 right-4 z-10">
                <span className="inline-block bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1" style={{ borderRadius: 0 }}>
                  {study.tag}
                </span>
              </div>

              {/* Logo + brand */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
                <div className="h-12 w-16 bg-white/12 flex items-center justify-center px-2 py-1.5" style={{ borderRadius: 0 }}>
                  <img
                    src={study.id === 'garmin' ? 'https://cdn.brandfetch.io/garmin.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' :
                         study.id === 'groupe-seb' ? 'https://cdn.brandfetch.io/groupeseb.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX' :
                         study.id === 'philips' ? 'https://cdn.brandfetch.io/idYAn8G7ED/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667913396887' :
                         'https://cdn.brandfetch.io/melitta.com/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX'}
                    alt={study.brand}
                    className="w-full h-full object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                    loading="lazy"
                  />
                </div>
                <span className="text-white font-black text-sm uppercase tracking-wide">{study.brand}</span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <h3 className="text-white font-black text-xl leading-tight mb-1">{study.headline}</h3>
                <p className={`text-white/55 text-xs font-bold uppercase tracking-wide mb-3 transition-all duration-400 ${hoveredCard === index ? 'opacity-100' : 'opacity-70'}`}>
                  {study.campaignType} · {study.modules}
                </p>
                <p className={`text-white/70 text-sm leading-relaxed mb-4 transition-all duration-500 ${hoveredCard === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  {study.subline}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/[0.04] backdrop-blur-[2px] border border-white/[0.06] px-4 py-2 rounded-sm">
                    <span className="text-primary-500 font-black text-lg font-sans tabular-nums">{study.metric}</span>
                    <span className="text-white/50 text-[10px] font-bold">seit {study.since}</span>
                  </div>
                  <div className={`w-8 h-8 flex items-center justify-center transition-all duration-300 ${hoveredCard === index ? 'bg-primary-500' : 'bg-white/[0.04] border border-white/[0.06] rounded-sm'}`}>
                    <i className="ri-arrow-right-line text-white text-sm"></i>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}