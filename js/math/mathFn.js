'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _big = require('big.js');

var _big2 = _interopRequireDefault(_big);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fnEcho = function fnEcho(value) {
  return value;
};

var mathFn = {

  calcPercent: function calcPercent(_ref) {
    var _ref$bValue = _ref.bValue,
        bValue = _ref$bValue === undefined ? (0, _big2.default)('0.0') : _ref$bValue,
        _ref$bTotal = _ref.bTotal,
        bTotal = _ref$bTotal === undefined ? (0, _big2.default)('0.0') : _ref$bTotal;

    return !bTotal.eq((0, _big2.default)(0.0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) : (0, _big2.default)(0.0).toFixed(2);
  },

  crValueMoving: function crValueMoving(_ref2) {
    var _ref2$nowValue = _ref2.nowValue,
        nowValue = _ref2$nowValue === undefined ? '0.0' : _ref2$nowValue,
        _ref2$prevValue = _ref2.prevValue,
        prevValue = _ref2$prevValue === undefined ? '0.0' : _ref2$prevValue,
        Direction = _ref2.Direction,
        _ref2$fnFormat = _ref2.fnFormat,
        fnFormat = _ref2$fnFormat === undefined ? fnEcho : _ref2$fnFormat;

    var bNowValue = (0, _big2.default)(nowValue.toString().replace(' ', '')),
        bPrevValue = (0, _big2.default)(prevValue.toString().replace(' ', ''));

    var _bDelta = bPrevValue.minus(bNowValue),
        _direction = void 0;
    if (_bDelta.gt(0.0)) {
      _direction = Direction.DOWN;
    } else if (!_bDelta.gte(0.0)) {
      _direction = Direction.UP;
    } else {
      _direction = Direction.EQUAL;
    }

    _bDelta = _bDelta.abs().round(4);

    var _bPercent = mathFn.calcPercent({ bValue: _bDelta, bTotal: bPrevValue });

    var _bNowValue = (0, _big2.default)(bNowValue).round(4);
    if (_bNowValue.gt('1000000')) {
      _bNowValue = bNowValue.toFixed(0);
      _bDelta = _bDelta.toFixed(0);
    }

    return {
      value: fnFormat(_bNowValue).toString(),
      delta: fnFormat(_bDelta).toString(),
      percent: _bPercent.toString() + '%',
      direction: _direction
    };
  }
};

exports.default = mathFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\math\mathFn.js.map