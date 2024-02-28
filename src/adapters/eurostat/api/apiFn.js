export { getValue } from '../../AdapterFn';
import { isInArrStr } from '../../AdapterFn';

const CATEGORY_TYPES = [
  'MAP',
  'COLUMN_SET',
  'BAR_SET',
  'BAR_WITH_LABELS',
  'DOT_SET'
];

const API_URL = "https://ec.europa.eu/eurostat/api";
const PATH_DATA = "dissemination/statistics/1.0/data";
const COMEXT_API_URL = `${API_URL}/comext/${PATH_DATA}`;

export const STAT_API_URL = `${API_URL}/${PATH_DATA}`
export const QUERY_TAIL = "&sinceTimePeriod=1999-01"
export const DF_TAIL = ""

export const isCategory = isInArrStr(CATEGORY_TYPES)
export const isMap = seriaType => seriaType === 'MAP'
export const crUrl = (
  isComext,
  table,
  q,
  tail=QUERY_TAIL
) => `${isComext ? COMEXT_API_URL : STAT_API_URL}/${table}?${q}${tail}`
