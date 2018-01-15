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

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartFn = require('./ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

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

var _ComponentActions = require('../flux/actions/ComponentActions');

var _ComponentActions2 = _interopRequireDefault(_ComponentActions);

var _Type = require('../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChartConfig = (0, _extends3.default)({}, _WithIndicatorConfig2.default, _WithPieConfig2.default, _WithStackedAreaConfig2.default, _WithStackedColumnConfig2.default, _WithTreeMapConfig2.default, {
  init: function init() {
    (0, _highchartsMore2.default)(_highcharts2.default);
    (0, _treemap2.default)(_highcharts2.default);
    (0, _exporting2.default)(_highcharts2.default);
    (0, _offlineExporting2.default)(_highcharts2.default);
    _highcharts2.default.setOptions(ChartConfig.theme);

    /*
       Drop-in fix for arearange destroy exception:
       "isSVG of undefined": 5.0.14: issues/7021
    */
    _highcharts2.default.wrap(_highcharts2.default.seriesTypes.arearange.prototype.pointClass.prototype, 'setState', function (proceed) {
      proceed.apply(this, Array.prototype.slice.call(arguments, 1));
      if (this.series.stateMarkerGraphic) {
        this.series.lowerStateMarkerGraphic = undefined;
      }
    });

    _highcharts2.default.wrap(_highcharts2.default.Chart.prototype, 'showCredits', function (next, credits) {
      next.call(this, credits);
      if (credits.enabled) {
        this.credits.element.onclick = function () {
          var link = document.createElement('a');
          link.rel = "noopener noreferrer";
          link.target = credits.targer;
          link.href = credits.href;
          link.click();
        };
      }
    });

    _highcharts2.default.wrap(_highcharts2.default.Chart.prototype, 'exportChartLocal', function (fn) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (args.length === 0) {
        _ComponentActions2.default.showModalDialog(_Type.ModalDialog.CUSTOMIZE_EXPORT, { fn: fn, chart: this });
      } else {
        fn.apply(this, args);
      }
    });
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

    config.series[index].point = _Chart2.default.fEventsMouseOver(_ChartFn2.default.handlerMouserOverPoint);
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
  setMinMax: function setMinMax(config, minValue, maxValue) {
    var plotLines = config.yAxis.plotLines;
    plotLines[0].value = maxValue;
    plotLines[0].label.text = '' + ChartConfig.fnNumberFormat(maxValue);
    plotLines[1].value = minValue;
    plotLines[1].label.text = '' + ChartConfig.fnNumberFormat(minValue);

    Object.assign(config.yAxis, {
      min: _Chart2.default.calcMinY({ minPoint: minValue, maxPoint: maxValue }),
      maxPadding: 0.15,
      minPadding: 0.15,
      endOnTick: false,
      startOnTick: false
    });
  },
  getColor: function getColor(seriaIndex) {
    var colors = ChartConfig.theme.colors;
    return colors[seriaIndex % colors.length];
  }
});

//import HighchartsMore from 'highcharts/lib/highcharts-more';
//import HighchartsTreemap from 'highcharts/lib/modules/treemap';
//import HighchartsExporting from 'highcharts/lib/modules/exporting';
//import HighchartsOfflineExporting from 'highcharts/lib/modules/offline-exporting';

