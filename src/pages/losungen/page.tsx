import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { submitContactForm } from '@/lib/contact';
import { useMediaStore } from '@/lib/mediaStore';
import ClientProof from '../../components/feature/ClientProof';
import WoodenDivider from '../../components/base/WoodenDivider';
import { CONTACT_EMAIL } from '@/lib/contact';
import WoodenButton from '@/components/base/WoodenButton';
import { useCtaText } from '@/hooks/useCtaText';
import { openCalendly } from '@/components/feature/CalendlyWidget';

/* ─────────────────────────────────────────
   SOLUTION DATA — exact content from brief
───────────────────────────────────────── */
import { KEYS, type SolutionKey } from './content';
import { useSolution, useSolutionLabels, useLosungenPageText, useLosungenFaq } from './useLosungenText';

/* Module names that match a Leistungen menu name link to that page (C1). */
const MODULE_LINKS: Record<string, string> = {
  'POS Full Service': '/leistungen/pos-full-service',
  'Staff as a Service': '/leistungen/staff-as-a-service',
  'Talentpool': '/leistungen/talentpool',
  'Events & Messen': '/leistungen/events-messen',
  'Kreation & Content': '/leistungen/kreation-content',
  'Live Video': '/leistungen/live-video',
  'Forecasting': '/leistungen/forecasting',
  'Warehouse & Logistik': '/leistungen/warehouse-logistik',
  'SRT': '/srt',
};

