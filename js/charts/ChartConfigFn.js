"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.setSeriaDataTo = exports.initChartConfig = exports.getSeriaColorByIndex = exports.crSeriaConfig = exports.crAreaConfig = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _treemap = _interopRequireDefault(require("highcharts/modules/treemap"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

var _offlineExporting = _interopRequireDefault(require("highcharts/modules/offline-exporting"));

var _zhnHighcharts = _interopRequireDefault(require("./plugin/zhn-highcharts"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var _Chart = require("./Chart");

var _ChartFn = require("./ChartFn");

var _Tooltip = require("./Tooltip");

var _ChartTheme = _interopRequireDefault(require("./ChartTheme"));

var _handleMouseOver = _interopRequireDefault(require("./handleMouseOver"));

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';
const _merge = _highcharts.default.merge,
      _assign = Object.assign;

const initChartConfig = () => {
  (0, _treemap.default)(_highcharts.default);
  (0, _exporting.default)(_highcharts.default);
  (0, _offlineExporting.default)(_highcharts.default);
  (0, _zhnHighcharts.default)(_highcharts.default);

  _highcharts.default.setOptions(_ChartTheme.default);
};

exports.initChartConfig = initChartConfig;

const setSeriaDataTo = (config, data, index, name, options) => {
  const {
    type = 'area',
    lineWidth = 1,
    ...restOptions
  } = options || {};
  config.series[index] = _assign({
    type,
    lineWidth,
    name,
    data
  }, restOptions, {
    point: (0, _Chart.fEventsMouseOver)(_handleMouseOver.default)
  });
};

exports.setSeriaDataTo = setSeriaDataTo;

const getSeriaColorByIndex = seriaIndex => {
  const colors = _ChartTheme.default.colors;
  return colors[seriaIndex % colors.length];
};

exports.getSeriaColorByIndex = getSeriaColorByIndex;

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
  const config = _merge((0, _Chart.crAreaConfig)(options), {
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
  config.yAxis.plotLines = [(0, _Chart.fPlotLine)(_Color.default.HIGH, 'max'), (0, _Chart.fPlotLine)(_Color.default.LOW, 'min')];
  return config;
};

exports.crAreaConfig = crAreaConfig;
//# sourceMappingURL=ChartConfigFn.js.map