/* ─────────────────────────────────────────────
   YouTube link helpers
   Accepts any common form an editor might paste into the dashboard:
     https://www.youtube.com/watch?v=ID   https://youtu.be/ID
     https://www.youtube.com/embed/ID     https://www.youtube.com/shorts/ID
     https://www.youtube.com/live/ID      or the bare 11-character ID
───────────────────────────────────────────── */

const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export function getYouTubeId(raw: string | undefined | null): string {
  const value = (raw || '').trim();
  if (!value) return '';
  if (ID_PATTERN.test(value)) return value;

  try {
    const url = new URL(value.startsWith('http') ? value : `https://${value}`);
    const host = url.hostname.replace(/^www\.|^m\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0] || '';
      return ID_PATTERN.test(id) ? id : '';
    }

    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      const v = url.searchParams.get('v');
      if (v && ID_PATTERN.test(v)) return v;
      const parts = url.pathname.split('/').filter(Boolean);
      const marker = parts.findIndex((p) => ['embed', 'shorts', 'live', 'v'].includes(p));
      const id = marker >= 0 ? parts[marker + 1] || '' : '';
      return ID_PATTERN.test(id) ? id : '';
    }
  } catch {
    /* not a URL — fall through */
  }
  return '';
}

export const isYouTubeLink = (raw: string | undefined | null): boolean => getYouTubeId(raw) !== '';

export const youTubeEmbedUrl = (id: string): string => `https://www.youtube.com/embed/${id}`;

export const youTubeThumbnailUrl = (id: string): string => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
