"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ymdToUTC = exports.valueMoving = exports.sortDescByPnValue = exports.roundBy = exports.isTotalByAll = exports.isCategorySet = exports.isAggrCalculatedCase = exports.isAggrByTotalWorld = exports.isAggr = exports.getItemTradeValue = exports.getItemPeriod = exports.getItemCmdDescE = exports.getItemCmdCode = exports.getHmTradePartners = exports.crZhConfig = exports.crInfo = exports.crEmptyHmObject = exports.crChartId = exports.crCategoryTitle = exports.crCategoryData = void 0;
var _AdapterFn = require("../AdapterFn");
exports.isNumber = _AdapterFn.isNumber;
exports.isPositiveNumber = _AdapterFn.isPositiveNumber;
exports.ymdToUTC = _AdapterFn.ymdToUTC;
exports.valueMoving = _AdapterFn.valueMoving;
exports.roundBy = _AdapterFn.roundBy;
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
exports.sortDescByPnValue = _compareByFn.sortDescByPnValue;
var _domSanitize = _interopRequireDefault(require("../../utils/domSanitize"));
var _formatNumber = _interopRequireDefault(require("../../utils/formatNumber"));
var _fnDescr = require("./fnDescr");
var _conf = require("./conf");
const _sanitizeNumber = v => (0, _AdapterFn.isNumber)(v) ? '' + v : (0, _domSanitize.default)(v);
const crEmptyHmObject = () => Object.create(null);
exports.crEmptyHmObject = crEmptyHmObject;
const isAggr = v => v === 'AG2';
exports.isAggr = isAggr;
const isTotalByAll = option => option.two === 'TOTAL';
exports.isTotalByAll = isTotalByAll;
const isAggrByTotalWorld = option => isTotalByAll(option) && (!option.tp || option.tp === '0') && option.chart !== 'SPLINE';
exports.isAggrByTotalWorld = isAggrByTotalWorld;
const isCategorySet = _ref => {
  let {
    chType
  } = _ref;
  return chType && (0, _CategoryFn.isColumnOrBarCategory)(chType.value);
};
exports.isCategorySet = isCategorySet;
const getItemTradeValue = item => Math.round((item || {}).primaryValue || 0) || 0;
exports.getItemTradeValue = getItemTradeValue;
const getItemCmdCode = item => {
  const {
    cmdCode
  } = item || {};
  return (cmdCode || '').length < 4 ? cmdCode : (0, _domSanitize.default)(cmdCode);
};
exports.getItemCmdCode = getItemCmdCode;
const getItemCmdDescE = item => (0, _domSanitize.default)((item || {}).cmdDescE);
exports.getItemCmdDescE = getItemCmdDescE;
const _fGetItemNumberPropValueByName = propName => item => _sanitizeNumber((item || {})[propName]);
const _getItemPartnerCode = _fGetItemNumberPropValueByName('partnerCode');
const _getItemReporterCode = _fGetItemNumberPropValueByName('reporterCode');
const getItemPeriod = exports.getItemPeriod = _fGetItemNumberPropValueByName('period');
const _isSameTradePartnerCode = item => item && (item.partnerCode === item.partner2Code || item.partner2Code === 0);
let _hmTradePartner;
const getHmTradePartners = tradePartners => {
  if (_hmTradePartner) {
    return _hmTradePartner;
  }
  if (!(0, _AdapterFn.isArr)(tradePartners)) {
    return crEmptyHmObject();
  }
  _hmTradePartner = tradePartners.reduce((hm, item) => {
    if (item && item.v && item.v.length < 4 && item.c) {
      hm[item.v] = (0, _domSanitize.default)(item.c);
    }
    return hm;
  }, crEmptyHmObject());
  return _hmTradePartner;
};
exports.getHmTradePartners = getHmTradePartners;
const _getItemTradePartnerFromHm = (hmTradePartners, item) => {
  const partnerCode = _getItemPartnerCode(item);
  return hmTradePartners[partnerCode] || partnerCode;
};
const _getItemTradeReporterFromHm = (hmTradePartners, item) => {
  const reporterCode = _getItemReporterCode(item);
  return hmTradePartners[reporterCode] || reporterCode;
};
const isAggrCalculatedCase = (reporterCode, tfType) => reporterCode === '0' || tfType === 't1';
exports.isAggrCalculatedCase = isAggrCalculatedCase;
const _fCrCategoryDataPoint = (option, crDataPoint) => {
  const _crCategory = isAggrCalculatedCase(option.one, option.tfType) ? _getItemTradeReporterFromHm : _getItemTradePartnerFromHm;
  return (value, hmTradePartners, item) => crDataPoint(value, _crCategory(hmTradePartners, item), item);
};
const crCategoryData = (json, option, crDataPoint) => {
  const data = [],
    _hmTradePartners = getHmTradePartners(option.tradePartners),
    _crDataPoint = _fCrCategoryDataPoint(option, crDataPoint);
  let totalOfWorld = 0,
    totalOfItems = 0;
  json.data.forEach(item => {
    const value = getItemTradeValue(item),
      partnerCode = _getItemPartnerCode(item);
    if (option.one !== _conf.WORLD_CODE && partnerCode === _conf.WORLD_CODE && _isSameTradePartnerCode(item)) {
      totalOfWorld = value;
    } else if ((0, _AdapterFn.isPositiveNumber)(value) && _isSameTradePartnerCode(item)) {
      totalOfItems += value;
      data.push(_crDataPoint(value, _hmTradePartners, item));
    }
  });
  return [data, totalOfWorld || totalOfItems];
};
exports.crCategoryData = crCategoryData;
const crCategoryTitle = _ref2 => {
  let {
    title,
    period
  } = _ref2;
  return (0, _AdapterFn.joinBy)(" ", title, "in", period);
};
exports.crCategoryTitle = crCategoryTitle;
const crChartId = _ref3 => {
  let {
    value,
    rg = 2,
    measure,
    tp,
    freq,
    period,
    chart,
    time
  } = _ref3;
  return (0, _AdapterFn.joinBy)("_", value, rg, measure, tp, freq, period, chart, time);
};
exports.crChartId = crChartId;
const crInfo = (json, option) => ({
  frequency: option.period || (option.freq === 'M' ? 'Monthly' : 'Annual'),
  description: (0, _fnDescr.toDescr)(json, option)
});
exports.crInfo = crInfo;
const crZhConfig = function (option, _temp) {
  let {
    itemValue,
    isLegend,
    isWi = true
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
    itemValue: itemValue && (0, _formatNumber.default)(itemValue),
    itemTime: period,
    legend: isLegend ? [] : void 0,
    isWithoutIndicator: isWi,
    dataSource
  };
};
exports.crZhConfig = crZhConfig;
//# sourceMappingURL=fnAdapter.js.map