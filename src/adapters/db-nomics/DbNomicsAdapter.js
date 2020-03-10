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
      seriaColor,
      seriaType='spline'
    } = option
    , { title, subtitle } = crTitle(option, json)
    , data = crData(json)
    , seria = Builder()
        .splineSeria({
          color: seriaColor,
          type: seriaType.toLowerCase(),
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

    return { config };
  },

  toSeries(json, option){
    const { config } = DbNomicsAdapter.toConfig(json, option);
    return config.series[0];
  }
}

export default DbNomicsAdapter
