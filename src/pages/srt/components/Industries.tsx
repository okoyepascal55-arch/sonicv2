import { useState } from 'react';
import SectionBadge from '@/components/base/SectionBadge';
import { useText } from '@/hooks/useText';

const USE_CASES = [
  { icon: 'ri-store-2-line', title: 'FMCG & Retail Execution', items: ['In-Store-Performance', 'Regal-Audits, Planogramm-Compliance', 'Koordination Merchandising-Teams', 'POS-Material-Bestand & Platzierungstracking'] },
  { icon: 'ri-heart-3-line', title: 'Beauty & Cosmetics', items: ['Einsätze von Beauty Advisors planen & steuern', 'Für Retail und Events', 'Tracking von Verbrauchsmaterial', 'Performance-Messung'] },
  { icon: 'ri-calendar-event-line', title: 'Event & Promotional Staffing', items: ['Personaleinsätze planen und steuern', 'Material- und Warenflüsse steuern & tracken', 'KPIs definieren', 'Erfolge messen, vergleichen und bewerten'] },
  { icon: 'ri-map-2-line', title: 'Field Sales & Territory Management', items: ['Regionen-basierte Einsatzplanung', 'Routenplanung und -optimierung', 'Besuchs- und Performance-Tracking', 'Analytics zu Mitarbeitern & Regionen'] },
  { icon: 'ri-tools-line', title: 'Technischer Support CE', items: ['Servicetechniker-Termin- und Tourenplanung', 'Service Level Definition, Routenplanung', 'Warenfluss tracken (Ersatzteile, Tauschgeräte)', 'Monitoring regionaler Abdeckung'] },
  { icon: 'ri-hospital-line', title: 'Gesundheit & Pflege', items: ['Pharmaberater: Regionen managen & vergleichen', 'Medizinprodukte: Produktdemo-Termine managen', 'Pflege: Hausbesuche planen und routen', 'Compliance / Dokumentationen'] },
];

const STEP1_INDUSTRIES = [
  { icon: 'ri-tv-line', label: 'Consumer Electronics' },
  { icon: 'ri-blaze-line', label: 'Haushaltsgeräte' },
  { icon: 'ri-run-line', label: 'Sport & Outdoor' },
  { icon: 'ri-heart-3-line', label: 'Kosmetik' },
  { icon: 'ri-restaurant-line', label: 'Food & Beverages' },
];
const STEP2_CHALLENGES = [
  { icon: 'ri-database-2-line', label: 'Datensilos zusammenführen' },
  { icon: 'ri-eye-off-line', label: 'Keine Live-Transparenz' },
  { icon: 'ri-time-line', label: 'Reports kommen zu spät' },
  { icon: 'ri-money-euro-circle-line', label: 'ROI schwer messbar' },
];
const STEP3_GOALS = [
  { icon: 'ri-dashboard-line', label: 'Live-Dashboard aufbauen' },
  { icon: 'ri-line-chart-line', label: 'Absatz steigern' },
  { icon: 'ri-team-line', label: 'Field Force steuern' },
  { icon: 'ri-file-chart-line', label: 'Reporting automatisieren' },
];

const stepLabels = ['Branche', 'Challenge', 'Ziel', 'Kontakt'];
const FORM_URL = 'https://readdy.ai/api/form/d9n5kk68mbnljin59tvg';

