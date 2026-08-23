import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import ContactForm from './components/ContactForm';
import ImpressumSection from './components/ImpressumSection';
import WoodenDivider from '@/components/base/WoodenDivider';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';
import WoodenButton from '@/components/base/WoodenButton';

const CALENDLY_URL = 'https://calendly.com/sonic-group-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=c8d300';

function CalendlyInline() {
  useEffect(() => {
    // If Calendly script is already loaded, init inline widgets
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: document.querySelector('.calendly-inline-widget'),
      });
    }
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full"
      data-url={CALENDLY_URL}
      style={{ minWidth: '320px', height: '700px' }}
    />
  );
}

const contactDetails = [
  {
    icon: 'ri-map-pin-line',
    label: 'Adresse',
    value: 'Campus Fichtenhain 46\n47807 Krefeld, Deutschland',
    href: 'https://maps.google.com/?q=Campus+Fichtenhain+46+47807+Krefeld',
    external: true,
  },
  {
    icon: 'ri-phone-line',
    label: 'Telefon',
    value: '+49 2151 479 444 0',
    href: 'tel:+4921514794440',
    external: false,
  },
  {
    icon: 'ri-mail-line',
    label: 'E-Mail',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
  {
    icon: 'ri-time-line',
    label: 'Erreichbarkeit',
    value: 'Mo–Fr: 09:00–17:00 Uhr',
    href: undefined,
    external: false,
  },
];

export default function KontaktPage() {
  useSEO({
    title: 'Kontakt | Sonic Group — Krefeld DACH Market Activation Agentur',
    description:
      'Kontaktiere die Sonic Group direkt. Campus Fichtenhain 46, 47807 Krefeld. Tel: +49 2151 479 444 0 — Anfragen zu POS, Staffing, SRT & Retail Activation.',
    keywords: 'Sonic Group Kontakt, Krefeld Agentur, POS Promotion Anfrage, Retail Activation DACH',
    canonical: 'https://sonic-group.de/kontakt',
  });

  // ── Text Store hooks ──
  const tHeroBadge = useText('kontakt_page', 'kontakt-hero-badge', 'Kein Commitment. Nur ein gutes Gespräch.');
  const tHeroH1 = useText('kontakt_page', 'kontakt-hero-h1', 'LASS UNS');
  const tHeroH1Accent = useText('kontakt_page', 'kontakt-hero-h1-accent', 'REDEN.');
  const tHeroSub = useText('kontakt_page', 'kontakt-hero-sub', '');
  const tAddrLabel = useText('kontakt_page', 'kontakt-detail-address-label', 'Adresse');
  const tAddr = useText('kontakt_page', 'kontakt-detail-address', 'Campus Fichtenhain 46\n47807 Krefeld, Deutschland');
  const tPhoneLabel = useText('kontakt_page', 'kontakt-detail-phone-label', 'Telefon');
  const tPhone = useText('kontakt_page', 'kontakt-detail-phone', '+49 2151 479 444 0');
  const tEmailLabel = useText('kontakt_page', 'kontakt-detail-email-label', 'E-Mail');
  const tEmail = useText('kontakt_page', 'kontakt-detail-email', 'info@sonic-group.de');
  const tHoursLabel = useText('kontakt_page', 'kontakt-detail-hours-label', 'Erreichbarkeit');
  const tHours = useText('kontakt_page', 'kontakt-detail-hours', 'Mo–Fr: 09:00–17:00 Uhr');
  const tCalLabel = useText('kontakt_page', 'kontakt-calendly-label', 'Direkt Termin wählen');
  const tCalSub = useText('kontakt_page', 'kontakt-calendly-sub', 'Kostenlos · Unverbindlich · 30 Minuten');
  const tStatResp = useText('kontakt_page', 'kontakt-stat-response', '< 24h');
  const tStatRespLabel = useText('kontakt_page', 'kontakt-stat-response-label', 'Antwortzeit');
  const tStatExp = useText('kontakt_page', 'kontakt-stat-experience', '20+');
  const tStatExpLabel = useText('kontakt_page', 'kontakt-stat-experience-label', 'Jahre Erfahrung');
  const tStatClients = useText('kontakt_page', 'kontakt-stat-clients', '100+');
  const tStatClientsLabel = useText('kontakt_page', 'kontakt-stat-clients-label', 'Kunden');
  const tOfficeH3 = useText('kontakt_page', 'kontakt-office-h3', 'Sonic Group');
  const tOfficeAddr = useText('kontakt_page', 'kontakt-office-address', 'Campus Fichtenhain 46\n47807 Krefeld, Deutschland');
  const tOfficeRoute = useText('kontakt_page', 'kontakt-office-route', 'Route planen');
  const tOfficeCall = useText('kontakt_page', 'kontakt-office-call', 'Anrufen');

  return (
    <div className="min-h-[100dvh] bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[520px] flex items-center px-4 md:px-6 bg-foreground-950 overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,212,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,212,0,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />
        {/* Glow */}
        <div
          className="absolute top-0 right-0 w-full max-w-[600px] h-[400px] bg-primary-500/6 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-full max-w-[1300px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-1 md:grid-cols-2 gap-10 items-center">

            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-[7px] mb-5 md:mb-6" style={{ background: 'oklch(var(--primary-500) / 0.18)', border: '1px solid oklch(var(--primary-500) / 0.35)' }}>
                <span className="w-1.5 h-1.5 bg-primary-500 flex-shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-500">{tHeroBadge}</span>
              </div>

              <h1 className="sonic-h1 text-white mb-6">
                {tHeroH1}
                <br />
                <span className="text-primary-500">{tHeroH1Accent}</span>
              </h1>

              <p className="text-base text-foreground-400 leading-relaxed max-w-lg mb-10">
                {tHeroSub}
              </p>

              {/* Contact detail cards */}
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                {contactDetails.map((item, i) => (
                  <div
                    key={i}
                    className="bg-foreground-950 px-5 py-5 hover:bg-[#1e1e00] transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 flex items-center justify-center bg-primary-500/10 border border-primary-500/20 flex-shrink-0">
                        <i className={`${item.icon} text-base text-primary-500`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-foreground-500 mb-1">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.external ? '_blank' : undefined}
                            rel={item.external ? 'noopener noreferrer' : undefined}
                            className="text-sm text-foreground-300 hover:text-primary-500 transition-colors whitespace-pre-line break-all leading-relaxed block"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-foreground-300 whitespace-pre-line leading-relaxed">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Calendly Inline Embed */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-6">
              {/* Header label */}
              <div className="w-full flex items-center gap-3 px-1">
                <div className="w-8 h-8 flex items-center justify-center bg-primary-500/15 border border-primary-500/30">
                  <i className="ri-calendar-check-line text-sm text-primary-500" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-foreground-500 mb-1">
                    {tCalLabel}
                  </p>
                  <p className="text-xs text-foreground-500">{tCalSub}</p>
                </div>
              </div>
              {/* Inline calendar */}
              <div className="w-full border border-primary-500/20 overflow-hidden">
                <CalendlyInline />
              </div>
              {/* Quick stats */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                {[
                  { val: tStatResp, label: tStatRespLabel },
                  { val: tStatExp, label: tStatExpLabel },
                  { val: tStatClients, label: tStatClientsLabel },
                ].map((s, i) => (
                  <div key={i} className="bg-foreground-950 px-4 py-4 text-center">
                    <p className="text-xl font-black text-primary-500 leading-tight">{s.val}</p>
                    <p className="text-[10px] text-foreground-500 uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Main Content: Form + Map ───────────────────────────────────── */}
      <WoodenDivider />
      <section className="sonic-section-md bg-white relative">
        <div className="max-w-full max-w-[1300px] mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-px bg-foreground-200">

            {/* Contact Form — KEY ELEMENT */}
            <div>
              <ContactForm />
            </div>

            {/* Map + info sidebar */}
            <div className="bg-white flex flex-col">
              {/* Map */}
              <div className="flex-1 min-h-[320px] relative">
                <iframe
                  title="Sonic Group Standort — Campus Fichtenhain 46, Krefeld"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2494.8!2d6.545!3d51.335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8bde4ef4c8a1b%3A0x1!2sCampus+Fichtenhain+46%2C+47807+Krefeld!5e0!3m2!1sde!2sde!4v1700000000000"
                  className="w-full h-full absolute inset-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, filter: 'grayscale(0.2) contrast(1.05)' }}
                  allowFullScreen
                />
              </div>

              {/* Office info */}
              <div className="px-5 py-8 sm:px-10 sm:py-10 border-t border-foreground-100">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-primary-500 mb-4">
                  Unser Standort
                </p>
                <h3 className="text-xl font-black text-foreground-950 mb-1 uppercase">{tOfficeH3}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed mb-5">
                  {tOfficeAddr.split('\n').map((line, i) => (<span key={i}>{line}<br /></span>))}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=Campus+Fichtenhain+46+47807+Krefeld"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-primary-500/40 text-primary-500 px-5 py-2.5 font-black text-xs uppercase tracking-wider hover:bg-primary-500 hover:text-white transition-all duration-300 whitespace-nowrap"
                    style={{ borderRadius: 0 }}
                  >
                    <i className="ri-map-pin-line" />
                    {tOfficeRoute}
                  </a>
                  <a
                    href="tel:+4921514794440"
                    className="inline-flex items-center gap-2 bg-foreground-950 text-white px-5 py-2.5 font-black text-xs uppercase tracking-wider hover:bg-primary-500 hover:text-white transition-all duration-300 whitespace-nowrap"
                    style={{ borderRadius: 0 }}
                  >
                    <i className="ri-phone-line" />
                    {tOfficeCall}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <WoodenDivider />

      {/* ── Impressum ─────────────────────────────────────────────────── */}
      <ImpressumSection />

    </div>
  );
}