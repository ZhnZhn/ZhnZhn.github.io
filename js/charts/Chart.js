'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = _highcharts2.default.merge;

var S = {
  TITLE_BASE: {
    stroke: 'transparent',
    fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var _addMonoColorsTo = function _addMonoColorsTo() {
  var colors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var base = arguments[1];

  var i = void 0;
  for (i = 0; i < 4; i++) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    colors.push(_highcharts2.default.Color(base).brighten((i - 3) / 7).setOpacity(0.75).get());
  }
};

var _fMonoColors = function _fMonoColors() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$base = _ref.base1,
      base1 = _ref$base === undefined ? _Color2.default.MONO_BASE1 : _ref$base,
      _ref$base2 = _ref.base2,
      base2 = _ref$base2 === undefined ? _Color2.default.MONO_BASE2 : _ref$base2;

  var colors = [];

  _addMonoColorsTo(colors, base1);
  _addMonoColorsTo(colors, base2);

  return colors;
};

var _isCrosshair = function _isCrosshair(is) {
  return is ? Chart.fCrosshair() : undefined;
};

var Chart = {
  COLOR_PERIOD: 4 / 7,
  COLOR_LOW_LEVEL: -3 / 7,
  COLOR_OPACITY: 0.75,
  COLOR_BASE1: _Color2.default.MONO_BASE1,
  COLOR_BASE2: _Color2.default.MONO_BASE2,

  HEIGHT: 300,
  MARGIN_RIGHT: 50,
  STACKED_HEIGHT: 500,
  LEGEND_ROW_HEIGHT: 32,

  THEME_SPACING_TOP: 5,
  SPACING_TOP: 20,
  STACKED_SPACING_TOP: 25,
  SPACING_BOTTOM: 24,
  MARGIN_TOP: 60,
  TREEMAP_MARGIN_TOP: 50,

  STACKED_TITLE_Y: -10,
  STACKED_SUBTITLE_Y: 10,
  TREEMAP_TITLE_Y: 15,
  TREEMAP_SUBTITLE_Y: 35,
  SEMIDONUT_TITLE_Y: 15,
  SEMIDONUT_SUBTITLE_Y: 35,

  _monoColors: _fMonoColors(),

  fCreateMonoColor: function fCreateMonoColor() {
    var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Color2.default.MONO_BASE1;
    var deltaColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.75;

    return _highcharts2.default.Color(base).brighten(this.COLOR_LOW_LEVEL + deltaColor).setOpacity(opacity).get();
  },
  fnGetMonoColor: function fnGetMonoColor(index) {
    var colorIndex = index % 8;
    return this._monoColors[colorIndex];
  },
  fCreditsRightBottom: function fCreditsRightBottom() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      enabled: true,
      position: {
        align: 'right',
        x: -10,
        verticalAlign: 'bottom',
        y: -5
      }
    }, option);
  },
  fResetZoomButton: function fResetZoomButton() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      position: {
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y: 0
      },
      theme: {
        fill: _Color2.default.BG_TITLE,
        stroke: _Color2.default.BG_TITLE,
        r: 4,
        style: {
          color: _Color2.default.TITLE_SHOW
        },
        states: {
          hover: {
            fill: _Color2.default.BG_TITLE,
            stroke: _Color2.default.HOVER,
            'stroke-width': 2,
            style: {
              color: _Color2.default.HOVER
            }
          }
        }
      },
      relativeTo: 'chart'
    }, option);
  },
  setDefaultTitle: function setDefaultTitle(config, title, subtitle) {
    config.chart.spacingTop = this.STACKED_SPACING_TOP;
    config.title = this.fTitle({
      text: title,
      y: this.STACKED_TITLE_Y
    });
    config.subtitle = this.fSubtitle({
      text: subtitle,
      y: this.STACKED_SUBTITLE_Y
    });
  },
  fTitle: function fTitle() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 25,
      style: (0, _extends3.default)({}, S.TITLE_BASE, {
        color: _Color2.default.CHART_TITLE,
        fill: _Color2.default.CHART_TITLE
      })
    }, option);
  },
  fSubtitle: function fSubtitle() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 45,
      style: (0, _extends3.default)({}, S.TITLE_BASE, {
        color: _Color2.default.CHART_SUBTITLE,
        fill: _Color2.default.CHART_SUBTITLE
      })
    }, option);
  },
  fTitleIndicator: function fTitleIndicator(text) {
    return {
      text: text,
      style: {
        color: _Color2.default.METRIC_TITLE,
        fontSize: '16px',
        fontWeight: 'bold'
      },
      floating: true,
      align: 'left',
      verticalAlign: 'top',
      x: 8,
      y: 15
    };
  },
  fNavigation: function fNavigation() {
    return {
      buttonOptions: {
        y: 5
      }
    };
  },
  fBaseConfig: function fBaseConfig() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$seriaType = _ref2.seriaType,
        seriaType = _ref2$seriaType === undefined ? 'area' : _ref2$seriaType,
        seriaColor = _ref2.seriaColor,
        spacingTop = _ref2.spacingTop,
        _ref2$isCrosshair = _ref2.isCrosshair,
        isCrosshair = _ref2$isCrosshair === undefined ? true : _ref2$isCrosshair;

    return {
      zhSeries: {
        count: 0
      },
      chart: {
        marginRight: Chart.MARGIN_RIGHT,
        spacingTop: spacingTop
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        labels: {},
        crosshair: _isCrosshair(isCrosshair)
      },
      yAxis: {
        crosshair: _isCrosshair(isCrosshair),
        endOnTick: false,
        maxPadding: 0.15,
        startOnTick: false,
        minPadding: 0.15,
        opposite: true,
        showEmpty: true,
        title: {
          text: ''
        }
      },
      series: [{
        zhValueText: 'Value',
        turboThreshold: 20000,
        type: seriaType,
        color: seriaColor,
        tooltip: Chart.fTooltip(_Tooltip2.default.fnBasePointFormatter),
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        }
      }]
    };
  },
  fEventsMouseOver: function fEventsMouseOver(fn) {
    return {
      events: {
        mouseOver: fn
      }
    };
  },
  fTooltip: function fTooltip(fnPointFormatter) {
    return {
      pointFormatter: fnPointFormatter,
      headerFormat: ''
    };
  },
  fCrosshair: function fCrosshair() {
    return {
      color: _Color2.default.CROSSHAIR,
      width: 1,
      zIndex: 2
    };
  },
  fPlotLine: function fPlotLine(color, text) {
    return {
      id: text,
      value: undefined,
      color: color,
      dashStyle: 'solid',
      width: 1,
      zIndex: 4,
      label: {
        text: text,
        verticalAlign: 'top',
        style: {
          color: color,
          fontWeight: 'bold',
          fontSize: 'medium'
        }
      }
    };
  },
  fXAxisOpposite: function fXAxisOpposite() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      opposite: true,
      tickLength: 0,
      tickPosition: 'inside',
      labels: {
        y: -5
      }
    }, option);
  },
  fYAxisOpposite: function fYAxisOpposite() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      opposite: true,
      title: {
        text: ''
      }
    }, option);
  },
  fSecondYAxis: function fSecondYAxis(name, color) {
    return {
      //crosshair : Chart.fCrosshair(),
      id: name,

      gridLineWidth: 0,

      endOnTick: false,
      maxPadding: 0.15,
      startOnTick: false,
      minPadding: 0.15,

      title: {
        text: ''
      },
      lineWidth: 2,
      lineColor: color,
      tickColor: color,
      labels: {
        style: {
          color: color,
          fontWeight: "bold",
          fontSize: "14px"
        }
      }
    };
  },
  calcMinY: function calcMinY(_ref3) {
    var minPoint = _ref3.minPoint,
        maxPoint = _ref3.maxPoint;

    if (maxPoint > Number.NEGATIVE_INFINITY && minPoint < Number.POSITIVE_INFINITY) {
      return minPoint - (maxPoint - minPoint) * 1 / 6;
    } else {
      return undefined;
    }
  },
  fPlotOptionsArea: function fPlotOptionsArea() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      lineColor: _Color2.default.AREA_HOVER_LINE,
      lineWidth: 0,
      marker: {
        enabled: false,
        lineWidth: 1,
        lineColor: _Color2.default.AREA_MARKER_LINE
      },
      state: {
        hover: {
          lineWidth: 2
        }
      }
    }, option);
  },
  fPlotOptionsColumn: function fPlotOptionsColumn() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      lineColor: _Color2.default.COLUMN_HOVER_LINE,
      lineWidth: 0,
      marker: {
        enabled: false,
        lineWidth: 1,
        lineColor: _Color2.default.COLUMN_MARKER_LINE
      },
      state: {
        hover: {
          lineWidth: 2
        }
      }
    }, option);
  },
  fPlotOptionsSeries: function fPlotOptionsSeries() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      states: {
        hover: {
          halo: {
            attributes: {
              fill: _Color2.default.HALO_BASE
            },
            opacity: 0.35,
            size: 16
          }
        }
      }
    }, option);
  },
  fLegend: function fLegend() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return merge(false, {
      symbolHeight: 14,
      symbolWidth: 14,
      symbolRadius: 7,
      useHTML: true,
      itemStyle: {
        color: _Color2.default.LEGEND_ITEM,
        cursor: 'pointer',
        fontSize: '16px',
        fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
        fontWeight: 'bold',
        lineHeight: 1.5
      }
    }, option);
  },
  fSeriaMarker: function fSeriaMarker(_ref4) {
    var color = _ref4.color,
        symbol = _ref4.symbol;

    return {
      radius: 4,
      symbol: symbol,
      states: {
        hover: {
          fillColor: _Color2.default.MARKER_HOVER_FILL,
          lineColor: _Color2.default.MARKER_HOVER_LINE,
          lineWidth: 1,
          lineWidthPlus: 0,
          enabled: true,
          radius: 2,
          radiusPlus: 0
        }
      }
    };
  }
};

exports.default = Chart;
//# sourceMappingURL=Chart.js.map