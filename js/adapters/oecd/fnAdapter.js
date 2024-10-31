"use strict";

exports.__esModule = true;
exports.getJsonData = exports.getDataSeries = exports.getDataDimensions = exports.crItemId = void 0;
var _AdapterFn = require("../AdapterFn");
const getJsonData = json => (json || {}).data || {};
exports.getJsonData = getJsonData;
const getDataSeries = data => (0, _AdapterFn.getByPropsFrom)(data, "dataSets", 0, "series") || {};
exports.getDataSeries = getDataSeries;
const getDataDimensions = data => (0, _AdapterFn.getByPropsFrom)(data, "structures", 0, "dimensions");
exports.getDataDimensions = getDataDimensions;
const crItemId = (isCategory, items) => `${isCategory ? "" : (0, _AdapterFn.getValue)(items[0])}.Q.${(0, _AdapterFn.getValue)(items[1])}.IX`;
exports.crItemId = crItemId;
//# sourceMappingURL=fnAdapter.js.map