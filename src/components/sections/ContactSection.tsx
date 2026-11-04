'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { caveCardVariants, subPanelPopVariants } from '@/components/ui/bento';
import { sendContactEmail } from '@/app/actions/send-email';
import {
  Mail,
  Check,
  Copy,
  Globe,
  Clock,
  CalendarCheck,
  ArrowUpRight,
  Sparkles,
  Send,
  User,
  MessageSquare,
  Phone,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import CaveFireflyCanvas from '@/components/ui/CaveFireflyCanvas';
import IceMistCanvas from '@/components/ui/IceMistCanvas';

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [wibTime, setWibTime] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: '',
    hp_website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const emailAddress = 'jovanwill139@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/jovansebastian';
  const githubUrl = 'https://github.com/Jovan-SW';

  // Live real-time WIB (UTC+7) clock
  useEffect(() => {
    const updateWibTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setWibTime(`${formatted} WIB`);
      } catch {
        setWibTime('UTC+7 WIB');
      }
    };

    updateWibTime();
    const timer = setInterval(updateWibTime, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = emailAddress;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear inline error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name =
        lang === 'en'
          ? 'Name must be at least 2 characters.'
          : 'Nama wajib diisi minimal 2 karakter.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email =
        lang === 'en'
          ? 'Please enter a valid email address.'
          : 'Format alamat email tidak valid.';
    }

    if (formData.whatsapp.trim()) {
      const phoneRegex = /^[0-9+\-\s()]{8,20}$/;
      if (!phoneRegex.test(formData.whatsapp.trim())) {
        errors.whatsapp =
          lang === 'en'
            ? 'Phone number must be 8-20 digits.'
            : 'Nomor WhatsApp tidak valid (masukkan 8-20 digit).';
      }
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message =
        lang === 'en'
          ? 'Message must be at least 10 characters.'
          : 'Isi pesan terlalu singkat (minimal 10 karakter).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('whatsapp', formData.whatsapp);
      payload.append('message', formData.message);
      payload.append('hp_website', formData.hp_website);

      const res = await sendContactEmail(payload);
      setSubmitStatus(res);

      if (res.success) {
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          message: '',
          hp_website: '',
        });
        setFieldErrors({});
      }
    } catch {
      setSubmitStatus({
        success: false,
        message:
          lang === 'en'
            ? 'Failed to send message. Please try again or email directly.'
            : 'Gagal mengirim pesan. Silakan coba lagi beberapa saat lagi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setSubmitStatus(null);
    setFieldErrors({});
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-16 sm:py-24 md:py-32 relative border-t border-white/10 bg-transparent overflow-hidden"
    >
      {/* 3D Glacial Ice Fog Mist Effect on Scroll */}
      <IceMistCanvas />
      {/* Ambient Cave Fireflies Effect */}
      <CaveFireflyCanvas />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Header Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
          variants={caveCardVariants}
          custom={0.1}
          className="mb-8 sm:mb-12"
        >
          <span className="text-xs font-mono tracking-widest text-sky-400 font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] block mb-2">
            {t('contact.eyebrow')}
          </span>
          <h2
            className="text-4xl sm:text-6xl font-black text-3d-silver tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
          >
            {t('contact.title')}
          </h2>
        </motion.div>

        {/* 2-Column Responsive Layout: Left Info & Channels / Right Direct Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* =========================================================================
              LEFT COLUMN: Info, Value Proposition & Direct Channels (5 cols on lg)
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {/* Headline Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={subPanelPopVariants}
              custom={0.2}
              className="p-6 sm:p-7 rounded-2xl bg-black/25 card-3d-glass border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            >
              <h3
                className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
              >
                {t('contact.heading1')}
                <br />
                <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-slate-200 bg-clip-text text-transparent">
                  {t('contact.heading2')}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif-contemporary">
                {t('contact.subheading')}
              </p>
            </motion.div>

            {/* Direct Email Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={subPanelPopVariants}
              custom={0.28}
              className="p-5 sm:p-6 rounded-2xl bg-black/25 card-3d-glass border border-white/10 hover:border-sky-400/50 transition-all duration-300 group/email shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-950/60 border border-sky-400/40 flex items-center justify-center text-sky-300 group-hover/email:text-cyan-200 group-hover/email:border-sky-400 transition-colors shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-sky-400 tracking-wider uppercase block">
                    {t('contact.officialEmail')}
                  </span>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-sm sm:text-base font-bold text-white group-hover/email:text-sky-200 transition-colors break-all"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-900/80 hover:bg-zinc-800 text-slate-200 hover:text-white border border-white/10 hover:border-sky-400/40 transition-all cursor-pointer active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{t('contact.emailCopied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t('contact.copyEmail')}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 hover:text-white border border-sky-400/40 transition-all active:scale-95"
                >
                  <span>{t('contact.openMailto')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Availability & Timezone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Availability */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={subPanelPopVariants}
                custom={0.34}
                className="p-4 sm:p-5 rounded-2xl bg-black/25 card-3d-glass border border-white/10 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CalendarCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {t('contact.availability')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  {t('contact.availStatus')}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400/80" />
                  {t('contact.availResponse')}
                </p>
              </motion.div>

              {/* Timezone / Live Clock */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={subPanelPopVariants}
                custom={0.4}
                className="p-4 sm:p-5 rounded-2xl bg-black/25 card-3d-glass border border-white/10 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {t('contact.timezone')}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  {t('contact.timezoneDetail')}
                </p>
                <p className="text-[11px] text-sky-300/90 font-mono mt-1">
                  {wibTime || 'UTC+7 WIB'}
                </p>
              </motion.div>
            </div>

            {/* Social / Professional Links */}
            <div className="grid grid-cols-2 gap-3.5">
              <motion.a
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={subPanelPopVariants}
                custom={0.46}
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-black/25 card-3d-glass border border-white/10 hover:border-sky-400/40 transition-all flex items-center justify-between group/link"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-[#0A66C2] fill-current" />
                  <span className="text-xs font-bold text-slate-200 group-hover/link:text-white transition-colors">
                    LinkedIn
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-sky-300 transition-colors" />
              </motion.a>

              <motion.a
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={subPanelPopVariants}
                custom={0.52}
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-black/25 card-3d-glass border border-white/10 hover:border-sky-400/40 transition-all flex items-center justify-between group/link"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-slate-200 fill-current" />
                  <span className="text-xs font-bold text-slate-200 group-hover/link:text-white transition-colors">
                    GitHub
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-sky-300 transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: The 3D Glass Contact Form (7 cols on lg)
              ========================================================================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={caveCardVariants}
            custom={0.25}
            className="lg:col-span-7 group relative w-full rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-white/35 via-white/10 to-transparent hover:from-sky-400/80 hover:via-cyan-400/30 transition-colors duration-500"
          >
            {/* 3D Glass Card Body */}
            <div className="relative rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] overflow-hidden bg-black/35 hover:bg-black/45 transition-colors duration-300 card-3d-glass border border-white/10 hover:border-sky-400/50 border-b-2 border-b-black/60 p-6 sm:p-9 md:p-10">
              {/* Specular Top Rim Glint Hairline */}
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30 group-hover:via-cyan-200 transition-colors duration-300" />

              {/* 3D Cyber Hardware Corner Accents & Rivets */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400/70 rounded-tl-sm pointer-events-none group-hover:border-cyan-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-sky-400/70 rounded-br-sm pointer-events-none group-hover:border-cyan-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-sky-400/70 group-hover:bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)] pointer-events-none transition-colors duration-300 z-30" />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-sky-400/70 group-hover:bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)] pointer-events-none transition-colors duration-300 z-30" />

              {/* Form Header */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span className="text-[11px] font-mono tracking-widest text-sky-400 font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    DIRECT INQUIRY
                  </span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
                >
                  {t('contact.formTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 font-serif-contemporary">
                  {t('contact.formSubtitle')}
                </p>
              </div>

              {/* Form Content / Success State */}
              <AnimatePresence mode="wait">
                {submitStatus?.success ? (
                  <motion.div
                    key="success-banner"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="py-10 sm:py-14 text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-400/60 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-1.5 max-w-md">
                      <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {t('contact.successTitle')}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 font-serif-contemporary leading-relaxed">
                        {submitStatus.message || t('contact.successDesc')}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={resetFormState}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white border border-white/15 hover:border-sky-400/50 transition-all cursor-pointer shadow-md mt-4 active:scale-95"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t('contact.sendAnother')}</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 sm:space-y-5"
                    noValidate
                  >
                    {/* Honeypot Spam Trap (Visually Hidden) */}
                    <input
                      type="text"
                      name="hp_website"
                      value={formData.hp_website}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ display: 'none' }}
                      aria-hidden="true"
                    />

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                        >
                          {t('contact.nameLabel')} <span className="text-sky-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t('contact.namePlaceholder')}
                            className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-zinc-900/70 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                              fieldErrors.name
                                ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                                : 'border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 hover:border-white/25'
                            }`}
                          />
                        </div>
                        {fieldErrors.name && (
                          <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                        >
                          {t('contact.emailLabel')} <span className="text-sky-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t('contact.emailPlaceholder')}
                            className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-zinc-900/70 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                              fieldErrors.email
                                ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                                : 'border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 hover:border-white/25'
                            }`}
                          />
                        </div>
                        {fieldErrors.email && (
                          <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: WhatsApp / Phone (Optional) */}
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                      >
                        {t('contact.whatsappLabel')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder={t('contact.whatsappPlaceholder')}
                          className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-zinc-900/70 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                            fieldErrors.whatsapp
                              ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                              : 'border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 hover:border-white/25'
                          }`}
                        />
                      </div>
                      {fieldErrors.whatsapp && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {fieldErrors.whatsapp}
                        </p>
                      )}
                    </div>

                    {/* Row 3: Message Textarea */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="message"
                          className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider"
                        >
                          {t('contact.messageLabel')} <span className="text-sky-400">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {formData.message.length}/3000
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          maxLength={3000}
                          placeholder={t('contact.messagePlaceholder')}
                          className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-zinc-900/70 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all resize-y ${
                            fieldErrors.message
                              ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                              : 'border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 hover:border-white/25'
                          }`}
                        />
                      </div>
                      {fieldErrors.message && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Error Banner if API returned error */}
                    {submitStatus?.success === false && (
                      <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span>{submitStatus.message}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:via-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_24px_rgba(56,189,248,0.35)] hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] cursor-pointer active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>{t('contact.sendingBtn')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('contact.submitBtn')}</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
