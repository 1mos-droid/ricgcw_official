import { useState, useEffect } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Send, HeartHandshake, MessageCircle } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { Modal } from './common/Modal';
import { toWhatsAppUrl, toInternationalDisplay } from '../utils/phoneUtils';
import { CATHEDRAL_EASE, SPRING_TACTILE } from './motion';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultMessage?: string;
}

export const PrayerModal = ({ isOpen, onClose, defaultCategory, defaultMessage }: PrayerModalProps) => {
  const { churchInfo, addPrayerRequest } = useChurch();
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const prefersReduced = useReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: defaultCategory || 'Healing & Deliverance',
    message: defaultMessage || '',
    isConfidential: true,
  });

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        category: defaultCategory || prev.category,
        message: defaultMessage !== undefined ? defaultMessage : prev.message,
      }));
    }
  }, [isOpen, defaultCategory, defaultMessage]);

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

    // Honeypot spam check
    if (honeypot.trim().length > 0) {
      console.warn('Spam submission detected by honeypot.');
      setSubmitted(true);
      return;
    }

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
    setHoneypot('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Prayer Request & Intercession"
      subtitle='"The effective, fervent prayer of a righteous man avails much." (James 5:16)'
      icon={<HeartHandshake className="w-6 h-6" />}
      maxWidthClass="max-w-2xl"
      closeLabel="Close prayer modal"
    >
      {submitted ? (
        <div className="text-center py-6 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-olive-500/15 text-olive-500 flex items-center justify-center mx-auto shadow-sm">
            <svg viewBox="0 0 36 36" fill="none" className="w-9 h-9" aria-hidden="true">
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
                transition={{ duration: prefersReduced ? 0.1 : 0.35, delay: 0.2, ease: CATHEDRAL_EASE }}
              />
            </svg>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-serif text-ink-primary">Prayer Petition Received in Faith</h3>
            <p className="text-body text-ink-secondary max-w-md mx-auto leading-relaxed">
              Beloved, General Overseer Rev. Nicholas Dobeng and the intercessory council have received your request. We stand in covenant agreement with you before the throne of grace.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sanctuary-parchment border border-sanctuary-stone text-caption text-ink-primary max-w-md mx-auto">
            <p className="font-bold text-gold-600">Need Immediate Urgent Prayer or Counseling?</p>
            <p className="mt-0.5 text-ink-secondary">
              Call our pastoral line at{' '}
              <strong className="font-mono tabular-nums text-ink-primary">
                {toInternationalDisplay(churchInfo.contact.phone)}
              </strong>
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={toWhatsAppUrl(
                churchInfo.contact.phone,
                'Shalom Pastor, I just submitted a prayer petition on the RICGCW website.'
              )}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Prayer Modal Success')}
              className="min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-full bg-olive-500 hover:bg-olive-600 text-white font-bold text-caption uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={resetAndClose}
              className="min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-full bg-ink-primary hover:bg-gold-600 text-white font-bold text-caption uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="hp_website_url"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-eyebrow font-bold uppercase text-ink-secondary mb-1.5">
                Your Name <span className="text-flame-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sister Mercy"
                className="w-full p-3 rounded-xl bg-white border border-sanctuary-stone text-ink-primary text-body outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
              />
            </div>

            <div>
              <label className="block text-eyebrow font-bold uppercase text-ink-secondary mb-1.5">
                Phone / WhatsApp <span className="text-flame-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+233 24 485 7403"
                className="w-full p-3 rounded-xl bg-white border border-sanctuary-stone text-ink-primary text-body font-mono tabular-nums outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-eyebrow font-bold uppercase text-ink-secondary mb-1.5">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full p-3 rounded-xl bg-white border border-sanctuary-stone text-ink-primary text-body font-mono outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            />
          </div>

          <div>
            <label className="block text-eyebrow font-bold uppercase text-ink-secondary mb-1.5">
              Prayer Need Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`min-h-[44px] p-2.5 rounded-xl text-caption font-bold text-left transition-all border cursor-pointer ${
                    formData.category === cat
                      ? 'bg-gold-600 text-sanctuary-alabaster border-gold-500 shadow-sm'
                      : 'bg-sanctuary-parchment text-ink-secondary border-sanctuary-stone hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-eyebrow font-bold uppercase text-ink-secondary mb-1.5">
              Your Prayer Request Details <span className="text-flame-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Share your petition freely. The pastoral council treats every request with absolute reverence and confidentiality."
              className="w-full p-3 rounded-xl bg-white border border-sanctuary-stone text-ink-primary text-body outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="min-h-[44px] flex items-center gap-2 cursor-pointer text-caption text-ink-secondary select-none">
              <input
                type="checkbox"
                checked={formData.isConfidential}
                onChange={(e) => setFormData({ ...formData, isConfidential: e.target.checked })}
                className="rounded border-sanctuary-stone text-gold-600 focus:ring-gold-500"
              />
              <span>Keep strictly confidential for pastoral council only</span>
            </label>
          </div>

          <div className="pt-2">
            <m.button
              type="submit"
              whileTap={prefersReduced ? undefined : { scale: 0.98 }}
              transition={SPRING_TACTILE}
              className="min-h-[48px] w-full py-3.5 px-6 rounded-full bg-ink-primary hover:bg-gold-600 text-sanctuary-alabaster font-bold text-caption uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-gold-400" />
              <span>Submit Prayer to Intercession Altar</span>
            </m.button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default PrayerModal;
