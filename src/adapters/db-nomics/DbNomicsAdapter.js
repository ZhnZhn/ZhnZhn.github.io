import Builder from '../../charts/ConfigBuilder';

import fnAdapter from './fnAdapter';

const {
  crData,
  crTitle,
  crConfigOption
} = fnAdapter;

const DbNomicsAdapter = {
  toConfig(json, option){
    const {
      seriaColor
    } = option
    , { title, subtitle } = crTitle(option, json)
    , data = crData(json)
    , seria = Builder()
        .splineSeria({
          color: seriaColor,
          data
        })
        .toSeria()
    , config = Builder()
       .area2Config(title, subtitle)
       .addSeries(seria)
       .addMinMax(data, option)       
       .add({
        ...crConfigOption({ json, option, data })
       })
       .toConfig();

    if (data.length > 1000) {
      config.plotOptions = Object.assign(
        config.plotOptions || {}, {
          series: {
            turboThreshold: 0
          }
        }
      )
    }
    return { config };
  },

  toSeries(json, option){
    const { config } = DbNomicsAdapter.toConfig(json, option);
    return config.series[0];
  }
}

export default DbNomicsAdapter
