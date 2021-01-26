"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue;
var C = {
  URL: 'https://min-api.cryptocompare.com',
  //HD: 'data/histoday',
  QUERY_TAIL: 'extraParams=webapperc',
  REQUEST_ERROR: 'Request Error',
  RESPONSE_EMPTY: 'Response Empty',
  DF_ID: 'BTC',
  DF_E: 'CCCAGG',
  DF_INTERVAL: 'histoday'
};

var _assign = Object.assign,
    _fGetParam = function _fGetParam(index, dfValue) {
  return function (items) {
    return getValue(items[index], {
      dfValue: dfValue
    });
  };
},
    _getFsym = _fGetParam(0, C.DF_ID),
    _getE = _fGetParam(1, C.DF_E),
    _getInterval = _fGetParam(2, C.DF_INTERVAL);

var _hdUrl = function _hdUrl(option) {
  var _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      value = _getFsym(items),
      exchange = _getE(items),
      interval = _getInterval(items),
      tsym = exchange === 'Binance' ? 'USDT' : 'USD';

  _assign(option, {
    value: value,
    exchange: exchange,
    tsym: tsym
  });

  return C.URL + "/data/" + interval + "?fsym=" + value + "&e=" + exchange + "&tsym=" + tsym + "&limit=600&" + C.QUERY_TAIL;
};

var _rUrl = {
  DF: _hdUrl,
  HD: _hdUrl
};
var CrcApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfSubId = option.dfSubId,
        _crUrl = _rUrl[dfSubId] || _rUrl.DF;

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