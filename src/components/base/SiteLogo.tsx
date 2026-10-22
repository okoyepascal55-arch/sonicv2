import { useMediaStore } from '@/lib/mediaStore';

/**
 * Sonic logo from the dashboard (Medien → Einstellungen → „Logo Light“, slot site_logo) — 22.10.2026.
 * Replaces the old WordPress logo file. Without an upload a text wordmark is shown, never a WP link.
 */
export default function SiteLogo({ alt, className, loading }: { alt: string; className?: string; loading?: 'lazy' | 'eager' }) {
  const { images } = useMediaStore('site_logo');
  const url = images.find((i) => i.url && !i.url.startsWith('data:'))?.url;
  if (url) return <img src={url} alt={alt} className={className} loading={loading} decoding="async" />;
  return (
    <span className={`inline-flex items-center font-black tracking-[0.08em] text-[22px] leading-none ${className ?? ''}`} style={{ color: 'oklch(0.81 0.19 115)', width: 'auto' }} aria-label={alt}>
      SONIC
    </span>
  );
}
