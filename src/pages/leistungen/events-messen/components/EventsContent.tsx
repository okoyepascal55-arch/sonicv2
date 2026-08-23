import { useState, useRef } from 'react';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import ScrollCardSection from '@/components/feature/ScrollCardSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const EVENTS_CHALLENGES: ChallengeItem[] = [
  {
    icon: 'ri-star-line',
    title: 'Zu wenig Unique — alles schon gesehen',
    desc: 'Die Zielgruppen haben schon viel gesehen und erlebt. Für einzigartige Erlebnisse müssen die Veranstaltungen auf allen Ebenen innovativ und perfekt sein.',
    trigger: 'Auch dein Problem?',
  },
  {
    icon: 'ri-tools-line',
    title: 'Zu viele Gewerke, zu viel Chaos',
    desc: 'Projektmanagement-Overhead, Inbox quillt über, alles wird erst auf den letzten Drücker fertig (oder auch nicht): Das passiert, ist aber vermeidbar.',
    trigger: 'Klingt bekannt?',
  },
  {
    icon: 'ri-bar-chart-line',
    title: 'Erfolge nicht messbar',
    desc: 'Daten zu bspw. Kosten und Erfolgen liegen verspätet bzw. unvollständig vor und können nicht optimal ausgewertet werden. Optimierungs-Möglichkeiten? Verborgen.',
    trigger: 'Frustrierend, oder?',
  },
];

const SOLUTIONS = [
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20lightbulb%20idea%20concept%20creative%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-bulb-events-sol-1&orientation=squarish', num: '01', accent: 'Kreation', title: 'Konzept', desc: 'Vor dem Wow steht die Idee: Einzigartige Erlebnisse erfordern kreative (Stand-)Gestaltung, Venues und Umsetzung für maximale Aufmerksamkeit.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20hammer%20construction%20build%20tool%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-hammer-events-sol-2&orientation=squarish', num: '02', accent: 'Bau & Technik', title: 'Bau & Equipment', desc: 'Die Ideen werden real: Mit Messe-, Möbel-, Modul- und Fahrzeugbau. Mit Bühnen, Displays, Installationen. Mit Licht, Sound, Screens und Interaktionen.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20person%20star%20talent%20team%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-person-events-sol-3&orientation=squarish', num: '03', accent: 'Team & Talent', title: 'Geschultes Personal', desc: 'Professionelle Promoter, Messe-Hostessen und Brand Ambassadors für deinen Event. Handverlesen aus unserem Talentepool, bestens geschult, top im Auftritt.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20fork%20knife%20dining%20restaurant%20catering%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-fork-events-sol-4&orientation=squarish', num: '04', accent: 'Erlebnis', title: 'Catering & Experiences', desc: 'Essen, Trinken, Kunst und immersive Erlebnisse: So wird die Veranstaltung zur High-Class-Show und bleibt lange im Gedächtnis.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20truck%20delivery%20logistics%20transport%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-truck-events-sol-5&orientation=squarish', num: '05', accent: 'Logistik', title: 'Logistik & Controlling', desc: 'Ort und Zeit stehen fest. Wir sind da. Alles läuft. Dank unserem eigenen Warehouse und Logistikteam. Und die Kosten? Siehst du im Sonic Reporting Tool (SRT).' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20megaphone%20announcement%20communication%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-mega-events-sol-6&orientation=squarish', num: '06', accent: 'Kommunikation', title: '(Digitale) Kommunikation', desc: 'Von der Einladung über Goodie-Bags und Give-aways bis zum Live-Stream: Deine Botschaften werden ankommen.' },
];

