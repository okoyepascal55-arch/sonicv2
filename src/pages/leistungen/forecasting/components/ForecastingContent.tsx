import { useState } from 'react';
import LimeBadge from '@/components/base/LimeBadge';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import ScrollCardSection from '@/components/feature/ScrollCardSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const FORECASTING_CHALLENGES: ChallengeItem[] = [
  {
    icon: 'ri-question-mark',
    title: 'ROI unsicher — Budget ins Unbekannte',
    desc: 'Budget fließt in Einsätze, ohne zu wissen was dabei rauskommt. Quartalsberichte kommen zu spät. Wer ohne Prognose startet, kennt seinen ROI erst rückwirkend.',
    trigger: 'Kommt dir bekannt vor?',
  },
  {
    icon: 'ri-database-2-line',
    title: 'Datensilos machen Prognosen unmöglich',
    desc: 'Sell-out-Daten liegen in verschiedenen Systemen, Excel-Sheets und Handelspartnern. Eine übergreifende Prognose ist manuell kaum möglich — und fehleranfällig.',
    trigger: 'Auch bei euch so?',
  },
  {
    icon: 'ri-pencil-line',
    title: 'Manuelle Planung auf Bauchgefühl',
    desc: 'Einsatzplanung auf Basis von Bauchgefühl und Erfahrung. Saisonalität, Standort-Performance und Wettbewerbsdynamik werden nicht systematisch berücksichtigt.',
    trigger: 'Klingt vertraut?',
  },
];

const SOLUTIONS = [
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20robot%20AI%20brain%20intelligence%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-robot-01&orientation=squarish', num: '01', accent: 'KI-Analyse', title: 'Prognosen auf Knopfdruck', desc: 'Das SRT analysiert historische Sell-out-Daten, Standort-Performance und Markttrends — und liefert eine belastbare Prognose, bevor du unterschreibst.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20map%20pin%20location%20marker%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-pin-02&orientation=squarish', num: '02', accent: 'Standort', title: 'Standort-Potenzialanalyse', desc: 'Welche Outlets versprechen den größten Hebel? Das Forecasting-Modul priorisiert Standorte nach erwartetem ROI — datenbasiert, nicht nach Bauchgefühl.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20calendar%20check%20date%20schedule%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-cal-03&orientation=squarish', num: '03', accent: 'Saisonalität', title: 'Saisonalität berücksichtigt', desc: 'Weihnachtsgeschäft, Back-to-School, Black Friday: Unser Forecasting-Modell berücksichtigt saisonale Muster aus über 1,35 Mio. dokumentierten Einsätzen.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20grouped%20scenarios%20analysis%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-chart-04&orientation=squarish', num: '04', accent: 'Szenarien', title: 'Szenarien & Sensitivitäten', desc: 'Best Case, Base Case, Worst Case. Du siehst, wie sich verschiedene Einsatz-Szenarien auf dein Ergebnis auswirken — und kannst fundiert entscheiden.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20dashboard%20speedometer%20gauge%20live%20tracking%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-dash-05&orientation=squarish', num: '05', accent: 'Live-Tracking', title: 'Live-Abgleich mit Ist-Daten', desc: 'Nach dem Go-live wird die Prognose laufend mit echten Einsatzdaten abgeglichen. Abweichungen werden sofort sichtbar — und können korrigiert werden.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20chain%20link%20integration%20connection%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-link-06&orientation=squarish', num: '06', accent: 'Integration', title: 'Integration in dein System', desc: 'Das SRT dockt an deine bestehende Business-Intelligence-Software an. Du bekommst Forecasting-Daten direkt in dein Dashboard — kein Systembruch.' },
];

const HOW_IT_WORKS = [
  { num: '01', title: 'Datenbasis aufbauen', desc: 'Wir analysieren deine historischen Sell-out-Daten, Standortinformationen und Marktparameter. Je mehr Daten, desto präziser die Prognose.', imgIndex: 0 },
  { num: '02', title: 'Modell kalibrieren', desc: 'Unser Forecasting-Modell wird auf dein Produkt, deine Kategorie und dein Retailer-Setup kalibriert. Benchmarks aus 1,35 Mio. Einsätzen fließen ein.', imgIndex: 1 },
  { num: '03', title: 'Prognose ausgeben', desc: 'Du erhältst eine transparente Prognose: Erwarteter Sell-out pro Standort, pro Zeitraum, pro Szenario. Mit Konfidenzintervall und Sensitivitätsanalyse.', imgIndex: 2 },
  { num: '04', title: 'Live abgleichen', desc: 'Nach Projektstart wird die Prognose täglich mit echten Einsatzdaten abgeglichen. Optimierungspotenziale werden sofort sichtbar.', imgIndex: 3 },
];

const FALLBACK_HOW_IMAGES = [
  'https://readdy.ai/api/search-image?query=professional%20data%20analyst%20reviewing%20sales%20data%20spreadsheets%20charts%20on%20large%20monitor%20screen%20modern%20office%20warm%20desk%20lighting%20business%20intelligence%20analytics%20clean%20minimalist%20workspace%20editorial%20photography&width=600&height=400&seq=forecast-how-01-v1&orientation=landscape',
  'https://readdy.ai/api/search-image?query=AI%20machine%20learning%20model%20calibration%20algorithm%20tuning%20data%20science%20dashboard%20with%20prediction%20graphs%20modern%20dark%20interface%20beautiful%20visualization%20warm%20ambient%20light%20professional%20tech%20workspace&width=600&height=400&seq=forecast-how-02-v1&orientation=landscape',
  'https://readdy.ai/api/search-image?query=detailed%20sales%20forecast%20report%20dashboard%20with%20charts%20confidence%20intervals%20scenario%20analysis%20beautiful%20modern%20data%20visualization%20on%20screen%20professional%20business%20presentation%20warm%20lighting%20clean%20minimalist%20design&width=600&height=400&seq=forecast-how-03-v1&orientation=landscape',
  'https://readdy.ai/api/search-image?query=real%20time%20live%20data%20comparison%20dashboard%20tracking%20actual%20versus%20predicted%20results%20side%20by%20side%20charts%20glowing%20green%20positive%20indicators%20modern%20business%20intelligence%20interface%20warm%20ambient%20lighting&width=600&height=400&seq=forecast-how-04-v1&orientation=landscape',
];

