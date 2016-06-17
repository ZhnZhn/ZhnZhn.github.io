

import Chart from './Chart';
import Tooltip from './Tooltip';

const WithStackAreaChart = {
   fBaseStackAreaConfig(){
     return {
       zhSeries : {
         count : 0
       },
       zhDetailCharts : []  ,

       credits : Chart.fCreditsRightBottom(),
       chart: {
         type: 'area',
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
            area: Chart.fPlotOptionsArea({ stacking: 'normal' })
      },
      legend : Chart.fLegend()
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
