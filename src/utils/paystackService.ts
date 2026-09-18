import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const DEFAULT_PAYSTACK_SUBACCOUNT = 'ACCT_cm4xpwb0z8y7xou';
export const DEFAULT_PAYSTACK_PUBLIC_KEY = 'pk_live_69d9908ea14c21c0a62234144c12414fe8f8d1a7';
export const DEFAULT_CHURCH_EMAIL = 'innercourtch@gmail.com';

export interface PaystackPaymentOptions {
  amount: number;
  email?: string;
  donorName?: string;
  donorPhone?: string;
  category: string;
  currency?: string;
  publicKey?: string;
  subaccount?: string;
  reference?: string;
  callback?: (response: { reference: string; [key: string]: any }) => void;
  onSuccess?: (response: { reference: string; [key: string]: any }) => void;
  onClose?: () => void;
}

export interface TransactionRecordInput {
  amount: number;
  currency: string;
  category: string;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  reference: string;
  subaccount?: string;
}

export interface TransactionRecord {
  amount: number;
  currency: string;
  category: string;
  description: string;
  type: string;
  date: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  paymentReference: string;
  subaccount: string;
  isDigital: boolean;
  platform: string;
  status: 'success' | 'pending' | 'failed';
  createdAt: string;
}

/**
 * Generates a unique reference for Paystack payments
 */
export function generatePaymentReference(): string {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `RICGCW_${timestamp}_${randomStr}`;
}

/**
 * Builds the configuration object for Paystack Inline Popup
 */
export function buildPaystackPaymentConfig(options: PaystackPaymentOptions) {
  const subaccount = options.subaccount || DEFAULT_PAYSTACK_SUBACCOUNT;
  const email = options.email?.trim() || DEFAULT_CHURCH_EMAIL;
  const currency = options.currency || 'GHS';
  const amountInKoboOrPesewas = Math.round(options.amount * 100);
  const ref = options.reference || generatePaymentReference();
  const key = options.publicKey || (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) || DEFAULT_PAYSTACK_PUBLIC_KEY;

  // Paystack Inline v1 strictly tests: Object.prototype.toString.call(config.callback) === '[object Function]'
  // Async functions evaluate to '[object AsyncFunction]', which triggers "Attribute callback must be a valid function".
  // Using a plain synchronous function declaration ensures full compatibility.
  function callbackWrapper(response: any) {
    if (typeof options.callback === 'function') {
      options.callback(response);
    } else if (typeof options.onSuccess === 'function') {
      options.onSuccess(response);
    }
  }

  function closeWrapper() {
    if (typeof options.onClose === 'function') {
      options.onClose();
    }
  }

  return {
    key,
    email,
    amount: amountInKoboOrPesewas,
    currency,
    subaccount,
    ref,
    metadata: {
      custom_fields: [
        { display_name: 'Donor Name', variable_name: 'donor_name', value: options.donorName || 'Anonymous' },
        { display_name: 'Phone Number', variable_name: 'donor_phone', value: options.donorPhone || 'N/A' },
        { display_name: 'Giving Category', variable_name: 'category', value: options.category },
        { display_name: 'Subaccount', variable_name: 'subaccount', value: subaccount },
      ],
    },
    callback: callbackWrapper,
    onClose: closeWrapper,
  };
}

/**
 * Robust helper that handles both Paystack v1 and v2 Inline SDK modal popups
 */
