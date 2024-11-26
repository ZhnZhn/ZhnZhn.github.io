"use strict";

exports.__esModule = true;
exports.getRefAreaIndex = exports.getJsonData = exports.getDataSeries = exports.getDataDimensions = exports.crObservationPropName = exports.crItemId = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const _getRefArea = (isCategory, items) => isCategory ? "" : (0, _AdapterFn.getValue)(items[0]);
const _crItemId = (isCategory, items) => `${_getRefArea(isCategory, items)}.Q.${(0, _AdapterFn.getValue)(items[1])}.IX`;
const _crItemIdHhi = (isCategory, items) => `Q.${_getRefArea(isCategory, items)}.${(0, _AdapterFn.getValue)(items[1])}`;
const _crItemIdMdf = (isCategory, items) => `${_getRefArea(isCategory, items)}.Q......${(0, _AdapterFn.getValue)(items[1])}`;
const _crItemIdNvr = (isCategory, items) => `${_getRefArea(isCategory, items)}.Q.....${(0, _AdapterFn.getValue)(items[1])}.`;
const _crItemIdMvt = (isCategory, items) => `${_getRefArea(isCategory, items)}.Q......`;
const _crItemIdCpi = (isCategory, items) => `${_getRefArea(isCategory, items)}.M.${(0, _AdapterFn.getValue)(items[1])}.CPI.IX._T.N._Z`;
const _crItemIdEp = (isCategory, items) => `${_getRefArea(isCategory, items)}..${(0, _AdapterFn.getValue)(items[1])}._T`;
const _crItemIdGdpq = (isCategory, items) => `Q..${_getRefArea(isCategory, items)}.S1..${(0, _AdapterFn.getValue)(items[1])}......${(0, _AdapterFn.getValue)(items[2])}.`;
const _hmCrItemId = {
    mdf: _crItemIdMdf,
    nvr: _crItemIdNvr,
    mvt: _crItemIdMvt,
    cpi: _crItemIdCpi,
    hhi: _crItemIdHhi,
    gdpq: _crItemIdGdpq,
    ep: _crItemIdEp
  },
  _getCrItemId = (0, _AdapterFn.crGetRoute)(_hmCrItemId, _crItemId);
const crItemId = option => _getCrItemId(option.dfFn)((0, _CategoryFn.isCategory)(option), option.items);
exports.crItemId = crItemId;
const getJsonData = json => (json || {}).data || {};
exports.getJsonData = getJsonData;
const getDataSeries = data => (0, _AdapterFn.getByPropsFrom)(data, "dataSets", 0, "series") || {};
exports.getDataSeries = getDataSeries;
const getRefAreaIndex = dimensions => {
  const _series = (dimensions || {}).series || [];
  for (let i = 0; i < _series.length; i++) {
    if ((_series[i] || {}).id === "REF_AREA") {
      return i;
    }
  }
  return 0;
};
exports.getRefAreaIndex = getRefAreaIndex;
const getDataDimensions = data => (0, _AdapterFn.getByPropsFrom)(data, "structures", 0, "dimensions");
exports.getDataDimensions = getDataDimensions;
const crObservationPropName = option => crItemId(option).split(".").reduce((pn, _) => pn + ":0", "").slice(1);
exports.crObservationPropName = crObservationPropName;
//# sourceMappingURL=fnAdapter.js.map