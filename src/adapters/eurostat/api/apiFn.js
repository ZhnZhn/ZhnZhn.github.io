export { getValue } from '../../AdapterFn';
import { isInArrStr } from '../../AdapterFn';

const CATEGORY_TYPES = [
  'MAP',
  'COLUMN_SET',
  'BAR_SET',
  'BAR_WITH_LABELS',
  'DOT_SET'
];

export const URL = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/"
export const QUERY_TAIL = "&precision=1&sinceTimePeriod=1996M01"
export const DF_TAIL = "precision=1"

export const isCategory = isInArrStr(CATEGORY_TYPES)
export const isMap = seriaType => seriaType === 'MAP'
export const crUrl = (
  table,
  q,
  tail=QUERY_TAIL
) => `${URL}${table}?${q}${tail}`
