import formatCurrency from 'format-currency';
import { BigNumber } from 'bignumber.js';
const compareApi = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';

export async function fetchUSDRate() {
  const resp = await fetch(compareApi);
  const data = await resp.json();
  return data;
}

export function formatUSD(value) {
  return formatCurrency(value, { minFraction: 2, maxFraction: 2 });
}

export function calculateBalance(value) {
  return new BigNumber(value).dividedBy(new BigNumber(10).pow(18));
}
