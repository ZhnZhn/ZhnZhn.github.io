import {
  isNumber,
  ymdToUTC,
  ymdhmsToUTC
} from '../AdapterFn';
import {
  compareByDate
} from '../compareByFn';

export const getData = json => json.reverse()

export const crData = (
  json,
  option
) => {
  const { _propName } = option  
  , _data = [];
  json.forEach(item => {
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
