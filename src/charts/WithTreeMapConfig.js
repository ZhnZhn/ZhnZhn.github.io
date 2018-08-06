import Chart from './Chart';
import Tooltip from './Tooltip';

const WithTreeMapConfig = {
   fBaseTreeMapConfig(){
     return {

       zhSeries : {
         count : 0
       },
       zhDetailCharts : [],

       credits : Chart.fCreditsRightBottom(),
       chart: {
         type: 'treemap',
         marginTop : Chart.TREEMAP_MARGIN_TOP
       },
       title : Chart.fTitle({ y:Chart.TREEMAP_TITLE_Y }),
       subtitle : Chart.fSubtitle({ y:Chart.TREEMAP_SUBTITLE_Y }),
       tooltip: Chart.fTooltip(Tooltip.sparkTreeMap),
       navigation : Chart.fNavigation()
     }
   },

   fCreateTreeMapSeria(zhSeriaId, data){
     return {
         zhSeriaId : zhSeriaId,
         type : 'treemap',
         layoutAlgorithm: 'squarified',
         //layoutAlgorithm : 'sliceAndDice',
         borderColor : 'gray',
         dataLabels : {
           align : 'left',
           verticalAlign : 'top',
           style : {
             fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
             fontSize: '14px',
             fontWeight: 'bold',
             color : 'black',
             textShadow: 'none'
           }
         },
         data : data,
         states : {
           hover : {
             borderColor : 'yellow',
             brightness: 0
           }
         }
       }
   }

}

export default WithTreeMapConfig
