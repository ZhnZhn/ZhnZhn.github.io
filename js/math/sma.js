'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sma = function sma(data, period, plus) {
  var dataSma = [];

  var max = data.length,
      _period = plus ? parseFloat((0, _big2.default)(period).plus(plus).minus(1).toFixed(0)) : parseFloat((0, _big2.default)(period).minus(1).toFixed(0));
  var bSum = (0, _big2.default)('0.0'),
      i = 0,
      point = void 0;
  for (; i < max; i++) {
    point = data[i];
    if (i > _period) {
      bSum = bSum.plus(point.y).minus(data[i - period].y);
      dataSma.push([point.x, parseFloat(bSum.div(period).toFixed(2))]);
    } else {
      bSum = bSum.plus(point.y);
    }
  }
  return dataSma;
};

exports.default = sma;
//# sourceMappingURL=sma.js.map