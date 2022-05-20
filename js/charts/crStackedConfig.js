"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Chart = require("./Chart");

var _Tooltip = require("./Tooltip");

const _crPlotOption = (type, stacking) => type === 'column' ? {
  column: (0, _Chart.fPlotOptionsColumn)({
    stacking
  })
} : {
  area: (0, _Chart.fPlotOptionsArea)({
    stacking
  })
};

const crStackedConfig = _ref => {
  let {
    type = 'area',
    stacking = 'normal',
    categories = []
  } = _ref;
  return {
    zhSeries: {
      count: 0
    },
    zhDetailCharts: [],
    credits: (0, _Chart.fCreditsRightBottom)(),
    chart: {
      type: type,
      spacingTop: _Chart.STACKED_SPACING_TOP,
      spacingBottom: _Chart.SPACING_BOTTOM,
      height: _Chart.STACKED_HEIGHT,
      zoomType: 'xy'
    },
    title: (0, _Chart.fTitle)(),
    subtitle: (0, _Chart.fSubtitle)(),
    tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipSparkStackedArea),
    xAxis: (0, _Chart.fXAxisOpposite)({
      type: "category",
      categories: categories,
      startOnTick: false,
      min: 1,
      crosshair: (0, _Chart.fCrosshair)()
    }),
    yAxis: (0, _Chart.fYAxisOpposite)(),
    plotOptions: { ..._crPlotOption(type, stacking),
      series: (0, _Chart.fPlotOptionsSeries)()
    },
    legend: (0, _Chart.fLegend)()
  };
};

var _default = crStackedConfig;
exports.default = _default;
//# sourceMappingURL=crStackedConfig.js.map