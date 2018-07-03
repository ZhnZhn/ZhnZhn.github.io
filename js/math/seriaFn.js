'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

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
  }
};

exports.default = fn;
//# sourceMappingURL=seriaFn.js.map