ChartConfig.theme = {
  credits: {
    enabled: true,
    position: {
      align: 'right',
      x: -10,
      verticalAlign: 'bottom',
      y: -5
    },
    style: {
      fontSize: '11px',
      //color: '#0b8fff',
      //fill: '#0b8fff',
      textDecoration: 'underline'
    },
    target: '_blank',
    href: 'http://www.highcharts.com'
  },
  chart: {
    alignTicks: false,
    height: _conf2.default.HEIGHT,
    spacingTop: _conf2.default.THEME_SPACING_TOP,
    spacingBottom: _conf2.default.SPACING_BOTTOM,
    marginRight: _conf2.default.MARGIN_RIGHT,
    plotBackgroundColor: _Color2.default.PLOT,
    backgroundColor: _Color2.default.CHART,
    reflow: false,

    panning: true,
    panKey: 'shift',

    events: {
      load: function load() {
        this.zhTooltip = new _highcharts2.default.Tooltip(this, this.options.tooltip);
      }
    }
  },
  colors: ['#7cb5ec', '#8abb5d', //'#90ed7d'
  '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
  labels: {
    items: []
  },
  exporting: {
    fallbackToExportServer: false,
    chartOptions: {
      chart: {
        plotBackgroundColor: _Color2.default.PLOT_PRINT,
        backgroundColor: _Color2.default.CHART_PRINT
      },
      title: {
        x: 0,
        y: 5
      },
      subtitle: {
        x: 0,
        y: 22
      },
      plotOptions: {
        area: {
          fillColor: _Color2.default.AREA_FILL_PRINT
        },
        arearange: {
          fillColor: _Color2.default.AREA_FILL_PRINT
        }
      },
      xAxis: {
        lineWidth: 2,
        lineColor: _Color2.default.LINE_PRINT,
        gridLineColor: _Color2.default.GRID_LINE_PRINT
      },
      yAxis: {
        lineWidth: 2,
        lineColor: _Color2.default.LINE_PRINT,
        gridLineColor: _Color2.default.GRID_LINE_PRINT
      },
      labels: {
        items: [{
          html: 'ERC https://zhnzhn.github.io',
          style: {
            left: '0px',
            top: '-70px',
            color: _Color2.default.LABEL_LINK,
            'font-size': '9px'
          }
        }]
      }
    }
  },
  navigation: {
    buttonOptions: {
      align: 'left',
      x: -10,
      y: -20,
      theme: {
        fill: _Color2.default.BG_TITLE,
        states: {
          hover: {
            fill: _Color2.default.BG_TITLE,
            'stroke-width': 2,
            stroke: _Color2.default.HOVER
          },
          select: {
            fill: _Color2.default.BG_TITLE,
            'stroke-width': 3,
            stroke: _Color2.default.HOVER
          }
        }
      }
    },
    menuItemStyle: {
      'font-size': '16px',
      'font-weight': 'bold',
      color: _Color2.default.ITEM,
      'line-height': '1.6',
      cursor: 'pointer'
    },
    menuItemHoverStyle: {
      color: _Color2.default.HOVER,
      background: _Color2.default.BG_ITEM_HOVER
    },
    menuStyle: {
      position: 'relative',
      top: '8px',
      border: '2px solid',
      'border-color': _Color2.default.BG_TITLE,
      'border-radius': '5px',
      'box-shadow': 'rgba(0, 0, 0, 0.2) 0px 0px 0px 5px',
      background: _Color2.default.CHART
    }
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [[0, _Color2.default.PLOT_G1], [1, _Color2.default.PLOT_G2]]
      }
    },
    column: {
      borderWidth: 0,
      //pointWidth: 4,
      groupPadding: 0.1,
      pointPlacement: 'between'
    },
    series: {
      marker: {
        radius: 3,
        symbol: "circle",
        states: {
          hover: {
            lineColor: 'transparent',
            lineWidth: 0,
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
          //const tooltip = this.chart.zhTooltip

          this.chart.zhTooltip.options.enabled = true;
          /*
          this.chart.update({
            tooltip: { enabled: true }
          })
          */
          this.chart.zhTooltip.hide(false);
          this.chart.zhTooltip.refresh(event.point, event);
          this.chart.zhTooltip.options.enabled = false;
        }
      }
    },
    pie: {
      //colors : Chart.fMonoPieColors()
      colors: _conf2.default.fMonoPieColors()
    }
  },
  tooltip: {
    useHTML: true,
    enabled: false,
    //enabled : true,
    hideDelay: 100,
    followPointer: false,
    shared: false,

    backgroundColor: _Color2.default.TOOLTIP,
    borderWidth: 2,
    borderRadius: 10,

    headerFormat: '<span style="font-weight:bold;font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
    pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Value: </span>' + '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.y}</span><br/>'
  },
  xAxis: {
    lineColor: _Color2.default.X_LINE,
    lineWidth: 3,
    tickColor: _Color2.default.X_TICK,
    tickWidth: 3,
    tickLenght: 5,
    gridLineColor: _Color2.default.X_GRID_LINE,
    gridLineDashStyle: "Dot",
    //gridLineDashStyle: "ShortDashDotDot",
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
    gridLineDashStyle: "Dot",
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

ChartConfig.fBaseAreaConfig = function (option) {
  var config = Object.assign(_Chart2.default.fBaseConfig(), {
    chart: {
      zoomType: 'xy',
      resetZoomButton: _Chart2.default.fResetZoomButton({ position: { x: -10 } }),
      xDeltaCrossLabel: 4,
      yDeltaCrossLabel: 20
    },
    zhDetailCharts: [],
    zhToggleSeria: _ChartFn2.default.toggleSeria
  }, option);

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

  config.series[0].point = _Chart2.default.fEventsMouseOver(_ChartFn2.default.handlerMouserOverPoint);

  return config;
};

ChartConfig.fMarkerExDividend = function () {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Color2.default.EX_DIVIDEND;

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
        //fontSize: '11px',
        //fontWeight: 'bold',
        fontWeight: 'normal',
        textShadow: 'none',
        textOutline: '0px transparent'
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
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _lodash2.default)({
    type: 'spline',
    lineWidth: 1,
    tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnBasePointFormatter)
  }, option);
};

exports.default = ChartConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\ChartConfig.js.map