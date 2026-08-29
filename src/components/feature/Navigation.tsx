import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useText } from '@/hooks/useText';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('sonic_admin_auth') === 'true');
  }, [location]);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    if (location.pathname === href || (href === '/' && location.pathname === '/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(href);
    }
    setIsMobileMenuOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  };

  const handleLosungenClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/losungen#losungen-carousel');
    setIsMobileMenuOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  };

  const isPageActive = (path: string, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);
  const isLeistungenActive = isPageActive('/leistungen') || isPageActive('/srt');
  const isAboutActive = isPageActive('/ueber-uns') || isPageActive('/sonic-reels');

  // ── Text Store hooks ──
  const tNavHome = useText('common_navigation', 'nav-home', 'Home');
  const tNavLoesungen = useText('common_navigation', 'nav-loesungen', 'Lösungen');
  const tNavLeistungen = useText('common_navigation', 'nav-leistungen', 'Leistungen');
  const tNavLeistungenAll = useText('common_navigation', 'nav-leistungen-all', 'Alle Leistungen');
  const tCatPos = useText('common_navigation', 'nav-cat-pos', 'AM POS VERKAUFEN');
  const tNavPos = useText('common_navigation', 'nav-pos', 'POS Full Service');
  const tNavLvp = useText('common_navigation', 'nav-lvp', 'Live Video Promotion');
  const tNavEvents = useText('common_navigation', 'nav-events', 'Events & Messen');
  const tCatTeam = useText('common_navigation', 'nav-cat-team', 'TEAM AUFBAUEN');
  const tNavStaff = useText('common_navigation', 'nav-staff', 'Staff as a Service');
  const tNavTalentpool = useText('common_navigation', 'nav-talentpool', 'Talentepool');
  const tNavWarehouse = useText('common_navigation', 'nav-warehouse', 'Warehouse & Logistik');
  const tCatData = useText('common_navigation', 'nav-cat-data', 'DATEN & INSIGHTS');
  const tNavSrt = useText('common_navigation', 'nav-srt', 'SRT — Sonic Reporting Tool');
  const tNavForecasting = useText('common_navigation', 'nav-forecasting', 'Forecasting');
  const tCatBrand = useText('common_navigation', 'nav-cat-brand', 'MARKE AUFBAUEN');
  const tNavKreation = useText('common_navigation', 'nav-kreation', 'Kreation & Content');
  const tNavAbout = useText('common_navigation', 'nav-about', 'Über uns');
  const tNavAboutCat = useText('common_navigation', 'nav-about-cat', 'Über Sonic');
  const tNavAboutPage = useText('common_navigation', 'nav-about-about', 'Über uns');
  const tNavAboutReels = useText('common_navigation', 'nav-about-reels', 'Sonic Reels');
  const tNavCases = useText('common_navigation', 'nav-cases', 'Fallbeispiele');
  const tNavBlog = useText('common_navigation', 'nav-blog', 'Blog');
  const tNavCareers = useText('common_navigation', 'nav-careers', 'Karriere');
  const tNavContact = useText('common_navigation', 'nav-contact', 'Kontakt');
  const tNavPhone = useText('common_navigation', 'nav-phone', '+49 2151 479 444 0');

  const textColor = isScrolled
    ? 'text-foreground-700 hover:text-primary-500'
    : 'text-white hover:text-primary-500';

  const navText = (active: boolean) => active ? 'text-primary-500' : textColor;

  const leistungenCategories = [
    {
      title: tCatPos,
      items: [
        { name: tNavPos, href: '/leistungen/pos-full-service', icon: 'ri-store-line' },
        { name: tNavLvp, href: '/leistungen/live-video', icon: 'ri-live-line' },
        { name: tNavEvents, href: '/leistungen/events-messen', icon: 'ri-calendar-event-line' },
      ],
    },
    {
      title: tCatTeam,
      items: [
        { name: tNavStaff, href: '/leistungen/staff-as-a-service', icon: 'ri-user-add-line' },
        { name: tNavTalentpool, href: '/leistungen/talentpool', icon: 'ri-team-line' },
        { name: tNavWarehouse, href: '/leistungen/warehouse-logistik', icon: 'ri-archive-line' },
      ],
    },
    {
      title: tCatData,
      items: [
        { name: tNavSrt, href: '/srt', icon: 'ri-pie-chart-2-line' },
        { name: tNavForecasting, href: '/leistungen/forecasting', icon: 'ri-line-chart-line' },
      ],
    },
    {
      title: tCatBrand,
      items: [
        { name: tNavKreation, href: '/leistungen/kreation-content', icon: 'ri-palette-line' },
      ],
    },
  ];

  const aboutDropdownItems = [
    { name: tNavAboutPage, href: '/ueber-uns', icon: 'ri-information-line' },
    { name: tNavAboutReels, href: '/sonic-reels', icon: 'ri-film-line' },
  ];

  return (
    <>
      <nav
        role="navigation"
        aria-label="Hauptnavigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md'
            : 'bg-transparent'
        }`}
        style={isScrolled ? {
          boxShadow: '0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => handleNavClick('/')} className="flex items-center space-x-3 cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              <img
                src="https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/SONIC_GESAMTLOGO_LIME-q0lflz24exgoq4608jg9ggegh9pjfwmmc0m1jsee5i.png"
                alt="Sonic Group — Zur Startseite"
                className="h-8 md:h-10 w-auto"
              />
            </button>

            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => handleNavClick('/')} className={`text-sm font-medium transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${navText(isPageActive('/', true))}`}>
                {tNavHome}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${isPageActive('/', true) ? 'w-full' : 'w-0'}`}></span>
              </button>

              <button onClick={handleLosungenClick} className={`text-sm font-medium transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${navText(isPageActive('/losungen'))}`}>
                {tNavLoesungen}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${isPageActive('/losungen') ? 'w-full' : 'w-0'}`}></span>
              </button>

              <div className="relative" onMouseEnter={() => setActiveDropdown('leistungen')} onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'leistungen' ? null : 'leistungen')}
                  className={`text-sm font-medium transition-colors relative group flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${navText(isLeistungenActive)}`} aria-haspopup="true" aria-expanded={activeDropdown === 'leistungen'}>
                  {tNavLeistungen}
                  <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${activeDropdown === 'leistungen' ? 'rotate-180' : ''}`}></i>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${isLeistungenActive ? 'w-full' : 'w-0'}`}></span>
                </button>
                {activeDropdown === 'leistungen' && (
                  <div className="absolute top-full left-0 pt-4" style={{ zIndex: 200 }}>
                    <div className="w-80 bg-background-50 border border-background-300/60 py-3" style={{ borderRadius: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)' }}>
                    <button onClick={() => handleNavClick('/leistungen')}
                      className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-black text-foreground-800 hover:text-primary-500 hover:bg-[#FAFDF5] transition-colors cursor-pointer border-b border-background-200/70 mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1">
                      <i className="ri-grid-line text-base text-primary-500"></i>
                      {tNavLeistungenAll}
                    </button>
                    {leistungenCategories.map((cat, catIdx) => (
                      <div key={catIdx} className="mb-2">
                        <div className="px-4 py-1.5">
                          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground-500">{cat.title}</span>
                        </div>
                        {cat.items.map((item, itemIdx) => (
                          <button key={itemIdx} onClick={() => handleNavClick(item.href)}
                            className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm font-medium text-foreground-700 hover:text-primary-500 hover:bg-[#FAFDF5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1">
                            <i className={`${item.icon} text-base text-primary-500/60 flex-shrink-0`}></i>
                            <span className="truncate">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" onMouseEnter={() => setActiveDropdown('about')} onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                  className={`text-sm font-medium transition-colors relative group flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${navText(isAboutActive)}`} aria-haspopup="true" aria-expanded={activeDropdown === 'about'}>
                  {tNavAbout}
                  <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${activeDropdown === 'about' ? 'rotate-180' : ''}`}></i>
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${isAboutActive ? 'w-full' : 'w-0'}`}></span>
                </button>
                {activeDropdown === 'about' && (
                  <div className="absolute top-full left-0 pt-4" style={{ zIndex: 200 }}>
                    <div className="w-52 bg-background-50 border border-background-300/60 py-2" style={{ borderRadius: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)' }}>
                    <div className="px-4 pt-2 pb-1">
                      <span className="text-xs font-black tracking-[0.2em] uppercase text-primary-500">{tNavAboutCat}</span>
                    </div>
                    {aboutDropdownItems.map((item, index) => (
                      <button key={index} onClick={() => handleNavClick(item.href)}
                        className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-medium text-foreground-700 hover:text-primary-500 hover:bg-[#FAFDF5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1">
                        <i className={`${item.icon} text-base text-primary-500/60 flex-shrink-0`}></i>
                        <span className="truncate">{item.name}</span>
                      </button>
                    ))}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => handleNavClick('/fallbeispiele')} className={`text-sm font-medium transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${navText(isPageActive('/fallbeispiele'))}`}>
                {tNavCases}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${isPageActive('/fallbeispiele') ? 'w-full' : 'w-0'}`}></span>
              </button>

              <button onClick={() => handleNavClick('/blog')} className={`text-sm font-medium transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${navText(isPageActive('/blog'))}`}>
                {tNavBlog}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${isPageActive('/blog') ? 'w-full' : 'w-0'}`}></span>
              </button>

              <button onClick={() => handleNavClick('/karriere')} className={`text-sm font-medium transition-colors relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-sm ${navText(isPageActive('/karriere'))}`}>
                {tNavCareers}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${isPageActive('/karriere') ? 'w-full' : 'w-0'}`}></span>
              </button>

              <button
                onClick={() => handleNavClick('/kontakt')}
                className="px-6 py-2.5 bg-primary-500 text-foreground-950 text-sm font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer"
                style={{ borderRadius: 0 }}>
                {tNavContact}
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 transition-colors z-[60] relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                isMobileMenuOpen ? 'text-foreground-950' : isScrolled ? 'text-foreground-950 hover:bg-[#FAFDF5]' : 'text-foreground-950 bg-white/70 backdrop-blur-sm hover:bg-white/90'
              }`}
              aria-label={isMobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}

      <div
        ref={menuRef}
        id="mobile-menu-panel"
        className={`fixed top-0 right-0 bottom-0 z-[60] lg:hidden w-[70vw] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-[calc(env(safe-area-inset-top,0px)+1rem)] pb-4 border-b border-background-200/70 flex-shrink-0">
          <img
            src="https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/SONIC_GESAMTLOGO_LIME-q0lflz24exgoq4608jg9ggegh9pjfwmmc0m1jsee5i.png"
            alt="Sonic Group Logo"
            className="h-8 w-auto"
          />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-11 h-11 flex items-center justify-center text-foreground-500 hover:bg-[#FAFDF5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label="Menü schließen"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-1">
            <button onClick={() => handleNavClick('/')}
              className={`flex items-center gap-3 w-full px-3 py-3 font-semibold transition-colors text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isPageActive('/', true) ? 'text-primary-500 bg-primary-500/8' : 'text-foreground-900 hover:bg-primary-500/10 hover:text-primary-500'}`}>
              <i className={`ri-home-line text-base w-5 text-center ${isPageActive('/', true) ? 'text-primary-500' : 'text-foreground-500'}`}></i>
              {tNavHome}
            </button>

            <button onClick={handleLosungenClick}
              className={`flex items-center gap-3 w-full px-3 py-3 font-semibold transition-colors text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isPageActive('/losungen') ? 'text-primary-500 bg-primary-500/8' : 'text-foreground-900 hover:bg-primary-500/10 hover:text-primary-500'}`}>
              <i className={`ri-lightbulb-line text-base w-5 text-center ${isPageActive('/losungen') ? 'text-primary-500' : 'text-foreground-500'}`}></i>
              {tNavLoesungen}
            </button>
          </div>

          <div className="my-3 mx-4 border-t border-background-200/70" />

          <div className="px-4">
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'leistungen' ? null : 'leistungen')}
              className={`flex items-center justify-between w-full px-3 py-3 font-semibold transition-colors text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isLeistungenActive ? 'text-primary-500 bg-primary-500/8' : 'text-foreground-900 hover:bg-primary-500/10 hover:text-primary-500'}`}
              aria-expanded={mobileExpanded === 'leistungen'}
              aria-controls="mobile-leistungen-submenu"
            >
              <span className="flex items-center gap-3">
                <i className={`ri-briefcase-line text-base w-5 text-center ${isLeistungenActive ? 'text-primary-500' : 'text-foreground-500'}`}></i>
                {tNavLeistungen}
              </span>
              <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${mobileExpanded === 'leistungen' ? 'rotate-180 text-primary-500' : 'text-foreground-500'}`}></i>
            </button>

            {mobileExpanded === 'leistungen' && (
              <div id="mobile-leistungen-submenu" className="mt-1 ml-8 space-y-0.5 pb-2">
                <button onClick={() => handleNavClick('/leistungen')}
                  className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm font-black text-foreground-700 hover:text-primary-500 hover:bg-primary-500/8 transition-colors cursor-pointer border-b border-background-200/70 mb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                  <i className="ri-grid-line text-sm text-primary-500"></i>
                  {tNavLeistungenAll}
                </button>
                {leistungenCategories.map((cat, catIdx) => (
                  <div key={catIdx} className="mb-1">
                    <div className="text-[10px] font-black tracking-[0.2em] uppercase text-foreground-500 px-3 py-1">{cat.title}</div>
                    {cat.items.map((item, itemIdx) => (
                      <button key={itemIdx} onClick={() => handleNavClick(item.href)}
                        className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-foreground-600 hover:text-primary-500 hover:bg-primary-500/8 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                        <i className={`${item.icon} text-sm text-primary-500/50`}></i>
                        {item.name}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 mt-1">
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'about' ? null : 'about')}
              className={`flex items-center justify-between w-full px-3 py-3 font-semibold transition-colors text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isAboutActive ? 'text-primary-500 bg-primary-500/8' : 'text-foreground-900 hover:bg-primary-500/10 hover:text-primary-500'}`}
              aria-expanded={mobileExpanded === 'about'}
              aria-controls="mobile-about-submenu"
            >
              <span className="flex items-center gap-3">
                <i className={`ri-information-line text-base w-5 text-center ${isAboutActive ? 'text-primary-500' : 'text-foreground-500'}`}></i>
                {tNavAbout}
              </span>
              <i className={`ri-arrow-down-s-line text-base transition-transform duration-300 ${mobileExpanded === 'about' ? 'rotate-180 text-primary-500' : 'text-foreground-500'}`}></i>
            </button>
            {mobileExpanded === 'about' && (
              <div id="mobile-about-submenu" className="mt-1 ml-8 space-y-0.5 pb-2">
                <div className="text-xs font-black tracking-[0.2em] uppercase text-primary-500 px-3 py-1.5">{tNavAboutCat}</div>
                {aboutDropdownItems.map((item, index) => (
                  <button key={index} onClick={() => handleNavClick(item.href)}
                    className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-sm text-foreground-600 hover:text-primary-500 hover:bg-primary-500/8 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                    <i className={`${item.icon} text-sm text-primary-500/50`}></i>
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="my-3 mx-4 border-t border-background-200/70" />

          <div className="px-4 space-y-1">
            <button onClick={() => handleNavClick('/fallbeispiele')}
              className={`flex items-center gap-3 w-full px-3 py-3 font-semibold transition-colors text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isPageActive('/fallbeispiele') ? 'text-primary-500 bg-primary-500/8' : 'text-foreground-900 hover:bg-primary-500/10 hover:text-primary-500'}`}>
              <i className={`ri-file-chart-line text-base w-5 text-center ${isPageActive('/fallbeispiele') ? 'text-primary-500' : 'text-foreground-500'}`}></i>
              {tNavCases}
            </button>

            <button onClick={() => handleNavClick('/blog')}
              className={`flex items-center gap-3 w-full px-3 py-3 font-semibold transition-colors text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isPageActive('/blog') ? 'text-primary-500 bg-primary-500/8' : 'text-foreground-900 hover:bg-primary-500/10 hover:text-primary-500'}`}>
              <i className={`ri-article-line text-base w-5 text-center ${isPageActive('/blog') ? 'text-primary-500' : 'text-foreground-500'}`}></i>
              {tNavBlog}
            </button>

            <button onClick={() => handleNavClick('/karriere')}
              className={`flex items-center gap-3 w-full px-3 py-3 font-semibold transition-colors text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${isPageActive('/karriere') ? 'text-primary-500 bg-primary-500/8' : 'text-foreground-900 hover:bg-primary-500/10 hover:text-primary-500'}`}>
              <i className={`ri-user-add-line text-base w-5 text-center ${isPageActive('/karriere') ? 'text-primary-500' : 'text-foreground-500'}`}></i>
              {tNavCareers}
            </button>

            <button onClick={() => handleNavClick('/kontakt')}
              className="flex items-center gap-3 w-full px-3 py-3 text-foreground-900 hover:bg-primary-500/10 hover:text-primary-500 font-semibold transition-colors text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
              <i className="ri-mail-send-line text-base w-5 text-center text-foreground-500"></i>
              {tNavContact}
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 p-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] border-t border-background-200/70 bg-[#FAFDF5]">
          <button
            onClick={() => handleNavClick('/kontakt')}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary-500 text-foreground-950 text-sm font-black hover:bg-white hover:text-foreground-950 transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 cursor-pointer"
            style={{ borderRadius: 0 }}>
            <i className="ri-mail-line"></i>
            {tNavContact}
          </button>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a href="tel:+4921514794440" className="flex items-center gap-1.5 text-xs text-foreground-500 hover:text-primary-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm">
              <i className="ri-phone-line"></i>
              {tNavPhone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}