export function openPaystackPopup(config: any): boolean {
  if (typeof window === 'undefined') return false;

  const Pop = (window as any).PaystackPop;
  if (!Pop) return false;

  function callbackHandler(response: any) {
    if (typeof config.callback === 'function') {
      config.callback(response);
    } else if (typeof config.onSuccess === 'function') {
      config.onSuccess(response);
    }
  }

  function closeHandler() {
    if (typeof config.onClose === 'function') {
      config.onClose();
    } else if (typeof config.onCancel === 'function') {
      config.onCancel();
    }
  }

  // 1. Paystack v1 standard: PaystackPop.setup(v1Config).openIframe()
  if (typeof Pop.setup === 'function') {
    try {
      const v1Config: any = {
        key: config.key || config.publicKey || DEFAULT_PAYSTACK_PUBLIC_KEY,
        email: config.email,
        amount: config.amount,
        currency: config.currency || 'GHS',
        ref: config.ref || config.reference,
        metadata: config.metadata,
        callback: callbackHandler,
        onClose: closeHandler,
      };
      if (config.subaccount) {
        v1Config.subaccount = config.subaccount;
      }
      const handler = Pop.setup(v1Config);
      if (handler && typeof handler.openIframe === 'function') {
        handler.openIframe();
        return true;
      }
    } catch (err) {
      console.warn('PaystackPop.setup failed, trying alternative pop method:', err);
    }
  }

  // 2. Paystack v2 instance: new PaystackPop().newTransaction(config)
  if (typeof Pop === 'function') {
    try {
      const instance = new Pop();
      if (instance && typeof instance.newTransaction === 'function') {
        instance.newTransaction({
          key: config.key || config.publicKey || DEFAULT_PAYSTACK_PUBLIC_KEY,
          email: config.email,
          amount: config.amount,
          currency: config.currency,
          ref: config.ref || config.reference,
          subaccount: config.subaccount,
          metadata: config.metadata,
          onSuccess: callbackHandler,
          onCancel: closeHandler,
        });
        return true;
      }
    } catch {
      // Not a constructor
    }
  }

  // 3. Paystack v2 static: PaystackPop.newTransaction(config)
  if (typeof Pop.newTransaction === 'function') {
    try {
      Pop.newTransaction({
        key: config.key || config.publicKey || DEFAULT_PAYSTACK_PUBLIC_KEY,
        email: config.email,
        amount: config.amount,
        currency: config.currency,
        ref: config.ref || config.reference,
        subaccount: config.subaccount,
        metadata: config.metadata,
        onSuccess: callbackHandler,
        onCancel: closeHandler,
      });
      return true;
    } catch (err) {
      console.warn('PaystackPop.newTransaction error:', err);
    }
  }

  return false;
}

/**
 * Formats a completed transaction for Firestore database storage in collection 'transactions'
 */
export function formatTransactionRecord(input: TransactionRecordInput): TransactionRecord {
  const now = new Date().toISOString();
  return {
    amount: input.amount,
    currency: input.currency || 'GHS',
    category: input.category,
    description: `${input.category} - Paystack Digital Giving`,
    type: 'contribution',
    date: now,
    donorName: input.donorName?.trim() || 'Anonymous Giver',
    donorEmail: input.donorEmail?.trim() || 'innercourtch@gmail.com',
    donorPhone: input.donorPhone?.trim() || '',
    paymentReference: input.reference,
    subaccount: input.subaccount || DEFAULT_PAYSTACK_SUBACCOUNT,
    isDigital: true,
    platform: 'ricgcw_official',
    status: 'success',
    createdAt: now,
  };
}

/**
 * Dynamically loads the Paystack Inline JS script if not already present
 */
export function loadPaystackInlineScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    if ((window as any).PaystackPop) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById('paystack-inline-js') as HTMLScriptElement | null;
    if (existingScript) {
      if ((window as any).PaystackPop) {
        resolve(true);
        return;
      }
      existingScript.addEventListener('load', () => resolve(Boolean((window as any).PaystackPop)));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'paystack-inline-js';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(Boolean((window as any).PaystackPop));
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

/**
 * Records a successful transaction to Firestore database
 */
export async function recordPaymentToFirestore(record: TransactionRecord): Promise<boolean> {
  try {
    if (db) {
      await addDoc(collection(db, 'transactions'), record);
      return true;
    }
  } catch (err) {
    console.warn('Firestore transaction log notice:', err);
  }
  return false;
}
