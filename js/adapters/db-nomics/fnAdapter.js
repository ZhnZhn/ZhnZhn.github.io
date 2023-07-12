"use strict";

exports.__esModule = true;
exports.getValue = exports.crTitle = exports.crError = exports.crData = exports.crConfOption = exports._assign = void 0;
var _AdapterFn = require("../AdapterFn");
exports.getValue = _AdapterFn.getValue;
exports.crError = _AdapterFn.crError;
var _crFn = require("../crFn");
var _fnSelector = require("./fnSelector");
const _assign = Object.assign;
exports._assign = _assign;
const CHART_URL = 'https://db.nomics.world',
  SUBT_MAX = 60;
const _crId = _ref => {
  let {
    dfProvider,
    dfCode,
    seriaId
  } = _ref;
  return (0, _AdapterFn.joinBy)('/', dfProvider, dfCode, seriaId);
};
const _crItemLink = _crFn.crItemLink.bind(null, 'DBnomics Chart');
const _crUpdatedDate = json => {
  const _date = (0, _fnSelector.getIndexedAt)(json).split('T')[0];
  return _date ? "<p>Updated by DBnomics on " + _date + "</p>" : '';
};
const _crDescr = (json, option) => {
  const _id = _crId(option);
  return "<p>SeriaId: " + _id + "</p>\n   " + _crUpdatedDate(json) + "\n   " + _crItemLink(CHART_URL + '/' + _id);
};
const _crZhConfig = option => {
  const {
      dataSource,
      _itemKey,
      dfProvider,
      dfCode,
      seriaId,
      title
    } = option,
    _id = _itemKey;
  return {
    id: _id,
    key: _id,
    itemCaption: title,
    dataSource,
    itemConf: {
      _itemKey: _id,
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
const _isQuarter = str => ("" + str).indexOf("Q") !== -1;
const _isAnnualQuarter = period => !_isQuarter(period[0]) && _isQuarter(period[1]);
const _crPoint = (date, y) => [(0, _AdapterFn.ymdToUTC)(date), y];
const _crAqPoint = (date, y) => _isQuarter(date) ? _crPoint(date, y) : [];
const crTitle = (_ref2, json) => {
  let {
    title,
    subtitle
  } = _ref2;
  const _ = (0, _fnSelector.getSubtitle)(json),
    _subtitle = _.length > SUBT_MAX ? (0, _AdapterFn.joinBy)(': ', title, subtitle) : _;
  return {
    title: (0, _fnSelector.getTitle)(json),
    subtitle: _subtitle
  };
};
exports.crTitle = crTitle;
const crData = (json, option) => {
  const {
      fromDate
    } = option,
    data = [],
    _xFrom = fromDate ? (0, _AdapterFn.ymdToUTC)(fromDate) : 0,
    {
      period,
      value
    } = (0, _fnSelector.getPeriodAndValue)(json),
    crPoint = _isAnnualQuarter(period) ? _crAqPoint : _crPoint,
    _len = period.length;
  let _arrPoint;
  for (let i = 0; i < _len; i++) {
    _arrPoint = crPoint(period[i], value[i]);
    if (_arrPoint[0] > _xFrom && (0, _AdapterFn.isNumber)(_arrPoint[1])) {
      data.push(_arrPoint);
    }
  }
  return data;
};
exports.crData = crData;
const crConfOption = (option, json) => ({
  zhConfig: _crZhConfig(option),
  info: _crInfo(json, option)
});
exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map