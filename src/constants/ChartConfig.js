import Highcharts from 'highcharts';
import merge from 'lodash/merge';

import Chart from './Chart';
import Tooltip from './Tooltip';

import WithIndicator from './WithIndicator';
import WithPie from './WithPie';
import WithStackedArea from './WithStackedArea';
import WithStackedColumn from './WithStackedColumn';
import WithTreeMap from './WithTreeMap';

const ChartConfig = {
  ...WithIndicator,
  ...WithPie,
  ...WithStackedArea,
  ...WithStackedColumn,
  ...WithTreeMap
};


const _fnCreateMonochromePieColors = function({
  base1='#7cb5ec',
  base2='#90ed7d'
}){
  var colors = [],
      i;

  for (i = 0; i < 4; i += 1) {
      // Start out with a darkened base color (negative brighten), and end
      // up with a much brighter color
      colors.push(Highcharts.Color(base1).brighten((i - 3) / 7).get());
  }
  for (i = 0; i < 4; i += 1) {
      colors.push(Highcharts.Color(base2).brighten((i - 3) / 7).get());
  }
  return colors;
}

const _handlerMouserOverPoint = function(event){
   const chart = this.series.chart
       , x = this.x
       , y = this.y
       , plotX = this.plotX
       , plotY = this.plotY
       , date = Highcharts.dateFormat('%d-%m-%Y', x);

   if (chart.xCrossLabel) {
     chart.xCrossLabel.attr({
       x : plotX,
       text: date
     });
     chart.yCrossLabel.attr({
       x : chart.yAxis[0].width + 16,
       y: plotY + chart.plotTop,
       text: y
     });
   } else {
     chart.xCrossLabel = chart.renderer.text(date, plotX, 50)
                           .css({ color: 'yellow', fontSize: '15px'})
                           .add();
     chart.yCrossLabel = chart.renderer.text(y, chart.yAxis[0].width + 16 , plotY + chart.plotTop)
                           .css({ color: 'yellow', fontSize: '15px'})
                           .add();
   }
}


ChartConfig.theme = {
    credits: {
      enabled : true,
      position : {
          align: 'right',
          x: -10,
          verticalAlign: 'bottom',
          y: -5
      },
      target : '_blank',
      href : 'http://www.highcharts.com'
    },
    chart : {
      //width: 600,
      height: Chart.HEIGHT,
      spacingTop: Chart.THEME_SPACING_TOP,
      spacingBottom: Chart.SPACING_BOTTOM,
      plotBackgroundColor: "rgba(77,77,77,1)",
      backgroundColor : "rgba(77,77,77,1)",
      reflow: false,

      events : {
        load : function(){
          this.zhTooltip = new Highcharts.Tooltip(this, this.options.tooltip);
        }
      }
    },
    colors: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9',
             '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
    labels : {
      items : []
    },
    plotOptions: {
      area: {
        fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
               [0, "rgba(69, 114, 167, 1)"],
               [1, "rgba(2, 0, 0, 0)"]
            ]
        },
        marker: {
          states: {
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
      },
      series : {
        states : {
          hover : {
            halo : {
              opacity : 0.35,
              size : 16
            }
          }
        },
        stickyTracking : false,
        events : {
          click : function(event) {
            this.chart.zhTooltip.refresh(event.point, event);
          }
        }
      },
      pie : {
        colors : _fnCreateMonochromePieColors({
          base1:'#7cb5ec', base2:'#90ed7d'
        })
      }
    },
    tooltip: {
      useHTML : true,
      enabled : false,
      hideDelay : 100,
      followPointer : false,
      shared : false,

      backgroundColor: 'rgba(0,0,0, 0.5)',
      borderWidth: 2,
      borderRadius: 10,

      headerFormat: '<span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">{point.key}</span><br/>',
      pointFormat: '<span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Value: </span>'+
                   '<span style="font-weight: bold; color:rgba(194,149,23,1);">{point.y}</span><br/>'
    },
    xAxis: {
      lineColor: "gray",
      lineWidth: 3,
      tickColor: '#FDB316',
      tickWidth: 3,
      tickLenght: 5,
      gridLineColor: "gray",
      //gridLineColor: '#FDB316',
      gridLineDashStyle: "ShortDashDotDot",
      gridLineWidth: 1,
      labels:{
        style: {
          color: '#FDB316',
          fontWeight: "bold",
          fontSize: "15px"
        }
      }
    },
    yAxis: {
        lineColor: "gray",
        lineWidth: 3,
        tickColor: '#2f7ed8',
        tickWidth: 3,
        tickLenght: 5,
        gridLineColor: "gray",
        //gridLineColor: '#2f7ed8',
        gridLineDashStyle: "ShortDashDotDot",
        labels: {
          style: {
            color : '#2f7ed8',
            fontWeight: "bold",
            fontSize: "14px"
          }
        }
    }
};


ChartConfig.fnNumberFormat = function(value){
  const arrSplit = (value+'').split('.')
      , decimal =  ( arrSplit[1] ) ? arrSplit[1].length : 0;

  return Highcharts.numberFormat(value, decimal, '.', ' ');
}

