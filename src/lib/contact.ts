/**
 * Central contact configuration.
 *
 * All mailto: links use CONTACT_EMAIL (info@sonic-group.de).
 *
 * Forms submit via /api/send — a Vercel serverless function that uses
 * Resend to deliver emails directly to info@sonic-group.de.
 *
 * Required env var on Vercel: RESEND_API_KEY
 * Domain sender: noreply@sonic-group.de (must be verified in Resend dashboard)
 */

export const CONTACT_EMAIL = 'info@sonic-group.de';

export interface ContactFormData {
  [key: string]: string;
}

/**
 * Submits a contact form via the /api/send serverless function (Resend).
 * Throws on network error or non-2xx response so the caller can show an error state.
 */
export async function submitContactForm(data: ContactFormData): Promise<void> {
  const res = await fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { error?: string }).error || `Submission failed: ${res.status}`
    );
  }

  const result = await res.json();
  if (!result.success) {
    throw new Error('Submission failed');
  }
}
