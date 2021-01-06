"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: 'https://api.binance.com/api/v3',
  RESEARCH_URL: 'https://research.binance.com/en/projects',
  TRADE_URL: 'https://binance.com/en/trade'
};
var _isArr = Array.isArray;

var _setLinks = function _setLinks(option, c, s) {
  if (s === void 0) {
    s = '';
  }

  var _toIndex = c.indexOf('('),
      _caption = c.substring(0, _toIndex).trim().toLowerCase().replace(' ', '-'),
      _s = s.replace('/', '_').toLowerCase();

  option._researchLink = C.RESEARCH_URL + "/" + _caption;
  option._tradeLink = C.TRADE_URL + "/" + _s;
};

var _crSymbol = function _crSymbol(s) {
  if (s === void 0) {
    s = '';
  }

  return s.replace('/', '');
};

var _crDfUrl = function _crDfUrl(option) {
  var _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      _items$ = items[0],
      s = _items$.s,
      _items$$c = _items$.c,
      c = _items$$c === void 0 ? '' : _items$$c,
      interval = items[1].v,
      limit = items[2].v,
      _symbol = _crSymbol(s);

  _setLinks(option, c, s);

  return C.URL + "/klines?symbol=" + _symbol + "&interval=" + interval + "&limit=" + limit;
};

var _crObUrl = function _crObUrl(option) {
  var _option$items2 = option.items,
      items = _option$items2 === void 0 ? [] : _option$items2,
      s = items[0].s,
      limit = items[1].v,
      _symbol = _crSymbol(s);

  return C.URL + "/depth?symbol=" + _symbol + "&limit=" + limit;
};

var _rCrUrl = {
  DF: _crDfUrl,
  OB: _crObUrl
};
var BnApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfSubId = option.dfSubId;

    var _crUrl = dfSubId && _rCrUrl[dfSubId] || _rCrUrl.DF;

    return _crUrl(option);
  },
  checkResponse: function checkResponse(json, option) {
    var dfSubId = option.dfSubId;

    if (!dfSubId && _isArr(json)) {
      return true;
    }

    var bids = json.bids,
        asks = json.asks;

    if (dfSubId === 'OB' && _isArr(bids) && _isArr(asks)) {
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