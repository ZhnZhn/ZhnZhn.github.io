"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _mathFn = _interopRequireDefault(require("./mathFn"));

var _roc = _interopRequireDefault(require("./roc"));

var _seriaHelperFn = _interopRequireDefault(require("./seriaHelperFn"));

var isNumber = _seriaHelperFn["default"].isNumber,
    crPointGetter = _seriaHelperFn["default"].crPointGetter,
    fGetY = _seriaHelperFn["default"].fGetY,
    getZeroCountFromStart = _seriaHelperFn["default"].getZeroCountFromStart,
    getZeroIndexFromEnd = _seriaHelperFn["default"].getZeroIndexFromEnd;
var _isArr = Array.isArray,
    _isNaN = Number.isNaN;

var _isNotEmptyArr = function _isNotEmptyArr(arr) {
  return _isArr(arr) && arr.length > 0;
};

var _calcChanges = function _calcChanges(yPrev, yNext) {
  if (!isNumber(yPrev) || !isNumber(yNext)) {
    return null;
  }

  return parseFloat((0, _big["default"])(yNext).minus(yPrev).toString());
};

var _crIndicatorData = function _crIndicatorData(d, rt, calc) {
  var _d = [],
      max = d.length,
      prevStep = rt - 1,
      _crPointGetter = crPointGetter(d),
      getX = _crPointGetter.getX,
      getY = _crPointGetter.getY;

  var pPrev = d[0],
      pNext,
      i = rt;

  for (; i < max; i++) {
    pNext = d[i];

    _d.push([getX(pNext), calc(getY(pPrev), getY(pNext))]);

    pPrev = d[i - prevStep];
  }

  return _d;
};

var _fIndicator = function _fIndicator(calc) {
  return function (d, rt) {
    if (rt === void 0) {
      rt = 1;
    }

    var _rt = parseInt(rt, 10);

    if (!(_isArr(d) && isNumber(_rt))) {
      return [];
    }

    return _crIndicatorData(d, _rt, calc);
  };
};

var _fFindY = function _fFindY(initialValue, findY) {
  return function (data) {
    if (!(_isArr(data) && data.length)) {
      return;
    }

    var resultY = initialValue;

    var _crPointGetter2 = crPointGetter(data),
        getY = _crPointGetter2.getY,
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
  growthRate: _fIndicator(_roc["default"]),
  changesBetween: _fIndicator(_calcChanges),
  normalize: function normalize(d) {
    if (!(_isArr(d) && d[0])) {
      return [];
    }

    var _crPointGetter3 = crPointGetter(d),
        getX = _crPointGetter3.getX,
        getY = _crPointGetter3.getY,
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
    if (!_isNotEmptyArr(data)) {
      return [];
    }

    var _crPointGetter4 = crPointGetter(data),
        getY = _crPointGetter4.getY,
        getX = _crPointGetter4.getX;

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
    if (!_isNotEmptyArr(data)) {
      return [];
    }

    var _crPointGetter5 = crPointGetter(data),
        getY = _crPointGetter5.getY,
        getX = _crPointGetter5.getX;

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