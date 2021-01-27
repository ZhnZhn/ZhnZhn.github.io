"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _toFns = _interopRequireDefault(require("./toFns"));

var getValue = _toFns["default"].getValue,
    toStr = _toFns["default"].toStr,
    toPerc = _toFns["default"].toPerc;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
}; //const _crCompanyName = ({ companyName }) => companyName || '';


var _crEarningsDate = function _crEarningsDate(_ref) {
  var nextEarningsDate = _ref.nextEarningsDate;
  return nextEarningsDate ? 'nextEarningsDate: ' + nextEarningsDate : '';
};

var _fNameValue = function _fNameValue(propName) {
  return function (json) {
    return _isNumber(json[propName]) ? propName + ': ' + toStr(json[propName]) : '';
  };
};

var _crConfig = function _crConfig(str) {
  return _isFn(str) ? str : _fNameValue(str);
};

var toStatsImpl = {
  CONFIGS: [//_crCompanyName,
  "sharesOutstanding", "float", "employees", "ttmEPS", // 12 month tralling
  "ttmDividendRate", "dividendYield", "peRatio", "beta", _crEarningsDate].map(_crConfig),
  crCaption: function crCaption(_ref2, _ref3) {
    var marketcap = _ref2.marketcap;
    var items = _ref3.items;
    return getValue(items[0]) + ': ' + toStr(marketcap);
  },
  crTokensName: function crTokensName(_ref4) {
    var companyName = _ref4.companyName;
    return companyName || '';
  },
  crDescrName: function crDescrName() {
    return 'ChangePercent';
  },
  crDescrStyle: function crDescrStyle() {
    return {
      fontWeight: 'bold',
      whiteSpace: 'pre'
    };
  },
  crDescr: function crDescr(json) {
    return "  5Y: " + toPerc(json.year5ChangePercent) + "\n  2Y: " + toPerc(json.year2ChangePercent) + "\n  1Y: " + toPerc(json.year1ChangePercent) + "\n  YTD: " + toPerc(json.ytdChangePercent) + "\n\n  6M: " + toPerc(json.month6ChangePercent) + "\n  3M: " + toPerc(json.month3ChangePercent) + "\n  1M: " + toPerc(json.month1ChangePercent) + "\n  5D: " + toPerc(json.day5ChangePercent);
  }
};
var _default = toStatsImpl;
exports["default"] = _default;
//# sourceMappingURL=toStatsImpl.js.map