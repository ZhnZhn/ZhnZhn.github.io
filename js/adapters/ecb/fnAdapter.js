"use strict";

exports.__esModule = true;
exports.getSeriesObservertions = exports.getSeries = exports.getObservationValues = exports.getDimensions = exports.crItemId = exports.ECB_EUROPA_EU = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const ECB_EUROPA_EU = exports.ECB_EUROPA_EU = "ecb.europa.eu";
const getSeries = json => (((json || {}).dataSets || [])[0] || {}).series || {} || {};
exports.getSeries = getSeries;
const getSeriesObservertions = json => {
  const _series = getSeries(json);
  return (_series[(0, _AdapterFn.getObjectKeys)(_series)[0]] || {}).observations;
};
exports.getSeriesObservertions = getSeriesObservertions;
const getDimensions = json => ((json || {}).structure || {}).dimensions || {};
exports.getDimensions = getDimensions;
const getObservationValues = json => ((getDimensions(json).observation || [])[0] || {}).values;
exports.getObservationValues = getObservationValues;
const _crItemDf = items => {
    const _v0 = (0, _AdapterFn.getValue)(items[0]);
    return items.length === 2 ? `${(0, _AdapterFn.getValue)(items[1])}.${_v0}` : _v0;
  },
  _crItem12 = (items, seriaType) => `${(0, _CategoryFn.isCategory)(seriaType) ? "" : (0, _AdapterFn.getValue)(items[0])}.${(0, _AdapterFn.getValue)(items[1])}`,
  _crItem312 = items => (0, _AdapterFn.joinBy)(".", (0, _AdapterFn.getValue)(items[2]), (0, _AdapterFn.getValue)(items[0]), (0, _AdapterFn.getValue)(items[1])),
  _hmCrItem = {
    df: _crItemDf,
    s12: _crItem12,
    s312: _crItem312
  };
const crItemId = option => {
  const {
      dfFnUrl
    } = option,
    _crItemId = dfFnUrl && _hmCrItem[dfFnUrl] || _hmCrItem.df;
  return (0, _AdapterFn.joinBy)(".", option.dfPrefix, _crItemId(option.items, option.seriaType));
};
exports.crItemId = crItemId;
//# sourceMappingURL=fnAdapter.js.map