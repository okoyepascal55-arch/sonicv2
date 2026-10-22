/**
 * Placeholder for images that have not been uploaded yet (22.10.2026).
 * A dark panel with an image symbol and „Bild folgt“, so it is obvious that a
 * photo belongs here. Replaces every old WordPress (sonic-group.de/wp-content)
 * fallback — the site no longer loads anything from the old WordPress media.
 * Upload the real photo in the dashboard and it replaces the panel automatically.
 */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
<rect width="1600" height="1000" fill="#1c1d19"/>
<rect x="24" y="24" width="1552" height="952" fill="none" stroke="#C8D400" stroke-opacity="0.35" stroke-width="3" stroke-dasharray="14 12"/>
<g transform="translate(800 440)" fill="none" stroke="#C8D400" stroke-width="10" stroke-linejoin="round">
<rect x="-90" y="-66" width="180" height="132"/>
<circle cx="-34" cy="-18" r="16"/>
<path d="M-90 46 L-24 -6 L22 34 L52 10 L90 42"/>
</g>
<text x="800" y="600" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="900" letter-spacing="10" fill="#C8D400" fill-opacity="0.8">BILD FOLGT</text>
</svg>`;

export const IMAGE_PLACEHOLDER = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

/** Old WordPress media links are never shown — they count as „no image“. */
export function isLegacyWpUrl(url?: string | null): boolean {
  return !!url && /sonic-group\.de\/wp-content\//i.test(url);
}

/** The url if it is a real (non-WordPress) image, otherwise the placeholder. */
export function imageOrPlaceholder(url?: string | null): string {
  return url && !isLegacyWpUrl(url) ? url : IMAGE_PLACEHOLDER;
}
