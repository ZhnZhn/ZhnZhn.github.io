import crAdapterType1 from '../crAdapterType1';
import { compareByDate } from '../compareByFn';

import {
  isTotalVariable,
  isEuRoute,
  ymdToUTC,
  getSourceValue,
  getMetricValue,
  reduceToHmBy,
  isTotalData
} from './fnAdapter';

const _getObjectKeys = Object.keys
, _crDataPoint = (
  date,
  value
) => [
  ymdToUTC(date),
  value
]
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
  return _getObjectKeys(_hm)
    .map(key => _crDataPoint(key, _hm[key]))
}
, _crSourceData = (
  json,
  pnDate,
  metric,
  source
) => json.reduce((data, item) => {
  if (item.variable === source) {
    data.push(_crDataPoint(
      item[pnDate],
      item[metric]
    ))
  }
  return data;
}, []);

const _crEuData = (
  json
) => json.map(item => _crDataPoint(
  item.date,
  item.day_ahead_price_eur_per_mwh
));

const crData = (
  json,
  options
) => {
  const source = getSourceValue(options)
  , _crData = isEuRoute(options)
     ? _crEuData
     : isTotalData(source)
        ? _crTotalData
        : _crSourceData;

  return _crData(
    json,
    options.pnDate, 
    getMetricValue(options),
    source
  ).sort(compareByDate);
};

const toLineAdapter = crAdapterType1({ crData });

export default toLineAdapter
