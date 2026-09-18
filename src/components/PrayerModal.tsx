import { useState } from 'react';
import { X, Send, HeartHandshake, CheckCircle2, Shield, Phone, Sparkles, MessageCircle } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerModal = ({ isOpen, onClose }: PrayerModalProps) => {
  const { churchInfo, addPrayerRequest } = useChurch();
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
    addPrayerRequest({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      category: formData.category,
      message: formData.message,
      isConfidential: formData.isConfidential,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={resetAndClose}
        className="fixed inset-0 bg-black/75 transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white text-slate-900 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-8 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-serif text-white">Prayer Request & Intercession</h2>
              <p className="text-xs text-amber-300 font-medium">"The effective, fervent prayer of a righteous man avails much." (James 5:16)</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close prayer modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif text-slate-950">Prayer Petition Received in Faith</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Beloved, General Overseer Rev. Nicholas Dobeng and the intercessory council have received your request. We are standing in agreement with you before the throne of grace.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto">
                <p className="font-bold">Need Immediate Urgent Prayer or Counseling?</p>
                <p className="mt-0.5">Call our pastoral line at <strong className="font-mono">{churchInfo.contact.phone}</strong></p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${churchInfo.contact.phone.replace(/[^0-9]/g, '')}?text=Shalom%20Pastor,%20I%20just%20submitted%20a%20prayer%20request%20on%20the%20RICGCW%20website`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Prayer Modal Success')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={resetAndClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sister Mercy"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+233..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Prayer Need Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setFormData({ ...formData, category: cat })}
                      className={`p-2.5 rounded-xl text-[11px] font-bold text-left transition-all border cursor-pointer ${
                        formData.category === cat
                          ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Your Prayer Request Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your petition freely. The pastoral council treats every request with absolute reverence and confidentiality."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={formData.isConfidential}
                    onChange={(e) => setFormData({ ...formData, isConfidential: e.target.checked })}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>Keep strictly confidential for pastoral council only</span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Prayer to Intercession Altar</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerModal;
