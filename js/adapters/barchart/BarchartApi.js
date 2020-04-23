"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  ROOT: "https://marketdata.websol.barchart.com/getHistory.jsonp",
  //DF_FROM_DATE: '20190627000000',
  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Dataset Empty'
};

var _crDfUrl = function _crDfUrl(_ref) {
  var value = _ref.value,
      _ref$fromDate = _ref.fromDate,
      fromDate = _ref$fromDate === void 0 ? '' : _ref$fromDate,
      apiKey = _ref.apiKey;
  return C.ROOT + "?key=" + apiKey + "&symbol=" + value + "&type=daily&startDate=" + fromDate + "&dividends=0&splits=0";
};

var _crFtUrl = function _crFtUrl(_ref2) {
  var apiKey = _ref2.apiKey,
      value = _ref2.value,
      _ref2$fromDate = _ref2.fromDate,
      fromDate = _ref2$fromDate === void 0 ? '' : _ref2$fromDate;
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