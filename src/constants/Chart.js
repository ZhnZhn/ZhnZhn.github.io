
import merge from 'lodash/merge';
import Highcharts from 'highcharts';

const _fnCreateMonoColors = function({
        base1='#7cb5ec',base2='#90ed7d'
}){
  var colors = []
   , i;

  for (i = 0; i < 4; i += 1) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
   colors.push(Highcharts.Color(base1).brighten((i - 3) / 7).setOpacity(0.75).get());
   //console.log(Highcharts.Color(base1));
  }
  for (i = 0; i < 4; i += 1) {
     colors.push(Highcharts.Color(base2).brighten((i - 3) / 7).setOpacity(0.75).get());
  }
  return colors;
}


const Chart = {
  COLOR_PERIOD : 4/7,
  COLOR_LOW_LEVEL : -3/7,
  COLOR_OPACITY : 0.75,
  COLOR_BASE1 : '#7CB5EC',
  COLOR_BASE2 : '#90ED7D',

  HEIGHT : 300,
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


  _monoColors : _fnCreateMonoColors({}),

  fCreateMonoColor(base='#7CB5EC', deltaColor=0, opacity=0.75){
    return Highcharts.Color(base)
                      .brighten( (this.COLOR_LOW_LEVEL) + deltaColor)
                      .setOpacity(opacity)
                      .get()
  },

  fnGetMonoColor(index){
     const colorIndex = index % 8;
     return  this._monoColors[colorIndex];
  },

  fCreditsRightBottom(option={}){
    return merge({
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
    return merge({
       position: {
          align: 'right',
          verticalAlign: 'top',
          x: 0,
          y: 0
       },
       relativeTo: 'chart'
    }, option)
  },

  fTitle(option={}){
    return merge({
       text: '',
       floating: true,
       align: 'left',
       x: 25,
       y: 25,
       style: {
         fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
         color: '#a487d4',
         fontSize: '16px',
         fontWeight: 'bold'
       }
    }, option)
  },
  fSubtitle(option={}){
    return merge({
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 45,
      style: {
        color: 'black',
        fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }, option)
  },

  fTooltip(fnPointFormatter){
    return {
        pointFormatter : fnPointFormatter,
        headerFormat : ''
    }
  },

  fXAxisOpposite(option={}){
    return merge({
      opposite : true,
      tickLength : 0,
      tickPosition : 'inside',
      labels : {
        y : -5
      }
    }, option)
  },

  fYAxisOpposite(option={}){
    return merge({
       opposite: true,
       title: {
          text: ''
       }
    }, option)
  },

  calcMinY({ minPoint, maxPoint }){
    return minPoint - ((maxPoint-minPoint)*30/180)
  },

  fPlotOptionsArea(option={}){
    return merge({
      lineColor: 'yellow',
      lineWidth: 0,
      marker: {
          enabled : false,
          lineWidth: 1,
          lineColor: '#a487d4'
      },
      state : {
        hover : {
          lineWidth : 2
        },
        halo : {
          opacity: 0.25,
          size : 10
        }
      }
    }, option);
  },

  fPlotOptionsColumn(option={}){
    return merge({
        lineColor: 'yellow',
        lineWidth: 0,
        marker: {
            enabled : false,
            lineWidth: 1,
            lineColor: '#a487d4'
        },
        state : {
          hover : {
            lineWidth : 2
          },
          halo : {
            opacity: 0.25,
            size : 10
          }
        }
    }, option)
  },

  fLegend(option={}){
    return merge({
       //itemMarginBottom : 5,
       symbolHeight: 14,
       symbolWidth: 14,
       symbolRadius: 7,
       useHTML: true,
       itemStyle : {
         color: 'black',
         cursor: 'pointer',
         fontSize: '16px',
         fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
         fontWeight: 'bold',
         lineHeight : 1.5
       }
    }, option)
  },


  fSeriaMarkerConfig(columnName){
    if (columnName.toLowerCase() === 'open' || columnName.toLowerCase() === 'open interest'){
      return { color : '#90ed7d', symbol: 'circle' };
    } else if (columnName.toLowerCase() === 'high'){
      return { color: 'green', symbol : 'circle' };
    } else if (columnName.toLowerCase() === 'low'){
      return { color : '#ED5813', symbol : 'circle' };
    } else if (columnName.toLowerCase() === 'adj. close'){
      return { color : '#f15c80', symbol: 'diamond' } ;
    }

    return { color: undefined, symbol: undefined};
  },

  fSeriaMarker({ color, symbol }){
    return {
      radius : 4,
      symbol : symbol,
      states : {
        hover : {
          fillColor: 'yellow',
          lineColor: 'yellow',
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
