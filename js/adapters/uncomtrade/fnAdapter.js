"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ymdToUTC = exports.valueMoving = exports.sortDescByPnValue = exports.roundBy = exports.isCategoryByPartnerCase = exports.isAggregateByHs = exports.getItemTradeValue = exports.getItemPeriod = exports.getItemCmdDescE = exports.getItemCmdCode = exports.getHmTradePartners = exports.crZhConfig = exports.crInfo = exports.crEmptyHmObject = exports.crChartId = exports.crCategoryTitle = exports.crCategoryData = exports.addSumOfPercentToSubtitle = void 0;
var _AdapterFn = require("../AdapterFn");
exports.isNumber = _AdapterFn.isNumber;
exports.isPositiveNumber = _AdapterFn.isPositiveNumber;
exports.ymdToUTC = _AdapterFn.ymdToUTC;
exports.valueMoving = _AdapterFn.valueMoving;
exports.roundBy = _AdapterFn.roundBy;
var _ChartType = require("../../constants/ChartType");
var _arrFn = require("../../utils/arrFn");
var _CategoryFn = require("../CategoryFn");
var _compareByFn = require("../compareByFn");
exports.sortDescByPnValue = _compareByFn.sortDescByPnValue;
var _formatNumber = _interopRequireDefault(require("../../utils/formatNumber"));
var _fnDescr = require("./fnDescr");
var _conf = require("./conf");
const _sanitizeNumber = v => (0, _AdapterFn.isNumber)(v) ? '' + v : (0, _AdapterFn.domSanitize)(v);
const crEmptyHmObject = () => Object.create(null);
exports.crEmptyHmObject = crEmptyHmObject;
const isAggregateByHs = option => option.two === 'AG2';
exports.isAggregateByHs = isAggregateByHs;
const isCategoryByPartnerCase = option => (0, _CategoryFn.isCategory)(option) || option.seriaType === _ChartType.CHT_DOT_SET;
exports.isCategoryByPartnerCase = isCategoryByPartnerCase;
const getItemTradeValue = item => Math.round((item || {}).primaryValue || 0) || 0;
exports.getItemTradeValue = getItemTradeValue;
const getItemCmdCode = item => {
  const {
    cmdCode
  } = item || {};
  return (cmdCode || '').length < 4 ? cmdCode : (0, _AdapterFn.domSanitize)(cmdCode);
};
exports.getItemCmdCode = getItemCmdCode;
const getItemCmdDescE = item => (0, _AdapterFn.domSanitize)((item || {}).cmdDescE);
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
      hm[item.v] = (0, _AdapterFn.domSanitize)(item.c).replace(`(${item.v})`, '').trim();
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
const _isAggrCalculatedCase = (reporterCode, tfType) => reporterCode === '0' || tfType === 't1';
const _fCrCategoryDataPoint = (option, crDataPoint) => {
  const _crCategory = _isAggrCalculatedCase(option.one, option.tfType) ? _getItemTradeReporterFromHm : _getItemTradePartnerFromHm;
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
const crCategoryTitle = _ref => {
  let {
    title
  } = _ref;
  return title;
};
exports.crCategoryTitle = crCategoryTitle;
const addSumOfPercentToSubtitle = (option, sumOfPercentLevel1, sumOfPercentLevel2) => {
  option.subtitle = (0, _arrFn.joinByBlank)(option.subtitle, `(${sumOfPercentLevel1}%, ${sumOfPercentLevel2}%)`);
};
exports.addSumOfPercentToSubtitle = addSumOfPercentToSubtitle;
const crChartId = _ref2 => {
  let {
    value,
    rg = 2,
    measure,
    tp,
    freq,
    chart,
    time
  } = _ref2;
  return (0, _arrFn.joinByUndescore)(value, rg, measure, tp, freq, chart, time);
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
    isWi = true
  } = _temp === void 0 ? {} : _temp;
  const _id = crChartId(option);
  return {
    id: _id,
    key: _id,
    itemCaption: option.oneC,
    itemValue: itemValue && (0, _formatNumber.default)(itemValue),
    itemTime: option.time,
    isWithoutIndicator: isWi,
    dataSource: option.dataSource
  };
};
exports.crZhConfig = crZhConfig;
//# sourceMappingURL=fnAdapter.js.map