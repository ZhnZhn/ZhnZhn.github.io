import {
  SEMIDONUT_TITLE_Y,
  SEMIDONUT_SUBTITLE_Y,
  fTitle,
  fSubtitle,
  fTooltip,
  fNavigation,
  fCreditsRightBottom,
  fLegend
} from './Chart';
import { tooltipDonut } from './Tooltip';

export const crPieConfig = () => ({
  zhSeries: {
    count: 0
  },
  zhDetailCharts: [],

  credits: fCreditsRightBottom(),
  title: fTitle({ y: SEMIDONUT_TITLE_Y }),
  subtitle: fSubtitle({ y: SEMIDONUT_SUBTITLE_Y }),
  legend: fLegend(),
  navigation: fNavigation()
})

export const crInnerPieSeria = ({
  center,
  year,
  bTotal
}) => ({
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
 })

 export const crOuterPieSeria = ({
   center,
   data,
   isShowInLegend=false
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
     enabled: false,
     distance: -5
   },

   tooltip: fTooltip(tooltipDonut)
 })
