import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, ChevronDown, HelpCircle, MessageCircle, Users, Copy, Check } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { trackEvent } from '../utils/analytics';
import { toWhatsAppUrl, toInternationalDisplay, toLocalMoMoDisplay, toLocalDigits, toTelUrl } from '../utils/phoneUtils';

interface ConnectProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

export const Connect = ({ onOpenBranchModal }: ConnectProps) => {
  const { churchInfo, faqs, branches } = useChurch();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'First-time Visitor Inquiry',
    message: '',
  });

  const branchListText = branches.map((b) => b.name.split(' ')[0]).join(', ');

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(toLocalDigits(churchInfo.contact.phone));
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    trackEvent('inquiry', 'visitor_form_submitted', formData.subject);

    // Spam honeypot detection
    if (honeypot.trim().length > 0) {
      console.warn('Bot submission trapped by honeypot.');
      setFormSubmitted(true);
      return;
    }

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

  return (
    <section id="connect" className="relative py-12 lg:py-16 px-4 sm:px-6 md:px-8 bg-transparent text-[#141619] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6E0D3]/80 pb-5">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B8860B] font-semibold block mb-1">
              Sanctuary Welcome &amp; Fellowship
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#141619]">
              Connect With Our <span className="italic font-normal text-[#B8860B]">Pastoral Family</span>
            </h2>
          </div>
          <p className="text-xs text-[#4A5058] max-w-md font-light">
            Whether you are planning your first visit, seeking spiritual counseling, or have questions, we are honored to welcome you into the sanctuary.
          </p>
        </div>

        {/* First Time Visitor Guide ("Plan Your Visit") */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#F3EFE6]/74 backdrop-blur-md border border-[#E6E0D3]/90 shadow-xs space-y-5">
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#E6E0D3] pb-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#141619]">First-Time Guest Experience</h3>
              <p className="text-xs text-[#4A5058] mt-0.5">Everything you need to know before joining us this Sunday</p>
            </div>
            <button
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Plan Your Visit Guide');
                onOpenBranchModal?.();
              }}
              className="px-4 py-2 rounded-full bg-[#B8860B] hover:bg-[#996515] text-[#FAF8F5] font-medium text-xs uppercase tracking-wider flex items-center gap-2 self-center md:self-auto transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" /> View Branch Map
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {planYourVisitSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-[#E6E0D3] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 text-[#B8860B] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-serif font-bold text-base text-[#B8860B]/40 tabular-nums">{step.step}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#141619]">{step.title}</h4>
                  <p className="text-xs text-[#4A5058] leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column: Contact Channels & Inquiry Form */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Contacts & FAQs */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Cards */}
            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-[#F3EFE6]/74 backdrop-blur-md border border-[#E6E0D3]/90 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#B8860B]/10 border border-[#B8860B]/20 text-[#B8860B] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-[#787F87] font-semibold uppercase tracking-wider">Main Cathedral Location</p>
                  <p className="font-bold text-sm text-[#141619]">{churchInfo.contact.location}</p>
                  <button
                    onClick={() => onOpenBranchModal?.()}
                    className="text-xs text-[#B8860B] font-semibold hover:underline mt-0.5 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All {branches.length} Branch Addresses</span>
                    <ChevronDown className="w-3 h-3 -rotate-90" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F3EFE6]/74 backdrop-blur-md border border-[#E6E0D3]/90 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3B6E4C]/12 text-[#3B6E4C] border border-[#3B6E4C]/25 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#787F87] font-semibold uppercase tracking-wider">
                    Official Helpline &amp; WhatsApp
                  </p>
                  <div className="flex flex-wrap items-baseline gap-x-2 mt-0.5">
                    <a
                      href={toTelUrl(churchInfo.contact.phone)}
                      onClick={() => trackEvent('conversion', 'call_hotline', 'Connect Section')}
                      className="font-bold font-mono text-sm text-[#141619] hover:text-[#B8860B] tabular-nums"
                    >
                      {toInternationalDisplay(churchInfo.contact.phone)}
                    </a>
                    <span className="text-xs font-mono text-[#787F87] tabular-nums">
                      ({toLocalMoMoDisplay(churchInfo.contact.phone)})
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <a
                      href={toWhatsAppUrl(churchInfo.contact.phone, 'Shalom Pastor, I am contacting you from the RICGCW website.')}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Connect Section')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#3B6E4C]/12 hover:bg-[#3B6E4C]/20 text-[#3B6E4C] text-[11px] font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" /> WhatsApp
                    </a>
                    <a
                      href={toTelUrl(churchInfo.contact.phone)}
                      onClick={() => trackEvent('conversion', 'call_hotline', 'Connect Section Pill')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 hover:bg-white border border-[#E6E0D3] text-[#141619] text-[11px] font-semibold transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#B8860B]" /> Call
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 hover:bg-white border border-[#E6E0D3] text-[#4A5058] text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      {copiedPhone ? <Check className="w-3 h-3 text-[#3B6E4C]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F3EFE6]/74 backdrop-blur-md border border-[#E6E0D3]/90 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#B8860B]/10 border border-[#B8860B]/20 text-[#B8860B] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-[#787F87] font-semibold uppercase tracking-wider">Official Email</p>
                  <a
                    href={`mailto:${churchInfo.contact.email}`}
                    className="font-bold font-mono text-sm text-[#141619] hover:text-[#B8860B]"
                  >
                    {churchInfo.contact.email}
                  </a>
                  <p className="text-xs text-[#4A5058] mt-0.5">For administrative letters &amp; bookings</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-xl text-[#141619] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#B8860B]" />
                Frequently Asked Questions
              </h4>

              <div className="space-y-2.5">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={faq.id || idx}
                      className="rounded-2xl bg-[#F3EFE6]/74 backdrop-blur-md border border-[#E6E0D3]/90 overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-[#141619] flex items-center justify-between gap-3 cursor-pointer hover:bg-white/40 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-[#787F87] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#B8860B]' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 pt-2 text-xs sm:text-sm text-[#4A5058] leading-relaxed border-t border-[#E6E0D3]/60 font-light">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-7 rounded-2xl bg-[#F3EFE6]/78 backdrop-blur-md border border-[#E6E0D3]/90 shadow-xs space-y-4">
              <div className="space-y-1.5">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/20 inline-block">
                  Online Inquiry &amp; Counseling
                </span>
                <h3 className="text-xl font-bold font-serif text-[#141619]">Send a Direct Message to Pastors</h3>
                <p className="text-xs text-[#4A5058] font-light">
                  Fill out the form below and our secretariat will get back to you promptly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-[#3B6E4C]/10 border border-[#3B6E4C]/25 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-[#3B6E4C] mx-auto" />
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-bold font-serif text-[#141619]">Message Received in Faith</h4>
                    <p className="text-xs sm:text-sm text-[#4A5058]">
                      Thank you for reaching out. A pastoral representative will contact you shortly. God bless you!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-5 py-2 rounded-full bg-white border border-[#E6E0D3] text-xs font-semibold text-[#141619] hover:border-[#B8860B] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for bot protection */}
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
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#4A5058] mb-1.5 tracking-wider">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Mensah"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-[#FAF8F5]/90 border border-[#E6E0D3] text-[#141619] text-sm outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#4A5058] mb-1.5 tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+233 24 485 7403"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl bg-[#FAF8F5]/90 border border-[#E6E0D3] text-[#141619] text-sm tabular-nums font-mono outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#4A5058] mb-1.5 tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#FAF8F5]/90 border border-[#E6E0D3] text-[#141619] text-sm outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#4A5058] mb-1.5 tracking-wider">Subject / Purpose</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#FAF8F5]/90 border border-[#E6E0D3] text-[#141619] text-sm outline-none focus:border-[#B8860B]"
                    >
                      <option>First-time Visitor Inquiry</option>
                      <option>Pastoral Counseling Booking</option>
                      <option>Water Baptism & Membership Class</option>
                      <option>Wedding & Child Dedication</option>
                      <option>General Administration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-[#4A5058] mb-1.5 tracking-wider">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How may we serve or pray with you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#FAF8F5]/90 border border-[#E6E0D3] text-[#141619] text-sm outline-none focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#B8860B] hover:bg-[#996515] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message to Pastoral Office'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
