import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import WoodenButton from '@/components/base/WoodenButton';
import { submitContactForm } from '@/lib/contact';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizStep {
  id: number;
  question: string;
  options: { label: string; icon: string; result: string; }[];
}

const quizSteps: QuizStep[] = [
  {
    id: 1,
    question: 'Was ist deine größte Herausforderung im DACH-Markt?',
    options: [
      { label: 'Markteintritt', icon: 'ri-rocket-line', result: 'market-entry' },
      { label: 'Retail-Präsenz ausbauen', icon: 'ri-store-3-line', result: 'retail-pos' },
      { label: 'Qualifiziertes Personal finden', icon: 'ri-team-line', result: 'staffing' },
      { label: 'Event- & Messeumsetzung', icon: 'ri-calendar-event-line', result: 'events' },
    ],
  },
  {
    id: 2,
    question: 'In welcher Phase stehst du gerade?',
    options: [
      { label: 'Einstieg planen', icon: 'ri-lightbulb-line', result: 'planning' },
      { label: 'Bereits aktiv', icon: 'ri-line-chart-line', result: 'active' },
      { label: 'Performance optimieren', icon: 'ri-settings-3-line', result: 'optimizing' },
      { label: 'Operationen ausbauen', icon: 'ri-arrow-right-up-line', result: 'expanding' },
    ],
  },
  {
    id: 3,
    question: 'Was ist gerade deine Priorität?',
    options: [
      { label: 'Schneller Markteintritt', icon: 'ri-flashlight-line', result: 'speed' },
      { label: 'Kosteneffizienz', icon: 'ri-money-euro-circle-line', result: 'cost' },
      { label: 'Qualität & Compliance', icon: 'ri-shield-check-line', result: 'quality' },
      { label: 'Daten & Insights', icon: 'ri-bar-chart-box-line', result: 'data' },
    ],
  },
];

