"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));

var _rUrl2;

var getValue = _AdapterFn["default"].getValue;
var C = {
  BASE_URL: 'https://cloud.iexapis.com/stable/stock',
  DF_SYMBOL: 'AAPL',
  DF_PERIOD: '1m'
};
var _assign = Object.assign; //company, stats: symbol/dfType

var _crUrlType1 = function _crUrlType1(option) {
  var _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      dfType = option.dfType,
      value = getValue(items[0]);
  option.value = value;
  return C.BASE_URL + "/" + value + "/" + dfType;
};

var _urlDividends = function _urlDividends(option) {
  var _option$items2 = option.items,
      items = _option$items2 === void 0 ? [] : _option$items2,
      dfPeriod = option.dfPeriod,
      value = getValue(items[0]);
  option.value = value;
  return C.BASE_URL + "/" + value + "/dividends/" + dfPeriod;
};

var _urlChart = function _urlChart(option) {
  var _option$items3 = option.items,
      items = _option$items3 === void 0 ? [] : _option$items3,
      one = option.one,
      two = option.two,
      symbol = one || getValue(items[0], {
    dfValue: C.DF_SYMBOL
  }),
      period = two || getValue(items[1], {
    dfValue: C.DF_PERIOD
  });

  _assign(option, {
    symbol: symbol,
    period: period
  });

  return C.BASE_URL + "/" + symbol + "/chart/" + period;
};

var _crUrlMarketList = function _crUrlMarketList(option) {
  var _option$items4 = option.items,
      items = _option$items4 === void 0 ? [] : _option$items4,
      value = getValue(items[0]);
  return {
    url: C.BASE_URL + "/market/list/" + value,
    q: 'listLimit=20&displayPercent=true'
  };
};

var _rUrl = (_rUrl2 = {
  DF: _urlChart
}, _rUrl2[_ItemTypes["default"].DIV] = _urlDividends, _rUrl2[_ItemTypes["default"].CHART] = _urlChart, _rUrl2[_ItemTypes["default"].COM] = _crUrlType1, _rUrl2[_ItemTypes["default"].STA] = _crUrlType1, _rUrl2[_ItemTypes["default"].ML] = _crUrlMarketList, _rUrl2);

var IexApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfType = option.dfType,
        apiKey = option.apiKey,
        _url = (_rUrl[dfType] || _rUrl.DF)(option);

    return _url.q ? _url.url + "?" + _url.q + "&token=" + apiKey : _url + "?token=" + apiKey;
  },
  checkResponse: function checkResponse(json) {
    if (!json) {
      throw {
        errCaption: "Error",
        message: 'Response is empty.'
      };
    }

    return true;
  }
};
var _default = IexApi;
exports["default"] = _default;
//# sourceMappingURL=IexApi.js.map