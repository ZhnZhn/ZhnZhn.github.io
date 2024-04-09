import { getColorBlack } from '../components/styleFn';

import {
  isObj,
  isStr
} from '../utils/isTypeFn';
import domSanitize from '../utils/domSanitize';
import merge from '../utils/merge';

import {
  COLOR_CHART_TITLE,
  COLOR_CROSSHAIR,
  COLOR_HALO_BASE,
  COLOR_LEGEND_ITEM,
  COLOR_AREA_HOVER_LINE,
  COLOR_AREA_MARKER_LINE,
  COLOR_COLUMN_HOVER_LINE,
  COLOR_COLUMN_MARKER_LINE,
  COLOR_MARKER_HOVER_LINE,
  COLOR_MARKER_HOVER_FILL
} from '../constants/Color';
import { tooltipValueTdmyIf } from './Tooltip';

const FONT_STYLE = {
  fontSize: '16px',
  fontWeight: 'bold',
}
, CAPTION_CONFIG = {
  text: '',
  floating: true,
  align: 'left',
  x: 25,
  style: {
    ...FONT_STYLE,
    stroke: 'transparent',
    color: COLOR_CHART_TITLE,
    fill: COLOR_CHART_TITLE,
  }
}
, YAXIS_CONFIG = {
  endOnTick: false,
  maxPadding: 0.15,
  startOnTick: false,
  minPadding: 0.15,
  title: { text: '' }
}
, _crPlotOption = (
  lineColor,
  markerLineColor
) => ({
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
  if (isObj(option)) {
    option.text = domSanitize(option.text)
  }
  return option;
};

const  _crTitle = title => isStr(title)
  ? { text: domSanitize(title) }
  : _sanitizeOptionText(title)
, _crCrosshair = (
  is=true
) => is ? {
  color: COLOR_CROSSHAIR,
  width: 1,
  zIndex: 2
} : void 0;

export const CHART_HEIGHT = 300
export const MARGIN_RIGHT = 50
export const STACKED_HEIGHT = 500
export const LEGEND_ROW_HEIGHT = 32

export const SPACING_TOP = 20
export const STACKED_SPACING_TOP = 25
export const SPACING_BOTTOM = 24

export const SEMIDONUT_TITLE_Y = 15
export const SEMIDONUT_SUBTITLE_Y = 35

export const crType = (
  seriaType,
  dfType
) => seriaType && isStr(seriaType)
  ? seriaType.toLowerCase()
  : dfType || 'spline';

export const fCreditsRightBottom = (
  option
) => merge(false, {
   enabled: true,
   position: {
      align: 'right',
      verticalAlign: 'bottom',
      x: -10,
      y: -5
  }
}, option)

const _fCrTitle = y => (
  option
) => merge(false,
  {...CAPTION_CONFIG, y},
  _sanitizeOptionText(option)
);

export const fTitle = _fCrTitle(-10)
export const fSubtitle = _fCrTitle(10)

export const setDefaultTitle = (
  config,
  title,
  subtitle
) => {
   config.chart.spacingTop = STACKED_SPACING_TOP;
   config.title = fTitle({ text: title });
   config.subtitle = fSubtitle({ text: subtitle });
}

export const fNavigation = () => ({
  buttonOptions: {
    y: 5
  }
})

export const fTooltip = (
  pointFormatter
) => ({
  pointFormatter,
  headerFormat: ''
})

export const crAreaConfig = ({
  title='',
  seriaType,
  seriaColor,
  seriaWidth=1,
  spacingTop,
  isCrosshair
}={}) => {
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
      tooltip: fTooltip(tooltipValueTdmyIf),
      lineWidth: seriaWidth,
      states: {
        hover: {
          lineWidth: seriaWidth
        }
     }
    }]
  }
}

export const crCategoryDataLabels = (isEnabled) => ({
  enabled: isEnabled,
  color: getColorBlack(),
  crop: false,
  overflow: 'allow',
  style: {
    fontSize: 14
  }
})

export const fEventsMouseOver = (
  mouseOver
) => ({
  events: {
    mouseOver
  }
})

export const fCrosshair = _crCrosshair

export const fPlotLine = (
  color,
  text
) => ({
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
})


export const fXAxisOpposite = (
  option
) => merge(false, {
   opposite: true,
   tickLength: 0,
   tickPosition: 'inside',
   labels: {
     y: -5
   }
}, option)

export const fYAxisOpposite = (
  option
) => merge(false, {
   opposite: true,
   title: {
      text: ''
   }
}, option)

export const fSecondYAxis = (
  name,
  color
) => ({
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
       fontSize: "14px"
     }
   }
})

const _fCrPlotOptions = (
  colorHoverLine,
  colorMarkerLine
) => (
  option
) => merge(false, _crPlotOption(
   colorHoverLine,
   colorMarkerLine
), option || {});

export const fPlotOptionsArea = _fCrPlotOptions(
  COLOR_AREA_HOVER_LINE,
  COLOR_AREA_MARKER_LINE
)
export const fPlotOptionsColumn = _fCrPlotOptions(
  COLOR_COLUMN_HOVER_LINE,
  COLOR_COLUMN_MARKER_LINE
)

export const fPlotOptionsSeries = (
  option
) => merge(false, {
   states: {
     hover: {
       halo: {
         attributes: {
           fill: COLOR_HALO_BASE
         },
         opacity: 0.35,
         size: 16
       }
     }
   }
}, option)


export const fLegend = (
  option
) => merge(false, {
   useHTML: true,
   symbolHeight: 14,
   symbolWidth: 14,
   symbolRadius: 7,
   itemStyle: {
     ...FONT_STYLE,
     color: COLOR_LEGEND_ITEM,
     lineHeight: 1.5,
     cursor: 'pointer'
   }
}, option)

export const fSeriaMarker = (
   symbol
) => ({
   symbol,
   radius: 4,
   states: {
     hover: {
       enabled: true,
       fillColor: COLOR_MARKER_HOVER_FILL,
       lineColor: COLOR_MARKER_HOVER_LINE,
       lineWidth: 1,
       lineWidthPlus: 0,
       radius: 2,
       radiusPlus: 0
     }
   }
})
