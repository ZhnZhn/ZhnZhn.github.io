"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var C = {
  URL: "https://api-pub.bitfinex.com/v2"
};
var _isArr = Array.isArray,
    crError = _AdapterFn["default"].crError;

var _crDfUrl = function _crDfUrl(option) {
  var proxy = option.proxy,
      _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      pair = items[0].v,
      timeframe = items[1].v,
      limit = items[2].v;
  option.timeframe = timeframe;
  return "" + proxy + C.URL + "/candles/trade:" + timeframe + ":t" + pair + "/hist?limit=" + limit;
};

var _crObUrl = function _crObUrl(option) {
  var proxy = option.proxy,
      _option$items2 = option.items,
      items = _option$items2 === void 0 ? [] : _option$items2,
      pair = items[0].v,
      len = items[1].v;
  return "" + proxy + C.URL + "/book/t" + pair + "/P0?len=" + len;
};

var _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};
var BfApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfSubId = option.dfSubId,
        _crUrl = dfSubId && _rCrUrl[dfSubId] || _rCrUrl.DF;

    return _crUrl(option);
  },
  checkResponse: function checkResponse(json, option) {
    if (!_isArr(json)) {
      throw crError();
    }

    return true;
  }
};
var _default = BfApi;
exports["default"] = _default;
//# sourceMappingURL=BfApi.js.map