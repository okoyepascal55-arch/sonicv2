import { useState } from 'react';
import { CONTACT_EMAIL, submitContactForm } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import WoodenButton from '@/components/base/WoodenButton';

const TIERS = [
  { name: 'Starter', price: 'Individuell', desc: 'Für Marken, die den Markt testen oder fokussierte Kampagnen fahren.', features: ['Live-Dashboard-Zugang', 'Bis zu 3 Custom Reports', 'Wöchentliche Performance-Zusammenfassung', 'E-Mail-Support', 'Datenexport (CSV)', '1 User-Lizenz'], highlight: false },
  { name: 'Professional', price: 'Individuell', desc: 'Für etablierte Marken, die ihre Retail-Präsenz skalieren.', features: ['Alles aus Starter', 'Unbegrenzte Custom Reports', 'Tägliche Performance-Updates', 'Prioritäts-Support', 'API-Zugang', 'Bis zu 5 User-Lizenzen', 'Forecasting-Modul', 'Einsatzplanung'], highlight: true },
  { name: 'Enterprise', price: 'Auf Anfrage', desc: 'Für Partner und Marken mit komplexen Multi-Market-Projekten.', features: ['Alles aus Professional', 'Dedizierter Account-Manager', 'White-Label-Reporting', 'Unbegrenzte User-Lizenzen', 'SLA-Garantien', 'Onboarding & Schulung', 'Inkludiert für Sonic-Partner'], highlight: false },
];

const interests = [
  { value: 'demo', label: 'Demo anfragen', icon: 'ri-play-circle-line' },
  { value: 'beratung', label: 'Beratungsgespräch', icon: 'ri-calendar-line' },
  { value: 'partner', label: 'Sonic-Partner', icon: 'ri-shake-hands-line' },
  { value: 'info', label: 'Mehr Infos', icon: 'ri-information-line' },
];

