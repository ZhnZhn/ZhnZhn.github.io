import { fToKline } from '../fToKline';
import { klineOptions } from './fnAdapter';

const _getData = (
  json,
  { dfPn }
) => json.reverse();

const toIntraday = fToKline({
  ...klineOptions,
  getData: _getData,
  c: 'close'
});

export default toIntraday
