"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Chart = _interopRequireDefault(require("./Chart"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var WithStackedColumnConfig = {
  fBaseStackedColumnConfig: function fBaseStackedColumnConfig(_ref) {
    var _ref$stacking = _ref.stacking,
        stacking = _ref$stacking === void 0 ? 'normal' : _ref$stacking;
    return {
      zhSeries: {
        count: 0
      },
      zhDetailCharts: [],
      credits: _Chart["default"].fCreditsRightBottom(),
      chart: {
        type: 'column',
        spacingTop: _Chart["default"].STACKED_SPACING_TOP,
        spacingBottom: _Chart["default"].SPACING_BOTTOM,
        zoomType: 'xy',
        resetZoomButton: _Chart["default"].fResetZoomButton()
      },
      title: _Chart["default"].fTitle({
        y: _Chart["default"].STACKED_TITLE_Y
      }),
      subtitle: _Chart["default"].fSubtitle({
        y: _Chart["default"].STACKED_SUBTITLE_Y
      }),
      tooltip: _Chart["default"].fTooltip(_Tooltip["default"].sparkStackedArea),
      xAxis: _Chart["default"].fXAxisOpposite({
        categories: [],
        type: "category",
        startOnTick: false,
        min: 1,
        crosshair: _Chart["default"].fCrosshair()
      }),
      yAxis: _Chart["default"].fYAxisOpposite(),
      plotOptions: {
        column: _Chart["default"].fPlotOptionsColumn({
          stacking: stacking
        }),
        series: _Chart["default"].fPlotOptionsSeries()
      },
      legend: _Chart["default"].fLegend()
    };
  },
  fStackedColumnSeria: function fStackedColumnSeria(_ref2) {
    var zhSeriaId = _ref2.zhSeriaId,
        name = _ref2.name,
        _ref2$data = _ref2.data,
        data = _ref2$data === void 0 ? [] : _ref2$data,
        _ref2$color = _ref2.color,
        color = _ref2$color === void 0 ? 'gray' : _ref2$color;
    return {
      zhSeriaId: zhSeriaId,
      name: name,
      data: data,
      borderColor: 'transparent',
      borderWidth: 1,
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      pointPadding: 0.01,
      marker: {
        radius: 6,
        symbol: 'circle'
      },
      dataLabels: {
        enabled: false,
        format: '{point.percent}',
        color: 'black',
        style: {
          textShadow: 'none'
        }
      },
      states: {
        hover: {
          enabled: true,
          borderColor: 'yellow'
        }
      }
    };
  }
};
var _default = WithStackedColumnConfig;
exports["default"] = _default;
//# sourceMappingURL=WithStackedColumnConfig.js.map