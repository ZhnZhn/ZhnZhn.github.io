

import Chart from './Chart';
import Tooltip from './Tooltip';

const WithStackAreaChart = {
   fBaseStackAreaConfig({ stacking='normal' }){
     return {
       zhSeries : {
         count : 0
       },
       zhDetailCharts : []  ,

       credits : Chart.fCreditsRightBottom(),
       chart: {
         type: 'area',
         spacingTop: Chart.STACKED_SPACING_TOP,
         spacingBottom: Chart.SPACING_BOTTOM,

         zoomType : 'xy',
         resetZoomButton : Chart.fResetZoomButton()
       },
       title : Chart.fTitle({ y:Chart.STACKED_TITLE_Y }),
       subtitle : Chart.fSubtitle({ y:Chart.STACKED_SUBTITLE_Y }),
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
            area: Chart.fPlotOptionsArea({ stacking })
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
