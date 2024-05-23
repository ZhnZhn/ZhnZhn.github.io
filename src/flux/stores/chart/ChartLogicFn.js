
import getSlice from './getSlice'

const _notConfById = id => c => c.zhConfig.id !== id;
const _confById = id => c => c.zhConfig.id === id;

export const isChartExist = (
  slice,
  chartType,
  key
) => {
  const {
    chartSlice,
    configs
  } = getSlice(slice, chartType);
  if (!chartSlice){
    return false;
  }
  const _max = configs.length;
  let i = 0;
  for (; i<_max; i++){
    if (configs[i].zhConfig.key === key){
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
  const {
    chartSlice,
    configs
  } = getSlice(slice, chartType);

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
  const {
    chartSlice,
    configs
  } = getSlice(slice, chartType)
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

export const updateMovingValues = (
  slice,
  chartType,
  movingValues
) => {
  const {
    configs
  } = getSlice(slice, chartType)
  , _maxConfigs = configs.length;
  if (_maxConfigs === movingValues.length) {
    movingValues.forEach(mv => {
      const _config = configs.find(_confById(mv._id))
      if (_config) {
        _config.valueMoving = mv
      }
    });    
  }
}
