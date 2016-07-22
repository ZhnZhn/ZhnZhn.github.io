'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartFn = require('./ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

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

var ChartConfig = _extends({}, _WithIndicatorConfig2.default, _WithPieConfig2.default, _WithStackedAreaConfig2.default, _WithStackedColumnConfig2.default, _WithTreeMapConfig2.default);

ChartConfig.theme = {
  credits: {
    enabled: true,
    position: {
      align: 'right',
      x: -10,
      verticalAlign: 'bottom',
      y: -5
    },
    target: '_blank',
    href: 'http://www.highcharts.com'
  },
  chart: {
    alignTicks: false,
    //width: 600,
    height: _Chart2.default.HEIGHT,
    spacingTop: _Chart2.default.THEME_SPACING_TOP,
    spacingBottom: _Chart2.default.SPACING_BOTTOM,
    plotBackgroundColor: _Color2.default.PLOT,
    backgroundColor: _Color2.default.CHART,
    reflow: false,

    events: {
      load: function load() {
        this.zhTooltip = new _highcharts2.default.Tooltip(this, this.options.tooltip);
      }
    }
  },
  colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
  labels: {
    items: []
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [[0, _Color2.default.PLOT_G1], [1, _Color2.default.PLOT_G2]]
      }
    },
    series: {
      marker: {
        states: {
          hover: {
            fillColor: _Color2.default.MARKER_HOVER,
            lineColor: _Color2.default.MARKER_HOVER,
            lineWidth: 1,
            lineWidthPlus: 0,
            enabled: true,
            radius: 2,
            radiusPlus: 0
          }
        }
      },
      states: {
        hover: {
          halo: {
            opacity: 0.35,
            size: 16
          }
        }
      },
      stickyTracking: false,
      events: {
        click: function click(event) {
          this.chart.zhTooltip.refresh(event.point, event);
        }
      }
    },
    pie: {
      colors: _Chart2.default.fMonoPieColors()
    }
  },
  tooltip: {
    useHTML: true,
    enabled: false,
    hideDelay: 100,
    followPointer: false,
    shared: false,

    backgroundColor: _Color2.default.TOOLTIP,
    borderWidth: 2,
    borderRadius: 10,

    headerFormat: '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
    pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Value: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.y}</span><br/>'
  },
  xAxis: {
    lineColor: _Color2.default.X_LINE,
    lineWidth: 3,
    tickColor: _Color2.default.X_TICK,
    tickWidth: 3,
    tickLenght: 5,
    gridLineColor: _Color2.default.X_GRID_LINE,
    gridLineDashStyle: "ShortDashDotDot",
    gridLineWidth: 1,
    labels: {
      style: {
        color: _Color2.default.X_LABEL,
        fontWeight: "bold",
        fontSize: "15px"
      }
    }
  },
  yAxis: {
    lineColor: _Color2.default.Y_LINE,
    lineWidth: 3,
    tickColor: _Color2.default.Y_TICK,
    tickWidth: 3,
    tickLenght: 5,
    gridLineColor: _Color2.default.Y_GRID_LINE,
    gridLineDashStyle: "ShortDashDotDot",
    labels: {
      style: {
        color: _Color2.default.Y_LABEL,
        fontWeight: "bold",
        fontSize: "14px"
      }
    }
  }
};

ChartConfig.fnNumberFormat = function (value) {
  var arrSplit = (value + '').split('.'),
      decimal = arrSplit[1] ? arrSplit[1].length : 0;

  return _highcharts2.default.numberFormat(value, decimal, '.', ' ');
};

ChartConfig.fBaseAreaConfig = function () {
  var config = _Chart2.default.fBaseConfig();
  config.zhDetailCharts = [];
  config.zhToggleSeria = _ChartFn2.default.toggleSeria;

  var chart = config.chart;
  chart.zoomType = 'xy';
  chart.resetZoomButton = _Chart2.default.fResetZoomButton({ position: { x: -10 } });
  chart.xDeltaCrossLabel = 4;
  chart.yDeltaCrossLabel = 20;

  config.xAxis = _Chart2.default.fXAxisOpposite(config.xAxis);
  config.xAxis.events = {
    afterSetExtremes: _ChartFn2.default.zoomIndicatorCharts
  };

  config.yAxis.plotLines = [_Chart2.default.fPlotLine(_Color2.default.HIGH, 'max'), _Chart2.default.fPlotLine(_Color2.default.LOW, 'min')];

  config.series[0].point = _Chart2.default.fEventsMouseOver(_ChartFn2.default.handlerMouserOverPoint);

  return config;
};

ChartConfig.fMarkerExDividend = function () {
  var color = arguments.length <= 0 || arguments[0] === undefined ? _Color2.default.EX_DIVIDEND : arguments[0];

  return {
    y: 0,
    exValue: 0.5,
    marker: {
      symbol: 'circle',
      fillColor: color,
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
      style: {
        color: color,
        fontSize: '11px',
        fontWeight: 'bold',
        textShadow: 'none'
      },
      crop: false,
      overflow: 'none',
      y: 32,
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

var _fScatterSeria = function _fScatterSeria(color, pointFormatter, data, zhSeriaId) {
  return {
    type: 'scatter',
    color: color,
    tooltip: _Chart2.default.fTooltip(pointFormatter),
    data: data,
    zhSeriaId: zhSeriaId
  };
};
ChartConfig.fExDividendSeria = function (data, chartId) {
  return _fScatterSeria(_Color2.default.EX_DIVIDEND, _Tooltip2.default.fnExDividendPointFormatter, data, chartId + '_ExDivident');
};
ChartConfig.fSplitRatioSeria = function (data, chartId) {
  return _fScatterSeria(_Color2.default.SPLIT_RATIO, _Tooltip2.default.fnSplitRatioPointFormatter, data, chartId + '_SplitRatio');
};

ChartConfig.fSeries = function () {
  var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return (0, _merge2.default)({
    type: 'spline',
    lineWidth: 1,
    tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnBasePointFormatter)
  }, option);
};

exports.default = ChartConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\ChartConfig.js.map