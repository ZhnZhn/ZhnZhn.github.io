"use strict";

exports.__esModule = true;
exports.getYFromPoint = exports.getFirstSeriaData = exports.findMinYData = exports.findMaxYData = exports.calcYAxisMin = exports.assignTo = void 0;
var _seriaFn = require("../math/seriaFn");
var _isTypeFn = require("../utils/isTypeFn");
var _ChartFn = require("./ChartFn");
const _isArr = Array.isArray,
  _assign = Object.assign;
const assignTo = (obj, propName, value) => {
  obj[propName] = (0, _isTypeFn.isObj)(value) && !_isArr(value) ? _assign(obj[propName] || {}, value) : value;
};
exports.assignTo = assignTo;
const getYFromPoint = point => _isArr(point) ? point[1] : point && point.y || 0;
exports.getYFromPoint = getYFromPoint;
const getFirstSeriaData = obj => {
  var _obj$config, _obj$config$series;
  return ((_obj$config = obj.config) == null ? void 0 : (_obj$config$series = _obj$config.series) == null ? void 0 : _obj$config$series[0].data) || [];
};
exports.getFirstSeriaData = getFirstSeriaData;
const _fFindY = findY => (y, data) => (0, _isTypeFn.isNumber)(y) ? y : findY(data);
const findMinYData = _fFindY(_seriaFn.findMinY);
exports.findMinYData = findMinYData;
const findMaxYData = _fFindY(_seriaFn.findMaxY);
exports.findMaxYData = findMaxYData;
const calcYAxisMin = (min, max, noZoom) => noZoom && min > 0 ? 0 : (0, _ChartFn.calcMinY)(min, max);
exports.calcYAxisMin = calcYAxisMin;
//# sourceMappingURL=configBuilderHelpers.js.map