/* ─────────────────────────────────────────
   EXPANDED PANEL
───────────────────────────────────────── */
function ExpandedPanel({ sKey, onClose, carouselRef, heroBgImages, woodTextures, deliverableImages, stepImages, testimonialImages, iconImages }: { sKey: SolutionKey; onClose: () => void; carouselRef: React.RefObject<HTMLDivElement>; heroBgImages: import('@/lib/mediaStore').MediaItem[]; woodTextures: import('@/lib/mediaStore').MediaItem[]; deliverableImages: import('@/lib/mediaStore').MediaItem[]; stepImages: import('@/lib/mediaStore').MediaItem[]; testimonialImages: import('@/lib/mediaStore').MediaItem[]; iconImages: import('@/lib/mediaStore').MediaItem[] }) {
  const s = useSolution(sKey);
  const cta = useCtaText();
  const [activeDeliverable, setActiveDeliverable] = useState(0);
  const [delivFade, setDelivFade] = useState(true);

  // ── Dashboard-managed image overrides ──
  // Deliverable base offsets: Markteintritt starts at 0 (7 slots), Absatz at 7 (8 slots), Omnichannel at 15 (8 slots) → 23 total
  const dBase = { markteintritt: 0, absatz: 7, omnichannel: 15 };
  const sBase = { markteintritt: 0, absatz: 5, omnichannel: 10 };

  // Icon override map — use dashboard-managed icons when available
  const iconOverrides: Record<string, string> = {};
  if (iconImages[0]) iconOverrides['ambassador'] = iconImages[0].url;
  if (iconImages[1]) iconOverrides['dashboard'] = iconImages[1].url;
  if (iconImages[2]) iconOverrides['video'] = iconImages[2].url;


  const overriddenDeliverables = s.deliverables.map((d, i) => {
    const override = deliverableImages[dBase[sKey] + i];
    if (override) return { ...d, img: override.url };
    // Check icon overrides for local file paths
    if (d.img.includes('/images/losungen/ambassador') && iconOverrides['ambassador'])
      return { ...d, img: iconOverrides['ambassador'] };
    if (d.img.includes('/images/losungen/dashboard') && iconOverrides['dashboard'])
      return { ...d, img: iconOverrides['dashboard'] };
    return d;
  });
  const overriddenSteps = s.steps.map((st, i) => {
    const override = stepImages[sBase[sKey] + i];
    return override ? { ...st, img: override.url } : st;
  });

  const heroImages: Record<SolutionKey, string> = {
    markteintritt: (heroBgImages[1] && heroBgImages[1].url) || '',
    absatz: (heroBgImages[2] && heroBgImages[2].url) || '',
    omnichannel: (heroBgImages[3] && heroBgImages[3].url) || '',
  };

  const handleDeliverableChange = (idx: number) => {
    setDelivFade(false);
    setTimeout(() => {
      setActiveDeliverable(idx);
      setDelivFade(true);
    }, 200);
  };

  const scrollToCarousel = () => {
    onClose();
    setTimeout(() => {
      carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div style={{ animation: 'expandIn 0.5s ease-out' }}>

      {/* ── FULL-WIDTH DARK HERO BANNER — exact Case Studies style ── */}
      <div className="relative bg-foreground-950 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          {(woodTextures[1] && woodTextures[1].url) ? (
            <img
              src={woodTextures[1].url}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-14">
          {/* Top nav */}
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/70 hover:text-primary-500 transition-colors font-bold text-sm cursor-pointer"
            >
              <i className="ri-arrow-up-line text-lg"></i>
              <span className="hidden sm:inline">Zurück zur Übersicht</span>
              <span className="sm:hidden">Zurück</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Schließen"
              className="w-10 h-10 flex items-center justify-center bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:scale-110 transition-all cursor-pointer"
            >
              <i className="ri-close-line text-xl text-white" aria-hidden="true"></i>
            </button>
          </div>

          {/* Hero content */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-primary-500/20" style={{ borderRadius: 0 }}>
                  <i className={`${s.icon} text-xl text-primary-500`}></i>
                </div>
                <div>
                  <p className="text-white font-black text-sm">{s.label}</p>
                  <p className="text-white/60 text-xs font-medium">Sonic Lösung</p>
                </div>
              </div>
              <h2 className="sonic-h2 text-white">
                {s.title}
              </h2>
              <p className="text-base md:text-xl text-white/75 font-bold leading-relaxed mb-3 md:mb-6">{s.subtitle}</p>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">{s.description}</p>
            </div>

            {/* Hero stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {s.stats.map((stat, idx) => (
                <div key={idx} className="bg-white/[0.04] backdrop-blur-[2px] p-4 md:p-5 border border-white/[0.06]">
                  <div className="text-xl md:text-3xl font-black text-primary-500 font-sans tabular-nums mb-1">{stat.value}</div>
                  <div className="text-white/70 text-2xs md:text-xs font-bold uppercase tracking-wide leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STORY BODY ── */}
      <div className="bg-white">

        {/* ── Herausforderungen ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-black text-foreground-400 uppercase tracking-widest mb-2">Deine Herausforderung</p>
            <h3 className="sonic-h3 text-foreground-950">
              {sKey === 'markteintritt' ? 'Drei typische Markteintritts-Hürden' :
               sKey === 'absatz' ? 'Der Retail-Alltag frisst Potenzial' :
               'Die Lücke, die kein Algorithmus schließt'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {s.challenges.map((ch, i) => (
              <div key={i} className="bg-white p-6 md:p-10 border border-foreground-100 hover:border-primary-500/30 hover:-translate-y-1 transition-all duration-300 group" style={{ borderRadius: 0 }}>
                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-primary-500/10 border border-primary-500/20 mb-4 md:mb-6 group-hover:bg-primary-500/20 transition-colors" style={{ borderRadius: 0 }}>
                  <i className={`${ch.icon} text-xl md:text-2xl text-primary-500`}></i>
                </div>
                <h4 className="font-black text-lg md:text-xl text-foreground-950 mb-2 md:mb-4">{ch.title}</h4>
                <p className="text-sm md:text-base text-foreground-600 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <WoodenDivider />

        {/* ── Deliverables ── */}
        <div className="py-10 md:py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-black text-foreground-400 uppercase tracking-widest mb-2">
              {sKey === 'omnichannel' ? 'Unsere Antwort' : 'Unser Komplettpaket'}
            </p>
            <h3 className="sonic-h3 text-foreground-950">
              {sKey === 'markteintritt' ? 'Wir machen deinen Markteintritt messbar erlebbar' :
               sKey === 'absatz' ? 'Sell-out-Steigerung als System' :
               'Video: drei Touchpoints, ein Studio'}
            </h3>
          </div>

          {/* Editorial split: left list + right image */}
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-[360px_1fr] border border-foreground-100">

              {/* Left: vertical selector list */}
              <div className="lg:border-r border-foreground-100 divide-y divide-foreground-100 flex flex-col">
                {overriddenDeliverables.map((d, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDeliverableChange(idx)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-all duration-200 cursor-pointer group border-l-4 ${
                      activeDeliverable === idx
                        ? 'bg-foreground-950 border-primary-500'
                        : 'bg-white border-transparent hover:bg-primary-50 hover:border-primary-500/30'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    <span className={`text-2xs font-black tabular-nums flex-shrink-0 w-5 ${
                      activeDeliverable === idx ? 'text-primary-500' : 'text-foreground-300 group-hover:text-primary-500/50'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div
                      className={`w-7 h-7 flex items-center justify-center flex-shrink-0 transition-colors ${
                        activeDeliverable === idx ? 'bg-primary-500/20' : 'bg-foreground-100 group-hover:bg-primary-500/10'
                      }`}
                      style={{ borderRadius: 0 }}
                    >
                      <i className={`${d.icon} text-xs ${
                        activeDeliverable === idx ? 'text-primary-500' : 'text-foreground-400'
                      }`}></i>
                    </div>
                    <span className={`text-xs font-bold leading-snug flex-1 min-w-0 ${
                      activeDeliverable === idx ? 'text-white' : 'text-foreground-950'
                    }`}>
                      {d.title}
                    </span>
                    {activeDeliverable === idx && (
                      <i className="ri-arrow-right-s-line text-primary-500 text-sm flex-shrink-0"></i>
                    )}
                  </button>
                ))}
              </div>

              {/* Right: image + content panel */}
              <div
                className="relative overflow-hidden"
                style={{ transition: 'opacity 0.2s', opacity: delivFade ? 1 : 0 }}
              >
                <img
                  src={overriddenDeliverables[activeDeliverable].img}
                  alt={overriddenDeliverables[activeDeliverable].title}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                <div
                  className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10"
                >
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center bg-primary-500/20 border border-primary-500/40"
                      style={{ borderRadius: 0 }}
                    >
                      <i className={`${overriddenDeliverables[activeDeliverable].icon} text-lg md:text-xl text-primary-500`}></i>
                    </div>
                    <h4 className="text-xl md:text-3xl font-black text-white drop-shadow-lg">
                      {overriddenDeliverables[activeDeliverable].title}
                    </h4>
                  </div>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base max-w-2xl">
                    {overriddenDeliverables[activeDeliverable].desc}
                  </p>
                  {/* Progress indicator */}
                  <div className="flex items-center gap-1.5 mt-5">
                    {overriddenDeliverables.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDeliverableChange(idx)}
                        aria-label={`Leistung ${idx + 1} von ${overriddenDeliverables.length} anzeigen`}
                        aria-current={activeDeliverable === idx ? 'true' : undefined}
                        className={`h-1 transition-all duration-300 cursor-pointer ${
                          activeDeliverable === idx ? 'bg-primary-500 w-6' : 'bg-white/[0.12] w-3 hover:bg-primary-500/60'
                        }`}
                        style={{ borderRadius: 0 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <WoodenDivider />

        {/* ── Process Steps ── */}
        <div className="bg-white py-10 md:py-14 px-4 md:px-8">
          <div className="sonic-container">
            <div className="mb-8 md:mb-14">
              <p className="text-xs md:text-sm font-black text-foreground-400 uppercase tracking-widest mb-2">Der Weg zum Erfolg</p>
              <h3 className="sonic-h3 text-foreground-950">
                {sKey === 'markteintritt' ? 'So läuft dein Markteintritt mit Sonic' :
                 sKey === 'absatz' ? 'Das Sonic-System mit fünf Schritten' :
                 'So führen wir Video ein'}
              </h3>
              {/* ── Compact stats pills ── */}
              <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-6">
                {s.stats.map((stat, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-500/6 border border-primary-500/15 text-xs font-bold">
                    <span className="text-primary-500 tabular-nums">{stat.value}</span>
                    <span className="text-foreground-400 font-medium">{stat.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Alternating editorial grid */}
            <div className="space-y-0 border border-foreground-200">
              {overriddenSteps.map((st, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="group grid grid-cols-1 sm:grid-cols-2 border-b border-foreground-200 last:border-b-0 transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    {/* Image panel */}
                    <div className={`relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}
                      style={{ minHeight: 'clamp(140px, 28vw, 340px)' }}
                    >
                      <img
                        src={st.img}
                        alt={st.title}
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/10 to-transparent" />
                      {/* Step number watermark */}
                      <div className="absolute top-3 left-4 md:top-5 md:left-6">
                        <span
                          className="text-6xl md:text-8xl font-black leading-none select-none"
                          style={{ color: 'rgba(200,212,0,0.55)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
                        >
                          {st.num}
                        </span>
                      </div>
                    </div>

                    {/* Content panel */}
                    <div
                      className={`flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 md:px-10 md:py-12 bg-white group-hover:bg-foreground-950 transition-colors duration-300 ${
                        isEven ? 'md:order-2' : 'md:order-1'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xs font-black text-foreground-300 group-hover:text-primary-500/50 uppercase tracking-widest transition-colors">
                          {st.num}
                        </span>
                        <div className="h-px flex-1 bg-foreground-100 group-hover:bg-white/10 transition-colors" />
                      </div>
                      <h4 className="font-black text-xl md:text-2xl text-foreground-950 group-hover:text-white transition-colors duration-300 mb-3 leading-snug">
                        {st.title}
                      </h4>
                      <p className="text-foreground-500 group-hover:text-white/75 leading-relaxed text-sm md:text-base transition-colors duration-300">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Compact bottom bar ── */}
        <div className="border-t border-foreground-100 py-5 md:py-7 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-foreground-500 text-center sm:text-left max-w-lg leading-relaxed">
              <strong className="font-black text-foreground-950">{s.ctaHeadline}</strong>{' '}{s.finalCta}
            </p>
            <div className="flex items-center gap-4 flex-shrink-0">
              <button
                onClick={scrollToCarousel}
                className="text-xs font-bold text-foreground-400 hover:text-foreground-950 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-arrow-up-line mr-1"></i>Zurück
              </button>
              <button
                type="button"
                onClick={() => openCalendly()}
                className="inline-flex items-center gap-2 bg-foreground-950 text-white px-5 py-2.5 font-black text-xs uppercase tracking-wider hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap"
                style={{ borderRadius: 0 }}
              >
                <i className="ri-calendar-line text-sm"></i>{cta.book}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
function ContactForm() {
  const cta = useCtaText();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = (form.elements.namedItem('nachricht') as HTMLTextAreaElement)?.value || '';
    if (message.length > 500) return;

    setFormStatus('sending');

    try {
      const formEl = e.currentTarget;
      const fd = new FormData(formEl);
      const data: Record<string, string> = {};
      fd.forEach((val, key) => { data[key] = val as string; });
      data['_subject'] = `Lösungen Kontaktanfrage von ${data.vorname || ''} ${data.nachname || ''}`;

      await submitContactForm(data);
      setFormStatus('success');
      formEl.reset();
      setCharCount(0);
    } catch {
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 flex items-center justify-center bg-primary-500/20 mx-auto mb-5">
          <i className="ri-check-double-line text-3xl text-primary-500"></i>
        </div>
        <h3 className="text-2xl font-black text-foreground-950 mb-2">Nachricht gesendet!</h3>
        <p className="text-foreground-500 text-sm leading-relaxed">
          Vielen Dank für deine Anfrage. Wir melden uns zeitnah.
        </p>
        <button
          onClick={() => setFormStatus('idle')}
          className="mt-6 text-primary-500 font-black text-sm hover:underline cursor-pointer"
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form
      id="losungen-kontakt-form"
      data-readdy-form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="losungen-kontakt-vorname" className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Vorname *</label>
          <input autoComplete="given-name" aria-required="true" id="losungen-kontakt-vorname"
            type="text"
            name="vorname"
            required
            placeholder="Max"
            className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="losungen-kontakt-nachname" className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Nachname *</label>
          <input autoComplete="family-name" aria-required="true" id="losungen-kontakt-nachname"
            type="text"
            name="nachname"
            required
            placeholder="Mustermann"
            className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="losungen-kontakt-email" className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">E-Mail *</label>
        <input autoComplete="email" aria-required="true" id="losungen-kontakt-email"
          type="email"
          name="email"
          required
          placeholder="max@unternehmen.de"
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="losungen-kontakt-unternehmen" className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Unternehmen</label>
        <input autoComplete="organization" id="losungen-kontakt-unternehmen"
          type="text"
          name="unternehmen"
          placeholder="Dein Unternehmen GmbH"
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="losungen-kontakt-telefon" className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Telefon</label>
        <input autoComplete="tel" id="losungen-kontakt-telefon"
          type="tel"
          name="telefon"
          placeholder="+49 2151 479 444 0"
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="losungen-kontakt-interesse" className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">Ich interessiere mich für</label>
        <select id="losungen-kontakt-interesse"
          name="interesse"
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors bg-white cursor-pointer"
        >
          <option value="">Bitte wählen...</option>
          <option value="Markteintritt">Markteintritt</option>
          <option value="Absatz steigern">Absatz steigern</option>
          <option value="Omnichannel / Live-Video">Omnichannel / Live-Video</option>
          <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
        </select>
      </div>

      <div>
        <label htmlFor="losungen-kontakt-nachricht" className="block text-xs font-black text-foreground-500 uppercase tracking-widest mb-1.5">
          Deine Nachricht *
          <span className={`ml-2 font-normal normal-case ${charCount > 480 ? 'text-red-400' : 'text-foreground-400'}`}>
            {charCount}/500
          </span>
        </label>
        <textarea aria-required="true" id="losungen-kontakt-nachricht"
          name="nachricht"
          required
          rows={4}
          maxLength={500}
          placeholder="Beschreibe kurz dein Projekt oder deine Frage..."
          onChange={(e) => setCharCount(e.target.value.length)}
          className="w-full px-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 transition-colors resize-none"
        />
      </div>

      {formStatus === 'error' && (
        <p className="text-red-500 text-sm font-semibold">
          Etwas ist schiefgelaufen. Bitte versuche es erneut.
        </p>
      )}

      <button
        type="submit"
        disabled={formStatus === 'sending' || charCount > 500}
        className="w-full flex items-center justify-center gap-3 bg-primary-500 text-foreground-950 py-4 font-black hover:bg-foreground-950 hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {formStatus === 'sending' ? (
          <>
            <i className="ri-loader-4-line animate-spin text-lg"></i>
            Wird gesendet...
          </>
        ) : (
          <>
            <i className="ri-send-plane-line text-lg"></i>
            {cta.request}
          </>
        )}
      </button>

      <p className="text-foreground-400 text-xs text-center">
        Mit dem Absenden stimmst du unserer Datenschutzerklärung zu.
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────
   WOOD CARD
───────────────────────────────────────── */
function WoodCard({
  sKey,
  isExpanded,
  onToggle,
  woodTextures,
}: {
  sKey: SolutionKey;
  isExpanded: boolean;
  onToggle: () => void;
  woodTextures: import('@/lib/mediaStore').MediaItem[];
}) {
  const s = useSolution(sKey);
  const pt = useLosungenPageText();
  const heroStat = s.stats[0];
  const factStats = s.stats.slice(1, 4);
  const LEVEL_WIDTH: Record<string, string> = { kern: '100%', baustein: '64%', optional: '32%' };
  const LEVEL_LABEL: Record<string, string> = { kern: pt.modulesLegendKern, baustein: pt.modulesLegendBaustein, optional: pt.modulesLegendOptional };

  return (
    <div className="w-full relative overflow-hidden" style={{ borderRadius: 0, border: '1px solid oklch(0.885 0.004 110)' }}>
      {/* Wood texture — actual image, dark diagonal overlay, no shadow/glow */}
      <div className="absolute inset-0">
        {(woodTextures[0] && woodTextures[0].url) ? (
          <img
            src={woodTextures[0].url}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : null}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,11,9,0.86), rgba(10,11,9,0.78), rgba(10,11,9,0.88))' }} />
      </div>

      {/* Fine grain overlay */}
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(115deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 2px, transparent 4px)' }} />

      <div className="relative z-10 p-6 md:p-12">
        {/* 1. Card header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-7">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-primary-500/15 border border-primary-500/40 flex-shrink-0">
              <i className={`${s.icon} text-xl md:text-2xl text-primary-500`}></i>
            </div>
            <div className="min-w-0">
              <p className="text-primary-500 text-2xs font-black uppercase tracking-widest">Sonic Lösung</p>
              <h2 className="text-xl md:text-2xl font-black text-white leading-tight">{s.label}</h2>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto rounded-none border border-white/15 bg-white/5 px-4 py-2">
            <span className="text-white/75 text-xs font-bold whitespace-nowrap">{pt.cardChip}</span>
          </div>
        </div>

        {/* 2. Two-column hero row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left: big stat + label + description */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black text-primary-500 font-sans tabular-nums leading-none drop-shadow-lg">{heroStat.value}</div>
            <p className="text-white/75 text-sm md:text-base font-bold uppercase tracking-wide mt-3">{heroStat.label}</p>
            <p className="text-white/60 text-sm leading-relaxed mt-4 max-w-md">{s.description}</p>
            {s.proof.length > 0 && (
              <div className="mt-5 space-y-2 max-w-md">
                {s.proof.map((p, i) => (
                  <p key={i} className="flex items-start gap-2.5 text-white/80 text-xs md:text-sm font-bold leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-primary-500 flex-shrink-0 mt-[7px]" aria-hidden="true" />
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Right: modules panel — which Sonic modules this solution is built from */}
          <div className="lg:col-span-7 bg-black/30 border border-white/10 backdrop-blur-[2px] p-6 md:p-8 flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-6">
              <span className="text-white/85 text-xs font-black uppercase tracking-wide">{pt.modulesHeading}</span>
              <span className="text-primary-500 text-[10px] md:text-xs font-black uppercase tracking-wide px-3 py-1" style={{ border: '1px solid oklch(var(--primary-500) / 0.3)' }}>{pt.modulesPill}</span>
            </div>
            <ul className="flex-1 flex flex-col justify-center gap-3">
              {s.modules.map((m, i) => (
                <li key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-center gap-3 md:gap-4">
                  {MODULE_LINKS[m.name] ? (
                    <Link to={MODULE_LINKS[m.name]} className="text-white/85 text-xs md:text-sm font-bold leading-tight hover:text-primary-500 underline decoration-white/20 underline-offset-4 hover:decoration-primary-500 transition-colors">{m.name}</Link>
                  ) : (
                    <span className="text-white/85 text-xs md:text-sm font-bold leading-tight">{m.name}</span>
                  )}
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="relative flex-1 h-2 bg-white/10" aria-hidden="true">
                      <span className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500/60 to-primary-500" style={{ width: LEVEL_WIDTH[m.level] }} />
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-wide w-16 text-right ${m.level === 'kern' ? 'text-primary-500' : 'text-white/45'}`}>{LEVEL_LABEL[m.level]}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Fact row — 3 compact tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-6">
          {factStats.map((stat, i) => (
            <div key={i} className="bg-black/25 border border-white/10 p-4 md:p-5 text-center">
              <div className="text-primary-500 font-sans tabular-nums font-black text-lg md:text-2xl mb-1">{stat.value}</div>
              <div className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 4. CTA row */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-none bg-primary-500 text-foreground-950 px-7 py-3 font-black uppercase tracking-wider hover:bg-white hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap text-xs md:text-sm"
          >
            {isExpanded ? 'Schließen' : 'Mehr dazu'}
            <i className={`ri-arrow-down-line text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
          </button>
          <button
            onClick={onToggle}
            className="w-11 h-11 md:w-12 md:h-12 rounded-none flex items-center justify-center border border-white/25 text-white hover:border-primary-500 hover:text-primary-500 transition-all duration-300 cursor-pointer"
            aria-label={isExpanded ? 'Schließen' : 'Mehr dazu'}
          >
            <i className={`ri-arrow-down-line text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function LosungenPage() {
  const cta = useCtaText();
  const labels = useSolutionLabels();
  const pt = useLosungenPageText();
  const faqTexts = useLosungenFaq();
  useSEO({
    title: 'Lösungen | Sonic Group — Markteintritt, Absatz steigern, Omnichannel',
    description: 'Drei Wege, wie Sonic Marken im Handel stärker macht: neue Produkte einführen, den Abverkauf am POS steigern und persönliche Beratung im Laden und online verbinden – mit Promotion-Teams, Live-Video-Beratung und Live-Reporting.',
    keywords: 'Retail-Lösungen Deutschland, Markteintritt DACH, Absatzsteigerung Retail, Omnichannel Aktivierung, Markteinführung Deutschland, POS Promotion, Verkaufsförderung DACH, Retail Marketing Agentur, Field Marketing Germany, Sales Promotion Germany, Retail Activation Europa',
    canonical: 'https://sonic-group.de/losungen',
    ogTitle: 'Lösungen — Sonic Group',
    ogDescription: 'Markteintritt, Abverkauf und Omnichannel — drei Lösungsansätze für Marken, die im deutschen Handel stark werden wollen.',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://sonic-group.de' },
        { '@type': 'ListItem', position: 2, name: 'Lösungen', item: 'https://sonic-group.de/losungen' },
      ]},
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: 'Wie unterstützt Sonic Group beim Markteintritt in Deutschland?', acceptedAnswer: { '@type': 'Answer', text: 'Sonic Group begleitet internationale Marken mit Field Force, POS-Aktivierung, Schulungen und Reporting-Systemen beim Eintritt in den deutschen Handel — von der Pilotphase bis zur flächendeckenden Skalierung.' }},
        { '@type': 'Question', name: 'Wie steigert Sonic Group den Abverkauf am POS?', acceptedAnswer: { '@type': 'Answer', text: 'Durch geschulte Promoter:innen, gezielte POS-Promotions, Live-Video-Beratung und datenbasiertes Reporting mit dem SRT (Sonic Reporting Tool) wird der Umsatz messbar gesteigert.' }},
        { '@type': 'Question', name: 'Was bedeutet Omnichannel bei Sonic?', acceptedAnswer: { '@type': 'Answer', text: 'Omnichannel heißt bei Sonic: Kundinnen und Kunden bekommen dieselbe persönliche Beratung im Laden, im Online-Shop und per QR-Code auf der Verpackung – live aus unseren Studios in Krefeld.' }},
      ]},
    ],
  })
  // ── Dashboard-managed media ──
  const { images: heroBgImages } = useMediaStore('losungen_hero_backgrounds');
  const { images: woodTextures } = useMediaStore('losungen_wood_textures');
  const { images: testimonialImages } = useMediaStore('losungen_testimonial_images');
  const { images: deliverableImages } = useMediaStore('losungen_deliverable_images');
  const { images: stepImages } = useMediaStore('losungen_step_images');
  const { images: iconImages } = useMediaStore('/images/losungen');

  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<SolutionKey>('markteintritt');
  const [expandedKey, setExpandedKey] = useState<SolutionKey | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [surveyExpanded, setSurveyExpanded] = useState(false);
  const [showSurveyContact, setShowSurveyContact] = useState(false);
  const [surveyDone, setSurveyDone] = useState(false);
  const [surveyName, setSurveyName] = useState('');
  const [surveyLastName, setSurveyLastName] = useState('');
  const [surveyEmail, setSurveyEmail] = useState('');
  const [surveyPhone, setSurveyPhone] = useState('');
  const [surveyCompany, setSurveyCompany] = useState('');
  const [surveyRole, setSurveyRole] = useState('');
  const [surveyBudget, setSurveyBudget] = useState('');
  const [surveyNotes, setSurveyNotes] = useState('');
  const [surveySubmitting, setSurveySubmitting] = useState(false);
  const [surveyError, setSurveyError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openParam = searchParams.get('open') as SolutionKey | null;
    if (openParam && KEYS.includes(openParam)) {
      setActiveTab(openParam);
      setExpandedKey(openParam);
      setTimeout(() => {
        carouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, [searchParams]);

  const handleTabClick = (key: SolutionKey) => {
    setActiveTab(key);
    setExpandedKey(null);
  };

  const handleToggle = (key: SolutionKey) => {
    const next = expandedKey === key ? null : key;
    setExpandedKey(next);
    if (next) {
      setTimeout(() => {
        expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  const surveyQuestions = [
    { question: 'In welcher Branche bist du aktiv?', options: ['Consumer Electronics', 'Haushaltsgeräte', 'Sport & Outdoor', 'Kosmetik & Beauty', 'Food & Beverages', 'Pharma & Healthcare', 'Fashion & Lifestyle', 'Sonstiges'] },
    { question: 'Was ist dein primäres Ziel?', options: ['Markteintritt', 'Absatzsteigerung', 'Omnichannel-Strategie', 'Markenbekanntheit', 'Kundenbindung', 'POS-Optimierung', 'Live-Video-Beratung', 'Sales-Training & Enablement'] },
    { question: 'Wie viele POS-Standorte planst du?', options: ['1–10', '11–50', '51–100', '100–500', '500+', 'Noch unklar'] },
    { question: 'Wann möchtest du starten?', options: ['Sofort', 'In 1–3 Monaten', 'In 3–6 Monaten', 'In 6–12 Monaten', 'Noch in Planung'] },
    { question: 'Hast du bereits Erfahrung mit Field-Marketing-Agenturen?', options: ['Ja, aktuell in Zusammenarbeit', 'Ja, aber unzufrieden', 'Nein, erstes Mal', 'Bereits probiert, abgebrochen', 'Evaluiere verschiedene Anbieter'] },
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSurveyContact(true);
    }
  };

  const handleSurveySubmit = async () => {
    if (!surveyEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(surveyEmail)) {
      setSurveyError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    setSurveySubmitting(true);
    setSurveyError('');

    try {
      const form = document.getElementById('losungen-survey-form') as HTMLFormElement;
      const formData = new FormData(form);
      const data: Record<string, string> = {};
      formData.forEach((val, key) => { data[key] = String(val); });
      data.branche = answers[0] || '';
      data.ziel = answers[1] || '';
      data.standorte = answers[2] || '';
      data.start = answers[3] || '';
      data.erfahrung = answers[4] || '';
      data.subject = 'Lösungen-Umfrage — neue Anfrage';

      await submitContactForm(data);
      setSurveyDone(true);
      setShowSurveyContact(false);
    } catch {
      setSurveyError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setSurveySubmitting(false);
    }
  };

  const faqItems = faqTexts;

  return (
    <div className="min-h-[100dvh] bg-white overflow-x-hidden">

      {/* ── HERO ── */}
      <section
        className="relative flex min-h-[340px] sm:min-h-[400px] md:min-h-[560px] flex-col justify-end overflow-hidden bg-foreground-950"
        style={{ paddingTop: 'clamp(56px, 14vw, 80px)' }}
      >
        {/* Background image */}
        {(heroBgImages[0] && heroBgImages[0].url) && (
          <img
            src={heroBgImages[0].url}
            alt="Lösungen Hero"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 20%' }}
            fetchPriority="high"
            decoding="async"
          />
        )}

        {/* Dark veil — bottom-heavy, matches Leistungen reference */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(11,11,12,0.30) 0%, rgba(11,11,12,0.20) 45%, rgba(11,11,12,0.82) 100%)' }}
          aria-hidden="true"
        />

        {/* Content — left-aligned, bottom-anchored */}
        <div className="relative z-20 w-full max-w-[1280px] mx-auto px-4 md:px-8 pb-6 md:pb-10">
          <div className="max-w-[640px]">
            {/* v3 eyebrow — lime hairline + label */}
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{pt.heroBadge}</span>
            </div>

            <h1 className="leist-h1-hub text-white mb-5 md:mb-6">
              {pt.heroH1Line1}<br />
              <span className="text-primary-500">{pt.heroH1Line2}</span><br />
              <span className="whitespace-nowrap">{pt.heroH1Line3}</span>
            </h1>

            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-[480px] mb-3">
              {pt.heroSub}
            </p>
            <p className="text-xs md:text-sm text-white/60 leading-relaxed max-w-[480px] mb-8 md:mb-10">
              {pt.heroIntro}
            </p>
          </div>

        </div>
      </section>

      {/* ── WOODEN CAROUSEL ── */}
      <section ref={carouselRef} id="losungen-carousel" className="sonic-section-md relative bg-white overflow-visible">

        {/* Intro text — sonic-container, full width, border-b — same as Case Studies */}
        <div className="sonic-container py-6 md:py-8 border-b border-foreground-100">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{pt.introBadge}</span>
          </div>
          <p className="text-foreground-600 w-full" style={{ fontSize: '19px', lineHeight: '1.7' }}>
            {pt.introText}
          </p>
        </div>

        {/* Carousel — same sonic-container, aligned with text above */}
        <div className="sonic-container py-8 md:py-12">

          {/* Tab switcher — framed hairline row, joins directly into the wood card below.
              Mobile: natural width + horizontal scroll (labels don't get crushed).
              md+: equal-width flex-1, there's room. */}
          <div
            className="flex overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden"
            style={{ border: '1px solid oklch(0.885 0.004 110)', borderBottom: 'none', scrollbarWidth: 'none' }}
          >
            {KEYS.map((key) => (
              <button
                key={key}
                onClick={() => handleTabClick(key)}
                className={`flex-shrink-0 md:flex-1 px-4 md:px-8 py-3 md:py-3.5 font-black uppercase tracking-wider text-xs md:text-sm transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeTab === key
                    ? 'bg-foreground-950 text-primary-500'
                    : 'bg-white text-foreground-500 hover:text-foreground-950'
                }`}
              >
                {labels[key]}
              </button>
            ))}
          </div>

          {/* Wood card */}
          <WoodCard
            sKey={activeTab}
            isExpanded={expandedKey === activeTab}
            onToggle={() => handleToggle(activeTab)}
            woodTextures={woodTextures}
          />

          {/* Nav dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {KEYS.map((key, i) => (
              <button
                key={i}
                onClick={() => handleTabClick(key)}
                className={`h-2 rounded-none transition-all cursor-pointer hover:scale-110 ${
                  activeTab === key ? 'bg-primary-500 w-6 shadow-lg' : 'bg-foreground-300 w-2 hover:bg-primary-500/60'
                }`}
                aria-label={`${labels[key]} anzeigen`}
              />
            ))}
          </div>

        </div>

        {/* Expanded panel — full-bleed, outside the max-w container (no 100vw hack) */}
        <div ref={expandedRef} className="relative z-10">
          {expandedKey && expandedKey === activeTab && (
            <ExpandedPanel sKey={expandedKey} onClose={() => setExpandedKey(null)} carouselRef={carouselRef} heroBgImages={heroBgImages} woodTextures={woodTextures} deliverableImages={deliverableImages} stepImages={stepImages} testimonialImages={testimonialImages} iconImages={iconImages} />
          )}
        </div>
      </section>

      <WoodenDivider />

      {/* ── THREE PILLARS ── */}
      <section className="sonic-section-lg md:px-4 md:px-6 bg-foreground-950">
        <div className="sonic-container">
          <div className="text-center mb-10 md:mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{pt.alwaysBadge}</span>
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            </div>
            <h2 className="sonic-h2 text-white mb-2">{pt.alwaysHeading}</h2>
            <p className="text-base md:text-xl text-white/50 font-semibold">{pt.alwaysSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: 'ri-team-line', title: pt.always1Title, desc: pt.always1Desc },
              { icon: 'ri-bar-chart-box-line', title: pt.always2Title, desc: pt.always2Desc },
              { icon: 'ri-dashboard-line', title: pt.always3Title, desc: pt.always3Desc },
            ].map((item, i) => (
              <div key={i} className="relative bg-white/[0.03] backdrop-blur-[2px] border border-white/[0.06] hover:border-primary-500/50 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                {/* lime corner accent */}
                <div className="absolute top-0 left-0 w-[2px] h-16 bg-gradient-to-b from-primary-500 to-transparent" />
                <div className="pt-10 pb-8 px-8 text-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-primary-500/15 border border-primary-500/30 mx-auto mb-5 group-hover:bg-primary-500/25 transition-colors">
                    <i className={`${item.icon} text-2xl text-primary-500`}></i>
                  </div>
                  <h3 className="text-lg font-black text-white mb-3">{item.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark-bg WoodenDivider — dark section exit into survey block(light) */}
      <div style={{ background: 'oklch(0.13 0.005 118)' }}><WoodenDivider /></div>

      {/* ── SURVEY ── inline block, not a standalone section ── */}
      <div className="py-10 md:py-14 px-4 md:px-6 bg-background-50">
        <div className="max-w-3xl mx-auto">
          {!surveyExpanded ? (
            /* ── Collapsed teaser ── */
            <div
              onClick={() => setSurveyExpanded(true)}
              className="relative bg-white border border-background-200 overflow-hidden cursor-pointer group hover:border-primary-500/40 transition-all duration-300"
              style={{ borderRadius: 0 }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSurveyExpanded(true); }}
            >
              {/* Subtle lime corner accent */}
              <div className="absolute top-0 left-0 w-[2px] h-12 bg-gradient-to-b from-primary-500 to-transparent" />

              <div className="relative z-10 p-5 md:p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary-500/10 border border-primary-500/25">
                    <i className="ri-flashlight-line text-lg text-primary-500"></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-primary-500 uppercase tracking-[0.2em] mb-0.5">Schnell-Check</p>
                    <h3 className="text-sm md:text-base font-black text-foreground-950 leading-snug">Finde die passende Sonic-Lösung für dein Projekt</h3>
                    <p className="text-xs text-foreground-500 mt-0.5 hidden sm:block">5 Fragen · 60 Sekunden · Maßgeschneidertes Ergebnis</p>
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-primary-500 text-foreground-950 font-black text-xs uppercase tracking-wider group-hover:bg-foreground-950 group-hover:text-white transition-all duration-300">
                  <span className="hidden sm:inline">Loslegen</span>
                  <i className="ri-arrow-right-line text-sm"></i>
                </div>
              </div>
            </div>
          ) : (
            /* ── Expanded survey card ── */
            <div
              className="relative bg-foreground-950 overflow-hidden"
              style={{ borderRadius: 0, animation: 'expandIn 0.3s ease-out' }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-[2px] h-16 bg-gradient-to-b from-primary-500 to-transparent" />
              <div className="absolute bottom-0 right-0 w-[2px] h-16 bg-gradient-to-t from-primary-500 to-transparent" />

              {/* Close button */}
              <button
                onClick={() => {
                  setSurveyExpanded(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setShowSurveyContact(false);
                  setSurveyDone(false);
                  setSurveyEmail('');
                  setSurveyPhone('');
                  setSurveyCompany('');
                  setSurveyName('');
                  setSurveyLastName('');
                  setSurveyRole('');
                  setSurveyBudget('');
                  setSurveyNotes('');
                  setSurveyError('');
                }}
                className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:scale-110 transition-all cursor-pointer"
                aria-label="Schließen"
              >
                <i className="ri-close-line text-lg text-white"></i>
              </button>

              <div className="relative z-10 p-6 md:p-8 pt-12 md:pt-10">
                {!surveyDone && !showSurveyContact ? (
                  <>
                    {/* Header */}
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-3 py-1 mb-3">
                        <div className="w-1.5 h-1.5 bg-primary-500 animate-pulse" />
                        <span className="text-xs font-black text-primary-500 uppercase tracking-[0.2em]">Schnell-Check</span>
                      </div>
                      <h2 className="sonic-h3 text-white leading-tight">Finde deine Sonic-Lösung</h2>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-3 mb-6">
                      <p className="text-xs font-black text-primary-500/70 uppercase tracking-widest whitespace-nowrap">
                        {currentQuestion + 1} / {surveyQuestions.length}
                      </p>
                      <div className="flex-1 h-px bg-white/10">
                        <div
                          className="h-full bg-primary-500 transition-all duration-500"
                          style={{ width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }}
                        />
                      </div>
                      <div className="flex gap-1.5">
                        {surveyQuestions.map((_, qi) => (
                          <div
                            key={qi}
                            className="h-1 transition-all duration-300"
                            style={{ width: qi <= currentQuestion ? '24px' : '8px', background: qi <= currentQuestion ? 'oklch(var(--primary-500))' : 'rgba(255,255,255,0.15)' }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Question */}
                    <h3 className="text-base md:text-lg font-black text-white mb-4 leading-snug">{surveyQuestions[currentQuestion].question}</h3>

                    <div className="space-y-2">
                      {surveyQuestions[currentQuestion].options.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => handleAnswer(opt)}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.03] backdrop-blur-[2px] border border-white/[0.06] text-left font-semibold text-white/80 hover:bg-primary-500/15 hover:border-primary-500/50 hover:text-white transition-all duration-200 cursor-pointer text-sm group"
                        >
                          <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center border border-white/20 group-hover:border-primary-500/60 group-hover:bg-primary-500/15 transition-all text-2xs font-black text-white/40 group-hover:text-primary-500">
                            {String.fromCharCode(65 + oi)}
                          </span>
                          <span className="min-w-0">{opt}</span>
                          <i className="ri-arrow-right-line ml-auto opacity-0 group-hover:opacity-80 transition-all text-sm text-primary-500 flex-shrink-0" />
                        </button>
                      ))}
                    </div>

                    {/* Back button (except first question) */}
                    {currentQuestion > 0 && (
                      <button
                        onClick={() => {
                          setCurrentQuestion(currentQuestion - 1);
                          setAnswers(answers.slice(0, -1));
                        }}
                        className="mt-4 text-xs font-bold text-white/40 hover:text-white/70 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <i className="ri-arrow-left-line"></i>
                        Zurück
                      </button>
                    )}
                  </>
                ) : showSurveyContact && !surveyDone ? (
                  /* ── Contact + data collection step ── */
                  <div>
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 bg-primary-500/15 border border-primary-500/30 px-3 py-1 mb-3">
                        <span className="text-xs font-black text-primary-500 uppercase tracking-[0.2em]">Kontakt</span>
                      </div>
                      <h2 className="sonic-h3 text-white leading-tight">Fast geschafft!</h2>
                      <p className="text-white/50 text-sm mt-1">Hinterlasse deine Daten — wir erstellen dein persönliches Ergebnis.</p>
                    </div>

                    <form data-readdy-form id="losungen-survey-form" onSubmit={(e) => { e.preventDefault(); handleSurveySubmit(); }} className="space-y-4">
                      {/* Honeypot */}
                      <input
                        id="survey-company-alt"
                        name="company_alt"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        readOnly
                        className="survey-hp-field"
                      />

                      {/* Name row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="losungen-anfrage-vorname" className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Vorname <span className="text-white/60">*</span></label>
                          <input autoComplete="given-name" aria-required="true" id="losungen-anfrage-vorname"
                            type="text"
                            name="vorname"
                            required
                            value={surveyName}
                            onChange={(e) => setSurveyName(e.target.value)}
                            placeholder="Max"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="losungen-anfrage-nachname" className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Nachname <span className="text-white/60">*</span></label>
                          <input autoComplete="family-name" aria-required="true" id="losungen-anfrage-nachname"
                            type="text"
                            name="nachname"
                            required
                            value={surveyLastName}
                            onChange={(e) => setSurveyLastName(e.target.value)}
                            placeholder="Mustermann"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="losungen-anfrage-email" className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">E-Mail <span className="text-white/60">*</span></label>
                          <input autoComplete="email" aria-required="true" id="losungen-anfrage-email"
                            type="email"
                            name="email"
                            required
                            value={surveyEmail}
                            onChange={(e) => setSurveyEmail(e.target.value)}
                            placeholder="max@unternehmen.de"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="losungen-anfrage-phone" className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Telefon</label>
                          <input autoComplete="tel" id="losungen-anfrage-phone"
                            type="tel"
                            name="phone"
                            value={surveyPhone}
                            onChange={(e) => setSurveyPhone(e.target.value)}
                            placeholder="+49 000 000000"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Company + Role */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="losungen-anfrage-unternehmen" className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Unternehmen</label>
                          <input autoComplete="organization" id="losungen-anfrage-unternehmen"
                            type="text"
                            name="unternehmen"
                            value={surveyCompany}
                            onChange={(e) => setSurveyCompany(e.target.value)}
                            placeholder="Dein Unternehmen GmbH"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="losungen-anfrage-position" className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Position</label>
                          <input autoComplete="organization-title" id="losungen-anfrage-position"
                            type="text"
                            name="position"
                            value={surveyRole}
                            onChange={(e) => setSurveyRole(e.target.value)}
                            placeholder="z. B. Marketing Manager"
                            className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label htmlFor="losungen-anfrage-budget" className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">Budget-Range (optional)</label>
                        <select id="losungen-anfrage-budget"
                          name="budget"
                          value={surveyBudget}
                          onChange={(e) => setSurveyBudget(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-primary-500 transition-colors cursor-pointer"
                        >
                          <option value="" className="bg-foreground-950 text-white">Bitte wählen...</option>
                          <option value="< 10.000 €" className="bg-foreground-950 text-white">&lt; 10.000 €</option>
                          <option value="10.000 – 50.000 €" className="bg-foreground-950 text-white">10.000 – 50.000 €</option>
                          <option value="50.000 – 100.000 €" className="bg-foreground-950 text-white">50.000 – 100.000 €</option>
                          <option value="100.000 – 250.000 €" className="bg-foreground-950 text-white">100.000 – 250.000 €</option>
                          <option value="250.000 €+" className="bg-foreground-950 text-white">250.000 €+</option>
                          <option value="Noch unklar" className="bg-foreground-950 text-white">Noch unklar</option>
                        </select>
                      </div>

                      {/* Notes */}
                      <div>
                        <label htmlFor="losungen-anfrage-notizen" className="block text-xs font-black text-primary-500 uppercase tracking-widest mb-1.5">
                          Zusätzliche Anmerkungen
                          <span className={`ml-2 font-normal normal-case ${surveyNotes.length > 400 ? 'text-red-400' : 'text-white/40'}`}>
                            {surveyNotes.length}/500
                          </span>
                        </label>
                        <textarea
                          id="losungen-anfrage-notizen"
                          name="notizen"
                          rows={3}
                          maxLength={500}
                          value={surveyNotes}
                          onChange={(e) => setSurveyNotes(e.target.value)}
                          placeholder="Erzähle uns kurz von deinem Projekt, deinen Zielen oder offenen Fragen..."
                          className="w-full px-3 py-2.5 bg-white/[0.06] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                        />
                      </div>

                      {/* Survey answers summary (hidden) */}
                      <input type="hidden" name="branche" value={answers[0] || ''} />
                      <input type="hidden" name="ziel" value={answers[1] || ''} />
                      <input type="hidden" name="standorte" value={answers[2] || ''} />
                      <input type="hidden" name="start" value={answers[3] || ''} />
                      <input type="hidden" name="erfahrung" value={answers[4] || ''} />

                      {surveyError && (
                        <p className="text-red-400 text-xs font-semibold flex items-center gap-1"><i className="ri-error-warning-line"></i>{surveyError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={surveySubmitting}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-500 text-foreground-950 font-black text-sm uppercase tracking-wider hover:bg-white hover:text-foreground-950 transition-all duration-300 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                        style={{ borderRadius: 0 }}
                      >
                        {surveySubmitting ? <><i className="ri-loader-4-line animate-spin"></i> Wird gesendet...</> : <><i className="ri-send-plane-line"></i> Ergebnis anfordern</>}
                      </button>
                      <p className="text-white/30 text-xs text-center">Kein Spam. Nur relevant für dein Projekt.</p>
                    </form>
                  </div>
                ) : (
                  /* ── Thank you state ── */
                  <div className="text-center py-6">
                    <div className="w-14 h-14 flex items-center justify-center bg-primary-500/20 border border-primary-500/40 mx-auto mb-4" style={{ borderRadius: 0 }}>
                      <i className="ri-check-double-line text-2xl text-primary-500"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2">Vielen Dank!</h3>
                    <p className="text-white/50 mb-6 text-sm max-w-md mx-auto">Wir melden uns zeitnah.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => openCalendly()}
                        className="inline-flex items-center gap-2 bg-primary-500 text-foreground-950 px-6 py-3 font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 cursor-pointer whitespace-nowrap text-xs uppercase tracking-wider"
                        style={{ borderRadius: 0 }}
                      >
                        <i className="ri-calendar-line"></i>
                        {cta.book}
                      </button>
                      <button
                        onClick={() => {
                          setSurveyExpanded(false);
                          setCurrentQuestion(0);
                          setAnswers([]);
                          setShowSurveyContact(false);
                          setSurveyDone(false);
                          setSurveyEmail('');
                          setSurveyPhone('');
                          setSurveyCompany('');
                          setSurveyName('');
                          setSurveyLastName('');
                          setSurveyRole('');
                          setSurveyBudget('');
                          setSurveyNotes('');
                          setSurveyError('');
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.06] border border-white/[0.10] text-white font-black text-xs uppercase tracking-wider hover:bg-white/[0.12] transition-all duration-300 cursor-pointer whitespace-nowrap"
                        style={{ borderRadius: 0 }}
                      >
                        <i className="ri-restart-line"></i>
                        Neu starten
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── FAQ ── (before the testimonials) */}
      <section className="sonic-section-lg px-6 bg-white">
        <div className="sonic-container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>FAQ</span>
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            </div>
            <h2 className="sonic-h2 text-foreground-950">Häufig gestellte <span className="v3-marker">Fragen</span></h2>
            <p className="text-foreground-500 text-base max-w-xl mx-auto leading-relaxed">Alles, was du über unsere Lösungen, unsere Arbeitsweise und den Start einer Zusammenarbeit wissen musst.</p>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border-2 overflow-hidden transition-all duration-300"
                style={{
                  borderRadius: 0,
                  borderColor: openFaq === index ? 'oklch(var(--primary-500))' : 'oklch(var(--background-200))',
                  boxShadow: openFaq === index ? '0 6px 30px rgba(200,212,0,0.12)' : 'none',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left cursor-pointer bg-white hover:bg-primary-50 transition-colors duration-200"
                >
                  <span className="text-lg font-black text-foreground-950 pr-6">{item.question}</span>
                  <div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-primary-500' : 'bg-foreground-100'}`} style={{ borderRadius: 0 }}>
                    <i className={`${openFaq === index ? 'ri-subtract-line text-foreground-950' : 'ri-add-line text-foreground-500'} text-xl`} />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: openFaq === index ? '600px' : '0' }}
                >
                  <div className="px-8 pb-7 bg-white border-t border-foreground-100">
                    <p className="text-foreground-600 leading-relaxed text-base pt-5">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 py-5 px-5 border border-foreground-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs md:text-sm text-foreground-500 text-center sm:text-left">Noch Fragen offen? Wir beantworten sie gerne persönlich.</p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Frage%20zu%20Sonic%20L%C3%B6sungen`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-500 hover:text-primary-500 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-mail-line text-sm"></i>Frage stellen
            </a>
          </div>
        </div>
      </section>

      <WoodenDivider />

      {/* ── CLIENT PROOF ── */}
      <ClientProof />

      <style>{`
        @keyframes expandIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .survey-hp-field {
          position: absolute;
          left: -9999px;
          top: -9999px;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
