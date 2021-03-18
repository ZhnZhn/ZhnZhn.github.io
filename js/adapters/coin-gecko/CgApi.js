"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DateUtils = _interopRequireDefault(require("../../utils/DateUtils"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var C = {
  API_URL: 'https://api.coingecko.com/api/v3',
  PAGE_URL: 'https://www.coingecko.com/en/coins',
  DF_PAGE: 1,
  DF_PER_PAGE: 10,
  DF_CURRENCY: 'USD'
};
var _assign = Object.assign;
var _isArr = Array.isArray;
var crPageConfig = _fnAdapter["default"].crPageConfig;

var _crDays = function _crDays(_ref) {
  var fromDate = _ref.fromDate;

  var _d = _DateUtils["default"].getDaysFromYmd(fromDate);

  return _d > 90 ? _d : 91;
};

var _assignDf = function _assignDf(option) {
  var items = option.items,
      it1 = items[0],
      it2 = items[1],
      c = it1.c,
      value = it1.v,
      s = it1.s,
      _currency = it2.v,
      _vs = s + "/" + _currency,
      _days = _crDays(option);

  _assign(option, {
    itemCaption: _vs,
    title: c,
    subtitle: 'Values on 00:00 GMT',
    _currency: _currency,
    _nativeUrl: C.PAGE_URL + "/" + value,
    _itemUrl: C.API_URL + "/coins/" + value + "/market_chart?vs_currency=" + _currency + "&days=" + _days
  });
};

var _assignMcl = function _assignMcl(option) {
  var _crPageConfig = crPageConfig(option),
      page = _crPageConfig[0],
      perPage = _crPageConfig[1],
      currency = _crPageConfig[2];

  _assign(option, {
    title: "By Market Cap Page: " + page + " (" + perPage + ")",
    _itemUrl: C.API_URL + "/coins/markets?order=market_cap_desc&page=" + page + "&per_page=" + perPage + "&vs_currency=" + currency + "&price_change_percentage=1h,7d,30d,1y"
  });
};

var _assignEl = function _assignEl(option) {
  var _crPageConfig2 = crPageConfig(option),
      page = _crPageConfig2[0],
      perPage = _crPageConfig2[1];

  _assign(option, {
    title: "By Exchages Page: " + page + " (" + perPage + ")",
    _itemUrl: C.API_URL + "/exchanges?page=" + page + "&per_page=" + perPage
  });
};

var _rAssign = {
  DF: _assignDf,
  MCL: _assignMcl,
  EL: _assignEl
};
var CgApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfSubId = option.dfSubId,
        _assignTo = _rAssign[dfSubId] || _rAssign.DF;

    _assignTo(option);

    return option._itemUrl;
  },
  checkResponse: function checkResponse(json, option) {
    var dfSubId = option.dfSubId;

    if ((dfSubId === 'MCL' || dfSubId === 'EL') && _isArr(json) && json.length > 1) {
      return true;
    }

    if (json && _isArr(json.prices)) {
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