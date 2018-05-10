
//import merge from 'lodash.merge';
import Highcharts from 'highcharts';

import COLOR from '../constants/Color';
import Tooltip from './Tooltip';

const merge = Highcharts.merge;

const S = {
  TITLE_BASE: {
    stroke: 'transparent',
    fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

const _addMonoColorsTo = (colors=[], base) => {
  let i;
  for (i=0; i<4; i++) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
   colors.push(
     Highcharts.Color(base)
       .brighten((i - 3) / 7)
       .setOpacity(0.75)
       .get()
     );
  }
}

const _fMonoColors = function({ base1=COLOR.MONO_BASE1, base2=COLOR.MONO_BASE2 }={}){
  const colors = [];

  _addMonoColorsTo(colors, base1);
  _addMonoColorsTo(colors, base2);

  return colors;
}

const Chart = {
  COLOR_PERIOD : 4/7,
  COLOR_LOW_LEVEL : -3/7,
  COLOR_OPACITY : 0.75,
  COLOR_BASE1 : COLOR.MONO_BASE1,
  COLOR_BASE2 : COLOR.MONO_BASE2,

  HEIGHT : 300,
  MARGIN_RIGHT: 50,
  STACKED_HEIGHT : 500,
  LEGEND_ROW_HEIGHT : 32,

  THEME_SPACING_TOP: 5,
  SPACING_TOP : 20,
  STACKED_SPACING_TOP : 25,
  SPACING_BOTTOM : 24,
  MARGIN_TOP : 60,
  TREEMAP_MARGIN_TOP : 50,

  STACKED_TITLE_Y : -10,
  STACKED_SUBTITLE_Y : 10,
  TREEMAP_TITLE_Y : 15,
  TREEMAP_SUBTITLE_Y : 35,
  SEMIDONUT_TITLE_Y : 15,
  SEMIDONUT_SUBTITLE_Y: 35,


  _monoColors : _fMonoColors(),

  fCreateMonoColor(base=COLOR.MONO_BASE1, deltaColor=0, opacity=0.75){
    return Highcharts.Color(base)
       .brighten( (this.COLOR_LOW_LEVEL) + deltaColor)
       .setOpacity(opacity)
       .get();
  },

  fnGetMonoColor(index){
     const colorIndex = index % 8;
     return  this._monoColors[colorIndex];
  },

  fCreditsRightBottom(option={}){
    return merge(false, {
       enabled : true,
       position : {
           align: 'right',
           x: -10,
           verticalAlign: 'bottom',
           y: -5
      }
    }, option)
  },

  fResetZoomButton(option={}){
    return merge(false, {
       position: {
          align: 'right',
          verticalAlign: 'top',
          x: 0,
          y: 0
       },
       theme : {
         fill : COLOR.BG_TITLE,
         stroke : COLOR.BG_TITLE,
         r : 4,
         style : {
           color : COLOR.TITLE_SHOW
         },
         states : {
           hover : {
             fill : COLOR.BG_TITLE,
             stroke : COLOR.HOVER,
             'stroke-width' : 2,
             style : {
               color : COLOR.HOVER
             }
           }
         }
       },
       relativeTo: 'chart'
    }, option)
  },

  setDefaultTitle(config, title, subtitle){
    config.chart.spacingTop = this.STACKED_SPACING_TOP;
    config.title = this.fTitle({ text : title, y: this.STACKED_TITLE_Y });
    config.subtitle = this.fSubtitle({ text : subtitle, y : this.STACKED_SUBTITLE_Y });
  },

  fTitle(option={}){
    return merge(false, {
       text: '',
       floating: true,
       align: 'left',
       x: 25,
       y: 25,
       style: {
         ...S.TITLE_BASE,
         color: COLOR.CHART_TITLE,
         fill: COLOR.CHART_TITLE,
       }
    }, option)
  },
  fSubtitle(option={}){
    return merge(false, {
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 45,
      style: {
        ...S.TITLE_BASE,
        color: COLOR.CHART_SUBTITLE,
        fill: COLOR.CHART_SUBTITLE
      }
    }, option)
  },

 fTitleIndicator(text){
   return {
     text : text,
     style : {
       color: COLOR.METRIC_TITLE,
       fontSize : '16px',
       fontWeight : 'bold'
     },
     floating : true,
     align: 'left',
     verticalAlign: 'top',
     x: 8,
     y: 15
    }
 },

 fNavigation(){
   return {
     buttonOptions : {
       y : 5
     }
   }
 },

fBaseConfig(){
  return {
    zhSeries : {
      count : 0
    },
    chart : {
      marginRight: Chart.MARGIN_RIGHT
    },
    title: {
      text: ''
    },
    legend: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      labels : {},
      crosshair : Chart.fCrosshair()
    },
    yAxis: {
      crosshair : Chart.fCrosshair(),
      endOnTick : false,
      maxPadding : 0.15,
      startOnTick : false,
      minPadding : 0.15,
      opposite : true,
      showEmpty : true,
      title: {
        text: ''
      }
    },
    series: [{
      zhValueText : 'Value',
      turboThreshold : 20000,
      type: 'area',
      tooltip : Chart.fTooltip(Tooltip.fnBasePointFormatter),
      lineWidth : 1,
      states: {
        hover: {
          lineWidth : 1
        }
     }
    }]
  }
},

fEventsMouseOver(fn){
  return {
    events : {
      mouseOver : fn
   }
  }
},

fTooltip(fnPointFormatter){
  return {
    pointFormatter : fnPointFormatter,
    headerFormat : ''
  }
},

fCrosshair(){
    return {
      color : COLOR.CROSSHAIR,
      width : 1,
      zIndex : 2
      //zIndex : 100
    }
  },

  fPlotLine(color, text){
    return {
      id: text,
      value: undefined ,
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

 fXAxisOpposite(option={}){
    return merge(false, {
      opposite : true,
      tickLength : 0,
      tickPosition : 'inside',
      labels : {
        y : -5
      }
    }, option)
  },

  fYAxisOpposite(option={}){
    return merge(false, {
       opposite: true,
       title: {
          text: ''
       }
    }, option)
  },

  fSecondYAxis(name, color){
    return {
      id: name,

      gridLineWidth: 0,

      endOnTick : false,
      maxPadding : 0.15,
      startOnTick : false,
      minPadding : 0.15,

      title: {
          text: ''
      },
      lineWidth: 2,
      lineColor: color,
      tickColor: color,
      labels: {
        style: {
          color : color,
          fontWeight: "bold",
          fontSize: "14px"
        }
      }
    }
  },

  calcMinY({ minPoint, maxPoint }){
    if ( maxPoint>Number.NEGATIVE_INFINITY && minPoint<Number.POSITIVE_INFINITY){
       return minPoint - ((maxPoint-minPoint)*1/6)
    } else {
      return undefined;
    }
  },

  fPlotOptionsArea(option={}){
    return merge(false, {
      lineColor: COLOR.AREA_HOVER_LINE,
      lineWidth: 0,
      marker: {
          enabled : false,
          lineWidth: 1,
          lineColor: COLOR.AREA_MARKER_LINE
      },
      state : {
        hover : {
          lineWidth : 2
        }
      }
    }, option);
  },

  fPlotOptionsColumn(option={}){
    return merge(false, {
        lineColor: COLOR.COLUMN_HOVER_LINE,
        lineWidth: 0,
        marker: {
            enabled : false,
            lineWidth: 1,
            lineColor: COLOR.COLUMN_MARKER_LINE
        },
        state : {
          hover : {
            lineWidth : 2
          }
        }
    }, option)
  },

  fPlotOptionsSeries(option={}){
    return merge(false, {
      states : {
        hover : {
          halo : {
            attributes : {
              fill : COLOR.HALO_BASE
            },
            opacity : 0.35,
            size : 16
          }
        }
      }
    }, option)
  },

  fLegend(option={}){
    return merge(false, {
       symbolHeight: 14,
       symbolWidth: 14,
       symbolRadius: 7,
       useHTML: true,
       itemStyle : {
         color: COLOR.LEGEND_ITEM,
         cursor: 'pointer',
         fontSize: '16px',
         fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
         fontWeight: 'bold',
         lineHeight : 1.5
       }
    }, option)
  },


 fSeriaMarker({ color, symbol }){
    return {
      radius : 4,
      symbol : symbol,
      states : {
        hover : {
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
