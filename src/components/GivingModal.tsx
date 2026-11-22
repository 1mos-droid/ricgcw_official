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

  const handleCopyMomo = async (text: string) => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(text);
      setCopiedMomo(true);
      setTimeout(() => setCopiedMomo(false), 2500);
    } catch {
      setCopiedMomo(false);
    }
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
          <div className="w-16 h-16 rounded-2xl bg-olive-500/15 text-olive-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-md text-xs font-semibold bg-olive-500/15 text-olive-600">
              Verified Kingdom Seed
            </span>
            <h3 className="text-2xl font-bold text-public-ink">Thank You for Sowing into the Altar!</h3>
            <p className="text-base text-public-ink-muted max-w-md mx-auto leading-relaxed">
              Your gift of <strong>{currency} {amount}</strong> towards <strong>{category}</strong> has been verified and received with honor and prayer.
            </p>
            {confirmedRef && (
              <p className="text-sm text-public-ink-muted pt-1">
                Reference: <strong className="text-public-ink">{confirmedRef}</strong>
              </p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-public-canvas border border-public-border text-sm text-public-ink max-w-md mx-auto text-left">
            <p className="font-bold text-public-accent">Scriptural Covenant</p>
            <p className="mt-0.5 text-public-ink-muted">
              &ldquo;Now may He who supplies seed to the sower, and bread for food, supply and multiply the seed you have sown and increase the fruits of your righteousness.&rdquo; (2 Corinthians 9:10)
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="min-h-[44px] w-full sm:w-auto px-8 py-3 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-sm transition-colors cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Method Selector: Paystack vs Direct MoMo */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-public-canvas border border-public-border">
            <button
              type="button"
              onClick={() => setGivingMethod('paystack')}
              className={`min-h-[44px] py-2 px-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                givingMethod === 'paystack'
                  ? 'bg-public-surface text-public-ink shadow-xs border border-public-border'
                  : 'text-public-ink-muted hover:text-public-ink'
              }`}
            >
              Online Checkout (Paystack)
            </button>
            <button
              type="button"
              onClick={() => setGivingMethod('momo')}
              className={`min-h-[44px] py-2 px-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                givingMethod === 'momo'
                  ? 'bg-public-ink text-white shadow-xs'
                  : 'text-public-ink-muted hover:text-public-ink'
              }`}
            >
              <Smartphone className="w-4 h-4" /> Direct MoMo (Ghana)
            </button>
          </div>

          {givingMethod === 'momo' ? (
            /* Direct MoMo Transfer Card */
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-public-canvas border border-public-border text-public-ink space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-public-accent" />
                    <h4 className="font-bold text-base text-public-ink">Official MTN Mobile Money</h4>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-public-surface text-public-accent border border-public-border">
                    Instant Transfer
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-public-surface border border-public-border space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-public-ink-muted">
                        MoMo Number
                      </p>
                      <p className="text-lg font-bold tabular-nums text-public-ink">
                        {toLocalMoMoDisplay(churchInfo.contact.phone)}
                      </p>
                    </div>
                    <m.button
                      type="button"
                      whileTap={prefersReduced ? undefined : { scale: 0.96 }}
                      transition={SPRING_TACTILE}
                      onClick={() => handleCopyMomo(momoCopyDigits)}
                      className="min-h-[44px] px-4 py-2 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedMomo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedMomo ? 'Copied!' : 'Copy Number'}</span>
                    </m.button>
                  </div>

                  <div className="border-t border-public-border pt-2.5 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-public-ink-muted font-semibold uppercase">Account Name</p>
                      <p className="font-semibold text-public-ink">{churchInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-public-ink-muted font-semibold uppercase">Reference</p>
                      <p className="font-semibold text-public-ink">Tithe / Offering / Seed</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-public-ink-muted leading-relaxed">
                  After sending your gift via MTN MoMo, send a receipt or transaction ID to our Church Treasury WhatsApp so our pastors can agree with you in prayer:
                </p>

                <a
                  href={toWhatsAppUrl(
                    churchInfo.contact.phone,
                    'Shalom Church Treasury, I have just transferred a kingdom seed via MTN Mobile Money.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Giving Modal MoMo')}
                  className="min-h-[44px] w-full py-3 px-4 rounded-lg bg-olive-500 hover:bg-olive-600 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-public-ink">
                  Select Giving Fund
                </label>
                <div className="flex flex-wrap gap-2">
                  {givingCategories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer border ${
                        category === cat
                          ? 'bg-public-ink text-white border-public-ink'
                          : 'bg-public-canvas hover:border-public-ink text-public-ink-muted hover:text-public-ink border-public-border'
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
                  <label htmlFor="giving-amount" className="text-xs font-semibold uppercase tracking-[0.08em] text-public-ink">
                    Giving Amount
                  </label>
                  <div className="flex items-center gap-1 bg-public-canvas p-1 rounded-lg border border-public-border">
                    {['GHS', 'USD', 'GBP', 'EUR'].map((curr) => (
                      <button
                        type="button"
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`min-h-[34px] px-2.5 py-0.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                          currency === curr ? 'bg-public-ink text-white' : 'text-public-ink-muted hover:text-public-ink'
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
                      className={`min-h-[42px] py-2 rounded-lg font-bold tabular-nums text-xs border transition-colors cursor-pointer ${
                        amount === preset
                          ? 'bg-public-ink border-public-ink text-white'
                          : 'bg-public-canvas border-public-border text-public-ink hover:border-public-ink'
                      }`}
                    >
                      {currency} {preset}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative pt-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-public-ink-muted text-sm">
                    {currency}
                  </span>
                  <input
                    id="giving-amount"
                    type="number"
                    min="1"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full pl-16 pr-4 py-3 rounded-lg bg-public-surface border border-public-border text-public-ink font-bold tabular-nums text-base outline-none focus:border-public-ink"
                  />
                </div>
              </div>

              {/* Donor Contact Details */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label htmlFor="giving-name" className="block text-xs font-semibold uppercase tracking-[0.08em] text-public-ink mb-1">
                    Full Name
                  </label>
                  <input
                    id="giving-name"
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Kwesi Mensah"
                    className="w-full p-2.5 rounded-lg bg-public-surface border border-public-border text-public-ink text-base outline-none focus:border-public-ink"
                  />
                </div>

                <div>
                  <label htmlFor="giving-phone" className="block text-xs font-semibold uppercase tracking-[0.08em] text-public-ink mb-1">
                    Phone (MoMo / WhatsApp)
                  </label>
                  <input
                    id="giving-phone"
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="+233 24 485 7403"
                    className="w-full p-2.5 rounded-lg bg-public-surface border border-public-border text-public-ink text-base tabular-nums outline-none focus:border-public-ink"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="giving-email" className="block text-xs font-semibold uppercase tracking-[0.08em] text-public-ink mb-1">
                    Email for Receipt (Optional)
                  </label>
                  <input
                    id="giving-email"
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-lg bg-public-surface border border-public-border text-public-ink text-base outline-none focus:border-public-ink"
                  />
                </div>
              </div>

              {/* Error notice if popup fails */}
              {gatewayError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-crimson-500/10 border border-crimson-500/30 text-public-ink text-sm space-y-2"
                >
                  <div className="flex items-center gap-2 font-bold text-crimson-500">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Payment Gateway Notice</span>
                  </div>
                  <p className="leading-relaxed text-sm text-public-ink-muted">{gatewayError}</p>
                  <button
                    type="button"
                    onClick={() => setGivingMethod('momo')}
                    className="text-sm font-semibold text-public-accent underline cursor-pointer"
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
                  className="min-h-[48px] w-full py-3.5 px-6 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing
                      ? 'Verifying Transaction...'
                      : `Proceed with ${currency} ${amount || '0'} via Paystack`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </m.button>

                {/* Supported Payment Badges */}
                <div className="p-3 rounded-lg bg-public-canvas border border-public-border flex flex-wrap items-center justify-between gap-2 text-xs text-public-ink-muted">
                  <span className="font-semibold flex items-center gap-1 text-public-ink">
                    <ShieldCheck className="w-4 h-4 text-olive-500" /> 256-Bit Encrypted &amp; Verified
                  </span>
                  <span>
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