const resultMapping: Record<string, { title: string; description: string; service: string; link: string }> = {
  'market-entry': { title: 'Markteintritts-Strategie', description: 'Du brauchst einen erprobten Partner, der dich durch DACH-Regularien, Handelsbeziehungen und lokale Marktdynamiken führt.', service: 'Markteintritts-Lösungen', link: '/losungen?open=markteintritt' },
  'retail-pos': { title: 'Retail- & POS-Excellence', description: 'Baue deine Retail-Präsenz mit professionellem Merchandising, POS-Umsetzung und In-Store-Performance-Optimierung aus.', service: 'Retail- & POS-Services', link: '/leistungen/pos-full-service' },
  staffing: { title: 'Staffing-Lösungen', description: 'Zugriff auf qualifizierte, geschulte Sales-Promoter und Markenbotschafter, die deine Marke in ganz DACH vertreten.', service: 'Staffing-Services', link: '/leistungen/staff-as-a-service' },
  events: { title: 'Events & Messen', description: 'Führe Events und Messen mit erfahrenem Personal, Logistik-Support und Echtzeit-Reporting reibungslos durch.', service: 'Event-Services', link: '/leistungen/events-messen' },
};

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [contactData, setContactData] = useState({ email: '', phone: '' });
  const [contactError, setContactError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // ── Focus trap ────────────────────────────────────────────────────────────
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setCurrentStep(0);
      setSelectedAnswers([]);
      setShowContactForm(false);
      setShowResult(false);
      setHoveredOption(null);
      setContactData({ email: '', phone: '' });
      setContactError('');
      // Auto-focus close button after modal animation
      const t = setTimeout(() => closeButtonRef.current?.focus(), 80);
      return () => clearTimeout(t);
    } else {
      // Restore focus to the element that triggered the modal
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Escape to close + Tab focus trap
  const handleModalKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, [onClose]);

  if (!isOpen) return null;

  const handleClose = () => { onClose(); };

  const handleOptionClick = (result: string, stepIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[stepIndex] = result;
    setSelectedAnswers(newAnswers);
    setTimeout(() => {
      if (currentStep < quizSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowContactForm(true);
      }
    }, 300);
  };

  const handleContactSubmit = async () => {
    if (!contactData.email || !contactData.email.includes('@')) {
      setContactError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    setContactError('');
    setSubmitting(true);
    try {
      const honeypot = (document.getElementById('quiz-phone-alt') as HTMLInputElement)?.value?.trim();
      if (honeypot) { setShowResult(true); setSubmitting(false); return; }
      await submitContactForm({
        email: contactData.email,
        phone: contactData.phone.trim(),
        recommendation: selectedAnswers[0] || '',
        stage: selectedAnswers[1] || '',
        priority: selectedAnswers[2] || '',
        subject: 'Quiz-Empfehlung: ' + (getRecommendedService().title),
      });
    } catch { /* non-critical */ }
    setSubmitting(false);
    setShowContactForm(false);
    setShowResult(true);
  };

  const handleReset = () => { setCurrentStep(0); setSelectedAnswers([]); setShowContactForm(false); setShowResult(false); setContactData({ email: '', phone: '' }); };

  const getRecommendedService = () => {
    const primaryChallenge = selectedAnswers[0];
    return resultMapping[primaryChallenge] || resultMapping['market-entry'];
  };

  const progress = ((currentStep + (showContactForm ? 1 : 0) + (showResult ? 1 : 0)) / (quizSteps.length + 1)) * 100;

  const modalContent = (
    <div
      className="fixed inset-0 z-system flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sonic Lösungs-Quiz"
      onKeyDown={handleModalKeyDown}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]" onClick={handleClose} aria-hidden="true" />
      <div ref={modalRef} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl animate-[slideUp_0.3s_ease]" style={{ borderRadius: 0 }}>
        {/* Close — 44×44 minimum touch target — more visible now */}
        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-11 h-11 flex items-center justify-center bg-foreground-950 hover:bg-primary-500 text-white hover:text-foreground-950 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-95 shadow-lg"
          style={{ borderRadius: 0 }}
          aria-label="Quiz schließen"
        >
          <i className="ri-close-line text-lg" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-primary-500/15" style={{ borderRadius: 0 }}>
              <i className="ri-question-line text-xl text-foreground-950" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary-500 uppercase tracking-wider">Kurz-Check</p>
              <p className="text-sm text-foreground-500">Finde deine passende Sonic-Lösung</p>
            </div>
          </div>
          {/* Progress */}
          <div className="h-1.5 bg-foreground-100 overflow-hidden" style={{ borderRadius: 0 }}>
            <div className="h-full bg-primary-500 transition-all duration-500 ease-out" style={{ width: `${showResult ? 100 : progress}%` }} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-bold text-foreground-400 uppercase tracking-wide">
              {showResult ? 'Fertig' : showContactForm ? 'Kontaktdaten' : `Schritt ${currentStep + 1} von ${quizSteps.length}`}
            </span>
            <span className="text-xs font-bold text-primary-500">{Math.round(showResult ? 100 : progress)}%</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {!showContactForm && !showResult ? (
            <div>
              <h3 className="text-xl font-black text-foreground-950 mb-6">{quizSteps[currentStep].question}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3">
                {quizSteps[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.result, currentStep)}
                    onMouseEnter={() => setHoveredOption(index)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className="group relative p-5 transition-all duration-300 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-95"
                    style={{
                      background: '#fff',
                      border: hoveredOption === index ? '2px solid oklch(var(--primary-500))' : '2px solid #f0f0f0',
                      borderRadius: 0,
                      boxShadow: hoveredOption === index
                        ? '0 10px 28px rgba(200,212,0,0.2), 0 4px 10px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)'
                        : '0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
                      transform: hoveredOption === index ? 'translateY(-3px)' : 'translateY(0)',
                    }}
                  >
                    {/* Left lime accent on hover */}
                    <div
                      className="absolute left-0 top-0 bottom-0 transition-all duration-300"
                      style={{ width: hoveredOption === index ? '3px' : '0px', background: 'oklch(var(--primary-500))' }}
                    />
                    <div className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: hoveredOption === index ? 'oklch(var(--primary-500))' : '#f3f4f6',
                          boxShadow: hoveredOption === index
                            ? '0 4px 12px rgba(200,212,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)'
                            : '0 2px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                        }}
                      >
                        <i className={`${option.icon} text-xl transition-colors duration-300 ${hoveredOption === index ? 'text-foreground-950' : 'text-foreground-500'}`} />
                      </div>
                      <p className="font-bold text-foreground-950 text-sm flex-1">{option.label}</p>
                      <i className={`ri-arrow-right-line text-base transition-all duration-300 ${hoveredOption === index ? 'text-primary-500 translate-x-1' : 'text-foreground-300'}`} />
                    </div>
                  </button>
                ))}
              </div>
              {currentStep > 0 && (
                <div className="text-center mt-5">
                  <button onClick={() => setCurrentStep(currentStep - 1)} className="inline-flex items-center gap-2 text-foreground-400 hover:text-primary-500 font-semibold text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                    <i className="ri-arrow-left-line" /> Zurück
                  </button>
                </div>
              )}
            </div>
          ) : showContactForm ? (
            // Contact capture step
            <div>
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-primary-500/15 border-2 border-primary-500/30 flex items-center justify-center mx-auto mb-4" style={{ borderRadius: 0 }}>
                  <i className="ri-user-line text-2xl text-primary-500" />
                </div>
                <h3 className="text-xl font-black text-foreground-950 mb-2 uppercase">Fast geschafft!</h3>
                <p className="text-foreground-500 text-sm">Gib deine Kontaktdaten ein, um deine persönliche Empfehlung zu sehen.</p>
              </div>

              <div className="space-y-4 mb-6">
                <input
                  id="quiz-phone-alt"
                  name="phone_alt"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                  className="survey-hp-field"
                />
                <div>
                  <label className="block text-xs font-black text-foreground-950 uppercase tracking-widest mb-2">E-Mail-Adresse <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="your@company.com"
                      className="w-full pl-9 pr-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] focus-visible:ring-offset-2 focus:border-primary-500 transition-colors"
                      style={{ borderRadius: 0 }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-foreground-950 uppercase tracking-widest mb-2">Telefonnummer <span className="text-foreground-400 font-normal">(Optional)</span></label>
                  <div className="relative">
                    <i className="ri-phone-line absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
                    <input
                      type="tel"
                      name="phone"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="+49 000 000 0000"
                      className="w-full pl-9 pr-4 py-3 border-2 border-foreground-200 text-sm text-foreground-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8D400] focus-visible:ring-offset-2 focus:border-primary-500 transition-colors"
                      style={{ borderRadius: 0 }}
                    />
                  </div>
                </div>
                {contactError && (
                  <p className="text-red-500 text-xs font-semibold flex items-center gap-1"><i className="ri-error-warning-line" />{contactError}</p>
                )}
              </div>

              <button
                onClick={handleContactSubmit}
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-foreground-950 text-white font-black text-sm uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all duration-300 cursor-pointer disabled:opacity-50 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-95"
                style={{ borderRadius: 0 }}
              >
                {submitting ? <><i className="ri-loader-4-line animate-spin" /> Wird verarbeitet…</> : <><i className="ri-lightbulb-flash-line" /> Meine Empfehlung ansehen</>}
              </button>
              <p className="text-center text-xs text-foreground-400 mt-3">Kein Spam. Wir melden uns nur, wenn es für deine Herausforderung relevant ist.</p>
            </div>
          ) : (
            // Result
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500/15 flex items-center justify-center mx-auto mb-5" style={{ borderRadius: 0 }}>
                <i className="ri-lightbulb-flash-line text-3xl text-primary-500" />
              </div>
              <h3 className="text-2xl font-black text-foreground-950 mb-3">
                Unsere Empfehlung: <span className="text-primary-500">{getRecommendedService().title}</span>
              </h3>
              <div className="bg-white border border-foreground-200 p-5 mb-6 text-left">
                <p className="text-xs font-black text-primary-500 uppercase tracking-[0.2em] mb-2">Ihre Empfohlene Lösung</p>
                <h4 className="text-lg font-black text-foreground-950 mb-2">{getRecommendedService().title}</h4>
                <p className="text-foreground-500 text-sm leading-relaxed">{getRecommendedService().description}</p>
              </div>
              <p className="text-foreground-500 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                Buch jetzt ein kostenloses Beratungsgespräch, um deine passende Lösung im Detail zu besprechen.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://calendly.com/sonic-group/beratungsgespraech"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 text-white font-black text-sm transition-all duration-300 whitespace-nowrap cursor-pointer uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                  style={{ borderRadius: 0 }}
                >
                  <i className="ri-calendar-check-line text-base mr-1"></i>
                  Beratungsgespräch buchen
                  <i className="ri-arrow-right-line text-lg" />
                </a>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-foreground-950 font-black text-sm transition-all duration-300 whitespace-nowrap cursor-pointer border-2 border-foreground-200 hover:border-primary-500 uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 active:scale-95"
                  style={{ borderRadius: 0 }}
                >
                  <i className="ri-refresh-line text-lg" /> Neu starten
                </button>
              </div>
              <div className="mt-6 pt-5 border-t border-foreground-100">
                <p className="text-sm text-foreground-400 mb-2">Nicht ganz passend?</p>
                <a href="https://calendly.com/sonic-group/beratungsgespraech" target="_blank" rel="noopener noreferrer" onClick={handleClose} className="text-primary-500 hover:text-[#a8b300] font-semibold text-sm transition-colors cursor-pointer">
                  Direkt mit unserem Team sprechen →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );

  return createPortal(modalContent, document.body);
}