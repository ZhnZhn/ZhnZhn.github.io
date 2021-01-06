"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: "https://www.bitstamp.net/api/v2"
};
var _isArr = Array.isArray;

var _crDfUrl = function _crDfUrl(option) {
  var _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      pair = items[0].v,
      timeframe = items[1].v,
      limit = items[2].v;
  return C.URL + "/ohlc/" + pair + "?step=" + timeframe + "&limit=" + limit;
};

var _crObUrl = function _crObUrl(option) {
  var _option$items2 = option.items,
      items = _option$items2 === void 0 ? [] : _option$items2,
      pair = items[0].v;
  return C.URL + "/order_book/" + pair + "?order=0";
};

var _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};
var BtApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfSubId = option.dfSubId;

    var _crUrl = dfSubId && _rCrUrl[dfSubId] || _rCrUrl.DF;

    return _crUrl(option);
  },
  checkResponse: function checkResponse(json, option) {
    var _ref = json || {},
        data = _ref.data,
        bids = _ref.bids,
        asks = _ref.asks,
        _ref2 = data || {},
        ohlc = _ref2.ohlc,
        pair = _ref2.pair,
        _option$items3 = option.items,
        items = _option$items3 === void 0 ? [] : _option$items3,
        c = items[0].c;

    if (c === pair && _isArr(ohlc) || _isArr(bids) && _isArr(asks)) {
      return true;
    }

    throw {
      errCaption: "Response Empty"
    };
  }
};
var _default = BtApi;
exports["default"] = _default;
//# sourceMappingURL=BtApi.js.map