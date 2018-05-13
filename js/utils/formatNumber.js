'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatNumber = function formatNumber(value) {
  if (typeof value === 'number' && value < 0.01) {
    return '' + value;
  }
  var arrSplit = (value + '').split('.'),
      decimal = arrSplit[1] ? 2 : 0;
  return _highcharts2.default.numberFormat(value, decimal, '.', ' ');
};

exports.default = formatNumber;
//# sourceMappingURL=formatNumber.js.map