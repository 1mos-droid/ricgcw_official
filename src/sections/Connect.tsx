import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Copy,
  Check,
  AlertCircle,
  Plus,
  Minus,
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
  const [phoneCopyState, setPhoneCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'First-time Visitor Inquiry',
    message: '',
  });

  const branchListText =
    branches.length > 0
      ? branches.map((b) => b.name.split(' ')[0]).join(', ')
      : 'Mallam, Kokrobitey, Langma';

  const handleCopyPhone = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(toLocalDigits(churchInfo.contact.phone));
      setPhoneCopyState('copied');
    } catch {
      setPhoneCopyState('error');
    }
    window.setTimeout(() => setPhoneCopyState('idle'), 2400);
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
      setFormError('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('Please provide a phone or WhatsApp number.');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setFormError('Please write your message before sending.');
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

  return (
    <section
      id="connect"
      aria-labelledby="connect-heading"
      className="bg-public-surface text-public-ink py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-public-border"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          headingId="connect-heading"
          eyebrow="Connect & Questions"
          title="Let’s take the"
          accent="next step."
          description="Planning your first Sunday or looking to speak with our pastoral team? We are glad to help."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: First-Time Steps, Contact Details & FAQ */}
          <div className="lg:col-span-5 space-y-8 min-w-0">
            {/* Compact First-Time Visitor Guide */}
            <div className="p-6 sm:p-8 bg-public-muted space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-public-accent">
                  First-Time Visitors
                </p>
                <h3 className="text-lg font-bold text-public-ink">What to expect on Sunday</h3>
              </div>

              <ol className="space-y-2.5 text-sm text-public-ink-muted list-decimal pl-5">
                <li>
                  Choose a campus ({branchListText}), check its service time, and arrive about 15 minutes early.
                </li>
                <li>
                  Come as you are — ushers will help you and your family find comfortable seating.
                </li>
                <li>
                  Stay for a brief welcome chat after service to meet our pastors and members.
                </li>
              </ol>

              <button
                type="button"
                onClick={() => onOpenBranchModal?.()}
                className="min-h-[44px] w-full px-4 py-2.5 rounded-lg border border-public-border bg-public-surface hover:border-public-ink text-public-ink text-sm font-semibold transition-colors cursor-pointer"
              >
                Plan your visit
              </button>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-public-ink">Church Secretariat</h3>

              <div className="py-5 border-y border-public-border space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <Phone className="w-4 h-4 text-public-accent shrink-0 mt-1" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-public-ink-muted">Phone &amp; WhatsApp</p>
                      <a
                        href={toTelUrl(churchInfo.contact.phone)}
                        className="text-base font-bold text-public-ink hover:text-public-accent transition-colors tabular-nums block"
                      >
                        {toInternationalDisplay(churchInfo.contact.phone)}
                      </a>
                      <p className="text-xs text-public-ink-muted tabular-nums">
                        Local / MoMo: {toLocalMoMoDisplay(churchInfo.contact.phone)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    aria-label="Copy church phone number"
                    className="min-h-[44px] px-3 py-2 rounded-lg border border-public-border bg-public-surface hover:border-public-ink text-public-ink text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {phoneCopyState === 'copied' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-olive-500" />
                        <span>Copied</span>
                      </>
                    ) : phoneCopyState === 'error' ? (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-public-accent" />
                        <span>Unavailable</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-public-accent" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-public-border">
                  <Mail className="w-4 h-4 text-public-accent shrink-0 mt-1" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-public-ink-muted">Email</p>
                    <a
                      href={`mailto:${churchInfo.contact.email}`}
                      className="text-sm sm:text-base font-medium text-public-ink hover:text-public-accent transition-colors break-all"
                    >
                      {churchInfo.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-public-border">
                  <MapPin className="w-4 h-4 text-public-accent shrink-0 mt-1" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-public-ink-muted">Sanctuaries</p>
                    <p className="text-sm text-public-ink">
                      {branchListText} · {churchInfo.contact.location}
                    </p>
                  </div>
                </div>

                <a
                  href={toWhatsAppUrl(churchInfo.contact.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Connect Section')}
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-lg border border-public-border bg-public-surface hover:border-public-ink text-public-ink text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-public-accent shrink-0" />
                  <span>Message us on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* FAQ Accordion */}
            {faqs.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-public-ink">Frequently Asked Questions</h3>
                <div className="divide-y divide-public-border border border-public-border rounded-xl bg-public-canvas overflow-hidden">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={faq.id}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${faq.id}`}
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full min-h-[52px] px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-public-surface/60 transition-colors cursor-pointer"
                        >
                          <span className="text-sm sm:text-base font-semibold text-public-ink">
                            {faq.q}
                          </span>
                          {isOpen ? (
                            <Minus className="w-4 h-4 text-public-accent shrink-0" />
                          ) : (
                            <Plus className="w-4 h-4 text-public-ink-muted shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div
                            id={`faq-answer-${faq.id}`}
                            className="px-5 pb-5 text-sm text-public-ink-muted leading-relaxed"
                          >
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Clean Labeled Inquiry Form */}
          <div className="lg:col-span-7 bg-public-canvas border border-public-border rounded-xl p-6 sm:p-8 lg:p-10">
            {formSubmitted ? (
              <div
                role="status"
                aria-live="polite"
                className="py-10 text-center space-y-4 max-w-md mx-auto"
              >
                <div className="w-12 h-12 rounded-full bg-olive-500/15 text-olive-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-public-ink">Message Received</h3>
                <p className="text-base text-public-ink-muted leading-relaxed">
                  Thank you for reaching out to {churchInfo.name}. Our pastoral team or secretariat will follow up with you shortly.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="min-h-[44px] px-6 py-2.5 rounded-lg bg-public-ink hover:bg-public-accent text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight text-public-ink">
                    Send us a message
                  </h3>
                  <p className="text-sm text-public-ink-muted">
                    Ask a question about Sunday worship, request counseling, or let us know you are visiting.
                  </p>
                </div>

                {/* Honeypot anti-spam field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="connect-website">Website</label>
                  <input
                    id="connect-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {formError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-crimson-500/10 border border-crimson-500/30 text-sm font-medium text-public-ink flex items-center gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-crimson-500 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="connect-name"
                      className="block text-sm font-semibold text-public-ink"
                    >
                      Full Name <span className="text-public-accent">*</span>
                    </label>
                    <input
                      id="connect-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full min-h-[48px] px-3.5 py-2.5 rounded-lg bg-public-surface border border-public-ink-muted/75 text-base text-public-ink placeholder:text-public-ink-muted focus:border-public-ink focus:ring-2 focus:ring-public-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="connect-phone"
                      className="block text-sm font-semibold text-public-ink"
                    >
                      Phone / WhatsApp <span className="text-public-accent">*</span>
                    </label>
                    <input
                      id="connect-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+233 24 000 0000"
                      className="w-full min-h-[48px] px-3.5 py-2.5 rounded-lg bg-public-surface border border-public-ink-muted/75 text-base text-public-ink placeholder:text-public-ink-muted focus:border-public-ink focus:ring-2 focus:ring-public-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="connect-email"
                      className="block text-sm font-semibold text-public-ink"
                    >
                      Email Address <span className="text-public-accent">*</span>
                    </label>
                    <input
                      id="connect-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full min-h-[48px] px-3.5 py-2.5 rounded-lg bg-public-surface border border-public-ink-muted/75 text-base text-public-ink placeholder:text-public-ink-muted focus:border-public-ink focus:ring-2 focus:ring-public-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="connect-subject"
                      className="block text-sm font-semibold text-public-ink"
                    >
                      Topic
                    </label>
                    <select
                      id="connect-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full min-h-[48px] px-3.5 py-2.5 rounded-lg bg-public-surface border border-public-ink-muted/75 text-base text-public-ink focus:border-public-ink focus:ring-2 focus:ring-public-accent"
                    >
                      <option value="First-time Visitor Inquiry">First-time Visitor Inquiry</option>
                      <option value="Prayer & Pastoral Counseling">Prayer &amp; Pastoral Counseling</option>
                      <option value="Join a Ministry / Department">Join a Ministry / Department</option>
                      <option value="Kingdom Partnership & Giving">Kingdom Partnership &amp; Giving</option>
                      <option value="General Church Information">General Church Information</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="connect-message"
                    className="block text-sm font-semibold text-public-ink"
                  >
                    Message <span className="text-public-accent">*</span>
                  </label>
                  <textarea
                    id="connect-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our church family welcome or pray with you?"
                    className="w-full px-3.5 py-3 rounded-lg bg-public-surface border border-public-ink-muted/75 text-base text-public-ink placeholder:text-public-ink-muted focus:border-public-ink focus:ring-2 focus:ring-public-accent resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-lg bg-public-ink hover:bg-public-accent disabled:opacity-60 text-white font-semibold text-base transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Sending message...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
