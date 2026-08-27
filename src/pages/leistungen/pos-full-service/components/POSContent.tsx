import { useState } from 'react';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const POS_CHALLENGES: ChallengeItem[] = [
  {
    icon: 'ri-links-line',
    trigger: 'Zu viele Ansprechpartner?',
    woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20chain%20link%20connection%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20chain%20links%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-chain-pos-challenge-1&orientation=squarish',
    title: 'Reibungsverluste durch zu viele Anbieter',
    desc: 'Wenn Design, Druck, Ladenbau, Logistik, Personal etc. von verschiedenen Anbietern kommen, steigt der interne Aufwand erheblich.',
  },
  {
    icon: 'ri-alert-line',
    trigger: 'Schon passiert?',
    title: 'Teure Überraschungen im Rollout',
    desc: 'Manches POS-Material sieht in der Präsentation super aus, ist aber bspw. teuer in der Produktion oder in zu wenigen Outlets einsetzbar.',
  },
  {
    icon: 'ri-tools-line',
    trigger: 'Klingt vertraut?',
    title: 'Pflegeaufwand ohne Ende',
    desc: 'Der POS-Auftritt muss gepflegt werden. Das gelingt in den Outlets nur mit bestens geschulten und motivierten Mitarbeitern.',
  },
];

const SOLUTIONS = [
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20display%20stand%20retail%20shelf%20layout%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-display-pos-sol-1&orientation=squarish', num: '01', accent: 'Kreation & Print', title: 'POS-Materialien', desc: 'Möbel, Displays, Aufsteller, Regalstopper, Wobbler, Plakate, Flyer, Beklebungen, Gebäudebanner uvm.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20person%20star%20talent%20team%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-person-pos-sol-2&orientation=squarish', num: '02', accent: 'Team & Talent', title: 'Geschultes Personal', desc: 'Professionelle Promoter für Produktvorführungen, Verkaufsunterstützung, Sales-Außendienst und Regalpflege.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20map%20location%20pin%20area%20management%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-map-pos-sol-3&orientation=squarish', num: '03', accent: 'Flächenmanagement', title: 'Flächenmanagement', desc: 'Optimale Platzierung deiner Produkte im Handel, dauerhaft. Zweitplatzierungen, Warenpräsentation, Regalpflege.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20dashboard%20analytics%20chart%20performance%20tracking%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-dash-pos-sol-4&orientation=squarish', num: '04', accent: 'Analytics & SRT', title: 'Performance-Tracking', desc: 'Detaillierte Auswertung von Verkaufszahlen und ROI deiner POS-Aktivitäten. Tagesaktuell im Sonic Reporting Tool (SRT).' },
];

const ASSETS = [
  {
    category: 'Gedrucktes & Gebautes',
    icon: 'ri-printer-line',
    items: ['POS-Design und Kampagnenadaption', 'Aufsteller, Plakate, Flyer, Beklebungen, Gebäudebanner', 'Standequipment und Promotion-Tools', 'Produktion, Aufbau, Logistik und Lager'],
    imageStartIndex: 0,
  },
  {
    category: 'E-Commerce Marketing',
    icon: 'ri-shopping-bag-line',
    items: ['Shop-Optimierung, inkl. Web-Design', 'PDPs, A+ Content', 'Performance-Marketing, inkl. Ads, Media und Newslettern', 'Social Commerce, inkl. Community Management'],
    imageStartIndex: 4,
  },
  {
    category: 'Möbelsysteme & Shop-in-Shop',
    icon: 'ri-building-4-line',
    items: ['Architektur, Design, Technik und Warensicherung', 'Möbel, Regale, Shop-in-Shop-Systeme, Roadshow-Module', 'Interaktive Displaykonzepte', 'Produktion, Warehousing, Aufbau, Ausstattung, Pflege'],
    imageStartIndex: 8,
  },
  {
    category: 'Give-aways',
    icon: 'ri-gift-line',
    items: ['Hochwertige Werbeartikel', 'Kosteneffiziente Streuartikel', 'Merchandise'],
    imageStartIndex: 16,
  },
];

const FALLBACK_ASSETS = [
  'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO02.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/10.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/2a.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/LVP_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/03/TPV.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/2b.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/2f.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/11/NEXARO01.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/01/10-1.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/01/9-1-1024x510.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/01/12.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/LVP_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/5-1-1024x576.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/01/2-1-1024x706.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/03/shower.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/03/OPPOX5Pro_unboxing.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/2e.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/1_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/01/4.jpg',
];

