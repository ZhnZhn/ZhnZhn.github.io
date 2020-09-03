import formatAllNumber from '../../utils/formatAllNumber';
import ChartConfig from '../../charts/ChartConfig';

import { fnCreateStackedConfig } from './StackedFn';
import QuandlFn2 from './QuandlFn2';

const _assign = Object.assign
, {
    crStackedAreaConfig,
    crStackedColumnConfig
  } = ChartConfig
, {
  setTitleToConfig,
  createZhConfig,
  createValueMoving,
  createDatasetInfo
} = QuandlFn2

const _setCaption = (config, option, stacking) => {
  const PERCENT = stacking === 'percent'
     ? ':PERCENT' : ''
  option.title = `${option.title}${PERCENT}`
  setTitleToConfig(config, option);
}

const fnStacked = {
  crZhConfig: (option, id) => _assign(
    createZhConfig(option), {
       id, isWithoutIndicator: true
    }
  ),
  crValueMoving: (bNowTotal, date, bPrevTotal, dateTo) => _assign(
    createValueMoving({
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
        info: createDatasetInfo(json)
    };
  },

  crConfig: ({ type, percentType, json, option}) => {
    const jsonData = json.dataset.data
    , { sliceItems:items100=[], seriaType:chartType } = option
    , stacking = chartType === percentType
        ? 'percent' : 'normal'
    , stackedOption = fnCreateStackedConfig({ jsonData, items100, chartType, stacking })
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
