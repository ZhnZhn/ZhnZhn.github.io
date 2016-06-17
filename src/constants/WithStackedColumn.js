
import Chart from './Chart';
import Tooltip from './Tooltip';


const WithStackedColumn = {

  fBaseStackedColumnConfig(){
    return {
      zhSeries : {
        count : 0
      },
      zhDetailCharts : []  ,

      credits : Chart.fCreditsRightBottom(),
      chart: {
        type: 'column',
        spacingTop: Chart.SPACING_TOP,
        spacingBottom: Chart.SPACING_BOTTOM,

        zoomType : 'xy',
        resetZoomButton : Chart.fResetZoomButton()
      },

      title : Chart.fTitle({y:40}),
      subtitle : Chart.fSubtitle({y:60}),
      tooltip : Chart.fTooltip(Tooltip.fnStackedAreaPointFormatter),

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

      yAxis: Chart.fYAxisOpposite(),

      plotOptions: {
           column: Chart.fPlotOptionsColumn({stacking : 'normal'})
     },
     legend : Chart.fLegend()
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
