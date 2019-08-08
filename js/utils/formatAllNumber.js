'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _highcharts2.default.numberFormat(_value, decimal, '.', DELIMETER);
};

exports.default = formatAllNumber;
//# sourceMappingURL=formatAllNumber.js.map