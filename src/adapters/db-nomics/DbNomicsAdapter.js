import Builder from '../../charts/ConfigBuilder';

import fnAdapter from './fnAdapter';

const {
  crData,
  crTitle,
  crConfigOption,
  crSeria
} = fnAdapter;

const DbNomicsAdapter = {
  toConfig(json, option){
    const {
      fromDate,
      seriaType,
      seriaColor,
      seriaWidth
    } = option
    , { title, subtitle } = crTitle(option, json)
    , data = crData(json, fromDate)
    , seria = Builder()
        .splineSeria({
           seriaType,
           seriaColor,
           seriaWidth,
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
    return crSeria({
      adapter: DbNomicsAdapter,
      json, option
    });
  }
}

export default DbNomicsAdapter
