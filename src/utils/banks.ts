export interface NigerianBank {
  name: string;
  code: string;
  shortName: string;
  color: string;
}

export const NIGERIAN_BANKS: NigerianBank[] = [
  { name: 'Access Bank', code: '044', shortName: 'Access', color: '#EA580C' },
  { name: 'Guaranty Trust Bank (GTBank)', code: '058', shortName: 'GTBank', color: '#F97316' },
  { name: 'Zenith Bank', code: '057', shortName: 'Zenith', color: '#DC2626' },
  { name: 'First Bank of Nigeria', code: '011', shortName: 'FirstBank', color: '#1D4ED8' },
  { name: 'United Bank for Africa (UBA)', code: '033', shortName: 'UBA', color: '#B91C1C' },
  { name: 'Kuda Microfinance Bank', code: '50211', shortName: 'Kuda', color: '#7C3AED' },
  { name: 'Moniepoint Microfinance Bank', code: '50515', shortName: 'Moniepoint', color: '#0284C7' },
  { name: 'OPay Digital Services', code: '999992', shortName: 'OPay', color: '#059669' },
  { name: 'Stanbic IBTC Bank', code: '221', shortName: 'Stanbic', color: '#2563EB' },
  { name: 'Fidelity Bank', code: '070', shortName: 'Fidelity', color: '#4338CA' },
  { name: 'Sterling Bank', code: '232', shortName: 'Sterling', color: '#BE123C' },
  { name: 'Wema Bank / ALAT', code: '035', shortName: 'Wema ALAT', color: '#9333EA' },
  { name: 'Union Bank of Nigeria', code: '032', shortName: 'Union Bank', color: '#0284C7' },
  { name: 'Palmpay', code: '999991', shortName: 'Palmpay', color: '#84CC16' },
  { name: 'First City Monument Bank (FCMB)', code: '214', shortName: 'FCMB', color: '#6D28D9' }
];

export const formatNuban = (nuban: string) => {
  const digits = nuban.replace(/\D/g, '').slice(0, 10);
  return digits;
};

export const maskNuban = (nuban: string) => {
  if (!nuban || nuban.length < 4) return nuban;
  const last4 = nuban.slice(-4);
  return `••••${last4}`;
};
