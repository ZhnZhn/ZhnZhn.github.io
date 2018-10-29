'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

var _mathFn = require('./mathFn');

var _mathFn2 = _interopRequireDefault(_mathFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _calcY = function _calcY(pPrev, pNext) {
  return pPrev.y !== 0 ? parseFloat((0, _big2.default)(pNext.y - pPrev.y).div(pPrev.y).times(100).toFixed(2)) : null;
};

var fn = {
  growthRate: function growthRate(d) {
    var rt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var _rt = parseInt(rt, 10);
    if (!Array.isArray(d) || typeof _rt !== 'number') {
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

  findMinY: function findMinY(data) {
    if (!Array.isArray(data) || data.length < 1) {
      return undefined;
    }
    var minY = Number.POSITIVE_INFINITY;
    var _fn = typeof data[0].y === 'number' ? function (p, min) {
      return p.y < min ? p.y : min;
    } : function (arr, min) {
      return arr[1] < min ? arr[1] : min;
    };
    for (var i = 0, max = data.length; i < max; i++) {
      minY = _fn(data[i], minY);
    }
    return minY !== Number.POSITIVE_INFINITY ? _mathFn2.default.toFixedNumber(minY) : undefined;
  },
  findMaxY: function findMaxY(data) {
    if (!Array.isArray(data) || data.length < 1) {
      return undefined;
    }
    var maxY = Number.NEGATIVE_INFINITY;
    var _fn = typeof data[0].y === 'number' ? function (p, max) {
      return p.y > max ? p.y : max;
    } : function (arr, max) {
      return arr[1] > max ? arr[1] : max;
    };
    for (var i = 0, max = data.length; i < max; i++) {
      maxY = _fn(data[i], maxY);
    }
    return maxY !== Number.NEGATIVE_INFINITY ? _mathFn2.default.toFixedNumber(maxY) : undefined;
  }
};

exports.default = fn;
//# sourceMappingURL=seriaFn.js.map