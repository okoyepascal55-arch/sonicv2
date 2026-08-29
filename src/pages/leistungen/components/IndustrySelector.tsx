import { useState } from 'react';
import WoodenButton from '@/components/base/WoodenButton';
import { submitContactForm } from '@/lib/contact';

const BRANCHES = [
  { label: 'Consumer Electronics', icon: 'ri-tv-line' },
  { label: 'Haushaltsgeräte', icon: 'ri-blaze-line' },
  { label: 'Beauty & Kosmetik', icon: 'ri-seedling-line' },
  { label: 'Sport & Outdoor', icon: 'ri-run-line' },
  { label: 'Lebensmittel & Getränke', icon: 'ri-restaurant-line' },
  { label: 'Pharma & Gesundheit', icon: 'ri-heart-pulse-line' },
];

const TEAM_SIZES = ['1–10', '11–50', '51–200', '200+'];

const LEISTUNGEN = [
  { label: 'SRT & Forecasting', icon: 'ri-bar-chart-2-line' },
  { label: 'POS Full Service', icon: 'ri-store-2-line' },
  { label: 'Live Video Promotion', icon: 'ri-live-line' },
  { label: 'Staff as a Service', icon: 'ri-team-line' },
  { label: 'Events & Messen', icon: 'ri-calendar-event-line' },
  { label: 'Warehouse & Logistik', icon: 'ri-truck-line' },
];

