"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _highcharts = _interopRequireDefault(require("highcharts"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var merge = _highcharts["default"].merge;
var TITLE_STYLE = {
  stroke: 'transparent',
  fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
  fontSize: '16px',
  fontWeight: 'bold'
};

var _addMonoColorsTo = function _addMonoColorsTo(colors, base) {
  if (colors === void 0) {
    colors = [];
  }

  var i;

  for (i = 0; i < 4; i++) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    colors.push(_highcharts["default"].Color(base).brighten((i - 3) / 7).setOpacity(0.75).get());
  }
};

var _fMonoColors = function _fMonoColors(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$base = _ref.base1,
      base1 = _ref$base === void 0 ? _Color["default"].MONO_BASE1 : _ref$base,
      _ref$base2 = _ref.base2,
      base2 = _ref$base2 === void 0 ? _Color["default"].MONO_BASE2 : _ref$base2;

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
  COLOR_BASE1: _Color["default"].MONO_BASE1,
  COLOR_BASE2: _Color["default"].MONO_BASE2,
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
  fCreateMonoColor: function fCreateMonoColor(base, deltaColor, opacity) {
    if (base === void 0) {
      base = _Color["default"].MONO_BASE1;
    }

    if (deltaColor === void 0) {
      deltaColor = 0;
    }

    if (opacity === void 0) {
      opacity = 0.75;
    }

    return _highcharts["default"].Color(base).brighten(this.COLOR_LOW_LEVEL + deltaColor).setOpacity(opacity).get();
  },
  fnGetMonoColor: function fnGetMonoColor(index) {
    var colorIndex = index % 8;
    return this._monoColors[colorIndex];
  },
  fCreditsRightBottom: function fCreditsRightBottom(option) {
    if (option === void 0) {
      option = {};
    }

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
  fResetZoomButton: function fResetZoomButton(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, {
      position: {
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y: 0
      },
      theme: {
        fill: _Color["default"].BG_TITLE,
        stroke: _Color["default"].BG_TITLE,
        r: 4,
        style: {
          color: _Color["default"].TITLE_SHOW
        },
        states: {
          hover: {
            fill: _Color["default"].BG_TITLE,
            stroke: _Color["default"].HOVER,
            'stroke-width': 2,
            style: {
              color: _Color["default"].HOVER
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
  fTitle: function fTitle(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, {
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 25,
      style: (0, _extends2["default"])({}, TITLE_STYLE, {
        color: _Color["default"].CHART_TITLE,
        fill: _Color["default"].CHART_TITLE
      })
    }, option);
  },
  fSubtitle: function fSubtitle(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, {
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 45,
      style: (0, _extends2["default"])({}, TITLE_STYLE, {
        color: _Color["default"].CHART_SUBTITLE,
        fill: _Color["default"].CHART_SUBTITLE
      })
    }, option);
  },
  fTitleIndicator: function fTitleIndicator(text) {
    return {
      text: text,
      style: {
        color: _Color["default"].METRIC_TITLE,
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
  fBaseConfig: function fBaseConfig(_temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$seriaType = _ref2.seriaType,
        seriaType = _ref2$seriaType === void 0 ? 'area' : _ref2$seriaType,
        seriaColor = _ref2.seriaColor,
        spacingTop = _ref2.spacingTop,
        _ref2$isCrosshair = _ref2.isCrosshair,
        isCrosshair = _ref2$isCrosshair === void 0 ? true : _ref2$isCrosshair;

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
        tooltip: Chart.fTooltip(_Tooltip["default"].fnBasePointFormatter),
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
      color: _Color["default"].CROSSHAIR,
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
  fXAxisOpposite: function fXAxisOpposite(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, {
      opposite: true,
      tickLength: 0,
      tickPosition: 'inside',
      labels: {
        y: -5
      }
    }, option);
  },
  fYAxisOpposite: function fYAxisOpposite(option) {
    if (option === void 0) {
      option = {};
    }

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
    return maxPoint > Number.NEGATIVE_INFINITY && minPoint < Number.POSITIVE_INFINITY ? minPoint - (maxPoint - minPoint) / 6 : void 0;
  },
  fPlotOptionsArea: function fPlotOptionsArea(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, {
      lineColor: _Color["default"].AREA_HOVER_LINE,
      lineWidth: 0,
      marker: {
        enabled: false,
        lineWidth: 1,
        lineColor: _Color["default"].AREA_MARKER_LINE
      },
      state: {
        hover: {
          lineWidth: 2
        }
      }
    }, option);
  },
  fPlotOptionsColumn: function fPlotOptionsColumn(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, {
      lineColor: _Color["default"].COLUMN_HOVER_LINE,
      lineWidth: 0,
      marker: {
        enabled: false,
        lineWidth: 1,
        lineColor: _Color["default"].COLUMN_MARKER_LINE
      },
      state: {
        hover: {
          lineWidth: 2
        }
      }
    }, option);
  },
  fPlotOptionsSeries: function fPlotOptionsSeries(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, {
      states: {
        hover: {
          halo: {
            attributes: {
              fill: _Color["default"].HALO_BASE
            },
            opacity: 0.35,
            size: 16
          }
        }
      }
    }, option);
  },
  fLegend: function fLegend(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, {
      symbolHeight: 14,
      symbolWidth: 14,
      symbolRadius: 7,
      useHTML: true,
      itemStyle: {
        color: _Color["default"].LEGEND_ITEM,
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
          fillColor: _Color["default"].MARKER_HOVER_FILL,
          lineColor: _Color["default"].MARKER_HOVER_LINE,
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
var _default = Chart;
exports["default"] = _default;
//# sourceMappingURL=Chart.js.map