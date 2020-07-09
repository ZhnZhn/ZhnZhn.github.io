
import Builder from '../../charts/ConfigBuilder';


import fnAdapter from './fnAdapter'

const {
  crData,
  crConfigOption
} = fnAdapter

const OnsAdapter = {
  toConfig(json, option){
    const {
      title, subtitle,
      seriaType,
      seriaColor,
      seriaWidth
    } = option
    , data = crData(json)
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
    return Builder.crSeria({
      adapter: OnsAdapter,
      json, option
    });
  }
}

export default OnsAdapter