const TOTAL_STEPS = 4;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function IndustrySelector() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState('');

  const openModal = () => {
    setStep(0);
    setBranch('');
    setTeamSize('');
    setServices([]);
    setName('');
    setCompany('');
    setEmail('');
    setStatus('idle');
    setFormError('');
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const selectBranch = (value: string) => {
    setBranch(value);
    window.setTimeout(() => setStep(1), 280);
  };

  const selectTeamSize = (value: string) => {
    setTeamSize(value);
    window.setTimeout(() => setStep(2), 280);
  };

  const toggleService = (value: string) => {
    setServices((prev) =>
      prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value],
    );
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot — bots that fill it get the same "success" UI, no real submission
    const honeypot = String(fd.get('company_alt') ?? '').trim();
    if (honeypot) {
      setStatus('success');
      setFormError('');
      return;
    }

    setStatus('submitting');
    setFormError('');

    try {
      const data: Record<string, string> = {};
      fd.forEach((value, key) => {
        if (typeof value === 'string') data[key] = value;
      });

      await submitContactForm(data);
      setStatus('success');
      setFormError('');
    } catch {
      setStatus('error');
      setFormError('Netzwerkfehler. Bitte prüfe deine Verbindung und versuche es erneut.');
    }
  };

  const questionLabel =
    step === 0
      ? 'In welcher Branche bist du aktiv?'
      : step === 1
        ? 'Wie groß ist dein Team im Vertrieb / Feld?'
        : step === 2
          ? 'Welche Leistungen interessieren dich?'
          : 'Wo dürfen wir dich erreichen?';

  return (
    <section className="sonic-section-md md:px-4 md:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Compact CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 border border-foreground-200 bg-background-50 px-6 md:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 flex items-center justify-center bg-primary-500 text-foreground-950 flex-shrink-0">
              <i className="ri-building-line text-lg"></i>
            </div>
            <div>
              <h3 className="text-sm font-black text-foreground-950 uppercase tracking-wide">
                Deine Branche
              </h3>
              <p className="text-xs text-foreground-500 leading-relaxed mt-0.5">
                In 60 Sekunden herausfinden, wie wir deine Retail-Aktivierung unterstützen.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 flex-shrink-0"
          >
            Branchen-Check starten
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Deine Branche"
        >
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} aria-hidden="true" />

          <div className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white border border-foreground-200">
            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Schließen"
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-foreground-600 hover:text-foreground-950 hover:bg-foreground-100 cursor-pointer transition-colors duration-200"
            >
              <i className="ri-close-line text-lg"></i>
            </button>

            {status === 'success' ? (
              <div className="px-6 md:px-8 py-12 text-center">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-500 mx-auto mb-4">
                  <i className="ri-check-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-foreground-950 tracking-tight leading-snug">
                  Vielen Dank!
                </h3>
                <p className="text-sm text-foreground-600 leading-relaxed mt-2 max-w-md mx-auto">
                  Deine Angaben sind bei uns eingegangen. Wir melden uns in Kürze mit einer ersten
                  Einschätzung zu deiner Branche.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-primary-600"
                >
                  Schließen
                </button>
              </div>
            ) : (
              <form
                data-readdy-form
                onSubmit={handleSubmit}
                className="px-5 md:px-8 py-6 md:py-8"
              >
                {/* Hidden answer carriers (also collected into FormData on submit) */}
                <input type="hidden" name="branche" value={branch} />
                <input type="hidden" name="unternehmen" value={company} />
                <input type="hidden" name="team_groesse" value={teamSize} />
                <input type="hidden" name="leistungen" value={services.join(', ')} />
                {/* Anti-spam honeypot */}
                <input
                  type="text"
                  name="company_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                  className="survey-hp-field"
                />

                {/* Progress header */}
                <div className="flex items-center justify-between gap-4 mb-5 pr-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary-500" aria-hidden="true"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-500">
                      Deine Branche
                    </span>
                  </div>
                  <span className="text-xs font-black text-foreground-400 uppercase tracking-wider">
                    Schritt {step + 1} / {TOTAL_STEPS}
                  </span>
                </div>

                <div className="h-1 w-full bg-foreground-100 mb-6 overflow-hidden">
                  <div
                    className="h-full bg-primary-500 transition-all duration-500 ease-out"
                    style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                  />
                </div>

                <h3 className="text-lg md:text-xl font-black text-foreground-950 leading-snug">
                  {questionLabel}
                </h3>

                {/* Step 0 — Branche */}
                {step === 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {BRANCHES.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => selectBranch(opt.label)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border cursor-pointer whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                          branch === opt.label
                            ? 'bg-primary-500 border-primary-500 text-white'
                            : 'bg-white border-foreground-200 text-foreground-600 hover:border-primary-500/60 hover:text-foreground-950'
                        }`}
                      >
                        <i className={`${opt.icon} text-base ${branch === opt.label ? 'text-white' : 'text-primary-500'}`}></i>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 1 — Teamgröße */}
                {step === 1 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {TEAM_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => selectTeamSize(size)}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border cursor-pointer whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                          teamSize === size
                            ? 'bg-primary-500 border-primary-500 text-white'
                            : 'bg-white border-foreground-200 text-foreground-600 hover:border-primary-500/60 hover:text-foreground-950'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 2 — Leistungen (multi) */}
                {step === 2 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {LEISTUNGEN.map((opt) => {
                      const isOn = services.includes(opt.label);
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => toggleService(opt.label)}
                          aria-pressed={isOn}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border cursor-pointer whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                            isOn
                              ? 'bg-primary-500 border-primary-500 text-white'
                              : 'bg-white border-foreground-200 text-foreground-600 hover:border-primary-500/60 hover:text-foreground-950'
                          }`}
                        >
                          <i className={`${opt.icon} text-base ${isOn ? 'text-white' : 'text-primary-500'}`}></i>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 3 — Kontakt */}
                {step === 3 && (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div>
                      <label
                        htmlFor="survey-name"
                        className="block text-[11px] font-black uppercase tracking-wider text-foreground-600 mb-1.5"
                      >
                        Name *
                      </label>
                      <input
                        id="survey-name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dein Name"
                        required
                        className="w-full px-4 py-2.5 text-sm bg-white border border-foreground-200 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="survey-company"
                        className="block text-[11px] font-black uppercase tracking-wider text-foreground-600 mb-1.5"
                      >
                        Unternehmen
                      </label>
                      <input
                        id="survey-company"
                        type="text"
                        name="company_display"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Muster GmbH"
                        className="w-full px-4 py-2.5 text-sm bg-white border border-foreground-200 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="survey-email"
                        className="block text-[11px] font-black uppercase tracking-wider text-foreground-600 mb-1.5"
                      >
                        E-Mail *
                      </label>
                      <input
                        id="survey-email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="du@unternehmen.de"
                        required
                        className="w-full px-4 py-2.5 text-sm bg-white border border-foreground-200 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Error message */}
                {formError && (
                  <p className="text-sm font-semibold text-red-600 mt-4" role="alert">
                    {formError}
                  </p>
                )}

                {/* Nav / actions */}
                <div className="flex items-center justify-between gap-3 mt-6">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-foreground-500 hover:text-foreground-950 cursor-pointer whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      <i className="ri-arrow-left-line"></i>
                      Zurück
                    </button>
                  ) : (
                    <span />
                  )}

                  {step === 2 ? (
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      disabled={services.length === 0}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-primary-600 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      Weiter
                      <i className="ri-arrow-right-line"></i>
                    </button>
                  ) : step === 3 ? (
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white font-black text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap transition-colors duration-300 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      {status === 'submitting' ? (
                        <>
                          <i className="ri-loader-4-line animate-spin"></i>
                          Wird gesendet…
                        </>
                      ) : (
                        <>
                          Anfrage senden
                          <i className="ri-send-plane-line"></i>
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}