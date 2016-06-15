

import Chart from './Chart';
import Tooltip from './Tooltip';

const WithStackAreaChart = {
   fBaseStackAreaConfig(){
     return {
       zhSeries : {
         count : 0
       },
       zhDetailCharts : []  ,

       chart: {
         type: 'area',
         spacingTop: Chart.SPACING_TOP,
         spacingBottom: Chart.SPACING_BOTTOM,

         zoomType : 'xy',
         resetZoomButton: {
              position: {
                  align: 'left',
                  verticalAlign: 'top',
                  x: 100,
                  y: 48
              },
              relativeTo: 'chart'
         }
       },
       title : Chart.fTitle({y:40}),
       subtitle : Chart.fSubtitle({y:60}),

       xAxis: Chart.fXAxisOpposite({
         categories:[],
         startOnTick: false,
         min: 1,
         crosshair : {
           color : 'yellow',
           width : 1,
           zIndex : 2
         }
         //maxPadding:0,
         //minPadding:0
       }),
       yAxis: {
         opposite: true,
         title: {
           text: ''
         }
       },

       tooltip: {
         pointFormatter : Tooltip.fnStackedAreaPointFormatter,
         headerFormat : ''
       },

       plotOptions: {
            area: {
                stacking: 'normal',
                //lineColor: 'black',
                lineColor: 'yellow',
                lineWidth: 0,
                marker: {
                    enabled : false,
                    lineWidth: 1,
                    //lineColor: 'black'
                    //lineColor: '#232F3B'
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
            }
      },
      legend : {
        itemStyle : {
          color: 'black',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'normal'
        }
      }
    }
  },

  fStackAreaSeria({zhSeriaId, name, data=[], color='gray'}){
    return {
        zhSeriaId : zhSeriaId,
        name: name,
        data : data,
        color : color,
        fillColor : color,
        fillOpacity: 0.5,
        marker : {
          radius: 6,
          symbol : 'circle'
        }
    }
  }
}

export default WithStackAreaChart
