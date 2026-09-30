import { useText, useTextSection } from '@/hooks/useText';
import { useReviewText } from '@/hooks/useReviewText';
import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { submitContactForm } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

/* Access cards (no price tiers) — texts: Dashboard → Text → SRT → „PricingAndAccess — Zugang zum SRT“ */
const TIERS = [
  { name: 'Live-Dashboard', price: 'Live', desc: 'Sieh jederzeit, was in deinem Projekt passiert — im Browser und mobil.', features: ['KPIs, die wir gemeinsam festlegen', 'Live-Daten aus dem Einsatz', 'Kunden-, Sonic-, Staff- und Handelsdaten'], highlight: false },
  { name: 'Reportings', price: 'PPT · Excel · SQL', desc: 'Egal ob PowerPoint, Excel oder maßgeschneiderte SQL-Reportings — wir definieren gemeinsam die wichtigen.', features: ['PowerPoint, Excel oder SQL', 'Beliebig viele Reports', 'Individuell definiert'], highlight: true },
  { name: 'Projektteam', price: 'Persönlich', desc: 'Hinter dem SRT steht dein Sonic-Projektteam — wir besprechen die Auswertungen mit dir.', features: ['Fester Ansprechpartner bei Sonic', 'Auswertungen gemeinsam besprechen', 'Demo-Zugang auf Anfrage'], highlight: false },
];


// Simple inline contact form that submits via submitContactForm
function SRTPricingForm() {
  // Dashboard → Text → SRT → „SRT — CTA-Texte (Demo)“
  const ct = useReviewText('srt_cta_texts');
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
      <p className="text-white/45 text-sm">{ct['form-success']}</p>
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
            <option value="Datenintegration">Datenintegration</option>
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
        {status === 'sending' ? 'Wird gesendet …' : ct.demo}
      </button>

      {ct['form-note'] && <p className="text-[10px] text-white/25 text-center">{ct['form-note']}</p>}
    </div>
  );
}

export default function PricingAndAccess() {
  const { images: tierImages } = useMediaStore('srt_pricing_images');
  const tBadge = useText('srt_pricing', 'srt-pricing-badge', 'Zugang');
  const tHeading = useText('srt_pricing', 'srt-pricing-heading', 'Zugang zum');
  const tHeadingAccent = useText('srt_pricing', 'srt-pricing-heading-accent', 'SRT.');
  const tSub = useText('srt_pricing', 'srt-pricing-sub', 'Mit dem SRT siehst du die Daten deines Sonic-Projekts live. Reports definieren wir gemeinsam — so viele du brauchst.');
  const tp = useTextSection('srt_pricing');
  const tiers = TIERS.map((tier, i) => {
    const k = `srt-pricing-tier-${i + 1}`;
    return {
      ...tier,
      name: tp[k] ?? tier.name,
      price: tp[`${k}-label`] ?? tier.price,
      desc: tp[`${k}-desc`] ?? tier.desc,
      features: tier.features.map((f, j) => tp[`${k}-f${j + 1}`] ?? f).filter(Boolean),
      badge: tier.highlight ? (tp[`${k}-badge`] ?? 'Unbegrenzt') : '',
    };
  });
  const ct = useReviewText('srt_cta_texts');

  return (
    <section id="preise-zugang" className="sonic-section-md px-4 md:px-6 bg-foreground-950">
      <div className="sonic-container">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.81 0.19 115)' }}>{tBadge}</span></div>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <h2 className="sonic-h2 text-white">{tHeading}{tHeadingAccent && <>{' '}<span className="text-primary-500">{tHeadingAccent}</span></>}</h2>
            <p className="text-sm text-white/45 leading-relaxed md:text-right md:max-w-sm md:ml-auto">{tSub}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-2.5 mb-8">
          {tiers.map((tier, i) => {
            const img = tierImages[i]?.url ? resolveImageUrl(tierImages[i].url) : null;
            return (
            <article key={i} className="relative overflow-hidden" style={{ background: 'oklch(0.14 0.005 118)', border: tier.highlight ? '1px solid oklch(0.81 0.19 115 / 0.45)' : '1px solid rgba(255,255,255,0.08)' }}>
              {tier.highlight && <div className="absolute -top-[2px] left-[-2px] right-[-2px] h-[3px] bg-primary-500" />}
              {img && <div className="relative w-full h-28 overflow-hidden"><img src={img} alt="" aria-hidden="true" className="w-full h-full object-cover grayscale opacity-40" loading="lazy" /><div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, oklch(0.14 0.005 118))' }} /></div>}
              <div className="p-6">
              {tier.highlight && tier.badge && <p className="text-[10px] font-black uppercase mb-1" style={{ color: 'oklch(0.81 0.19 115)' }}>{tier.badge}</p>}
              <span className={`inline-block text-[11px] font-black uppercase px-2.5 py-1 ${tier.highlight ? 'bg-primary-500 text-foreground-950' : 'bg-white/[0.08] text-white/50'}`}>{tier.name}</span>
              <div className="text-[22px] font-black text-primary-500 my-3">{tier.price}</div>
              <p className="text-xs text-white/40 leading-relaxed mb-4">{tier.desc}</p>
              <ul className="space-y-1.5 m-0 p-0 list-none">
                {tier.features.map((feature, j) => <li key={j} className="flex gap-2 text-xs text-white/50"><i className="ri-check-line text-primary-500 text-[13px]" />{feature}</li>)}
              </ul>
              </div>
            </article>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="p-8 md:p-11 flex flex-col justify-center" style={{ background: 'oklch(0.14 0.005 118)' }}>
            <h3 className="text-[28px] font-black leading-tight text-background-50 mb-4">{ct['access-headline']}{ct['access-accent'] && <>{' '}<span className="text-primary-500">{ct['access-accent']}</span></>}</h3>
            <p className="text-[13px] leading-[1.7] text-background-50/50 max-w-xs">{ct['access-line']}</p>
          </div>
          <div className="p-8 md:p-11 flex flex-col justify-center gap-3">
            <SRTPricingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
