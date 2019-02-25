'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isNumber = function _isNumber(v) {
  return typeof v === 'number' && !Number.isNaN(v);
};
var _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
};

var _crPointGetter = function _crPointGetter(data) {
  var getX = _isUndef(data[0].x) ? function (p) {
    return p[0];
  } : function (p) {
    return p.x;
  },
      getY = _isUndef(data[0].y) ? function (p) {
    return p[1];
  } : function (p) {
    return p.y;
  };
  return { getX: getX, getY: getY };
};

var sma = function sma(data, period, plus) {
  var dataSma = [];
  if (!Array.isArray(data) || data.length === 0) {
    return dataSma;
  }

  var _period = plus ? parseFloat((0, _big2.default)(period).plus(plus).minus(1).toFixed(0)) : parseFloat((0, _big2.default)(period).minus(1).toFixed(0));

  var _crPointGetter2 = _crPointGetter(data),
      getX = _crPointGetter2.getX,
      getY = _crPointGetter2.getY,
      _data = data.filter(function (p) {
    return _isNumber(getY(p));
  }),
      max = _data.length;

  var bSum = (0, _big2.default)('0.0'),
      point = void 0;
  for (var i = 0; i < max; i++) {
    point = _data[i];
    if (i > _period) {
      bSum = bSum.plus(getY(point)).minus(getY(_data[i - period]));
      dataSma.push([getX(point), parseFloat(bSum.div(period).toFixed(2))]);
    } else {
      bSum = bSum.plus(getY(point));
    }
  }
  return dataSma;
};

exports.default = sma;
//# sourceMappingURL=sma.js.map