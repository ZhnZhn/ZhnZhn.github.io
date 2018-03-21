'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fn = {
  growthRate: function growthRate(d) {
    if (!Array.isArray(d)) {
      return [];
    }
    var _d = [],
        max = d.length;
    var pPrev = d[0],
        pNext = void 0,
        i = 1;
    for (; i < max; i++) {
      pNext = d[i];
      _d.push({
        x: pNext.x,
        y: parseFloat((0, _big2.default)(pNext.y - pPrev.y).div(pPrev.y).times(100).toFixed(2))
      });
      pPrev = pNext;
    }
    return _d;
  }
};

exports.default = fn;
//# sourceMappingURL=seriaFn.js.map