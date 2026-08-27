import { useState } from 'react';
import ChallengeSection from '@/components/feature/ChallengeSection';
import type { ChallengeItem } from '@/components/feature/ChallengeSection';
import ScrollCardSection from '@/components/feature/ScrollCardSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

const STAFF_CHALLENGES: ChallengeItem[] = [
  {
    icon: 'ri-user-search-line',
    title: 'Spezielle Talente — schwer zu finden',
    desc: 'Motivierbare Fachkräfte, die Lust auf wechselnde Einsätze haben, sind über reguläres Recruiting bzw. Personaldienstleister schwer zu finden.',
    trigger: 'Auch deine Erfahrung?',
  },
  {
    icon: 'ri-money-euro-circle-line',
    title: 'Payroll? Ein Horror für die Buchhaltung',
    desc: 'Stundenlöhne, Provisionen, Pauschalen, Sozialversicherung: für jede Person jeden Monat anders. Das Grauen für die interne Lohnbuchhaltung.',
    trigger: 'Klingt vertraut?',
  },
  {
    icon: 'ri-bar-chart-2-line',
    title: 'Erfolge schwer messbar — Optimierung blind',
    desc: 'Reportings lassen sich oft erst weit im Nachhinein erstellen, da die Daten zu Einsätzen, Absatz und Lohn-Vollkosten erst mit Verzögerung vorliegen.',
    trigger: 'Schon frustriert?',
  },
];

const SOLUTIONS = [
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20magnifying%20glass%20search%20talent%20recruiting%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-search-staff-sol-1&orientation=squarish', num: '01', accent: 'HR & Sourcing', title: 'Recruiting', desc: 'Wir finden Talente in unserem Pool und on top über bewährte Recruiting-Strategien. Passend für deine Aufgaben. Mit digitalen Arbeitsverträgen. Null Arbeit für deine HR-Abteilung.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20graduation%20cap%20education%20training%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-grad-staff-sol-2&orientation=squarish', num: '02', accent: 'Training', title: 'Onboarding & Schulungen', desc: 'Aufs Onboarding sind wir spezialisiert: Wir haben (Sales) Trainer und kennen uns sehr gut mit Produkt- und Markenschulungen aus.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20calculator%20finance%20payroll%20accounting%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-calc-staff-sol-3&orientation=squarish', num: '03', accent: 'Finance & Admin', title: 'Payroll', desc: 'Wer bekommt wofür wie viel Geld, basierend auf bspw. Arbeitszeiten und Erfolgsfaktoren? Wir managen die Payroll komplett, basierend auf den Daten unseres Sonic Reporting Tools (SRT).' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20eye%20transparency%20visibility%20insight%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-eye-staff-sol-4&orientation=squarish', num: '04', accent: 'Transparenz', title: 'Kosten-Nutzen-Transparenz', desc: 'Du kannst jederzeit alle Daten, u.a. (Lohn-)Kosten einsehen und dir reporten lassen.' },
];

const STEPS = [
  { num: '01', icon: 'ri-search-line', title: 'Bedarfsanalyse', desc: 'Wir verstehen dein Geschäft, deine Produkte und deinen Personalbedarf. Welche Rollen, welche Skills und welchen Umfang brauchst du?', time: '1–2 Tage' },
  { num: '02', icon: 'ri-user-add-line', title: 'Recruiting & Auswahl', desc: 'Erst gezielte Suche im Talentepool, plus ggf. Neurekrutierung. Interviews, Assessments, finale Auswahl, Arbeitsverträge. Alles in Abstimmung mit dir.', time: 'Ab 5–10 Tage' },
  { num: '03', icon: 'ri-graduation-cap-line', title: 'Schulung & Onboarding', desc: 'Intensives Produkttraining, Marken-Briefing, Verkaufstechniken: Dein Team ist ab Tag 1 einsatzbereit.', time: '2–5 Tage' },
  { num: '04', icon: 'ri-route-line', title: 'Einsatz & Steuerung', desc: 'Koordinierte Einsatzplanung über das Sonic Reporting Tool (SRT). Dein Personal ist zur richtigen Zeit am richtigen Ort, und du hast darauf Live-Zugriff.', time: 'Ongoing' },
  { num: '05', icon: 'ri-line-chart-line', title: 'Performance & Optimierung', desc: 'Laufendes Monitoring, Coaching, Team-Rotation bei Bedarf. Wir optimieren, bis die Zahlen stimmen.', time: 'Ongoing' },
  { num: '06', icon: 'ri-file-list-line', title: 'Abrechnung', desc: 'Wir erstellen für dich übersichtliche Rechnungen, die deine Buchhaltungs- und Controlling-Prozesse vereinfachen.', time: 'Ongoing' },
];

