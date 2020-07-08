import Builder from '../../charts/ConfigBuilder';

import fnAdapter from './fnAdapter';

const {
  crTitle,
  crData,
  crConfigOption
} = fnAdapter;

const EiaAdapter = {
  toConfig(json, option){
    const {
      seriaType,
      seriaColor,
      seriaWidth
    } = option
    , { title, subtitle } = crTitle(option)
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
      adapter: EiaAdapter,
      json, option
    });
  }
};

export default EiaAdapter
