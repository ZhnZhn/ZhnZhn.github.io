"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var formatNumber = function formatNumber(value) {
  if (value == null) {
    return '0.00';
  }

  if (typeof value === 'number' && value > -0.01 && value < 0.01) {
    return '' + value;
  }

  var _arr = ('' + value).split('.'),
      _decimal = _arr[1] ? 2 : 0;

  return _highcharts["default"].numberFormat(value, _decimal, '.', ' ');
};

var _default = formatNumber;
exports["default"] = _default;
//# sourceMappingURL=formatNumber.js.map