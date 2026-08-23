import React from 'react';
import { CONTACT_EMAIL } from '@/lib/contact';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';
import { useText } from '@/hooks/useText';
import LimeBadge from '@/components/base/LimeBadge';

export default function StaffHero() {
  const { images: staffHeroImages } = useMediaStore('leistungen_staff_images');
  const heroImage = staffHeroImages[0]?.url
    ? resolveImageUrl(staffHeroImages[0].url)
    : 'https://www.sonic-group.de/wp-content/uploads/2023/02/3-1-1024x448.jpg';

  const tBadge = useText('leistungen_staff', 'staff-hero-badge', 'Staff as a Service');
  const tH1Line1 = useText('leistungen_staff', 'staff-hero-heading-line1', 'Rundum-Service');
  const tH1Accent = useText('leistungen_staff', 'staff-hero-heading-accent', 'beim Personal.');
  const tSubtitle = useText('leistungen_staff', 'staff-hero-subtitle', 'Markenfans anheuern: Für Sell-out, Sell-in, Schulungen, Brand Activation und mehr.');
  const tDesc = useText('leistungen_staff', 'staff-hero-description', 'Wir übernehmen Recruiting, Payroll und Steuerung, bspw. via Arbeitnehmerüberlassung.');

  return (
    <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[520px] flex items-center justify-center overflow-hidden bg-black" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <img
        src={heroImage}
        alt="Staff as a Service Team"
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 100%)' }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8D400]/7 blur-[100px] pointer-events-none z-10" />

      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center">
        <div className="hidden sm:flex items-center justify-center gap-2 mb-6 opacity-60">
          <span className="text-white/50 text-xs font-bold">Leistungen</span>
          <i className="ri-arrow-right-s-line text-white/40 text-sm"></i>
          <span className="text-white/50 text-xs font-bold">Personal & Staffing</span>
          <i className="ri-arrow-right-s-line text-white/40 text-sm"></i>
          <span className="text-[#C8D400] text-xs font-bold">Staff as a Service</span>
        </div>

        <div className="mb-8 flex justify-center">
          <LimeBadge text={tBadge} />
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
          {tH1Line1}<br />
          <span className="text-[#C8D400]">{tH1Accent}</span>
        </h1>
        <p className="text-xl text-white/80 mb-4 font-semibold">
          {tSubtitle}
        </p>
        <p className="text-sm text-white/55 max-w-2xl mx-auto leading-relaxed mb-10">
          {tDesc}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
          {[
            { val: '>2.000', label: 'Talente im Pool' },
            { val: '>1,35 Mio.', label: 'Einsätze' },
            { val: '100 %', label: 'Festangestellt bei Sonic' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black text-[#C8D400] tabular-nums">{s.val}</div>
              <div className="text-white/45 text-xs font-bold uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Staff%20as%20a%20Service%20Beratung`}
            className="inline-flex items-center gap-2 bg-[#C8D400] text-white px-7 py-3 font-black hover:bg-white hover:text-[#111] transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
          >
            <i className="ri-calendar-line"></i>
            Beratungsgespräch buchen
          </a>
          <a
            href="/leistungen/talentpool"
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className="inline-flex items-center gap-2 border-2 border-white/25 text-white px-6 py-3 font-black hover:border-[#C8D400] hover:text-[#C8D400] transition-all duration-300 whitespace-nowrap cursor-pointer text-sm"
          >
            Talentepool entdecken
            <i className="ri-arrow-right-line"></i>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}