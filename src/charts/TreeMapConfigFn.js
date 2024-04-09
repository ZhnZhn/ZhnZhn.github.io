import { getColorBlack } from './ChartFn';

import {
  fTitle,
  fSubtitle,
  fTooltip,
  fCreditsRightBottom
} from './Chart';
import { tooltipSparkTreeMap } from './Tooltip';

export const CONFIG_TREE_MAP = {
  //data : data,
  type: 'treemap',
  layoutAlgorithm: 'squarified',
  //layoutAlgorithm : 'sliceAndDice',
  borderColor: 'grey',
  dataLabels: {
    align: 'left',
    verticalAlign: 'top',
    style: {      
      fontSize: '15px',
      fontWeight: 'bold',
      color: getColorBlack(),
      textShadow: 'none'
    }
  },
  states: {
    hover: {
      borderColor: 'yellow',
      brightness: 0
    }
  }
}

export const crTreeMapConfig = () => ({
  credits: fCreditsRightBottom(),
  chart: {
    type: 'treemap',
    spacingTop: 25,
    marginTop: 50,
    marginRight: 5,
    height: 500
  },
  title: fTitle(),
  subtitle: fSubtitle(),
  tooltip: fTooltip(tooltipSparkTreeMap),
  zhSeries: { count: 0 },
  zhDetailCharts: []
})

export const crTreeMapSeria = (
  data
) => ({
  ...CONFIG_TREE_MAP,
  data
})
