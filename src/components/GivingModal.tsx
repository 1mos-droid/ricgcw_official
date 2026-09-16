import { useState, useEffect } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, CreditCard, Smartphone, ArrowRight, Sparkles, Lock } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import {
  buildPaystackPaymentConfig,
  formatTransactionRecord,
  loadPaystackInlineScript,
  recordPaymentToFirestore,
  DEFAULT_PAYSTACK_SUBACCOUNT,
  DEFAULT_PAYSTACK_PUBLIC_KEY,
} from '../utils/paystackService';

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

  const [amount, setAmount] = useState<string>('100');
  const [currency, setCurrency] = useState<string>(churchInfo.giving.defaultCurrency || 'GHS');
  const [category, setCategory] = useState<string>(defaultCategory || givingCategories[0]);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [keyWarning, setKeyWarning] = useState(false);

  // Preload Paystack inline script when modal opens
  useEffect(() => {
    if (isOpen) {
      loadPaystackInlineScript();
      setKeyWarning(false);
    }
  }, [isOpen]);

  const presetAmounts = ['50', '100', '200', '500', '1000', '2000'];

  const handleGivingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setKeyWarning(false);
    setIsProcessing(true);
    trackEvent('conversion', 'give_paystack_intent', `${currency} ${amount} for ${category}`);

    const subaccount = churchInfo.giving.subaccount || DEFAULT_PAYSTACK_SUBACCOUNT;
    const paystackKey = churchInfo.giving.paystackPublicKey || (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) || DEFAULT_PAYSTACK_PUBLIC_KEY;

    const handleSuccessCallback = async (response: { reference: string; [key: string]: any }) => {
      const txRecord = formatTransactionRecord({
        amount: Number(amount),
        currency,
        category,
        donorName,
        donorEmail: donorEmail || 'innercourtch@gmail.com',
        donorPhone,
        reference: response.reference,
        subaccount,
      });

      await recordPaymentToFirestore(txRecord);
      setIsProcessing(false);
      setIsSuccess(true);
      trackEvent('conversion', 'give_paystack_success', response.reference);
    };

    if (!paystackKey) {
      setIsProcessing(false);
      setKeyWarning(true);
      return;
    }

    if (typeof window !== 'undefined' && (window as any).PaystackPop) {
      try {
        const config = buildPaystackPaymentConfig({
          amount: Number(amount),
          email: donorEmail || 'innercourtch@gmail.com',
          donorName: donorName || 'Anonymous Giver',
          donorPhone,
          category,
          currency,
          publicKey: paystackKey,
          subaccount,
          onSuccess: handleSuccessCallback,
          onClose: () => {
            setIsProcessing(false);
          },
        });

        const handler = (window as any).PaystackPop.setup(config);
        handler.openIframe();
        return;
      } catch (err) {
        console.error('Paystack popup trigger error:', err);
        setIsProcessing(false);
        setKeyWarning(true);
      }
    } else {
      // Script not yet loaded, try loading then opening
      const loaded = await loadPaystackInlineScript();
      if (loaded && (window as any).PaystackPop) {
        try {
          const config = buildPaystackPaymentConfig({
            amount: Number(amount),
            email: donorEmail || 'innercourtch@gmail.com',
            donorName: donorName || 'Anonymous Giver',
            donorPhone,
            category,
            currency,
            publicKey: paystackKey,
            subaccount,
            onSuccess: handleSuccessCallback,
            onClose: () => {
              setIsProcessing(false);
            },
          });

          const handler = (window as any).PaystackPop.setup(config);
          handler.openIframe();
          return;
        } catch (err) {
          console.error('Paystack popup error:', err);
          setIsProcessing(false);
        }
      }
    }

    setIsProcessing(false);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    setKeyWarning(false);
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

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white text-slate-900 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-8 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-serif text-white">Online Giving Portal</h2>
              <p className="text-xs text-amber-300 font-medium">Fast & Secure Paystack Digital Giving</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close giving modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif text-slate-950">Thank You for Sowing into the Kingdom!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your seed of <strong>{currency} {amount}</strong> towards <strong>{category}</strong> has been received with gratitude and prayer.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto">
                <p className="font-bold">Scriptural Covenant</p>
                <p className="mt-0.5 italic">
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
            <form onSubmit={handleGivingSubmit} className="space-y-5">
              {/* Category Selector */}
              <div className="space-y-2">
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
              <div className="space-y-2">
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
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
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
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email for Receipt</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Missing Paystack Public Key Notice */}
              {keyWarning && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1.5 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <span>Paystack Public Key Required</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-amber-800">
                    Subaccount <code className="font-bold font-mono bg-amber-200/60 px-1 py-0.5 rounded">{churchInfo.giving.subaccount || DEFAULT_PAYSTACK_SUBACCOUNT}</code> is configured, but your Paystack Public Key (<code className="font-mono text-[10px]">pk_live_...</code> or <code className="font-mono text-[10px]">pk_test_...</code>) must be added to your environment configuration (<code className="font-mono text-[10px]">VITE_PAYSTACK_PUBLIC_KEY</code> in <code className="font-mono text-[10px]">.env</code>) to launch live checkout.
                  </p>
                </div>
              )}

              {/* Secure Payment Trigger */}
              <div className="pt-3 space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing ? 'Connecting Secure Gateway...' : `Proceed with ${currency} ${amount || '0'} via Paystack`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Supported Payment Badges */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-600">
                  <span className="font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Paystack 256-Bit Encrypted
                  </span>
                  <span className="text-slate-500 font-medium">
                    MTN MoMo • Telecel • AT • Visa • Mastercard • Apple Pay
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default GivingModal;
