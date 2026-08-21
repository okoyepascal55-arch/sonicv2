import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogImage?: string;
}

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogImage,
}: SEOProps) {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = attr.split('=');
        el.setAttribute(attrName, attrVal.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('meta[name="description"]', 'name=description', description);
    if (keywords) setMeta('meta[name="keywords"]', 'name=keywords', keywords);

    // Canonical
    if (canonical) {
      let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // OG tags
    setMeta('meta[property="og:title"]', 'property=og:title', ogTitle || title);
    setMeta('meta[property="og:description"]', 'property=og:description', ogDescription || description);
    setMeta('meta[property="og:type"]', 'property=og:type', ogType);
    if (canonical) setMeta('meta[property="og:url"]', 'property=og:url', canonical);
    if (ogImage) {
      setMeta('meta[property="og:image"]', 'property=og:image', ogImage);
      setMeta('meta[property="og:image:width"]', 'property=og:image:width', '1200');
      setMeta('meta[property="og:image:height"]', 'property=og:image:height', '630');
    }

    // Twitter
    setMeta('meta[name="twitter:card"]', 'name=twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', ogTitle || title);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', ogDescription || description);
    if (ogImage) setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage);

    // Last modified
    setMeta('meta[name="last-modified"]', 'name=last-modified', new Date().toISOString().split('T')[0]);

    return () => {
      // Restore base title on unmount
      document.title = 'Sonic Group | DACH Market Activation & Retail Excellence';
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogType, ogImage]);
}