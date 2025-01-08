import { ymdhmsToUTC } from '../AdapterFn';
import { fToKline } from '../fToKline';

import { crCaption } from './fnAdapter';

const _crNumber = str => parseFloat(str);

const TwAdapter = fToKline({
  isAth: true,
  getData: json => json.values,
  d: 'datetime',
  v: 'volume',
  l: 'low',
  h: 'high',
  c: 'close',
  o: 'open',
  crDate: ymdhmsToUTC,
  crValue: _crNumber,
  crVolume: _crNumber,
  crCaption
});

export default TwAdapter
