import crAdapterType1 from '../crAdapterType1';
import { compareByDate } from '../compareByFn';

import {
  isNumber,
  isTotalVariable,
  isEuRoute,
  ymdToUTC,
  getSourceValue,
  getMetricValue,
  reduceToHmBy,
  isTotalData
} from './fnAdapter';

const _getObjectKeys = Object.keys
, getTrue = () => true
, _crDataImpl = (
  items,
  getDate,
  getValue,
  isValue=getTrue
) => items.reduce((data, item) => {
  const value = getValue(item);
  if (isNumber(value) && isValue(item)) {
    data.push([
      ymdToUTC(getDate(item)),
      value
    ])
  }
  return data;
}, [])
, _crTotalData = (
  json,
  pnDate,
  metric
) => {
  const _hm = reduceToHmBy((hm, item) => {
    if (isTotalVariable(item)) {
      const _pn = ''+item[pnDate];
      hm[_pn] = (hm[_pn] || 0) + item[metric]
    }
    return hm;
  }, json);
  return _crDataImpl(
    _getObjectKeys(_hm),
    dateKey => dateKey,
    dateKey => _hm[dateKey]
  );
}
, _crSourceData = (
  json,
  pnDate,
  metric,
  source,
  options
) => _crDataImpl(
  json,
  item => item[pnDate],
  item => item[metric],
  isEuRoute(options)
    ? getTrue
    : item => item.variable === source
);

const crData = (
  json,
  options
) => {
  const source = getSourceValue(options)
  , _crData = isTotalData(source)
     ? _crTotalData
     : _crSourceData;

  return _crData(
    json,
    options.pnDate,
    getMetricValue(options),
    source,
    options
  ).sort(compareByDate);
};

const toLineAdapter = crAdapterType1({ crData });

export default toLineAdapter
