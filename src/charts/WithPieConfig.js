import Chart from './Chart';
import { tooltipDonut } from './Tooltip';

const WithPieConfig = {

 crPieConfig: () => ({
    zhSeries: {
       count: 0
    },
    zhDetailCharts: [],

    credits: Chart.fCreditsRightBottom(),
    title: Chart.fTitle({ y:Chart.SEMIDONUT_TITLE_Y }),
    subtitle: Chart.fSubtitle({ y:Chart.SEMIDONUT_SUBTITLE_Y }),
    legend: Chart.fLegend(),
    navigation: Chart.fNavigation()
}),

crInnerPieSeria: ({center, year, bTotal}) => ({
    type: 'pie',
    borderColor: 'transparent',
    colors: ['transparent'],
    center: center,
    //size : '60%',
    size: 250*0.6,
    startAngle: -90,
    endAngle: 90,
    data: [{
     name: `<span style="color:#a487d4;">${year}</span><br/>${bTotal.toString()}`,
     y: 1
    }],
    dataLabels: {
      enabled: true,
      distance: -70,
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: 'black',
        textShadow: 'none;'
      }
   }
 }),

 crOuterPieSeria: ({
   center, data,
   isDataLabels=false, isShowInLegend=false
 })=> ({
   type: 'pie',
   colorByPoint: true,
   allowPointSelect: true,
   borderColor: null,
   center: center,

   //size: '100%',
   size: 250,
   //innerSize: '60%',
   innerSize: 250*0.6,
   startAngle: -90,
   endAngle: 90,
   showInLegend: isShowInLegend,
   data: data,
   dataLabels: {
     enabled: isDataLabels,
     distance: -5
   },

   tooltip: Chart.fTooltip(tooltipDonut)
 })
}

export default WithPieConfig
