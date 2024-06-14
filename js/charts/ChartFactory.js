"use strict";

exports.__esModule = true;
exports.crBarOrColumnConfigImpl = void 0;
var _Chart = require("./Chart");
var _Tooltip = require("./Tooltip");
const DF_COLOR = '#8085e9';
const _assign = Object.assign,
  _crPlotOption = pointWidth => ({
    pointWidth,
    color: DF_COLOR,
    minPointLength: 5,
    pointPadding: 0,
    borderWidth: 0,
    groupPadding: 0.2,
    shadow: false
  });
const _crEmptyText = () => ({
    text: ''
  }),
  _crAxisLabels = (x, y, color) => {
    const _axisLabelsConfig = {
      x,
      y
    };
    if (color) {
      _axisLabelsConfig.style = {
        color
      };
    }
    return _axisLabelsConfig;
  },
  _crCategoryConfig = (seriaColor, yAxisLabelsColor) => ({
    chart: {
      panKey: void 0,
      panning: false,
      spacingTop: 25
    },
    title: _crEmptyText(),
    subtitle: _crEmptyText(),
    tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipCategory),
    xAxis: {
      type: "category",
      categories: [],
      crosshair: true,
      gridLineWidth: 0
    },
    yAxis: {
      //min: 0,
      opposite: true,
      lineWidth: 0,
      tickLength: 0,
      gridLineDashStyle: 'Dot',
      labels: _crAxisLabels(3, 0, yAxisLabelsColor),
      title: _crEmptyText()
    },
    legend: {
      enabled: false,
      align: 'right',
      verticalAlign: 'top',
      layout: 'horizontal',
      x: 0,
      y: -25
    },
    plotOptions: {},
    series: [{
      name: 'Series 1'
    }]
  }),
  _crChartTypeMargin = (type, marginTop, marginBottom) => ({
    type,
    marginTop,
    marginBottom
  });
const _crColumnConfig = (seriaColor, yAxisLabelsColor) => {
  const config = _crCategoryConfig(seriaColor, yAxisLabelsColor);
  _assign(config.chart, _crChartTypeMargin("column", 60, 100));
  _assign(config.plotOptions, {
    column: _crPlotOption(6)
  });
  return config;
};
const _crBarConfig = (seriaColor, yAxisLabelsColor) => {
  const config = _crCategoryConfig(seriaColor, yAxisLabelsColor);
  _assign(config.chart, _crChartTypeMargin("bar", 50, 35), {
    height: 450
  });
  _assign(config.yAxis, {
    opposite: false,
    gridLineDashStyle: 'ShortDot',
    labels: _crAxisLabels(0, 14, yAxisLabelsColor)
  });
  _assign(config.plotOptions, {
    bar: _crPlotOption(4)
  });
  return config;
};
const crBarOrColumnConfigImpl = (type, seriaColor, yAxisLabelsColor) => (type === 'BAR' ? _crBarConfig : _crColumnConfig)(seriaColor, yAxisLabelsColor);
exports.crBarOrColumnConfigImpl = crBarOrColumnConfigImpl;
//# sourceMappingURL=ChartFactory.js.map