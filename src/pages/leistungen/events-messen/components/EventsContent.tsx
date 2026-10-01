import { useState, type ReactNode } from 'react';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import ScrollCardSection from '@/components/feature/ScrollCardSection';
import { useText } from '@/hooks/useText';
import { useLeistungenText } from '@/hooks/useLeistungenText';

const CHALLENGE_ICONS = ['ri-star-line', 'ri-tools-line', 'ri-bar-chart-line'];

const SOLUTIONS = [
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20lightbulb%20idea%20concept%20creative%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-bulb-events-sol-1&orientation=squarish', num: '01', key: 'card1' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20hammer%20construction%20build%20tool%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-hammer-events-sol-2&orientation=squarish', num: '02', key: 'card2' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20person%20star%20talent%20team%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-person-events-sol-3&orientation=squarish', num: '03', key: 'card3' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20fork%20knife%20dining%20restaurant%20catering%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-fork-events-sol-4&orientation=squarish', num: '04', key: 'card4' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20truck%20delivery%20logistics%20transport%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-truck-events-sol-5&orientation=squarish', num: '05', key: 'card5' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20megaphone%20announcement%20communication%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-mega-events-sol-6&orientation=squarish', num: '06', key: 'card6' },
];

const STEPS = [
  { num: '01', icon: 'ri-search-line', key: 'step1', imgIndex: 0 },
  { num: '02', icon: 'ri-lightbulb-line', key: 'step2', imgIndex: 1 },
  { num: '03', icon: 'ri-user-add-line', key: 'step3', imgIndex: 2 },
  { num: '04', icon: 'ri-hammer-line', key: 'step4', imgIndex: 3 },
  { num: '05', icon: 'ri-calendar-event-line', key: 'step5', imgIndex: 4 },
  { num: '06', icon: 'ri-bar-chart-box-line', key: 'step6', imgIndex: 5 },
];

const FALLBACK_STEP_IMAGES = [
  'https://readdy.ai/api/search-image?query=professional%20business%20meeting%20briefing%20session%20two%20people%20discussing%20event%20planning%20documents%20on%20modern%20wooden%20desk%20warm%20lighting%20corporate%20office%20clean%20minimalist%20aesthetic%20editorial%20photography&width=320&height=240&seq=events-ablauf-01-v2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=creative%20concept%20development%20moodboard%20design%20sketches%20event%20planning%20colorful%20sticky%20notes%20inspiration%20board%20modern%20studio%20workspace%20warm%20ambient%20lighting%20artistic%20editorial%20photography&width=320&height=240&seq=events-ablauf-02-v2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=professional%20team%20staff%20selection%20interview%20hiring%20diverse%20group%20of%20people%20in%20modern%20office%20setting%20training%20session%20warm%20lighting%20corporate%20environment%20clean%20minimalist%20photography&width=320&height=240&seq=events-ablauf-03-v2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=event%20production%20preparation%20booth%20construction%20setup%20warehouse%20logistics%20workers%20assembling%20modular%20displays%20tools%20equipment%20modern%20industrial%20space%20warm%20lighting%20editorial%20documentary%20photography&width=320&height=240&seq=events-ablauf-04-v2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=successful%20trade%20show%20event%20exhibition%20booth%20crowd%20engagement%20brand%20activation%20live%20presentation%20professional%20staff%20interacting%20with%20visitors%20modern%20exhibition%20hall%20warm%20ambient%20lighting%20editorial%20style%20photography&width=320&height=240&seq=events-ablauf-05-v2&orientation=landscape',
  'https://readdy.ai/api/search-image?query=data%20analytics%20reporting%20dashboard%20on%20laptop%20screen%20charts%20graphs%20KPIs%20modern%20office%20workspace%20warm%20desk%20lighting%20professional%20business%20intelligence%20clean%20minimalist%20photography&width=320&height=240&seq=events-ablauf-06-v2&orientation=landscape',
];

