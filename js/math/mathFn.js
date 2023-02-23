"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toFixedNumber = exports.toFixed = exports.roundBy = exports.crValueMoving = exports.crId = exports.calcPercent = void 0;
var _big = _interopRequireDefault(require("big.js"));
var _DirectionType = require("../constants/DirectionType");
const MAX_TO_ROUND = 1000000;
const FN_ECHO = value => value;
const _isNumber = n => typeof n === 'number' && n - n === 0;
const _formatedToBig = function (v, dfR) {
  if (v === void 0) {
    v = 0;
  }
  const _b = (0, _big.default)(v.toString().replace(/\s/g, ''));
  return _isNumber(dfR) ? _b.round(dfR) : _b;
};
const _toBig = bValue => {
  if (bValue instanceof _big.default) {
    return bValue;
  }
  try {
    return new _big.default(bValue);
  } catch (err) {
    return new _big.default(0);
  }
};
const _roundBig = bValue => {
  const _bValue = bValue.round(4);
  return _bValue.gt(MAX_TO_ROUND) ? bValue.toFixed(0) : _bValue;
};
const roundBy = function (nOrStr, by) {
  if (by === void 0) {
    by = 2;
  }
  if (nOrStr == null) {
    return null;
  }
  const _floatOrNaN = parseFloat(nOrStr);
  return _floatOrNaN - _floatOrNaN === 0 ? parseFloat((0, _big.default)(nOrStr).toFixed(by)) : _floatOrNaN;
};
exports.roundBy = roundBy;
const calcPercent = _ref => {
  let {
    bValue = (0, _big.default)(0),
    bTotal = (0, _big.default)(0)
  } = _ref;
  bValue = _toBig(bValue);
  bTotal = _toBig(bTotal);
  return !bTotal.eq((0, _big.default)(0)) ? bValue.times(100).div(bTotal).abs().toFixed(2) : (0, _big.default)(0).toFixed(2);
};
exports.calcPercent = calcPercent;
const _toStr = bValue => bValue.toString();
const crValueMoving = function (_temp) {
  let {
    nowValue,
    prevValue,
    fnFormat = FN_ECHO,
    dfR
  } = _temp === void 0 ? {} : _temp;
  const bNowValue = _formatedToBig(nowValue, dfR),
    bPrevValue = _formatedToBig(prevValue, dfR),
    _bDelta = bPrevValue.minus(bNowValue),
    _direction = _bDelta.gt(0.0) ? _DirectionType.DT_DOWN : _bDelta.lt(0.0) ? _DirectionType.DT_UP : _DirectionType.DT_EQUAL,
    _bPercent = calcPercent({
      bValue: _bDelta,
      bTotal: bPrevValue
    }),
    _bNowValue = _roundBig(bNowValue),
    _bDeltaAbs = _roundBig(_bDelta.abs());
  return {
    value: _toStr(fnFormat(_bNowValue)),
    _value: _toStr(_bNowValue),
    delta: _toStr(fnFormat(_bDeltaAbs)),
    _deltaAbs: _toStr(_bDeltaAbs),
    percent: _toStr(_bPercent) + '%',
    _percentAbs: _toStr(_bPercent),
    direction: _direction
  };
};
exports.crValueMoving = crValueMoving;
const toFixed = value => {
  const bValue = (0, _big.default)(value);
  return bValue.gt('10') ? parseInt(bValue.toFixed(0), 10) : parseFloat(bValue.toFixed(2));
};
exports.toFixed = toFixed;
const toFixedNumber = value => !_isNumber(value) ? value : roundBy(value, value < 10 ? 4 : value < 10000 ? 2 : 0);
exports.toFixedNumber = toFixedNumber;
const crId = prefix => (prefix || '') + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
exports.crId = crId;
//# sourceMappingURL=mathFn.js.map