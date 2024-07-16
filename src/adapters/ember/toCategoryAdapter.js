import { crCategoryPoint } from '../CategoryFn';
import { sortDescCategory } from '../compareByFn';
import crAdapterCategory from '../crAdapterCategory';

import {
  isTotalVariable,
  isTotalData,
  fGetCategory,
  reduceToHmBy,
  getSourceValue,
  getMetricValue,
  roundBy,
  crDataImpl
} from './fnAdapter';

const _getObjectKeys = Object.keys
, FN_IDENTITY = value => value
, _fCrDataPoint = (
  transformValue,
  getCategory
) => (
  value,
  item
) => crCategoryPoint(
  transformValue(value),
  getCategory(item)
)
, _crDataImpl = (
  items,
  getValue,
  getCategory,
  transformValue,
  isValue
) => crDataImpl(
  items,
  getValue,
  _fCrDataPoint(transformValue, getCategory),
  isValue
)
, _crTotalData = (
  json,
  getCategory,
  pnMetric
) => {
  const hm = reduceToHmBy((_hm, item) => {
    const c = getCategory(item)
    if (c && isTotalVariable(item)) {
      _hm[c] = (_hm[c] || 0) + item[pnMetric]
    }
    return _hm;
  }, json);
  return _crDataImpl(
    _getObjectKeys(hm),
    itemKey => hm[itemKey],
    FN_IDENTITY,
    value => roundBy(value, 2)
  );
}
, _crSourceData = (
  json,
  getCategory,
  pnMetric
) => _crDataImpl(
  json,
  item => item[pnMetric],
  getCategory,
  FN_IDENTITY,
  item => !!getCategory(item)
)
, _crData = (
  json,
  options
) => {
  const source = getSourceValue(options)
  , pnMetric = getMetricValue(options)
  , getCategory = fGetCategory(options)
  , crCategoryData = isTotalData(source)
      ? _crTotalData
      : _crSourceData;
  return sortDescCategory(
    crCategoryData(
      json,
      getCategory,
      pnMetric
    )
  );
}
, toCategoryAdapter = crAdapterCategory(_crData);

export default toCategoryAdapter
