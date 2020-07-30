"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var C = {
  URL: 'https://api.binance.com/api/v3/klines?interval=1d'
};
var _isArr = Array.isArray;

var _crDays = function _crDays(_ref) {
  var fromDate = _ref.fromDate;

  var _d = _DateUtils["default"].getDaysFromYmd(fromDate);

  return _d < 1001 ? _d : 1000;
};

var _setCaption = function _setCaption(option, _to) {
  var title = option.title;
  option.title = title.replace(')', "/" + _to + ")");
  option.subtitle = '';
};

var BnApi = {
  getRequestUrl: function getRequestUrl(option) {
    var items = option.items,
        _symbol = items[0].s,
        _to = items[1].v,
        _limit = _crDays(option);

    _setCaption(option, _to);

    return C.URL + "&symbol=" + _symbol + _to + "&limit=" + _limit;
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