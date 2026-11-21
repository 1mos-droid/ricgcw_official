import { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  Plus,
  MessageCircle,
  Users,
  Copy,
  Check,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { trackEvent } from '../utils/analytics';
import {
  toWhatsAppUrl,
  toInternationalDisplay,
  toLocalMoMoDisplay,
  toLocalDigits,
  toTelUrl,
} from '../utils/phoneUtils';
import { CATHEDRAL_EASE, SPRING_TACTILE, shakeX, Reveal } from '../components/motion';
import SectionHeader from '../components/SectionHeader';

interface ConnectProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

export const Connect = ({ onOpenBranchModal }: ConnectProps) => {
  const { churchInfo, faqs, branches } = useChurch();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [shakeCount, setShakeCount] = useState(0);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'First-time Visitor Inquiry',
    message: '',
  });

  const prefersReduced = useReducedMotion();
  const branchListText = branches.map((b) => b.name.split(' ')[0]).join(', ');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(toLocalDigits(churchInfo.contact.phone));
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const triggerFormError = (msg: string) => {
    setFormError(msg);
    setShakeCount((c) => c + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (honeypot.trim().length > 0) {
      console.warn('Bot submission trapped by honeypot.');
      setFormSubmitted(true);
      return;
    }

    if (!formData.name.trim()) {
      triggerFormError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      triggerFormError('Please provide a phone or WhatsApp number.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      triggerFormError('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      triggerFormError('Please write your message before sending.');
      return;
    }

    setFormError(null);
    trackEvent('inquiry', 'visitor_form_submitted', formData.subject);
    setIsSubmitting(true);

    try {
      if (db) {
        await addDoc(collection(db, 'inquiries'), {
          ...formData,
          createdAt: new Date().toISOString(),
          status: 'unread',
        });
      }
    } catch (err) {
      console.warn('Inquiry record note:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'First-time Visitor Inquiry',
      message: '',
    });
    setFormError(null);
    setFormSubmitted(false);
  };

  const planYourVisitSteps = [
    {
      step: '01',
      title: 'Choose a Sanctuary',
      desc: `Join us at our branches in ${branchListText || 'Accra'}. Usher welcome and parking assistance await your arrival.`,
      icon: MapPin,
    },
    {
      step: '02',
      title: 'Family & Kids Care',
      desc: 'Kids Court nurtures children in a warm, supervised Bible atmosphere during main Sunday services.',
      icon: Users,
    },
    {
      step: '03',
      title: 'Expect a Holy Encounter',
      desc: 'Experience reverent worship, fervent intercession, prophetic ministry, and verse-by-verse teaching.',
      icon: Sparkles,
    },
  ];

  const underlineFieldClass =
    'peer w-full px-0 pt-6 pb-2.5 bg-transparent border-0 border-b border-ink-primary/25 text-ink-primary text-body outline-none transition-colors focus:border-gold-600 placeholder-transparent rounded-none';
  const underlineLabelClass =
    'pointer-events-none absolute left-0 top-1.5 text-eyebrow font-mono uppercase tracking-[0.16em] text-gold-600 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-body peer-placeholder-shown:font-sans peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-muted peer-focus:top-1.5 peer-focus:text-eyebrow peer-focus:font-mono peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-gold-600';

  return (
    <section
      id="connect"
      className="bg-sanctuary-alabaster paper-grain text-ink-primary py-20 lg:py-28 px-4 sm:px-6 lg:px-10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto space-y-14">
        <SectionHeader
          index="07"
          eyebrow="Sanctuary Welcome & Fellowship"
          title="Connect With Our"
          accent="Pastoral Family"
          description="Planning your first visit, seeking counsel, or writing to the secretariat? Reach us below."
        />

        {/* Hairline 3-Column First-Time Guest Strip (Zero Boxed Grid) */}
        <div className="border-b border-sanctuary-stone pb-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-ink-primary">
                First-Time Guest Experience
              </h3>
              <p className="text-caption text-ink-secondary">
                Everything to expect when stepping into the inner court this Sunday
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Plan Your Visit Guide');
                onOpenBranchModal?.();
              }}
              className="min-h-[44px] self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-sanctuary-950 hover:bg-gold-600 text-sanctuary-alabaster font-semibold text-caption uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>View Branch Map</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-sanctuary-stone border-t border-sanctuary-stone">
            {planYourVisitSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="py-5 md:py-6 md:px-6 first:md:pl-0 last:md:pr-0 space-y-2">
                  <div className="flex items-center justify-between text-eyebrow font-mono uppercase tracking-[0.18em] text-gold-600">
                    <span>{step.step}</span>
                    <Icon className="w-4 h-4 text-gold-600" />
                  </div>
                  <h4 className="font-serif text-2xl text-ink-primary">{step.title}</h4>
                  <p className="text-caption text-ink-secondary leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 12-Column Secretariat Directory & Underline Inquiry Folio */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left 5 Cols: Secretariat Contacts + Clean FAQ Accordion */}
          <div className="lg:col-span-5 space-y-10">
            <div className="divide-y divide-sanctuary-stone border-t border-b border-sanctuary-stone">
              <div className="py-5 space-y-1.5">
                <p className="text-eyebrow font-mono uppercase tracking-[0.18em] text-ink-muted">
                  Main Cathedral Location
                </p>
                <p className="font-serif text-2xl text-ink-primary">{churchInfo.contact.location}</p>
                <button
                  type="button"
                  onClick={() => onOpenBranchModal?.()}
                  className="min-h-[38px] text-caption text-gold-600 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View All {branches.length} Branch Addresses</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="py-5 space-y-3">
                <p className="text-eyebrow font-mono uppercase tracking-[0.18em] text-ink-muted">
                  Official Helpline &amp; WhatsApp
                </p>
                <div className="flex flex-wrap items-baseline gap-x-2.5">
                  <a
                    href={toTelUrl(churchInfo.contact.phone)}
                    onClick={() => trackEvent('conversion', 'call_hotline', 'Connect Section')}
                    className="font-mono font-bold text-lg text-ink-primary hover:text-gold-600 tabular-nums"
                  >
                    {toInternationalDisplay(churchInfo.contact.phone)}
                  </a>
                  <span className="text-caption font-mono text-ink-muted tabular-nums">
                    ({toLocalMoMoDisplay(churchInfo.contact.phone)})
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={toWhatsAppUrl(
                      churchInfo.contact.phone,
                      'Shalom Pastor, I am contacting you from the RICGCW website.'
                    )}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Connect Section')}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-olive-500/12 hover:bg-olive-500/20 text-olive-600 text-caption font-semibold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <a
                    href={toTelUrl(churchInfo.contact.phone)}
                    onClick={() => trackEvent('conversion', 'call_hotline', 'Connect Section Pill')}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white border border-sanctuary-stone hover:border-ink-primary text-ink-primary text-caption font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600" /> Call
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white border border-sanctuary-stone hover:border-ink-primary text-ink-secondary text-caption font-medium transition-colors cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-olive-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="py-5 space-y-1">
                <p className="text-eyebrow font-mono uppercase tracking-[0.18em] text-ink-muted">
                  Official Secretariat Email
                </p>
                <a
                  href={`mailto:${churchInfo.contact.email}`}
                  className="font-mono font-semibold text-base text-ink-primary hover:text-gold-600 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-gold-600 shrink-0" />
                  <span>{churchInfo.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Clean Architectural FAQ Accordion */}
            <div className="space-y-4">
              <h4 className="font-serif text-2xl sm:text-3xl text-ink-primary">
                Frequently Asked Questions
              </h4>

              <div className="divide-y divide-sanctuary-stone border-t border-b border-sanctuary-stone">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={faq.id || idx}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="min-h-[52px] w-full py-4 text-left font-medium text-body text-ink-primary flex items-center justify-between gap-4 cursor-pointer hover:text-gold-600 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <Plus
                          className={`w-4 h-4 text-gold-600 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: prefersReduced ? 0.1 : 0.25, ease: CATHEDRAL_EASE }}
                            className="overflow-hidden"
                          >
                            <p className="pb-4 text-caption text-ink-secondary leading-relaxed">
                              {faq.a}
                            </p>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Crisp Architectural Underline Inquiry Form */}
          <div className="lg:col-span-7">
            <Reveal className="p-6 sm:p-10 bg-white border border-sanctuary-stone shadow-xs space-y-6">
              <div className="space-y-2 pb-5 border-b border-sanctuary-stone">
                <span className="text-eyebrow font-mono uppercase tracking-[0.22em] text-gold-600 block">
                  Pastoral Correspondence
                </span>
                <h3 className="text-h2 font-serif font-normal text-ink-primary">
                  Send a Direct Message to Pastors
                </h3>
                <p className="text-caption text-ink-secondary">
                  Complete the correspondence sheet below and our secretariat will respond promptly.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <m.div
                    key="submitted-success"
                    initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={SPRING_TACTILE}
                    className="py-10 px-6 bg-sanctuary-alabaster border border-olive-500/30 text-center space-y-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-olive-500/15 text-olive-600 flex items-center justify-center mx-auto">
                      <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10" aria-hidden="true">
                        <m.circle
                          cx="18"
                          cy="18"
                          r="15"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          initial={{ pathLength: prefersReduced ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: prefersReduced ? 0.1 : 0.45, ease: CATHEDRAL_EASE }}
                        />
                        <m.path
                          d="M 11 18.5 L 15.8 23.2 L 25.5 13.5"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: prefersReduced ? 1 : 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{
                            duration: prefersReduced ? 0.1 : 0.35,
                            delay: prefersReduced ? 0 : 0.25,
                            ease: CATHEDRAL_EASE,
                          }}
                        />
                      </svg>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-3xl font-serif text-ink-primary">Message Received in Faith</h4>
                      <p className="text-body text-ink-secondary max-w-md mx-auto">
                        Thank you for reaching out. A pastoral representative will contact you shortly. God bless you!
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="min-h-[44px] px-6 py-2.5 rounded-sm bg-white border border-sanctuary-stone-strong text-caption font-semibold uppercase tracking-[0.14em] text-ink-primary hover:border-gold-600 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </m.div>
                ) : (
                  <m.form
                    key={`inquiry-form-${shakeCount}`}
                    noValidate
                    onSubmit={handleSubmit}
                    animate={shakeCount > 0 && !prefersReduced ? shakeX : undefined}
                    className="space-y-6"
                  >
                    {formError && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="p-3.5 bg-flame-500/10 border border-flame-500/35 text-flame-500 text-caption font-semibold flex items-center gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Honeypot field */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="hp_website_contact"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <input
                          id="connect-name"
                          type="text"
                          required
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (formError) setFormError(null);
                          }}
                          className={underlineFieldClass}
                        />
                        <label htmlFor="connect-name" className={underlineLabelClass}>
                          Full Name
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          id="connect-phone"
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formError) setFormError(null);
                          }}
                          className={`${underlineFieldClass} tabular-nums font-mono`}
                        />
                        <label htmlFor="connect-phone" className={underlineLabelClass}>
                          Phone / WhatsApp
                        </label>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        id="connect-email"
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        className={underlineFieldClass}
                      />
                      <label htmlFor="connect-email" className={underlineLabelClass}>
                        Email Address
                      </label>
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="connect-subject"
                        className="pointer-events-none absolute left-0 top-1.5 text-eyebrow font-mono uppercase tracking-[0.16em] text-gold-600"
                      >
                        Subject / Purpose
                      </label>
                      <select
                        id="connect-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-0 pt-6 pb-2.5 bg-transparent border-0 border-b border-ink-primary/25 text-ink-primary text-body outline-none focus:border-gold-600 rounded-none"
                      >
                        <option>First-time Visitor Inquiry</option>
                        <option>Pastoral Counseling Booking</option>
                        <option>Water Baptism &amp; Membership Class</option>
                        <option>Wedding &amp; Child Dedication</option>
                        <option>General Administration</option>
                      </select>
                    </div>

                    <div className="relative">
                      <textarea
                        id="connect-message"
                        rows={4}
                        required
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        className={underlineFieldClass}
                      />
                      <label htmlFor="connect-message" className={underlineLabelClass}>
                        How may we serve or pray with you?
                      </label>
                    </div>

                    <m.button
                      type="submit"
                      disabled={isSubmitting}
                      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                      transition={SPRING_TACTILE}
                      className="min-h-[48px] w-full py-3.5 px-6 rounded-sm bg-sanctuary-950 hover:bg-gold-600 text-sanctuary-alabaster font-semibold text-caption uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                    >
                      <Send className="w-4 h-4 text-gold-400" />
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Pastoral Office'}</span>
                    </m.button>
                  </m.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
