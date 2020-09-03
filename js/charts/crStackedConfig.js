"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _crPlotOption = function _crPlotOption(type, stacking) {
  return type === 'column' ? {
    column: _Chart["default"].fPlotOptionsColumn({
      stacking: stacking
    })
  } : {
    area: _Chart["default"].fPlotOptionsArea({
      stacking: stacking
    })
  };
};

var crStackedConfig = function crStackedConfig(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'area' : _ref$type,
      _ref$stacking = _ref.stacking,
      stacking = _ref$stacking === void 0 ? 'normal' : _ref$stacking,
      _ref$categories = _ref.categories,
      categories = _ref$categories === void 0 ? [] : _ref$categories;
  return {
    zhSeries: {
      count: 0
    },
    zhDetailCharts: [],
    credits: _Chart["default"].fCreditsRightBottom(),
    chart: {
      type: type,
      spacingTop: _Chart["default"].STACKED_SPACING_TOP,
      spacingBottom: _Chart["default"].SPACING_BOTTOM,
      height: _Chart["default"].STACKED_HEIGHT,
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
      type: "category",
      categories: categories,
      startOnTick: false,
      min: 1,
      crosshair: _Chart["default"].fCrosshair()
    }),
    yAxis: _Chart["default"].fYAxisOpposite(),
    plotOptions: (0, _extends2["default"])({}, _crPlotOption(type, stacking), {
      series: _Chart["default"].fPlotOptionsSeries()
    }),
    legend: _Chart["default"].fLegend()
  };
};

var _default = crStackedConfig;
exports["default"] = _default;
//# sourceMappingURL=crStackedConfig.js.map