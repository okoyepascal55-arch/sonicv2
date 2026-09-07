import { useText } from '@/hooks/useText';
import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { submitContactForm } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const TIERS = [
  { name: 'Starter', price: 'Individuell', desc: 'Für Marken, die den Markt testen oder fokussierte Kampagnen fahren.', features: ['Live-Dashboard-Zugang', 'Bis zu 3 Custom Reports', '1 User-Lizenz'], highlight: false },
  { name: 'Professional', price: 'Individuell', desc: 'Für etablierte Marken, die ihre Retail-Präsenz skalieren.', features: ['Unbegrenzte Reports', 'API-Zugang, Forecasting', 'Bis zu 5 User-Lizenzen'], highlight: true },
  { name: 'Enterprise', price: 'Auf Anfrage', desc: 'Für Partner und Marken mit komplexen Multi-Market-Projekten.', features: ['Dedizierter Account-Manager', 'White-Label-Reporting', 'Inkludiert für Sonic-Partner'], highlight: false },
];


// Simple inline contact form that submits via submitContactForm
function SRTPricingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [useCase, setUseCase] = useState('');
  const [timeline, setTimeline] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'done'|'error'>('idle');

  const inputCls = "w-full px-3.5 py-3 border border-white/10 text-[13px] focus:outline-none focus:border-primary-500 bg-white/5 text-white placeholder-white/30 transition-colors";
  const selectCls = "w-full px-3.5 py-3 border border-white/10 text-[13px] focus:outline-none focus:border-primary-500 bg-foreground-950 text-white/70 cursor-pointer";

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) return;
    setStatus('sending');
    try {
      await submitContactForm({
        name, email, phone,
        company,
        message: [
          `Unternehmen: ${company || '–'}`,
          `Funktion: ${role || '–'}`,
          `Teamgröße Außendienst: ${teamSize || '–'}`,
          `Hauptinteresse: ${useCase || '–'}`,
          `Start-Zeitpunkt: ${timeline || '–'}`,
        ].join('\n'),
        subject: 'SRT Zugang anfragen',
      });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') return (
    <div className="text-center py-8">
      <div className="w-12 h-12 bg-primary-500 flex items-center justify-center mx-auto mb-4">
        <i className="ri-check-line text-foreground-950 text-2xl" />
      </div>
      <p className="text-white font-black text-base mb-1">Anfrage erhalten.</p>
      <p className="text-white/45 text-sm">Wir melden uns innerhalb von 24 Stunden.</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Row 1: Name + Email */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Name *</label>
          <input aria-label="Name" type="text" placeholder="Vorname Nachname" value={name} onChange={e => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">E-Mail *</label>
          <input aria-label="E-Mail" type="email" placeholder="name@unternehmen.de" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
        </div>
      </div>

      {/* Row 2: Company + Phone */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Unternehmen</label>
          <input aria-label="Unternehmen" type="text" placeholder="Marke / Unternehmen" value={company} onChange={e => setCompany(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Telefon</label>
          <input aria-label="Telefon" type="tel" placeholder="+49 ..." value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
        </div>
      </div>

      {/* Row 3: Role + Team size */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Deine Funktion</label>
          <select aria-label="Funktion" value={role} onChange={e => setRole(e.target.value)} className={selectCls}>
            <option value="">Bitte wählen …</option>
            <option value="Marketing / Brand">Marketing / Brand Management</option>
            <option value="Vertrieb / Sales">Vertrieb / Sales</option>
            <option value="Category Management">Category Management</option>
            <option value="Operations">Operations / Projektleitung</option>
            <option value="Geschäftsführung">Geschäftsführung / Management</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Außendienst-Teamgröße</label>
          <select aria-label="Teamgröße" value={teamSize} onChange={e => setTeamSize(e.target.value)} className={selectCls}>
            <option value="">Bitte wählen …</option>
            <option value="1–10">1–10 Mitarbeiter</option>
            <option value="11–50">11–50 Mitarbeiter</option>
            <option value="51–200">51–200 Mitarbeiter</option>
            <option value="200+">200+ Mitarbeiter</option>
            <option value="Variabel">Variabel / projektbasiert</option>
          </select>
        </div>
      </div>

      {/* Row 4: Use case + Timeline */}
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Hauptinteresse</label>
          <select aria-label="Hauptinteresse" value={useCase} onChange={e => setUseCase(e.target.value)} className={selectCls}>
            <option value="">Bitte wählen …</option>
            <option value="Einsatzplanung">Einsatz- & Aufgabenplanung</option>
            <option value="Live-Reporting">Live-Reporting & Dashboards</option>
            <option value="Talentpool">Talentpool-Verwaltung</option>
            <option value="GPS-Tracking">GPS-Check-in & Zeiterfassung</option>
            <option value="Datenintegration">ERP / Datenintegration</option>
            <option value="KI-Dokumente">KI-Dokumentenverarbeitung</option>
            <option value="Vollständig">Gesamtlösung (alle Module)</option>
          </select>
        </div>
        <div>
          <label className="text-[9px] font-black uppercase tracking-widest text-white/40 block mb-1">Gewünschter Start</label>
          <select aria-label="Start-Zeitpunkt" value={timeline} onChange={e => setTimeline(e.target.value)} className={selectCls}>
            <option value="">Bitte wählen …</option>
            <option value="Sofort">Sofort / so schnell wie möglich</option>
            <option value="1-3 Monate">In 1–3 Monaten</option>
            <option value="3-6 Monate">In 3–6 Monaten</option>
            <option value="Evaluierung">Nur Evaluierung / kein fester Start</option>
          </select>
        </div>
      </div>

      {status === 'error' && <p className="text-red-400 text-xs pt-1">Senden fehlgeschlagen — bitte versuche es erneut.</p>}

      <button type="button" onClick={handleSubmit} disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 py-4 bg-primary-500 text-foreground-950 text-xs font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-60 mt-1">
        <i className="ri-send-plane-line" />
        {status === 'sending' ? 'Wird gesendet …' : 'Zugang beantragen'}
      </button>

      <p className="text-[10px] text-white/25 text-center">Kostenlos & unverbindlich · Antwort innerhalb von 24 Stunden</p>
    </div>
  );
}

export default function PricingAndAccess() {
  const { images: tierImages } = useMediaStore('srt_pricing_images');
  const tBadge = useText('srt_pricing', 'srt-pricing-badge', 'Preise & Zugang');
  const tHeading = useText('srt_pricing', 'srt-pricing-heading', 'Transparente Preise. Direkter Zugang.');
  const tSub = useText('srt_pricing', 'srt-pricing-sub', 'Drei Stufen, klarer Mehrwert, keine versteckten Kosten.');

  return (
    <section id="preise-zugang" className="sonic-section-lg px-4 md:px-6 bg-foreground-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(oklch(0.81 0.19 115) 1px, transparent 1px), linear-gradient(90deg, oklch(0.81 0.19 115) 1px, transparent 1px)', backgroundSize: '52px 52px' }}
        aria-hidden="true" />
      <div className="sonic-container relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span></div>
          <h2 className="sonic-h2 text-white uppercase">Transparente Preise.<br /><span className="text-primary-500">Direkter Zugang.</span></h2>
          <p className="text-sm text-white/35 mt-2">{tSub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-2.5 mb-8">
          {TIERS.map((tier, i) => {
            const img = tierImages[i]?.url ? resolveImageUrl(tierImages[i].url) : null;
            return (
            <article key={tier.name} className="relative overflow-hidden" style={{ background: 'oklch(0.14 0.005 118)', border: tier.highlight ? '1px solid oklch(0.81 0.19 115 / 0.45)' : '1px solid rgba(255,255,255,0.08)' }}>
              {tier.highlight && <div className="absolute -top-[2px] left-[-2px] right-[-2px] h-[3px] bg-primary-500" />}
              {img && <div className="relative w-full h-28 overflow-hidden"><img src={img} alt="" aria-hidden="true" className="w-full h-full object-cover grayscale opacity-40" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" /></div>}
              <div className="p-6">
              {tier.highlight && <p className="text-[10px] font-black uppercase mb-1" style={{ color: 'oklch(0.81 0.19 115)' }}>Empfohlen</p>}
              <span className={`inline-block text-[11px] font-black uppercase px-2.5 py-1 ${tier.highlight ? 'bg-primary-500 text-foreground-950' : 'bg-white/[0.08] text-white/50'}`}>{tier.name}</span>
              <div className="text-[22px] font-black text-primary-500 my-3">{tier.price}</div>
              <p className="text-xs text-white/40 leading-relaxed mb-4">{tier.desc}</p>
              <ul className="space-y-1.5 m-0 p-0 list-none">
                {tier.features.map((feature) => <li key={feature} className="flex gap-2 text-xs text-white/50"><i className="ri-check-line text-primary-500 text-[13px]" />{feature}</li>)}
              </ul>
              </div>
            </article>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 border-2 border-foreground-950/[0.08]">
          <div className="bg-foreground-950 p-8 md:p-11 flex flex-col justify-center">
            <div className="flex items-center gap-2.5 mb-4"><div className="w-1 h-[22px] bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.15em] text-primary-500">Zugang beantragen</span></div>
            <h3 className="text-[28px] font-black leading-tight text-background-50 uppercase mb-4">Bereit für <span className="text-primary-500">volle</span> Transparenz?</h3>
            <p className="text-[13px] leading-[1.7] text-background-50/50 max-w-xs mb-6">Kein Commitment. Nur ein Gespräch. Wir zeigen dir in 30 Minuten, wie das SRT für dein Projekt aussehen kann.</p>
            <div className="space-y-2.5">
              <span className="flex items-center gap-2.5 text-xs text-background-50/40"><i className="ri-time-line text-primary-500" />30 Minuten — kostenlos & unverbindlich</span>
              <span className="flex items-center gap-2.5 text-xs text-background-50/40"><i className="ri-shield-check-line text-primary-500" />Keine automatische Vertragsbindung</span>
            </div>
          </div>
          <div className="p-8 md:p-11 flex flex-col justify-center gap-3">
            <SRTPricingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
