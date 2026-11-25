import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import {
  PROFILE,
  RESUME_DOWNLOAD_FILENAME,
  RESUME_PDF_URL,
} from '../data/portfolioData';
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
  const [submittedInquiry, setSubmittedInquiry] = useState<ContactFormInput | null>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = async (field: 'email' | 'phone', value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((current) => (current === field ? null : current));
      }, 2200);
    } catch {
      setCopiedField(field);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedInquiry({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || 'Project or Role Inquiry',
      message: form.message.trim(),
    });
    setForm(INITIAL_FORM);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-sm font-medium text-[#9BA3B2]">04. Contact</p>
              <h2
                id="contact-heading"
                className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F4F5F7] sm:text-4xl"
              >
                Start a Conversation
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#B4BAC5]">
                Available for senior Full-Stack roles, Laravel &amp; MERN product engineering,
                ERP builds, and payment gateway integrations. Reach out directly or send a brief below.
              </p>

              <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <dt className="text-xs font-medium text-[#9BA3B2]">Email</dt>
                    <dd className="mt-1 truncate text-sm font-medium text-[#F4F5F7]">
                      <a
                        href={PROFILE.emailHref}
                        className="transition-colors hover:text-[#F2B705]"
                      >
                        {PROFILE.email}
                      </a>
                    </dd>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('email', PROFILE.email)}
                    aria-label="Copy email address"
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-[#D1D6DF] transition-colors hover:border-white/30 hover:text-[#F4F5F7] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#F2B705]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <dt className="text-xs font-medium text-[#9BA3B2]">Phone</dt>
                    <dd className="mt-1 font-mono text-sm font-medium text-[#F4F5F7] tabular-nums">
                      <a
                        href={PROFILE.phoneHref}
                        className="transition-colors hover:text-[#F2B705]"
                      >
                        {PROFILE.phone}
                      </a>
                    </dd>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('phone', PROFILE.phone)}
                    aria-label="Copy phone number"
                    className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-[#D1D6DF] transition-colors hover:border-white/30 hover:text-[#F4F5F7] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#F2B705]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <dt className="text-xs font-medium text-[#9BA3B2]">GitHub</dt>
                    <dd className="mt-1 text-sm font-medium text-[#F4F5F7]">
                      <a
                        href={PROFILE.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 transition-colors hover:text-[#F2B705]"
                      >
                        <span>{PROFILE.githubHandle}</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                  <span className="text-xs text-[#949DAA]">{PROFILE.location}</span>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <a
                href={RESUME_PDF_URL}
                download={RESUME_DOWNLOAD_FILENAME}
                className="inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold text-[#F2B705] transition-colors hover:text-[#FFD043]"
              >
                <span>Download Full Resume (PDF)</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#111317] p-6 sm:p-8 lg:col-span-7">
            {submittedInquiry ? (
              <div role="status" className="space-y-6 py-4">
                <div>
                  <p className="text-xs font-semibold text-[#F2B705]">Inquiry Ready</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[#F4F5F7]">
                    Thank you, {submittedInquiry.name}.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#B4BAC5]">
                    Your inquiry has been prepared for{' '}
                    <span className="font-medium text-[#F4F5F7]">{PROFILE.email}</span>. Open your
                    email client below to deliver it directly, or edit and compose a new note.
                  </p>
                </div>

                <div className="space-y-3 border-y border-white/10 py-5 text-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="text-[#9BA3B2]">From</span>
                    <span className="text-[#F4F5F7]">
                      {submittedInquiry.name} · {submittedInquiry.email}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="text-[#9BA3B2]">Subject</span>
                    <span className="text-[#F4F5F7]">{submittedInquiry.subject}</span>
                  </div>
                  <div className="pt-2">
                    <span className="block text-xs text-[#9BA3B2]">Message</span>
                    <p className="mt-1.5 leading-relaxed text-[#D1D6DF]">
                      {submittedInquiry.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={buildMailtoHref(PROFILE.email, submittedInquiry)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#F2B705] px-5 py-2.5 text-sm font-semibold text-[#08090B] transition-colors hover:bg-[#FFD043] whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Open in Email Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedInquiry(null)}
                    className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-[#D1D6DF] transition-colors hover:border-white/30 hover:text-[#F4F5F7] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#F4F5F7]">
                    Send a Project or Hiring Brief
                  </h3>
                  <p className="mt-1 text-sm text-[#9BA3B2]">
                    All required fields are validated before preparing your message.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#C5CBD6]"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(event) => {
                        setForm((prev) => ({ ...prev, name: event.target.value }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      placeholder="e.g. Karthik Sundaram"
                      className="mt-2 min-h-[44px] w-full rounded-lg border border-white/15 bg-[#08090B] px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder:text-[#707887] focus:border-[#F2B705] focus:outline-none"
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-[#F87171]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#C5CBD6]"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) => {
                        setForm((prev) => ({ ...prev, email: event.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      placeholder="you@company.com"
                      className="mt-2 min-h-[44px] w-full rounded-lg border border-white/15 bg-[#08090B] px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder:text-[#707887] focus:border-[#F2B705] focus:outline-none"
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-[#F87171]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-[#C5CBD6]"
                  >
                    Subject (Optional)
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, subject: event.target.value }))
                    }
                    placeholder="e.g. Full-Stack Developer Role or ERP Build"
                    className="mt-2 min-h-[44px] w-full rounded-lg border border-white/15 bg-[#08090B] px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder:text-[#707887] focus:border-[#F2B705] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-[#C5CBD6]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(event) => {
                      setForm((prev) => ({ ...prev, message: event.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder="Share project scope, timeline, or role details..."
                    className="mt-2 w-full rounded-lg border border-white/15 bg-[#08090B] px-3.5 py-3 text-sm text-[#F4F5F7] placeholder:text-[#707887] focus:border-[#F2B705] focus:outline-none"
                  />
                  {errors.message && (
                    <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-[#F87171]">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#F2B705] px-6 py-2.5 text-sm font-semibold text-[#08090B] transition-colors duration-150 hover:bg-[#FFD043] whitespace-nowrap cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
