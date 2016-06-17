
import {ChartType} from '../constants/Type';
import Chart from '../constants/Chart';
import ChartConfig from '../constants/ChartConfig';

import { fnCreateStackedConfig  } from './StackedFn'

import {
  fnCreateZhConfig,
  fnCreateDatasetInfo,
  fnCreateValueMoving,
  fnCreatePercent,
  fnSetTitleToConfig
} from './QuandlFn';


export const fCreateStackedAreaConfig = function(json, option){
  const config = ChartConfig.fBaseStackAreaConfig()
      , {sliceItems:items100=[], value=''} = option
      , zhSeriaId = `${value}_${ChartType.STACKED_AREA}`
      , jsonData = (json.dataset && json.dataset.data) ? json.dataset.data : []
      , chartType = ChartType.STACKED_AREA
      , { bNowTotal, bPrevTotal, series, categories }
             = fnCreateStackedConfig({ jsonData, items100, zhSeriaId, chartType })

  config.series = series;
  config.xAxis.categories = categories;
  config.chart.height = Chart.STACKED_HEIGHT;

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
