"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _isTypeFn = require("./isTypeFn");
const REG_BLANKS = /\s/g,
  STR_ZERO = '0',
  DELIMETER = ' ';
const _calcDecimal = strNumber => {
  const arrSplit = strNumber.split('.');
  return arrSplit[1] ? arrSplit[1].length : 0;
};
const formatAllNumber = function (value, dfValue) {
  if (value === 0) {
    return STR_ZERO;
  }
  if (!value) {
    return (0, _isTypeFn.isStr)(dfValue) ? dfValue : STR_ZERO;
  }
  if (value < 1000 && value > -1000) {
    return '' + value;
  }
  const _value = ('' + value).replace(REG_BLANKS, ''),
    decimal = _calcDecimal(_value);
  return _highcharts.default.numberFormat(_value, decimal, '.', DELIMETER);
};
var _default = exports.default = formatAllNumber;
//# sourceMappingURL=formatAllNumber.js.map