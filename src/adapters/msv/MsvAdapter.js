import { fToKline } from '../fToKline';

export const MsvAdapter = fToKline({
  isAth: true,
  getData: json => json.results,
  d: 't',
  v: 'v',
  l: 'l',
  h: 'h',
  c: 'c',
  o: 'o',
  n: 'n'
})
