"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: 'https://min-api.cryptocompare.com/',
  HD: 'data/histoday',
  URL_CI: 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/',
  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Response Empty'
};

var _hdUrl = function _hdUrl(option) {
  var _option$value = option.value,
      value = _option$value === void 0 ? '' : _option$value;
  return "" + C.URL + C.HD + "?fsym=" + value + "&tsym=USD&limit=600";
};

var _ciUrl = function _ciUrl(option) {
  var proxy = option.proxy,
      _option$value2 = option.value,
      value = _option$value2 === void 0 ? '' : _option$value2;
  return "" + proxy + C.URL_CI + "?id=" + value;
};

var _rUrl = {
  DF: _hdUrl,
  HD: _hdUrl,
  CI: _ciUrl
};
var CrcApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfSubLoadId = option.dfSubLoadId,
        _crUrl = _rUrl[dfSubLoadId] || _rUrl.DF;

    return _crUrl(option);
  },
  checkResponse: function checkResponse(json) {
    if (!(json && json.Response !== 'Error')) {
      throw {
        errCaption: C.REQUEST_ERROR,
        message: json ? json.Message || '' : C.RESPONSE_EMPTY
      };
    }

    return true;
  }
};
var _default = CrcApi;
exports["default"] = _default;
//# sourceMappingURL=CrcApi.js.map