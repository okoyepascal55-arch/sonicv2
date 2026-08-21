import { useState } from 'react';

const FORM_SUBMIT_ADDR = 'https://readdy.ai/api/form/d9vgg8u859p3u981dq10';

const BRANCHES = [
  { label: 'Consumer Electronics', icon: 'ri-tv-line' },
  { label: 'Haushaltsgeräte', icon: 'ri-blaze-line' },
  { label: 'Beauty & Kosmetik', icon: 'ri-seedling-line' },
  { label: 'Sport & Outdoor', icon: 'ri-run-line' },
  { label: 'Food & Beverages', icon: 'ri-restaurant-line' },
  { label: 'Pharma & Health', icon: 'ri-heart-pulse-line' },
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
  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState('');

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
      const params = new URLSearchParams();
      fd.forEach((value, key) => {
        if (typeof value === 'string') params.append(key, value);
      });

      const res = await fetch(FORM_SUBMIT_ADDR, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: params.toString(),
      });

      const responseText = await res.text();
      let parsed: { code?: string; meta?: { message?: string; detail?: string }; message?: string } = {};
      try {
        parsed = JSON.parse(responseText);
      } catch {
        /* non-JSON response */
      }

      const code = parsed?.code;
      const ok = res.ok && code === 'OK';
      const serverMsg =
        parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText;

      if (ok) {
        setStatus('success');
        setFormError('');
      } else {
        setStatus('error');
        setFormError(
          typeof serverMsg === 'string' && serverMsg.trim()
            ? serverMsg
            : 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
        );
      }
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
    <section className="py-10 md:py-12 px-4 md:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {status === 'success' ? (
          <div className="border border-primary-500/40 bg-primary-500/10 px-6 md:px-8 py-10 text-center">
            <div className="w-12 h-12 flex items-center justify-center bg-primary-500 rounded-full mx-auto mb-4">
              <i className="ri-check-line text-2xl text-white"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-foreground-950 uppercase tracking-tight">
              Vielen Dank!
            </h3>
            <p className="text-sm text-foreground-600 leading-relaxed mt-2 max-w-md mx-auto">
              Deine Angaben sind bei uns eingegangen. Wir melden uns in Kürze mit einer ersten
              Einschätzung zu deiner Branche.
            </p>
          </div>
        ) : (
          <form
            data-readdy-form
            onSubmit={handleSubmit}
            className="border border-foreground-200 bg-background-50 px-5 md:px-8 py-6 md:py-8"
          >
            {/* Hidden answer carriers (also collected into FormData on submit) */}
            <input type="hidden" name="branche" value={branch} />
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
            <div className="flex items-center justify-between gap-4 mb-5">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                <div>
                  <label
                    htmlFor="survey-name"
                    className="block text-[11px] font-black uppercase tracking-wider text-foreground-600 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="survey-name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dein Name"
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
    </section>
  );
}