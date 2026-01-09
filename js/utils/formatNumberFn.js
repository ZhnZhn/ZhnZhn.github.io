"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.formatNumber = exports.formatAllNumber = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _isTypeFn = require("./isTypeFn");
const _isNumberInRange = (v, min, max) => v > min && v < max;
const _findPrecision = numberOrStr => {
  const _strDecimal = ('' + numberOrStr).split('.')[1];
  return _strDecimal ? _strDecimal.length : 0;
};
const _mathMin = Math.min;
const _crPrecision = number => {
  const _precision = _findPrecision(number);
  return _isNumberInRange(number, -1, 1) ? _mathMin(_precision, 4) : _isNumberInRange(number, -100000, 100000) ? _mathMin(_precision, 2) : 0;
};
const formatNumber = (numberOr, isSamePrecision) => !(0, _isTypeFn.isNumber)(numberOr) ? '0.00' : _isNumberInRange(numberOr, -0.01, 0.01) ? '' + numberOr : _highcharts.default.numberFormat(numberOr, isSamePrecision ? _findPrecision(numberOr) : _crPrecision(numberOr), '.', ' ');
exports.formatNumber = formatNumber;
const REG_BLANKS = /\s/g,
  STR_ZERO = '0',
  DELIMETER = ' ';
const formatAllNumber = (value, dfValue) => {
  if (value === 0) {
    return STR_ZERO;
  }
  if (!value) {
    return (0, _isTypeFn.isStr)(dfValue) ? dfValue : STR_ZERO;
  }
  if (_isNumberInRange(value, -1000, 1000)) {
    return '' + value;
  }
  const _value = ('' + value).replace(REG_BLANKS, '');
  return _highcharts.default.numberFormat(_value, _findPrecision(_value), '.', DELIMETER);
};
exports.formatAllNumber = formatAllNumber;
//# sourceMappingURL=formatNumberFn.js.map