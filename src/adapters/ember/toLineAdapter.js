import { crAdapterType1 } from '../crAdapterType1';
import { compareByDate } from '../compareByFn';

import {
  isTotalVariable,
  isEuRoute,
  isTotalData,
  ymdToUTC,
  getSourceValue,
  getMetricValue,
  reduceToHmBy,
  crDataImpl
} from './fnAdapter';

const _getObjectKeys = Object.keys
, _fCrDataPoint = (
  getDate
) => (value, item) => [
  ymdToUTC(getDate(item)),
  value
]
, _crDataImpl = (
  items,
  getValue,
  getDate,
  isValue
) => crDataImpl(
  items,
  getValue,
  _fCrDataPoint(getDate),
  isValue
)
, _crTotalData = (
  json,
  metric,
  pnDate
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
    dateKey => _hm[dateKey],
    dateKey => dateKey
  );
}
, _crSourceData = (
  json,
  metric,
  pnDate,
  source,
  options
) => _crDataImpl(
  json,
  item => item[metric],
  item => item[pnDate],
  isEuRoute(options)
    ? void 0
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
    getMetricValue(options),
    options.pnDate,
    source,
    options
  ).sort(compareByDate);
};

const toLineAdapter = crAdapterType1({ crData });

export default toLineAdapter
