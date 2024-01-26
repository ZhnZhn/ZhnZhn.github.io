import crAdapterType1 from '../crAdapterType1';
import { crAdapterRouter } from '../crAdapterRouter';
import { compareByDate } from '../compareByFn';
import toCategoryAdapter from './toCategoryAdapter';
import crToTreeMapAdapter from './crToTreeMapAdapter';

import {
  isTotalVariable,
  isTreeMap,
  isCategory,
  ymdToUTC,
  getSourceValue,
  getMetricValue,
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
    pnDate
  } = options
  , source = getSourceValue(options)
  , metric = getMetricValue(options)
  , data = isTotalData(source)
     ? _crTotalData(pnDate, json, metric)
     : _crSourceData(pnDate, json, metric, source);

  return data.sort(compareByDate);
};

const toLineAdapter = crAdapterType1({ crData });

const getRoute = (
  option
) => {
  const _seriaType = option.seriaType;
  return isTreeMap(_seriaType)
    ? crToTreeMapAdapter(option)
    : isCategory(_seriaType)
       ? toCategoryAdapter
       : toLineAdapter;
};


const EmberAdapter = crAdapterRouter(void 0, { getRoute })

export default EmberAdapter
