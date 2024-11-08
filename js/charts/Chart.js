"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.setDefaultTitle = exports.fYAxisOpposite = exports.fXAxisOpposite = exports.fTooltip = exports.fTitle = exports.fSubtitle = exports.fSeriaMarker = exports.fSecondYAxis = exports.fPlotOptionsSeries = exports.fPlotOptionsColumn = exports.fPlotOptionsArea = exports.fPlotLine = exports.fNavigation = exports.fLegend = exports.fEventsMouseOver = exports.fCrosshair = exports.fCreditsRightBottom = exports.crType = exports.crCategoryDataLabels = exports.crAreaConfig = exports.STACKED_SPACING_TOP = exports.STACKED_HEIGHT = exports.SPACING_TOP = exports.SPACING_BOTTOM = exports.SEMIDONUT_TITLE_Y = exports.SEMIDONUT_SUBTITLE_Y = exports.MARGIN_RIGHT = exports.LEGEND_ROW_HEIGHT = exports.CHART_HEIGHT = void 0;
var _styleFn = require("../components/styleFn");
var _isTypeFn = require("../utils/isTypeFn");
var _domSanitize = require("../utils/domSanitize");
var _merge = _interopRequireDefault(require("../utils/merge"));
var _Color = require("../constants/Color");
var _Tooltip = require("./Tooltip");
const FONT_STYLE = {
    fontSize: '16px',
    fontWeight: 'bold'
  },
  CAPTION_CONFIG = {
    text: '',
    floating: true,
    align: 'left',
    x: 0,
    style: {
      ...FONT_STYLE,
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
  if ((0, _isTypeFn.isObj)(option)) {
    option.text = (0, _domSanitize.domSanitize)(option.text);
  }
  return option;
};
const _crTitle = title => (0, _isTypeFn.isStr)(title) ? {
    text: (0, _domSanitize.domSanitize)(title)
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
const CHART_HEIGHT = exports.CHART_HEIGHT = 300;
const MARGIN_RIGHT = exports.MARGIN_RIGHT = 50;
const STACKED_HEIGHT = exports.STACKED_HEIGHT = 500;
const LEGEND_ROW_HEIGHT = exports.LEGEND_ROW_HEIGHT = 32;
const SPACING_TOP = exports.SPACING_TOP = 20;
const STACKED_SPACING_TOP = exports.STACKED_SPACING_TOP = 25;
const SPACING_BOTTOM = exports.SPACING_BOTTOM = 24;
const SEMIDONUT_TITLE_Y = exports.SEMIDONUT_TITLE_Y = 15;
const SEMIDONUT_SUBTITLE_Y = exports.SEMIDONUT_SUBTITLE_Y = 35;
const crType = (seriaType, dfType) => seriaType && (0, _isTypeFn.isStr)(seriaType) ? seriaType.toLowerCase() : dfType || 'spline';
exports.crType = crType;
const fCreditsRightBottom = option => (0, _merge.default)(false, {
  enabled: true,
  position: {
    align: 'right',
    verticalAlign: 'bottom',
    x: -10,
    y: -5
  }
}, option);
exports.fCreditsRightBottom = fCreditsRightBottom;
const _fCrTitle = y => option => (0, _merge.default)(false, {
  ...CAPTION_CONFIG,
  y
}, _sanitizeOptionText(option));
const fTitle = exports.fTitle = _fCrTitle(-10);
const fSubtitle = exports.fSubtitle = _fCrTitle(10);
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
    yAxis: {
      ...YAXIS_CONFIG,
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
const crCategoryDataLabels = isEnabled => ({
  enabled: isEnabled,
  color: (0, _styleFn.getColorBlack)(),
  crop: false,
  overflow: 'allow',
  style: {
    fontSize: '15px'
  }
});
exports.crCategoryDataLabels = crCategoryDataLabels;
const fEventsMouseOver = mouseOver => ({
  events: {
    mouseOver
  }
});
exports.fEventsMouseOver = fEventsMouseOver;
const fCrosshair = exports.fCrosshair = _crCrosshair;
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
const fXAxisOpposite = option => (0, _merge.default)(false, {
  opposite: true,
  tickLength: 0,
  tickPosition: 'inside',
  labels: {
    y: -5
  }
}, option);
exports.fXAxisOpposite = fXAxisOpposite;
const fYAxisOpposite = option => (0, _merge.default)(false, {
  opposite: true,
  title: {
    text: ''
  }
}, option);
exports.fYAxisOpposite = fYAxisOpposite;
const fSecondYAxis = (name, color) => ({
  //crosshair : fCrosshair(),
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
      fontSize: "15px"
    }
  }
});
exports.fSecondYAxis = fSecondYAxis;
const _fCrPlotOptions = (colorHoverLine, colorMarkerLine) => option => (0, _merge.default)(false, _crPlotOption(colorHoverLine, colorMarkerLine), option || {});
const fPlotOptionsArea = exports.fPlotOptionsArea = _fCrPlotOptions(_Color.COLOR_AREA_HOVER_LINE, _Color.COLOR_AREA_MARKER_LINE);
const fPlotOptionsColumn = exports.fPlotOptionsColumn = _fCrPlotOptions(_Color.COLOR_COLUMN_HOVER_LINE, _Color.COLOR_COLUMN_MARKER_LINE);
const fPlotOptionsSeries = option => (0, _merge.default)(false, {
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
const fLegend = option => (0, _merge.default)(false, {
  useHTML: true,
  symbolHeight: 14,
  symbolWidth: 14,
  symbolRadius: 7,
  itemStyle: {
    ...FONT_STYLE,
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