ChartConfig.fBaseAreaConfig = function(){
  return {

  zhSeries : {
    count : 0
  },
  zhDetailCharts : [],

  chart : {
     zoomType : 'xy',
     resetZoomButton: {
                position: {
                    align: 'right',
                    verticalAlign: 'top',
                    x: -10,
                    y: 0
                },
                relativeTo: 'chart'
     },
     marginRight : 60
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
    crosshair : {
      color : 'yellow',
      width : 1
    }
  },
  yAxis: {
    endOnTick : false,
    maxPadding : 0.15,
    //startOnTick : true,
    startOnTick : false,
    minPadding : 0.15,
    title: {
      text: ''
    },
    plotLines: [
     {
       //value: 0.00 ,
       value: undefined ,
       color: 'green',
       dashStyle: 'solid',
       width: 1,
       zIndex: 4,
       label: {
         text: 'max',
         verticalAlign: 'top',
         style: {
           color: 'green',
           fontWeight: 'bold',
           fontSize: 'medium'
         }
       }
     },{
       //value:  0.00 ,
       value: undefined ,
       color: '#ED5813',
       dashStyle: 'solid',
       width: 1,
       zIndex: 4,
       label: {
         text: 'min',
         verticalAlign: 'top',
         y: 15,
         style: {
           color: '#ED5813',
           fontWeight: 'bold',
           fontSize: 'medium'
         }
      }
    }
   ]
  },
  series: [{
    zhValueText : 'Value',
    turboThreshold : 20000,
    type: 'area',
    tooltip : {
      pointFormatter : Tooltip.fnBasePointFormatter,
      headerFormat : ''
   },
   lineWidth : 1,
   states: {
      hover: {
         lineWidth : 1
      }
   },
   point : {
     events : {
       mouseOver : _handlerMouserOverPoint
     }
   }
  }]
 }
};

ChartConfig.legendVolume = {
   enabled : true,
   align: 'left',
   verticalAlign: 'top',
   x: 124,
   y: -8,
   floating: true,

   symbolHeight: 12,
   symbolWidth: 12,
   symbolRadius: 6,

   itemStyle : {
     color : 'rgba(164, 135, 212, 1)',
     fontSize : '16px'
   },
   itemHoverStyle : {
     color : '#2F7ED8'
   },
   itemHiddenStyle : {
     color : 'gray'
   }
}


ChartConfig.fMarkerExDividend = function(){
  return {
    y: 0,
    exValue: 0.5,
    marker : {
      symbol: 'circle',
      fillColor: 'rgba(0, 128, 0, 0.9)',
      radius: 6,
      states: {
        hover: {
          enable: true,
          fillColor: '#4D4D4D',
          lineColor: 'green',
          lineWidth: 2,
          radius: 6
        }
      }
    },
    dataLabels : {
      enabled: true,
      inside: true,
      style : {
        color: 'green',
        fontSize: '11px',
        fontWeight: 'bold',
        textShadow: 'none'
      },
      crop: false,
      overflow: 'none',
      y: 32,
      formatter : function(){
        return this.point.exValue;
      }
    }
  }
};

ChartConfig.fMarkerSplitRatio = function(){
  const objPoint = ChartConfig.fMarkerExDividend();
  objPoint.marker.fillColor = '#ED5813';
  objPoint.marker.states.hover.lineColor = '#ED5813';
  objPoint.dataLabels.style.color = '#ED5813';
  objPoint.dataLabels.formatter = function() { return this.point.splitRatio};
  return objPoint;
}

const _fScatterSeria = function(color, pointFormatter, data, zhSeriaId){
  return {
    type: 'scatter',
    color: color,
    tooltip : {
      pointFormatter : pointFormatter,
      headerFormat : ''
    },
    data : data,
    zhSeriaId : zhSeriaId
  }
}
ChartConfig.fExDividendSeria = function(data, chartId){
  return _fScatterSeria('green', Tooltip.fnExDividendPointFormatter, data, chartId + '_ExDivident');
}
ChartConfig.fSplitRatioSeria = function(data, chartId){
  return _fScatterSeria('#ED5813', Tooltip.fnSplitRatioPointFormatter, data, chartId + '_SplitRatio');
}

ChartConfig.fSeries = function(option={}){
  return merge({
      type: 'spline',
      lineWidth : 1,
      tooltip : {
        pointFormatter : Tooltip.fnBasePointFormatter,
        headerFormat : ''
      }
  }, option);
}

ChartConfig.fTitleMetric = function(text){
 return {
   text : text,
   style : {
     color : 'rgba(164, 135, 212, 1)',
     fontSize : '16px',
     fontWeight : 'bold'
   },
   floating : true,
   align: 'left',
   verticalAlign: 'top',
   x: 8,
   y: 15
  }
};


ChartConfig.zoomMetricCharts = function(event){
   const zhDetailCharts = this.chart.options.zhDetailCharts;
   if (event.userMin){
      zhDetailCharts.forEach((chart)=>{
        chart.xAxis[0].setExtremes(
          event.userMin, event.userMax, true, true
        );
      })
   } else {
      zhDetailCharts.forEach((chart) => {
        chart.xAxis[0].setExtremes(
          event.min, event.max, true, true
        );
      })
   }
}

export default ChartConfig
