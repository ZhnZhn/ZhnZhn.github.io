'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fn = {
  growthRate: function growthRate() {
    var d1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var d3 = [],
        _max = d1.length;
    var pPrev = d1[0],
        pNext = void 0,
        i = 1;
    for (; i < _max; i++) {
      pNext = d1[i];
      d3.push({
        x: pNext.x,
        y: parseFloat((0, _big2.default)(pNext.y - pPrev.y).div(pPrev.y).times(100).toFixed(2))
      });
      pPrev = pNext;
    }
    return d3;
  }
};

exports.default = fn;
//# sourceMappingURL=seriaFn.js.map