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

const _getItems = options => options.items;
export const getGeoCaption = (
  options
) => getCaption(_getItems(options)[0])

export const getSourceValue = (
  options
) => getValue(_getItems(options)[1])

export const getMetricCaption = (
  options
) => getCaption(_getItems(options)[2])
export const getMetricValue = (
  options
) => getValue(_getItems(options)[2])


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
