export {
  isTreeMap,
  isCategory
} from '../CategoryFn';
export {
  isArr,
  isNumber,
  crError,
  roundBy,
  ymdToUTC
} from '../AdapterFn';

import {
  getCaption,
  getValue
} from '../AdapterFn';

export const getCountryName = (
  item
) => item.country_code
  ? item.country_or_region || ''
  : ''

const _getItems = options => options.items
, _fGetItemsBy = (fn) => (
  itemIndex
) => (options) => fn(_getItems(options)[itemIndex])
, _fGetItemsCaptionBy = _fGetItemsBy(getCaption)
, _fGetItemsValueBy = _fGetItemsBy(getValue);

export const getGeoCaption = _fGetItemsCaptionBy(0)
export const getSourceValue = _fGetItemsValueBy(1)
export const getMetricCaption = _fGetItemsCaptionBy(2)
export const getMetricValue = _fGetItemsValueBy(2)

const SOURCE_TOTAL = 'Total';
export const isTotalData = (
  source
) => source === SOURCE_TOTAL

const SOURCE_FOSSIL = 'Fossil'
, SOURCE_CLEAN = 'Clean';
export const isTotalVariable = (
  item
) => item.variable === SOURCE_FOSSIL
  || item.variable === SOURCE_CLEAN

export const reduceToHmBy = (
  fn,
  arr
) => arr.reduce(fn, Object.create(null))
