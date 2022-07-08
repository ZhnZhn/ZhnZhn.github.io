"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.ymdToUTC = exports.valueMoving = exports.roundBy = exports.isTotalByAll = exports.isPositiveNumber = exports.isNotNested = exports.getItemTradeValue = exports.getItemPtTitle = exports.getItemPeriod = exports.getItemCmdDescE = exports.getItemCmdCode = exports.crZhConfig = exports.crInfo = exports.crChartId = exports.crCategoryTitle = void 0;

var _AdapterFn = require("../AdapterFn");

exports.ymdToUTC = _AdapterFn.ymdToUTC;
exports.valueMoving = _AdapterFn.valueMoving;
exports.roundBy = _AdapterFn.roundBy;

var _domSanitize = _interopRequireDefault(require("../../utils/domSanitize"));

var _fnDescr = require("./fnDescr");

const isNumber = n => typeof n === 'number' && n - n === 0;

const isPositiveNumber = n => isNumber(n) && n > 0;

exports.isPositiveNumber = isPositiveNumber;

const isTotalByAll = option => option.tp === 'all' && option.two === 'total';

exports.isTotalByAll = isTotalByAll;

const isNotNested = ptTitle => ptTitle.indexOf(', nes') === -1;

exports.isNotNested = isNotNested;

const getItemTradeValue = item => (item || {}).TradeValue;

exports.getItemTradeValue = getItemTradeValue;

const getItemCmdCode = item => {
  const {
    cmdCode
  } = item || {};
  return (cmdCode || '').length === 2 ? cmdCode : (0, _domSanitize.default)(cmdCode);
};

exports.getItemCmdCode = getItemCmdCode;

const getItemCmdDescE = item => (0, _domSanitize.default)((item || {}).cmdDescE);

exports.getItemCmdDescE = getItemCmdDescE;

const getItemPtTitle = item => (0, _domSanitize.default)((item || {}).ptTitle);

exports.getItemPtTitle = getItemPtTitle;

const getItemPeriod = item => {
  const {
    period
  } = item || {};
  return isNumber(period) ? '' + period : (0, _domSanitize.default)(period);
};

exports.getItemPeriod = getItemPeriod;

const crCategoryTitle = _ref => {
  let {
    title,
    period
  } = _ref;
  return [title, 'in', period].filter(Boolean).join(' ');
};

exports.crCategoryTitle = crCategoryTitle;

const crChartId = _ref2 => {
  let {
    value,
    rg = 2,
    measure,
    tp,
    freq,
    period,
    chart
  } = _ref2;
  return [value, rg, measure, tp, freq, period, chart].filter(Boolean).join("_");
};

exports.crChartId = crChartId;

const crInfo = (json, option) => ({
  frequency: option.period || (option.freq === 'M' ? 'Monthly' : 'Annual'),
  description: (0, _fnDescr.toDescr)(json, option)
});

exports.crInfo = crInfo;

const crZhConfig = function (option, _temp) {
  let {
    isLegend
  } = _temp === void 0 ? {} : _temp;

  const {
    oneC,
    period,
    dataSource
  } = option,
        _id = crChartId(option);

  return {
    id: _id,
    key: _id,
    itemCaption: oneC,
    itemTime: period,
    legend: isLegend ? [] : void 0,
    isWithoutIndicator: true,
    dataSource
  };
};

exports.crZhConfig = crZhConfig;
//# sourceMappingURL=fnAdapter.js.map