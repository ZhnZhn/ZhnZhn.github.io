
import Factory from '../logic/Factory';

import fCompareBy from './fCompareBy'

const _get = {
  sliceConfigs(slice, chartType ){
    const chartSlice = slice[chartType]
       , { configs } = chartSlice || {};
    return { chartSlice, configs };
  }
};

const _crChartContainer = (chartType, option) => {
  const {
          browserType, conf
        } = option;
  return Factory.createChartContainer(
     chartType, browserType, conf
  );
}

const ChartLogic = {
  _initChartSlice(slice, chartType, config){
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

  loadConfig(slice, config, option){
    const { chartType } = option
        , {
            chartSlice, configs
          } = _get.sliceConfigs(slice, chartType);
    if (chartSlice){
      configs.unshift(config);
      chartSlice.isShow = true;
      return { chartSlice };
    } else {
      ChartLogic._initChartSlice(slice, chartType, config)
      return {
        Comp: _crChartContainer(chartType, option)
      };
    }
 },
 showChart(slice, chartType, browserType, conf){
   const { chartSlice } = _get.sliceConfigs(slice, chartType);
   if (chartSlice){
     chartSlice.isShow = true;
     return { chartSlice };
   } else {
     ChartLogic._initChartSlice(slice, chartType)
     return {
       Comp: _crChartContainer(chartType, { browserType, conf })
     };
   }
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
          } = _get.sliceConfigs(slice, chartType);
    if (by) {
      configs.sort(fCompareBy(by))
    } else {
      configs.reverse()
    }
    return chartSlice;
  }
};

export default ChartLogic
