"use strict";

exports.__esModule = true;
exports.getSeriesObservertions = exports.getSeries = exports.getObservationValues = exports.getDimensions = exports.findCategoryIndex = exports.crItemId = exports.ECB_EUROPA_EU = void 0;
var _arrFn = require("../../utils/arrFn");
var _isTypeFn = require("../../utils/isTypeFn");
var _objFn = require("../../utils/objFn");
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const ECB_EUROPA_EU = exports.ECB_EUROPA_EU = "ecb.europa.eu";
const getSeries = json => (0, _objFn.getByPropsFrom)(json, "dataSets", 0, "series");
exports.getSeries = getSeries;
const getSeriesObservertions = json => {
  const _series = getSeries(json);
  return (_series[(0, _isTypeFn.getObjectKeys)(_series)[0]] || {}).observations;
};
exports.getSeriesObservertions = getSeriesObservertions;
const getDimensions = json => (0, _objFn.getByPropsFrom)(json, "structure", "dimensions");
exports.getDimensions = getDimensions;
const getObservationValues = json => (0, _objFn.getByPropsFrom)(getDimensions(json), "observation", 0, "values");
exports.getObservationValues = getObservationValues;
const _crItemDf = items => {
    const _v0 = (0, _AdapterFn.getValue)(items[0]);
    return items.length === 2 ? `${(0, _AdapterFn.getValue)(items[1])}.${_v0}` : _v0;
  },
  _crItem12 = (items, seriaType) => `${(0, _CategoryFn.isCategory)(seriaType) ? "" : (0, _AdapterFn.getValue)(items[0])}.${(0, _AdapterFn.getValue)(items[1])}`,
  _crItem312 = items => (0, _arrFn.joinByDot)((0, _AdapterFn.getValue)(items[2]), (0, _AdapterFn.getValue)(items[0]), (0, _AdapterFn.getValue)(items[1])),
  _routersCrItem = {
    s12: _crItem12,
    s312: _crItem312
  },
  _getCrItemId = (0, _AdapterFn.crGetRoute)(_routersCrItem, _crItemDf);
const crItemId = option => {
  const _crItemId = _getCrItemId(option.dfFnUrl);
  return (0, _arrFn.joinByDot)(option.dfPrefix, _crItemId(option.items, option.seriaType));
};
exports.crItemId = crItemId;
const findCategoryIndex = option => crItemId(option).split(".").findIndex(token => token === "");
exports.findCategoryIndex = findCategoryIndex;
//# sourceMappingURL=fnAdapter.js.map