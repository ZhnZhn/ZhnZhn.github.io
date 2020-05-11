"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ItemTypes = _interopRequireDefault(require("./ItemTypes"));

var _rUrl2;

var C = {
  BASE_URL: 'https://cloud.iexapis.com/stable/stock',
  DF_SYMBOL: 'AAPL',
  DF_PERIOD: '1m'
}; //earning, company, stats : symbol/suffix

var _crUrlType1 = function _crUrlType1(option) {
  var _option$value = option.value,
      value = _option$value === void 0 ? '' : _option$value;
  return C.BASE_URL + "/" + value;
};

var _urlDividends = function _urlDividends(option) {
  var _option$value2 = option.value,
      value = _option$value2 === void 0 ? '' : _option$value2,
      dfPeriod = option.dfPeriod;
  return C.BASE_URL + "/" + value + "/dividends/" + dfPeriod;
};

var _urlChart = function _urlChart(option) {
  var one = option.one,
      two = option.two,
      symbol = option.symbol,
      dfPeriod = option.dfPeriod,
      _symbol = one || symbol || C.DF_SYMBOL,
      _period = two || dfPeriod || C.DF_PERIOD;

  option.one = _symbol;
  option.two = _period;
  return C.BASE_URL + "/" + _symbol + "/chart/" + _period;
};

var _crUrlMarketList = function _crUrlMarketList(option) {
  var value = option.value;
  return {
    url: C.BASE_URL + "/market/list/" + value,
    q: 'listLimit=20&displayPercent=true'
  };
};

var _rUrl = (_rUrl2 = {
  DF: _urlChart
}, _rUrl2[_ItemTypes["default"].ERN] = _crUrlType1, _rUrl2[_ItemTypes["default"].DIV] = _urlDividends, _rUrl2[_ItemTypes["default"].CHART] = _urlChart, _rUrl2[_ItemTypes["default"].COM] = _crUrlType1, _rUrl2[_ItemTypes["default"].STA] = _crUrlType1, _rUrl2[_ItemTypes["default"].ML] = _crUrlMarketList, _rUrl2);

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