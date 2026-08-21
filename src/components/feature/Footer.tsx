import { Link } from 'react-router-dom';
import FooterTopologyField from './FooterTopologyField';
import { useText } from '@/hooks/useText';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // ── Text Store hooks ──
  const tCompany = useText('common_footer', 'footer-company', 'Sonic Sales Support GmbH');
  const tAddress = useText('common_footer', 'footer-address', 'Campus Fichtenhain 46');
  const tCity = useText('common_footer', 'footer-city', '47807 Krefeld, Germany');
  const tPhone = useText('common_footer', 'footer-phone', '+49 2151 479 444 0');
  const tEmail = useText('common_footer', 'footer-email', 'info@sonic-group.de');
  const tSalesBadge = useText('common_footer', 'footer-sales-badge', 'Part of €2B+ in influenced sales');
  const tColLeistungen = useText('common_footer', 'footer-col-leistungen', '— Leistungen');
  const tLinkStaff = useText('common_footer', 'footer-link-staff', 'Staff as a Service');
  const tLinkPos = useText('common_footer', 'footer-link-pos', 'POS Full Service');
  const tLinkEvents = useText('common_footer', 'footer-link-events', 'Events & Messen');
  const tLinkKreation = useText('common_footer', 'footer-link-kreation', 'Kreation & Content');
  const tLinkWarehouse = useText('common_footer', 'footer-link-warehouse', 'Warehouse & Logistik');
  const tLinkSrt = useText('common_footer', 'footer-link-srt', 'SRT Technologie');
  const tLinkLvp = useText('common_footer', 'footer-link-lvp', 'Live Video Promotion');
  const tColCompany = useText('common_footer', 'footer-col-company', '— Unternehmen');
  const tLinkAbout = useText('common_footer', 'footer-link-about', 'Über uns');
  const tLinkCareers = useText('common_footer', 'footer-link-careers', 'Karriere');
  const tLinkCases = useText('common_footer', 'footer-link-cases', 'Fallbeispiele');
  const tLinkReels = useText('common_footer', 'footer-link-reels', 'Sonic Reels');
  const tLinkRatgeber = useText('common_footer', 'footer-link-ratgeber', 'Ratgeber');
  const tColLegal = useText('common_footer', 'footer-col-legal', '— Rechtliches');
  const tLinkKontakt = useText('common_footer', 'footer-link-kontakt', 'Kontakt');
  const tLinkImpressum = useText('common_footer', 'footer-link-impressum', 'Impressum');
  const tLinkDatenschutz = useText('common_footer', 'footer-link-datenschutz', 'Datenschutz');
  const tLinkAdmin = useText('common_footer', 'footer-link-admin', 'Admin');
  const tCopyright = useText('common_footer', 'footer-copyright', '© {year} Sonic Sales Support GmbH. Alle Rechte vorbehalten.');
  const tBuiltBy = useText('common_footer', 'footer-builtby', 'Built by Reezan Digital');
  const tIso = useText('common_footer', 'footer-iso', 'ISO Certified');
  const tGdpr = useText('common_footer', 'footer-gdpr', 'GDPR Compliant');

  const footerLinks = {
    solutions: [
      { label: tLinkStaff, href: '/leistungen/staff-as-a-service' },
      { label: tLinkPos, href: '/leistungen/pos-full-service' },
      { label: tLinkEvents, href: '/leistungen/events-messen' },
      { label: tLinkKreation, href: '/leistungen/kreation-content' },
      { label: tLinkWarehouse, href: '/leistungen/warehouse-logistik' },
      { label: tLinkSrt, href: '/srt' },
      { label: tLinkLvp, href: '/leistungen/live-video' },
    ],
    company: [
      { label: tLinkAbout, href: '/ueber-uns' },
      { label: tLinkCareers, href: '/karriere' },
      { label: tLinkCases, href: '/fallbeispiele' },
      { label: tLinkReels, href: '/sonic-reels' },
      { label: tLinkRatgeber, href: '/ratgeber' },
    ],
    legal: [
      { label: tLinkKontakt, href: '/#contact' },
      { label: tLinkImpressum, href: 'https://www.sonic-group.de/impressum/' },
      { label: tLinkDatenschutz, href: 'https://www.sonic-group.de/datenschutz/' },
      { label: tLinkAdmin, href: '/dashboard' },
    ],
  };

  return (
    <footer className="relative bg-foreground-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-6 md:py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-4 md:mb-6">

          {/* Brand Column */}
          <div className="md:col-span-3 lg:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-3 mb-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
            >
              <img
                src="https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/SONIC_GESAMTLOGO_LIME-q0lflz24exgoq4608jg9ggegh9pjfwmmc0m1jsee5i.png"
                alt="Sonic Group"
                className="h-9 md:h-11 w-auto"
              />
            </Link>

            <div className="mb-3">
              <p className="text-background-50/60 text-sm md:text-[12px] leading-relaxed">
                {tCompany}<br />
                {tAddress}<br />
                {tCity}
              </p>
            </div>

            <div className="space-y-1 mb-3">
              <a
                href="tel:+4921514794440"
                className="flex items-center gap-2.5 text-background-50/60 hover:text-primary-500 transition-colors text-sm md:text-[12px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-phone-line text-primary-500 text-sm"></i>
                </span>
                {tPhone}
              </a>
              <a
                href="mailto:info@sonic-group.de"
                className="flex items-center gap-2.5 text-background-50/60 hover:text-primary-500 transition-colors text-sm md:text-[12px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-mail-line text-primary-500 text-sm"></i>
                </span>
                {tEmail}
              </a>
            </div>

            <div className="flex items-center gap-1.5 mb-3">
              <a
                href="https://www.linkedin.com/company/sonic-sales-support/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-11 h-11 md:w-7 md:h-7 bg-foreground-800 border border-foreground-700 flex items-center justify-center hover:bg-foreground-700 hover:border-foreground-600 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
                aria-label="Sonic Group on LinkedIn"
              >
                <i className="ri-linkedin-fill text-background-50/70 text-xs"></i>
              </a>
              <a
                href="https://www.instagram.com/sonic_group/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-11 h-11 md:w-7 md:h-7 bg-foreground-800 border border-foreground-700 flex items-center justify-center hover:bg-foreground-700 hover:border-foreground-600 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
                aria-label="Sonic Group on Instagram"
              >
                <i className="ri-instagram-line text-background-50/70 text-xs"></i>
              </a>
              <a
                href="https://www.facebook.com/SonicSalesSupport/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="w-11 h-11 md:w-7 md:h-7 bg-foreground-800 border border-foreground-700 flex items-center justify-center hover:bg-foreground-700 hover:border-foreground-600 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
                aria-label="Sonic Group on Facebook"
              >
                <i className="ri-facebook-fill text-background-50/70 text-xs"></i>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary-500/10 border border-primary-500/25 flex items-center justify-center flex-shrink-0">
                <i className="ri-trophy-line text-primary-500 text-xs"></i>
              </div>
              <p className="text-sm md:text-[12px] text-background-50/60">
                {tSalesBadge}
              </p>
            </div>
          </div>

          {/* Leistungen */}
          <div className="pt-3 md:pt-0 border-t border-background-50/6 md:border-t-0">
            <h4 className="text-background-50 mb-2 md:mb-3 text-sm md:text-[12px] font-semibold uppercase tracking-[0.10em]">
              {tColLeistungen}
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-background-50/50 hover:text-primary-500 transition-colors text-sm md:text-[12px] whitespace-nowrap cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div className="pt-3 md:pt-0 border-t border-background-50/6 md:border-t-0">
            <h4 className="text-background-50 mb-2 md:mb-3 text-sm md:text-[12px] font-semibold uppercase tracking-[0.10em]">
              {tColCompany}
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-background-50/50 hover:text-primary-500 transition-colors text-sm md:text-[12px] whitespace-nowrap cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div className="pt-3 md:pt-0 border-t border-background-50/6 md:border-t-0">
            <h4 className="text-background-50 mb-2 md:mb-3 text-sm md:text-[12px] font-semibold uppercase tracking-[0.10em]">
              {tColLegal}
            </h4>
            <ul className="space-y-1.5">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-background-50/50 hover:text-primary-500 transition-colors text-sm md:text-[12px] whitespace-nowrap cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-background-50/50 hover:text-primary-500 transition-colors text-sm md:text-[12px] whitespace-nowrap cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-background-50/10 pb-[env(safe-area-inset-bottom,0px)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-background-50/40 text-xs text-center">
              <p>{tCopyright.replace('{year}', String(currentYear))}</p>
              <span className="hidden sm:inline text-background-50/15">|</span>
              <a
                href="https://reezandigital.com"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-background-50/40 hover:text-primary-500 transition-colors cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-900"
              >
                {tBuiltBy}
              </a>
            </div>
            <div className="flex items-center gap-4 md:gap-5">
              <span className="flex items-center gap-1 text-xs text-background-50/40">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-shield-check-line text-background-50/40 text-xs"></i>
                </span>
                {tIso}
              </span>
              <span className="flex items-center gap-1 text-xs text-background-50/40">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-lock-line text-background-50/40 text-xs"></i>
                </span>
                {tGdpr}
              </span>
            </div>
          </div>
        </div>
      </div>

      <FooterTopologyField />
    </footer>
  );
}