"use strict";

exports.__esModule = true;
exports.getSeriesObservertions = exports.getObservationValues = exports.crItemId = exports.ECB_EUROPA_EU = void 0;
var _AdapterFn = require("../AdapterFn");
const ECB_EUROPA_EU = exports.ECB_EUROPA_EU = "ecb.europa.eu";
const getSeriesObservertions = json => {
  const _series = (((json || {}).dataSets || [])[0] || {}).series || {} || {};
  return (_series[(0, _AdapterFn.getObjectKeys)(_series)[0]] || {}).observations;
};
exports.getSeriesObservertions = getSeriesObservertions;
const getObservationValues = json => (((((json || {}).structure || {}).dimensions || {}).observation || [])[0] || {}).values;
exports.getObservationValues = getObservationValues;
const _crItemDf = items => {
    const _v0 = (0, _AdapterFn.getValue)(items[0]);
    return items.length === 2 ? `${(0, _AdapterFn.getValue)(items[1])}.${_v0}` : _v0;
  },
  _crItem312 = items => (0, _AdapterFn.joinBy)(".", (0, _AdapterFn.getValue)(items[2]), (0, _AdapterFn.getValue)(items[0]), (0, _AdapterFn.getValue)(items[1])),
  _hmCrItem = {
    df: _crItemDf,
    s312: _crItem312
  };
const crItemId = option => {
  const {
      dfFnUrl
    } = option,
    _crItemId = dfFnUrl && _hmCrItem[dfFnUrl] || _hmCrItem.df;
  return (0, _AdapterFn.joinBy)(".", option.dfPrefix, _crItemId(option.items));
};
exports.crItemId = crItemId;
//# sourceMappingURL=fnAdapter.js.map