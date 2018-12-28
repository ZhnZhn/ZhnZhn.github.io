"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fnArr = require("../../../utils/fnArr");

var _fnArr2 = _interopRequireDefault(_fnArr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInArrStr = _fnArr2.default.isInArrStr;


var C = {
  URL: "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/",
  QUERY_TAIL: "&precision=1&sinceTimePeriod=1996M01",
  DF_TAIL: "precision=1"
};

var CATEGORY_TYPES = ['MAP', 'COLUMN_SET', 'BAR_SET'];

var apiFn = {
  URL: C.URL,
  QUERY_TAIL: C.QUERY_TAIL,
  DF_TAIL: C.DF_TAIL,

  isCategory: isInArrStr(CATEGORY_TYPES),
  crUrl: function crUrl(table, q) {
    var tail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : C.QUERY_TAIL;
    return "" + C.URL + table + "?" + q + tail;
  }
};

exports.default = apiFn;
//# sourceMappingURL=apiFn.js.map