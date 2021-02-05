"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var REG_BLANKS = /\s/g,
    DF_VALUE = '0',
    DELIMETER = ' ';

var _calcDecimal = function _calcDecimal(strNumber) {
  var arrSplit = strNumber.split('.');
  return arrSplit[1] ? arrSplit[1].length : 0;
};

var formatAllNumber = function formatAllNumber(value) {
  if (!value) {
    return DF_VALUE;
  }

  if (value < 1000 && value > -1000) {
    return '' + value;
  }

  var _value = ('' + value).replace(REG_BLANKS, ''),
      decimal = _calcDecimal(_value);

  return _highcharts["default"].numberFormat(_value, decimal, '.', DELIMETER);
};

var _default = formatAllNumber;
exports["default"] = _default;
//# sourceMappingURL=formatAllNumber.js.map