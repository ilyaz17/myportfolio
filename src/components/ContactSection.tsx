import { useState, type FormEvent } from 'react';
import { Check, Copy, ExternalLink, Mail, Phone, Send } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import {
  buildMailtoHref,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormInput,
} from '../utils/portfolioLogic';

const INITIAL_FORM: ContactFormInput = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection() {
  const [form, setForm] = useState<ContactFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submittedHref, setSubmittedHref] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (value: string, key: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 2200);
    } catch {
      setCopiedKey(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateContactForm(form);
    if (!result.isValid) {
      setErrors(result.errors);
      setSubmittedHref(null);
      return;
    }

    const href = buildMailtoHref(PROFILE.email, form);
    setErrors({});
    setSubmittedName(form.name.trim());
    setSubmittedHref(href);
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmittedHref(null);
    setSubmittedName('');
  };

  return (
    <section id="contact" className="scroll-mt-10 py-14 sm:py-16">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#111315] shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#14171D] dark:text-[#F3F5F7]">
        <Send className="h-3.5 w-3.5 text-[#00B853] dark:text-[#00E061]" aria-hidden="true" />
        <span>Contact</span>
      </div>

      <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.18] tracking-[-0.02em] text-[#111315] dark:text-white sm:text-4xl">
        If you have a role or project enquiry, drop an email or fill the form — available now.
      </h2>

      {submittedHref ? (
        <div
          role="status"
          aria-live="polite"
          data-testid="contact-confirmation"
          className="mt-8 rounded-3xl border border-[#00C853]/35 bg-[#F4FBF7] p-6 dark:bg-[#0F1B15] sm:p-8"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00E061] text-[#0B0D10]">
            <Check className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold text-[#111315] dark:text-white">
            Message ready, {submittedName}.
          </h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#4B515C] dark:text-[#B4BAC6]">
            Your note has been validated and prepared for{' '}
            <span className="font-semibold text-[#111315] dark:text-white">{PROFILE.email}</span>.
            Launch your mail client below or copy the address directly.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={submittedHref}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#00E061] px-5 py-2.5 text-sm font-semibold text-[#0B0D10] transition-colors hover:bg-[#19F073]"
            >
              <span>Open Email Draft</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[44px] rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-[#111315] transition-colors hover:border-black/40 dark:border-white/15 dark:text-[#F3F5F7] cursor-pointer"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-9 space-y-6">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-medium text-[#646870] dark:text-[#9CA3AF]"
            >
              Your Name *
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, name: event.target.value }));
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              placeholder="Alex Rivera"
              className="mt-1 w-full border-b border-black/[0.14] bg-transparent py-3 text-[15px] text-[#111315] placeholder:text-[#9CA3AF] transition-colors focus:border-[#00C853] focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-[#5F6674] dark:focus:border-[#00E061]"
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1.5 text-xs text-[#DC2626] dark:text-[#F87171]">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-medium text-[#646870] dark:text-[#9CA3AF]"
            >
              Email Address *
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, email: event.target.value }));
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              placeholder="alex@company.com"
              className="mt-1 w-full border-b border-black/[0.14] bg-transparent py-3 text-[15px] text-[#111315] placeholder:text-[#9CA3AF] transition-colors focus:border-[#00C853] focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-[#5F6674] dark:focus:border-[#00E061]"
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1.5 text-xs text-[#DC2626] dark:text-[#F87171]">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="block text-xs font-medium text-[#646870] dark:text-[#9CA3AF]"
            >
              Subject (Optional)
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
              placeholder="Full Stack Role · Laravel / MERN Project"
              className="mt-1 w-full border-b border-black/[0.14] bg-transparent py-3 text-[15px] text-[#111315] placeholder:text-[#9CA3AF] transition-colors focus:border-[#00C853] focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-[#5F6674] dark:focus:border-[#00E061]"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-medium text-[#646870] dark:text-[#9CA3AF]"
            >
              Project Description *
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={3}
              value={form.message}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, message: event.target.value }));
                if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
              }}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              placeholder="Share role details, architecture scope, or timeline..."
              className="mt-1 w-full resize-none border-b border-black/[0.14] bg-transparent py-3 text-[15px] text-[#111315] placeholder:text-[#9CA3AF] transition-colors focus:border-[#00C853] focus:outline-none dark:border-white/15 dark:text-white dark:placeholder:text-[#5F6674] dark:focus:border-[#00E061]"
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1.5 text-xs text-[#DC2626] dark:text-[#F87171]">
                {errors.message}
              </p>
            )}
          </div>

          {/* Exact Isak Bottom Action Row: Send Message Pill Left + Direct Email Right */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <button
              type="submit"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-black/[0.12] bg-white px-7 py-2.5 text-sm font-semibold text-[#111315] shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all hover:border-[#00C853] hover:bg-[#00E061] hover:text-[#0B0D10] dark:border-white/15 dark:bg-[#14171D] dark:text-white dark:hover:border-[#00E061] dark:hover:bg-[#00E061] dark:hover:text-[#0B0D10] cursor-pointer"
            >
              Send Message
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.emailHref}
                className="text-sm font-medium text-[#111315] transition-colors hover:text-[#009944] dark:text-[#F3F5F7] dark:hover:text-[#00E061]"
              >
                {PROFILE.email}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(PROFILE.email, 'email')}
                aria-label="Copy email address"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.1] text-[#5F6570] transition-colors hover:border-[#00C853] hover:text-[#009944] dark:border-white/15 dark:text-[#9CA3AF] dark:hover:text-[#00E061] cursor-pointer"
              >
                {copiedKey === 'email' ? (
                  <Check className="h-3.5 w-3.5 text-[#00A846]" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Direct Contact Quick Line */}
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-black/[0.08] pt-6 text-xs text-[#646870] dark:border-white/[0.08] dark:text-[#9CA3AF]">
        <a
          href={PROFILE.phoneHref}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-[#111315] dark:hover:text-white tabular-nums"
        >
          <Phone className="h-3.5 w-3.5 text-[#00A846] dark:text-[#00E061]" aria-hidden="true" />
          <span>{PROFILE.phone}</span>
        </a>
        <a
          href={PROFILE.emailHref}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-[#111315] dark:hover:text-white"
        >
          <Mail className="h-3.5 w-3.5 text-[#00A846] dark:text-[#00E061]" aria-hidden="true" />
          <span>{PROFILE.email}</span>
        </a>
        <span>{PROFILE.location}</span>
      </div>
    </section>
  );
}