const STEPS = [
  { num: '01', icon: 'ri-search-line', title: 'Event-/Messe-Briefing', desc: 'Wir analysieren deine Ziele, Zielgruppe und Anforderungen, im Abgleich mit Gesamtstrategie, Budget und Zielen.', time: '1–2 Tage', imgIndex: 0 },
  { num: '02', icon: 'ri-lightbulb-line', title: 'Konzeptentwicklung', desc: 'Kreatives Event-/Stand-/Modulkonzept inklusive Venue, Aktivierungsideen und Umsetzungsmöglichkeiten.', time: '1–4 Wochen', imgIndex: 1 },
  { num: '03', icon: 'ri-user-add-line', title: 'Personal-Auswahl', desc: 'Auswahl und Schulung des perfekten Teams für deinen Event, meist aus dem Sonic Talentepool. Ggf. zusätzliches Recruiting.', time: '1–4 Wochen', imgIndex: 2 },
  { num: '04', icon: 'ri-hammer-line', title: 'Produktion & Vorbereitung', desc: 'Bookings, Modul-/Möbel-/Standbau, Druck, Programmierungen, Kommunikation, Logistik, Equipment-Check und finale Briefings vor Ort.', time: 'Nach Aufwand', imgIndex: 3 },
  { num: '05', icon: 'ri-calendar-event-line', title: 'Veranstaltung', desc: 'Professionelle Umsetzung mit Live-Support, Monitoring und Nachbereitung.', time: 'Event-Dauer', imgIndex: 4 },
  { num: '06', icon: 'ri-bar-chart-box-line', title: 'Reporting', desc: 'Detaillierte Auswertung mit KPIs, Insights und Optimierungsvorschlägen.', time: '3–5 Tage', imgIndex: 5 },
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

export default function EventsContent() {
  const tChallengeHeading = useText('leistungen_events_content', 'events-challenge-heading', 'Ein Moment, viele Baustellen.');
  const tChallengeSub = useText('leistungen_events_content', 'events-challenge-sub', 'Warum der Wow-Effekt bei Messen und Events nicht immer eintritt.');
  const tSolutionHeading = useText('leistungen_events_content', 'events-solution-heading', 'MESSE- UND EVENT-FULL SERVICE.');
  const tSolutionSub = useText('leistungen_events_content', 'events-solution-sub', 'Wir setzen alles daran, dass dein Messe- oder Event-Auftritt zur Erfolgsgeschichte wird.');
  const tProcessHeading = useText('leistungen_events_content', 'events-process-heading', 'So arbeiten wir');
  const tProcessSub = useText('leistungen_events_content', 'events-process-sub', 'Von der Planung bis zum Reporting: ideenreich, professionell und zuverlässig.');
  const tCtaBtn = useText('leistungen_events_content', 'events-cta-btn', 'Beratungsgespräch buchen');
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
        challenges={EVENTS_CHALLENGES}
      />

      <WoodenDivider />

      {/* ── Solution (horizontal scroll, light warm bg) ── */}
      <section id="loesung" className="bg-white py-14 md:py-20 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.018] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/8 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-foreground-950/8 border border-[#111]/15 px-4 py-1.5 mb-5">
                <i className="ri-check-double-line text-foreground-950 text-sm" />
                <span className="text-xs font-black text-foreground-950 uppercase tracking-widest">Die Lösung</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground-950 leading-none uppercase">
                {tSolutionHeading}
              </h2>
            </div>
            <p className="text-foreground-950/45 text-sm leading-relaxed max-w-xs">{tSolutionSub}</p>
          </div>

          <ScrollCardSection data={SOLUTIONS.map((s, i) => ({ ...s, woodIcon: getSolutionWoodIcon(i) }))} label={`${SOLUTIONS.length} Leistungen — scrollen`} theme="light" variant="wood" />
        </div>
      </section>

      {/* ── Process ── */}
      <section id="arbeitsweise" className="bg-foreground-950 py-14 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(200,212,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-500/4 blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-4 py-1.5 mb-5">
              <i className="ri-route-line text-primary-500 text-sm" />
              <span className="text-xs font-black text-primary-500 uppercase tracking-widest">Ablauf</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight uppercase">{tProcessHeading}</h2>
            <p className="text-white/40 text-sm mt-3">{tProcessSub}</p>
          </div>

          {/* Connected Timeline */}
          <div className="relative mb-10 md:mb-14">
            {/* Desktop: full circle timeline */}
            <div className="hidden md:block">
              <div className="absolute top-[28px] left-[8.33%] right-[8.33%] h-px bg-white/10" />
              <div className="absolute top-[28px] left-[8.33%] h-px bg-primary-500 transition-all duration-700 ease-out" style={{ width: `${(activeStep / (STEPS.length - 1)) * 83.33}%` }} />
              <div className="grid grid-cols-6 gap-2">
                {STEPS.map((step, i) => (
                  <button key={i} onClick={() => setActiveStep(i)} className="flex flex-col items-center cursor-pointer group">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${activeStep === i ? 'bg-primary-500 border-primary-500 text-foreground-950 shadow-[0_0_20px_rgba(200,212,0,0.3)]' : activeStep > i ? 'bg-primary-500/15 border-primary-500/40 text-primary-500' : 'bg-foreground-950 border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white/60'}`}>
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
                  src={getStepImg(activeStep)}
                  alt={STEPS[activeStep].title}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
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
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">{STEPS[activeStep].title}</h3>
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

          {/* Timeline bottom CTA */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 text-white/25 text-xs font-black uppercase tracking-widest mb-5">
              <div className="h-px w-10 bg-primary-500/20" />
              <span>Bereit für dein Event?</span>
              <div className="h-px w-10 bg-primary-500/20" />
            </div>
            <br />
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Events%20Messen%20Beratung`}
              className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 whitespace-nowrap cursor-pointer group"
            >
              {tCtaBtn}
              <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