export default function PricingAndAccess() {
  const tBadge = useText('srt_pricing', 'srt-pricing-badge', 'Preise & Zugang');
  const tHeading = useText('srt_pricing', 'srt-pricing-heading', 'Transparente Preise. Direkter Zugang.');
  const tSub = useText('srt_pricing', 'srt-pricing-sub', 'Drei Stufen, klarer Mehrwert, keine versteckten Kosten.');
  const tAccessHeading = useText('srt_pricing', 'srt-pricing-access-heading', 'Bereit für volle Transparenz?');
  const tBtn = useText('srt_pricing', 'srt-pricing-btn', 'Beratungsgespräch buchen');

  const [formData, setFormData] = useState({ name: '', email: '', company: '', interest: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.interest) return;
    if (charCount > 500) return;

    // Honeypot
    const form = e.currentTarget;
    const honeypot = (form.querySelector('[name="phone_alt"]') as HTMLInputElement)?.value?.trim();
    if (honeypot) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', interest: '', message: '' });
      setCharCount(0);
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    setSubmitStatus('submitting');
    setFormError('');

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        interest: formData.interest,
        message: formData.message,
        subject: `SRT Anfrage von ${formData.name}`,
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', interest: '', message: '' });
      setCharCount(0);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      setFormError('Netzwerkfehler. Bitte versuche es erneut.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="preise-zugang" className="sonic-section-lg px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="sonic-container relative z-10">
        {/* ── Section header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span>
          </div>
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="leist-h2 text-foreground-950">
              {tHeading.split('. ')[0] || tHeading}.<br />
              <span className="text-primary-500">{tHeading.includes('. ') ? tHeading.split('. ').slice(1).join('. ') : 'Direkter Zugang.'}</span>
            </h2>
            <p className="text-sm text-foreground-600 leading-relaxed lg:pb-1">
              {tSub}
            </p>
          </div>
        </div>

        {/* ── Pricing cards — compact row ── */}
        <div className="grid lg:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {TIERS.map((tier, i) => (
            <div key={i}
              className={`bg-white border-2 transition-all duration-300 group ${
                tier.highlight
                  ? 'border-primary-500/60'
                  : 'border-background-200/60 hover:border-primary-500/30'
              }`}>
              {/* Lime top bar for featured tier */}
              {tier.highlight && (
                <div className="h-[3px] bg-primary-500 w-full" aria-hidden="true" />
              )}
              <div className="p-6">
                {tier.highlight && (
                  <p className="sonic-label text-primary-500 mb-3">Empfohlen</p>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 ${tier.highlight ? 'bg-foreground-950 text-primary-500' : 'bg-foreground-100 text-foreground-600'}`}>
                    {tier.name}
                  </span>
                </div>
                <div className="text-xl font-black text-primary-500 mb-2">{tier.price}</div>
                <p className="text-xs text-foreground-500 leading-relaxed mb-4">{tier.desc}</p>
                <ul className="space-y-1.5">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2">
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5 bg-primary-500/8">
                        <i className="ri-check-line text-primary-500 text-2xs" />
                      </div>
                      <span className="text-xs text-foreground-600 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-5">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Anfrage%20${tier.name}`}
                  className={`flex items-center justify-center gap-2 w-full py-2.5 font-black text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap group/cta ${
                    tier.highlight
                      ? 'bg-primary-500 text-foreground-950 hover:bg-foreground-950 hover:text-primary-500'
                      : 'border-2 border-background-300/60 text-foreground-600 hover:border-primary-500/60 hover:text-primary-500'
                  }`}>
                  <i className="ri-calendar-line" />Anfrage stellen
                  <i className="ri-arrow-right-line transition-transform duration-300 group-hover/cta:translate-x-1 text-xs" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Sonic-Partner note */}
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#FAFDF5] border border-background-200/60 px-5 py-4">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 bg-primary-500/10">
            <i className="ri-information-line text-primary-500 text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-foreground-900 font-black text-xs mb-0.5">Bereits Sonic-Partner?</p>
            <p className="text-foreground-500 text-xs">Das SRT ist in deiner Partnerschaft inklusive. Kontaktiere deinen Account-Manager.</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}?subject=SRT%20Partnerschaft`}
            className="px-4 py-2 bg-foreground-950 text-background-50 font-black text-2xs uppercase tracking-widest hover:bg-primary-500 hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer flex-shrink-0">
            Account-Manager kontaktieren
          </a>
        </div>

        {/* ── Zugang form ── */}
        <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-0 border-2 border-background-200/60">
          {/* Left: pitch */}
          <div className="bg-foreground-950 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 select-none pointer-events-none font-black leading-none"
              style={{ fontSize: '12rem', color: 'transparent', WebkitTextStroke: '1px oklch(var(--primary-500) / 0.05)' }}>
              SRT
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 bg-primary-500" />
                <span className="text-2xs font-black text-primary-500 uppercase tracking-[0.2em]">Zugang beantragen</span>
              </div>
              <h3 className="font-black text-background-50 leading-tight tracking-tight mb-4" style={{ fontSize: 'clamp(22px,2.5vw,34px)' }}>
                BEREIT FÜR <span className="text-primary-500">VOLLE</span> TRANSPARENZ?
              </h3>
              <p className="text-background-50/50 text-xs leading-relaxed mb-6 max-w-xs">
                Kein Commitment. Nur ein Gespräch. Wir zeigen dir in 30 Minuten, wie das SRT für dein Projekt aussehen kann.
              </p>

              <div className="space-y-2.5">
                {[
                  { icon: 'ri-time-line', text: '30 Minuten — kostenlos & unverbindlich' },
                  { icon: 'ri-shield-check-line', text: 'Keine automatische Vertragsbindung' },
                  { icon: 'ri-user-star-line', text: 'Direkt mit deinem Account-Manager' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-6 h-6 flex items-center justify-center border flex-shrink-0" style={{ borderColor: "oklch(0.81 0.19 115 / 0.3)" }}>
                      <i className={`${item.icon} text-primary-500 text-xs`} />
                    </div>
                    <span className="text-background-50/35 text-xs font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-background-50/8 space-y-2">
                <a href="tel:+4921514794440" className="flex items-center gap-2 text-background-50/35 hover:text-primary-500 text-xs transition-colors cursor-pointer group">
                  <i className="ri-phone-line text-sm group-hover:text-primary-500" />+49 2151 479 444 0
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-background-50/35 hover:text-primary-500 text-xs transition-colors cursor-pointer group">
                  <i className="ri-mail-line text-sm group-hover:text-primary-500" />{CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white p-8 md:p-10 relative">
            {submitStatus === 'success' && (
              <div className="absolute inset-0 z-20 bg-white/95 flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-14 h-14 border-2 flex items-center justify-center mx-auto mb-4" style={{ borderColor: "oklch(0.81 0.19 115 / 0.3)" }}>
                    <i className="ri-check-double-line text-2xl text-primary-500" />
                  </div>
                  <h3 className="text-xl font-black text-foreground-950 mb-1 uppercase">Anfrage erhalten!</h3>
                  <p className="text-foreground-600 text-xs">Wir melden uns innerhalb von 24 Stunden bei dir.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 p-3 text-center text-red-600 text-sm font-semibold bg-red-50 border border-red-200">
                {formError || 'Etwas ist schiefgelaufen.'}
              </div>
            )}

            <p className="text-2xs font-black text-foreground-500 uppercase tracking-widest mb-5">Anfrage stellen</p>

            <form id="srt-access-form" data-readdy-form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="phone_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" readOnly className="survey-hp-field" />

              <div className="grid md:grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-2xs font-black text-foreground-600 uppercase tracking-widest mb-1">Name *</label>
                  <input type="text" name="name" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border-2 border-background-300/60 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                    style={{ borderRadius: 0 }} placeholder="Max Mustermann" />
                </div>
                <div>
                  <label className="block text-2xs font-black text-foreground-600 uppercase tracking-widest mb-1">E-Mail *</label>
                  <input type="email" name="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white border-2 border-background-300/60 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                    style={{ borderRadius: 0 }} placeholder="max@unternehmen.de" />
                </div>
              </div>

              <div>
                <label className="block text-2xs font-black text-foreground-600 uppercase tracking-widest mb-1">Unternehmen</label>
                <input type="text" name="company" value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2.5 bg-background-50 border-2 border-background-300/60 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                  style={{ borderRadius: 0 }} placeholder="Dein Unternehmen GmbH" />
              </div>

              <div>
                <label className="block text-2xs font-black text-foreground-600 uppercase tracking-widest mb-2">Ich interessiere mich für *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {interests.map((int) => (
                    <button key={int.value} type="button"
                      onClick={() => setFormData({ ...formData, interest: int.value })}
                      className={`p-2.5 text-center transition-all duration-200 cursor-pointer border-2 flex flex-col items-center gap-1 ${
                        formData.interest === int.value ? 'border-primary-500 bg-primary-500/6' : 'border-background-300/60 bg-white hover:border-primary-500/40'
                      }`}
                      style={{ borderRadius: 0 }}>
                      <i className={`${int.icon} text-base ${formData.interest === int.value ? 'text-primary-500' : 'text-foreground-500'}`} />
                      <span className="text-2xs font-black text-foreground-950 leading-tight">{int.label}</span>
                    </button>
                  ))}
                </div>
                <input type="hidden" name="interest" value={formData.interest} />
              </div>

              <div>
                <label className="block text-2xs font-black text-foreground-600 uppercase tracking-widest mb-1">
                  Nachricht <span className={`font-normal normal-case ${charCount > 480 ? 'text-red-400' : 'text-foreground-500'}`}>{charCount}/500</span>
                </label>
                <textarea name="message" rows={3} maxLength={500} value={formData.message}
                  onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setCharCount(e.target.value.length); }}
                  className="w-full px-3 py-2.5 bg-background-50 border-2 border-background-300/60 text-sm focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  style={{ borderRadius: 0 }} placeholder="Beschreibe kurz dein Projekt..." />
              </div>

              <button type="submit" disabled={submitStatus === 'submitting' || charCount > 500}
                className="w-full flex items-center justify-center gap-2 bg-primary-500 text-foreground-950 py-3 font-black hover:bg-foreground-950 hover:text-primary-500 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-widest whitespace-nowrap"
                style={{ borderRadius: 0 }}>
                {submitStatus === 'submitting' ? (
                  <><i className="ri-loader-4-line animate-spin" />Wird gesendet...</>
                ) : (
                  <><i className="ri-calendar-line" />Beratungsgespräch buchen</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}