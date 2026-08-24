export default function ImpressumSection() {
  return (
    <section
      id="impressum"
      className="bg-white py-16 md:py-24 px-5 md:px-10 border-t"
      style={{ borderColor: 'oklch(var(--foreground-950) / 0.08)' }}
      aria-labelledby="impressum-heading"
    >
      <div className="sonic-container">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="w-7 h-0.5 bg-primary-500 flex-shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: 'oklch(0.55 0.08 115)' }}>Rechtliches</span>
          <h2 id="impressum-heading" className="font-black text-foreground-950 ml-4" style={{ fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', letterSpacing: '-0.02em' }}>
            Impressum
          </h2>
        </div>

        <div className="grid md:grid-cols-3" style={{ borderTop: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
          {/* Angaben */}
          <div className="py-10 pr-12" style={{ borderRight: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            <p className="text-[10px] font-black uppercase tracking-[0.26em] mb-5" style={{ color: 'oklch(var(--foreground-500))' }}>
              Angaben gemäß § 5 TMG
            </p>
            <div className="space-y-1 text-sm leading-relaxed" style={{ color: 'oklch(var(--foreground-600))' }}>
              <p className="font-black text-foreground-950">Sonic Group GmbH</p>
              <p>Campus Fichtenhain 46</p>
              <p>47807 Krefeld</p>
              <p>Deutschland</p>
            </div>

            <div className="mt-7">
              <p className="text-[10px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: 'oklch(var(--foreground-500))' }}>
                Vertreten durch
              </p>
              <p className="text-sm" style={{ color: 'oklch(var(--foreground-600))' }}>Geschäftsführung der Sonic Group GmbH</p>
            </div>
          </div>

          {/* Kontakt */}
          <div className="py-10 px-12" style={{ borderRight: '1px solid oklch(var(--foreground-950) / 0.1)' }}>
            <p className="text-[10px] font-black uppercase tracking-[0.26em] mb-5" style={{ color: 'oklch(var(--foreground-500))' }}>
              Kontakt
            </p>
            <div className="space-y-2 text-sm" style={{ color: 'oklch(var(--foreground-600))' }}>
              <p><a href="tel:+4921514794440" className="hover:text-primary-500 transition-colors">+49 2151 479 444 0</a></p>
              <p><a href="mailto:info@sonic-group.de" className="hover:text-primary-500 transition-colors break-all">info@sonic-group.de</a></p>
              <p><a href="https://www.sonic-group.de" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">www.sonic-group.de</a></p>
            </div>

            <div className="mt-7">
              <p className="text-[10px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: 'oklch(var(--foreground-500))' }}>
                Registrierung
              </p>
              <div className="space-y-1 text-sm leading-relaxed" style={{ color: 'oklch(var(--foreground-600))' }}>
                <p>Registergericht: Amtsgericht Krefeld</p>
                <p>Registernummer: HRB 15784</p>
              </div>
            </div>
          </div>

          {/* Haftung + USt */}
          <div className="py-10 pl-12">
            <p className="text-[10px] font-black uppercase tracking-[0.26em] mb-5" style={{ color: 'oklch(var(--foreground-500))' }}>
              Umsatzsteuer-ID
            </p>
            <p className="text-sm leading-relaxed mb-7" style={{ color: 'oklch(var(--foreground-600))' }}>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
              <br />
              <span className="font-black text-foreground-950">DE 815 258 744</span>
            </p>

            <p className="text-[10px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: 'oklch(var(--foreground-500))' }}>
              Haftung für Inhalte
            </p>
            <p className="text-[13px] leading-relaxed mb-6" style={{ color: 'oklch(var(--foreground-400))' }}>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
              diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
              TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen.
            </p>

            <p className="text-[10px] font-black uppercase tracking-[0.26em] mb-2" style={{ color: 'oklch(var(--foreground-500))' }}>
              Urheberrecht
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: 'oklch(var(--foreground-400))' }}>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
              Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
