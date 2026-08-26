import React from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';

export default function POSHero() {
  const { images: posHeroImages } = useMediaStore('leistungen_pos_images');
  const heroImage = posHeroImages[0]?.url
    ? resolveImageUrl(posHeroImages[0].url)
    : 'https://www.sonic-group.de/wp-content/uploads/2023/06/POS_NEU.jpg';

  const tBadge = useText('leistungen_pos', 'pos-hero-badge', 'POS Full Service');
  const tH1Line1 = useText('leistungen_pos', 'pos-hero-heading-line1', 'End-to-end-Partner');
  const tH1Accent = useText('leistungen_pos', 'pos-hero-heading-accent', 'für den POS.');
  const tSubtitle = useText('leistungen_pos', 'pos-hero-subtitle', 'Alles aus einer Hand. Design, Displays, Möbel, Collateral, Give-aways, Logistik, Manntage.');
  const tDesc = useText('leistungen_pos', 'pos-hero-description', 'Durchgetaktet. Von der Kreation bis zum letzten Handgriff übernehmen wir alle Leistungen.');

  return (
    <section
      className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[520px] flex flex-col justify-end overflow-hidden bg-foreground-950"
      style={{ paddingTop: '80px', paddingBottom: '60px' }}
    >
      <img
        src={heroImage}
        alt="POS Full Service"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      <div className="relative z-20 w-full sonic-container px-4 md:px-8 pb-10 md:pb-14">

        {/* v3 eyebrow — 28px lime hairline + label */}

        <div className="flex items-center gap-3 mb-5 md:mb-6">

          <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />

          <span className="text-[11px] font-black uppercase tracking-[0.24em] text-primary-500">{tBadge}</span>

        </div>

        <h1 className="leist-h1-sub text-white mb-5 md:mb-6">
          {tH1Line1}<br />
          <span className="text-primary-500">{tH1Accent}</span>
        </h1>

        <p className="text-sm md:text-base text-white/75 mb-3 leading-relaxed max-w-[520px]">
          {tSubtitle}
        </p>

        <p className="text-xs md:text-sm text-white/55 max-w-[480px] leading-relaxed mb-8">
          {tDesc}
        </p>

        <div className="grid grid-cols-3 gap-2 md:gap-8 mb-8 border-t border-white/15 pt-5">
          {[
            { val: '>100.000', label: 'POS bestückt' },
            { val: '>650.000', label: 'Manntage' },
            { val: '>5 Mio.', label: 'Produkte verkauft' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black text-primary-500 tabular-nums">{s.val}</div>
              <div className="text-white/45 text-xs font-bold uppercase tracking-wider mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=POS%20Full%20Service%20Beratung`}
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-7 py-3 font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
          >
            <i className="ri-calendar-line" />
            POS-Projekt besprechen
          </a>

          <a
            href="/leistungen/pos-full-service"
            onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
            className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-6 py-3 font-black hover:border-primary-500 hover:text-primary-500 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
          >
            POS Full Service
            <i className="ri-arrow-right-line" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}