"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: 'https://api.binance.com/api/v3/klines',
  RESEARCH_URL: 'https://research.binance.com/en/projects',
  TRADE_URL: 'https://binance.com/en/trade'
};
var _isArr = Array.isArray;

var _setLinks = function _setLinks(option, c, s) {
  var _toIndex = c.indexOf('('),
      _caption = c.substring(0, _toIndex).trim().toLowerCase().replace(' ', '-'),
      _s = s.replace('/', '_').toLowerCase();

  option._researchLink = C.RESEARCH_URL + "/" + _caption;
  option._tradeLink = C.TRADE_URL + "/" + _s;
};

var BnApi = {
  getRequestUrl: function getRequestUrl(option) {
    var _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items,
        _items$ = items[0],
        _items$$s = _items$.s,
        s = _items$$s === void 0 ? '' : _items$$s,
        _items$$c = _items$.c,
        c = _items$$c === void 0 ? '' : _items$$c,
        interval = items[1].v,
        limit = items[2].v,
        _symbol = s.replace('/', '');

    _setLinks(option, c, s);

    return C.URL + "?symbol=" + _symbol + "&interval=" + interval + "&limit=" + limit;
  },
  checkResponse: function checkResponse(json, option) {
    if (_isArr(json)) {
      return true;
    }

    throw {
      errCaption: "Response Empty"
    };
  }
};
var _default = BnApi;
exports["default"] = _default;
//# sourceMappingURL=BnApi.js.map