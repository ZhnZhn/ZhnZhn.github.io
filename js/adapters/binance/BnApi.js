"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var C = {
  URL: 'https://api.binance.com/api/v3/klines?interval=1d',
  RESEARCH_URL: 'https://research.binance.com/en/projects',
  TRADE_URL: 'https://binance.com/en/trade'
};
var _isArr = Array.isArray;

var _crDays = function _crDays(_ref) {
  var fromDate = _ref.fromDate;

  var _d = _DateUtils["default"].getDaysFromYmd(fromDate);

  return _d < 1001 ? _d : 1000;
};

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
        _ref2 = items[0] || {},
        _ref2$s = _ref2.s,
        s = _ref2$s === void 0 ? '' : _ref2$s,
        _ref2$c = _ref2.c,
        c = _ref2$c === void 0 ? '' : _ref2$c,
        _symbol = s.replace('/', ''),
        _limit = _crDays(option);

    _setLinks(option, c, s);

    return C.URL + "&symbol=" + _symbol + "&limit=" + _limit;
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