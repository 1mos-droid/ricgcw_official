import { useState, useEffect } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Send, HeartHandshake, MessageCircle } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { Modal } from './common/Modal';
import { toWhatsAppUrl, toInternationalDisplay } from '../utils/phoneUtils';
import { CATHEDRAL_EASE } from './motion';

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
      icon={<HeartHandshake className="w-5 h-5" />}
      maxWidthClass="max-w-2xl"
      closeLabel="Close prayer modal"
    >
      {submitted ? (
        <div className="text-center py-6 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-olive-500/15 text-olive-600 flex items-center justify-center mx-auto">
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
            <h3 className="text-2xl font-bold text-public-ink">Prayer Petition Received in Faith</h3>
            <p className="text-base text-public-ink-muted max-w-md mx-auto leading-relaxed">
              Beloved, General Overseer {churchInfo.founder.name} and our pastoral council have received your request. We stand with you in prayer.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-public-canvas border border-public-border text-sm text-public-ink max-w-md mx-auto">
            <p className="font-bold text-public-accent">Need Immediate Urgent Prayer or Counseling?</p>
            <p className="mt-0.5 text-public-ink-muted">
              Call our pastoral line at{' '}
              <strong className="tabular-nums text-public-ink">
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
              rel="noopener noreferrer"
              onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Prayer Modal Success')}
              className="min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-lg bg-olive-500 hover:bg-olive-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={resetAndClose}
              className="min-h-[44px] w-full sm:w-auto px-6 py-3 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-sm transition-colors cursor-pointer"
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
              <label htmlFor="prayer-name" className="block text-xs font-semibold uppercase tracking-[0.08em] text-public-ink mb-1.5">
                Your Name <span className="text-public-accent">*</span>
              </label>
              <input
                id="prayer-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sister Mercy"
                className="w-full p-3 rounded-lg bg-public-surface border border-public-border text-public-ink text-base outline-none focus:border-public-ink"
              />
            </div>

            <div>
              <label htmlFor="prayer-phone" className="block text-xs font-semibold uppercase tracking-[0.08em] text-public-ink mb-1.5">
                Phone / WhatsApp <span className="text-public-accent">*</span>
              </label>
              <input
                id="prayer-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+233 24 485 7403"
                className="w-full p-3 rounded-lg bg-public-surface border border-public-border text-public-ink text-base tabular-nums outline-none focus:border-public-ink"
              />
            </div>
          </div>

          <div>
            <label htmlFor="prayer-email" className="block text-xs font-semibold uppercase tracking-[0.08em] text-public-ink mb-1.5">
              Email Address (Optional)
            </label>
            <input
              id="prayer-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full p-3 rounded-lg bg-public-surface border border-public-border text-public-ink text-base outline-none focus:border-public-ink"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-public-ink mb-1.5">
              Prayer Need Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`min-h-[44px] p-2.5 rounded-lg text-xs font-semibold text-left transition-colors border cursor-pointer ${
                    formData.category === cat
                      ? 'bg-public-ink text-white border-public-ink'
                      : 'bg-public-canvas text-public-ink-muted border-public-border hover:border-public-ink hover:text-public-ink'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="prayer-message" className="block text-xs font-semibold uppercase tracking-[0.08em] text-public-ink mb-1.5">
              Your Prayer Request Details <span className="text-public-accent">*</span>
            </label>
            <textarea
              id="prayer-message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Share your petition freely. Our pastoral council treats every request in confidence."
              className="w-full p-3 rounded-lg bg-public-surface border border-public-border text-public-ink text-base outline-none focus:border-public-ink"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="min-h-[44px] flex items-center gap-2 cursor-pointer text-sm text-public-ink-muted select-none">
              <input
                type="checkbox"
                checked={formData.isConfidential}
                onChange={(e) => setFormData({ ...formData, isConfidential: e.target.checked })}
                className="rounded border-public-border text-public-accent focus:ring-public-accent"
              />
              <span>Keep strictly confidential for pastoral council only</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="min-h-[48px] w-full py-3.5 px-6 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Prayer Request</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default PrayerModal;
