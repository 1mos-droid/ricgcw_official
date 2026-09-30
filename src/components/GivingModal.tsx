import { useState, useEffect } from 'react';
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
import { toWhatsAppUrl, toLocalMoMoDisplay } from '../utils/phoneUtils';

interface GivingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export const GivingModal = ({ isOpen, onClose, defaultCategory }: GivingModalProps) => {
  const { churchInfo } = useChurch();
  const givingCategories = churchInfo.giving.categories || [
    'Tithe',
    'Offering',
    '2026 Theme Covenant Seed',
    'Sanctuary Building & Expansion',
    'Missions & Rural Outreach',
    'Community Welfare Support',
  ];

  const [givingMethod, setGivingMethod] = useState<'paystack' | 'momo'>('paystack');
  const [amount, setAmount] = useState<string>('100');
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

  // Preload Paystack inline script when modal opens
  useEffect(() => {
    if (isOpen) {
      loadPaystackInlineScript();
      setGatewayError(null);
    }
  }, [isOpen]);

  const presetAmounts = ['50', '100', '200', '500', '1000', '2000'];

  const handleCopyMomo = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMomo(true);
    setTimeout(() => setCopiedMomo(false), 2500);
  };

  const handleGivingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return; // Prevent double-submit

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setGatewayError('Please enter a valid donation amount.');
      return;
    }

    setGatewayError(null);
    setIsProcessing(true);
    trackEvent('conversion', 'give_paystack_intent', `${currency} ${amount} for ${category}`);

    const subaccount = churchInfo.giving.subaccount || DEFAULT_PAYSTACK_SUBACCOUNT;
    const paystackKey = churchInfo.giving.paystackPublicKey || (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) || DEFAULT_PAYSTACK_PUBLIC_KEY;

    const handleSuccessCallback = async (response: { reference: string; [key: string]: any }) => {
      const ref = response.reference || response.trxref;

      try {
        // Server-Side Verification: Never trust client callback alone for money
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
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
              Verified Kingdom Seed
            </span>
            <h3 className="text-2xl font-bold font-serif text-slate-950">Thank You for Sowing into the Altar!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your gift of <strong>{currency} {amount}</strong> towards <strong>{category}</strong> has been verified and received with honor and prayer.
            </p>
            {confirmedRef && (
              <p className="text-xs font-mono text-slate-500 pt-1">
                Reference: <strong className="text-slate-800">{confirmedRef}</strong>
              </p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto text-left">
            <p className="font-bold">Scriptural Covenant</p>
            <p className="mt-0.5 italic text-slate-700">
              "Now may He who supplies seed to the sower, and bread for food, supply and multiply the seed you have sown and increase the fruits of your righteousness." (2 Corinthians 9:10)
            </p>
          </div>

          <button
            onClick={resetAndClose}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Return to Sanctuary
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Method Selector: Paystack vs Direct MoMo */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              type="button"
              onClick={() => setGivingMethod('paystack')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                givingMethod === 'paystack'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Online Checkout (Paystack)
            </button>
            <button
              type="button"
              onClick={() => setGivingMethod('momo')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                givingMethod === 'momo'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Direct MoMo (Ghana)
            </button>
          </div>

          {givingMethod === 'momo' ? (
            /* Direct MoMo Transfer Card */
            <div className="space-y-4 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-300 text-slate-900 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <h4 className="font-bold text-sm text-slate-950">Official MTN Mobile Money Altar</h4>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-200/80 text-amber-900">
                    Instant Transfer
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">MoMo Number</p>
                      <p className="text-lg font-bold font-mono text-slate-950">
                        {toLocalMoMoDisplay(churchInfo.contact.phone)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyMomo('0244485740')}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer active:scale-95"
                    >
                      {copiedMomo ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMomo ? 'Copied!' : 'Copy Number'}</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Account Name</p>
                      <p className="font-semibold text-slate-900">{churchInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Reference</p>
                      <p className="font-semibold text-slate-900">Tithe / Offering / Seed</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
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
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Select Giving Fund</label>
                <div className="flex flex-wrap gap-2">
                  {givingCategories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        category === cat
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection & Currency */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Giving Amount</label>
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    {['GHS', 'USD', 'GBP', 'EUR'].map((curr) => (
                      <button
                        type="button"
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold font-mono transition-all cursor-pointer ${
                          currency === curr ? 'bg-amber-500 text-slate-950' : 'text-slate-600 hover:text-slate-900'
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
                      className={`py-2 rounded-xl font-bold font-mono text-xs border transition-all cursor-pointer ${
                        amount === preset
                          ? 'bg-amber-500/20 border-amber-500 text-amber-900 font-black'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {currency} {preset}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative pt-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold font-mono text-slate-500 text-sm">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min="1"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="w-full pl-16 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold font-mono text-base outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Donor Contact Details */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Kwesi Mensah"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Phone (MoMo / WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="+233..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email for Receipt (Optional)</label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Error notice if popup fails */}
              {gatewayError && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Payment Gateway Notice</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-amber-900">
                    {gatewayError}
                  </p>
                  <button
                    type="button"
                    onClick={() => setGivingMethod('momo')}
                    className="text-xs font-bold text-amber-800 underline cursor-pointer"
                  >
                    Switch to Direct Mobile Money →
                  </button>
                </div>
              )}

              {/* Secure Payment Trigger */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing ? 'Verifying Transaction with Altar...' : `Proceed with ${currency} ${amount || '0'} via Paystack`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Supported Payment Badges */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-600">
                  <span className="font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit Encrypted &amp; Verified
                  </span>
                  <span className="text-slate-500 font-medium">
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