const SPECIALIZATIONS = [
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20store%20retail%20shop%20building%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-store-staff-spec-1&orientation=squarish', num: '01', accent: 'POS & Retail', title: 'Sales Activation', desc: 'Sales-Profis, geschult auf zielgerichtete Beratung. Sie vermitteln Features, stärken deine Marktposition und machen aus Interessenten Käufer.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20briefcase%20business%20sales%20field%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-brief-staff-spec-2&orientation=squarish', num: '02', accent: 'B2B Vertrieb', title: 'Sales Außendienst', desc: 'Mit kundenexklusiven Vertriebsaußendienst-Mitarbeitern stellen wir den Erfolg auch im mehrstufigen Vertrieb sicher. Multifunktional einsetzbar.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20megaphone%20brand%20activation%20announcement%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-mega-staff-spec-3&orientation=squarish', num: '03', accent: 'Markenbildung', title: 'Brand Activation', desc: 'Brand-Activation-Mitarbeiter geben deiner Marke ein Gesicht. Als Verbindung zwischen Interessenten und Marke schaffen sie eine Vertrauensbasis.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20grid%20layout%20shelf%20merchandising%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-grid-staff-spec-4&orientation=squarish', num: '04', accent: 'Handel & Regal', title: 'Merchandising', desc: 'Perfekte Warenpräsentation am POS braucht fleißige Hände und Doing-Things-Mentalität. Ob 360-Grad-Außendienst oder spezialisierte Teams.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20building%20shop%20in%20shop%20outlet%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-build-staff-spec-5&orientation=squarish', num: '05', accent: 'Shop-in-Shop', title: 'Shop-in-Shop Staff', desc: 'Wir finden die passenden Menschen für Shop-in-Shop-Outlets: Beratung, Demos, Verkauf, Regalpflege und mehr. Mit Schichtsystem und Plan B.' },
  { woodIcon: 'https://readdy.ai/api/search-image?query=carved%20wooden%20presentation%20board%20training%20knowledge%20icon%20made%20from%20solid%20dark%20walnut%20wood%20three%20dimensional%20relief%20carving%20natural%20wood%20grain%20texture%20warm%20rich%20brown%20color%20simple%20minimalist%20symbol%20handcrafted%20artisan%20quality%20on%20clean%20white%20background%20top%20view%20product%20photography%20studio%20lighting&width=112&height=112&seq=wood-pres-staff-spec-6&orientation=squarish', num: '06', accent: 'Know-how', title: 'Training', desc: 'Regelmäßige Trainings stellen sicher, dass dein Team und die Teams deiner Handelspartner immer über aktuelles Know-how verfügen.' },
];

