import { useState, FormEvent } from 'react';
import { submitContactForm } from '@/lib/contact';

const interests = [
  'POS Full Service',
  'Staff as a Service',
  'Sonic Reporting Tool (SRT)',
  'Forecasting & Marktforschung',
  'Events & Messen',
  'Kreation & Content',
  'Allgemeine Anfrage',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

const fieldClass =
  'w-full py-3 border-0 border-b bg-transparent text-[15px] text-foreground-950 placeholder-foreground-300 focus:outline-none transition-colors duration-200';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [charCount, setCharCount] = useState(0);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const msg = (form.elements.namedItem('nachricht') as HTMLTextAreaElement)?.value || '';
    if (msg.length > 500) return;

    setStatus('sending');

    const data: Record<string, string> = {};
    Array.from(new FormData(form)).forEach(([k, v]) => { data[k] = String(v); });
    data.subject = `Kontaktanfrage — ${data.interesse || 'Allgemein'}`;

    try {
      await submitContactForm(data);
      setStatus('success');
      form.reset();
      setCharCount(0);
      setSelectedInterest('');
    } catch {
      setStatus('error');
    }
  };

  const underlineStyle = (name: string) => ({
    borderBottomColor: focused === name ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-950) / 0.16)',
  });

  return (
    <div className="p-8 md:p-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
        <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Direkte Anfrage</span>
      </div>
      <h2 className="font-black text-foreground-950 mb-3" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
        Schreib{' '}
        <span style={{ background: 'oklch(var(--primary-500) / 0.9)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>
          uns
        </span>
      </h2>
      <p className="text-[15px] leading-[1.7] max-w-md mb-12" style={{ color: 'oklch(var(--foreground-500))' }}>
        Kein Commitment. Nur ein gutes Gespräch. Wir melden uns innerhalb von 24 Stunden.
      </p>

      {status === 'success' ? (
        <div className="border px-8 py-10 text-center" style={{ borderColor: 'oklch(var(--primary-500) / 0.4)', background: 'oklch(var(--primary-500) / 0.08)' }}>
          <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center" style={{ background: 'oklch(var(--primary-500) / 0.15)', border: '1px solid oklch(var(--primary-500) / 0.3)' }}>
            <i className="ri-check-double-line text-2xl text-primary-500" />
          </div>
          <h3 className="text-xl font-black text-foreground-950 mb-2">Nachricht erhalten</h3>
          <p className="text-sm" style={{ color: 'oklch(var(--foreground-500))' }}>Wir melden uns innerhalb von 24 Stunden bei dir.</p>
        </div>
      ) : (
        <form data-readdy-form id="kontakt-sonic-group" onSubmit={handleSubmit} noValidate>
          {/* Name + Firma */}
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="name" className="block text-[11px] font-black uppercase tracking-[0.2em] mb-2.5" style={{ color: 'oklch(var(--foreground-600))' }}>
                Name <span className="text-primary-500">*</span>
              </label>
              <input
                id="name" name="name" type="text" required placeholder="Max Mustermann"
                onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                className={fieldClass} style={underlineStyle('name')}
              />
            </div>
            <div>
              <label htmlFor="unternehmen" className="block text-[11px] font-black uppercase tracking-[0.2em] mb-2.5" style={{ color: 'oklch(var(--foreground-600))' }}>
                Unternehmen
              </label>
              <input
                id="unternehmen" name="unternehmen" type="text" placeholder="Muster GmbH"
                onFocus={() => setFocused('unternehmen')} onBlur={() => setFocused(null)}
                className={fieldClass} style={underlineStyle('unternehmen')}
              />
            </div>
          </div>

          {/* E-Mail + Telefon */}
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div>
              <label htmlFor="email" className="block text-[11px] font-black uppercase tracking-[0.2em] mb-2.5" style={{ color: 'oklch(var(--foreground-600))' }}>
                E-Mail <span className="text-primary-500">*</span>
              </label>
              <input
                id="email" name="email" type="email" required placeholder="max@muster.de"
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                className={fieldClass} style={underlineStyle('email')}
              />
            </div>
            <div>
              <label htmlFor="telefon" className="block text-[11px] font-black uppercase tracking-[0.2em] mb-2.5" style={{ color: 'oklch(var(--foreground-600))' }}>
                Telefon
              </label>
              <input
                id="telefon" name="telefon" type="tel" placeholder="+49 0000 000000"
                onFocus={() => setFocused('telefon')} onBlur={() => setFocused(null)}
                className={fieldClass} style={underlineStyle('telefon')}
              />
            </div>
          </div>

          {/* Interesse — chip selector */}
          <div className="mb-8">
            <label className="block text-[11px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: 'oklch(var(--foreground-600))' }}>
              Interesse an
            </label>
            <input type="hidden" name="interesse" value={selectedInterest} />
            <div className="flex flex-wrap gap-2">
              {interests.map((opt) => {
                const active = selectedInterest === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedInterest(active ? '' : opt)}
                    className="text-[11px] font-black uppercase tracking-[0.1em] px-3.5 py-2.5 transition-all duration-150 cursor-pointer"
                    style={{
                      background: active ? 'oklch(var(--foreground-950))' : 'transparent',
                      color: active ? '#fff' : 'oklch(var(--foreground-500))',
                      border: active ? '1px solid oklch(var(--foreground-950))' : '1px solid oklch(var(--foreground-950) / 0.14)',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Nachricht */}
          <div className="mb-10">
            <label htmlFor="nachricht" className="block text-[11px] font-black uppercase tracking-[0.2em] mb-2.5" style={{ color: 'oklch(var(--foreground-600))' }}>
              Nachricht <span className="text-primary-500">*</span>
            </label>
            <textarea
              id="nachricht" name="nachricht" required rows={4} maxLength={500}
              placeholder="Erzähl uns kurz, worum es geht…"
              onChange={(e) => setCharCount(e.target.value.length)}
              onFocus={() => setFocused('nachricht')} onBlur={() => setFocused(null)}
              className="w-full px-4 py-4 text-[15px] leading-relaxed text-foreground-950 placeholder-foreground-300 focus:outline-none resize-none transition-colors duration-200"
              style={{
                border: `1px solid ${focused === 'nachricht' ? 'oklch(var(--primary-500))' : 'oklch(var(--foreground-950) / 0.14)'}`,
                background: focused === 'nachricht' ? '#fff' : 'oklch(var(--background-100))',
              }}
            />
            <div className="flex justify-between items-center mt-2">
              {charCount > 500 && <p className="text-xs text-red-500 font-semibold">Maximal 500 Zeichen</p>}
              <span className="ml-auto text-xs tabular-nums" style={{ color: 'oklch(var(--foreground-400))' }}>{charCount} / 500</span>
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3 mb-6">
              <i className="ri-error-warning-line text-red-500 text-base" />
              <p className="text-sm text-red-600">Fehler beim Senden. Bitte versuche es erneut.</p>
            </div>
          )}

          <div className="flex items-center gap-6 flex-wrap">
            <button
              type="submit"
              disabled={status === 'sending' || charCount > 500}
              className="inline-flex items-center gap-2.5 bg-foreground-950 text-white px-8 py-[17px] font-black text-xs uppercase tracking-[0.14em] hover:bg-primary-500 hover:text-foreground-950 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              {status === 'sending' ? (
                <>
                  <i className="ri-loader-4-line text-base animate-spin" />
                  Wird gesendet…
                </>
              ) : (
                <>
                  Nachricht senden
                  <i className="ri-arrow-right-line text-base" />
                </>
              )}
            </button>
            <p className="text-xs" style={{ color: 'oklch(var(--foreground-400))' }}>Kein Spam. Keine Weitergabe. Nur echter Kontakt.</p>
          </div>
        </form>
      )}
    </div>
  );
}
