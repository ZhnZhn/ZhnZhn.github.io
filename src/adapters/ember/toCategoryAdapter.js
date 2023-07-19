import domSanitize from '../../utils/domSanitize';

import crAdapterCategory from '../crAdapterCategory';
import { sortDescByPnY } from '../compareByFn';

import {
  isTotalVariable,
  isTotalData,
  getCountryName,
  reduceToHmBy,
  getValue,
  roundBy
} from './fnAdapter';

const _getObjectKeys = Object.keys
, _crCategoryPoint = (
  y,
  n
) => {
  const c = domSanitize(n);
  return { y, name: c, c };
}
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
    .map(k => _crCategoryPoint(
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
    data.push(_crCategoryPoint(
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
  const { items } = options
  , pnMetric = getValue(items[1])
  , source = getValue(items[2]);
  return sortDescByPnY(
    isTotalData(source)
      ? _crTotalData(json, pnMetric)
      : _crSourceData(json, pnMetric)
  );
}
, toCategoryAdapter = crAdapterCategory(_crData);

export default toCategoryAdapter
