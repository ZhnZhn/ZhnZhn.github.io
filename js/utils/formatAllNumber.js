'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatAllNumber = function formatAllNumber(value) {
    var arrSplit = ('' + value).split('.'),
        decimal = arrSplit[1] ? arrSplit[1].length : 0;
    return _highcharts2.default.numberFormat(value, decimal, '.', ' ');
};

exports.default = formatAllNumber;
//# sourceMappingURL=formatAllNumber.js.map