import { getSubSliceOf } from './getSubSliceOf';

const _getConfigId = c => c.zhConfig.id;
const _notConfById = id => c => _getConfigId(c) !== id;
const _confById = id => c => _getConfigId(c) === id;
const _getConfigKey = c => c.zhConfig.key;

export const isChartExist = (
  slice,
  chartType,
  key
) => {
  const configs = getSubSliceOf(slice, chartType)[1];
  for (let config of configs){
    if (_getConfigKey(config) === key){
      return true;
    }
  }
  return false;
}

export const removeConfig = (
  slice,
  chartType,
  id
) => {
  const [
    chartSlice,
    configs
  ] = getSubSliceOf(slice, chartType);

  chartSlice.configs = configs
     .filter(_notConfById(id))

  return {
    chartSlice,
    isRemoved: configs.length > chartSlice.configs.length
  }
}

export const toTop = (
  slice,
  chartType,
  id
) => {
  const [
    chartSlice,
    configs
  ] = getSubSliceOf(slice, chartType)
  , _conf = configs.find(_confById(id));
  if (_conf) {
    const arrWithout = configs.filter(_notConfById(id));
    chartSlice.configs = [ _conf, ...arrWithout]
  }
  return chartSlice;
}

export const removeAll = (
  slice,
  chartType
) => {
   const _slice = slice[chartType] || {}
   _slice.configs = []
   return _slice;
}

const _isRequireUpdateMovingValues = (
  configs,
  movingValues
) => configs.length === movingValues.length;
export const updateMovingValues = (
  slice,
  chartType,
  movingValues
) => {
  const configs = getSubSliceOf(slice, chartType)[1];
  if (_isRequireUpdateMovingValues(configs, movingValues)) {
    const _hmConfigs = configs.reduce((hm, config) => {
      hm[_getConfigId(config)] = config;
      return hm;
    }, Object.create(null));

    movingValues.forEach(mv => {
      const _config = _hmConfigs[mv._id];
      if (_config) {
        _config.valueMoving = mv
      }
    });
  }
}
