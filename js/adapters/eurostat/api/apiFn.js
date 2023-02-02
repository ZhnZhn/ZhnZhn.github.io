"use strict";

exports.__esModule = true;
exports.isMap = exports.isCategory = exports.getValue = exports.crUrl = exports.STAT_API_URL = exports.QUERY_TAIL = exports.DF_TAIL = void 0;
var _AdapterFn = require("../../AdapterFn");
exports.getValue = _AdapterFn.getValue;
const CATEGORY_TYPES = ['MAP', 'COLUMN_SET', 'BAR_SET', 'BAR_WITH_LABELS', 'DOT_SET'];
const STAT_API_URL = "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data";
exports.STAT_API_URL = STAT_API_URL;
const QUERY_TAIL = "&sinceTimePeriod=1996-01";
exports.QUERY_TAIL = QUERY_TAIL;
const DF_TAIL = "";
exports.DF_TAIL = DF_TAIL;
const isCategory = (0, _AdapterFn.isInArrStr)(CATEGORY_TYPES);
exports.isCategory = isCategory;
const isMap = seriaType => seriaType === 'MAP';
exports.isMap = isMap;
const crUrl = function (table, q, tail) {
  if (tail === void 0) {
    tail = QUERY_TAIL;
  }
  return STAT_API_URL + "/" + table + "?" + q + tail;
};
exports.crUrl = crUrl;
//# sourceMappingURL=apiFn.js.map