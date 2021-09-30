"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _Type = require("../constants/Type");

const fnEcho = value => value;

const MAX_TO_ROUND = '1000000';

const _isNumber = n => typeof n === 'number' && n - n === 0;

const _formatedToBig = (v = 0, dfR) => {
  const _b = (0, _big.default)(v.toString().replace(/\s/g, ''));

  return _isNumber(dfR) ? _b.round(dfR) : _b;
};

const _roundBig = bValue => {
  const _bValue = bValue.round(4);

  return _bValue.gt(MAX_TO_ROUND) ? bValue.toFixed(0) : _bValue;
};

const _toBig = bValue => {
  if (bValue instanceof _big.default) {
    return bValue;
  }

  try {
    bValue = new _big.default(bValue);
    return bValue;
  } catch (err) {
    return new _big.default(0);
  }
};

const _roundBy = (nOrStr, by = 2) => {
  if (nOrStr == null) {
    return null;
  }

  const _floatOrNaN = parseFloat(nOrStr);

  if (_floatOrNaN - _floatOrNaN !== 0) {
    return _floatOrNaN;
  }

  return parseFloat((0, _big.default)(nOrStr).toFixed(by));
};

const mathFn = {
  roundBy: _roundBy,
  calcPercent: ({
    bValue = (0, _big.default)(0),
    bTotal = (0, _big.default)(0)
  }) => {
    bValue = _toBig(bValue);
    bTotal = _toBig(bTotal);
    return !bTotal.eq((0, _big.default)(0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) : (0, _big.default)(0).toFixed(2);
  },
  crValueMoving: ({
    nowValue,
    prevValue,
    Direction: D = _Type.Direction,
    fnFormat = fnEcho,
    dfR
  }) => {
    const bNowValue = _formatedToBig(nowValue, dfR),
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
  toFixed: value => {
    const bValue = (0, _big.default)(value);
    return bValue.gt('10') ? parseInt(bValue.toFixed(0), 10) : parseFloat(bValue.toFixed(2));
  },
  toFixedNumber: value => {
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
  crId: prefix => (prefix || '') + Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
};
var _default = mathFn;
exports.default = _default;
//# sourceMappingURL=mathFn.js.map