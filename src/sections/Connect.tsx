import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, CheckCircle2, ChevronDown, HelpCircle, MessageCircle, Heart, Users, Clock } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { YoutubeIcon, FacebookIcon, InstagramIcon } from '../components/Icons';
import { trackEvent } from '../utils/analytics';

interface ConnectProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: () => void;
}

export const Connect = ({ onOpenPrayerModal, onOpenBranchModal }: ConnectProps) => {
  const { churchInfo, faqs, branches } = useChurch();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'First-time Visitor Inquiry',
    message: '',
  });

  const branchListText = branches.map((b) => b.name.split(' ')[0]).join(', ');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('inquiry', 'visitor_form_submitted', formData.subject);
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
    }
    setFormSubmitted(true);
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
    <section id="connect" className="relative py-24 px-4 sm:px-6 md:px-8 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Plan Your Visit
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-950 tracking-tight">
            Connect With Our Pastoral Family
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Whether you are planning your first visit, seeking spiritual counseling, or have questions, we are honored to welcome you.
          </p>
        </div>

        {/* First Time Visitor Guide ("Plan Your Visit") */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-md space-y-8">
          <div className="text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-slate-950">First-Time Guest Experience</h3>
              <p className="text-xs text-slate-600 mt-1">Everything you need to know before joining us this Sunday</p>
            </div>
            <button
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Plan Your Visit Guide');
                onOpenBranchModal?.();
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-center md:self-auto transition-all shadow-sm cursor-pointer"
            >
              <MapPin className="w-4 h-4" /> View Branch Map
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {planYourVisitSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-bold text-lg text-slate-300">{step.step}</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-950">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column: Contact Channels & Inquiry Form */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contacts & FAQs */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Cards */}
            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Main Cathedral Location</p>
                  <p className="font-bold text-sm text-slate-950">{churchInfo.contact.location}</p>
                  <button
                    onClick={onOpenBranchModal}
                    className="text-xs text-amber-700 font-bold hover:underline mt-0.5 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All {branches.length} Branch Addresses</span>
                    <ChevronDown className="w-3 h-3 -rotate-90" />
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Official Helpline &amp; WhatsApp</p>
                  <a
                    href={`https://wa.me/${churchInfo.contact.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Connect Section')}
                    className="font-bold font-mono text-sm text-emerald-700 hover:underline block"
                  >
                    {churchInfo.contact.phone}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Available for emergency prayer &amp; inquiries</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Official Email</p>
                  <a
                    href={`mailto:${churchInfo.contact.email}`}
                    className="font-bold font-mono text-sm text-slate-950 hover:text-amber-700"
                  >
                    {churchInfo.contact.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">For administrative letters &amp; bookings</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-lg text-slate-950 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Frequently Asked Questions
              </h4>

              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={faq.id || idx}
                      className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 text-left font-bold text-xs text-slate-900 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 mt-2">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-md space-y-6">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 border border-amber-500/30">
                  Online Inquiry &amp; Counseling
                </span>
                <h3 className="text-2xl font-bold font-serif text-slate-950">Send a Direct Message to Pastors</h3>
                <p className="text-xs text-slate-600">
                  Fill out the form below and our secretariat will get back to you promptly.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold font-serif text-emerald-900">Message Received in Faith</h4>
                  <p className="text-xs text-emerald-800">
                    Thank you for reaching out. A pastoral representative will contact you shortly. God bless you!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Mensah"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+233..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Subject / Purpose</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-amber-500"
                    >
                      <option>First-time Visitor Inquiry</option>
                      <option>Pastoral Counseling Booking</option>
                      <option>Water Baptism & Membership Class</option>
                      <option>Wedding & Child Dedication</option>
                      <option>General Administration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Your Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How may we serve or pray with you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Pastoral Office</span>
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
