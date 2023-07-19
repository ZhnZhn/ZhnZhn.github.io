export {
  isCategory
} from '../CategoryFn';
export {
  isArr,
  crError,
  getCaption,
  getValue,
  roundBy,
  ymdToUTC
} from '../AdapterFn';

export const getCountryName = (
  item
) => item.country_code
  ? item.country_or_region || ''
  : ''

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
