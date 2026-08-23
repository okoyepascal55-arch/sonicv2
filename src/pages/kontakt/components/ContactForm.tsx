import { useState, FormEvent } from 'react';
import WoodenButton from '@/components/base/WoodenButton';

const FORM_URL = 'https://readdy.ai/api/form/d82bbfb29k3fss3u08ug';

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

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const msg = (form.elements.namedItem('nachricht') as HTMLTextAreaElement)?.value || '';
    if (msg.length > 500) return;

    setStatus('sending');

    const body = new URLSearchParams();
    Array.from(new FormData(form)).forEach(([k, v]) => body.append(k, String(v)));

    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: body.toString(),
      });
      if (!res.ok) throw new Error('Fehler beim Senden');
      setStatus('success');
      form.reset();
      setCharCount(0);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white relative overflow-hidden" style={{ borderRadius: 0 }}>
      {/* Lime top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[4px]"
        style={{ background: 'linear-gradient(90deg, #C8D400 0%, rgba(200,212,0,0.4) 100%)' }}
        aria-hidden="true"
      />

      <div className="px-5 py-10 sm:px-10 md:px-14 md:py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-primary-500 mb-3">
            Direkte Anfrage
          </p>
          <h2 className="sonic-h2 text-foreground-950">
            SCHREIB UNS
          </h2>
          <p className="text-sm text-foreground-500 leading-relaxed max-w-md">
            Kein Commitment. Nur ein gutes Gespräch. Wir melden uns innerhalb von 24 Stunden.
          </p>
        </div>

        {status === 'success' ? (
          <div className="border border-primary-500/40 bg-primary-500/8 px-8 py-10 text-center">
            <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center bg-primary-500/15 border border-primary-500/30">
              <i className="ri-check-double-line text-2xl text-primary-500" />
            </div>
            <h3 className="text-xl font-black text-foreground-950 mb-2 uppercase">Nachricht erhalten!</h3>
            <p className="text-sm text-foreground-500">
              Wir melden uns innerhalb von 24 Stunden bei dir.
            </p>
          </div>
        ) : (
          <form
            data-readdy-form
            id="kontakt-sonic-group"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* Name + Firma */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-black uppercase tracking-[0.18em] text-foreground-500 mb-1.5">
                  Name <span className="text-primary-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Max Mustermann"
                  className="w-full px-4 py-3 bg-[#f8f8f6] border border-foreground-200 text-sm text-foreground-950 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-all duration-200"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div>
                <label htmlFor="unternehmen" className="block text-xs font-black uppercase tracking-[0.18em] text-foreground-500 mb-1.5">
                  Unternehmen
                </label>
                <input
                  id="unternehmen"
                  name="unternehmen"
                  type="text"
                  placeholder="Muster GmbH"
                  className="w-full px-4 py-3 bg-[#f8f8f6] border border-foreground-200 text-sm text-foreground-950 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-all duration-200"
                  style={{ borderRadius: 0 }}
                />
              </div>
            </div>

            {/* E-Mail + Telefon */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-[0.18em] text-foreground-500 mb-1.5">
                  E-Mail <span className="text-primary-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="max@muster.de"
                  className="w-full px-4 py-3 bg-[#f8f8f6] border border-foreground-200 text-sm text-foreground-950 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-all duration-200"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div>
                <label htmlFor="telefon" className="block text-xs font-black uppercase tracking-[0.18em] text-foreground-500 mb-1.5">
                  Telefon
                </label>
                <input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  placeholder="+49 0000 000000"
                  className="w-full px-4 py-3 bg-[#f8f8f6] border border-foreground-200 text-sm text-foreground-950 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-all duration-200"
                  style={{ borderRadius: 0 }}
                />
              </div>
            </div>

            {/* Interesse */}
            <div>
              <label htmlFor="interesse" className="block text-xs font-black uppercase tracking-[0.18em] text-foreground-500 mb-1.5">
                Interesse an
              </label>
              <select
                id="interesse"
                name="interesse"
                className="w-full px-4 py-3 bg-[#f8f8f6] border border-foreground-200 text-sm text-foreground-950 focus:outline-none focus:border-primary-500 focus:bg-white transition-all duration-200 cursor-pointer"
                style={{ borderRadius: 0 }}
              >
                <option value="">Bitte auswählen…</option>
                {interests.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Nachricht */}
            <div>
              <label htmlFor="nachricht" className="block text-xs font-black uppercase tracking-[0.18em] text-foreground-500 mb-1.5">
                Nachricht <span className="text-primary-500">*</span>
              </label>
              <textarea
                id="nachricht"
                name="nachricht"
                required
                rows={5}
                maxLength={500}
                placeholder="Erzähl uns kurz, worum es geht…"
                onChange={(e) => setCharCount(e.target.value.length)}
                className="w-full px-4 py-3 bg-[#f8f8f6] border border-foreground-200 text-sm text-foreground-950 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:bg-white transition-all duration-200 resize-none"
                style={{ borderRadius: 0 }}
              />
              <div className="flex justify-between items-center mt-1">
                {charCount > 500 && (
                  <p className="text-xs text-red-500 font-semibold">Maximal 500 Zeichen</p>
                )}
                <span className="ml-auto text-xs text-foreground-400 tabular-nums">{charCount} / 500</span>
              </div>
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3">
                <i className="ri-error-warning-line text-red-500 text-base" />
                <p className="text-sm text-red-600">Fehler beim Senden. Bitte versuche es erneut.</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending' || charCount > 500}
              className="inline-flex items-center gap-3 bg-primary-500 text-white px-7 py-3 font-black text-sm uppercase tracking-wider hover:bg-foreground-950 hover:text-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              style={{ borderRadius: 0 }}
            >
              {status === 'sending' ? (
                <>
                  <i className="ri-loader-4-line text-base animate-spin" />
                  Wird gesendet…
                </>
              ) : (
                <>
                  Nachricht senden
                  <i className="ri-send-plane-line text-base" />
                </>
              )}
            </button>

            {/* Trust */}
            <p className="text-xs text-foreground-400 mt-2">
              Kein Spam. Keine Weitergabe. Nur echter Kontakt. ✓
            </p>
          </form>
        )}
      </div>
    </div>
  );
}