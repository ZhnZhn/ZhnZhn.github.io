"use strict";

exports.__esModule = true;
exports.getPointValue = exports.getPointDate = void 0;

var _AdapterFn = require("./AdapterFn");

const getPointDate = point => (0, _AdapterFn.isArr)(point) ? point[0] : (point || {}).x;

exports.getPointDate = getPointDate;

const getPointValue = point => (0, _AdapterFn.isArr)(point) ? (0, _AdapterFn.isNumber)(point[1]) ? point[1] : '0.0' : point && (0, _AdapterFn.isNumber)(point.y) ? point.y : '0.0';

exports.getPointValue = getPointValue;
//# sourceMappingURL=getterPointFn.js.map