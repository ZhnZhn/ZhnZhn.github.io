"use strict";

exports.__esModule = true;
exports.isArr = exports.getValue = exports.getDocs = exports.crTitle = exports.crErrorByMessage = exports.crData = exports.crConfOption = exports.assign = void 0;
var _AdapterFn = require("../AdapterFn");
exports.isArr = _AdapterFn.isArr;
exports.assign = _AdapterFn.assign;
exports.getValue = _AdapterFn.getValue;
exports.crErrorByMessage = _AdapterFn.crErrorByMessage;
var _arrFn = require("../../utils/arrFn");
var _crFn = require("../crFn");
var _fnSelector = require("./fnSelector");
const CHART_URL = 'https://db.nomics.world',
  SUBT_MAX = 60;
const getDocs = json => ((json || {}).series || {}).docs || {};
exports.getDocs = getDocs;
const _crId = _ref => {
  let {
    dfProvider,
    dfCode,
    seriaId
  } = _ref;
  return (0, _arrFn.joinBy)('/', dfProvider, dfCode, seriaId);
};
const _crItemLink = (0, _crFn.fCrItemLinkByCaption)('DBnomics Chart');
const _crUpdatedDate = json => {
  const _date = (0, _fnSelector.getIndexedAt)(json).split('T')[0];
  return _date ? `<p>Updated by DBnomics on ${_date}</p>` : '';
};
const _crDescr = (json, option) => {
  const _id = _crId(option);
  return `<p>SeriaId: ${_id}</p>
   ${_crUpdatedDate(json)}
   ${_crItemLink(CHART_URL + '/' + _id)}`;
};
const _crZhConfig = option => {
  const {
    dataSource,
    _itemKey,
    dfProvider,
    dfCode,
    seriaId,
    title
  } = option;
  return {
    ...(0, _AdapterFn.crZhConfig)({
      itemCaption: title,
      _itemKey,
      dataSource
    }),
    itemConf: {
      _itemKey,
      ...(0, _crFn.crItemConf)(option),
      dataSource,
      dfProvider,
      dfCode,
      seriaId
    }
  };
};
const _crInfo = (json, option) => ({
  name: (0, _fnSelector.getSubtitle)(json),
  description: _crDescr(json, option)
});
const _isQuarter = str => (0, _AdapterFn.isTokenInStr)(str, "Q");
const _isAnnualQuarter = period => !_isQuarter(period[0]) && _isQuarter(period[1]);
const _crPoint = (date, y) => [(0, _AdapterFn.ymdToUTC)(date), y];
const _crAqPoint = (date, y) => _isQuarter(date) ? _crPoint(date, y) : [];
const crTitle = (_ref2, json) => {
  let {
    title,
    subtitle
  } = _ref2;
  const _subtitle = (0, _fnSelector.getSubtitle)(json);
  return {
    title: (0, _fnSelector.getTitle)(json),
    subtitle: _subtitle.length > SUBT_MAX ? (0, _arrFn.joinByColon)(title, subtitle) : _subtitle
  };
};
exports.crTitle = crTitle;
const _getRecentPoint = arr => arr[arr.length - 1] || [];
const crData = (json, option) => {
  const {
      fromDate
    } = option,
    _xFrom = fromDate ? (0, _AdapterFn.ymdToUTC)(fromDate) : 0,
    [period, value] = (0, _fnSelector.getPeriodAndValue)(json),
    crPoint = _isAnnualQuarter(period) ? _crAqPoint : _crPoint;
  let _arrPoint;
  return period.reduce((_data, periodItem, index) => {
    _arrPoint = crPoint(periodItem, value[index]);
    if (_arrPoint[0] > _xFrom && (0, _AdapterFn.isNumber)(_arrPoint[1]) && _arrPoint[0] !== _getRecentPoint(_data)[0]) {
      _data.push(_arrPoint);
    }
    return _data;
  }, []);
};
exports.crData = crData;
const crConfOption = (option, json) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(json, option)
});
exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map