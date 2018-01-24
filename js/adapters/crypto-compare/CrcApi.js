'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var C = {
  URL: 'https://min-api.cryptocompare.com/',
  HD: 'data/histoday',
  URL_CI: 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/',
  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Response Empty'
};

var _hdUrl = function _hdUrl(option) {
  var _option$value = option.value,
      value = _option$value === undefined ? '' : _option$value;

  return '' + C.URL + C.HD + '?fsym=' + value + '&tsym=USD&limit=600';
};

var _ciUrl = function _ciUrl(option) {
  var proxy = option.proxy,
      _option$value2 = option.value,
      value = _option$value2 === undefined ? '' : _option$value2;

  return '' + proxy + C.URL_CI + '?id=' + value;
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
      var message = json ? json.Message || '' : C.RESPONSE_EMPTY;
      throw {
        errCaption: C.REQUEST_ERROR,
        message: message
      };
    }
    return true;
  }
};

exports.default = CrcApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\crypto-compare\CrcApi.js.map