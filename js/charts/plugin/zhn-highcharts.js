"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _wrapExportChartLocal = _interopRequireDefault(require("./wrapExportChartLocal"));

var _zhRemoveCategory = _interopRequireDefault(require("./zhRemoveCategory"));

var _zhCaption = _interopRequireDefault(require("./zhCaption"));

var _zhAddSeriaToYAxis = _interopRequireDefault(require("./zhAddSeriaToYAxis"));

var _zhToggleSeria = _interopRequireDefault(require("./zhToggleSeria"));

var _zhTogglePlotLines = _interopRequireDefault(require("./zhTogglePlotLines"));

var _zhToggle2H = _interopRequireDefault(require("./zhToggle2H"));

var _zhEnableDataLabels = _interopRequireDefault(require("./zhEnableDataLabels"));

var _zhIsDaily = _interopRequireDefault(require("./zhIsDaily"));

var _zhGetId = _interopRequireDefault(require("./zhGetId"));

var _zhGetFromToDates = _interopRequireDefault(require("./zhGetFromToDates"));

var _zhZoomX = _interopRequireDefault(require("./zhZoomX"));

var HighchartsZhn = function HighchartsZhn(Highcharts) {
  var wrap = Highcharts.wrap,
      Chart = Highcharts.Chart;
  (0, _wrapExportChartLocal["default"])(wrap, Chart);
  (0, _zhCaption["default"])(Chart);
  (0, _zhTogglePlotLines["default"])(Chart);
  Object.assign(Chart.prototype, {
    zhRemoveCategory: _zhRemoveCategory["default"],
    zhAddSeriaToYAxis: _zhAddSeriaToYAxis["default"],
    zhToggleSeria: _zhToggleSeria["default"],
    zhToggle2H: _zhToggle2H["default"],
    zhEnableDataLabels: _zhEnableDataLabels["default"],
    zhIsDaily: _zhIsDaily["default"],
    zhGetId: _zhGetId["default"],
    zhGetFromToDates: _zhGetFromToDates["default"],
    zhZoomX: _zhZoomX["default"]
  });
};

var _default = HighchartsZhn;
exports["default"] = _default;
//# sourceMappingURL=zhn-highcharts.js.map