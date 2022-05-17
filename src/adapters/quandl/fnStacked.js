import formatAllNumber from '../../utils/formatAllNumber';
import ChartConfig from '../../charts/ChartConfig';

import { crStackedConfig } from './StackedFn';
import {
  setTitleToConfig,
  crZhConfig as _crZhConfig,
  crValueMoving as _crValueMoving,
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

export const crZhConfig = (
  option,
  id
 ) => _assign(
    _crZhConfig(option), {
       id, isWithoutIndicator: true
    }
  )

export const crValueMoving = (
  bNowTotal,
  date,
  bPrevTotal,
  dateTo
) => _assign(
    _crValueMoving({
      bNowValue: bNowTotal,
      bPrevValue: bPrevTotal
    }), {
      date,
      dateTo: dateTo.split('-')[0],
      valueTo: formatAllNumber(bPrevTotal),
      isDenyToChange: true
    }
  )

export const crConfigOption = ({
  bNowTotal,
  date,
  bPrevTotal,
  dateTo,
  series
 },
  json,
  option
) => {
   const { value='', seriaType } = option
   , id = `${value}_${seriaType}`;
   return {
     series,
     valueMoving: crValueMoving(bNowTotal, date, bPrevTotal, dateTo),
     zhConfig: crZhConfig(option, id),
     info: crDatasetInfo(json)
  };
}

export const crConfig = ({
  type,
  percentType,
  json,
  option
}) => {
  const jsonData = json.dataset.data
  , {
    sliceItems:items100=[],
    seriaType:chartType
  } = option
  , stacking = chartType === percentType
       ? 'percent' : 'normal'
  , stackedOption = crStackedConfig({
      jsonData,
      items100,
      chartType,
      stacking
    })
  , crConfig = type === 'column'
       ? crStackedColumnConfig
       : crStackedAreaConfig
  , config = crConfig({
       categories: stackedOption.categories,
       stacking
   });

  _setCaption(config, option, stacking)
  _assign(config, crConfigOption(stackedOption, json, option))
  return { config };
}
