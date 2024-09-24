"use strict";

exports.__esModule = true;
exports.getTimePeriod = exports.getSeriesCollection = exports.getRefArea = exports.getObsValue = exports.crItemId = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const crItemId = _ref => {
  let {
    dfPrefix,
    items,
    seriaType
  } = _ref;
  return (0, _AdapterFn.joinBy)('.', dfPrefix, (0, _CategoryFn.isCategory)(seriaType) ? '*' : items[0].v, items[1].v);
};
exports.crItemId = crItemId;
const getSeriesCollection = str => (0, _AdapterFn.crXmlDocument)(str).getElementsByTagName('Series') || [];
exports.getSeriesCollection = getSeriesCollection;
const getObsValue = element => element ? parseFloat(element.getAttribute("OBS_VALUE")) : null;
exports.getObsValue = getObsValue;
const getTimePeriod = element => element ? (0, _AdapterFn.ymdToUTC)(element.getAttribute("TIME_PERIOD")) : null;
exports.getTimePeriod = getTimePeriod;
const getRefArea = element => element ? element.getAttribute("REF_AREA") : null;
exports.getRefArea = getRefArea;
//# sourceMappingURL=fnAdapter.js.map