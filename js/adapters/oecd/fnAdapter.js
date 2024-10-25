"use strict";

exports.__esModule = true;
exports.getJsonData = exports.getDataSeries = exports.getDataDimensions = void 0;
var _AdapterFn = require("../AdapterFn");
const getJsonData = json => (json || {}).data || {};
exports.getJsonData = getJsonData;
const getDataSeries = data => (0, _AdapterFn.getByPropsFrom)(data, "dataSets", 0, "series") || {};
exports.getDataSeries = getDataSeries;
const getDataDimensions = data => (0, _AdapterFn.getByPropsFrom)(data, "structures", 0, "dimensions");
exports.getDataDimensions = getDataDimensions;
//# sourceMappingURL=fnAdapter.js.map