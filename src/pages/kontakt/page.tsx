import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import ContactForm from './components/ContactForm';
import ImpressumSection from './components/ImpressumSection';
import LimeWaveDivider from '@/components/base/LimeWaveDivider';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useText } from '@/hooks/useText';

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
      style={{ minWidth: '320px', height: '620px' }}
    />
  );
}

export default function KontaktPage() {
  useSEO({
    title: 'Kontakt | Sonic Group — Krefeld DACH Market Activation Agentur',
    description:
      'Kontaktiere die Sonic Group direkt. Campus Fichtenhain 46, 47807 Krefeld. Tel: +49 2151 479 444 0 — Anfragen zu POS, Staffing, SRT & Retail Activation.',
    keywords: 'Sonic Group Kontakt, Krefeld Agentur, POS Promotion Anfrage, Retail Activation DACH',
    canonical: 'https://sonic-group.de/kontakt',
  });

  // ── Text Store hooks ──
  const tHeroH1 = useText('kontakt_page', 'kontakt-hero-h1', 'Lass uns');
  const tHeroH1Accent = useText('kontakt_page', 'kontakt-hero-h1-accent', 'reden');
  const tAddr = useText('kontakt_page', 'kontakt-detail-address', 'Campus Fichtenhain 46\n47807 Krefeld, Deutschland');
  const tPhone = useText('kontakt_page', 'kontakt-detail-phone', '+49 2151 479 444 0');
  const tEmail = useText('kontakt_page', 'kontakt-detail-email', CONTACT_EMAIL);
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

  const contactDetails = [
    { label: 'Adresse', value: tAddr, href: 'https://maps.google.com/?q=Campus+Fichtenhain+46+47807+Krefeld', external: true },
    { label: 'Telefon', value: tPhone, href: 'tel:+4921514794440', external: false },
    { label: 'E-Mail', value: tEmail, href: `mailto:${tEmail}`, external: false },
    { label: 'Erreichbarkeit', value: tHours, href: undefined, external: false },
  ];

  return (
    <div className="min-h-[100dvh] bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 md:pt-24 px-5 md:px-10" style={{ background: 'oklch(0.13 0.005 118)' }}>
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(oklch(var(--primary-500) / 0.8) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary-500) / 0.8) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 sonic-container grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-start">
          {/* Left: text */}
          <div className="pb-16 md:pb-24">
            <div className="flex flex-wrap items-center gap-3 mb-7 md:mb-8">
              <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">Kontakt</span>
              <span className="text-[11px] font-black uppercase tracking-[0.12em] text-white/35">Kein Commitment. Nur ein gutes Gespräch.</span>
            </div>

            <h1
              className="font-black uppercase text-white mb-9 md:mb-10"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.75rem)', lineHeight: 0.96, letterSpacing: '-0.035em' }}
            >
              {tHeroH1}
              <br />
              {tHeroH1Accent}
              <span className="text-primary-500">.</span>
            </h1>

            <div className="mb-14">
              <a
                href="tel:+4921514794440"
                className="inline-flex items-center gap-2.5 px-7 py-4 bg-primary-500 text-foreground-950 text-xs font-black uppercase tracking-[0.14em] hover:bg-white transition-colors duration-200 cursor-pointer"
              >
                <i className="ri-phone-line text-[15px]" />
                {tOfficeCall}
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              {contactDetails.map((item, i) => (
                <div
                  key={item.label}
                  className="py-6"
                  style={{
                    paddingRight: i % 2 === 0 ? '32px' : 0,
                    paddingLeft: i % 2 === 1 ? '32px' : 0,
                    borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.12)' : undefined,
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.12)' : undefined,
                  }}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.26em] text-white/30 mb-2">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-[15px] font-medium text-white/85 hover:text-primary-500 transition-colors whitespace-pre-line leading-relaxed"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[15px] font-medium text-white/85 whitespace-pre-line leading-relaxed">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Calendly card */}
          <div className="mb-12 lg:mb-0" style={{ background: 'oklch(0.175 0.006 118)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px' }}>
            <div className="flex items-baseline justify-between gap-4 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-primary-500 mb-1.5">{tCalLabel}</p>
                <p className="text-[13px] text-white/45">{tCalSub}</p>
              </div>
              <i className="ri-calendar-check-line text-xl text-white/30" />
            </div>

            <div className="my-6 border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <CalendlyInline />
            </div>

            <div className="grid grid-cols-3" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              {[
                { val: tStatResp, label: tStatRespLabel },
                { val: tStatExp, label: tStatExpLabel },
                { val: tStatClients, label: tStatClientsLabel },
              ].map((s, i) => (
                <div key={i} className="pt-6" style={{ paddingRight: i < 2 ? '16px' : 0, paddingLeft: i > 0 ? '16px' : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : undefined }}>
                  <p className="text-[28px] md:text-[32px] font-black leading-none tracking-[-0.03em] text-white tabular-nums mb-1">{s.val}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/32">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LimeWaveDivider />

      {/* ── Main Content: Form + Map ───────────────────────────────────── */}
      <section className="bg-white py-16 md:py-[112px] px-5 md:px-10" style={{ background: 'oklch(var(--background-50))' }}>
        <div className="sonic-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] bg-white" style={{ border: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            {/* Contact Form */}
            <div style={{ borderRight: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
              <ContactForm />
            </div>

            {/* Map + info sidebar */}
            <div className="flex flex-col">
              <div className="flex-1 min-h-[320px] relative" style={{ background: 'oklch(var(--background-200))' }}>
                <iframe
                  title="Sonic Group Standort — Campus Fichtenhain 46, Krefeld"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2494.8!2d6.545!3d51.335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8bde4ef4c8a1b%3A0x1!2sCampus+Fichtenhain+46%2C+47807+Krefeld!5e0!3m2!1sde!2sde!4v1700000000000"
                  className="w-full h-full absolute inset-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, filter: 'grayscale(1) contrast(1.05)' }}
                  allowFullScreen
                />
              </div>

              <div className="px-8 py-10 md:px-12" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] mb-5" style={{ color: 'oklch(0.55 0.08 115)' }}>Unser Standort</p>
                <h3 className="text-2xl font-black text-foreground-950 mb-2">{tOfficeH3}</h3>
                <p className="text-[15px] leading-relaxed mb-7" style={{ color: 'oklch(var(--foreground-500))' }}>
                  {tOfficeAddr.split('\n').map((line, i) => (<span key={i}>{line}<br /></span>))}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://maps.google.com/?q=Campus+Fichtenhain+46+47807+Krefeld"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] text-foreground-950 hover:bg-foreground-950 hover:text-white transition-colors duration-200 whitespace-nowrap"
                    style={{ border: '1px solid oklch(var(--foreground-950))' }}
                  >
                    <i className="ri-map-pin-line text-sm" />
                    {tOfficeRoute}
                  </a>
                  <a
                    href="tel:+4921514794440"
                    className="inline-flex items-center gap-2 bg-foreground-950 text-white px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] hover:bg-primary-500 hover:text-foreground-950 transition-colors duration-200 whitespace-nowrap"
                  >
                    <i className="ri-phone-line text-sm" />
                    {tOfficeCall}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impressum ─────────────────────────────────────────────────── */}
      <ImpressumSection />

    </div>
  );
}
