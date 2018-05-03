
import fCompareBy from './fCompareBy'

const _get = {
  sliceConfigs(slice, chartType ){
    const chartSlice = slice[chartType]
       , { configs } = chartSlice || {};
    return { chartSlice, configs };
  }
};

const ChartLogic = {
  initChartSlice(slice, chartType, config){
    const configs = config ? [ config ] : [];
    if (!slice[chartType]) {
      slice[chartType] = {
        chartType, configs,
        isShow: true
      }
    }
  },

  isChartExist(slice, chartType, key){
    const {
            chartSlice, configs
          } = _get.sliceConfigs(slice, chartType)
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
  },

  removeConfig(slice, chartType, id) {
    const {
            chartSlice, configs
          } = _get.sliceConfigs(slice, chartType)
        , _lenBefore = configs.length;
    chartSlice.configs = configs
      .filter(c => c.zhConfig.id !== id)
    return {
      chartSlice,
      isRemoved: _lenBefore > chartSlice.configs.length
    };
  },

  sortBy(slice, chartType, by){
    const {
            chartSlice, configs
          } = _get.sliceConfigs(slice, chartType)
    configs.sort(fCompareBy(by))
    return chartSlice;
  },
  reverseConfigs(slice, chartType){
    const {
            chartSlice, configs
          } = _get.sliceConfigs(slice, chartType)
    configs.reverse()
    return chartSlice;
  }
};

export default ChartLogic
