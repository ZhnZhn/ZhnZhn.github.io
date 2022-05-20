"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _treemap = _interopRequireDefault(require("highcharts/modules/treemap"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

var _offlineExporting = _interopRequireDefault(require("highcharts/modules/offline-exporting"));

var _zhnHighcharts = _interopRequireDefault(require("./plugin/zhn-highcharts"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _ChartFn = require("./ChartFn");

var _Tooltip = require("./Tooltip");

var _ChartTheme = _interopRequireDefault(require("./ChartTheme"));

var _handleMouseOver = _interopRequireDefault(require("./handleMouseOver"));

var _WithPieConfig = _interopRequireDefault(require("./WithPieConfig"));

var _WithStackedAreaConfig = _interopRequireDefault(require("./WithStackedAreaConfig"));

var _WithStackedColumnConfig = _interopRequireDefault(require("./WithStackedColumnConfig"));

var _WithTreeMapConfig = _interopRequireDefault(require("./WithTreeMapConfig"));

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';
const _merge = _highcharts.default.merge;
const _assign = Object.assign;
const ChartConfig = { ..._WithPieConfig.default,
  ..._WithStackedAreaConfig.default,
  ..._WithStackedColumnConfig.default,
  ..._WithTreeMapConfig.default,

  init() {
    (0, _treemap.default)(_highcharts.default);
    (0, _exporting.default)(_highcharts.default);
    (0, _offlineExporting.default)(_highcharts.default);
    (0, _zhnHighcharts.default)(_highcharts.default);

    _highcharts.default.setOptions(_ChartTheme.default);
  },

  setSerieData(config, data, index, name, options) {
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
      point: _Chart.default.fEventsMouseOver(_handleMouseOver.default)
    });
  },

  getColor(seriaIndex) {
    const colors = _ChartTheme.default.colors;
    return colors[seriaIndex % colors.length];
  },

  crSeria: function (option) {
    if (option === void 0) {
      option = {};
    }

    const {
      seriaType,
      seriaWidth,
      seriaColor,
      //tp,
      ...restOption
    } = option,
          type = _Chart.default.crType(seriaType),
          pointFormatter = _Tooltip.tooltipValueTdmyIf;
    /*
    , pointFormatter = tp && Tooltip[tp]
        || tooltipValueTdmyIf;
    */


    return {
      type,
      lineWidth: seriaWidth != null ? seriaWidth : 1,
      color: seriaColor,
      tooltip: _Chart.default.fTooltip(pointFormatter),
      ...restOption
    };
  },
  crAreaConfig: options => {
    const config = _merge(_Chart.default.crAreaConfig(options), {
      chart: {
        zoomType: 'xy',
        xDeltaCrossLabel: 4,
        yDeltaCrossLabel: 20
      },
      zhDetailCharts: []
    });

    config.xAxis = _assign(_Chart.default.fXAxisOpposite(config.xAxis), {
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
    config.yAxis.plotLines = [_Chart.default.fPlotLine(_Color.default.HIGH, 'max'), _Chart.default.fPlotLine(_Color.default.LOW, 'min')];
    return config;
  }
};
var _default = ChartConfig;
exports.default = _default;
//# sourceMappingURL=ChartConfig.js.map