const SOCKS = [
  {
    letter: 'S', title: 'Selection',
    desc: 'Die Gewissheit, den besten Kanal, die beste Region, den besten Shop und den besten Tag gewählt zu haben, um die meisten Produkte mit dem höchsten ROI zu verkaufen.',
    imgIndex: 0,
  },
  {
    letter: 'O', title: 'Orientation',
    desc: 'Sicherstellen, dass der Besucher das gewünschte Produkt auf einfachste Weise im Shop findet oder auf das Produkt aufmerksam wird.',
    imgIndex: 1,
  },
  {
    letter: 'C', title: 'Condition',
    desc: 'Sicherstellen, dass das Produkt so dargestellt ist, dass es kaufenswert erscheint. Begehrlich.',
    imgIndex: 2,
  },
  {
    letter: 'K', title: 'Knowledge',
    desc: 'Sicherstellen, dass die Empfehler das Produkt mit all seinen Vorteilen kennen. Sie fühlen sich sicher, den Besucher nach seinen Bedürfnissen zu fragen.',
    imgIndex: 3,
  },
  {
    letter: 'S', title: 'Sellout',
    desc: 'Das einzig mögliche Ergebnis, wenn alle Schritte perfekt ausgeführt wurden: Der Empfehler wird zum Verkäufer, der Besucher zum Käufer.',
    imgIndex: 4,
  },
];

const FALLBACK_SOCKS = [
  'https://www.sonic-group.de/wp-content/uploads/2023/06/SRT_OPENER.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/06/6.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/4-1-1024x444.jpg',
  'https://www.sonic-group.de/wp-content/uploads/2023/02/6-1-1024x570.jpg',
];

