window.StripeFeePresets = {
  categories: [
    'Cards',
    'Wallets',
    'Bank based',
    'Buy now, pay later'
  ],

  commonAddons: {
    international: { id: 'international', label: 'International (+1.5%)', rate: 1.5 },
    currency: { id: 'currency', label: 'Currency conversion (+1%)', rate: 1.0 },
    internationalCards: { id: 'international', label: 'International cards (+1.5%)', rate: 1.5 }
  },

  presets: [
    {
      id: 'card-domestic',
      name: 'Card payments (domestic)',
      category: 'Cards',
      rate: 2.9,
      fixed: 0.30,
      addons: ['internationalCards', 'currency', { id: 'manual', label: 'Manually entered (+0.5%)', rate: 0.5 }]
    },

    { id: 'apple-pay', name: 'Apple Pay', category: 'Wallets', rate: 2.9, fixed: 0.30, addons: ['internationalCards', 'currency'] },
    { id: 'amazon-pay', name: 'Amazon Pay', category: 'Wallets', rate: 2.9, fixed: 0.30, addons: ['internationalCards', 'currency'] },
    { id: 'cash-app-pay', name: 'Cash App Pay', category: 'Wallets', rate: 2.9, fixed: 0.30, addons: ['internationalCards', 'currency'] },
    { id: 'google-pay', name: 'Google Pay', category: 'Wallets', rate: 2.9, fixed: 0.30, addons: ['internationalCards', 'currency'] },
    { id: 'link', name: 'Link', category: 'Wallets', rate: 2.9, fixed: 0.30 },
    { id: 'wechat-pay', name: 'WeChat Pay', category: 'Wallets', rate: 2.9, fixed: 0.30, addons: ['currency'] },

    { id: 'ach', name: 'ACH Direct Debit', category: 'Bank based', rate: 0.8, fixed: 0, cap: 5.00 },
    { id: 'bacs', name: 'Bacs Direct Debit', category: 'Bank based', rate: 1.0, fixed: 0.30, cap: 6.00, addons: ['international', 'currency'] },
    { id: 'usd-bank-transfer', name: 'USD Bank Transfer', category: 'Bank based', rate: 0.5, fixed: 0, cap: 5.00 },

    { id: 'affirm', name: 'Affirm', category: 'Buy now, pay later', rate: 6.0, fixed: 0.30 },
    { id: 'afterpay', name: 'Cash App Afterpay', category: 'Buy now, pay later', rate: 6.0, fixed: 0.30, addons: ['international', 'currency'] },
    { id: 'klarna', name: 'Klarna', category: 'Buy now, pay later', rate: 5.99, fixed: 0.30, addons: ['international', 'currency'] }
  ]
};
