"use strict";

exports.__esModule = true;
exports.mergeToChartPoints = exports.getZeroIndexFromEnd = exports.getZeroCountFromStart = exports.fGetY = exports.crPointGetter = exports.crDataArrays = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _mathFn = require("./mathFn");
const _getDataPoint = arr => {
  if (!(0, _isTypeFn.isArr)(arr)) {
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if ((0, _isTypeFn.isObj)(arr[i])) {
      return arr[i];
    }
  }
  return;
};
const crPointGetter = data => {
  const _dataPoint = _getDataPoint(data);
  return _dataPoint ? (0, _isTypeFn.isArr)(_dataPoint) ? [p => p[0], p => p[1]] : [p => p.x, p => p.y] : [];
};
exports.crPointGetter = crPointGetter;
const fGetY = point => {
  if (!point) {
    return;
  }
  if ((0, _isTypeFn.isArr)(point)) {
    return p => p[1];
  }
  if ((0, _isTypeFn.isNumber)(point.y)) {
    return p => p.y;
  }
  return;
};
exports.fGetY = fGetY;
const getZeroCountFromStart = (arr, getY) => {
  let _toIndex = -1,
    i = 0;
  for (; i < arr.length; i++) {
    const _y = getY(arr[i]);
    if (_y === 0 || _y === null) {
      _toIndex = i;
    } else {
      break;
    }
  }
  return _toIndex + 1;
};
exports.getZeroCountFromStart = getZeroCountFromStart;
const getZeroIndexFromEnd = (arr, getY) => {
  let _zeroIndex = 0;
  for (let i = arr.length - 1; i > -1; i--) {
    const _y = getY(arr[i]);
    if (_y === 0 || _y === null) {
      _zeroIndex = i;
    } else {
      break;
    }
  }
  return _zeroIndex;
};

/*************************************************/
/***********TA*Series*Helpers*********************/
exports.getZeroIndexFromEnd = getZeroIndexFromEnd;
const crDataArrays = data => {
  const _data = [],
    _dataX = [],
    [getX, getY] = crPointGetter(data);
  let y;
  if (getX) {
    data.forEach(p => {
      y = getY(p);
      if ((0, _isTypeFn.isNumber)(y)) {
        _data.push(y);
        _dataX.push(getX(p));
      }
    });
  }
  return [_data, _dataX];
};
exports.crDataArrays = crDataArrays;
const mergeToChartPoints = (dataX, values, by) => dataX.reduce((result, x, i) => {
  result.push([x, (0, _mathFn.roundBy)(values[i], by)]);
  return result;
}, []);
exports.mergeToChartPoints = mergeToChartPoints;
//# sourceMappingURL=seriaHelperFn.js.map