const STEPS = [
  { num: '01', icon: 'ri-search-line', title: 'Bedarfsanalyse', desc: 'Wir analysieren Marke, Produkte, Zielgruppen und POS-Anforderungen.', time: '1–2 Tage', imgIndex: 0 },
  { num: '02', icon: 'ri-lightbulb-line', title: 'Konzeptentwicklung', desc: 'Kreative POS-Lösungen und Materialien für maximale Aufmerksamkeit: Kampagnenkreation oder -adaption, Design, Materialauswahl.', time: '1–4 Wochen', imgIndex: 1 },
  { num: '03', icon: 'ri-hammer-line', title: 'Produktion', desc: 'Herstellung aller POS-Materialien in der passenden Qualität: Print, Displays, Möbelsysteme.', time: '1–4 Wochen', imgIndex: 2 },
  { num: '04', icon: 'ri-user-add-line', title: 'Personal-Recruiting', desc: 'Auswahl und Schulung qualifizierter Promoter bzw. Sales Supporter für deine Kampagne.', time: '1–2 Wochen', imgIndex: 3 },
  { num: '05', icon: 'ri-truck-line', title: 'Rollout', desc: 'Koordinierte Auslieferung und Platzierung in allen Verkaufsstellen. Logistik über unser eigenes Warehouse.', time: '1–4 Wochen', imgIndex: 4 },
  { num: '06', icon: 'ri-bar-chart-box-line', title: 'Monitoring & Reporting', desc: 'Kontinuierliche Überwachung und detaillierte Performance-Auswertung. Im SRT, tagesaktuell.', time: 'Ongoing', imgIndex: 5 },
];

const FALLBACK_PROCESS = [
  'https://www.sonic-group.de/wp-content/uploads/2023/01/3.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/01/2.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/EVENT_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg',
];

