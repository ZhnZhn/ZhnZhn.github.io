'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wrapExportChartLocal = require('./wrapExportChartLocal');

var _wrapExportChartLocal2 = _interopRequireDefault(_wrapExportChartLocal);

var _wrapZhRemoveCategory = require('./wrapZhRemoveCategory');

var _wrapZhRemoveCategory2 = _interopRequireDefault(_wrapZhRemoveCategory);

var _wrapZhCaption = require('./wrapZhCaption');

var _wrapZhCaption2 = _interopRequireDefault(_wrapZhCaption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HighchartsZhn = function HighchartsZhn(Highcharts) {
  var wrap = Highcharts.wrap,
      Chart = Highcharts.Chart;

  (0, _wrapExportChartLocal2.default)(wrap, Chart);
  (0, _wrapZhRemoveCategory2.default)(wrap, Chart);
  (0, _wrapZhCaption2.default)(wrap, Chart);
};

exports.default = HighchartsZhn;
//# sourceMappingURL=zhn-highcharts.js.map