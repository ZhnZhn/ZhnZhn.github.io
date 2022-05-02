"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.normalize = exports.median = exports.mean = exports.growthRate = exports.findMinY = exports.findMaxY = exports.filterTrimZero = exports.changesBetween = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _mathFn = _interopRequireDefault(require("./mathFn"));

var _fIndicatorCalc = _interopRequireDefault(require("./fIndicatorCalc"));

var _diff = _interopRequireDefault(require("./diff"));

var _roc = _interopRequireDefault(require("./roc"));

var _seriaHelperFn = require("./seriaHelperFn");

const _isArr = Array.isArray,
      _isNaN = Number.isNaN;

const _calcChanges = (yPrev, yNext) => {
  if (!(0, _seriaHelperFn.isNumber)(yPrev) || !(0, _seriaHelperFn.isNumber)(yNext)) {
    return null;
  }

  return (0, _diff.default)(yNext, yPrev);
};

const _fFindY = (initialValue, findY) => data => {
  if (!(0, _seriaHelperFn.isNotEmptyArr)(data)) {
    return;
  }

  let resultY = initialValue;

  const {
    getY
  } = (0, _seriaHelperFn.crPointGetter)(data),
        _fn = (p, currentY) => {
    const pointY = getY(p);
    return findY(pointY, currentY);
  };

  let i = 0;

  for (; i < data.length; i++) {
    resultY = _fn(data[i], resultY);
  }

  return resultY !== initialValue ? _mathFn.default.toFixedNumber(resultY) : void 0;
};

const _findMinY = (y, min) => (0, _seriaHelperFn.isNumber)(y) && y < min ? y : min;

const _findMaxY = (y, max) => (0, _seriaHelperFn.isNumber)(y) && y > max ? y : max;

const growthRate = (0, _fIndicatorCalc.default)(_roc.default);
exports.growthRate = growthRate;
const changesBetween = (0, _fIndicatorCalc.default)(_calcChanges);
exports.changesBetween = changesBetween;

const normalize = d => {
  if (!(0, _seriaHelperFn.isNotEmptyArr)(d)) {
    return [];
  }

  const {
    getX,
    getY
  } = (0, _seriaHelperFn.crPointGetter)(d),
        _y0 = getY(d[0]);

  if (!((0, _seriaHelperFn.isNumber)(_y0) && _y0 !== 0)) {
    return [];
  }

  const _d = [];
  let i = 0;

  for (; i < d.length; i++) {
    _d.push([getX(d[i]), parseFloat((0, _big.default)(getY(d[i])).div(_y0).times(100).toFixed(2))]);
  }

  return _d;
};

exports.normalize = normalize;

const findMinY = _fFindY(Number.POSITIVE_INFINITY, _findMinY);

exports.findMinY = findMinY;

const findMaxY = _fFindY(Number.NEGATIVE_INFINITY, _findMaxY);

exports.findMaxY = findMaxY;

const filterTrimZero = data => {
  if (!_isArr(data)) {
    return data;
  }

  const _getY = (0, _seriaHelperFn.fGetY)(data[0]);

  if (!_getY) {
    return data;
  }

  const _countZero = (0, _seriaHelperFn.getZeroCountFromStart)(data, _getY);

  if (_countZero) {
    data.splice(0, _countZero);
  }

  const _zeroIndex = (0, _seriaHelperFn.getZeroIndexFromEnd)(data, _getY);

  if (_zeroIndex) {
    data.splice(_zeroIndex);
  }

  return data;
};

exports.filterTrimZero = filterTrimZero;

const mean = data => {
  if (!(0, _seriaHelperFn.isNotEmptyArr)(data)) {
    return [];
  }

  const {
    getY,
    getX
  } = (0, _seriaHelperFn.crPointGetter)(data);

  let _sum = (0, _big.default)(0),
      _numberOfPoints = 0,
      i = 0,
      _y;

  for (; i < data.length; i++) {
    _y = getY(data[i]);

    if ((0, _seriaHelperFn.isNumber)(_y)) {
      _sum = _sum.add(_y);
      _numberOfPoints++;
    }
  }

  const _maxIndex = data.length - 1,
        _avg = _numberOfPoints !== 0 ? parseInt(_sum.div(_numberOfPoints).toFixed(0), 10) : NaN;

  return _isNaN(_avg) ? [] : [[getX(data[0]), _avg], [getX(data[_maxIndex]), _avg]];
};

exports.mean = mean;

const median = data => {
  if (!(0, _seriaHelperFn.isNotEmptyArr)(data)) {
    return [];
  }

  const {
    getY,
    getX
  } = (0, _seriaHelperFn.crPointGetter)(data);

  const _d = data.map(getY).sort((a, b) => a - b),
        _len = data.length,
        _half = _len / 2,
        _median = _half % 2 === 0 ? Math.round((_d[_half - 1] + _d[_half]) / 2) : _d[Math.round(_half) - 1];

  return [[getX(data[0]), _median], [getX(data[_len - 1]), _median]];
};

exports.median = median;
//# sourceMappingURL=seriaFn.js.map