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

  crValueMoving: function crValueMoving(option) {
    var _option$nowValue = option.nowValue,
        nowValue = _option$nowValue === undefined ? '0.0' : _option$nowValue,
        _option$prevValue = option.prevValue,
        prevValue = _option$prevValue === undefined ? '0.0' : _option$prevValue,
        Direction = option.Direction,
        _option$fnFormat = option.fnFormat,
        fnFormat = _option$fnFormat === undefined ? fnEcho : _option$fnFormat;


    var bNowValue = (0, _big2.default)(nowValue.toString().replace(/\s/g, '')),
        bPrevValue = (0, _big2.default)(prevValue.toString().replace(/\s/g, ''));

    var _bDelta = bPrevValue.minus(bNowValue),
        _direction = void 0;
    if (_bDelta.gt(0.0)) {
      _direction = Direction.DOWN;
    } else if (!_bDelta.gte(0.0)) {
      _direction = Direction.UP;
    } else {
      _direction = Direction.EQUAL;
    }

    var _bDeltaAbs = _bDelta.abs().round(4);

    var _bPercent = mathFn.calcPercent({ bValue: _bDelta, bTotal: bPrevValue });

    var _bNowValue = (0, _big2.default)(bNowValue).round(4);
    if (_bNowValue.gt('1000000')) {
      _bNowValue = bNowValue.toFixed(0);
      _bDelta = _bDelta.toFixed(0);
    }

    return {
      value: fnFormat(_bNowValue).toString(),
      _value: _bNowValue.toString(),
      delta: fnFormat(_bDeltaAbs).toString(),
      _deltaAbs: _bDeltaAbs.toString(),
      percent: _bPercent.toString() + '%',
      _percentAbs: _bPercent.toString(),
      direction: _direction
    };
  },

  toFixed: function toFixed(value) {
    var bValue = (0, _big2.default)(value);
    if (bValue.gt('10')) {
      return parseInt(bValue.toFixed(0), 10);
    } else {
      return parseFloat(bValue.toFixed(2));
    }
  }
};

exports.default = mathFn;
//# sourceMappingURL=mathFn.js.map