"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _highcharts = _interopRequireDefault(require("highcharts"));

var _highchartsMore = _interopRequireDefault(require("highcharts/highcharts-more"));

var _treemap = _interopRequireDefault(require("highcharts/modules/treemap"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

var _offlineExporting = _interopRequireDefault(require("highcharts/modules/offline-exporting"));

var _zhnHighcharts = _interopRequireDefault(require("./plugin/zhn-highcharts"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _ChartFn = _interopRequireDefault(require("./ChartFn"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _ChartTheme = _interopRequireDefault(require("./ChartTheme"));

var _handleMouseOver = _interopRequireDefault(require("./handleMouseOver"));

var _WithIndicatorConfig = _interopRequireDefault(require("./WithIndicatorConfig"));

var _WithMarkers = _interopRequireDefault(require("./WithMarkers"));

var _WithPieConfig = _interopRequireDefault(require("./WithPieConfig"));

var _WithStackedAreaConfig = _interopRequireDefault(require("./WithStackedAreaConfig"));

var _WithStackedColumnConfig = _interopRequireDefault(require("./WithStackedColumnConfig"));

var _WithTreeMapConfig = _interopRequireDefault(require("./WithTreeMapConfig"));

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';
var _merge = _highcharts["default"].merge;
var _assign = Object.assign;

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _crScatterSeria = function _crScatterSeria(color, pointFormatter, data) {
  return {
    type: 'scatter',
    color: color,
    tooltip: _Chart["default"].fTooltip(pointFormatter),
    data: data
  };
};

var _crSeriaOption = function _crSeriaOption(color, option) {
  return _assign({
    type: 'line',
    visible: false,
    color: color,
    marker: {
      radius: 3,
      symbol: "circle"
    }
  }, option);
};

var ChartConfig = (0, _extends2["default"])({}, _WithIndicatorConfig["default"], _WithMarkers["default"], _WithPieConfig["default"], _WithStackedAreaConfig["default"], _WithStackedColumnConfig["default"], _WithTreeMapConfig["default"], {
  init: function init() {
    (0, _highchartsMore["default"])(_highcharts["default"]);
    (0, _treemap["default"])(_highcharts["default"]);
    (0, _exporting["default"])(_highcharts["default"]);
    (0, _offlineExporting["default"])(_highcharts["default"]);
    (0, _zhnHighcharts["default"])(_highcharts["default"]);

    _highcharts["default"].setOptions(_ChartTheme["default"]);
  },
  setSerieData: function setSerieData(config, data, index, name, options) {
    config.series[index] = _assign({
      type: 'area',
      name: name,
      data: data,
      lineWidth: 1
    }, options);
    config.series[index].point = _Chart["default"].fEventsMouseOver(_handleMouseOver["default"]);
  },
  setStockSerias: function setStockSerias(config, dClose, dHigh, dLow, dOpen, id) {
    this.setSerieData(config, dClose, 0, 'Close');
    this.setSerieData(config, dHigh, 1, 'High', _crSeriaOption(_Color["default"].S_HIGH));
    this.setSerieData(config, dLow, 2, 'Low', _crSeriaOption(_Color["default"].S_LOW));
    this.setSerieData(config, dOpen, 3, 'Open', _crSeriaOption(_Color["default"].S_OPEN));
  },
  getColor: function getColor(seriaIndex) {
    var colors = _ChartTheme["default"].colors;
    return colors[seriaIndex % colors.length];
  },
  crDividendSeria: function crDividendSeria(data) {
    return _crScatterSeria(_Color["default"].EX_DIVIDEND, _Tooltip["default"].exDividend, data);
  },
  crSplitRatioSeria: function crSplitRatioSeria(data) {
    return _crScatterSeria(_Color["default"].SPLIT_RATIO, _Tooltip["default"].splitRatio, data);
  },
  crSeria: function crSeria(option) {
    if (option === void 0) {
      option = {};
    }

    var _option = option,
        seriaType = _option.seriaType,
        seriaWidth = _option.seriaWidth,
        seriaColor = _option.seriaColor,
        tp = _option.tp,
        restOption = (0, _objectWithoutPropertiesLoose2["default"])(_option, ["seriaType", "seriaWidth", "seriaColor", "tp"]),
        type = _isStr(seriaType) ? seriaType.toLowerCase() : 'spline',
        pointFormatter = tp && _Tooltip["default"][tp] || _Tooltip["default"].vTdmyIf;
    return (0, _extends2["default"])({
      type: type,
      lineWidth: seriaWidth != null ? seriaWidth : 1,
      color: seriaColor,
      tooltip: _Chart["default"].fTooltip(pointFormatter)
    }, restOption);
  },
  crAreaConfig: function crAreaConfig(options) {
    var config = _merge(_Chart["default"].crAreaConfig(options), {
      chart: {
        zoomType: 'xy',
        resetZoomButton: _Chart["default"].fResetZoomButton({
          position: {
            x: -10
          }
        }),
        xDeltaCrossLabel: 4,
        yDeltaCrossLabel: 20
      },
      zhDetailCharts: []
    });

    config.xAxis = _assign(_Chart["default"].fXAxisOpposite(config.xAxis), {
      events: {
        afterSetExtremes: _ChartFn["default"].zoomIndicatorCharts
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
        afterSetExtremes: _ChartFn["default"].afterSetExtremesYAxis
      }
    });
    config.yAxis.plotLines = [_Chart["default"].fPlotLine(_Color["default"].HIGH, 'max'), _Chart["default"].fPlotLine(_Color["default"].LOW, 'min')];
    return config;
  }
});
var _default = ChartConfig;
exports["default"] = _default;
//# sourceMappingURL=ChartConfig.js.map