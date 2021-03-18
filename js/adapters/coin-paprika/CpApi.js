"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getCoinId = _fnAdapter["default"].getCoinId;
var C = {
  URL: 'https://api.coinpaprika.com/v1',
  COIN_URL: 'https://coinpaprika.com/coin',
  DF_SUBTITLE: 'Values on 23:59:59 UTC'
};
var _isArr = Array.isArray;

var _crUrlDf = function _crUrlDf(option) {
  var fromDate = option.fromDate,
      _coinId = getCoinId(option);

  option.subtitle = C.DF_SUBTITLE;
  return C.URL + "/coins/" + _coinId + "/ohlcv/historical?start=" + fromDate + "&limit=366";
};

var _crUrlTw = function _crUrlTw(option) {
  var _coinId = getCoinId(option);

  return C.URL + "/coins/" + _coinId + "/twitter";
};

var _crUrlCi = function _crUrlCi(option) {
  var _coinId = getCoinId(option);

  return C.URL + "/coins/" + _coinId;
};

var _rApi = {
  DF: _crUrlDf,
  TW: _crUrlTw,
  CI: _crUrlCi
};
var CpApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfSubId = option.dfSubId,
        _crUrl = _rApi[dfSubId] || _rApi.DF;

    return option._itemUrl = _crUrl(option);
  },
  checkResponse: function checkResponse(json, option) {
    var dfSubId = option.dfSubId;
    return _isArr(json) || dfSubId === 'CI' && json;
  }
};
var _default = CpApi;
exports["default"] = _default;
//# sourceMappingURL=CpApi.js.map