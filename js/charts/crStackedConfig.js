"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Chart = _interopRequireDefault(require("./Chart"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

const _crPlotOption = (type, stacking) => type === 'column' ? {
  column: _Chart.default.fPlotOptionsColumn({
    stacking
  })
} : {
  area: _Chart.default.fPlotOptionsArea({
    stacking
  })
};

const crStackedConfig = ({
  type = 'area',
  stacking = 'normal',
  categories = []
}) => ({
  zhSeries: {
    count: 0
  },
  zhDetailCharts: [],
  credits: _Chart.default.fCreditsRightBottom(),
  chart: {
    type: type,
    spacingTop: _Chart.default.STACKED_SPACING_TOP,
    spacingBottom: _Chart.default.SPACING_BOTTOM,
    height: _Chart.default.STACKED_HEIGHT,
    zoomType: 'xy'
  },
  title: _Chart.default.fTitle(),
  subtitle: _Chart.default.fSubtitle(),
  tooltip: _Chart.default.fTooltip(_Tooltip.default.sparkStackedArea),
  xAxis: _Chart.default.fXAxisOpposite({
    type: "category",
    categories: categories,
    startOnTick: false,
    min: 1,
    crosshair: _Chart.default.fCrosshair()
  }),
  yAxis: _Chart.default.fYAxisOpposite(),
  plotOptions: { ..._crPlotOption(type, stacking),
    series: _Chart.default.fPlotOptionsSeries()
  },
  legend: _Chart.default.fLegend()
});

var _default = crStackedConfig;
exports.default = _default;
//# sourceMappingURL=crStackedConfig.js.map