/**
 * Central contact configuration.
 *
 * All mailto: links use CONTACT_EMAIL (info@sonic-group.de).
 *
 * Forms submit via Web3Forms (web3forms.com) — a privacy-first service
 * that delivers form submissions directly to info@sonic-group.de with
 * no data retention. No Formspree, no readdy.ai routing.
 *
 * To activate:
 *  1. Go to https://web3forms.com
 *  2. Enter info@sonic-group.de → get an access key
 *  3. Add VITE_WEB3FORMS_KEY=<your-key> to Vercel environment variables
 *     OR update the hardcoded fallback key below.
 */

export const CONTACT_EMAIL = 'info@sonic-group.de';

/** Web3Forms access key — delivers directly to CONTACT_EMAIL */
const WEB3FORMS_KEY: string =
  import.meta.env.VITE_WEB3FORMS_KEY || '';

export interface ContactFormData {
  [key: string]: string;
}

/**
 * Submits a contact form directly to info@sonic-group.de via Web3Forms.
 * Falls back to a mailto: link if no key is configured.
 */
export async function submitContactForm(data: ContactFormData): Promise<void> {
  if (!WEB3FORMS_KEY) {
    // No key configured — open mailto as reliable fallback
    const subject = encodeURIComponent(data.subject || data.interest || 'Kontaktanfrage über sonicgroup.de');
    const body = encodeURIComponent(
      Object.entries(data)
        .filter(([k]) => !['subject', 'interest'].includes(k))
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    return;
  }

  const payload = {
    access_key: WEB3FORMS_KEY,
    subject: data.subject || data.interest || 'Kontaktanfrage',
    from_name: data.name || 'Sonic Website',
    email: data.email || '',
    message: data.message || JSON.stringify(data, null, 2),
    botcheck: '',  // honeypot field
    ...data,
  };

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message || `Submission failed: ${res.status}`);
  }

  const result = await res.json();
  if (!result.success) {
    throw new Error(result.message || 'Submission failed');
  }
}
