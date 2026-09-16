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

  return {
    key: options.publicKey || (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string) || DEFAULT_PAYSTACK_PUBLIC_KEY,
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
    callback: options.onSuccess,
    onClose: options.onClose,
  };
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

    const existingScript = document.getElementById('paystack-inline-js');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'paystack-inline-js';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
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
