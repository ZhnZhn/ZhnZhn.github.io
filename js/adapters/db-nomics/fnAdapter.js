"use strict";

exports.__esModule = true;
exports.getTitle = exports.getSubtitle = exports.getPeriodAndValue = exports.getIndexedAt = exports.getDocs = exports.crTitle = exports.crData = exports.crConfOption = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _arrFn = require("../../utils/arrFn");
var _strFn = require("../../utils/strFn");
var _AdapterFn = require("../AdapterFn");
var _crFn = require("../crFn");
const CHART_URL = 'https://db.nomics.world',
  SUBT_MAX = 60;
const getDocs = json => json?.series?.docs;
exports.getDocs = getDocs;
const _getByPropName = (json, propName) => getDocs(json)?.[0]?.[propName] || '';
const _fGetByPropName = propName => json => _getByPropName(json, propName);
const getPeriodAndValue = json => [_getByPropName(json, 'period'), _getByPropName(json, 'value')];
exports.getPeriodAndValue = getPeriodAndValue;
const getTitle = exports.getTitle = _fGetByPropName('dataset_name');
const getSubtitle = exports.getSubtitle = _fGetByPropName('series_name');
const getIndexedAt = exports.getIndexedAt = _fGetByPropName('indexed_at');
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
  const _date = getIndexedAt(json).split('T')[0];
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
  name: getSubtitle(json),
  description: _crDescr(json, option)
});
const _isQuarter = str => (0, _strFn.isTokenInStr)(str, "Q");
const _isAnnualQuarter = period => !_isQuarter(period[0]) && _isQuarter(period[1]);
const _crPoint = (date, y) => [(0, _AdapterFn.ymdToUTC)(date), y];
const _crAqPoint = (date, y) => _isQuarter(date) ? _crPoint(date, y) : [];
const crTitle = (_ref2, json) => {
  let {
    title,
    subtitle
  } = _ref2;
  const _subtitle = getSubtitle(json);
  return {
    title: getTitle(json),
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
    [period, value] = getPeriodAndValue(json),
    crPoint = _isAnnualQuarter(period) ? _crAqPoint : _crPoint;
  let _arrPoint;
  return period.reduce((_data, periodItem, index) => {
    _arrPoint = crPoint(periodItem, value[index]);
    if (_arrPoint[0] > _xFrom && (0, _isTypeFn.isNumber)(_arrPoint[1]) && _arrPoint[0] !== _getRecentPoint(_data)[0]) {
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