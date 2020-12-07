"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: "https://www.bitstamp.net/api/v2/ohlc"
};
var _isArr = Array.isArray;
var BtApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items,
        pair = items[0].v,
        timeframe = items[1].v,
        limit = items[2].v;
    return C.URL + "/" + pair + "?step=" + timeframe + "&limit=" + limit;
  },
  checkResponse: function checkResponse(json, option) {
    var _ref = json || {},
        data = _ref.data,
        _ref2 = data || {},
        ohlc = _ref2.ohlc,
        pair = _ref2.pair,
        _option$items2 = option.items,
        items = _option$items2 === void 0 ? [] : _option$items2,
        c = items[0].c;

    if (c === pair && _isArr(ohlc)) {
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