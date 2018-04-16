
import { ChartType, LoadType } from '../../constants/Type';

import LoadConfig from './LoadConfig'

const _fnCreateQuandlKey = function(option){
  const {
          loadId, isLoadMeta,
          value, dataColumn, seriaType,
          viewKey
        } = option;
  return (loadId === LoadType.QCT && !isLoadMeta)
          ? (seriaType === ChartType.AREA)
                ? `${value}_${ChartType.AREA}_${dataColumn}`
                : `${value}_${seriaType}`
          : (viewKey)
              ? viewKey
              : value;
}

const _fnCreateEuroStatKey = function(option){
  const {
          geo='', group='', metric='',
          seriaType='AREA', time=''
         } = option
      , _metric = metric.replace('?', '_');
  return `${geo}_${group}_${_metric}_${seriaType}_${time}`;
}

const _crKey = (option) => {
  const { loadId, value } = option
      , loadConfig = LoadConfig[loadId] || {}
      , { crKey } = loadConfig;
  if (typeof crKey === 'function') {
    return crKey(option);
  }
  return value || 'key';
};

const LogicUtils = {

  createKeyForConfig(option){
    const { loadId } = option;
    switch (loadId) {
      case LoadType.Q: case LoadType.QCT:
        return _fnCreateQuandlKey(option);
      case LoadType.EU_STAT:
         return _fnCreateEuroStatKey(option);
      case LoadType.WL:
         return option.id;
      default:
        return _crKey(option);
    }
  }
}

export default LogicUtils
