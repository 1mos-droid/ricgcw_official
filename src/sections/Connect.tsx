import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, ChevronDown, HelpCircle, Shield } from 'lucide-react';
import { CHURCH_INFO, FAQS } from '../data/churchData';
import { YoutubeIcon, FacebookIcon, InstagramIcon } from '../components/Icons';

interface ConnectProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: () => void;
}

export const Connect = ({ onOpenPrayerModal, onOpenBranchModal }: ConnectProps) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'First-time Visitor Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('https://formspree.io/f/xpqogleb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).catch(() => {});
    setFormSubmitted(true);
  };

  return (
    <section id="connect" className="relative py-28 px-4 sm:px-6 md:px-8 bg-slate-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Reach Out
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
            Connect With Our Pastoral Team
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Whether you need counseling, want to plan your first visit, or have questions about our services, we are here for you.
          </p>
        </div>

        {/* 2-Column: Contact Details & Form */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Channels & FAQs */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Cards */}
            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Main Sanctuary Location</p>
                  <p className="font-bold text-sm text-white">{CHURCH_INFO.contact.location}</p>
                  <button
                    onClick={onOpenBranchModal}
                    className="text-xs text-amber-400 font-bold hover:underline mt-0.5 block cursor-pointer"
                  >
                    View All 3 Branch Addresses →
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Helpline & WhatsApp</p>
                  <a href={`tel:${CHURCH_INFO.contact.phone}`} className="font-bold font-mono text-sm text-white hover:text-amber-300">
                    {CHURCH_INFO.contact.phone}
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Available for emergency prayer & inquiries</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Official Email</p>
                  <a href={`mailto:${CHURCH_INFO.contact.email}`} className="font-bold font-mono text-sm text-white hover:text-amber-300">
                    {CHURCH_INFO.contact.email}
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">For administrative & partnership letters</p>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Join Our Online Community</p>
              <div className="flex gap-3">
                <a
                  href={CHURCH_INFO.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-red-600 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <YoutubeIcon className="w-4 h-4" /> YouTube
                </a>
                <a
                  href={CHURCH_INFO.contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <FacebookIcon className="w-4 h-4" /> Facebook
                </a>
                <a
                  href={CHURCH_INFO.contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-pink-600 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <InstagramIcon className="w-4 h-4" /> Instagram
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Send Message / Connect Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[36px] bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 shadow-2xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-serif text-white">Send Us a Direct Message</h3>
                <p className="text-xs text-slate-400">Have a question or request? Fill the form below and our ministers will respond promptly.</p>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-serif text-white">Thank You for Reaching Out!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Your message has been sent to our pastoral secretariat. We look forward to connecting with you and welcoming you to service.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'First-time Visitor Inquiry', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+233 24 000 0000"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Inquiry Type</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm"
                      >
                        <option value="First-time Visitor Inquiry" className="bg-slate-900">First-time Visitor Inquiry</option>
                        <option value="Plan a Visit to Mallam Sanctuary" className="bg-slate-900">Plan a Visit to Mallam Sanctuary</option>
                        <option value="Plan a Visit to Kokrobitey Branch" className="bg-slate-900">Plan a Visit to Kokrobitey Branch</option>
                        <option value="Plan a Visit to Langma Branch" className="bg-slate-900">Plan a Visit to Langma Branch</option>
                        <option value="Pastoral Counseling Request" className="bg-slate-900">Pastoral Counseling Request</option>
                        <option value="Volunteer / Join Department" className="bg-slate-900">Volunteer / Join Department</option>
                        <option value="Partnership & Sponsorship" className="bg-slate-900">Partnership & Sponsorship</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">How Can We Help or Pray For You? *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your questions, prayer points, or visit details..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Send Message to Church
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="space-y-8 pt-12 border-t border-white/10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">Everything You Need to Know</h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900 border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
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
    </section>
  );
};

export default Connect;
