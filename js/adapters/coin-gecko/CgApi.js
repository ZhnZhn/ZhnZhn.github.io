"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var C = {
  API_URL: 'https://api.coingecko.com/api/v3',
  PAGE_URL: 'https://www.coingecko.com/en/coins'
};

var _crDays = function _crDays(_ref) {
  var fromDate = _ref.fromDate;

  var _d = _DateUtils["default"].getDaysFromYmd(fromDate);

  return _d > 90 ? _d : 91;
};

var _assignTo = function _assignTo(option) {
  var items = option.items,
      it1 = items[0],
      it2 = items[1],
      caption = it1.caption,
      value = it1.value,
      s = it1.s,
      _currency = it2.value,
      _vs = s + "/" + _currency,
      _days = _crDays(option);

  Object.assign(option, {
    itemCaption: _vs,
    title: caption + " (" + _vs + ")",
    subtitle: 'Values on 00:00 GMT',
    _currency: _currency,
    _nativeUrl: C.PAGE_URL + "/" + value,
    _itemUrl: C.API_URL + "/coins/" + value + "/market_chart?vs_currency=" + _currency + "&days=" + _days
  });
};

var CgApi = {
  getRequestUrl: function getRequestUrl(option) {
    _assignTo(option);

    return option._itemUrl;
  },
  checkResponse: function checkResponse(json, option) {
    if (json && Array.isArray(json.prices)) {
      return true;
    }

    throw {
      errCaption: "Response Empty"
    };
  }
};
var _default = CgApi;
exports["default"] = _default;
//# sourceMappingURL=CgApi.js.map