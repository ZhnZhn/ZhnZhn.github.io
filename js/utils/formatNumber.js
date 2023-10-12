"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
const _isNumber = n => typeof n === 'number' && n - n === 0;
const _isNumberInRange = (v, min, max) => v > min && v < max;
const _findPrecision = value => {
  const _strDecimal = ('' + value).split('.')[1];
  return _strDecimal ? _strDecimal.length : 0;
};
const _crPrecision = value => {
  const _len = _findPrecision(value);
  if (_isNumberInRange(value, -1, 1)) {
    return _len < 5 ? _len : 4;
  }
  return _isNumberInRange(value, -100000, 100000) ? _len < 3 ? _len : 2 : 0;
};
const formatNumber = (value, isSamePrecision) => {
  if (!_isNumber(value)) {
    return '0.00';
  }
  if (_isNumberInRange(value, -0.01, 0.01)) {
    return '' + value;
  }
  const _decimal = isSamePrecision ? _findPrecision(value) : _crPrecision(value);
  return _highcharts.default.numberFormat(value, _decimal, '.', ' ');
};
var _default = exports.default = formatNumber;
//# sourceMappingURL=formatNumber.js.map