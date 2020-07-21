
import fnArr from '../../../utils/fnArr';
import AdapterFn from '../../AdapterFn'

const { getValue } = AdapterFn
const { isInArrStr } = fnArr;

const C = {
  URL: "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/",
  QUERY_TAIL: "&precision=1&sinceTimePeriod=1996M01",
  DF_TAIL: "precision=1"
};

const CATEGORY_TYPES = [
  'MAP',
  'COLUMN_SET',
  'BAR_SET', 'BAR_WITH_LABELS',
  'DOT_SET'
];

const apiFn = {
  ...C,
  getValue,
  isCategory: isInArrStr(CATEGORY_TYPES),
  isMap: seriaType => seriaType === 'MAP',
  crUrl: (table, q, tail=C.QUERY_TAIL) => `${C.URL}${table}?${q}${tail}`
};

export default apiFn
