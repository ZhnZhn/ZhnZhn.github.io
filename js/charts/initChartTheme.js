"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _treemap = _interopRequireDefault(require("highcharts/modules/treemap"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

var _offlineExporting = _interopRequireDefault(require("highcharts/modules/offline-exporting"));

var _zhnHighcharts = _interopRequireDefault(require("./plugin/zhn-highcharts"));

var _ChartTheme = _interopRequireDefault(require("./ChartTheme"));

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';
const initChartTheme = () => {
  (0, _treemap.default)(_highcharts.default);
  (0, _exporting.default)(_highcharts.default);
  (0, _offlineExporting.default)(_highcharts.default);
  (0, _zhnHighcharts.default)(_highcharts.default);

  _highcharts.default.setOptions(_ChartTheme.default);
};

var _default = initChartTheme;
exports.default = _default;
//# sourceMappingURL=initChartTheme.js.map