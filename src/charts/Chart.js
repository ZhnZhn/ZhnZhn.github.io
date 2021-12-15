
import Highcharts from 'highcharts';
import DOMPurify from 'dompurify'

import COLOR from '../constants/Color';
import Tooltip from './Tooltip';
import MonoColorSlice from './MonoColorSlice';

const merge = Highcharts.merge;
const _isStr = str => typeof str === 'string';

const FONT_STYLE = {
  fontSize: '16px',
  fontWeight: 'bold',
}, CAPTION_CONFIG = {
  text: '',
  floating: true,
  align: 'left',
  x: 25,
  style: {
    ...FONT_STYLE,
    stroke: 'transparent',
    color: COLOR.CHART_TITLE,
    fill: COLOR.CHART_TITLE,
  }
}, YAXIS_CONFIG = {
  endOnTick: false,
  maxPadding: 0.15,
  startOnTick: false,
  minPadding: 0.15,
  title: { text: '' }
}, _crPlotOption = (lineColor, markerLineColor) => ({
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
    option.text = DOMPurify.sanitize(option.text || '')
  }
  return option;
};

const  _crTitle = title => _isStr(title)
  ? { text: DOMPurify.sanitize(title) }
  : _sanitizeOptionText(title)
, _crCrosshair = (is=true) => is ? {
    color: COLOR.CROSSHAIR,
    width: 1,
    zIndex: 2
  } : void 0;

const Chart = {
  HEIGHT : 300,
  MARGIN_RIGHT: 50,
  STACKED_HEIGHT : 500,
  LEGEND_ROW_HEIGHT : 32,

  THEME_SPACING_TOP: 5,
  SPACING_TOP : 20,
  STACKED_SPACING_TOP : 25,
  SPACING_BOTTOM : 24,
  MARGIN_TOP : 60,

  SEMIDONUT_TITLE_Y : 15,
  SEMIDONUT_SUBTITLE_Y: 35,

  ...MonoColorSlice,

  crType(seriaType, dfType){
    return seriaType && _isStr(seriaType)
      ? seriaType.toLowerCase()
      : dfType || 'spline';
  },

  fCreditsRightBottom(option){
    return merge(false, {
       enabled: true,
       position: {
          align: 'right',
          verticalAlign: 'bottom',
          x: -10,
          y: -5
      }
    }, option)
  },

  setDefaultTitle(config, title, subtitle){
    config.chart.spacingTop = Chart.STACKED_SPACING_TOP;
    config.title = Chart.fTitle({ text: title });
    config.subtitle = Chart.fSubtitle({ text: subtitle });
  },

  fTitle(option){
    _sanitizeOptionText(option)
    return merge(false, {
       ...CAPTION_CONFIG,
       y: -10
    }, option)
  },
  fSubtitle(option){
    _sanitizeOptionText(option)
    return merge(false, {
      ...CAPTION_CONFIG,
      y: 10
    }, option)
  },

 fNavigation(){
   return {
     buttonOptions: {
       y: 5
     }
   }
 },

crAreaConfig({
  title='',
  seriaType,
  seriaColor,
  seriaWidth=1,
  spacingTop,
  isCrosshair
}={}){
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
    yAxis: {
      ...YAXIS_CONFIG,
      crosshair: _crCrosshair(isCrosshair),
      opposite: true,
      showEmpty: true
    },
    series: [{
      turboThreshold: 20000,
      type: Chart.crType(seriaType, 'area'),
      color: seriaColor,
      tooltip: Chart.fTooltip(Tooltip.vTdmyIf),
      lineWidth: seriaWidth,
      states: {
        hover: {
          lineWidth: seriaWidth
        }
     }
    }]
  }
},

fEventsMouseOver(fn){
  return {
    events: {
      mouseOver: fn
   }
  }
},

fTooltip(fnPointFormatter){
  return {
    pointFormatter: fnPointFormatter,
    headerFormat: ''
  }
},

fCrosshair: _crCrosshair,

fPlotLine(color, text){
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
   }
 },

 fXAxisOpposite(option){
    return merge(false, {
      opposite: true,
      tickLength: 0,
      tickPosition: 'inside',
      labels: {
        y: -5
      }
    }, option)
  },

  fYAxisOpposite(option){
    return merge(false, {
       opposite: true,
       title: {
          text: ''
       }
    }, option)
  },

  fSecondYAxis(name, color){
    return {
      //crosshair : Chart.fCrosshair(),
      ...YAXIS_CONFIG,
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
    }
  },

  fPlotOptionsArea(option){
    return merge(false, _crPlotOption(
       COLOR.AREA_HOVER_LINE,
       COLOR.AREA_MARKER_LINE
     ), option || {});
  },

  fPlotOptionsColumn(option){
    return merge(false, _crPlotOption(
      COLOR.COLUMN_HOVER_LINE,
      COLOR.COLUMN_MARKER_LINE
    ), option)
  },

  fPlotOptionsSeries(option){
    return merge(false, {
      states: {
        hover: {
          halo: {
            attributes: {
              fill: COLOR.HALO_BASE
            },
            opacity: 0.35,
            size: 16
          }
        }
      }
    }, option)
  },

  fLegend(option){
    return merge(false, {
       symbolHeight: 14,
       symbolWidth: 14,
       symbolRadius: 7,
       useHTML: true,
       itemStyle: {
         ...FONT_STYLE,
         color: COLOR.LEGEND_ITEM,
         lineHeight: 1.5,
         cursor: 'pointer'
       }
    }, option)
  },


 fSeriaMarker({ color, symbol }){
    return {
      radius: 4,
      symbol: symbol,
      states: {
        hover: {
          fillColor: COLOR.MARKER_HOVER_FILL,
          lineColor: COLOR.MARKER_HOVER_LINE,
          lineWidth: 1,
          lineWidthPlus: 0,
          enabled: true,
          radius: 2,
          radiusPlus: 0
        }
      }
    }
  }

};

export default Chart
