export {
  _isNaN,
  getValue,
  getCaption,
  joinBy,
  valueMoving,
  ymdToUTC,
  ymdhmsToUTC,
  roundBy
} from '../AdapterFn';
export { compareByDate } from '../compareByFn';
export { crError } from '../crFn';

import { valueMoving } from '../AdapterFn';
import {
  crItemConf,
  crValueConf
} from '../crFn';
import { stockSeriesLegend } from '../legendFn';

const _crItemConf = (
  { data },
  option
) => {
  const {
    _itemKey,
    dfFn, dfSubId,
    items,
    dataSource
  } = option;
  return dfFn === 'TIME_SERIES_DAILY'
     ? {
          _itemKey,
          ...crItemConf(option),
          ...crValueConf(data),
          items: [...(items || [])],
          dfSubId, dfFn,
          dataSource
       }
    : void 0;
};

const _crZhConfig = (config, option) => {
  const { _itemKey, itemCaption } = option
  , { id, dataSource } = config
  , _id = _itemKey || id
  , itemConf = _crItemConf(config, option);
  return {
    id: _id, key: _id,
    itemCaption,
    itemConf,
    legend: stockSeriesLegend(),
    dataSource: dataSource || "Alpha Vantage"
  }
};

export const crIntradayConfigOption = (
  config,
  option
) => ({
  zhConfig: _crZhConfig(config, option),
  valueMoving: valueMoving(config.data)
})