export default function StaffContent() {
  const tChallengeHeading = useText('leistungen_staff_content', 'staff-challenge-heading', 'Staffing flexibilisieren ist komplex.');
  const tChallengeSub = useText('leistungen_staff_content', 'staff-challenge-sub', 'Im Bereich Sales und Promotion kommt klassisches Recruiting ans Limit.');
  const tSolutionHeading = useText('leistungen_staff_content', 'staff-solution-heading', 'Personaldienstleistung als digitalisierter Service.');
  const tSolutionSub = useText('leistungen_staff_content', 'staff-solution-sub', 'Recruiting Task Force — Auswahl, Betreuung und Abrechnung aus einer Hand.');
  const tProcessHeading = useText('leistungen_staff_content', 'staff-process-heading', 'So läuft die Personalbeschaffung mit Sonic');
  const tSpecsHeading = useText('leistungen_staff_content', 'staff-specs-heading', 'ARBEITNEHMERÜBERLASSUNG FÜR DEINE FIELD FORCE.');
  const tSocksHeading = useText('leistungen_staff_content', 'staff-socks-heading', 'Das S.O.C.K.S.-Prinzip');
  const tSocksSub = useText('leistungen_staff_content', 'staff-socks-sub', 'Unsere Qualitätsstrategie für Planung und Umsetzung von Sell-out-Maßnahmen.');
  const { images: socksImages } = useMediaStore('leistungen_staff_socks_images');
  const { images: solutionWoodIcons } = useMediaStore('leistungen_staff_solution_wood_icons');
  const { images: specializationWoodIcons } = useMediaStore('leistungen_staff_specialization_wood_icons');
  const [activeStep, setActiveStep] = useState(0);
  const [activeSocks, setActiveSocks] = useState(0);

  const getSocksImg = (index: number) => {
    const item = socksImages[index];
    return item?.url ? resolveImageUrl(item.url) : FALLBACK_SOCKS[index];
  };

  const getSolutionWoodIcon = (index: number) => {
    const item = solutionWoodIcons[index];
    return item?.url ? resolveImageUrl(item.url) : item?.url || '';
  };

  const getSpecializationWoodIcon = (index: number) => {
    const item = specializationWoodIcons[index];
    return item?.url ? resolveImageUrl(item.url) : item?.url || '';
  };

  return (
    <>
      <ChallengeSection
        headline={tChallengeHeading}
        subline={tChallengeSub}
        challenges={STAFF_CHALLENGES}
      />

      <WoodenDivider />

      {/* ── Solution (horizontal scroll) ── */}
      <section id="loesung" className="sonic-section-lg bg-white px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.018] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="sonic-container relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Die Lösung</span>
              </div>
              <h2 className="leist-h2 text-foreground-950">
                {tSolutionHeading}
              </h2>
            </div>
            <p className="text-foreground-950/45 text-sm leading-relaxed max-w-xs lg:text-right">{tSolutionSub}</p>
          </div>
          <ScrollCardSection data={SOLUTIONS.map((s, i) => ({ ...s, woodIcon: getSolutionWoodIcon(i) }))} label={`${SOLUTIONS.length} Leistungen — scrollen`} theme="light" variant="wood" />
        </div>
      </section>

      {/* ── Process ── */}
      <WoodenDivider />

      <section id="ablauf" className="sonic-section-lg bg-foreground-950 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(200,212,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative sonic-container">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Ablauf</span>
            </div>
            <h2 className="leist-h2 text-white">
              {tProcessHeading}
            </h2>
            <p className="text-white/40 text-sm mt-3">Volle Kostenkontrolle, volle Flexibilität, volle Performance, volle Entlastung.</p>
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
                    <div className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 ${activeStep === i ? 'bg-primary-500 border-primary-500 text-foreground-950' : activeStep > i ? 'bg-primary-500/15 border-primary-500/40 text-primary-500' : 'bg-foreground-950 border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white/60'}`}>
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
              {/* Left: Visual */}
              <div className="md:col-span-5 relative bg-foreground-950 p-8 md:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 min-h-[240px] md:min-h-[380px]">
                {/* Giant decorative number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <span className="text-[160px] md:text-[240px] font-black text-white/[0.04] leading-none select-none">{STEPS[activeStep].num}</span>
                </div>
                {/* Icon */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 bg-primary-500/10 border border-primary-500/30 flex items-center justify-center mb-5">
                  <i className={`${STEPS[activeStep].icon} text-primary-500 text-2xl md:text-3xl`} />
                </div>
                <div className="relative text-primary-500 text-xs font-black uppercase tracking-widest mb-1">Schritt {STEPS[activeStep].num}</div>
                <div className="relative text-white/40 text-sm font-bold text-center">{STEPS[activeStep].title}</div>
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

      {/* ── Specializations (horizontal scroll, dark bg) ── */}

      {/* Dark-bg WoodenDivider — between two dark sections */}
      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>
      <section id="aufgabenbereiche" className="sonic-section-lg bg-foreground-950 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(200,212,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="sonic-container relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Unsere Spezialisierung</span>
              </div>
              <h2 className="leist-h2 text-white">
                {tSpecsHeading}
              </h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs lg:text-right">6 Einsatzbereiche — ein Ansprechpartner bei Sonic.</p>
          </div>
          <ScrollCardSection data={SPECIALIZATIONS.map((s, i) => ({ ...s, woodIcon: getSpecializationWoodIcon(i) }))} label={`${SPECIALIZATIONS.length} Einsatzbereiche — scrollen`} theme="dark" variant="wood" />
        </div>
      </section>

      {/* ── S.O.C.K.S. ── */}

      {/* Dark-bg WoodenDivider — between two dark sections */}
      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>
      <section id="socks" className="sonic-section-lg bg-foreground-950 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(200,212,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative sonic-container">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Sell-out mit System</span>
            </div>
            <h2 className="leist-h2 text-white">
              {tSocksHeading}
            </h2>
            <p className="text-white/40 text-sm mt-3 max-w-xl mx-auto">{tSocksSub}</p>
          </div>

          {/* Connected Timeline */}
          <div className="relative mb-10 md:mb-14">
            {/* Desktop: full circle timeline */}
            <div className="hidden md:block">
              <div className="absolute top-[28px] left-[10%] right-[10%] h-px bg-white/10" />
              <div className="absolute top-[28px] left-[10%] h-px bg-primary-500 transition-all duration-700 ease-out" style={{ width: `${(activeSocks / (SOCKS.length - 1)) * 80}%` }} />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {SOCKS.map((s, i) => (
                  <button key={i} onClick={() => setActiveSocks(i)} className="flex flex-col items-center cursor-pointer group">
                    <div className={`w-14 h-14 flex items-center justify-center border-2 transition-all duration-300 ${activeSocks === i ? 'bg-primary-500 border-primary-500 text-foreground-950' : activeSocks > i ? 'bg-primary-500/15 border-primary-500/40 text-primary-500' : 'bg-foreground-950 border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white/60'}`}>
                      <span className="text-xl font-black">{s.letter}</span>
                    </div>
                    <span className={`mt-3 text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeSocks === i ? 'text-primary-500' : 'text-white/30'}`}>{s.letter} — {s.title}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Mobile: horizontal scroll pill tabs */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
              {SOCKS.map((s, i) => (
                <button key={i} onClick={() => setActiveSocks(i)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2.5 border transition-all duration-300 cursor-pointer ${activeSocks === i ? 'bg-primary-500 border-primary-500 text-foreground-950' : 'bg-foreground-950 border-white/20 text-white/50'}`}>
                  <span className="text-lg font-black leading-none">{s.letter}</span>
                  <span className="text-[9px] font-black uppercase tracking-wide whitespace-nowrap">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Card */}
          <div key={activeSocks} className="border border-white/10 bg-[#161616] overflow-hidden" style={{ animation: 'fadeSlideIn 0.4s ease-out' }}>
            <div className="grid md:grid-cols-12 gap-0">
              {/* Left: Image */}
              <div className="md:col-span-6 relative overflow-hidden h-[240px] md:h-[400px]">
                <img src={getSocksImg(activeSocks)} alt={SOCKS[activeSocks].title} className="w-full h-full object-cover object-top" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 text-foreground-950 text-[10px] font-black uppercase tracking-widest px-3 py-1">{SOCKS[activeSocks].letter} — {SOCKS[activeSocks].title}</span>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-1.5">
                  {SOCKS.map((_, i) => (
                    <button key={i} onClick={() => setActiveSocks(i)} className={`h-1 transition-all duration-300 cursor-pointer ${activeSocks === i ? 'w-8 bg-primary-500' : 'w-3 bg-white/40'}`} />
                  ))}
                </div>
              </div>

              {/* Right: Content */}
              <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-center min-h-[280px] md:min-h-[400px]">
                {/* Giant decorative letter */}
                <div className="text-[100px] md:text-[140px] font-black leading-none text-white/[0.04] select-none -mb-6 md:-mb-10">{SOCKS[activeSocks].letter}</div>
                <div className="text-primary-500 text-xs font-black uppercase tracking-widest mb-3">{SOCKS[activeSocks].letter} — {SOCKS[activeSocks].title}</div>
                <h3 className="sonic-h3 text-white mb-4">{SOCKS[activeSocks].title}</h3>
                <p className="text-white/55 text-sm md:text-base leading-relaxed">{SOCKS[activeSocks].desc}</p>

                {/* Navigation */}
                <div className="mt-8 flex items-center gap-4">
                  <button
                    onClick={() => setActiveSocks(Math.max(0, activeSocks - 1))}
                    disabled={activeSocks === 0}
                    className="w-11 h-11 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <i className="ri-arrow-left-line text-lg" />
                  </button>
                  <div className="flex gap-2">
                    {SOCKS.map((_, i) => (
                      <button key={i} onClick={() => setActiveSocks(i)} className={`h-2 rounded-none transition-all duration-300 cursor-pointer ${activeSocks === i ? 'w-8 bg-primary-500' : 'w-2 bg-white/20 hover:bg-white/35'}`} />
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveSocks(Math.min(SOCKS.length - 1, activeSocks + 1))}
                    disabled={activeSocks === SOCKS.length - 1}
                    className="w-11 h-11 border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all disabled:opacity-15 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <i className="ri-arrow-right-line text-lg" />
                  </button>
                  <span className="text-white/25 text-xs font-bold ml-2">{activeSocks + 1} / {SOCKS.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
