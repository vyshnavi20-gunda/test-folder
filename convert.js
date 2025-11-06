const axios = require('axios');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount } = req.query;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    const amountNum = parseFloat(amount);

    // Using free exchangerate API
    const url = 'https://api.exchangerate-api.com/v4/latest/INR';
    const response = await axios.get(url);
    const rates = response.data.rates;

    const conversion = {
      originalAmount: amountNum,
      originalCurrency: 'INR',
      conversions: {
        USD: (amountNum * rates.USD).toFixed(2),
        EUR: (amountNum * rates.EUR).toFixed(2)
      },
      timestamp: response.data.time_last_updated
    };

    res.status(200).json(conversion);
  } catch (error) {
    console.error('Currency API error:', error.message);

    // Mock conversion rates for demo
    const mockRates = {
      originalAmount: parseFloat(req.query.amount) || 0,
      originalCurrency: 'INR',
      conversions: {
        USD: (parseFloat(req.query.amount) * 0.012).toFixed(2),
        EUR: (parseFloat(req.query.amount) * 0.011).toFixed(2)
      },
      timestamp: Date.now()
    };

    res.status(200).json(mockRates);
  }
}
