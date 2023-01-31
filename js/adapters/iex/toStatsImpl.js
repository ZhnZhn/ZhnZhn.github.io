"use strict";

exports.__esModule = true;
exports.default = void 0;
var _toFns = require("./toFns");
const _isFn = fn => typeof fn === 'function';

//const _crCompanyName = ({ companyName }) => companyName || '';
const _crEarningsDate = _ref => {
  let {
    nextEarningsDate
  } = _ref;
  return nextEarningsDate ? 'nextEarningsDate: ' + nextEarningsDate : '';
};
const _fNameValue = propName => json => (0, _toFns.isTypeNumber)(json[propName]) ? propName + ': ' + (0, _toFns.toStr)(json[propName]) : '';
const _crConfig = str => _isFn(str) ? str : _fNameValue(str);
const toStatsImpl = {
  CONFIGS: [
  //_crCompanyName,
  "sharesOutstanding", "float", "employees", "ttmEPS",
  // 12 month tralling
  "ttmDividendRate", "dividendYield", "peRatio", "beta", _crEarningsDate].map(_crConfig),
  crCaption: (_ref2, _ref3) => {
    let {
      marketcap
    } = _ref2;
    let {
      items
    } = _ref3;
    return (0, _toFns.getValue)(items[0]) + ': ' + (0, _toFns.toStr)(marketcap);
  },
  crTokensName: _ref4 => {
    let {
      companyName
    } = _ref4;
    return companyName || '';
  },
  crDescrName: () => 'ChangePercent',
  crDescrStyle: () => ({
    fontWeight: 'bold',
    whiteSpace: 'pre'
  }),
  crDescr: json => "  5Y: " + (0, _toFns.toPerc)(json.year5ChangePercent) + "\n  2Y: " + (0, _toFns.toPerc)(json.year2ChangePercent) + "\n  1Y: " + (0, _toFns.toPerc)(json.year1ChangePercent) + "\n  YTD: " + (0, _toFns.toPerc)(json.ytdChangePercent) + "\n\n  6M: " + (0, _toFns.toPerc)(json.month6ChangePercent) + "\n  3M: " + (0, _toFns.toPerc)(json.month3ChangePercent) + "\n  1M: " + (0, _toFns.toPerc)(json.month1ChangePercent) + "\n  5D: " + (0, _toFns.toPerc)(json.day5ChangePercent)
};
var _default = toStatsImpl;
exports.default = _default;
//# sourceMappingURL=toStatsImpl.js.map