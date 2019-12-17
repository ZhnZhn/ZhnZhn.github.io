"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var REG_BLANKS = /\s/g;
var DF_VALUE = '0';
var DELIMETER = ' ';

var formatAllNumber = function formatAllNumber(value) {
  if (!value) {
    return DF_VALUE;
  }

  var _value = ('' + value).replace(REG_BLANKS, ''),
      arrSplit = _value.split('.'),
      decimal = arrSplit[1] ? arrSplit[1].length : 0;

  return _highcharts["default"].numberFormat(_value, decimal, '.', DELIMETER);
};

var _default = formatAllNumber;
exports["default"] = _default;
//# sourceMappingURL=formatAllNumber.js.map