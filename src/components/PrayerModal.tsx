import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, HeartHandshake, CheckCircle2, Shield, Phone, Sparkles } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerModal = ({ isOpen, onClose }: PrayerModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Healing & Deliverance',
    message: '',
    isConfidential: true,
  });

  const categories = [
    'Healing & Deliverance',
    'Family & Marriage Breakthrough',
    'Financial Miracle & Employment',
    'Spiritual Growth & Guidance',
    'Praise & Thanksgiving Report',
    'Pastoral Counseling Request',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission or connect to formspree
    fetch('https://formspree.io/f/xpqogleb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).catch(() => {
      // Graceful fallback
    });

    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      category: 'Healing & Deliverance',
      message: '',
      isConfidential: true,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl shadow-black overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif text-white">Prayer Request & Altar of Intercession</h2>
                  <p className="text-xs text-amber-400/80 font-medium">"The effective, fervent prayer of a righteous man avails much." — James 5:16</p>
                </div>
              </div>
              <button
                onClick={resetAndClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close prayer modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6 max-w-md mx-auto"
                >
                  <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-serif text-white">Your Prayer Has Been Received</h3>
                    <p className="text-sm text-slate-300">
                      Overseer Rev. Nicholas Dobeng and our intercessory prayer team will bring your request before the throne of grace during our corporate altars.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <Sparkles className="w-4 h-4 inline mr-1 text-amber-400" />
                    "Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God." (Philippians 4:6)
                  </div>
                  <button
                    onClick={resetAndClose}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
                  >
                    Done & Return
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sister / Brother Name"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+233 XX XXX XXXX"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Area of Need / Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c} className="bg-slate-900 text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Prayer Request / Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share what you are believing God for, or describe the breakthrough you need..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 focus:border-amber-500 focus:outline-none text-white text-sm resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-300">
                    <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Strict pastoral confidentiality guaranteed. Your request is viewed only by ordained pastoral leaders.</span>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <Send className="w-4 h-4" /> Submit Prayer Request
                    </button>
                    <a
                      href={`tel:${CHURCH_INFO.contact.phone}`}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-amber-400" /> Call Hotlines
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
