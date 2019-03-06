'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _mathFn = require('./mathFn');

var _mathFn2 = _interopRequireDefault(_mathFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isArr = Array.isArray;
var _isNumber = function _isNumber(n) {
  return typeof n === 'number' ? n - n === 0 : false;
};

var _calcY = function _calcY(pPrev, pNext) {
  return pPrev.y !== 0 ? parseFloat((0, _big2.default)(pNext.y - pPrev.y).div(pPrev.y).times(100).toFixed(2)) : null;
};

var fn = {
  growthRate: function growthRate(d) {
    var rt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var _rt = parseInt(rt, 10);
    if (!_isArr(d) || _isNumber(_rt)) {
      return [];
    }

    var _d = [],
        max = d.length;
    var pPrev = d[0],
        pNext = void 0,
        i = _rt;
    for (; i < max; i++) {
      pNext = d[i];
      _d.push({
        x: pNext.x,
        y: _calcY(pPrev, pNext)
      });
      pPrev = pNext;
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
      _d.push({
        x: d[i].x,
        y: parseFloat((0, _big2.default)(d[i].y / _y0).times(100).toFixed(2))
      });
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
    return minY !== Number.POSITIVE_INFINITY ? _mathFn2.default.toFixedNumber(minY) : undefined;
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
    return maxY !== Number.NEGATIVE_INFINITY ? _mathFn2.default.toFixedNumber(maxY) : undefined;
  }
};

exports.default = fn;
//# sourceMappingURL=seriaFn.js.map