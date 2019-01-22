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

var MAX_TO_ROUND = '1000000';

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && !Number.isNaN(n);
};

var _formatedToBig = function _formatedToBig() {
  var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.0';
  return (0, _big2.default)(v.toString().replace(/\s/g, ''));
};

var _roundBig = function _roundBig(bValue) {
  var _bValue = bValue.round(4);
  if (_bValue.gt(MAX_TO_ROUND)) {
    _bValue = bValue.toFixed(0);
  }
  return _bValue;
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
    var nowValue = option.nowValue,
        prevValue = option.prevValue,
        _option$Direction = option.Direction,
        D = _option$Direction === undefined ? {} : _option$Direction,
        _option$fnFormat = option.fnFormat,
        fnFormat = _option$fnFormat === undefined ? fnEcho : _option$fnFormat,
        bNowValue = _formatedToBig(nowValue),
        bPrevValue = _formatedToBig(prevValue),
        _bDelta = bPrevValue.minus(bNowValue),
        _direction = _bDelta.gt(0.0) ? D.DOWN : _bDelta.lt(0.0) ? D.UP : D.EQUAL;

    var _bPercent = mathFn.calcPercent({
      bValue: _bDelta, bTotal: bPrevValue
    });

    var _bNowValue = _roundBig(bNowValue),
        _bDeltaAbs = _roundBig(_bDelta.abs());
    /*
    let _bNowValue = Big(bNowValue).round(4);
    if ( _bNowValue.gt(MAX_TO_ROUND) ){
      _bNowValue = bNowValue.toFixed(0);
    }
    let _bDeltaAbs = _bDelta.abs().round(4);
    if (_bDeltaAbs.gt(MAX_TO_ROUND)) {
      _bDeltaAbs = _bDelta.abs().round(0)
    }
    */

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
    return bValue.gt('10') ? parseInt(bValue.toFixed(0), 10) : parseFloat(bValue.toFixed(2));
  },

  toFixedNumber: function toFixedNumber(value) {
    if (!_isNumber(value)) {
      return value;
    }
    if (value < 10) {
      return Number(value.toFixed(4));
    } else if (value < 10000) {
      return Number(value.toFixed(2));
    } else {
      return Number(value.toFixed(0));
    }
  }
};

exports.default = mathFn;
//# sourceMappingURL=mathFn.js.map