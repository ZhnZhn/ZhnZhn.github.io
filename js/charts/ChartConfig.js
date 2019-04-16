'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _highchartsMore = require('highcharts/highcharts-more');

var _highchartsMore2 = _interopRequireDefault(_highchartsMore);

var _treemap = require('highcharts/modules/treemap');

var _treemap2 = _interopRequireDefault(_treemap);

var _exporting = require('highcharts/modules/exporting');

var _exporting2 = _interopRequireDefault(_exporting);

var _offlineExporting = require('highcharts/modules/offline-exporting');

var _offlineExporting2 = _interopRequireDefault(_offlineExporting);

var _zhnHighcharts = require('./plugin/zhn-highcharts');

var _zhnHighcharts2 = _interopRequireDefault(_zhnHighcharts);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartFn = require('./ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _ChartTheme = require('./ChartTheme');

var _ChartTheme2 = _interopRequireDefault(_ChartTheme);

var _handleMouseOver = require('./handleMouseOver');

var _handleMouseOver2 = _interopRequireDefault(_handleMouseOver);

var _WithIndicatorConfig = require('./WithIndicatorConfig');

var _WithIndicatorConfig2 = _interopRequireDefault(_WithIndicatorConfig);

var _WithPieConfig = require('./WithPieConfig');

var _WithPieConfig2 = _interopRequireDefault(_WithPieConfig);

var _WithStackedAreaConfig = require('./WithStackedAreaConfig');

var _WithStackedAreaConfig2 = _interopRequireDefault(_WithStackedAreaConfig);

var _WithStackedColumnConfig = require('./WithStackedColumnConfig');

var _WithStackedColumnConfig2 = _interopRequireDefault(_WithStackedColumnConfig);

var _WithTreeMapConfig = require('./WithTreeMapConfig');

var _WithTreeMapConfig2 = _interopRequireDefault(_WithTreeMapConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = _highcharts2.default.merge;

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

var _crScatterSeria = function _crScatterSeria(color, pointFormatter, data, zhSeriaId) {
  return {
    type: 'scatter',
    color: color,
    tooltip: _Chart2.default.fTooltip(pointFormatter),
    data: data,
    zhSeriaId: zhSeriaId
  };
};

var ChartConfig = (0, _extends3.default)({}, _WithIndicatorConfig2.default, _WithPieConfig2.default, _WithStackedAreaConfig2.default, _WithStackedColumnConfig2.default, _WithTreeMapConfig2.default, {
  init: function init() {
    (0, _highchartsMore2.default)(_highcharts2.default);
    (0, _treemap2.default)(_highcharts2.default);
    (0, _exporting2.default)(_highcharts2.default);
    (0, _offlineExporting2.default)(_highcharts2.default);

    (0, _zhnHighcharts2.default)(_highcharts2.default);

    _highcharts2.default.setOptions(_ChartTheme2.default);
  },
  seriaOption: function seriaOption(color, option) {
    return Object.assign({
      type: 'line', visible: false, color: color,
      marker: {
        radius: 3,
        symbol: "circle"
      }
    }, option);
  },
  setSerieData: function setSerieData(config, data, index, name, options) {
    config.series[index] = Object.assign({
      type: 'area',
      name: name,
      data: data,
      lineWidth: 1
    }, options);

    config.series[index].point = _Chart2.default.fEventsMouseOver(_handleMouseOver2.default);
  },
  _zhSeriaId: function _zhSeriaId(id) {
    return { zhSeriaId: id };
  },
  setStockSerias: function setStockSerias(config, dClose, dHigh, dLow, dOpen, id) {
    this.setSerieData(config, dClose, 0, 'Close', this._zhSeriaId(id));
    this.setSerieData(config, dHigh, 1, 'High', this.seriaOption(_Color2.default.S_HIGH, this._zhSeriaId(id + 'H')));
    this.setSerieData(config, dLow, 2, 'Low', this.seriaOption(_Color2.default.S_LOW, this._zhSeriaId(id + 'L')));
    this.setSerieData(config, dOpen, 3, 'Open', this.seriaOption(_Color2.default.S_OPEN, this._zhSeriaId(id + 'O')));
  },
  getColor: function getColor(seriaIndex) {
    var colors = _ChartTheme2.default.colors;
    return colors[seriaIndex % colors.length];
  },


  crDividendSeria: function crDividendSeria(data, chartId) {
    return _crScatterSeria(_Color2.default.EX_DIVIDEND, _Tooltip2.default.exDividend, data, chartId + '_ExDivident');
  },

  crSplitRatioSeria: function crSplitRatioSeria(data, chartId) {
    return _crScatterSeria(_Color2.default.SPLIT_RATIO, _Tooltip2.default.splitRatio, data, chartId + '_SplitRatio');
  }

});

ChartConfig.fnNumberFormat = function (value) {
  var arrSplit = (value + '').split('.'),
      decimal = arrSplit[1] ? arrSplit[1].length : 0;

  return _highcharts2.default.numberFormat(value, decimal, '.', ' ');
};

ChartConfig.fBaseAreaConfig = function (options) {
  var config = _highcharts2.default.merge(_Chart2.default.fBaseConfig(options), {
    chart: {
      zoomType: 'xy',
      resetZoomButton: _Chart2.default.fResetZoomButton({
        position: { x: -10 }
      }),
      xDeltaCrossLabel: 4,
      yDeltaCrossLabel: 20
    },
    zhDetailCharts: []
  });

  config.xAxis = Object.assign(_Chart2.default.fXAxisOpposite(config.xAxis), {
    events: {
      afterSetExtremes: _ChartFn2.default.zoomIndicatorCharts
    }
  });
  config.yAxis = Object.assign(config.yAxis, {
    lineWidth: 0,
    tickLength: 0,
    offset: 4,
    labels: {
      x: 8,
      y: 5
    },
    events: {
      afterSetExtremes: _ChartFn2.default.afterSetExtremesYAxis
    }
  });

  config.yAxis.plotLines = [_Chart2.default.fPlotLine(_Color2.default.HIGH, 'max'), _Chart2.default.fPlotLine(_Color2.default.LOW, 'min')];

  return config;
};

ChartConfig.fMarkerExDividend = function () {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Color2.default.EX_DIVIDEND;
  var dataLabelsY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;

  return {
    y: 0,
    exValue: 0.5,
    marker: {
      symbol: 'circle',
      fillColor: color,
      lineColor: color,
      radius: 6,
      states: {
        hover: {
          enable: true,
          fillColor: _Color2.default.PLOT,
          lineColor: color,
          lineWidth: 2,
          radius: 6
        }
      }
    },
    dataLabels: {
      enabled: true,
      inside: true,
      color: color,
      style: {
        fill: color,
        stroke: color,
        color: color,
        fontSize: '12px',
        fontWeight: 'normal',
        textShadow: 'none',
        textOutline: '0px transparent'
      },
      crop: false,
      overflow: 'none',
      y: dataLabelsY,
      formatter: function formatter() {
        return this.point.exValue;
      }
    }
  };
};

ChartConfig.fMarkerSplitRatio = function () {
  var point = ChartConfig.fMarkerExDividend(_Color2.default.SPLIT_RATIO);
  point.dataLabels.formatter = function () {
    return this.point.splitRatio;
  };
  return point;
};

/*
const _fScatterSeria = function(color, pointFormatter, data, zhSeriaId){
  return {
    type: 'scatter',
    color: color,
    tooltip : Chart.fTooltip(pointFormatter),
    data : data,
    zhSeriaId : zhSeriaId
  }
}
*/
/*
ChartConfig.fExDividendSeria = function(data, chartId){
  return _fScatterSeria(
    COLOR.EX_DIVIDEND,
    Tooltip.exDividend,
    data,
    chartId + '_ExDivident'
  );
}
ChartConfig.fSplitRatioSeria = function(data, chartId){
  return _fScatterSeria(
    COLOR.SPLIT_RATIO,
    Tooltip.splitRatio,
    data,
    chartId + '_SplitRatio'
  );
}
*/

ChartConfig.fSeries = function () {
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var seriaType = option.seriaType,
      _type = typeof seriaType === 'string' ? seriaType.toLowerCase() : 'spline';

  return merge(false, {
    type: _type,
    //type: 'spline',
    lineWidth: 1,
    tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnBasePointFormatter)
  }, option);
};

exports.default = ChartConfig;
//# sourceMappingURL=ChartConfig.js.map