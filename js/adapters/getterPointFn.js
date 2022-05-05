"use strict";

exports.__esModule = true;
exports.getPointValue = exports.getPointDate = void 0;

const _isArr = Array.isArray,
      _isNumber = n => typeof n === 'number' && n - n === 0;

const getPointDate = point => _isArr(point) ? point[0] : (point || {}).x;

exports.getPointDate = getPointDate;

const getPointValue = point => _isArr(point) ? _isNumber(point[1]) ? point[1] : '0.0' : point && _isNumber(point.y) ? point.y : '0.0';

exports.getPointValue = getPointValue;
//# sourceMappingURL=getterPointFn.js.map