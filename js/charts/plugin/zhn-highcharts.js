"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _zhRemoveCategory = _interopRequireDefault(require("./zhRemoveCategory"));
var _zhCaption = _interopRequireDefault(require("./zhCaption"));
var _zhAddSeriaToYAxis = _interopRequireDefault(require("./zhAddSeriaToYAxis"));
var _zhToggleSeria = _interopRequireDefault(require("./zhToggleSeria"));
var _zhTogglePlotLines = _interopRequireDefault(require("./zhTogglePlotLines"));
var _zhToggle2H = _interopRequireDefault(require("./zhToggle2H"));
var _zhDataLabels = _interopRequireDefault(require("./zhDataLabels"));
var _zhSetPointWidth = _interopRequireDefault(require("./zhSetPointWidth"));
var _zhZoomX = _interopRequireDefault(require("./zhZoomX"));
var _zhIs = _interopRequireDefault(require("./zhIs"));
var _zhGet = _interopRequireDefault(require("./zhGet"));
var _zhDetailCharts = _interopRequireDefault(require("./zhDetailCharts"));
var _zhReflowCharts = _interopRequireDefault(require("./zhReflowCharts"));
var _zhUpdateSpacing = _interopRequireDefault(require("./zhUpdateSpacing"));
const HighchartsZhn = Highcharts => {
  const {
    Chart
  } = Highcharts;
  (0, _zhCaption.default)(Chart);
  (0, _zhTogglePlotLines.default)(Chart);
  Object.assign(Chart.prototype, {
    zhAddSeriaToYAxis: _zhAddSeriaToYAxis.default,
    //zhDetailCharts,
    zhReflowCharts: _zhReflowCharts.default,
    zhUpdateSpacing: _zhUpdateSpacing.default,
    zhDataLabels: _zhDataLabels.default,
    zhSetPointWidth: _zhSetPointWidth.default,
    zhToggleSeria: _zhToggleSeria.default,
    zhToggle2H: _zhToggle2H.default,
    zhRemoveCategory: _zhRemoveCategory.default,
    zhZoomX: _zhZoomX.default,
    ..._zhIs.default,
    ..._zhGet.default,
    ..._zhDetailCharts.default
  });
};
var _default = exports.default = HighchartsZhn;
//# sourceMappingURL=zhn-highcharts.js.map