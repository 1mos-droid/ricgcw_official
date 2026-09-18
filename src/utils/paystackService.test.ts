import { describe, it, expect, vi } from 'vitest';
import {
  DEFAULT_PAYSTACK_SUBACCOUNT,
  buildPaystackPaymentConfig,
  generatePaymentReference,
  formatTransactionRecord,
  openPaystackPopup,
} from './paystackService';

describe('paystackService (TDD)', () => {
  it('uses the church subaccount ACCT_cm4xpwb0z8y7xou by default', () => {
    expect(DEFAULT_PAYSTACK_SUBACCOUNT).toBe('ACCT_cm4xpwb0z8y7xou');
  });

  describe('generatePaymentReference', () => {
    it('generates a unique reference starting with RICGCW_', () => {
      const ref1 = generatePaymentReference();
      const ref2 = generatePaymentReference();

      expect(ref1).toMatch(/^RICGCW_\d+_[A-Z0-9]+$/);
      expect(ref2).toMatch(/^RICGCW_\d+_[A-Z0-9]+$/);
      expect(ref1).not.toBe(ref2);
    });
  });

  describe('buildPaystackPaymentConfig', () => {
    it('builds a valid Paystack Inline popup configuration with subaccount and pesewas amount', () => {
      const config = buildPaystackPaymentConfig({
        amount: 250,
        email: 'member@gmail.com',
        donorName: 'Sister Grace',
        donorPhone: '+233244123456',
        category: 'Tithe',
        currency: 'GHS',
        publicKey: 'pk_test_sample123',
      });

      expect(config.key).toBe('pk_test_sample123');
      expect(config.email).toBe('member@gmail.com');
      expect(config.amount).toBe(25000); // 250 * 100
      expect(config.currency).toBe('GHS');
      expect(config.subaccount).toBe('ACCT_cm4xpwb0z8y7xou');
      expect(config.ref).toMatch(/^RICGCW_/);
      expect(config.metadata.custom_fields).toEqual(
        expect.arrayContaining([
          { display_name: 'Donor Name', variable_name: 'donor_name', value: 'Sister Grace' },
          { display_name: 'Phone Number', variable_name: 'donor_phone', value: '+233244123456' },
          { display_name: 'Giving Category', variable_name: 'category', value: 'Tithe' },
          { display_name: 'Subaccount', variable_name: 'subaccount', value: 'ACCT_cm4xpwb0z8y7xou' },
        ])
      );
    });

    it('allows overriding subaccount if configured in admin', () => {
      const config = buildPaystackPaymentConfig({
        amount: 100,
        email: 'test@ricgcw.org',
        donorName: 'Test Donor',
        donorPhone: '0240000000',
        category: 'Missions',
        currency: 'GHS',
        publicKey: 'pk_test_123',
        subaccount: 'ACCT_custom_override_889',
      });

      expect(config.subaccount).toBe('ACCT_custom_override_889');
    });

    it('falls back to default church email when email is not provided', () => {
      const config = buildPaystackPaymentConfig({
        amount: 50,
        email: '',
        donorName: 'Anonymous Giver',
        donorPhone: '',
        category: 'Offering',
        currency: 'GHS',
        publicKey: 'pk_test_123',
      });

      expect(config.email).toBe('innercourtch@gmail.com');
      expect(config.amount).toBe(5000);
    });
  });

  describe('formatTransactionRecord', () => {
    it('creates database record formatted for Firestore collection "transactions"', () => {
      const record = formatTransactionRecord({
        amount: 500,
        currency: 'GHS',
        category: 'Sanctuary Expansion & Building',
        donorName: 'Kwame Mensah',
        donorEmail: 'kwame@gmail.com',
        donorPhone: '+233244485740',
        reference: 'RICGCW_1710000000_A1B2C3',
        subaccount: 'ACCT_cm4xpwb0z8y7xou',
      });

      expect(record.amount).toBe(500);
      expect(record.currency).toBe('GHS');
      expect(record.category).toBe('Sanctuary Expansion & Building');
      expect(record.donorName).toBe('Kwame Mensah');
      expect(record.donorEmail).toBe('kwame@gmail.com');
      expect(record.donorPhone).toBe('+233244485740');
      expect(record.paymentReference).toBe('RICGCW_1710000000_A1B2C3');
      expect(record.subaccount).toBe('ACCT_cm4xpwb0z8y7xou');
      expect(record.isDigital).toBe(true);
      expect(record.type).toBe('contribution');
      expect(record.platform).toBe('ricgcw_official');
      expect(record.status).toBe('success');
      expect(record.date).toBeDefined();
    });
  });

  describe('openPaystackPopup', () => {
    it('successfully triggers Paystack v1 setup and openIframe', () => {
      const mockOpenIframe = vi.fn();
      const mockSetup = vi.fn().mockReturnValue({ openIframe: mockOpenIframe });
      (window as any).PaystackPop = { setup: mockSetup };

      const opened = openPaystackPopup({ key: 'pk_test_123', email: 'test@example.com', amount: 1000 });

      expect(opened).toBe(true);
      expect(mockSetup).toHaveBeenCalled();
      expect(mockOpenIframe).toHaveBeenCalled();
    });
  });
});
