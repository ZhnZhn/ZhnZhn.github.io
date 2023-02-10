"use strict";

exports.__esModule = true;
exports.mergeToChartPoints = exports.isNumber = exports.isNotEmptyArr = exports.getZeroIndexFromEnd = exports.getZeroCountFromStart = exports.fGetY = exports.crPointGetter = exports.crDataArrays = void 0;
var _mathFn = require("./mathFn");
const _isArr = Array.isArray,
  _isNumber = n => typeof n === "number" && n - n === 0,
  _isUndef = v => typeof v === "undefined",
  _isObj = obj => typeof obj === "object" && obj !== null;
const isNotEmptyArr = arr => {
  if (!_isArr(arr)) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (_isObj(arr[i])) {
      return true;
    }
  }
  return false;
};
exports.isNotEmptyArr = isNotEmptyArr;
const isNumber = _isNumber;
exports.isNumber = isNumber;
const crPointGetter = data => {
  const getX = _isUndef(data[0].x) ? p => p[0] : p => p.x,
    getY = _isUndef(data[0].y) ? p => p[1] : p => p.y;
  return {
    getX,
    getY
  };
};
exports.crPointGetter = crPointGetter;
const fGetY = point => {
  if (!point) {
    return;
  }
  if (_isArr(point)) {
    return p => p[1];
  }
  if (_isNumber(point.y)) {
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
    _dataX = [];
  if (!isNotEmptyArr(data)) {
    return [_data, _dataX];
  }
  const {
    getX,
    getY
  } = crPointGetter(data);
  data.forEach(p => {
    const y = getY(p);
    if (isNumber(y)) {
      _data.push(y);
      _dataX.push(getX(p));
    }
  });
  return [_data, _dataX];
};
exports.crDataArrays = crDataArrays;
const mergeToChartPoints = (dataX, values, by) => dataX.reduce((result, x, i) => {
  result.push([x, (0, _mathFn.roundBy)(values[i], by)]);
  return result;
}, []);
exports.mergeToChartPoints = mergeToChartPoints;
//# sourceMappingURL=seriaHelperFn.js.map