const FALLBACK_EVENTS_SOLUTION_ICONS = [
  'https://readdy.ai/api/search-image?query=carved%20wooden%20lightbulb%20idea%20concept%20creative%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-bulb-events-sol-1&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20hammer%20construction%20build%20tool%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-hammer-events-sol-2&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20person%20star%20talent%20team%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-person-events-sol-3&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20fork%20knife%20dining%20restaurant%20catering%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-fork-events-sol-4&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20truck%20delivery%20logistics%20transport%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-truck-events-sol-5&orientation=squarish',
  'https://readdy.ai/api/search-image?query=carved%20wooden%20megaphone%20announcement%20communication%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-mega-events-sol-6&orientation=squarish',
];

interface EventsContentProps {
  /** Rendered right after the solution section (the Formate block). */
  afterSolution?: ReactNode;
}

export default function EventsContent({ afterSolution }: EventsContentProps = {}) {
  const tChallengeHeading = useText('leistungen_events_content', 'events-challenge-heading', 'Ein Moment, viele Baustellen.');
  const tChallengeSub = useText('leistungen_events_content', 'events-challenge-sub', 'Warum der Wow-Effekt bei Messen und Events nicht immer eintritt.');
  const tSolutionHeading = useText('leistungen_events_content', 'events-solution-heading', 'Messe- und Event-Full Service.');
  const tSolutionSub = useText('leistungen_events_content', 'events-solution-sub', 'Wir setzen alles daran, dass dein Messe- oder Event-Auftritt zur Erfolgsgeschichte wird.');
  const tProcessHeading = useText('leistungen_events_content', 'events-process-heading', 'So arbeiten wir');
  const tProcessSub = useText('leistungen_events_content', 'events-process-sub', 'Von der Planung bis zum Reporting: ideenreich, professionell und zuverlässig.');
  const tCh = useLeistungenText('leistungen_events_challenges');
  const tSol = useLeistungenText('leistungen_events_solutions');
  const tProc = useLeistungenText('leistungen_events_process');
  const challenges: ChallengeItem[] = CHALLENGE_ICONS.map((icon, i) => ({ icon, title: tCh[`c${i + 1}-title`], desc: tCh[`c${i + 1}-desc`], trigger: tCh[`c${i + 1}-trigger`] }));
  const solutions = SOLUTIONS.map((s) => ({ ...s, accent: tSol[`${s.key}-accent`], title: tSol[`${s.key}-title`], desc: tSol[`${s.key}-desc`] }));
  const steps = STEPS.map((st) => ({ ...st, title: tProc[`${st.key}-title`], desc: tProc[`${st.key}-desc`], time: tProc[`${st.key}-time`] }));
  const { images: processImages } = useMediaStore('leistungen_events_process_images');
  const { images: solutionWoodIcons } = useMediaStore('leistungen_events_solution_wood_icons');
  const [activeStep, setActiveStep] = useState(0);

  const getStepImg = (index: number) => {
    const item = processImages[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_STEP_IMAGES[index];
  };

  const getSolutionWoodIcon = (index: number) => {
    const item = solutionWoodIcons[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_EVENTS_SOLUTION_ICONS[index];
  };

  return (
    <>
      <ChallengeSection
        headline={tChallengeHeading}
        subline={tChallengeSub}
        challenges={challenges}
      />

      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      {/* ── Solution — shared wood scroll cards, same system as Staff / Forecasting / Live Video ── */}
      <section id="loesung" className="sonic-section-md bg-white px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.018] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="sonic-container relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tSol.eyebrow}</span>
              </div>
              <h2 className="sonic-h2 text-foreground-950 ">
                {tSolutionHeading}
              </h2>
            </div>
            <p className="text-foreground-950/45 text-sm leading-relaxed max-w-xs lg:text-right">{tSolutionSub}</p>
          </div>
          <ScrollCardSection data={solutions.map((s, i) => ({ ...s, woodIcon: getSolutionWoodIcon(i) }))} label={`${solutions.length} Leistungen — scrollen`} theme="light" variant="wood" />
        </div>
      </section>

      {afterSolution}

      {/* ── Process ── */}
      <WoodenDivider />

      <section id="arbeitsweise" className="sonic-section-md bg-foreground-950 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(200,212,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative sonic-container">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">{tProc.eyebrow}</span>
            </div>
            <h2 className="sonic-h2 text-white">{tProcessHeading}</h2>
            <p className="text-white/40 text-sm mt-3">{tProcessSub}</p>
          </div>

          {/* Connected Timeline */}
          <div className="relative mb-10 md:mb-14">
            {/* Desktop: full circle timeline */}
            <div className="hidden md:block">
              <div className="absolute top-[28px] left-[8.33%] right-[8.33%] h-px bg-white/10" />
              <div className="absolute top-[28px] left-[8.33%] h-px bg-primary-500 transition-all duration-700 ease-out" style={{ width: `${(activeStep / (steps.length - 1)) * 83.33}%` }} />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {steps.map((step, i) => (
                  <button key={i} onClick={() => setActiveStep(i)} className="flex flex-col items-center cursor-pointer group">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${activeStep === i ? 'bg-primary-500 border-primary-500 text-foreground-950' : activeStep > i ? 'bg-primary-500/15 border-primary-500/40 text-primary-500' : 'bg-foreground-950 border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white/60'}`}>
                      <i className={`${step.icon} text-xl`} aria-hidden="true" />
                    </div>
                    <span className={`mt-3 text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeStep === i ? 'text-primary-500' : 'text-white/30'}`}>{step.num}</span>
                    <span className={`text-[11px] font-bold text-center leading-tight mt-0.5 transition-all duration-300 ${activeStep === i ? 'text-white/70' : 'text-white/25'}`}>{step.title}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Mobile: horizontal scroll pill tabs */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {steps.map((step, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 border transition-all duration-300 cursor-pointer ${activeStep === i ? 'bg-primary-500 border-primary-500 text-foreground-950' : 'bg-foreground-950 border-white/20 text-white/50'}`}>
                  <i className={`${step.icon} text-base`} aria-hidden="true" />
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
                  src={getStepImg(activeStep)}
                  alt={steps[activeStep].title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">Schritt {steps[activeStep].num}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  {steps.map((_, i) => (
                    <button key={i} onClick={() => setActiveStep(i)} aria-label={`Schritt ${i + 1} von ${steps.length} anzeigen`} aria-current={activeStep === i ? 'step' : undefined} className={`h-1 transition-all duration-300 cursor-pointer ${activeStep === i ? 'w-8 bg-primary-500' : 'w-3 bg-white/40'}`} />
                  ))}
                </div>
              </div>

              {/* Right: Content */}
              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center min-h-[240px] md:min-h-[380px]">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-primary-500 text-xs font-black uppercase tracking-widest">Schritt {steps[activeStep].num}</span>
                  <span className="px-3 py-1.5 bg-primary-500 text-foreground-950 text-xs font-black">{steps[activeStep].time}</span>
                </div>
                <h3 className="sonic-h3 text-white mb-4">{steps[activeStep].title}</h3>
                <p className="text-white/55 text-sm md:text-base leading-relaxed">{steps[activeStep].desc}</p>

                {/* Navigation */}
                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    aria-label="Vorheriger Schritt"
                    disabled={activeStep === 0}
                    className="w-11 h-11 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <i className="ri-arrow-left-line text-lg" aria-hidden="true" />
                  </button>
                  <div className="flex gap-2">
                    {steps.map((_, i) => (
                      <button key={i} onClick={() => setActiveStep(i)} aria-label={`Schritt ${i + 1} von ${steps.length} anzeigen`} aria-current={activeStep === i ? 'step' : undefined} className={`h-2 rounded-none transition-all duration-300 cursor-pointer ${activeStep === i ? 'w-8 bg-primary-500' : 'w-2 bg-white/20 hover:bg-white/35'}`} />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    aria-label="Nächster Schritt"
                    disabled={activeStep === steps.length - 1}
                    className="w-11 h-11 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <i className="ri-arrow-right-line text-lg" aria-hidden="true" />
                  </button>
                  <span className="text-white/25 text-xs font-bold ml-2">{activeStep + 1} / {steps.length}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </>
  );
}
