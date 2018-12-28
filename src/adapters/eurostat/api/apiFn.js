
import fnArr from '../../../utils/fnArr';

const { isInArrStr } = fnArr;

const C = {
  URL: "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/",
  QUERY_TAIL: "&precision=1&sinceTimePeriod=1996M01",
  DF_TAIL: "precision=1"
};

const CATEGORY_TYPES = [
  'MAP', 'COLUMN_SET', 'BAR_SET'
];

const apiFn = {
  URL: C.URL,
  QUERY_TAIL: C.QUERY_TAIL,
  DF_TAIL: C.DF_TAIL,

  isCategory: isInArrStr(CATEGORY_TYPES),
  crUrl: (table, q, tail=C.QUERY_TAIL) => `${C.URL}${table}?${q}${tail}`
};

export default apiFn
