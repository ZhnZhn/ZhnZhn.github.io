"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnArr = _interopRequireDefault(require("../../../utils/fnArr"));

var isInArrStr = _fnArr["default"].isInArrStr;
var C = {
  URL: "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/",
  QUERY_TAIL: "&precision=1&sinceTimePeriod=1996M01",
  DF_TAIL: "precision=1"
};
var CATEGORY_TYPES = ['MAP', 'COLUMN_SET', 'BAR_SET', 'BAR_WITH_LABELS', 'DOT_SET'];
var apiFn = {
  URL: C.URL,
  QUERY_TAIL: C.QUERY_TAIL,
  DF_TAIL: C.DF_TAIL,
  isCategory: isInArrStr(CATEGORY_TYPES),
  crUrl: function crUrl(table, q, tail) {
    if (tail === void 0) {
      tail = C.QUERY_TAIL;
    }

    return "" + C.URL + table + "?" + q + tail;
  }
};
var _default = apiFn;
exports["default"] = _default;
//# sourceMappingURL=apiFn.js.map