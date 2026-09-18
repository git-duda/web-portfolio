import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ContactFormData, FormErrors } from '../types';

export function ContactSection() {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [sendError, setSendError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{
    data: ContactFormData;
    timestamp: string;
  } | null>(null);

  // Email validation regex
  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
  };

  const validateField = (field: keyof ContactFormData, value: string): string | undefined => {
    const trimmed = value.trim();

    switch (field) {
      case 'name':
        if (!trimmed || trimmed.length < 2) {
          return t.contact.errors.nameRequired;
        }
        return undefined;

      case 'email':
        if (!trimmed) {
          return t.contact.errors.emailRequired;
        }
        if (!validateEmail(trimmed)) {
          return t.contact.errors.emailInvalid;
        }
        return undefined;

      case 'subject':
        if (!trimmed || trimmed.length < 2) {
          return t.contact.errors.subjectRequired;
        }
        return undefined;

      case 'message':
        if (!trimmed) {
          return t.contact.errors.messageRequired;
        }
        if (trimmed.length < 10) {
          return t.contact.errors.messageTooShort;
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSelectSubject = (subj: string) => {
    setFormData((prev) => ({ ...prev, subject: subj }));
    setTouched((prev) => ({ ...prev, subject: true }));
    setErrors((prev) => ({ ...prev, subject: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = {
      name: true,
      email: true,
      subject: true,
      message: true,
    };
    setTouched(allTouched);

    // Validate all
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => Boolean(err));
    if (hasError) {
      return;
    }

    setSendError('');
    setIsSubmitting(true);

    try {
      const formBody = new FormData(e.currentTarget);
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('subject', formData.subject);
      formBody.append('message', formData.message);
      formBody.append('_subject', `Novo contato pelo portfólio — ${formData.name}`);

      const response = await fetch('https://formsubmit.co/ajax/eduardakrr@gmail.com', {
        method: 'POST',
        body: formBody,
        headers: { Accept: 'application/json' },
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) throw new Error('send-failed');
      setSubmittedData({ data: { ...formData }, timestamp: new Date().toLocaleTimeString(language === 'pt' ? 'pt-BR' : 'en-US', { hour: '2-digit', minute: '2-digit' }) });
    } catch {
      setSendError(language === 'pt' ? 'Não foi possível confirmar o envio. Tente novamente ou escreva diretamente para eduardakrr@gmail.com.' : 'We could not confirm submission. Please try again or email eduardakrr@gmail.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setTouched({
      name: false,
      email: false,
      subject: false,
      message: false,
    });
    setErrors({});
  };

  return (
    <section id="contato" className="contact p-6 md:p-10 lg:p-12 border-b border-[#191919] bg-[#f8f6ec]">
      <span className="eyebrow font-mono-custom text-xs font-bold uppercase tracking-widest text-[#236a47] block mb-3">
        {t.contact.eyebrow}
      </span>

      <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#191919] leading-[1.08] tracking-tight mb-6 whitespace-pre-line">
        {t.contact.title}
      </h2>
      <div className="mb-8">
        <a
          className="contact-link inline-flex items-center gap-2 font-mono-custom text-base sm:text-lg md:text-xl font-bold text-[#191919] hover:text-[#236a47] border-b-2 border-[#191919] hover:border-[#236a47] pb-1 transition-colors"
          href="mailto:eduardakrr@gmail.com"
        >
          <span>eduardakrr@gmail.com</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
      {submittedData ? (
        <div
          className="border-2 border-[#236a47] bg-[#eef5f1] p-6 md:p-8 mb-8 max-w-xl shadow-sm space-y-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#236a47] text-white flex items-center justify-center font-bold text-sm">
              ✓
            </span>
            <div>
              <h3 className="font-heading font-bold text-xl text-[#236a47]">
                {t.contact.success.title}
              </h3>
              <span className="font-mono-custom text-[11px] text-[#555]">
                {submittedData.timestamp}
              </span>
            </div>
          </div>

          <p className="font-mono-custom text-xs md:text-sm text-[#191919] leading-relaxed">
            {t.contact.success.message}
          </p>

          <div className="p-4 bg-white border border-[#236a47]/30 space-y-2 text-xs font-mono-custom text-[#191919]">
            <div className="font-bold text-[#236a47] uppercase tracking-wider text-[11px] border-b border-[#236a47]/20 pb-1">
              {t.contact.success.detailsTitle}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 pt-1">
              <span className="text-[#666]">{t.contact.success.nameField}</span>
              <span className="sm:col-span-2 font-medium">{submittedData.data.name}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
              <span className="text-[#666]">{t.contact.success.emailField}</span>
              <span className="sm:col-span-2 font-medium">{submittedData.data.email}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
              <span className="text-[#666]">{t.contact.success.subjectField}</span>
              <span className="sm:col-span-2 font-medium">{submittedData.data.subject}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 font-mono-custom text-xs uppercase tracking-wider font-bold border border-[#236a47] text-[#236a47] bg-white hover:bg-[#236a47] hover:text-white transition-colors cursor-pointer"
          >
            ← {t.contact.success.sendAnotherBtn}
          </button>
        </div>
      ) : (
        <form
          className="contact-form max-w-xl space-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          {sendError && <p role="alert" className="text-sm text-red-700 border border-red-700 p-3">{sendError}</p>}
          <div className="hidden" aria-hidden="true">
            <input name="_honey" tabIndex={-1} autoComplete="off" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="contact-name"
                className="block font-mono-custom text-xs font-bold uppercase tracking-wider text-[#191919]"
              >
                {t.contact.nameLabel} <span className="text-[#236a47]">*</span>
              </label>
              {touched.name && !errors.name && formData.name.trim().length >= 2 && (
                <span className="font-mono-custom text-[11px] text-[#236a47]">✓ Válido</span>
              )}
            </div>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={120}
              placeholder={t.contact.namePlaceholder}
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={`w-full bg-[#f8f6ec] border px-3.5 py-2.5 font-mono-custom text-sm text-[#191919] focus:outline-none transition-all ${
                touched.name && errors.name
                  ? 'border-red-600 ring-1 ring-red-600 bg-red-50/30'
                  : touched.name && !errors.name
                  ? 'border-[#236a47] focus:ring-1 focus:ring-[#236a47]'
                  : 'border-[#191919] focus:ring-1 focus:ring-[#236a47]'
              }`}
            />
            {touched.name && errors.name && (
              <p className="mt-1 font-mono-custom text-xs text-red-700 flex items-center gap-1">
                <span>⚠</span> {errors.name}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="contact-email"
                className="block font-mono-custom text-xs font-bold uppercase tracking-wider text-[#191919]"
              >
                {t.contact.emailInputLabel} <span className="text-[#236a47]">*</span>
              </label>
              {touched.email && !errors.email && formData.email.trim().length > 0 && (
                <span className="font-mono-custom text-[11px] text-[#236a47]">✓ Válido</span>
              )}
            </div>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder={t.contact.emailPlaceholder}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`w-full bg-[#f8f6ec] border px-3.5 py-2.5 font-mono-custom text-sm text-[#191919] focus:outline-none transition-all ${
                touched.email && errors.email
                  ? 'border-red-600 ring-1 ring-red-600 bg-red-50/30'
                  : touched.email && !errors.email
                  ? 'border-[#236a47] focus:ring-1 focus:ring-[#236a47]'
                  : 'border-[#191919] focus:ring-1 focus:ring-[#236a47]'
              }`}
            />
            {touched.email && errors.email && (
              <p className="mt-1 font-mono-custom text-xs text-red-700 flex items-center gap-1">
                <span>⚠</span> {errors.email}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="contact-topic"
                className="block font-mono-custom text-xs font-bold uppercase tracking-wider text-[#191919]"
              >
                {t.contact.subjectLabel} <span className="text-[#236a47]">*</span>
              </label>
              {touched.subject && !errors.subject && formData.subject.trim().length >= 2 && (
                <span className="font-mono-custom text-[11px] text-[#236a47]">✓ Válido</span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {t.contact.subjects.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSelectSubject(item)}
                  className={`text-[11px] font-mono-custom px-2.5 py-1 border transition-colors cursor-pointer ${
                    formData.subject === item
                      ? 'bg-[#236a47] text-white border-[#236a47]'
                      : 'bg-white/50 text-[#191919] border-[#191919]/30 hover:border-[#191919]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <input
              id="contact-topic"
              name="assunto"
              type="text"
              maxLength={160}
              placeholder={t.contact.subjectPlaceholder}
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              onBlur={() => handleBlur('subject')}
              className={`w-full bg-[#f8f6ec] border px-3.5 py-2.5 font-mono-custom text-sm text-[#191919] focus:outline-none transition-all ${
                touched.subject && errors.subject
                  ? 'border-red-600 ring-1 ring-red-600 bg-red-50/30'
                  : touched.subject && !errors.subject
                  ? 'border-[#236a47] focus:ring-1 focus:ring-[#236a47]'
                  : 'border-[#191919] focus:ring-1 focus:ring-[#236a47]'
              }`}
            />
            {touched.subject && errors.subject && (
              <p className="mt-1 font-mono-custom text-xs text-red-700 flex items-center gap-1">
                <span>⚠</span> {errors.subject}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="contact-message"
                className="block font-mono-custom text-xs font-bold uppercase tracking-wider text-[#191919]"
              >
                {t.contact.messageLabel} <span className="text-[#236a47]">*</span>
              </label>
              <span className="font-mono-custom text-[11px] text-[#666]">
                {formData.message.length} / 5000
              </span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              maxLength={5000}
              placeholder={t.contact.messagePlaceholder}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              className={`w-full bg-[#f8f6ec] border p-3.5 font-mono-custom text-sm text-[#191919] focus:outline-none resize-y transition-all ${
                touched.message && errors.message
                  ? 'border-red-600 ring-1 ring-red-600 bg-red-50/30'
                  : touched.message && !errors.message
                  ? 'border-[#236a47] focus:ring-1 focus:ring-[#236a47]'
                  : 'border-[#191919] focus:ring-1 focus:ring-[#236a47]'
              }`}
            />
            {touched.message && errors.message && (
              <p className="mt-1 font-mono-custom text-xs text-red-700 flex items-center gap-1">
                <span>⚠</span> {errors.message}
              </p>
            )}
          </div>

          <p className="form-note font-mono-custom text-[11px] text-[#666] leading-relaxed">
            {t.contact.disclaimer}
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-[#191919] text-[#f8f6ec] px-6 py-3.5 font-mono-custom text-xs uppercase tracking-wider font-bold border border-[#191919] hover:bg-[#236a47] hover:border-[#236a47] transition-colors disabled:opacity-50 cursor-pointer"
          >
            <span>{isSubmitting ? t.contact.submittingBtn : t.contact.submitBtn}</span>
            <span aria-hidden="true">{isSubmitting ? '⌛' : '↗'}</span>
          </button>
        </form>
      )}
      <div className="mt-10 pt-6 border-t border-[#191919]/30">
        <a
          className="github-link inline-flex items-center gap-1.5 font-mono-custom text-xs uppercase tracking-wider text-[#191919] font-bold hover:text-[#236a47] transition-colors"
          href="https://github.com/git-duda"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{t.contact.githubLink}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
