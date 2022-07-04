"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.setDefaultTitle = exports.fYAxisOpposite = exports.fXAxisOpposite = exports.fTooltip = exports.fTitle = exports.fSubtitle = exports.fSeriaMarker = exports.fSecondYAxis = exports.fPlotOptionsSeries = exports.fPlotOptionsColumn = exports.fPlotOptionsArea = exports.fPlotLine = exports.fNavigation = exports.fLegend = exports.fEventsMouseOver = exports.fCrosshair = exports.fCreditsRightBottom = exports.crType = exports.crAreaConfig = exports.STACKED_SPACING_TOP = exports.STACKED_HEIGHT = exports.SPACING_TOP = exports.SPACING_BOTTOM = exports.SEMIDONUT_TITLE_Y = exports.SEMIDONUT_SUBTITLE_Y = exports.MARGIN_RIGHT = exports.LEGEND_ROW_HEIGHT = exports.CHART_HEIGHT = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _domSanitize = _interopRequireDefault(require("../utils/domSanitize"));

var _Color = require("../constants/Color");

var _Tooltip = require("./Tooltip");

const merge = _highcharts.default.merge;

const _isStr = str => typeof str === 'string';

const FONT_STYLE = {
  fontSize: '16px',
  fontWeight: 'bold'
},
      CAPTION_CONFIG = {
  text: '',
  floating: true,
  align: 'left',
  x: 25,
  style: { ...FONT_STYLE,
    stroke: 'transparent',
    color: _Color.COLOR_CHART_TITLE,
    fill: _Color.COLOR_CHART_TITLE
  }
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
      _crPlotOption = (lineColor, markerLineColor) => ({
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
});

const _sanitizeOptionText = option => {
  if (option && typeof option === 'object') {
    option.text = (0, _domSanitize.default)(option.text);
  }

  return option;
};

const _crTitle = title => _isStr(title) ? {
  text: (0, _domSanitize.default)(title)
} : _sanitizeOptionText(title),
      _crCrosshair = function (is) {
  if (is === void 0) {
    is = true;
  }

  return is ? {
    color: _Color.COLOR_CROSSHAIR,
    width: 1,
    zIndex: 2
  } : void 0;
};

const CHART_HEIGHT = 300;
exports.CHART_HEIGHT = CHART_HEIGHT;
const MARGIN_RIGHT = 50;
exports.MARGIN_RIGHT = MARGIN_RIGHT;
const STACKED_HEIGHT = 500;
exports.STACKED_HEIGHT = STACKED_HEIGHT;
const LEGEND_ROW_HEIGHT = 32;
exports.LEGEND_ROW_HEIGHT = LEGEND_ROW_HEIGHT;
const SPACING_TOP = 20;
exports.SPACING_TOP = SPACING_TOP;
const STACKED_SPACING_TOP = 25;
exports.STACKED_SPACING_TOP = STACKED_SPACING_TOP;
const SPACING_BOTTOM = 24;
exports.SPACING_BOTTOM = SPACING_BOTTOM;
const SEMIDONUT_TITLE_Y = 15;
exports.SEMIDONUT_TITLE_Y = SEMIDONUT_TITLE_Y;
const SEMIDONUT_SUBTITLE_Y = 35;
exports.SEMIDONUT_SUBTITLE_Y = SEMIDONUT_SUBTITLE_Y;

const crType = (seriaType, dfType) => seriaType && _isStr(seriaType) ? seriaType.toLowerCase() : dfType || 'spline';

exports.crType = crType;

const fCreditsRightBottom = option => merge(false, {
  enabled: true,
  position: {
    align: 'right',
    verticalAlign: 'bottom',
    x: -10,
    y: -5
  }
}, option);

exports.fCreditsRightBottom = fCreditsRightBottom;

const fTitle = option => {
  _sanitizeOptionText(option);

  return merge(false, { ...CAPTION_CONFIG,
    y: -10
  }, option);
};

exports.fTitle = fTitle;

const fSubtitle = option => {
  _sanitizeOptionText(option);

  return merge(false, { ...CAPTION_CONFIG,
    y: 10
  }, option);
};

exports.fSubtitle = fSubtitle;

const setDefaultTitle = (config, title, subtitle) => {
  config.chart.spacingTop = STACKED_SPACING_TOP;
  config.title = fTitle({
    text: title
  });
  config.subtitle = fSubtitle({
    text: subtitle
  });
};

exports.setDefaultTitle = setDefaultTitle;

const fNavigation = () => ({
  buttonOptions: {
    y: 5
  }
});

exports.fNavigation = fNavigation;

const fTooltip = pointFormatter => ({
  pointFormatter,
  headerFormat: ''
});

exports.fTooltip = fTooltip;

const crAreaConfig = function (_temp) {
  let {
    title = '',
    seriaType,
    seriaColor,
    seriaWidth = 1,
    spacingTop,
    isCrosshair
  } = _temp === void 0 ? {} : _temp;
  return {
    zhSeries: {
      count: 0
    },
    chart: {
      marginRight: MARGIN_RIGHT,
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
    yAxis: { ...YAXIS_CONFIG,
      crosshair: _crCrosshair(isCrosshair),
      opposite: true,
      showEmpty: true
    },
    series: [{
      turboThreshold: 20000,
      type: crType(seriaType, 'area'),
      color: seriaColor,
      tooltip: fTooltip(_Tooltip.tooltipValueTdmyIf),
      lineWidth: seriaWidth,
      states: {
        hover: {
          lineWidth: seriaWidth
        }
      }
    }]
  };
};

exports.crAreaConfig = crAreaConfig;

const fEventsMouseOver = mouseOver => ({
  events: {
    mouseOver
  }
});

exports.fEventsMouseOver = fEventsMouseOver;
const fCrosshair = _crCrosshair;
exports.fCrosshair = fCrosshair;

const fPlotLine = (color, text) => ({
  color,
  id: text,
  dashStyle: 'solid',
  width: 1,
  zIndex: 4,
  label: {
    text,
    verticalAlign: 'top',
    style: {
      color,
      fontWeight: 'bold',
      fontSize: 'medium'
    }
  }
});

exports.fPlotLine = fPlotLine;

const fXAxisOpposite = option => merge(false, {
  opposite: true,
  tickLength: 0,
  tickPosition: 'inside',
  labels: {
    y: -5
  }
}, option);

exports.fXAxisOpposite = fXAxisOpposite;

const fYAxisOpposite = option => merge(false, {
  opposite: true,
  title: {
    text: ''
  }
}, option);

exports.fYAxisOpposite = fYAxisOpposite;

const fSecondYAxis = (name, color) => ({ //crosshair : fCrosshair(),
  ...YAXIS_CONFIG,
  id: name,
  lineColor: color,
  tickColor: color,
  gridLineWidth: 0,
  lineWidth: 2,
  labels: {
    style: {
      color: color,
      fontWeight: "bold",
      fontSize: "14px"
    }
  }
});

exports.fSecondYAxis = fSecondYAxis;

const fPlotOptionsArea = option => merge(false, _crPlotOption(_Color.COLOR_AREA_HOVER_LINE, _Color.COLOR_AREA_MARKER_LINE), option || {});

exports.fPlotOptionsArea = fPlotOptionsArea;

const fPlotOptionsColumn = option => merge(false, _crPlotOption(_Color.COLOR_COLUMN_HOVER_LINE, _Color.COLOR_COLUMN_MARKER_LINE), option);

exports.fPlotOptionsColumn = fPlotOptionsColumn;

const fPlotOptionsSeries = option => merge(false, {
  states: {
    hover: {
      halo: {
        attributes: {
          fill: _Color.COLOR_HALO_BASE
        },
        opacity: 0.35,
        size: 16
      }
    }
  }
}, option);

exports.fPlotOptionsSeries = fPlotOptionsSeries;

const fLegend = option => merge(false, {
  useHTML: true,
  symbolHeight: 14,
  symbolWidth: 14,
  symbolRadius: 7,
  itemStyle: { ...FONT_STYLE,
    color: _Color.COLOR_LEGEND_ITEM,
    lineHeight: 1.5,
    cursor: 'pointer'
  }
}, option);

exports.fLegend = fLegend;

const fSeriaMarker = symbol => ({
  symbol,
  radius: 4,
  states: {
    hover: {
      enabled: true,
      fillColor: _Color.COLOR_MARKER_HOVER_FILL,
      lineColor: _Color.COLOR_MARKER_HOVER_LINE,
      lineWidth: 1,
      lineWidthPlus: 0,
      radius: 2,
      radiusPlus: 0
    }
  }
});

exports.fSeriaMarker = fSeriaMarker;
//# sourceMappingURL=Chart.js.map