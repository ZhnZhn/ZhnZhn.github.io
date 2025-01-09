import {
  isNumber,
  ymdToUTC,
  ymdhmsToUTC
} from '../AdapterFn';
import {
  compareByDate
} from '../compareByFn';

export const crData = (
  json,
  option
) => {
  const { dfPn, _propName } = option
  , _metrics = dfPn ? json[dfPn] : json
  , _data = [];
  _metrics.forEach(item => {
    const _v = parseFloat(item[_propName]);
    if (isNumber(_v)) {
      _data.push([ymdToUTC(item.date), _v])
    }
  })
  return _data.reverse().sort(compareByDate);
}

export const klineOptions = {
  isAth: true,
  d: 'date',
  v: 'volume',
  l: 'low',
  h: 'high',
  o: 'open',
  crDate: ymdhmsToUTC
}