const FALLBACK_FORECASTING_SOLUTION_ICONS = [
  'https://readdy.ai/api/search-image?query=carved%20wooden%20robot%20AI%20brain%20intelligence%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-robot-01&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20map%20pin%20location%20marker%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-pin-02&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20calendar%20check%20date%20schedule%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-cal-03&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20bar%20chart%20grouped%20scenarios%20analysis%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-chart-04&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20dashboard%20speedometer%20gauge%20live%20tracking%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-dash-05&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20chain%20link%20integration%20connection%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-forecast-sol-link-06&orientation=squarish',
];

const STATS = [
  { value: '>1,35 Mio.', label: 'Einsätze als Datenbasis' },
  { value: '>8 Jahre', label: 'Historische Retail-Daten' },
  { value: '100 %', label: 'Transparenz via Dashboard' },
  { value: '±15 %', label: 'Durchschnittliche Prognosegenauigkeit' },
];

export default function ForecastingContent() {
  const tChallengeHeading = useText('leistungen_forecasting_content', 'forecasting-challenge-heading', 'Ohne Prognose fliegt ihr im Blindflug.');
  const tChallengeSub = useText('leistungen_forecasting_content', 'forecasting-challenge-sub', 'Zu viele Retail-Projekte starten ohne belastbare Planung.');
  const tSolutionHeading = useText('leistungen_forecasting_content', 'forecasting-solution-heading', 'FORECASTING. DATENBASIERT. BELASTBAR.');
  const tSolutionSub = useText('leistungen_forecasting_content', 'forecasting-solution-sub', 'Prognosen auf echten Daten — nicht auf Excel-Tabellen und Bauchgefühl.');
  const tHowHeading = useText('leistungen_forecasting_content', 'forecasting-how-heading', 'In 4 Schritten zur belastbaren Prognose');
  const tHowSub = useText('leistungen_forecasting_content', 'forecasting-how-sub', 'Unser Forecasting-Prozess: datenbasiert, transparent und direkt in dein Dashboard integriert.');
  const { images: processImages } = useMediaStore('leistungen_forecasting_process_images');
  const { images: solutionWoodIcons } = useMediaStore('leistungen_forecasting_solution_wood_icons');

  const getHowImg = (index: number) => {
    const item = processImages[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_HOW_IMAGES[index];
  };

  const getSolutionWoodIcon = (index: number) => {
    const item = solutionWoodIcons[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_FORECASTING_SOLUTION_ICONS[index];
  };

  return (
    <>
      <ChallengeSection
        badge="Das Problem"
        headline={tChallengeHeading}
        subline={tChallengeSub}
        challenges={FORECASTING_CHALLENGES}
      />

      <WoodenDivider />

      {/* ── Solution (horizontal scroll, light warm bg) ── */}
      <section id="loesung" className="bg-white py-14 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.018] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C8D400]/8 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#111]/8 border border-[#111]/15 px-4 py-1.5 mb-5">
                <i className="ri-check-double-line text-[#111] text-sm" />
                <span className="text-xs font-black text-[#111] uppercase tracking-widest">Die Sonic-Lösung</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111] leading-tight tracking-tight uppercase">
                {tSolutionHeading}
              </h2>
            </div>
            <p className="text-[#111]/45 text-sm leading-relaxed max-w-xs lg:text-right">{tSolutionSub}</p>
          </div>

          <ScrollCardSection data={SOLUTIONS.map((s, i) => ({ ...s, woodIcon: getSolutionWoodIcon(i) }))} label={`${SOLUTIONS.length} Features — scrollen`} theme="light" variant="wood" />
        </div>
      </section>

      {/* ── How it works — pictorial ── */}
      <section id="wie-es-funktioniert" className="bg-white py-14 md:py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <LimeBadge text="So funktioniert es" className="mb-5" />
            <h2 className="text-3xl lg:text-4xl font-black text-[#111] leading-tight uppercase">{tHowHeading}</h2>
            <p className="text-[#111]/45 text-sm mt-3 max-w-xl mx-auto">{tHowSub}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="group relative overflow-hidden border border-[#111]/10 bg-white hover:border-[#C8D400]/30 transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={getHowImg(i)}
                    alt={step.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    style={{ minHeight: '220px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#C8D400] text-[#111] w-10 h-10 flex items-center justify-center font-black text-lg">
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black text-[#111]/30 uppercase tracking-widest">Schritt {step.num}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#111] mb-3 uppercase">{step.title}</h3>
                  <p className="text-[#111]/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="bg-[#111] py-14 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-[#C8D400]/15 border border-[#C8D400]/15 overflow-hidden">
          {STATS.map((s, i) => (
            <div key={i} className="bg-[#111] p-5 md:p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#C8D400]/0 group-hover:bg-[#C8D400]/5 transition-colors duration-300" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C8D400] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-3xl lg:text-4xl font-black text-[#C8D400] mb-2 relative z-10">{s.value}</div>
              <div className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-wider leading-snug relative z-10">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}
