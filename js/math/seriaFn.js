"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _mathFn = _interopRequireDefault(require("./mathFn"));

var _isArr = Array.isArray;

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' ? n - n === 0 : false;
};

var _calcY = function _calcY(yPrev, yNext) {
  if (!_isNumber(yPrev) || !_isNumber(yNext)) {
    return null;
  }

  if (yNext === 0) {
    return yPrev === 0 ? 0 : yPrev > 0 ? -100 : 100;
  }

  if (yPrev === 0) {
    return null;
  }

  return parseFloat((0, _big["default"])(yNext - yPrev).div(Math.abs(yPrev)).times(100).toFixed(2));
};

var _isDataArr = function _isDataArr(data) {
  return _isArr(data) && data.length > 1 && _isArr(data[0]);
};

var fn = {
  growthRate: function growthRate(d, rt) {
    if (rt === void 0) {
      rt = 1;
    }

    var _rt = parseInt(rt, 10);

    if (!(_isArr(d) && _isNumber(_rt))) {
      return [];
    }

    var _d = [],
        max = d.length,
        prevStep = _rt - 1;
    var pPrev = d[0],
        pNext,
        i = _rt;

    for (; i < max; i++) {
      pNext = d[i];

      _d.push([pNext.x, _calcY(pPrev.y, pNext.y)]);

      pPrev = d[i - prevStep];
    }

    return _d;
  },
  normalize: function normalize(d) {
    if (!_isArr(d)) {
      return [];
    }

    var _d = [],
        _max = d.length,
        _y0 = d[0].y;

    if (!_isNumber(_y0) || _y0 === 0 || _max === 0) {
      return [];
    }

    for (var i = 0; i < _max; i++) {
      _d.push([d[i].x, parseFloat((0, _big["default"])(d[i].y / _y0).times(100).toFixed(2))]);
    }

    return _d;
  },
  findMinY: function findMinY(data) {
    if (!_isArr(data) || data.length < 1) {
      return undefined;
    }

    var minY = Number.POSITIVE_INFINITY;

    var _fn = _isNumber(data[0].y) ? function (p, min) {
      return _isNumber(p.y) && p.y < min ? p.y : min;
    } : function (arr, min) {
      return _isNumber(arr[1]) && arr[1] < min ? arr[1] : min;
    };

    for (var i = 0, max = data.length; i < max; i++) {
      minY = _fn(data[i], minY);
    }

    return minY !== Number.POSITIVE_INFINITY ? _mathFn["default"].toFixedNumber(minY) : undefined;
  },
  findMaxY: function findMaxY(data) {
    if (!_isArr(data) || data.length < 1) {
      return undefined;
    }

    var maxY = Number.NEGATIVE_INFINITY;

    var _fn = _isNumber(data[0].y) ? function (p, max) {
      return _isNumber(p.y) && p.y > max ? p.y : max;
    } : function (arr, max) {
      return _isNumber(arr[1]) && arr[1] > max ? arr[1] : max;
    };

    for (var i = 0, max = data.length; i < max; i++) {
      maxY = _fn(data[i], maxY);
    }

    return maxY !== Number.NEGATIVE_INFINITY ? _mathFn["default"].toFixedNumber(maxY) : undefined;
  },
  mean: function mean(data) {
    if (!_isDataArr(data)) {
      return [];
    }

    var _sum = (0, _big["default"])(0);

    for (var _iterator = data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var p = _ref;

      if (_isNumber(p[1])) {
        _sum = _sum.add(p[1]);
      }
    }

    var _max = data.length - 1;

    var _avg = parseInt(_sum.div(_max).toFixed(0), 10);

    return [[data[0][0], _avg], [data[_max][0], _avg]];
  },
  median: function median(data) {
    if (!_isDataArr(data)) {
      return [];
    }

    var _d = data.map(function (arrP) {
      return arrP[1];
    }).sort(function (a, b) {
      return a - b;
    }),
        _len = data.length,
        _half = _len / 2,
        _median = _half % 2 === 0 ? Math.round((_d[_half - 1] + _d[_half]) / 2) : _d[Math.round(_half) - 1];

    return [[data[0][0], _median], [data[_len - 1][0], _median]];
  }
};
var _default = fn;
exports["default"] = _default;
//# sourceMappingURL=seriaFn.js.map