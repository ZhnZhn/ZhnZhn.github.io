import crAdapterType1 from '../crAdapterType1';
import crAdapterRouter from '../crAdapterRouter';
import {
  compareByDate
} from '../compareByFn';
import toCategoryAdapter from './toCategoryAdapter';

import {
  isTotalVariable,
  isCategory,
  ymdToUTC,
  getValue,
  reduceToHmBy,
  isTotalData
} from './fnAdapter';

const _getObjectKeys = Object.keys
, _crTotalData = (
  pnDate,
  json,
  metric
) => {
  const _hm = reduceToHmBy((hm, item) => {
    if (isTotalVariable(item)) {
      const _pn = ''+item[pnDate];
      hm[_pn] = (hm[_pn] || 0) + item[metric]
    }
    return hm;
  }, json);
  return _getObjectKeys(_hm).map(key => [
    ymdToUTC(key),
    _hm[key]
  ]);
}
, _crSourceData = (
  pnDate,
  json,
  metric,
  source
) => json.reduce((data, item) => {
  if (item.variable === source) {
    data.push([
      ymdToUTC(item[pnDate]),
      item[metric]
    ])
  }
  return data;
}, []);

const crData = (
  json,
  options
) => {
  const {
    items,
    pnDate
  } = options
  , metric = getValue(items[1])
  , source = getValue(items[2])
  , data = isTotalData(source)
     ? _crTotalData(pnDate, json, metric)
     : _crSourceData(pnDate, json, metric, source);

  return data.sort(compareByDate);
};

const toLineAdapter = crAdapterType1({ crData });

const getRoute = (
  option
) => isCategory(option.seriaType)
  ? toCategoryAdapter
  : toLineAdapter

const EmberAdapter = crAdapterRouter(void 0, { getRoute })

export default EmberAdapter
