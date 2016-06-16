
import Chart from './Chart';
import Tooltip from './Tooltip';


const WithStackedColumn = {

  fBaseStackedColumnConfig(){
    return {
      zhSeries : {
        count : 0
      },
      zhDetailCharts : []  ,

      chart: {
        type: 'column',
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

      /*
      xAxis : {
        categories : []
      },
      */

      xAxis: Chart.fXAxisOpposite({
        categories:[],
        startOnTick: false,
        min: 1,
        crosshair : {
          color : 'yellow',
          width : 1,
          zIndex : 2
        }
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
           column: {
               stacking: 'normal',
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

 fStackedColumnSeria({zhSeriaId, name, data=[], color='gray'}){
   return {
     zhSeriaId : zhSeriaId,
     name: name,
     data : data,
     borderColor: 'transparent',
     borderWidth : 1,
     color : color,
     fillColor : color,
     fillOpacity: 0.5,
     pointPadding : 0.01,
     marker : {
       radius: 6,
       symbol : 'circle'
     },
     dataLabels : {
       enabled : false,
       format : '{point.percent}',
       color : 'black',
       style : {
         textShadow : 'none'
       }
     },
     states : {
       hover : {
         enabled : true,
         borderColor : 'yellow'
       }
     }
   }
 }

}

export default WithStackedColumn
