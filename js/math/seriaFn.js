"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _mathFn = _interopRequireDefault(require("./mathFn"));

var _seriaHelperFn = _interopRequireDefault(require("./seriaHelperFn"));

var isNumber = _seriaHelperFn["default"].isNumber,
    crPointGetter = _seriaHelperFn["default"].crPointGetter,
    fGetY = _seriaHelperFn["default"].fGetY,
    getZeroCountFromStart = _seriaHelperFn["default"].getZeroCountFromStart,
    getZeroIndexFromEnd = _seriaHelperFn["default"].getZeroIndexFromEnd;
var _isArr = Array.isArray;

var _isNotEmptyArr = function _isNotEmptyArr(arr) {
  return _isArr(arr) && arr.length > 0;
};

var _calcY = function _calcY(yPrev, yNext) {
  if (!isNumber(yPrev) || !isNumber(yNext)) {
    return null;
  }

  if (yNext === 0) {
    return yPrev === 0 ? 0 : yPrev > 0 ? -100 : 100;
  }

  if (yPrev === 0) {
    return null;
  }

  return parseFloat((0, _big["default"])(yNext).minus(yPrev).div(Math.abs(yPrev)).times(100).toFixed(2));
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

var fn = {
  growthRate: _fIndicator(_calcY),
  changesBetween: _fIndicator(_calcChanges),
  normalize: function normalize(d) {
    if (!(_isArr(d) && d[0])) {
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
  findMinY: function findMinY(data) {
    if (!(_isArr(data) && data.length)) {
      return void 0;
    }

    var minY = Number.POSITIVE_INFINITY;

    var _fn = isNumber(data[0].y) ? function (p, min) {
      return isNumber(p.y) && p.y < min ? p.y : min;
    } : function (arr, min) {
      return isNumber(arr[1]) && arr[1] < min ? arr[1] : min;
    };

    var i = 0;

    for (; i < data.length; i++) {
      minY = _fn(data[i], minY);
    }

    return minY !== Number.POSITIVE_INFINITY ? _mathFn["default"].toFixedNumber(minY) : void 0;
  },
  findMaxY: function findMaxY(data) {
    if (!(_isArr(data) && data.length)) {
      return void 0;
    }

    var maxY = Number.NEGATIVE_INFINITY;

    var _fn = isNumber(data[0].y) ? function (p, max) {
      return isNumber(p.y) && p.y > max ? p.y : max;
    } : function (arr, max) {
      return isNumber(arr[1]) && arr[1] > max ? arr[1] : max;
    };

    var i = 0;

    for (; i < data.length; i++) {
      maxY = _fn(data[i], maxY);
    }

    return maxY !== Number.NEGATIVE_INFINITY ? _mathFn["default"].toFixedNumber(maxY) : void 0;
  },
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
        _avg = parseInt(_sum.div(_numberOfPoints).toFixed(0), 10);

    return [[getX(data[0]), _avg], [getX(data[_maxIndex]), _avg]];
  },
  median: function median(data) {
    if (!_isNotEmptyArr(data)) {
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