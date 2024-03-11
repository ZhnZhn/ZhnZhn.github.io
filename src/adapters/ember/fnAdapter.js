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
  isNumber,
  getCaption,
  getValue
} from '../AdapterFn';

export const isEuRoute = (
  option
) => option.dfId === "EU"

export const isUsRoute = (
  option
) => option.dfId === "US"

const _getCountryOrRegionCategory = (
  item
) => item.country_code
  ? item.country_or_region || ''
  : ''
const _getStateCategory = (
  item
) => item.country && item.state !== "US Total"
  ? item.state || ''
  : ''

export const fGetCategory = (
  option
) => isUsRoute(option)
  ? _getStateCategory
  : _getCountryOrRegionCategory

const _getItems = option => option.items
, _fGetItemsBy = (fn) => (
  itemIndex
) => (option) => fn(_getItems(option)[itemIndex])
, _fGetItemsCaptionBy = _fGetItemsBy(getCaption)
, _fGetItemsValueBy = _fGetItemsBy(getValue);

export const getGeoCaption = _fGetItemsCaptionBy(0)
export const getSourceValue = _fGetItemsValueBy(1)
export const getMetricCaption = _fGetItemsCaptionBy(2)
const _getMetricValue = _fGetItemsValueBy(2);
export const getMetricValue = (
  options
) => isEuRoute(options)
  ? 'day_ahead_price_eur_per_mwh'
  : _getMetricValue(options)

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

const getTrue = () => true;
export const crDataImpl = (
  items,
  getValue,
  crDataPoint,
  isValue=getTrue
) => items.reduce((data, item) => {
  const value = getValue(item);
  if (isNumber(value) && isValue(item)) {
    data.push(crDataPoint(value, item))
  }
  return data;
}, [])
