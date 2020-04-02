"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _isNumberInRange = function _isNumberInRange(v, min, max) {
  return v > min && v < max;
};

var _crPrecision = function _crPrecision(value) {
  var _strDecimal = ('' + value).split('.')[1],
      _len = _strDecimal ? _strDecimal.length : 0;

  if (_isNumberInRange(value, -1, 1)) {
    return _len < 5 ? _len : 4;
  }

  return _isNumberInRange(value, -100000, 100000) ? _len < 3 ? _len : 2 : 0;
};

var formatNumber = function formatNumber(value) {
  if (!_isNumber(value)) {
    return '0.00';
  }

  if (_isNumberInRange(value, -0.01, 0.01)) {
    return '' + value;
  }

  var _decimal = _crPrecision(value);

  return _highcharts["default"].numberFormat(value, _decimal, '.', ' ');
};

var _default = formatNumber;
exports["default"] = _default;
//# sourceMappingURL=formatNumber.js.map