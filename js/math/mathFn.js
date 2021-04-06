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
  return typeof n === 'number' && n - n === 0;
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

  return _bValue.gt(MAX_TO_ROUND) ? bValue.toFixed(0) : _bValue;
};

var _toBig = function _toBig(bValue) {
  if (bValue instanceof _big["default"]) {
    return bValue;
  }

  try {
    bValue = new _big["default"](bValue);
    return bValue;
  } catch (err) {
    return new _big["default"](0);
  }
};

var _roundBy = function _roundBy(nOrStr, by) {
  if (by === void 0) {
    by = 2;
  }

  return nOrStr != null ? parseFloat((0, _big["default"])(nOrStr).toFixed(by)) : null;
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
  crValueMoving: function crValueMoving(_ref2) {
    var nowValue = _ref2.nowValue,
        prevValue = _ref2.prevValue,
        _ref2$Direction = _ref2.Direction,
        D = _ref2$Direction === void 0 ? {} : _ref2$Direction,
        _ref2$fnFormat = _ref2.fnFormat,
        fnFormat = _ref2$fnFormat === void 0 ? fnEcho : _ref2$fnFormat,
        dfR = _ref2.dfR;

    var bNowValue = _formatedToBig(nowValue, dfR),
        bPrevValue = _formatedToBig(prevValue, dfR),
        _bDelta = bPrevValue.minus(bNowValue),
        _direction = _bDelta.gt(0.0) ? D.DOWN : _bDelta.lt(0.0) ? D.UP : D.EQUAL,
        _bPercent = mathFn.calcPercent({
      bValue: _bDelta,
      bTotal: bPrevValue
    }),
        _bNowValue = _roundBig(bNowValue),
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
  },
  crId: function crId(prefix) {
    return (prefix || '') + Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }
};
var _default = mathFn;
exports["default"] = _default;
//# sourceMappingURL=mathFn.js.map