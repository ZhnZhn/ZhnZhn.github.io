import { fToKline } from '../fToKline';
import { klineOptions } from './fnAdapter';

const _getData = (
  json,
  { dfPn }
) => json[dfPn].reverse();

const toHistorical = fToKline({
  ...klineOptions,
  getData: _getData,
  c: 'adjClose'
});

export default toHistorical
