import { useEffect } from 'react';

interface SchemaOrgProps {
  type?: 'organization' | 'service' | 'faq' | 'breadcrumb';
  data?: Record<string, unknown>;
}

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sonic Group',
  url: 'https://sonic-group.de',
  logo: 'https://www.sonic-group.de/wp-content/uploads/elementor/thumbs/SONIC_GESAMTLOGO_LIME-q0lflz24exgoq4608jg9ggegh9pjfwmmc0m1jsee5i.png',
  description: 'Sonic Group ist Europas führende Sales Promotion Agentur für den DACH-Markt. POS-Promotion, Live Video, Events, Staffing & Forecasting seit 2007.',
  foundingDate: '2007',
  areaServed: ['DE', 'AT', 'CH'],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'DE',
    addressRegion: 'Nordrhein-Westfalen',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@sonic-group.de',
    contactType: 'customer service',
    availableLanguage: ['German', 'English'],
  },
  sameAs: [
    'https://www.linkedin.com/company/sonic-group',
    'https://www.instagram.com/sonicgroup',
  ],
};

const SERVICES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Sonic Group Leistungen',
  description: 'Alle Retail Activation Leistungen von Sonic Group für den DACH-Markt',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'POS Full Service',
        description: 'Geschulte Markenbotschafter und datenbasierte POS-Activation am Point of Sale im DACH-Raum.',
        url: 'https://sonic-group.de/leistungen/pos-full-service',
        provider: { '@type': 'Organization', name: 'Sonic Group' },
        areaServed: ['DE', 'AT', 'CH'],
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'Live Video Promotion',
        description: '1:1 Video-Kaufberatung und Live Shopping für den DACH-Markt. Conversion steigern, Retouren senken.',
        url: 'https://sonic-group.de/leistungen/live-video',
        provider: { '@type': 'Organization', name: 'Sonic Group' },
        areaServed: ['DE', 'AT', 'CH'],
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Events & Messen',
        description: 'Modulare Messestände, Roadshows und Brand Activation Events im DACH-Raum.',
        url: 'https://sonic-group.de/leistungen/events-messen',
        provider: { '@type': 'Organization', name: 'Sonic Group' },
        areaServed: ['DE', 'AT', 'CH'],
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Staff as a Service',
        description: '2.000+ festangestellte Promoter und Brand Ambassadors für Retail, Events und POS im DACH-Raum.',
        url: 'https://sonic-group.de/leistungen/staff-as-a-service',
        provider: { '@type': 'Organization', name: 'Sonic Group' },
        areaServed: ['DE', 'AT', 'CH'],
      },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: {
        '@type': 'Service',
        name: 'Kreation & Content',
        description: 'Inhouse Foto- und Videoproduktion, CGI & 3D, Social Content und POS-Design.',
        url: 'https://sonic-group.de/leistungen/kreation-content',
        provider: { '@type': 'Organization', name: 'Sonic Group' },
        areaServed: ['DE', 'AT', 'CH'],
      },
    },
    {
      '@type': 'ListItem',
      position: 6,
      item: {
        '@type': 'Service',
        name: 'Warehouse & Logistik',
        description: '~500 qm Lagerfläche, Fulfillment und europaweite Lieferung für POS-Materialien.',
        url: 'https://sonic-group.de/leistungen/warehouse-logistik',
        provider: { '@type': 'Organization', name: 'Sonic Group' },
        areaServed: ['DE', 'AT', 'CH'],
      },
    },
  ],
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sonic Group',
  url: 'https://sonic-group.de',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://sonic-group.de/fallbeispiele?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

function injectSchema(id: string, data: Record<string, unknown>) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.setAttribute('type', 'application/ld+json');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeSchema(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

/**
 * Injects global Schema.org structured data (Organization + Services + WebSite).
 * Place once in App.tsx or the root layout.
 */
export default function SchemaOrg({ type = 'organization', data }: SchemaOrgProps) {
  useEffect(() => {
    if (type === 'organization') {
      injectSchema('schema-organization', ORGANIZATION_SCHEMA);
      injectSchema('schema-services', SERVICES_SCHEMA);
      injectSchema('schema-website', WEBSITE_SCHEMA);
    } else if (type === 'service' && data) {
      injectSchema('schema-page-service', { '@context': 'https://schema.org', '@type': 'Service', ...data });
    } else if (type === 'faq' && data) {
      injectSchema('schema-page-faq', { '@context': 'https://schema.org', '@type': 'FAQPage', ...data });
    } else if (type === 'breadcrumb' && data) {
      injectSchema('schema-page-breadcrumb', { '@context': 'https://schema.org', '@type': 'BreadcrumbList', ...data });
    }

    return () => {
      if (type !== 'organization') {
        removeSchema('schema-page-service');
        removeSchema('schema-page-faq');
        removeSchema('schema-page-breadcrumb');
      }
    };
  }, [type, data]);

  return null;
}
