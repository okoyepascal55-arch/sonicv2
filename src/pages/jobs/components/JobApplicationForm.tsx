import { useState, useRef } from 'react';
import { submitContactForm } from '@/lib/contact';

interface Props {
  hash: string;
  jobTitle: string;
  onClose: () => void;
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export default function JobApplicationForm({ hash, jobTitle, onClose }: Props) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      setErrorMsg('Bitte nur PDF oder Word-Dokumente hochladen.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('Datei zu groß. Maximal 10 MB erlaubt.');
      return;
    }
    setErrorMsg('');
    setCvFileName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();
    const cvFile = formData.get('cv') as File | null;

    if (!name || !email) {
      setErrorMsg('Bitte Name und E-Mail ausfüllen.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Bitte eine gültige E-Mail-Adresse eingeben.');
      return;
    }

    setErrorMsg('');
    setSubmitState('sending');

    try {
      // Build multipart form for BITE application API
      const bitePayload = new FormData();
      bitePayload.append('name', name);
      bitePayload.append('email', email);
      if (phone) bitePayload.append('phone', phone);
      if (message) bitePayload.append('message', message);
      if (cvFile && cvFile.size > 0) bitePayload.append('cv', cvFile);

      const res = await fetch(`https://jobs.b-ite.com/api/v1/postings/${hash}/apply`, {
        method: 'POST',
        body: bitePayload,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || `HTTP ${res.status}`);
      }

      // Also notify via email
      await submitContactForm({
        name,
        email,
        phone: phone || '',
        message: message || '',
        position: jobTitle,
        bite_hash: hash,
        cv: cvFileName ? `[CV uploaded: ${cvFileName}]` : '[No CV]',
        _subject: `Neue Bewerbung: ${jobTitle} von ${name}`,
      }).catch(() => { /* non-critical, ignore */ });

      setSubmitState('success');
    } catch (err) {
      console.error('Application submit error:', err);
      setSubmitState('error');
      setErrorMsg('Bewerbung konnte nicht gesendet werden. Bitte versuche es erneut oder schreib uns eine E-Mail.');
    }
  };

  if (submitState === 'success') {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-16 h-16 flex items-center justify-center bg-[#C8D400] mx-auto mb-5">
          <i className="ri-check-line text-3xl text-[#111]" />
        </div>
        <h3 className="text-2xl font-black text-[#1a1a1a] mb-3 uppercase">Bewerbung gesendet!</h3>
        <p className="text-sm text-foreground-500 mb-6 max-w-md mx-auto">
          Vielen Dank für deine Bewerbung als <strong>{jobTitle}</strong>. Wir melden uns so schnell wie möglich bei dir.
        </p>
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-xs font-black uppercase tracking-widest hover:bg-[#C8D400] hover:text-[#111] transition-all duration-200 cursor-pointer"
          style={{ borderRadius: 0 }}
        >
          Schließen
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" data-readdy-form>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#C8D400] mb-1">Bewerbung</p>
            <h2 className="text-2xl font-black text-[#1a1a1a]">{jobTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-foreground-200 hover:border-[#C8D400] text-foreground-400 hover:text-[#1a1a1a] transition-all cursor-pointer"
            style={{ borderRadius: 0 }}
            aria-label="Formular schließen"
          >
            <i className="ri-close-line" />
          </button>
        </div>
        <div className="h-[2px] bg-[#C8D400] w-12 mt-3" />
      </div>

      <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data" id={`job-apply-${hash}`} noValidate>
        <div className="flex flex-col gap-5">
          {/* Name + Email */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-2xs font-black uppercase tracking-[0.2em] text-foreground-500 mb-1.5">
                Vollständiger Name <span className="text-[#C8D400]">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Max Mustermann"
                className="w-full px-4 py-3 bg-white border border-foreground-100 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#C8D400] transition-colors"
                style={{ borderRadius: 0 }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-2xs font-black uppercase tracking-[0.2em] text-foreground-500 mb-1.5">
                E-Mail-Adresse <span className="text-[#C8D400]">*</span>
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="max@example.com"
                className="w-full px-4 py-3 bg-white border border-foreground-100 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#C8D400] transition-colors"
                style={{ borderRadius: 0 }}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-2xs font-black uppercase tracking-[0.2em] text-foreground-500 mb-1.5">
              Telefonnummer <span className="text-foreground-300">(optional)</span>
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="+49 151 12345678"
              className="w-full px-4 py-3 bg-white border border-foreground-100 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#C8D400] transition-colors"
              style={{ borderRadius: 0 }}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-2xs font-black uppercase tracking-[0.2em] text-foreground-500 mb-1.5">
              Anschreiben / Nachricht <span className="text-foreground-300">(optional)</span>
            </label>
            <textarea
              name="message"
              rows={4}
              maxLength={500}
              placeholder="Warum möchtest du bei Sonic Group arbeiten?"
              className="w-full px-4 py-3 bg-white border border-foreground-100 text-sm text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-[#C8D400] transition-colors resize-none"
              style={{ borderRadius: 0 }}
            />
            <p className="text-2xs text-foreground-400 mt-1">Max. 500 Zeichen</p>
          </div>

          {/* CV Upload */}
          <div>
            <label className="block text-2xs font-black uppercase tracking-[0.2em] text-foreground-500 mb-1.5">
              Lebenslauf / CV
            </label>
            <div
              className={`relative border-2 border-dashed transition-all duration-200 cursor-pointer ${
                dragOver ? 'border-[#C8D400] bg-[#C8D400]/5' : 'border-foreground-200 bg-white hover:border-[#C8D400]/50'
              }`}
              style={{ borderRadius: 0 }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0] ?? null;
                handleFileChange(file);
                if (fileInputRef.current && file) {
                  const dt = new DataTransfer();
                  dt.items.add(file);
                  fileInputRef.current.files = dt.files;
                }
              }}
            >
              <input
                ref={fileInputRef}
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              />
              <div className="px-6 py-8 flex flex-col items-center justify-center gap-2 text-center pointer-events-none">
                <div className="w-10 h-10 flex items-center justify-center bg-white border border-foreground-100">
                  <i className={`text-xl ${cvFileName ? 'ri-file-check-line text-[#C8D400]' : 'ri-upload-cloud-line text-foreground-400'}`} />
                </div>
                {cvFileName ? (
                  <p className="text-sm font-black text-[#1a1a1a]">{cvFileName}</p>
                ) : (
                  <>
                    <p className="text-sm font-bold text-[#1a1a1a]">Datei hierher ziehen oder klicken</p>
                    <p className="text-xs text-foreground-400">PDF, DOC, DOCX · max. 10 MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Error */}
          {(errorMsg || submitState === 'error') && (
            <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100">
              <i className="ri-error-warning-line text-red-400 text-sm mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-600 font-medium">
                {errorMsg || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitState === 'sending'}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#111] text-white font-black text-xs uppercase tracking-widest hover:bg-[#C8D400] hover:text-[#111] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderRadius: 0 }}
          >
            {submitState === 'sending' ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" style={{ borderRadius: 0 }} />
                Bewerbung wird gesendet…
              </>
            ) : (
              <>
                <i className="ri-send-plane-line" />
                Bewerbung absenden
              </>
            )}
          </button>

          <p className="text-2xs text-foreground-400 text-center">
            Mit dem Absenden stimmst du unserer Datenschutzrichtlinie zu. Deine Daten werden vertraulich behandelt.
          </p>
        </div>
      </form>
    </div>
  );
}
