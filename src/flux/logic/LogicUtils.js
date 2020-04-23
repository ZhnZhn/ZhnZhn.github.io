
import { ChartType as CHT, LoadType as LT } from '../../constants/Type';

import LoadConfig from './LoadConfig'

const _isFn = fn => typeof fn === 'function';

const _crQuandlKey = function(option){
  const {
          loadId, isLoadMeta,
          value, dataColumn, seriaType,
          viewKey
        } = option;
  return (loadId === LT.QCT && !isLoadMeta)
    ? seriaType === CHT.AREA
        ? `${value}_${CHT.AREA}_${dataColumn}`
        : `${value}_${seriaType}`
    : viewKey || value;
};

const _crEurostatKey = function(option){
  const {
          geo='', group='', metric='',
          seriaType='AREA', time='',
         } = option
      , _metric = metric.replace('?', '_');
  return `${geo}_${group}_${_metric}_${seriaType}_${time}`;
};

const _crKey = (option) => {
  const { loadId, value, _itemKey } = option
      , loadConfig = LoadConfig[loadId] || {}
      , { crKey } = loadConfig;
  return _isFn(crKey)
    ? crKey(option)
    : _itemKey || value || 'key';
};

const LogicUtils = {
  createKeyForConfig(option){
    const { loadId, _itemKey } = option;
    switch (loadId) {
      case LT.Q: case LT.QCT:
        return _itemKey || _crQuandlKey(option);
      case LT.EU_STAT: case LT.EIA:
         return _itemKey || _crEurostatKey(option);
      case LT.WL:
         return _itemKey || option.id;
      default:
        return _crKey(option);
    }
  }
};

export default LogicUtils
