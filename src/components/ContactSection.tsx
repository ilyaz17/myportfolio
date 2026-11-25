import { useState, type FormEvent } from 'react';
import { ArrowDownToLine, Check, Copy, Github, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
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
import { SectionHeading } from './SectionHeading';

const INITIAL_FORM: ContactFormInput = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

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
      className="scroll-mt-18 border-t border-white/6 bg-[#070D1B] py-20 sm:py-24 overflow-x-clip"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading id="contact-heading" title="CONTACT" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left column — Devis "Just say Hello" form */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.52, ease: EASE_OUT }}
            className="lg:col-span-6"
          >
            <h3 className="font-display text-3xl font-semibold text-[#FDFEFF]">
              Just say Hello
            </h3>

            {submittedInquiry ? (
              <div
                role="status"
                className="devis-card mt-6 space-y-6 rounded-xl p-6 sm:p-8"
              >
                <div>
                  <p className="font-mono text-xs font-medium text-[#FEC544]">Inquiry Ready</p>
                  <h4 className="mt-2 font-display text-2xl font-semibold text-[#FDFEFF]">
                    Thank you, {submittedInquiry.name}.
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#A9ADB8]">
                    Your inquiry has been prepared for{' '}
                    <span className="font-medium text-[#FDFEFF]">{PROFILE.email}</span>. Open your
                    email client below to deliver it directly, or compose a new note.
                  </p>
                </div>

                <div className="space-y-3 border-y border-[#232935] py-5 text-sm">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="text-[#8E95A5]">From</span>
                    <span className="text-[#FDFEFF]">
                      {submittedInquiry.name} · {submittedInquiry.email}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="text-[#8E95A5]">Subject</span>
                    <span className="text-[#FDFEFF]">{submittedInquiry.subject}</span>
                  </div>
                  <div className="pt-2">
                    <span className="block text-xs text-[#8E95A5]">Message</span>
                    <p className="mt-1.5 leading-relaxed text-[#D6DAE2]">
                      {submittedInquiry.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={buildMailtoHref(PROFILE.email, submittedInquiry)}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#FEC544] px-7 py-2.5 text-sm font-semibold text-[#070D1B] transition-colors hover:bg-[#FFD369] whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Open in Email Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedInquiry(null)}
                    className="min-h-[46px] rounded-full border border-[#232935] px-5 py-2.5 text-sm font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544]/50 hover:text-[#FDFEFF] cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
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
                    placeholder="Your Name"
                    className="min-h-[52px] w-full rounded-lg border border-[#232935] bg-[#101624] px-4 py-3 text-sm text-[#FDFEFF] placeholder:text-[#7A8294] transition-colors focus:border-[#FEC544] focus:outline-none"
                  />
                  {errors.name && (
                    <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-[#F87171]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="sr-only">
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
                    placeholder="Your Email"
                    className="min-h-[52px] w-full rounded-lg border border-[#232935] bg-[#101624] px-4 py-3 text-sm text-[#FDFEFF] placeholder:text-[#7A8294] transition-colors focus:border-[#FEC544] focus:outline-none"
                  />
                  {errors.email && (
                    <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-[#F87171]">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-subject" className="sr-only">
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
                    placeholder="Your Subject"
                    className="min-h-[52px] w-full rounded-lg border border-[#232935] bg-[#101624] px-4 py-3 text-sm text-[#FDFEFF] placeholder:text-[#7A8294] transition-colors focus:border-[#FEC544] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(event) => {
                      setForm((prev) => ({ ...prev, message: event.target.value }));
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    placeholder="Your Message"
                    className="w-full rounded-lg border border-[#232935] bg-[#101624] px-4 py-3.5 text-sm text-[#FDFEFF] placeholder:text-[#7A8294] transition-colors focus:border-[#FEC544] focus:outline-none"
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
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#FEC544] px-9 py-3 text-sm font-semibold text-[#070D1B] transition-colors duration-150 hover:bg-[#FFD369] whitespace-nowrap cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right column — Devis "Contact Info" with circular outlined icon rows */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.52, delay: 0.08, ease: EASE_OUT }}
            className="lg:col-span-6"
          >
            <h3 className="font-display text-3xl font-semibold text-[#FDFEFF]">
              Contact Info
            </h3>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#A9ADB8]">
              Available for senior Full-Stack roles, Laravel &amp; MERN product engineering,
              enterprise ERPs, and payment gateway integrations. Reach out directly below.
            </p>

            <div className="mt-8 space-y-6">
              {/* Email row */}
              <div className="group flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#232935] bg-[#101624] text-[#A9ADB8] transition-colors group-hover:border-[#FEC544] group-hover:text-[#FEC544]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-lg font-medium text-[#FDFEFF]">Email</h4>
                    <a
                      href={PROFILE.emailHref}
                      className="mt-0.5 block truncate text-sm text-[#A9ADB8] transition-colors hover:text-[#FEC544]"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('email', PROFILE.email)}
                  aria-label="Copy email address"
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#232935] bg-[#101624] px-3.5 py-1.5 text-xs font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544]/60 hover:text-[#FEC544] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#FEC544]" aria-hidden="true" />
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

              {/* Phone row */}
              <div className="group flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#232935] bg-[#101624] text-[#A9ADB8] transition-colors group-hover:border-[#FEC544] group-hover:text-[#FEC544]">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-lg font-medium text-[#FDFEFF]">Phone</h4>
                    <a
                      href={PROFILE.phoneHref}
                      className="mt-0.5 block font-mono text-sm text-[#A9ADB8] tabular-nums transition-colors hover:text-[#FEC544]"
                    >
                      {PROFILE.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('phone', PROFILE.phone)}
                  aria-label="Copy phone number"
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-[#232935] bg-[#101624] px-3.5 py-1.5 text-xs font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544]/60 hover:text-[#FEC544] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#FEC544]" aria-hidden="true" />
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

              {/* Address row */}
              <div className="group flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#232935] bg-[#101624] text-[#A9ADB8] transition-colors group-hover:border-[#FEC544] group-hover:text-[#FEC544]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-medium text-[#FDFEFF]">Address</h4>
                  <p className="mt-0.5 text-sm text-[#A9ADB8]">
                    Coimbatore &amp; Pollachi, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            {/* Devis social connect strip */}
            <div className="mt-10 border-t border-[#232935] pt-7">
              <p className="text-base font-medium text-[#D6DAE2]">
                Visit my social profile and get connected
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3.5">
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#232935] bg-[#101624] px-4 py-2 text-xs font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544] hover:text-[#FEC544]"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PROFILE.emailHref}
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#232935] bg-[#101624] px-4 py-2 text-xs font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544] hover:text-[#FEC544]"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>Email</span>
                </a>

                <a
                  href={PROFILE.phoneHref}
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#232935] bg-[#101624] px-4 py-2 text-xs font-medium text-[#D6DAE2] transition-colors hover:border-[#FEC544] hover:text-[#FEC544]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span>Call</span>
                </a>

                <a
                  href={RESUME_PDF_URL}
                  download={RESUME_DOWNLOAD_FILENAME}
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#232935] bg-[#101624] px-4 py-2 text-xs font-medium text-[#FEC544] transition-colors hover:border-[#FEC544] hover:bg-[#FEC544] hover:text-[#070D1B]"
                >
                  <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
