import { useEffect } from 'react';

declare global {
  interface Window {
    Calendly: any;
  }
}

const CALENDLY_URL = 'https://calendly.com/sonic-group-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1a1a1a&text_color=ffffff&primary_color=c8d300';

export function openCalendly() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, '_blank');
  }
}

export default function CalendlyWidget() {
  useEffect(() => {
    // 1. Load CSS
    const link = document.createElement('link');
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // 2. Load JS
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 3. Initialize Badge Widget
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: CALENDLY_URL,
          text: 'Kostenlose 30-Min Beratung',
          color: '#c8d300',
          textColor: 'oklch(var(--foreground-950))',
          branding: false
        });
      }
      // 4. Mobile size fix — Calendly badge is fixed-size, override for small screens
      const mobileStyle = document.createElement('style');
      mobileStyle.id = 'calendly-mobile-fix';
      mobileStyle.textContent = `
        @media (max-width: 640px) {
          .calendly-badge-widget .calendly-badge-content {
            font-size: 11px !important;
            padding: 8px 14px !important;
          }
        }
      `;
      document.head.appendChild(mobileStyle);
    };

    // 4. Global Click Listener for 'Beratungsgespräch buchen' buttons
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Look for the text in the target or its closest parent (to handle icons inside buttons)
      const button = target.closest('a, button');
      if (button && button.textContent?.includes('Beratungsgespräch buchen')) {
        e.preventDefault();
        e.stopPropagation();
        openCalendly();
      }
    };

    document.addEventListener('click', handleGlobalClick, true);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
      document.removeEventListener('click', handleGlobalClick, true);
      
      // Cleanup badge
      const badge = document.querySelector('.calendly-badge-widget');
      if (badge) badge.remove();
      const mobileStyle = document.getElementById('calendly-mobile-fix');
      if (mobileStyle) mobileStyle.remove();
    };
  }, []);

  return null;
}
