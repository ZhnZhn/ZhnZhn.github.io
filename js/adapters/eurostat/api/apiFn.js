"use strict";

exports.__esModule = true;
exports.isMap = exports.isCategory = exports.getValue = exports.crUrl = exports.STAT_API_URL = exports.QUERY_TAIL = exports.DF_TAIL = void 0;
var _AdapterFn = require("../../AdapterFn");
exports.getValue = _AdapterFn.getValue;
const CATEGORY_TYPES = ['MAP', 'COLUMN_SET', 'BAR_SET', 'BAR_WITH_LABELS', 'DOT_SET'];
const API_URL = "https://ec.europa.eu/eurostat/api";
const PATH_DATA = "dissemination/statistics/1.0/data";
const COMEXT_API_URL = `${API_URL}/comext/${PATH_DATA}`;
const STAT_API_URL = exports.STAT_API_URL = `${API_URL}/${PATH_DATA}`;
const QUERY_TAIL = exports.QUERY_TAIL = "&sinceTimePeriod=1999-01";
const DF_TAIL = exports.DF_TAIL = "";
const isCategory = exports.isCategory = (0, _AdapterFn.isInArrStr)(CATEGORY_TYPES);
const isMap = seriaType => seriaType === 'MAP';
exports.isMap = isMap;
const crUrl = function (isComext, table, q, tail) {
  if (tail === void 0) {
    tail = QUERY_TAIL;
  }
  return `${isComext ? COMEXT_API_URL : STAT_API_URL}/${table}?${q}${tail}`;
};
exports.crUrl = crUrl;
//# sourceMappingURL=apiFn.js.map