"use strict";

exports.__esModule = true;
exports.isMap = exports.isCategory = exports.crUrl = exports.STAT_API_URL = exports.QUERY_TAIL = exports.DF_TAIL = void 0;
var _arrFn = require("../../../utils/arrFn");
var _ChartType = require("../../../constants/ChartType");
const CATEGORY_TYPES = [_ChartType.CHT_MAP, _ChartType.CHT_COLUMN_SET, _ChartType.CHT_BAR_SET, _ChartType.CHT_BAR_WITH_LABELS, _ChartType.CHT_DOT_SET];
const API_URL = "https://ec.europa.eu/eurostat/api";
const PATH_DATA = "dissemination/statistics/1.0/data";
const COMEXT_API_URL = `${API_URL}/comext/${PATH_DATA}`;
const STAT_API_URL = exports.STAT_API_URL = `${API_URL}/${PATH_DATA}`;
const QUERY_TAIL = exports.QUERY_TAIL = "&sinceTimePeriod=1999-01";
const DF_TAIL = exports.DF_TAIL = "";
const isCategory = exports.isCategory = (0, _arrFn.isInArrStr)(CATEGORY_TYPES);
const isMap = seriaType => seriaType === _ChartType.CHT_MAP;
exports.isMap = isMap;
const crUrl = function (isComext, table, q, tail) {
  if (tail === void 0) {
    tail = QUERY_TAIL;
  }
  return `${isComext ? COMEXT_API_URL : STAT_API_URL}/${table}?${q}${tail}`;
};
exports.crUrl = crUrl;
//# sourceMappingURL=apiFn.js.map