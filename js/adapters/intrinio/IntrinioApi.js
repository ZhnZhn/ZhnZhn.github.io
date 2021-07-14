"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crError = _AdapterFn["default"].crError;
var C = {
  URL: 'https://api.intrinio.com/historical_data',
  TAIL: 'item=level',
  RES_ERR_STATUS: [401]
};
var FRQ = {
  A: 'yearly',
  Q: 'quarterly',
  W: 'weekly',
  D: 'daily',
  M: 'monthly',
  DF: 'monthly'
};

var _getErr = function _getErr(json) {
  return json && Array.isArray(json.errors) && json.errors[0] ? json.errors[0] : void 0;
};

var IntrinioApi = {
  crOptionFetch: function crOptionFetch(option) {
    var apiKey = option.apiKey;
    return {
      headers: {
        'X-Authorization-Public-Key': apiKey
      }
    };
  },
  getRequestUrl: function getRequestUrl(option) {
    var value = option.value,
        fromDate = option.fromDate,
        toDate = option.toDate,
        _option$item = option.item,
        item = _option$item === void 0 ? {} : _option$item,
        one = option.one,
        two = option.two,
        three = option.three;
    option.resErrStatus = C.RES_ERR_STATUS;

    if (two && three) {
      return C.URL + "?identifier=" + one + "&item=" + two + "&start_date=" + fromDate + "&end_date=" + toDate + "&type=" + three;
    }

    if (two) {
      //return `${C.URL}?identifier=${one}&item=${two}&start_date=${fromDate}&end_date=${toDate}&frequency=quarterly`;
      return C.URL + "?identifier=" + one + "&item=" + two + "&start_date=" + fromDate + "&end_date=" + toDate + "&type=QTR";
    }

    var _frq = FRQ[item.frq] || FRQ.DF;

    return C.URL + "?identifier=" + value + "&start_date=" + fromDate + "&end_date=" + toDate + "&frequency=" + _frq + "&" + C.TAIL;
  },
  checkResponse: function checkResponse(json) {
    var _err = _getErr(json);

    if (_err) {
      throw crError(_err.human, _err.message);
    }

    return json && Array.isArray(json.data);
  }
};
var _default = IntrinioApi;
exports["default"] = _default;
//# sourceMappingURL=IntrinioApi.js.map