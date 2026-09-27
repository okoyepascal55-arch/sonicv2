import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    unternehmen,
    telefon,
    interesse,
    nachricht,
    subject,
  } = req.body as Record<string, string>;

  if (!RESEND_API_KEY) {
    console.error('[send] RESEND_API_KEY is not configured');
    return res.status(503).json({ error: 'E-Mail-Service ist noch nicht konfiguriert.' });
  }

  if (!name || !email || !nachricht) {
    return res.status(400).json({ error: 'Pflichtfelder fehlen (name, email, nachricht)' });
  }

  const emailSubject = subject || `Kontaktanfrage — ${interesse || 'Allgemein'}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1a1a;">
      <h2 style="font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #c8d400; padding-bottom: 10px;">
        Neue Kontaktanfrage — sonic-group.de
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 12px 8px 0; font-weight: bold; white-space: nowrap; vertical-align: top;">Name</td>
          <td style="padding: 8px 0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 12px 8px 0; font-weight: bold; white-space: nowrap; vertical-align: top;">E-Mail</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c8d400;">${email}</a></td>
        </tr>
        ${unternehmen ? `<tr>
          <td style="padding: 8px 12px 8px 0; font-weight: bold; white-space: nowrap; vertical-align: top;">Unternehmen</td>
          <td style="padding: 8px 0;">${unternehmen}</td>
        </tr>` : ''}
        ${telefon ? `<tr>
          <td style="padding: 8px 12px 8px 0; font-weight: bold; white-space: nowrap; vertical-align: top;">Telefon</td>
          <td style="padding: 8px 0;">${telefon}</td>
        </tr>` : ''}
        ${interesse ? `<tr>
          <td style="padding: 8px 12px 8px 0; font-weight: bold; white-space: nowrap; vertical-align: top;">Interesse an</td>
          <td style="padding: 8px 0;">${interesse}</td>
        </tr>` : ''}
      </table>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e5e5;" />
      <p style="font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${nachricht}</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e5e5;" />
      <p style="font-size: 11px; color: #888;">Gesendet über sonic-group.de/kontakt</p>
    </div>
  `;

  const resend = new Resend(RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: 'Sonic Website <noreply@sonic-group.de>',
      to: 'info@sonic-group.de',
      reply_to: email,
      subject: emailSubject,
      html,
    });

    if (error) {
      console.error('[send] Resend error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[send] Unexpected error:', err);
    return res.status(500).json({ error: 'Fehler beim Senden der E-Mail.' });
  }
}
