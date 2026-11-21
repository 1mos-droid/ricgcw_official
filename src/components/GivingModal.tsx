import { useState, useEffect } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { Heart, ShieldCheck, CheckCircle2, Lock, ArrowRight, Copy, Check, AlertCircle, Smartphone } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import {
  buildPaystackPaymentConfig,
  formatTransactionRecord,
  loadPaystackInlineScript,
  openPaystackPopup,
  recordPaymentToFirestore,
  verifyPaymentWithServer,
  DEFAULT_PAYSTACK_SUBACCOUNT,
  DEFAULT_PAYSTACK_PUBLIC_KEY,
} from '../utils/paystackService';
import { Modal } from './common/Modal';
import { toWhatsAppUrl, toLocalMoMoDisplay, toLocalDigits } from '../utils/phoneUtils';
import { SPRING_TACTILE } from './motion';

interface GivingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultAmount?: string;
}

export const GivingModal = ({ isOpen, onClose, defaultCategory, defaultAmount }: GivingModalProps) => {
  const { churchInfo } = useChurch();
  const prefersReduced = useReducedMotion();
  const givingCategories = churchInfo.giving.categories || [
    'Tithe',
    'Offering',
    '2026 Theme Covenant Seed',
    'Sanctuary Building & Expansion',
    'Missions & Rural Outreach',
    'Community Welfare Support',
  ];

  const [givingMethod, setGivingMethod] = useState<'paystack' | 'momo'>('paystack');
  const [amount, setAmount] = useState<string>(defaultAmount || '100');
  const [currency, setCurrency] = useState<string>(churchInfo.giving.defaultCurrency || 'GHS');
  const [category, setCategory] = useState<string>(defaultCategory || givingCategories[0]);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedRef, setConfirmedRef] = useState<string>('');
  const [gatewayError, setGatewayError] = useState<string | null>(null);
  const [copiedMomo, setCopiedMomo] = useState(false);

  // Sync defaults & preload Paystack inline script when modal opens
  useEffect(() => {
    if (isOpen) {
      loadPaystackInlineScript();
      setGatewayError(null);
      if (defaultCategory) setCategory(defaultCategory);
      if (defaultAmount) setAmount(defaultAmount);
    }
  }, [isOpen, defaultCategory, defaultAmount]);

  const presetAmounts = ['50', '100', '200', '500', '1000', '2000'];

  const handleCopyMomo = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMomo(true);
    setTimeout(() => setCopiedMomo(false), 2500);
  };

  const handleGivingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setGatewayError('Please enter a valid donation amount.');
      return;
    }

    setGatewayError(null);
    setIsProcessing(true);
    trackEvent('conversion', 'give_paystack_intent', `${currency} ${amount} for ${category}`);

    const subaccount = churchInfo.giving.subaccount || DEFAULT_PAYSTACK_SUBACCOUNT;
    const paystackKey =
      churchInfo.giving.paystackPublicKey ||
      (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) ||
      DEFAULT_PAYSTACK_PUBLIC_KEY;

    const handleSuccessCallback = async (response: { reference: string; [key: string]: any }) => {
      const ref = response.reference || response.trxref;

      try {
        const verification = await verifyPaymentWithServer(ref, numericAmount, currency);

        if (!verification.verified) {
          setIsProcessing(false);
          setGatewayError(
            verification.message ||
              'Payment could not be verified by church security. Please keep your transaction reference and contact Treasury.'
          );
          return;
        }

        const txRecord = formatTransactionRecord({
          amount: numericAmount,
          currency,
          category,
          donorName,
          donorEmail: donorEmail || undefined,
          donorPhone,
          reference: ref,
          subaccount,
        });

        await recordPaymentToFirestore(txRecord);
        setConfirmedRef(ref);
        setIsProcessing(false);
        setIsSuccess(true);
        trackEvent('conversion', 'give_paystack_success', ref);
      } catch (err: any) {
        console.error('Payment verification processing error:', err);
        setIsProcessing(false);
        setGatewayError('Payment completed with provider, but confirmation receipt is delayed. Reference: ' + ref);
      }
    };

    try {
      let hasPaystack = typeof window !== 'undefined' && Boolean((window as any).PaystackPop);
      if (!hasPaystack) {
        hasPaystack = await loadPaystackInlineScript();
      }

      const config = buildPaystackPaymentConfig({
        amount: numericAmount,
        email: donorEmail || undefined,
        donorName: donorName || 'Anonymous Giver',
        donorPhone,
        category,
        currency,
        publicKey: paystackKey,
        subaccount,
        callback: handleSuccessCallback,
        onSuccess: handleSuccessCallback,
        onClose: () => {
          setIsProcessing(false);
        },
      });

      const opened = openPaystackPopup(config);
      if (!opened) {
        setIsProcessing(false);
        setGatewayError('Could not open secure payment window. You may give directly via Mobile Money below.');
      }
    } catch (err) {
      console.error('Paystack popup trigger error:', err);
      setIsProcessing(false);
      setGatewayError('Payment gateway temporarily unavailable. You can use direct Mobile Money transfer.');
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    setGatewayError(null);
    setConfirmedRef('');
    onClose();
  };

  const momoCopyDigits = toLocalDigits(churchInfo.contact.phone);

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetAndClose}
      title="Online Giving Portal"
      subtitle="Fast & Secure Paystack Digital Giving & Mobile Money"
      icon={<Heart className="w-6 h-6" />}
      maxWidthClass="max-w-xl"
      closeLabel="Close giving modal"
    >
      {isSuccess ? (
        <div className="text-center py-6 space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-olive-500/15 text-olive-500 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-eyebrow font-bold uppercase tracking-wider bg-olive-500/15 text-olive-500 border border-olive-500/30">
              Verified Kingdom Seed
            </span>
            <h3 className="text-2xl font-bold font-serif text-ink-primary">Thank You for Sowing into the Altar!</h3>
            <p className="text-body text-ink-secondary max-w-md mx-auto leading-relaxed">
              Your gift of <strong>{currency} {amount}</strong> towards <strong>{category}</strong> has been verified and received with honor and prayer.
            </p>
            {confirmedRef && (
              <p className="text-caption font-mono text-ink-muted pt-1">
                Reference: <strong className="text-ink-primary">{confirmedRef}</strong>
              </p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-sanctuary-parchment border border-sanctuary-stone text-caption text-ink-primary max-w-md mx-auto text-left">
            <p className="font-bold text-gold-600">Scriptural Covenant</p>
            <p className="mt-0.5 italic text-ink-secondary">
              &ldquo;Now may He who supplies seed to the sower, and bread for food, supply and multiply the seed you have sown and increase the fruits of your righteousness.&rdquo; (2 Corinthians 9:10)
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="min-h-[44px] w-full sm:w-auto px-8 py-3 rounded-full bg-ink-primary hover:bg-gold-600 text-sanctuary-alabaster font-bold text-caption uppercase tracking-wider transition-colors cursor-pointer"
          >
            Return to Sanctuary
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Method Selector: Paystack vs Direct MoMo */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-sanctuary-parchment border border-sanctuary-stone">
            <button
              type="button"
              onClick={() => setGivingMethod('paystack')}
              className={`min-h-[44px] py-2 px-3 rounded-xl text-caption font-bold transition-all cursor-pointer ${
                givingMethod === 'paystack'
                  ? 'bg-white text-ink-primary shadow-sm'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              Online Checkout (Paystack)
            </button>
            <button
              type="button"
              onClick={() => setGivingMethod('momo')}
              className={`min-h-[44px] py-2 px-3 rounded-xl text-caption font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                givingMethod === 'momo'
                  ? 'bg-gold-600 text-sanctuary-alabaster shadow-sm'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              <Smartphone className="w-4 h-4" /> Direct MoMo (Ghana)
            </button>
          </div>

          {givingMethod === 'momo' ? (
            /* Direct MoMo Transfer Card */
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-sanctuary-parchment border border-sanctuary-stone text-ink-primary space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gold-600" />
                    <h4 className="font-bold text-body text-ink-primary">Official MTN Mobile Money Altar</h4>
                  </div>
                  <span className="text-eyebrow font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-700 border border-gold-500/25">
                    Instant Transfer
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-sanctuary-stone space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-eyebrow font-bold uppercase tracking-wider text-ink-muted">MoMo Number</p>
                      <p className="text-lg font-bold font-mono tabular-nums text-ink-primary">
                        {toLocalMoMoDisplay(churchInfo.contact.phone)}
                      </p>
                    </div>
                    <m.button
                      type="button"
                      whileTap={prefersReduced ? undefined : { scale: 0.94 }}
                      transition={SPRING_TACTILE}
                      onClick={() => handleCopyMomo(momoCopyDigits)}
                      className="min-h-[44px] px-4 py-2 rounded-full bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster font-bold text-caption flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedMomo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedMomo ? 'Copied!' : 'Copy Number'}</span>
                    </m.button>
                  </div>

                  <div className="border-t border-sanctuary-stone pt-2.5 grid grid-cols-2 gap-2 text-caption">
                    <div>
                      <p className="text-eyebrow text-ink-muted font-bold uppercase">Account Name</p>
                      <p className="font-semibold text-ink-primary">{churchInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-eyebrow text-ink-muted font-bold uppercase">Reference</p>
                      <p className="font-semibold text-ink-primary">Tithe / Offering / Seed</p>
                    </div>
                  </div>
                </div>

                <p className="text-caption text-ink-secondary leading-relaxed">
                  After sending your seed via MTN MoMo, send a receipt or transaction ID to our Church Treasury WhatsApp so our pastors can agree with you in prayer:
                </p>

                <a
                  href={toWhatsAppUrl(
                    churchInfo.contact.phone,
                    'Shalom Church Treasury, I have just transferred a kingdom seed via MTN Mobile Money.'
                  )}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Giving Modal MoMo')}
                  className="min-h-[44px] w-full py-3 px-4 rounded-full bg-olive-500 hover:bg-olive-600 text-white font-bold text-caption uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Confirm MoMo Gift on WhatsApp →</span>
                </a>
              </div>
            </div>
          ) : (
            /* Paystack Digital Checkout Form */
            <form onSubmit={handleGivingSubmit} className="space-y-4">
              {/* Category Selector */}
              <div className="space-y-1.5">
                <label className="text-eyebrow font-bold uppercase tracking-wider text-ink-secondary">
                  Select Giving Fund
                </label>
                <div className="flex flex-wrap gap-2">
                  {givingCategories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-caption font-semibold transition-all cursor-pointer border ${
                        category === cat
                          ? 'bg-gold-600 text-sanctuary-alabaster border-gold-500 shadow-sm'
                          : 'bg-sanctuary-parchment hover:bg-sanctuary-stone text-ink-secondary border-sanctuary-stone'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection & Currency */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-eyebrow font-bold uppercase tracking-wider text-ink-secondary">
                    Giving Amount
                  </label>
                  <div className="flex items-center gap-1 bg-sanctuary-parchment p-1 rounded-xl border border-sanctuary-stone">
                    {['GHS', 'USD', 'GBP', 'EUR'].map((curr) => (
                      <button
                        type="button"
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`min-h-[34px] px-2.5 py-0.5 rounded-lg text-eyebrow font-bold font-mono transition-all cursor-pointer ${
                          currency === curr ? 'bg-gold-600 text-sanctuary-alabaster' : 'text-ink-secondary hover:text-ink-primary'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset Amount Badges */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {presetAmounts.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className={`min-h-[42px] py-2 rounded-xl font-bold font-mono tabular-nums text-caption border transition-all cursor-pointer ${
                        amount === preset
                          ? 'bg-gold-500/15 border-gold-500 text-gold-700 font-black'
                          : 'bg-sanctuary-parchment/70 border-sanctuary-stone text-ink-secondary hover:bg-white'
                      }`}
                    >
                      {currency} {preset}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative pt-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold font-mono text-ink-muted text-sm">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min="1"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full pl-16 pr-4 py-3 rounded-xl bg-white border border-sanctuary-stone text-ink-primary font-bold font-mono tabular-nums text-base outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* Donor Contact Details */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-eyebrow font-bold uppercase text-ink-secondary mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Kwesi Mensah"
                    className="w-full p-2.5 rounded-xl bg-white border border-sanctuary-stone text-ink-primary text-body outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>

                <div>
                  <label className="block text-eyebrow font-bold uppercase text-ink-secondary mb-1">
                    Phone (MoMo / WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="+233 24 485 7403"
                    className="w-full p-2.5 rounded-xl bg-white border border-sanctuary-stone text-ink-primary text-body font-mono tabular-nums outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-eyebrow font-bold uppercase text-ink-secondary mb-1">
                    Email for Receipt (Optional)
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-xl bg-white border border-sanctuary-stone text-ink-primary text-body font-mono outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              {/* Error notice if popup fails */}
              {gatewayError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-2xl bg-flame-500/10 border border-flame-500/30 text-ink-primary text-caption space-y-2"
                >
                  <div className="flex items-center gap-2 font-bold text-flame-500">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Payment Gateway Notice</span>
                  </div>
                  <p className="leading-relaxed text-caption text-ink-secondary">{gatewayError}</p>
                  <button
                    type="button"
                    onClick={() => setGivingMethod('momo')}
                    className="text-caption font-bold text-gold-600 underline cursor-pointer"
                  >
                    Switch to Direct Mobile Money →
                  </button>
                </div>
              )}

              {/* Secure Payment Trigger */}
              <div className="pt-2 space-y-3">
                <m.button
                  type="submit"
                  disabled={isProcessing}
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  transition={SPRING_TACTILE}
                  className="min-h-[48px] w-full py-4 px-6 rounded-full bg-ink-primary hover:bg-gold-600 text-sanctuary-alabaster font-bold text-caption sm:text-sm uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4 text-gold-400" />
                  <span>
                    {isProcessing
                      ? 'Verifying Transaction with Altar...'
                      : `Proceed with ${currency} ${amount || '0'} via Paystack`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </m.button>

                {/* Supported Payment Badges */}
                <div className="p-3 rounded-xl bg-sanctuary-parchment border border-sanctuary-stone flex flex-wrap items-center justify-between gap-2 text-caption text-ink-secondary">
                  <span className="font-bold flex items-center gap-1 text-ink-primary">
                    <ShieldCheck className="w-4 h-4 text-olive-500" /> 256-Bit Encrypted &amp; Verified
                  </span>
                  <span className="text-ink-muted font-medium">
                    MTN MoMo • Telecel • AT • Visa • Mastercard
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </Modal>
  );
};

export default GivingModal;
