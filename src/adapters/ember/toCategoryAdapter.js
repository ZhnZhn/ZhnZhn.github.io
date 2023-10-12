import { crCategoryPoint } from '../CategoryFn';
import { sortDescByPnY } from '../compareByFn';
import crAdapterCategory from '../crAdapterCategory';

import {
  isTotalVariable,
  isTotalData,
  getCountryName,
  reduceToHmBy,
  getSourceValue,
  getMetricValue,
  roundBy
} from './fnAdapter';

const _getObjectKeys = Object.keys
, _crTotalData = (
  json,
  pnMetric
) => {
  const hm = reduceToHmBy((_hm, item) => {
    const c = getCountryName(item)
    if (c && isTotalVariable(item)) {
      _hm[c] = (_hm[c] || 0) + item[pnMetric]
    }
    return _hm;
  }, json);
  return _getObjectKeys(hm)
    .map(k => crCategoryPoint(
      roundBy(hm[k], 2),
      k
    ));
}
, _crSourceData = (
  json,
  pnMetric
) => json.reduce((data, item) => {
  const c = getCountryName(item)
  if (c) {
    data.push(crCategoryPoint(
      item[pnMetric],
      c
    ))
  }
  return data;
}, [])
, _crData = (
  json,
  options
) => {
  const source = getSourceValue(options)
  , pnMetric = getMetricValue(options);
  return sortDescByPnY(
    isTotalData(source)
      ? _crTotalData(json, pnMetric)
      : _crSourceData(json, pnMetric)
  );
}
, toCategoryAdapter = crAdapterCategory(_crData);

export default toCategoryAdapter