export default function Industries() {
  const tBadge = useText('srt_industries', 'srt-industries-badge', 'Branchen & Use Cases');
  const tHeading = useText('srt_industries', 'srt-industries-heading', 'VON RETAIL EXECUTION BIS HEALTHCARE.');
  const tSub = useText('srt_industries', 'srt-industries-sub', '');
  const tCta = useText('srt_industries', 'srt-industries-cta', 'Deine SRT-Konfiguration finden');

  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleSelect = (val: string) => { setSelected((prev) => ({ ...prev, [step]: val })); };
  const handleNext = () => { if (step < 4) setStep((s) => s + 1); };
  const handleBack = () => { if (step > 1) setStep((s) => s - 1); };

  const openModal = () => { setModalOpen(true); setStep(1); setSelected({}); setSubmitted(false); setFormStatus('idle'); setFormError(''); setCharCount(0); };
  const closeModal = () => setModalOpen(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.querySelector('[name="website_alt"]') as HTMLInputElement)?.value?.trim();
    if (honeypot) {
      setFormStatus('success');
      setSubmitted(true);
      return;
    }
    if (charCount > 500) return;

    setFormStatus('submitting');
    setFormError('');
    try {
      const formData = new FormData(form);
      formData.append('branche', selected[1] || '');
      formData.append('challenge', selected[2] || '');
      formData.append('ziel', selected[3] || '');
      formData.append('_subject', `SRT Beratung — ${selected[1] || 'Unbekannt'}`);

      const body = new URLSearchParams();
      formData.forEach((val, key) => { body.append(key, val as string); });

      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      const responseText = await res.text();
      let parsed: Record<string, unknown> = {};
      try { parsed = JSON.parse(responseText); } catch { /* raw */ }

      if (res.ok && parsed?.code === 'OK') {
        setFormStatus('success');
        setSubmitted(true);
      } else {
        const serverMsg = (parsed?.meta as Record<string, string>)?.message
          || (parsed?.message as string)
          || (parsed?.meta as Record<string, string>)?.detail
          || responseText
          || 'Ein Fehler ist aufgetreten.';
        if (typeof serverMsg === 'string' && (serverMsg.includes('spam') || serverMsg.includes('form data is spam'))) {
          setFormStatus('success');
          setSubmitted(true);
        } else {
          setFormStatus('error');
          setFormError(typeof serverMsg === 'string' ? serverMsg : 'Ein Fehler ist aufgetreten.');
        }
      }
    } catch {
      setFormStatus('error');
      setFormError('Netzwerkfehler. Bitte versuche es erneut.');
    }
  };

  const currentList = step === 1 ? STEP1_INDUSTRIES : step === 2 ? STEP2_CHALLENGES : step === 3 ? STEP3_GOALS : [];

  return (
    <section id="branchen" className="py-20 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Use Cases ── */}
        <div className="mb-16">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <SectionBadge text={tBadge} variant="dark" />
            </div>
            <div className="grid lg:grid-cols-2 gap-6 items-end mb-5">
              <h2 className="font-black text-foreground-950 leading-tight tracking-tight" style={{ fontSize: 'clamp(26px,3.5vw,40px)' }}>
                VON RETAIL EXECUTION BIS <span className="text-primary-500">HEALTHCARE.</span>
              </h2>
              <p className="text-sm text-foreground-600 leading-relaxed lg:pb-1">
                Das SRT ist bereit für jedes Projekt, bei dem Menschen zielorientiert und koordiniert eingesetzt werden.
              </p>
            </div>
          </div>

          {/* Use case cards — pure white bg, lime accents */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="bg-white border-2 border-background-200/60 p-5 group hover:border-primary-500/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-primary-500/10 flex-shrink-0 group-hover:bg-primary-500/15 transition-colors duration-300">
                    <i className={`${uc.icon} text-primary-500 text-base`} />
                  </div>
                  <h3 className="text-sm font-black text-foreground-950 leading-snug tracking-tight">{uc.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {uc.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-primary-500 flex-shrink-0 mt-1.5" />
                      <span className="text-xs text-foreground-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Config CTA button ── */}
        <div className="text-center">
          <p className="text-sm text-foreground-700 mb-4">Noch unsicher, wie das SRT zu deinem Use Case passt?</p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-3 bg-primary-500 text-foreground-950 px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-foreground-950 hover:text-primary-500 transition-all duration-300 cursor-pointer whitespace-nowrap group"
          >
            <i className="ri-compass-3-line text-base" />
            {tCta}
            <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* ── SRT-Konfiguration Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4" onClick={closeModal}>
          <div className="absolute inset-0 bg-foreground-950/70 animate-fadeIn" />
          <div
            className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 animate-fadeIn"
            style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top lime accent */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

            {/* Close button */}
            <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-foreground-400 hover:text-foreground-950 transition-colors cursor-pointer z-10">
              <i className="ri-close-line text-xl" />
            </button>

            <div className="p-8 md:p-10">
              {/* Step indicators */}
              <div className="flex items-center justify-center gap-1 mb-8">
                {stepLabels.map((label, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-black text-xs transition-all duration-400"
                        style={{
                          background: i + 1 <= step ? 'oklch(var(--primary-500))' : 'oklch(var(--background-100))',
                          color: i + 1 <= step ? 'oklch(var(--foreground-950))' : 'oklch(var(--foreground-400))',
                        }}>
                        {i + 1 < step ? <i className="ri-check-line text-sm" /> : i + 1}
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider mt-1 ${i + 1 === step ? 'text-primary-500' : 'text-foreground-500'}`}>
                        {label}
                      </span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div className="w-6 sm:w-8 h-px mb-4 transition-all duration-400"
                        style={{ background: i + 1 < step ? 'oklch(var(--primary-500))' : 'oklch(var(--background-200))' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Success state */}
              {submitted && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-5"
                    style={{ background: '#C8D400', boxShadow: '0 8px 28px rgba(200,212,0,0.4)' }}>
                    <i className="ri-check-double-line text-3xl text-foreground-950" />
                  </div>
                  <h3 className="text-xl font-black text-foreground-950 mb-2 uppercase">Anfrage erhalten!</h3>
                  <p className="text-foreground-600 text-sm mb-1"><strong>{selected[1]}</strong> · {selected[2]} · {selected[3]}</p>
                  <p className="text-foreground-500 text-xs mb-6">Wir melden uns innerhalb von 24 Stunden.</p>
                  <button onClick={closeModal} className="text-sm text-foreground-500 hover:text-foreground-700 underline cursor-pointer">Schließen</button>
                </div>
              )}

              {/* Steps 1-3 */}
              {!submitted && step <= 3 && (
                <div>
                  <h3 className="text-lg font-black text-foreground-950 mb-1 leading-tight">
                    {step === 1 && 'In welcher Branche bist du aktiv?'}
                    {step === 2 && 'Was ist deine größte Herausforderung?'}
                    {step === 3 && 'Was ist dein Hauptziel?'}
                  </h3>
                  <p className="text-xs text-foreground-500 mb-5">Wähle eine Option</p>
                  <div className="grid gap-2 mb-8">
                    {currentList.map((item) => {
                      const isSel = selected[step] === item.label;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => handleSelect(item.label)}
                          className="flex items-center gap-3 p-3 text-left cursor-pointer transition-all duration-200 group w-full bg-white"
                          style={{
                            border: isSel ? '2px solid oklch(var(--primary-500))' : '2px solid oklch(var(--background-200) / 0.6)',
                          }}>
                          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                            style={{ background: isSel ? 'oklch(var(--primary-500))' : 'oklch(var(--background-100))' }}>
                            <i className={`${item.icon} text-base ${isSel ? 'text-foreground-950' : 'text-foreground-600'}`} />
                          </div>
                          <span className={`font-bold text-sm flex-1 ${isSel ? 'text-foreground-950' : 'text-foreground-800'}`}>{item.label}</span>
                          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                            style={{ background: isSel ? 'oklch(var(--primary-500))' : 'transparent', border: isSel ? '2px solid oklch(var(--primary-500))' : '2px solid oklch(var(--background-300))' }}>
                            {isSel && <i className="ri-check-line text-foreground-950 text-xs font-black" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={handleBack} disabled={step === 1}
                      className="px-4 py-2 border-2 border-background-300/60 font-bold text-xs text-foreground-600 hover:border-foreground-500 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap">
                      &larr; Zurück
                    </button>
                    <button type="button" onClick={handleNext} disabled={!selected[step]}
                      className="flex items-center gap-2 bg-primary-500 text-foreground-950 px-6 py-2.5 font-black text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap hover:bg-foreground-950 hover:text-primary-500">
                      Weiter <i className="ri-arrow-right-line" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact form */}
              {!submitted && step === 4 && (
                <div>
                  <h3 className="text-lg font-black text-foreground-950 mb-1 leading-tight">Fast geschafft — deine Kontaktdaten</h3>
                  <p className="text-xs text-foreground-500 mb-5">Wir melden uns innerhalb von 24 Stunden.</p>

                  {/* Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                    {[
                      { label: 'Branche', val: selected[1] || '—', icon: 'ri-building-line' },
                      { label: 'Herausforderung', val: selected[2] || '—', icon: 'ri-error-warning-line' },
                      { label: 'Ziel', val: selected[3] || '—', icon: 'ri-flag-2-line' },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#FAFDF5] border-2 border-background-200/60 p-3 text-center">
                        <div className="w-6 h-6 flex items-center justify-center mx-auto mb-1 bg-primary-500/10">
                          <i className={`${item.icon} text-primary-500 text-sm`} />
                        </div>
                        <div className="text-[9px] font-black text-foreground-500 uppercase tracking-widest mb-0.5">{item.label}</div>
                        <div className="text-xs font-bold text-foreground-950 leading-tight">{item.val}</div>
                      </div>
                    ))}
                  </div>

                  {formStatus === 'error' && (
                    <div className="mb-4 p-3 text-center text-red-600 text-sm font-semibold bg-red-50 border border-red-200">
                      {formError || 'Etwas ist schiefgelaufen.'}
                    </div>
                  )}

                  <form id="srt-survey-form" data-readdy-form onSubmit={handleFormSubmit} className="space-y-4">
                    <input type="text" name="website_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly
                      className="survey-hp-field" />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="srt-name" className="block text-[10px] font-black text-foreground-600 uppercase tracking-widest mb-1">Name *</label>
                        <input id="srt-name" type="text" name="name" required
                          className="w-full px-3 py-2.5 bg-white border-2 border-background-300/60 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                          style={{ borderRadius: 0 }} placeholder="Max Mustermann" />
                      </div>
                      <div>
                        <label htmlFor="srt-email" className="block text-[10px] font-black text-foreground-600 uppercase tracking-widest mb-1">E-Mail *</label>
                        <input id="srt-email" type="email" name="email" required
                          className="w-full px-3 py-2.5 bg-white border-2 border-background-300/60 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                          style={{ borderRadius: 0 }} placeholder="max@unternehmen.de" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="srt-company" className="block text-[10px] font-black text-foreground-600 uppercase tracking-widest mb-1">Unternehmen</label>
                      <input id="srt-company" type="text" name="company"
                        className="w-full px-3 py-2.5 bg-background-50 border-2 border-background-300/60 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                        style={{ borderRadius: 0 }} placeholder="Dein Unternehmen GmbH" />
                    </div>

                    <div>
                      <label htmlFor="srt-message" className="block text-[10px] font-black text-foreground-600 uppercase tracking-widest mb-1">
                        Nachricht <span className={`font-normal normal-case ${charCount > 480 ? 'text-red-400' : 'text-foreground-500'}`}>{charCount}/500</span>
                      </label>
                      <textarea id="srt-message" name="message" rows={3} maxLength={500}
                        onChange={(e) => setCharCount(e.target.value.length)}
                        className="w-full px-3 py-2.5 bg-background-50 border-2 border-background-300/60 text-sm focus:outline-none focus:border-primary-500 transition-colors resize-none"
                        style={{ borderRadius: 0 }} placeholder="Beschreibe kurz dein Projekt..." />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button type="button" onClick={handleBack}
                        className="px-4 py-2 border-2 border-background-300/60 font-bold text-xs text-foreground-600 hover:border-foreground-500 transition-colors cursor-pointer whitespace-nowrap">
                        &larr; Zurück
                      </button>
                      <button type="submit" disabled={formStatus === 'submitting' || charCount > 500}
                        className="flex items-center gap-2 bg-primary-500 text-foreground-950 px-6 py-2.5 font-black text-xs uppercase tracking-wider hover:bg-foreground-950 hover:text-primary-500 transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                        {formStatus === 'submitting' ? (
                          <><i className="ri-loader-4-line animate-spin" /> Wird gesendet...</>
                        ) : (
                          <><i className="ri-calendar-line" /> Beratungsgespräch anfragen</>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}