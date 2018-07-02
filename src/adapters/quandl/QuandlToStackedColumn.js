
import {ChartType} from '../../constants/Type';
import Chart from '../../charts/Chart';
import ChartConfig from '../../charts/ChartConfig';

import {
  fnCreateStackedConfig,
  crValueMoving,
  crZhConfig
} from './StackedFn';
import QuandlFn2 from './QuandlFn2';

export const fCreateStackedColumnConfig = function(json, option){
   const { seriaType:chartType } = option
       , stacking = (chartType === ChartType.STACKED_COLUMN_PERCENT) ? 'percent' : 'normal'
       , PERCENT = ( stacking === 'percent' ) ? ':PERCENT' : ''
       , config = ChartConfig.fBaseStackedColumnConfig({ stacking })
       , {sliceItems:items100=[], value=''} = option
       , zhSeriaId = `${value}_${chartType}`
       , jsonData = (json.dataset && json.dataset.data) ? json.dataset.data : []
       , {bNowTotal, date, bPrevTotal, dateTo, series, categories} =
            fnCreateStackedConfig({jsonData, items100, zhSeriaId, chartType, stacking })

   config.series = series;
   config.xAxis.categories = categories;
   config.chart.height = Chart.STACKED_HEIGHT;

   option.title = `${option.title}${PERCENT}`
   QuandlFn2.setTitleToConfig(config, option);

   config.valueMoving = crValueMoving(bNowTotal, date, bPrevTotal, dateTo)
   config.zhConfig = crZhConfig(option, zhSeriaId)

   config.info = QuandlFn2.createDatasetInfo(json);

   return {config}
}