export default function POSContent() {
  const tChallengeHeading = useText('leistungen_pos_content', 'pos-challenge-heading', 'POS-Qualität sichern ist aufwändig.');
  const tChallengeSub = useText('leistungen_pos_content', 'pos-challenge-sub', 'Warum es die Big Idea nicht immer bis ins Outlet schafft.');
  const tSolutionHeading = useText('leistungen_pos_content', 'pos-solution-heading', 'Dein POS-Komplettpaket.');
  const tSolutionSub = useText('leistungen_pos_content', 'pos-solution-sub', 'Von der Kreation bis zum letzten Handgriff übernehmen wir alle Leistungen.');
  const tAssetsHeading = useText('leistungen_pos_content', 'pos-assets-heading', 'POS-Materialien & Branding');
  const tAssetsSub = useText('leistungen_pos_content', 'pos-assets-sub', 'Wir setzen deine Vorstellung vom idealen POS-Auftritt um.');
  const tProcessHeading = useText('leistungen_pos_content', 'pos-process-heading', 'So arbeiten wir');
  const tProcessSub = useText('leistungen_pos_content', 'pos-process-sub', 'Von der Planung bis zur Umsetzung: professionell und effizient.');
  const { images: assetsImages } = useMediaStore('leistungen_pos_assets_images');
  const { images: processImages } = useMediaStore('leistungen_pos_process_images');
  const { images: solutionWoodIcons } = useMediaStore('leistungen_pos_solution_wood_icons');
  const [activeAsset, setActiveAsset] = useState(0);
  const [activeAssetImg, setActiveAssetImg] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const getAssetImg = (index: number) => {
    const item = assetsImages[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_ASSETS[index];
  };

  const getProcessImg = (index: number) => {
    const item = processImages[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_PROCESS[index];
  };

  const getSolutionWoodIcon = (index: number) => {
    const item = solutionWoodIcons[index];
    return item?.url ? resolveImageUrl(item.url) : item?.url || '';
  };

  // Build resolved asset category images
  const resolvedAssetCategories = ASSETS.map((cat) => ({
    ...cat,
    images: [0, 1, 2, 3].map((offset) => getAssetImg(cat.imageStartIndex + offset)),
  }));

  const handleAssetChange = (idx: number) => {
    setActiveAsset(idx);
    setActiveAssetImg(0);
  };

  return (
    <>
      <ChallengeSection
        headline={tChallengeHeading}
        subline={tChallengeSub}
        challenges={POS_CHALLENGES}
      />

      <WoodenDivider />

      {/* Solution */}
      <section id="loesung" className="sonic-section-lg bg-white px-4 md:px-6 relative overflow-hidden">
        <div className="relative sonic-container">
          <div className="mb-10 md:mb-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Die Lösung</span>
            </div>
            <h2 className="leist-h2 text-foreground-950">{tSolutionHeading}</h2>
            <p className="text-foreground-950/55 text-sm md:text-base max-w-2xl mx-auto">{tSolutionSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((s, i) => (
              <div
                key={s.num}
                className="relative overflow-hidden p-6"
                style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.09)' }}
              >
                <div
                  className="absolute bottom-3 right-4 font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: '4.5rem', color: 'rgba(0,0,0,0.04)', lineHeight: 1 }}
                >
                  {s.num}
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 overflow-hidden mb-4 flex-shrink-0" style={{ border: '1px solid rgba(0,0,0,0.09)' }}>
                    <img src={getSolutionWoodIcon(i)} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary-600">{s.accent}</span>
                  <h3 className="text-base font-black text-foreground-950 uppercase mt-1 mb-2 leading-snug">{s.title}</h3>
                  <p className="text-sm text-foreground-950/55 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assets with scrollable images */}
      <WoodenDivider />

      <section id="beispiele" className="sonic-section-lg bg-foreground-950 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(200,212,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="sonic-container relative">
          <div className="mb-10 md:mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Alle Assets</span>
            </div>
            <h2 className="leist-h2 text-white">{tAssetsHeading}</h2>
            <p className="text-white/40 text-sm mt-3">{tAssetsSub}</p>
          </div>

          {/* Category tabs — scrollable on mobile */}
          <div className="flex gap-0 border border-white/10 mb-0 overflow-x-auto">
            {ASSETS.map((a, i) => (
              <button
                key={i}
                onClick={() => handleAssetChange(i)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 cursor-pointer border-r border-white/10 last:border-r-0 flex-shrink-0 ${
                  activeAsset === i ? 'bg-primary-500 text-foreground-950' : 'bg-transparent text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`${a.icon} text-sm`}></i>
                <span className="hidden sm:inline">{a.category}</span>
              </button>
            ))}
          </div>

          <div key={activeAsset} className="border border-white/10 border-t-0" style={{ animation: 'fadeSlideIn 0.35s ease-out' }}>
            {/* Image strip — 2 cols on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-2 md:grid-cols-4 border-b border-white/10">
              {resolvedAssetCategories[activeAsset].images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAssetImg(i)}
                  className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${activeAssetImg === i ? 'ring-2 ring-inset ring-[#C8D400]' : 'opacity-50 hover:opacity-80'}`}
                  style={{ minHeight: '90px' }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-top" loading="lazy" decoding="async" style={{ minHeight: '90px' }} />
                  <div className="absolute inset-0 bg-black/30" />
                  {activeAssetImg === i && (
                    <div className="absolute bottom-2 right-2 w-4 h-4 flex items-center justify-center bg-primary-500">
                      <i className="ri-check-line text-foreground-950 text-xs"></i>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Main image + items — stacks on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative overflow-hidden lg:h-[300px] h-[220px]">
                <img
                  key={activeAssetImg}
                  src={resolvedAssetCategories[activeAsset].images[activeAssetImg]}
                  alt={resolvedAssetCategories[activeAsset].category}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  style={{ animation: 'fadeSlideIn 0.3s ease-out' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-2 py-1">{resolvedAssetCategories[activeAsset].category}</span>
                </div>
              </div>
              <div className="lg:col-span-5 bg-[#161616] p-5 md:p-8 border-t lg:border-t-0 lg:border-l border-white/10 lg:h-[300px] overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 flex items-center justify-center bg-primary-500/15 border border-primary-500/30">
                    <i className={`${resolvedAssetCategories[activeAsset].icon} text-base text-primary-500`}></i>
                  </div>
                  <h3 className="text-base font-black text-white uppercase">{resolvedAssetCategories[activeAsset].category}</h3>
                </div>
                <div className="space-y-2.5">
                  {resolvedAssetCategories[activeAsset].items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 flex items-center justify-center bg-primary-500 flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-foreground-950 text-xs"></i>
                      </div>
                      <span className="text-white/55 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process with images */}
      <section id="arbeitsweise" className="sonic-section-lg bg-foreground-950 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(200,212,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative sonic-container">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Ablauf</span>
            </div>
            <h2 className="leist-h2 text-white">{tProcessHeading}</h2>
            <p className="text-white/40 text-sm mt-3">{tProcessSub}</p>
          </div>

          {/* Connected Timeline */}
          <div className="relative mb-10 md:mb-14">
            {/* Desktop: full circle timeline */}
            <div className="hidden md:block">
              <div className="absolute top-[28px] left-[8.33%] right-[8.33%] h-px bg-white/10" />
              <div className="absolute top-[28px] left-[8.33%] h-px bg-primary-500 transition-all duration-700 ease-out" style={{ width: `${(activeStep / (STEPS.length - 1)) * 83.33}%` }} />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {STEPS.map((step, i) => (
                  <button key={i} onClick={() => setActiveStep(i)} className="flex flex-col items-center cursor-pointer group">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${activeStep === i ? 'bg-primary-500 border-primary-500 text-foreground-950' : activeStep > i ? 'bg-primary-500/15 border-primary-500/40 text-primary-500' : 'bg-foreground-950 border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white/60'}`}>
                      <i className={`${step.icon} text-xl`} />
                    </div>
                    <span className={`mt-3 text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeStep === i ? 'text-primary-500' : 'text-white/30'}`}>{step.num}</span>
                    <span className={`text-[11px] font-bold text-center leading-tight mt-0.5 transition-all duration-300 ${activeStep === i ? 'text-white/70' : 'text-white/25'}`}>{step.title}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Mobile: horizontal scroll pill tabs */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {STEPS.map((step, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 border transition-all duration-300 cursor-pointer ${activeStep === i ? 'bg-primary-500 border-primary-500 text-foreground-950' : 'bg-foreground-950 border-white/20 text-white/50'}`}>
                  <i className={`${step.icon} text-base`} />
                  <span className="text-[9px] font-black uppercase tracking-wide whitespace-nowrap">{step.num}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Card */}
          <div key={activeStep} className="border border-white/10 bg-[#161616] overflow-hidden" style={{ animation: 'fadeSlideIn 0.4s ease-out' }}>
            <div className="grid md:grid-cols-12 gap-0">
              {/* Left: Step Image */}
              <div className="md:col-span-5 relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10 min-h-[240px] md:min-h-[380px]">
                <img
                  src={getProcessImg(activeStep)}
                  alt={STEPS[activeStep].title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">Schritt {STEPS[activeStep].num}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <button key={i} onClick={() => setActiveStep(i)} className={`h-1 transition-all duration-300 cursor-pointer ${activeStep === i ? 'w-8 bg-primary-500' : 'w-3 bg-white/40'}`} />
                  ))}
                </div>
              </div>

              {/* Right: Content */}
              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center min-h-[240px] md:min-h-[380px]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-primary-500 text-xs font-black uppercase tracking-widest">Schritt {STEPS[activeStep].num}</span>
                  <span className="px-3 py-1.5 bg-primary-500 text-foreground-950 text-xs font-black">{STEPS[activeStep].time}</span>
                </div>
                <h3 className="sonic-h3 text-white mb-4">{STEPS[activeStep].title}</h3>
                <p className="text-white/55 text-sm md:text-base leading-relaxed">{STEPS[activeStep].desc}</p>

                {/* Navigation */}
                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="w-11 h-11 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <i className="ri-arrow-left-line text-lg" />
                  </button>
                  <div className="flex gap-2">
                    {STEPS.map((_, i) => (
                      <button key={i} onClick={() => setActiveStep(i)} className={`h-2 rounded-none transition-all duration-300 cursor-pointer ${activeStep === i ? 'w-8 bg-primary-500' : 'w-2 bg-white/20 hover:bg-white/35'}`} />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveStep(Math.min(STEPS.length - 1, activeStep + 1))}
                    disabled={activeStep === STEPS.length - 1}
                    className="w-11 h-11 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <i className="ri-arrow-right-line text-lg" />
                  </button>
                  <span className="text-white/25 text-xs font-bold ml-2">{activeStep + 1} / {STEPS.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
