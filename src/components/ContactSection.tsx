import { useState, type FormEvent } from 'react';
import { CheckCircle2, Globe, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FormState {
  name: string;
  phone: string;
  service: string;
  message: string;
}

export function ContactSection() {
  const { t, language } = useLanguage();
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    service: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [fullLogoError, setFullLogoError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedName = form.name.trim();
    const trimmedPhone = form.phone.trim();

    if (!trimmedName) {
      setError(language === 'bn' ? 'অনুগ্রহ করে আপনার নাম লিখুন।' : 'Please enter your name.');
      return;
    }
    if (!trimmedPhone || trimmedPhone.length < 6) {
      setError(language === 'bn' ? 'একটি সঠিক ফোন বা হোয়াটসঅ্যাপ নম্বর দিন।' : 'Please enter a valid phone or WhatsApp number.');
      return;
    }

    // Save lead into localStorage for Admin Panel
    try {
      const newInquiry = {
        id: Date.now().toString(),
        name: trimmedName,
        phone: trimmedPhone,
        service: form.service.trim() || (language === 'bn' ? 'সাধারণ অনুসন্ধান' : 'General Inquiry'),
        message: form.message.trim(),
        date: new Date().toISOString(),
        status: 'new',
      };
      const existing = JSON.parse(localStorage.getItem('robiconic_inquiries') || '[]');
      localStorage.setItem('robiconic_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch {}

    setError(null);
    setSubmitted(true);
  };

  const mailtoHref = `mailto:${t.contact.email}?subject=${encodeURIComponent(
    `New enquiry from ${form.name || 'website'}`
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nPhone/WhatsApp: ${form.phone}\nService: ${form.service}\n\n${form.message}`
  )}`;

  return (
    <section id="contact" className="bg-[#f2f7fc] py-20 dark:bg-[#0f1a40]">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#1a3c8e] sm:text-4xl dark:text-white">
            {t.contactTitle}
          </h2>
          <p className="mt-3 text-base text-[#58637f] dark:text-[#a6b3d6]">{t.contactIntro}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="rounded-xl border border-[#dde6f2] bg-white p-6 sm:p-8 lg:col-span-7 dark:border-[#233468] dark:bg-[#132050]">
            {submitted ? (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-3 text-[#1a3c8e] dark:text-[#1ea5e8]">
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                  <h3 className="font-display text-2xl font-bold text-[#14213f] dark:text-white">
                    {t.contactForm.successTitle}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-[#58637f] dark:text-[#a6b3d6]">
                  {language === 'bn' ? 'ধন্যবাদ, ' : 'Thank you, '}
                  <span className="font-semibold text-[#14213f] dark:text-white">{form.name}</span>. {t.contactForm.successMessage}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={mailtoHref}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#f8701a] px-6 py-2.5 font-display text-base font-bold text-white transition-colors hover:bg-[#e25f0c]"
                  >
                    {t.contactForm.openEmailButton}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', phone: '', service: '', message: '' });
                    }}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#dde6f2] px-5 py-2.5 text-sm font-medium text-[#14213f] transition-colors hover:bg-[#f2f7fc] dark:border-[#233468] dark:text-white dark:hover:bg-[#0f1a40]"
                  >
                    {t.contactForm.sendAnotherButton}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
                  >
                    {error}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-sm font-semibold text-[#58637f] dark:text-[#a6b3d6]"
                    >
                      {t.contactForm.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder={t.contactForm.namePlaceholder}
                      className="min-h-[44px] w-full rounded-lg border border-[#dde6f2] bg-white px-3.5 py-2.5 text-[15px] text-[#14213f] transition-colors focus:border-[#f8701a] focus:outline-none dark:border-[#233468] dark:bg-[#0a1330] dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="mb-1.5 block text-sm font-semibold text-[#58637f] dark:text-[#a6b3d6]"
                    >
                      {t.contactForm.phoneLabel}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder={t.contactForm.phonePlaceholder}
                      className="min-h-[44px] w-full rounded-lg border border-[#dde6f2] bg-white px-3.5 py-2.5 text-[15px] text-[#14213f] transition-colors focus:border-[#f8701a] focus:outline-none dark:border-[#233468] dark:bg-[#0a1330] dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-service"
                    className="mb-1.5 block text-sm font-semibold text-[#58637f] dark:text-[#a6b3d6]"
                  >
                    {t.contactForm.serviceLabel}
                  </label>
                  <input
                    id="contact-service"
                    type="text"
                    value={form.service}
                    onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                    placeholder={t.contactForm.servicePlaceholder}
                    className="min-h-[44px] w-full rounded-lg border border-[#dde6f2] bg-white px-3.5 py-2.5 text-[15px] text-[#14213f] transition-colors focus:border-[#f8701a] focus:outline-none dark:border-[#233468] dark:bg-[#0a1330] dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-semibold text-[#58637f] dark:text-[#a6b3d6]"
                  >
                    {t.contactForm.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={t.contactForm.messagePlaceholder}
                    className="w-full rounded-lg border border-[#dde6f2] bg-white px-3.5 py-2.5 text-[15px] text-[#14213f] transition-colors focus:border-[#f8701a] focus:outline-none dark:border-[#233468] dark:bg-[#0a1330] dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-lg bg-[#f8701a] px-7 py-3 font-display text-base font-bold tracking-wide text-white transition-colors hover:bg-[#e25f0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f8701a]"
                >
                  {t.contactForm.submitButton}
                </button>
              </form>
            )}
          </div>

          <aside className="rounded-xl bg-[#0f2257] p-8 text-white lg:col-span-5">
            {!fullLogoError && (
              <div className="mb-6 inline-block rounded-lg bg-white p-3.5">
                <img
                  src={t.brand.fullLogoPath}
                  alt="Robiconic Digital full logo"
                  referrerPolicy="no-referrer"
                  onError={() => setFullLogoError(true)}
                  className="h-24 w-auto object-contain"
                />
              </div>
            )}

            <div className="space-y-4 text-[15px] text-[#d3def8]">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0 text-[#1ea5e8]" />
                <a
                  href={`https://${t.contact.web}`}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[#f8701a]"
                >
                  {t.contact.web}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#f8701a]" />
                <a
                  href={`mailto:${t.contact.email}`}
                  className="transition-colors hover:text-[#f8701a]"
                >
                  {t.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#1ea5e8]" />
                <span>{t.contact.location}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
