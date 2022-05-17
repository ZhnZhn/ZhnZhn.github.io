import formatAllNumber from '../../utils/formatAllNumber';
import ChartConfig from '../../charts/ChartConfig';

import { crStackedConfig } from './StackedFn';
import {
  setTitleToConfig,
  crZhConfig,
  crValueMoving,
  crDatasetInfo
} from './QuandlFn';

const _assign = Object.assign
, {
  crStackedAreaConfig,
  crStackedColumnConfig
} = ChartConfig;


const _setCaption = (
  config,
  option,
  stacking
) => {
  const PERCENT = stacking === 'percent'
     ? ':PERCENT' : ''
  option.title = `${option.title}${PERCENT}`
  setTitleToConfig(config, option);
}

const fnStacked = {
  crZhConfig: (option, id) => _assign(
    crZhConfig(option), {
       id, isWithoutIndicator: true
    }
  ),
  crValueMoving: (bNowTotal, date, bPrevTotal, dateTo) => _assign(
    crValueMoving({
      bNowValue: bNowTotal,
      bPrevValue: bPrevTotal
    }),{
      date: date,
      dateTo: dateTo.split('-')[0],
      valueTo: formatAllNumber(bPrevTotal),
      isDenyToChange: true
    }
  ),

  crConfigOption: (
    { bNowTotal, date, bPrevTotal, dateTo, series },
    json, option) => {
      const { value='', seriaType } = option
      , id = `${value}_${seriaType}`;
      return {
        series: series,
        valueMoving: fnStacked.crValueMoving(bNowTotal, date, bPrevTotal, dateTo),
        zhConfig: fnStacked.crZhConfig(option, id),
        info: crDatasetInfo(json)
    };
  },

  crConfig: ({ type, percentType, json, option}) => {
    const jsonData = json.dataset.data
    , { sliceItems:items100=[], seriaType:chartType } = option
    , stacking = chartType === percentType
        ? 'percent' : 'normal'
    , stackedOption = crStackedConfig({ jsonData, items100, chartType, stacking })
    , crConfig = type === 'column'
         ? crStackedColumnConfig
         : crStackedAreaConfig
    , config = crConfig({
         categories: stackedOption.categories,
         stacking
     });

    _setCaption(config, option, stacking)
    _assign(config, fnStacked.crConfigOption(stackedOption, json, option))
    return { config };
  }
}

export default fnStacked
