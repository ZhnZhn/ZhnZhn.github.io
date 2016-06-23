
import {ChartType} from '../constants/Type';
import Chart from '../constants/Chart';
import ChartConfig from '../constants/ChartConfig';

import { fnCreateStackedConfig  } from './StackedFn'

import {
  fnCreateZhConfig,
  fnCreateDatasetInfo,
  fnCreateValueMoving,  
  fnSetTitleToConfig
} from './QuandlFn';


export const fCreateStackedAreaConfig = function(json, option){
  const { seriaType:chartType } = option
      , stacking = (chartType === ChartType.STACKED_AREA_PERCENT) ? 'percent' : 'normal'
      , PERCENT = ( stacking === 'percent' ) ? ':PERCENT' : ''
      , config = ChartConfig.fBaseStackAreaConfig({ stacking })
      , {sliceItems:items100=[], value=''} = option
      , zhSeriaId = `${value}_${chartType}`
      , jsonData = (json.dataset && json.dataset.data) ? json.dataset.data : []
      , { bNowTotal, bPrevTotal, series, categories }
             = fnCreateStackedConfig({ jsonData, items100, zhSeriaId, chartType, stacking })

  config.series = series;
  config.xAxis.categories = categories;
  config.chart.height = Chart.STACKED_HEIGHT;

  option.title = `${option.title}${PERCENT}`
  fnSetTitleToConfig(config, option);

  config.valueMoving = fnCreateValueMoving({
    bNowValue  : bNowTotal,
    bPrevValue : bPrevTotal
  });

  config.zhConfig = fnCreateZhConfig(option);
  config.zhConfig.id = zhSeriaId;
  config.zhConfig.isWithoutAdd = true;
  config.zhConfig.isWithoutIndicator = true;
  config.info = fnCreateDatasetInfo(json);

  return {config}
}
