/* ─────────────────────────────────────────────
   Video file helpers (28.10.2026)
   Some media slots (e.g. the Live Video showcase) accept an uploaded video
   file instead of a YouTube link. A file plays muted, looped and inline.
───────────────────────────────────────────── */

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;

export const isVideoFileUrl = (raw: string | undefined | null): boolean => VIDEO_EXT.test((raw || '').trim());

export const isVideoFile = (file: File): boolean => file.type.startsWith('video/') || VIDEO_EXT.test(file.name);

/** Media slots whose dashboard upload also accepts video files. */
export const VIDEO_UPLOAD_SECTIONS = new Set<string>(['leistungen_video_youtube']);

export const MAX_VIDEO_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export const VIDEO_ACCEPT = 'video/mp4,video/webm,video/quicktime';
