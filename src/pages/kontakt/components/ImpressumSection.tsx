export default function ImpressumSection() {
  return (
    <section
      id="impressum"
      className="sonic-section-md px-6 bg-white relative overflow-hidden"
      aria-labelledby="impressum-heading"
    >
      {/* Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 64px)',
        }}
      />

      <div className="max-w-full max-w-[1300px] mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-10 flex items-center gap-4">
          <div
            className="w-1 self-stretch bg-primary-500 flex-shrink-0"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-primary-500 mb-1">
              Rechtliches
            </p>
            <h2
              id="impressum-heading"
              className="sonic-h2 text-foreground-950"
            >
              Impressum
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground-200">

          {/* Angaben */}
          <div className="bg-white px-8 py-10">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary-500 mb-5">
              Angaben gemäß § 5 TMG
            </h3>
            <div className="space-y-1 text-sm text-foreground-600 leading-relaxed">
              <p className="font-black text-foreground-950">Sonic Group GmbH</p>
              <p>Campus Fichtenhain 46</p>
              <p>47807 Krefeld</p>
              <p>Deutschland</p>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground-400 mb-3">
                Vertreten durch
              </h4>
              <p className="text-sm text-foreground-600">Geschäftsführung der Sonic Group GmbH</p>
            </div>
          </div>

          {/* Kontakt */}
          <div className="bg-white px-8 py-10">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary-500 mb-5">
              Kontakt
            </h3>
            <div className="space-y-3 text-sm text-foreground-600">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-primary-500 flex-shrink-0 mt-0.5">
                  <i className="ri-phone-line text-sm" />
                </div>
                <a
                  href="tel:+4921514794440"
                  className="hover:text-primary-500 transition-colors"
                >
                  +49 2151 479 444 0
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-primary-500 flex-shrink-0 mt-0.5">
                  <i className="ri-mail-line text-sm" />
                </div>
                <a
                  href="mailto:info@sonic-group.de"
                  className="hover:text-primary-500 transition-colors break-all"
                >
                  info@sonic-group.de
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-primary-500 flex-shrink-0 mt-0.5">
                  <i className="ri-global-line text-sm" />
                </div>
                <a
                  href="https://www.sonic-group.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-500 transition-colors"
                >
                  www.sonic-group.de
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground-400 mb-3">
                Registrierung
              </h4>
              <div className="space-y-1 text-sm text-foreground-600">
                <p>Registergericht: Amtsgericht Krefeld</p>
                <p>Registernummer: HRB 15784</p>
              </div>
            </div>
          </div>

          {/* Haftung + USt */}
          <div className="bg-white px-8 py-10">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary-500 mb-5">
              Umsatzsteuer-ID
            </h3>
            <p className="text-sm text-foreground-600 leading-relaxed mb-6">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
              <br />
              <span className="font-bold text-foreground-950 mt-1 block">DE 815 258 744</span>
            </p>

            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary-500 mb-3">
              Haftung für Inhalte
            </h3>
            <p className="text-xs text-foreground-400 leading-relaxed mb-5">
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
              diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10
              TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen.
            </p>

            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary-500 mb-3">
              Urheberrecht
            </h3>
            <p className="text-xs text-foreground-400 leading-relaxed">
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