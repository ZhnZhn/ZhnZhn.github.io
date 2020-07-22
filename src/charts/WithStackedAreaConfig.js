import Chart from './Chart';
import Tooltip from './Tooltip';

const WithStackAreaConfig = {
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
       tooltip : Chart.fTooltip(Tooltip.sparkStackedArea),

       xAxis: Chart.fXAxisOpposite({
         categories: [],
         type: "category",
         startOnTick: false,
         min: 1,
         crosshair: Chart.fCrosshair()
       }),
       yAxis: Chart.fYAxisOpposite(),

       plotOptions: {
          area: Chart.fPlotOptionsArea({ stacking }),
          series: Chart.fPlotOptionsSeries()
      },
      legend: Chart.fLegend()
    }
  },

  fStackAreaSeria({name, data=[], color='gray'}){
    return {
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

export default WithStackAreaConfig
