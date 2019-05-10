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

var _zhTogglePlotLines = require('./zhTogglePlotLines');

var _zhTogglePlotLines2 = _interopRequireDefault(_zhTogglePlotLines);

var _zhToggle2H = require('./zhToggle2H');

var _zhToggle2H2 = _interopRequireDefault(_zhToggle2H);

var _zhEnableDataLabels = require('./zhEnableDataLabels');

var _zhEnableDataLabels2 = _interopRequireDefault(_zhEnableDataLabels);

var _zhGetId = require('./zhGetId');

var _zhGetId2 = _interopRequireDefault(_zhGetId);

var _zhGetFromToDates = require('./zhGetFromToDates');

var _zhGetFromToDates2 = _interopRequireDefault(_zhGetFromToDates);

var _zhZoomX = require('./zhZoomX');

var _zhZoomX2 = _interopRequireDefault(_zhZoomX);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HighchartsZhn = function HighchartsZhn(Highcharts) {
  var wrap = Highcharts.wrap,
      Chart = Highcharts.Chart;

  (0, _wrapExportChartLocal2.default)(wrap, Chart);
  (0, _zhCaption2.default)(Chart);
  (0, _zhTogglePlotLines2.default)(Chart);
  Object.assign(Chart.prototype, {
    zhRemoveCategory: _zhRemoveCategory2.default,
    zhAddSeriaToYAxis: _zhAddSeriaToYAxis2.default,
    zhToggleSeria: _zhToggleSeria2.default,
    zhToggle2H: _zhToggle2H2.default,
    zhEnableDataLabels: _zhEnableDataLabels2.default,
    zhGetId: _zhGetId2.default,
    zhGetFromToDates: _zhGetFromToDates2.default,
    zhZoomX: _zhZoomX2.default
  });
};

exports.default = HighchartsZhn;
//# sourceMappingURL=zhn-highcharts.js.map