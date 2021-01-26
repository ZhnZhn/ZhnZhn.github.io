"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _highcharts = _interopRequireDefault(require("highcharts"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _MonoColorSlice = _interopRequireDefault(require("./MonoColorSlice"));

var merge = _highcharts["default"].merge;

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var FONT_STYLE = {
  fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
  fontSize: '16px',
  fontWeight: 'bold'
},
    CAPTION_CONFIG = {
  text: '',
  floating: true,
  align: 'left',
  x: 25,
  style: (0, _extends2["default"])({}, FONT_STYLE, {
    stroke: 'transparent',
    color: _Color["default"].CHART_TITLE,
    fill: _Color["default"].CHART_TITLE
  })
},
    YAXIS_CONFIG = {
  endOnTick: false,
  maxPadding: 0.15,
  startOnTick: false,
  minPadding: 0.15,
  title: {
    text: ''
  }
},
    _crPlotOption = function _crPlotOption(lineColor, markerLineColor) {
  return {
    lineColor: lineColor,
    lineWidth: 0,
    marker: {
      enabled: false,
      lineWidth: 1,
      lineColor: markerLineColor
    },
    state: {
      hover: {
        lineWidth: 2
      }
    }
  };
};

var _sanitizeOptionText = function _sanitizeOptionText(option) {
  if (option && typeof option === 'object') {
    option.text = _dompurify["default"].sanitize(option.text || '');
  }

  return option;
};

var _crTitle = function _crTitle(title) {
  return _isStr(title) ? {
    text: _dompurify["default"].sanitize(title)
  } : _sanitizeOptionText(title);
},
    _crSeriaType = function _crSeriaType(seriaType) {
  return _isStr(seriaType) ? seriaType.toLowerCase() : 'area';
},
    _crCrosshair = function _crCrosshair(is) {
  if (is === void 0) {
    is = true;
  }

  return is ? {
    color: _Color["default"].CROSSHAIR,
    width: 1,
    zIndex: 2
  } : void 0;
};

var Chart = (0, _extends2["default"])({
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
  SEMIDONUT_SUBTITLE_Y: 35
}, _MonoColorSlice["default"], {
  fCreditsRightBottom: function fCreditsRightBottom(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, {
      enabled: true,
      position: {
        align: 'right',
        verticalAlign: 'bottom',
        x: -10,
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
    config.chart.spacingTop = Chart.STACKED_SPACING_TOP;
    config.title = Chart.fTitle({
      text: title,
      y: Chart.STACKED_TITLE_Y
    });
    config.subtitle = Chart.fSubtitle({
      text: subtitle,
      y: Chart.STACKED_SUBTITLE_Y
    });
  },
  fTitle: function fTitle(option) {
    if (option === void 0) {
      option = {};
    }

    _sanitizeOptionText(option);

    return merge(false, (0, _extends2["default"])({}, CAPTION_CONFIG, {
      y: 25
    }), option);
  },
  fSubtitle: function fSubtitle(option) {
    if (option === void 0) {
      option = {};
    }

    _sanitizeOptionText(option);

    return merge(false, (0, _extends2["default"])({}, CAPTION_CONFIG, {
      y: 45
    }), option);
  },
  fNavigation: function fNavigation() {
    return {
      buttonOptions: {
        y: 5
      }
    };
  },
  crAreaConfig: function crAreaConfig(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$title = _ref.title,
        title = _ref$title === void 0 ? '' : _ref$title,
        seriaType = _ref.seriaType,
        seriaColor = _ref.seriaColor,
        _ref$seriaWidth = _ref.seriaWidth,
        seriaWidth = _ref$seriaWidth === void 0 ? 1 : _ref$seriaWidth,
        spacingTop = _ref.spacingTop,
        isCrosshair = _ref.isCrosshair;

    return {
      zhSeries: {
        count: 0
      },
      chart: {
        marginRight: Chart.MARGIN_RIGHT,
        spacingTop: spacingTop
      },
      title: _crTitle(title),
      legend: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        labels: {},
        crosshair: _crCrosshair(isCrosshair)
      },
      yAxis: (0, _extends2["default"])({}, YAXIS_CONFIG, {
        crosshair: _crCrosshair(isCrosshair),
        opposite: true,
        showEmpty: true
      }),
      series: [{
        turboThreshold: 20000,
        type: _crSeriaType(seriaType),
        color: seriaColor,
        tooltip: Chart.fTooltip(_Tooltip["default"].vTdmyIf),
        lineWidth: seriaWidth,
        states: {
          hover: {
            lineWidth: seriaWidth
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
  fCrosshair: _crCrosshair,
  fPlotLine: function fPlotLine(color, text) {
    return {
      id: text,
      //value: void 0,
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
    return (0, _extends2["default"])({}, YAXIS_CONFIG, {
      id: name,
      gridLineWidth: 0,
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
    });
  },
  fPlotOptionsArea: function fPlotOptionsArea(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, _crPlotOption(_Color["default"].AREA_HOVER_LINE, _Color["default"].AREA_MARKER_LINE), option);
  },
  fPlotOptionsColumn: function fPlotOptionsColumn(option) {
    if (option === void 0) {
      option = {};
    }

    return merge(false, _crPlotOption(_Color["default"].COLUMN_HOVER_LINE, _Color["default"].COLUMN_MARKER_LINE), option);
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
      itemStyle: (0, _extends2["default"])({}, FONT_STYLE, {
        color: _Color["default"].LEGEND_ITEM,
        lineHeight: 1.5,
        cursor: 'pointer'
      })
    }, option);
  },
  fSeriaMarker: function fSeriaMarker(_ref2) {
    var color = _ref2.color,
        symbol = _ref2.symbol;
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
});
var _default = Chart;
exports["default"] = _default;
//# sourceMappingURL=Chart.js.map