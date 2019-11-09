const compareApi = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';

export async function fetchUSDRate() {
  const resp = await fetch(compareApi);
  const data = await resp.json();
  return data;
}
