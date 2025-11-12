import { ymdhmsToUTC } from '../AdapterFn';
import { fToKline } from '../fToKline';


const toHistorical = fToKline({
  isAth: true,
  d: 'date',
  v: 'volume',
  l: 'low',
  h: 'high',
  o: 'open',
  c: 'close',
  crDate: ymdhmsToUTC,
  getData: json => json.reverse()
});

export default toHistorical
