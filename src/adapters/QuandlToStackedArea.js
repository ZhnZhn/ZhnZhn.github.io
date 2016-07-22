
import {ChartType} from '../constants/Type';
import Chart from '../charts/Chart';
import ChartConfig from '../charts/ChartConfig';

import { fnCreateStackedConfig  } from './StackedFn';

import QuandlFn2 from './QuandlFn2';

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
  QuandlFn2.setTitleToConfig(config, option);

  config.valueMoving = QuandlFn2.createValueMoving({
    bNowValue  : bNowTotal,
    bPrevValue : bPrevTotal
  });
  config.valueMoving.date = ( categories && categories.length>1 )
     ? categories[categories.length-1]
     : '' ;

  config.zhConfig = QuandlFn2.createZhConfig(option);
  config.zhConfig.id = zhSeriaId;
  config.zhConfig.isWithoutAdd = true;
  config.zhConfig.isWithoutIndicator = true;
  config.info = QuandlFn2.createDatasetInfo(json);

  return {config}
}
