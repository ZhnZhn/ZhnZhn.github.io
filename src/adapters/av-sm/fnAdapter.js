export {
  assign,
  isArr,
  isInArrStr,
  isTokenInStr,
  crDfItemKey,
  crGetRoute,
  getValue,
  getCaption,
  getValueCaption,
  toUpperCaseFirst,
  valueMoving,
  ymdToUTC,
  ymdhmsToUTC,
  roundBy,
  crError
} from '../AdapterFn';
export { fCrData } from '../av/AvFn';

import { valueMoving } from '../AdapterFn';
import {
  crItemConf,
  crValueConf
} from '../crFn';
import { stockSeriesLegend } from '../legendFn';

export const DF_FN_EOD = "EOD"

const _crItemConf = (
  { data },
  option
) => {
  const {
    _itemKey,
    dfFn,
    dfSubId,
    items,
    dataSource
  } = option;
  return dfFn === DF_FN_EOD
    ? {
        _itemKey,
        ...crItemConf(option),
        ...crValueConf(data),
        items: [...(items || [])],
        dfFn,
        dfSubId,
        dataSource
     }
    : void 0;
};

const _crZhConfig = (
  config,
  option
) => {
  const {
    _itemKey,
    itemCaption
  } = option
  , {
    id,
    dataSource
  } = config
  , _id = _itemKey || id
  , itemConf = _crItemConf(config, option);
  return {
    id: _id,
    key: _id,
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
