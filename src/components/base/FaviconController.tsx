import { useEffect } from 'react';
import { useMediaStore, resolveImageUrl } from '@/lib/mediaStore';

/**
 * Reads site_favicon from the Media Store and updates the <link rel="icon">
 * element in the document head. Falls back to the existing icon if nothing
 * is uploaded via the dashboard.
 */
export default function FaviconController() {
  const { images } = useMediaStore('site_favicon');

  useEffect(() => {
    const url = images[0]?.url;
    if (!url) return;

    const resolved = resolveImageUrl(url);
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = url.endsWith('.svg') ? 'image/svg+xml' : 'image/png';
    link.href = resolved;
  }, [images]);

  return null;
}
