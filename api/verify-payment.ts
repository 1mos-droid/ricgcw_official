/**
 * RICGCW Official - Serverless Payment Verification Endpoint (Vercel)
 * Verifies Paystack transactions directly against Paystack's API using the server-only secret key.
 * Never trust client-side callbacks alone for financial transactions.
 */

export default async function handler(req: any, res: any) {
  // CORS preflight support
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { reference, expectedAmount, expectedCurrency } = body;

    if (!reference || typeof reference !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Payment reference is required.',
      });
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      console.error('[RICGCW Payment API] PAYSTACK_SECRET_KEY is not configured in server environment.');
      return res.status(503).json({
        success: false,
        message: 'Payment verification service is not configured. Please contact church treasury with your reference.',
      });
    }

    // Call Paystack verification API
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await paystackRes.json();

    if (!paystackRes.ok || !data.status || !data.data) {
      return res.status(400).json({
        success: false,
        message: data.message || 'Payment verification failed with provider.',
      });
    }

    const tx = data.data;

    if (tx.status !== 'success') {
      return res.status(400).json({
        success: false,
        status: tx.status,
        message: `Transaction was not successful (status: ${tx.status}).`,
      });
    }

    // Verify amount in smallest currency unit (pesewas/cents) if provided
    if (typeof expectedAmount === 'number' && expectedAmount > 0) {
      const expectedSmallestUnit = Math.round(expectedAmount * 100);
      if (tx.amount !== expectedSmallestUnit) {
        return res.status(400).json({
          success: false,
          message: `Amount mismatch: expected ${expectedSmallestUnit} pesewas, got ${tx.amount}.`,
        });
      }
    }

    // Verify currency if provided
    if (expectedCurrency && typeof expectedCurrency === 'string') {
      if (tx.currency.toUpperCase() !== expectedCurrency.toUpperCase()) {
        return res.status(400).json({
          success: false,
          message: `Currency mismatch: expected ${expectedCurrency}, got ${tx.currency}.`,
        });
      }
    }

    return res.status(200).json({
      success: true,
      verified: true,
      reference: tx.reference,
      amount: tx.amount / 100,
      currency: tx.currency,
      channel: tx.channel,
      paidAt: tx.paid_at,
      gatewayResponse: tx.gateway_response,
      customer: {
        email: tx.customer?.email,
        name: tx.customer?.first_name
          ? `${tx.customer.first_name} ${tx.customer.last_name || ''}`.trim()
          : undefined,
      },
    });
  } catch (error: any) {
    console.error('[RICGCW Payment API] Verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal error verifying payment. Please preserve your reference.',
    });
  }
}
