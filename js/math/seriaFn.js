"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _mathFn = _interopRequireDefault(require("./mathFn"));

var _fIndicatorCalc = _interopRequireDefault(require("./fIndicatorCalc"));

var _roc = _interopRequireDefault(require("./roc"));

var _seriaHelperFn = _interopRequireDefault(require("./seriaHelperFn"));

var isNotEmptyArr = _seriaHelperFn["default"].isNotEmptyArr,
    isNumber = _seriaHelperFn["default"].isNumber,
    crPointGetter = _seriaHelperFn["default"].crPointGetter,
    fGetY = _seriaHelperFn["default"].fGetY,
    getZeroCountFromStart = _seriaHelperFn["default"].getZeroCountFromStart,
    getZeroIndexFromEnd = _seriaHelperFn["default"].getZeroIndexFromEnd;
var _isArr = Array.isArray,
    _isNaN = Number.isNaN;

var _calcChanges = function _calcChanges(yPrev, yNext) {
  if (!isNumber(yPrev) || !isNumber(yNext)) {
    return null;
  }

  return parseFloat((0, _big["default"])(yNext).minus(yPrev).toString());
};

var _fFindY = function _fFindY(initialValue, findY) {
  return function (data) {
    if (!isNotEmptyArr(data)) {
      return;
    }

    var resultY = initialValue;

    var _crPointGetter = crPointGetter(data),
        getY = _crPointGetter.getY,
        _fn = function _fn(p, currentY) {
      var pointY = getY(p);
      return findY(pointY, currentY);
    };

    var i = 0;

    for (; i < data.length; i++) {
      resultY = _fn(data[i], resultY);
    }

    return resultY !== initialValue ? _mathFn["default"].toFixedNumber(resultY) : void 0;
  };
};

var _findMinY = function _findMinY(y, min) {
  return isNumber(y) && y < min ? y : min;
};

var _findMaxY = function _findMaxY(y, max) {
  return isNumber(y) && y > max ? y : max;
};

var fn = {
  growthRate: (0, _fIndicatorCalc["default"])(_roc["default"]),
  changesBetween: (0, _fIndicatorCalc["default"])(_calcChanges),
  normalize: function normalize(d) {
    if (!isNotEmptyArr(d)) {
      return [];
    }

    var _crPointGetter2 = crPointGetter(d),
        getX = _crPointGetter2.getX,
        getY = _crPointGetter2.getY,
        _y0 = getY(d[0]);

    if (!(isNumber(_y0) && _y0 !== 0)) {
      return [];
    }

    var _d = [];
    var i = 0;

    for (; i < d.length; i++) {
      _d.push([getX(d[i]), parseFloat((0, _big["default"])(getY(d[i])).div(_y0).times(100).toFixed(2))]);
    }

    return _d;
  },
  findMinY: _fFindY(Number.POSITIVE_INFINITY, _findMinY),
  findMaxY: _fFindY(Number.NEGATIVE_INFINITY, _findMaxY),
  filterTrimZero: function filterTrimZero(data) {
    if (!_isArr(data)) {
      return data;
    }

    var _getY = fGetY(data[0]);

    if (!_getY) {
      return data;
    }

    var _countZero = getZeroCountFromStart(data, _getY);

    if (_countZero) {
      data.splice(0, _countZero);
    }

    var _zeroIndex = getZeroIndexFromEnd(data, _getY);

    if (_zeroIndex) {
      data.splice(_zeroIndex);
    }

    return data;
  },
  mean: function mean(data) {
    if (!isNotEmptyArr(data)) {
      return [];
    }

    var _crPointGetter3 = crPointGetter(data),
        getY = _crPointGetter3.getY,
        getX = _crPointGetter3.getX;

    var _sum = (0, _big["default"])(0),
        _numberOfPoints = 0,
        i = 0,
        _y;

    for (; i < data.length; i++) {
      _y = getY(data[i]);

      if (isNumber(_y)) {
        _sum = _sum.add(_y);
        _numberOfPoints++;
      }
    }

    var _maxIndex = data.length - 1,
        _avg = _numberOfPoints !== 0 ? parseInt(_sum.div(_numberOfPoints).toFixed(0), 10) : NaN;

    return _isNaN(_avg) ? [] : [[getX(data[0]), _avg], [getX(data[_maxIndex]), _avg]];
  },
  median: function median(data) {
    if (!isNotEmptyArr(data)) {
      return [];
    }

    var _crPointGetter4 = crPointGetter(data),
        getY = _crPointGetter4.getY,
        getX = _crPointGetter4.getX;

    var _d = data.map(getY).sort(function (a, b) {
      return a - b;
    }),
        _len = data.length,
        _half = _len / 2,
        _median = _half % 2 === 0 ? Math.round((_d[_half - 1] + _d[_half]) / 2) : _d[Math.round(_half) - 1];

    return [[getX(data[0]), _median], [getX(data[_len - 1]), _median]];
  }
};
var _default = fn;
exports["default"] = _default;
//# sourceMappingURL=seriaFn.js.map