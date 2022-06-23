"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.setSeriaDataTo = exports.isLineType = exports.crSeriaConfig = exports.crAreaConfig = void 0;

var _merge = _interopRequireDefault(require("../utils/merge"));

var _Color = require("../constants/Color");

var _Chart = require("./Chart");

var _ChartFn = require("./ChartFn");

var _Tooltip = require("./Tooltip");

var _handleMouseOver = _interopRequireDefault(require("./handleMouseOver"));

const _assign = Object.assign;

const LINE_TYPES = ['spline', 'line', 'area'],
      _isLineType = chartType => LINE_TYPES.indexOf(chartType) !== -1;

const isLineType = config => _isLineType(((config.series || [])[0] || {}).type);

exports.isLineType = isLineType;

const setSeriaDataTo = (config, data, index, name, options) => {
  config.series[index] = {
    type: 'area',
    lineWidth: 1,
    name,
    data,
    ...options,
    point: (0, _Chart.fEventsMouseOver)(_handleMouseOver.default)
  };
};

exports.setSeriaDataTo = setSeriaDataTo;

const crSeriaConfig = function (_temp) {
  let {
    seriaType,
    seriaWidth,
    seriaColor,
    ...restOption
  } = _temp === void 0 ? {} : _temp;
  return {
    type: (0, _Chart.crType)(seriaType),
    lineWidth: seriaWidth != null ? seriaWidth : 1,
    color: seriaColor,
    tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipValueTdmyIf),
    ...restOption
  };
};

exports.crSeriaConfig = crSeriaConfig;

const crAreaConfig = options => {
  const config = (0, _merge.default)((0, _Chart.crAreaConfig)(options), {
    chart: {
      zoomType: 'xy',
      xDeltaCrossLabel: 4,
      yDeltaCrossLabel: 20
    },
    zhDetailCharts: []
  });
  config.xAxis = _assign((0, _Chart.fXAxisOpposite)(config.xAxis), {
    events: {
      afterSetExtremes: _ChartFn.zoomIndicatorCharts
    }
  });
  config.yAxis = _assign(config.yAxis, {
    lineWidth: 0,
    tickLength: 0,
    offset: 4,
    labels: {
      x: 8,
      y: 5
    },
    events: {
      afterSetExtremes: _ChartFn.afterSetExtremesYAxis
    }
  });
  config.yAxis.plotLines = [(0, _Chart.fPlotLine)(_Color.COLOR_HIGH, 'max'), (0, _Chart.fPlotLine)(_Color.COLOR_LOW, 'min')];
  return config;
};

exports.crAreaConfig = crAreaConfig;
//# sourceMappingURL=ChartConfigFn.js.map