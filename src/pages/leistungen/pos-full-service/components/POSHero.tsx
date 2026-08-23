import React from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import LimeBadge from '@/components/base/LimeBadge';

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
      className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[520px] flex items-center justify-center overflow-hidden bg-black"
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
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-primary-500/7 blur-[100px] pointer-events-none z-10" />

      <div className="relative z-20 w-full sonic-container px-6 text-center">
        <div className="hidden sm:flex items-center justify-center gap-2 mb-6 opacity-60">
          <span className="text-white/50 text-xs font-bold">Leistungen</span>
          <i className="ri-arrow-right-s-line text-white/40 text-sm" />
          <span className="text-white/50 text-xs font-bold">POS & Live Video</span>
          <i className="ri-arrow-right-s-line text-white/40 text-sm" />
          <span className="text-primary-500 text-xs font-bold">POS Full Service</span>
        </div>

        <div className="mb-8 flex justify-center">
          <LimeBadge text={tBadge} />
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
          {tH1Line1}<br />
          <span className="text-primary-500">{tH1Accent}</span>
        </h1>

        <p className="text-xl text-white/80 mb-4 font-semibold">
          {tSubtitle}
        </p>

        <p className="text-sm text-white/55 max-w-2xl mx-auto leading-relaxed mb-10">
          {tDesc}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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