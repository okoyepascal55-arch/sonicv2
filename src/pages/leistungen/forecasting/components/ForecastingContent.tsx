import { useState } from 'react';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import ScrollCardSection from '@/components/feature/ScrollCardSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import { useLeistungenText } from '@/hooks/useLeistungenText';

const CHALLENGE_ICONS = ['ri-question-mark', 'ri-database-2-line', 'ri-pencil-line'];

const SOLUTION_NUMS = ['01', '02', '03', '04', '05', '06'];

const STEP_NUMS = ['01', '02', '03', '04'];

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

export default function ForecastingContent() {
 const tChallengeHeading = useText('leistungen_forecasting_content', 'forecasting-challenge-heading', 'Ohne Prognose bleibt nur das Bauchgefühl.');
 const tChallengeSub = useText('leistungen_forecasting_content', 'forecasting-challenge-sub', 'Zu viele Retail-Projekte starten ohne belastbare Planung.');
 const tSolutionHeading = useText('leistungen_forecasting_content', 'forecasting-solution-heading', 'Forecasting. Datenbasiert. Belastbar.');
 const tSolutionSub = useText('leistungen_forecasting_content', 'forecasting-solution-sub', 'Prognosen auf echten Einsatzdaten — nicht auf verstreuten Excel-Tabellen.');
 const tHowHeading = useText('leistungen_forecasting_content', 'forecasting-how-heading', 'In 4 Schritten zur belastbaren Prognose');
 const tHowSub = useText('leistungen_forecasting_content', 'forecasting-how-sub', 'Daten liefern die Fakten, Menschen den Unterschied. So entsteht deine Prognose — Schritt für Schritt, live im SRT einsehbar.');
 const tc = useLeistungenText('leistungen_forecasting_challenges');
 const ts = useLeistungenText('leistungen_forecasting_cards');
 const tw = useLeistungenText('leistungen_forecasting_steps');
 const challenges: ChallengeItem[] = CHALLENGE_ICONS.map((icon, i) => ({
 icon,
 title: tc[`c${i + 1}_title`],
 desc: tc[`c${i + 1}_desc`],
 trigger: tc[`c${i + 1}_trigger`],
 }));
 const solutions = SOLUTION_NUMS.map((num, i) => ({
 num,
 accent: ts[`s${i + 1}_accent`],
 title: ts[`s${i + 1}_title`],
 desc: ts[`s${i + 1}_desc`],
 }));
 const steps = STEP_NUMS.map((num, i) => ({
 num,
 title: tw[`st${i + 1}_title`],
 desc: tw[`st${i + 1}_desc`],
 }));
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
 badge={tc.badge}
 headline={tChallengeHeading}
 subline={tChallengeSub}
 challenges={challenges}
 />

 <WoodenDivider />

 {/* ── Solution (horizontal scroll, light warm bg) ── */}
 <section id="loesung" className="sonic-section-md bg-white px-4 md:px-6 relative overflow-hidden">
 <div className="absolute inset-0 opacity-[0.018] pointer-events-none"style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
 <div className="sonic-container relative">
 <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
 <div>
 <div className="flex items-center gap-3 mb-5">
 <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0"aria-hidden="true"/>
 <span className="text-[11px] font-black uppercase tracking-[0.24em]"style={{ color: 'oklch(0.55 0.08 115)' }}>{ts.eyebrow}</span>
 </div>
 <h2 className="sonic-h2 text-foreground-950">
 {tSolutionHeading}
 </h2>
 </div>
 <p className="text-foreground-950/45 text-sm leading-relaxed max-w-xs lg:text-right">{tSolutionSub}</p>
 </div>

 <ScrollCardSection data={solutions.map((s, i) => ({ ...s, woodIcon: getSolutionWoodIcon(i) }))} label={ts.scroll_label} theme="light"variant="wood"/>
 </div>
 </section>

 <WoodenDivider />

 {/* ── How it works — pictorial ── */}
 <section id="wie-es-funktioniert" className="sonic-section-md bg-white px-4 md:px-6">
 <div className="sonic-container">
 <div className="text-center mb-10 md:mb-14">
 <div className="flex items-center justify-center gap-3 mb-5">
 <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0"aria-hidden="true"/>
 <span className="text-[11px] font-black uppercase tracking-[0.24em]"style={{ color: 'oklch(0.55 0.08 115)' }}>{tw.eyebrow}</span>
 </div>
 <h2 className="sonic-h2 text-foreground-950">{tHowHeading}</h2>
 <p className="text-foreground-950/45 text-sm mt-3 max-w-xl mx-auto">{tHowSub}</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 {steps.map((step, i) => (
 <div key={i} className="group relative overflow-hidden border border-foreground-950/10 bg-white hover:border-primary-500/30 transition-all duration-300">
 {/* Image */}
 <div className="relative overflow-hidden"style={{ height: '220px' }}>
 <img
 src={getHowImg(i)}
 alt={step.title}
 className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
 loading="lazy"
 style={{ minHeight: 'clamp(160px, 22vw, 220px)' }}
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#111]/60 to-transparent"/>
 <div className="absolute top-4 left-4 bg-primary-500 text-foreground-950 w-10 h-10 flex items-center justify-center font-black text-lg">
 {step.num}
 </div>
 </div>

 {/* Content */}
 <div className="p-6">
 <div className="flex items-center gap-2 mb-3">
 <span className="text-[10px] font-black text-foreground-950/30 uppercase tracking-widest">{tw.step_label} {step.num}</span>
 </div>
 <h3 className="text-lg font-black text-foreground-950 leading-snug tracking-tight">{step.title}</h3>
 <p className="text-foreground-950/60 text-sm leading-relaxed">{step.desc}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>


  </>
 );
}
