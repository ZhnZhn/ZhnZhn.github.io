import Chart from './Chart';
import { tooltipSparkTreeMap } from './Tooltip';

const WithTreeMapConfig = {
   crTreeMapConfig: () => ({
       credits: Chart.fCreditsRightBottom(),
       chart: {
         type: 'treemap',
         spacingTop: 25,
         marginTop: 50,
         marginRight: 5,
         height: 500
       },
       title: Chart.fTitle(),
       subtitle: Chart.fSubtitle(),
       tooltip: Chart.fTooltip(tooltipSparkTreeMap),
       zhSeries: { count: 0 },
       zhDetailCharts: [],
   }),

   crTreeMapSeria: (data) => ({
       type: 'treemap',
       layoutAlgorithm: 'squarified',
       //layoutAlgorithm : 'sliceAndDice',
       borderColor: 'gray',
       dataLabels: {
         align: 'left',
         verticalAlign: 'top',
         style: {
           fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
           fontSize: '14px',
           fontWeight: 'bold',
           color: 'black',
           textShadow: 'none'
         }
       },
       data: data,
       states: {
         hover: {
           borderColor: 'yellow',
           brightness: 0
         }
       }
   })

}

export default WithTreeMapConfig
