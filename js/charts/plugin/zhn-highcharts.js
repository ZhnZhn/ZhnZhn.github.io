'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wrapExportChartLocal = require('./wrapExportChartLocal');

var _wrapExportChartLocal2 = _interopRequireDefault(_wrapExportChartLocal);

var _zhRemoveCategory = require('./zhRemoveCategory');

var _zhRemoveCategory2 = _interopRequireDefault(_zhRemoveCategory);

var _zhCaption = require('./zhCaption');

var _zhCaption2 = _interopRequireDefault(_zhCaption);

var _zhAddSeriaToYAxis = require('./zhAddSeriaToYAxis');

var _zhAddSeriaToYAxis2 = _interopRequireDefault(_zhAddSeriaToYAxis);

var _zhToggleSeria = require('./zhToggleSeria');

var _zhToggleSeria2 = _interopRequireDefault(_zhToggleSeria);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HighchartsZhn = function HighchartsZhn(Highcharts) {
  var wrap = Highcharts.wrap,
      Chart = Highcharts.Chart;

  (0, _wrapExportChartLocal2.default)(wrap, Chart);
  (0, _zhRemoveCategory2.default)(Chart);
  (0, _zhCaption2.default)(Chart);
  (0, _zhAddSeriaToYAxis2.default)(Chart);
  (0, _zhToggleSeria2.default)(Chart);
};

exports.default = HighchartsZhn;
//# sourceMappingURL=zhn-highcharts.js.map