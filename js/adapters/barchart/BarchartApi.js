"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue;
var C = {
  ROOT: "https://marketdata.websol.barchart.com/getHistory.jsonp",
  //DF_FROM_DATE: '20190627000000',
  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Dataset Empty'
};

var _crDfUrl = function _crDfUrl(option) {
  var _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      _option$fromDate = option.fromDate,
      fromDate = _option$fromDate === void 0 ? '' : _option$fromDate,
      apiKey = option.apiKey,
      _symbol = getValue(items[0]);

  option.value = _symbol;
  return C.ROOT + "?key=" + apiKey + "&symbol=" + _symbol + "&type=daily&startDate=" + fromDate + "&dividends=0&splits=0";
};

var _crFtUrl = function _crFtUrl(_ref) {
  var apiKey = _ref.apiKey,
      value = _ref.value,
      _ref$fromDate = _ref.fromDate,
      fromDate = _ref$fromDate === void 0 ? '' : _ref$fromDate;
  return C.ROOT + "?key=" + apiKey + "&symbol=" + value + "&type=daily&startDate=" + fromDate;
};

var _rCrUrl = {
  DF: _crDfUrl,
  FT: _crFtUrl
};
var BarchartApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfT = option.dfT,
        _crUrl = _rCrUrl[dfT] || _rCrUrl.DF;

    return _crUrl(option);
  },
  checkResponse: function checkResponse(json) {
    if (!(json && Array.isArray(json.results))) {
      throw {
        errCaption: C.REQUEST_ERROR,
        message: C.RESPONSE_EMPTY
      };
    }

    return true;
  }
};
var _default = BarchartApi;
exports["default"] = _default;
//# sourceMappingURL=BarchartApi.js.map