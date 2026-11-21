import { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Users,
  Copy,
  Check,
  AlertCircle,
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
import { CATHEDRAL_EASE, SPRING_TACTILE, shakeX, Reveal, Stagger, StaggerItem } from '../components/motion';
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

    // Spam honeypot detection
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
      desc: `Join us at any of our branches in ${branchListText || 'Accra'}. Parking and usher assistance is available on arrival.`,
      icon: MapPin,
    },
    {
      step: '02',
      title: 'Family & Kids Care',
      desc: 'Our Kids Court provides a secure, fun, and loving Bible atmosphere tailored for children during main Sunday services.',
      icon: Users,
    },
    {
      step: '03',
      title: 'Expect a Holy Encounter',
      desc: 'Experience soul-lifting worship, fervent prayer, prophetic ministry, and systematic exposition of the Word.',
      icon: Sparkles,
    },
  ];

  const floatingFieldClass =
    'peer w-full px-4 pt-6 pb-2.5 rounded-xl bg-white/95 border border-sanctuary-stone text-ink-primary text-body outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 placeholder-transparent';
  const floatingLabelClass =
    'pointer-events-none absolute left-4 top-2 text-eyebrow font-semibold uppercase tracking-wider text-gold-600 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-body peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-muted peer-focus:top-2 peer-focus:text-eyebrow peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-gold-600';

  return (
    <section id="connect" className="relative py-14 lg:py-20 px-4 sm:px-6 md:px-8 bg-transparent text-ink-primary overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        <SectionHeader
          eyebrow="Sanctuary Welcome & Fellowship"
          title="Connect With Our"
          accent="Pastoral Family"
          description="Whether you are planning your first visit, seeking spiritual counseling, or have questions, we are honored to welcome you into the sanctuary."
        />

        {/* First Time Visitor Guide ("Plan Your Visit") */}
        <Reveal className="p-5 sm:p-7 rounded-3xl bg-sanctuary-parchment/88 border border-sanctuary-stone shadow-xs space-y-5">
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sanctuary-stone pb-4">
            <div>
              <h3 className="text-h3 font-serif font-bold text-ink-primary">First-Time Guest Experience</h3>
              <p className="text-caption text-ink-secondary mt-0.5">
                Everything you need to know before joining us this Sunday
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Plan Your Visit Guide');
                onOpenBranchModal?.();
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster font-semibold text-caption uppercase tracking-wider flex items-center gap-2 self-center md:self-auto transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>View Branch Map</span>
            </button>
          </div>

          <Stagger className="grid md:grid-cols-3 gap-4">
            {planYourVisitSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <StaggerItem
                  key={idx}
                  className="p-5 rounded-2xl bg-white/90 border border-sanctuary-stone space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/12 border border-gold-500/25 text-gold-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-bold text-lg text-gold-600/50 tabular-nums">{step.step}</span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-ink-primary">{step.title}</h4>
                  <p className="text-caption text-ink-secondary leading-relaxed">{step.desc}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Reveal>

        {/* 2-Column: Contact Channels & Inquiry Form */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Contacts & FAQs */}
          <div className="lg:col-span-5 space-y-8">
            <Stagger className="space-y-3">
              <StaggerItem>
                <div className="p-5 rounded-2xl bg-sanctuary-parchment/88 border border-sanctuary-stone flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/12 border border-gold-500/25 text-gold-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-eyebrow text-ink-muted font-semibold uppercase tracking-wider">
                      Main Cathedral Location
                    </p>
                    <p className="font-bold text-body text-ink-primary">{churchInfo.contact.location}</p>
                    <button
                      type="button"
                      onClick={() => onOpenBranchModal?.()}
                      className="min-h-[36px] text-caption text-gold-600 font-semibold hover:underline mt-0.5 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All {branches.length} Branch Addresses</span>
                      <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                    </button>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-5 rounded-2xl bg-sanctuary-parchment/88 border border-sanctuary-stone flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-olive-500/12 text-olive-500 border border-olive-500/25 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-eyebrow text-ink-muted font-semibold uppercase tracking-wider">
                      Official Helpline &amp; WhatsApp
                    </p>
                    <div className="flex flex-wrap items-baseline gap-x-2 mt-0.5">
                      <a
                        href={toTelUrl(churchInfo.contact.phone)}
                        onClick={() => trackEvent('conversion', 'call_hotline', 'Connect Section')}
                        className="font-bold font-mono text-body text-ink-primary hover:text-gold-600 tabular-nums"
                      >
                        {toInternationalDisplay(churchInfo.contact.phone)}
                      </a>
                      <span className="text-caption font-mono text-ink-muted tabular-nums">
                        ({toLocalMoMoDisplay(churchInfo.contact.phone)})
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2.5">
                      <a
                        href={toWhatsAppUrl(
                          churchInfo.contact.phone,
                          'Shalom Pastor, I am contacting you from the RICGCW website.'
                        )}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Connect Section')}
                        className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-olive-500/12 hover:bg-olive-500/20 text-olive-600 text-caption font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <a
                        href={toTelUrl(churchInfo.contact.phone)}
                        onClick={() => trackEvent('conversion', 'call_hotline', 'Connect Section Pill')}
                        className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-sanctuary-alabaster border border-sanctuary-stone text-ink-primary text-caption font-semibold transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-gold-600" /> Call
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyPhone}
                        className="min-h-[38px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-sanctuary-alabaster border border-sanctuary-stone text-ink-secondary text-caption font-medium transition-colors cursor-pointer"
                      >
                        {copiedPhone ? <Check className="w-3.5 h-3.5 text-olive-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-5 rounded-2xl bg-sanctuary-parchment/88 border border-sanctuary-stone flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/12 border border-gold-500/25 text-gold-600 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-eyebrow text-ink-muted font-semibold uppercase tracking-wider">Official Email</p>
                    <a
                      href={`mailto:${churchInfo.contact.email}`}
                      className="font-bold font-mono text-body text-ink-primary hover:text-gold-600"
                    >
                      {churchInfo.contact.email}
                    </a>
                    <p className="text-caption text-ink-secondary mt-0.5">For administrative letters &amp; bookings</p>
                  </div>
                </div>
              </StaggerItem>
            </Stagger>

            {/* FAQs Accordion */}
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-h3 text-ink-primary flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gold-600" />
                <span>Frequently Asked Questions</span>
              </h4>

              <div className="space-y-2.5">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={faq.id || idx}
                      className="rounded-2xl bg-sanctuary-parchment/88 border border-sanctuary-stone overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="min-h-[48px] w-full p-4 text-left font-semibold text-body text-ink-primary flex items-center justify-between gap-3 cursor-pointer hover:bg-white/60 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-ink-muted shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-gold-600' : ''
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
                            <div className="p-4 pt-2.5 text-caption text-ink-secondary leading-relaxed border-t border-sanctuary-stone/70">
                              {faq.a}
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Floating-Label Interactive Inquiry Form with Animated Check & Error Shake */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-sanctuary-parchment/88 backdrop-blur-md border border-sanctuary-stone shadow-xs space-y-5">
              <div className="space-y-1.5">
                <span className="px-3 py-1 rounded-full text-eyebrow font-semibold uppercase tracking-wider bg-gold-500/12 text-gold-700 border border-gold-500/25 inline-block">
                  Online Inquiry &amp; Counseling
                </span>
                <h3 className="text-h3 font-bold font-serif text-ink-primary">Send a Direct Message to Pastors</h3>
                <p className="text-caption text-ink-secondary">
                  Fill out the form below and our secretariat will get back to you promptly.
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
                    className="p-8 rounded-2xl bg-olive-500/10 border border-olive-500/25 text-center space-y-4"
                  >
                    {/* Animated SVG Checkmark drawn via pathLength */}
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
                      <h4 className="text-xl font-bold font-serif text-ink-primary">Message Received in Faith</h4>
                      <p className="text-body text-ink-secondary max-w-md mx-auto">
                        Thank you for reaching out. A pastoral representative will contact you shortly. God bless you!
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="min-h-[44px] px-6 py-2.5 rounded-full bg-white border border-sanctuary-stone text-caption font-semibold text-ink-primary hover:border-gold-500 transition-colors cursor-pointer"
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
                    className="space-y-4"
                  >
                    {/* Accessible Error Alert Banner */}
                    {formError && (
                      <div
                        role="alert"
                        aria-live="polite"
                        className="p-3.5 rounded-xl bg-flame-500/12 border border-flame-500/35 text-flame-500 text-caption font-semibold flex items-center gap-2.5"
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

                    <div className="grid sm:grid-cols-2 gap-4">
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
                          className={floatingFieldClass}
                        />
                        <label htmlFor="connect-name" className={floatingLabelClass}>
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
                          className={`${floatingFieldClass} tabular-nums font-mono`}
                        />
                        <label htmlFor="connect-phone" className={floatingLabelClass}>
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
                        className={floatingFieldClass}
                      />
                      <label htmlFor="connect-email" className={floatingLabelClass}>
                        Email Address
                      </label>
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="connect-subject"
                        className="pointer-events-none absolute left-4 top-2 text-eyebrow font-semibold uppercase tracking-wider text-gold-600"
                      >
                        Subject / Purpose
                      </label>
                      <select
                        id="connect-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 pt-6 pb-2.5 rounded-xl bg-white/95 border border-sanctuary-stone text-ink-primary text-body outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                      >
                        <option>First-time Visitor Inquiry</option>
                        <option>Pastoral Counseling Booking</option>
                        <option>Water Baptism & Membership Class</option>
                        <option>Wedding & Child Dedication</option>
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
                        className={floatingFieldClass}
                      />
                      <label htmlFor="connect-message" className={floatingLabelClass}>
                        How may we serve or pray with you?
                      </label>
                    </div>

                    <m.button
                      type="submit"
                      disabled={isSubmitting}
                      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                      transition={SPRING_TACTILE}
                      className="min-h-[48px] w-full py-3.5 px-6 rounded-full bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster font-semibold text-caption uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Pastoral Office'}</span>
                    </m.button>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
