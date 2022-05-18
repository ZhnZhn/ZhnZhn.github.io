"use strict";

exports.__esModule = true;
exports.isMap = exports.isCategory = exports.getValue = exports.crUrl = exports.URL = exports.QUERY_TAIL = exports.DF_TAIL = void 0;

var _AdapterFn = require("../../AdapterFn");

exports.getValue = _AdapterFn.getValue;
const CATEGORY_TYPES = ['MAP', 'COLUMN_SET', 'BAR_SET', 'BAR_WITH_LABELS', 'DOT_SET'];
const URL = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/";
exports.URL = URL;
const QUERY_TAIL = "&precision=1&sinceTimePeriod=1996M01";
exports.QUERY_TAIL = QUERY_TAIL;
const DF_TAIL = "precision=1";
exports.DF_TAIL = DF_TAIL;
const isCategory = (0, _AdapterFn.isInArrStr)(CATEGORY_TYPES);
exports.isCategory = isCategory;

const isMap = seriaType => seriaType === 'MAP';

exports.isMap = isMap;

const crUrl = function (table, q, tail) {
  if (tail === void 0) {
    tail = QUERY_TAIL;
  }

  return "" + URL + table + "?" + q + tail;
};

exports.crUrl = crUrl;
//# sourceMappingURL=apiFn.js.map