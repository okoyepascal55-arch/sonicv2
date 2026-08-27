import { useText } from '@/hooks/useText';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

const TIERS = [
  { name: 'Starter', price: 'Individuell', desc: 'Für Marken, die den Markt testen oder fokussierte Kampagnen fahren.', features: ['Live-Dashboard-Zugang', 'Bis zu 3 Custom Reports', '1 User-Lizenz'], highlight: false },
  { name: 'Professional', price: 'Individuell', desc: 'Für etablierte Marken, die ihre Retail-Präsenz skalieren.', features: ['Unbegrenzte Reports', 'API-Zugang, Forecasting', 'Bis zu 5 User-Lizenzen'], highlight: true },
  { name: 'Enterprise', price: 'Auf Anfrage', desc: 'Für Partner und Marken mit komplexen Multi-Market-Projekten.', features: ['Dedizierter Account-Manager', 'White-Label-Reporting', 'Inkludiert für Sonic-Partner'], highlight: false },
];

export default function PricingAndAccess() {
  const { images: tierImages } = useMediaStore('srt_pricing_images');
  const tBadge = useText('srt_pricing', 'srt-pricing-badge', 'Preise & Zugang');
  const tHeading = useText('srt_pricing', 'srt-pricing-heading', 'Transparente Preise. Direkter Zugang.');
  const tSub = useText('srt_pricing', 'srt-pricing-sub', 'Drei Stufen, klarer Mehrwert, keine versteckten Kosten.');

  return (
    <section id="preise-zugang" className="sonic-section-lg px-4 md:px-6 bg-white border-t border-foreground-950/[0.06]">
      <div className="sonic-container">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5"><span className="w-7 h-0.5 bg-primary-500" /><span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>{tBadge}</span></div>
          <h2 className="sonic-h2 text-foreground-950 uppercase">Transparente Preise.<br /><span style={{ background: 'oklch(0.81 0.19 115 / 0.9)', color: 'oklch(0.16 0.006 118)', padding: '0.02em 0.16em', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>Direkter Zugang.</span></h2>
          <p className="text-sm text-foreground-950/50 mt-2">{tSub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-2.5 mb-8">
          {TIERS.map((tier, i) => {
            const img = tierImages[i]?.url ? resolveImageUrl(tierImages[i].url) : null;
            return (
            <article key={tier.name} className="relative border-2 border-foreground-950/[0.08] bg-white overflow-hidden">
              {tier.highlight && <div className="absolute -top-[2px] left-[-2px] right-[-2px] h-[3px] bg-primary-500" />}
              {img && <div className="relative w-full h-28 overflow-hidden"><img src={img} alt="" aria-hidden="true" className="w-full h-full object-cover grayscale opacity-40" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" /></div>}
              <div className="p-6">
              {tier.highlight && <p className="text-[10px] font-black uppercase text-primary-600 mb-1">Empfohlen</p>}
              <span className={`inline-block text-[11px] font-black uppercase px-2.5 py-1 ${tier.highlight ? 'bg-foreground-950 text-primary-500' : 'bg-foreground-950/5 text-foreground-950/55'}`}>{tier.name}</span>
              <div className="text-[22px] font-black text-primary-600 my-3">{tier.price}</div>
              <p className="text-xs text-foreground-950/45 leading-relaxed mb-4">{tier.desc}</p>
              <ul className="space-y-1.5 m-0 p-0 list-none">
                {tier.features.map((feature) => <li key={feature} className="flex gap-2 text-xs text-foreground-950/55"><i className="ri-check-line text-primary-500 text-[13px]" />{feature}</li>)}
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
            <div className="grid sm:grid-cols-2 gap-3"><input aria-label="Name" type="text" placeholder="Name" className="w-full px-3.5 py-3 border-2 border-foreground-950/[0.12] text-[13px] font-inherit focus:outline-none focus:border-primary-500" /><input aria-label="E-Mail" type="email" placeholder="E-Mail" className="w-full px-3.5 py-3 border-2 border-foreground-950/[0.12] text-[13px] font-inherit focus:outline-none focus:border-primary-500" /></div>
            <input aria-label="Unternehmen" type="text" placeholder="Unternehmen" className="w-full px-3.5 py-3 border-2 border-foreground-950/[0.12] text-[13px] font-inherit focus:outline-none focus:border-primary-500" />
            <a href={`mailto:${CONTACT_EMAIL}?subject=Beratungsgespr%C3%A4ch`} className="flex items-center justify-center gap-2 px-4 py-3.5 bg-primary-500 text-foreground-950 text-xs font-black uppercase tracking-widest hover:bg-foreground-950 hover:text-primary-500 transition-all"><i className="ri-calendar-line" />Beratungsgespräch buchen</a>
          </div>
        </div>
      </div>
    </section>
  );
}
