"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _toFns = _interopRequireDefault(require("./toFns"));

const {
  getValue,
  toStr,
  toPerc
} = _toFns.default;

const _isFn = fn => typeof fn === 'function'; //const _crCompanyName = ({ companyName }) => companyName || '';


const _crEarningsDate = _ref => {
  let {
    nextEarningsDate
  } = _ref;
  return nextEarningsDate ? 'nextEarningsDate: ' + nextEarningsDate : '';
};

const _fNameValue = propName => json => (0, _AdapterFn.isTypeNumber)(json[propName]) ? propName + ': ' + toStr(json[propName]) : '';

const _crConfig = str => _isFn(str) ? str : _fNameValue(str);

const toStatsImpl = {
  CONFIGS: [//_crCompanyName,
  "sharesOutstanding", "float", "employees", "ttmEPS", // 12 month tralling
  "ttmDividendRate", "dividendYield", "peRatio", "beta", _crEarningsDate].map(_crConfig),
  crCaption: (_ref2, _ref3) => {
    let {
      marketcap
    } = _ref2;
    let {
      items
    } = _ref3;
    return getValue(items[0]) + ': ' + toStr(marketcap);
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
  crDescr: json => "  5Y: " + toPerc(json.year5ChangePercent) + "\n  2Y: " + toPerc(json.year2ChangePercent) + "\n  1Y: " + toPerc(json.year1ChangePercent) + "\n  YTD: " + toPerc(json.ytdChangePercent) + "\n\n  6M: " + toPerc(json.month6ChangePercent) + "\n  3M: " + toPerc(json.month3ChangePercent) + "\n  1M: " + toPerc(json.month1ChangePercent) + "\n  5D: " + toPerc(json.day5ChangePercent)
};
var _default = toStatsImpl;
exports.default = _default;
//# sourceMappingURL=toStatsImpl.js.map