export { getValue } from '../../AdapterFn';
import { isInArrStr } from '../../AdapterFn';

const CATEGORY_TYPES = [
  'MAP',
  'COLUMN_SET',
  'BAR_SET',
  'BAR_WITH_LABELS',
  'DOT_SET'
];

export const STAT_API_URL = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data"
export const QUERY_TAIL = "&sinceTimePeriod=1996-01"
export const DF_TAIL = ""

export const isCategory = isInArrStr(CATEGORY_TYPES)
export const isMap = seriaType => seriaType === 'MAP'
export const crUrl = (
  table,
  q,
  tail=QUERY_TAIL
) => `${STAT_API_URL}/${table}?${q}${tail}`
