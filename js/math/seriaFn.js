"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _mathFn = _interopRequireDefault(require("./mathFn"));

var _seriaHelperFn = _interopRequireDefault(require("./seriaHelperFn"));

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var isNumber = _seriaHelperFn["default"].isNumber,
    isPointArr = _seriaHelperFn["default"].isPointArr,
    fGetY = _seriaHelperFn["default"].fGetY,
    getZeroCountFromStart = _seriaHelperFn["default"].getZeroCountFromStart,
    getZeroIndexFromEnd = _seriaHelperFn["default"].getZeroIndexFromEnd;
var _isArr = Array.isArray;

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

  return parseFloat((0, _big["default"])(yNext - yPrev).div(Math.abs(yPrev)).times(100).toFixed(2));
};

var fn = {
  growthRate: function growthRate(d, rt) {
    if (rt === void 0) {
      rt = 1;
    }

    var _rt = parseInt(rt, 10);

    if (!(_isArr(d) && isNumber(_rt))) {
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

    if (!isNumber(_y0) || _y0 === 0 || _max === 0) {
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

    var _fn = isNumber(data[0].y) ? function (p, min) {
      return isNumber(p.y) && p.y < min ? p.y : min;
    } : function (arr, min) {
      return isNumber(arr[1]) && arr[1] < min ? arr[1] : min;
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

    var _fn = isNumber(data[0].y) ? function (p, max) {
      return isNumber(p.y) && p.y > max ? p.y : max;
    } : function (arr, max) {
      return isNumber(arr[1]) && arr[1] > max ? arr[1] : max;
    };

    for (var i = 0, max = data.length; i < max; i++) {
      maxY = _fn(data[i], maxY);
    }

    return maxY !== Number.NEGATIVE_INFINITY ? _mathFn["default"].toFixedNumber(maxY) : undefined;
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
    if (!isPointArr(data)) {
      return [];
    }

    var _sum = (0, _big["default"])(0);

    for (var _iterator = _createForOfIteratorHelperLoose(data), _step; !(_step = _iterator()).done;) {
      var p = _step.value;

      if (isNumber(p[1])) {
        _sum = _sum.add(p[1]);
      }
    }

    var _max = data.length - 1;

    var _avg = parseInt(_sum.div(_max).toFixed(0), 10);

    return [[data[0][0], _avg], [data[_max][0], _avg]];
  },
  median: function median(data) {
    if (!isPointArr(data)) {
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