"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _big = _interopRequireDefault(require("big.js"));

var fnEcho = function fnEcho(value) {
  return value;
};

var MAX_TO_ROUND = '1000000';

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && !Number.isNaN(n);
};

var _formatedToBig = function _formatedToBig(v, dfR) {
  if (v === void 0) {
    v = 0;
  }

  var _b = (0, _big["default"])(v.toString().replace(/\s/g, ''));

  return _isNumber(dfR) ? _b.round(dfR) : _b;
};

var _roundBig = function _roundBig(bValue) {
  var _bValue = bValue.round(4);

  if (_bValue.gt(MAX_TO_ROUND)) {
    _bValue = bValue.toFixed(0);
  }

  return _bValue;
};

var _toBig = function _toBig(bValue, dfValue) {
  if (dfValue === void 0) {
    dfValue = 0;
  }

  if (bValue instanceof _big["default"]) {
    return bValue;
  }

  try {
    bValue = new _big["default"](bValue);
    return bValue;
  } catch (err) {
    return new _big["default"](dfValue);
  }
};

var _roundBy = function _roundBy(nOrStr, by) {
  if (by === void 0) {
    by = 2;
  }

  return parseFloat((0, _big["default"])(nOrStr).toFixed(by));
};

var mathFn = {
  roundBy: _roundBy,
  calcPercent: function calcPercent(_ref) {
    var _ref$bValue = _ref.bValue,
        bValue = _ref$bValue === void 0 ? (0, _big["default"])(0) : _ref$bValue,
        _ref$bTotal = _ref.bTotal,
        bTotal = _ref$bTotal === void 0 ? (0, _big["default"])(0) : _ref$bTotal;
    bValue = _toBig(bValue);
    bTotal = _toBig(bTotal);
    return !bTotal.eq((0, _big["default"])(0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) : (0, _big["default"])(0).toFixed(2);
  },
  crValueMoving: function crValueMoving(option) {
    var nowValue = option.nowValue,
        prevValue = option.prevValue,
        _option$Direction = option.Direction,
        D = _option$Direction === void 0 ? {} : _option$Direction,
        _option$fnFormat = option.fnFormat,
        fnFormat = _option$fnFormat === void 0 ? fnEcho : _option$fnFormat,
        dfR = option.dfR,
        bNowValue = _formatedToBig(nowValue, dfR),
        bPrevValue = _formatedToBig(prevValue, dfR),
        _bDelta = bPrevValue.minus(bNowValue),
        _direction = _bDelta.gt(0.0) ? D.DOWN : _bDelta.lt(0.0) ? D.UP : D.EQUAL;

    var _bPercent = mathFn.calcPercent({
      bValue: _bDelta,
      bTotal: bPrevValue
    });

    var _bNowValue = _roundBig(bNowValue),
        _bDeltaAbs = _roundBig(_bDelta.abs());

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
    var bValue = (0, _big["default"])(value);
    return bValue.gt('10') ? parseInt(bValue.toFixed(0), 10) : parseFloat(bValue.toFixed(2));
  },
  toFixedNumber: function toFixedNumber(value) {
    if (!_isNumber(value)) {
      return value;
    }

    if (value < 10) {
      return _roundBy(value, 4);
    } else if (value < 10000) {
      return _roundBy(value, 2);
    } else {
      return _roundBy(value, 0);
    }
  }
};
var _default = mathFn;
exports["default"] = _default;
//# sourceMappingURL=mathFn.js.map