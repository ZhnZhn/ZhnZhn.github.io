import {
  LT_Q,
  LT_QCT,
  LT_EU_STAT,
  LT_EIA,
  LT_WL
} from '../../constants/LoadType';
import { CHT_AREA } from '../../constants/ChartType';

import LoadConfig from './LoadConfig'

const _isFn = fn => typeof fn === 'function';

const _crQuandlKey = function(option){
  const {
          loadId, isLoadMeta,
          value, dataColumn, seriaType,
          viewKey
        } = option;
  return (loadId === LT_QCT && !isLoadMeta)
    ? seriaType === CHT_AREA
        ? `${value}_${CHT_AREA}_${dataColumn}`
        : `${value}_${seriaType}`
    : viewKey || value;
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
      case LT_Q: case LT_QCT:
        return _itemKey || _crQuandlKey(option);
      case LT_EU_STAT: case LT_EIA: case LT_WL:
        return _itemKey || option.id;
      default:
        return _crKey(option);
    }
  }
};

export default LogicUtils
