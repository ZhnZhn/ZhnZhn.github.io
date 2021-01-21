"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue,
    crError = _fnAdapter["default"].crError;
var C = {
  URL: 'https://api.twelvedata.com',
  QUERY_TAIL: 'dp=2&order=ASC&timezone=UTC',
  ERR_EMPTY: 'Response is empty'
};
var _isArr = Array.isArray;
var TwApi = {
  getRequestUrl: function getRequestUrl(option) {
    var apiKey = option.apiKey,
        items = option.items,
        symbol = getValue(items[0], {
      isUpper: true
    }),
        interval = getValue(items[1]),
        outputsize = getValue(items[2]);
    return C.URL + "/time_series?symbol=" + symbol + "&apikey=" + apiKey + "&interval=" + interval + "&outputsize=" + outputsize + "&" + C.QUERY_TAIL;
  },
  checkResponse: function checkResponse(json, option) {
    var _ref = json || {},
        values = _ref.values;

    if (_isArr(values)) {
      return true;
    }

    throw crError('', json.message || C.ERR_EMPTY);
  }
};
var _default = TwApi;
exports["default"] = _default;
//# sourceMappingURL=TwApi.js.map