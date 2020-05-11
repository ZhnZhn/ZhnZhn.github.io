import Builder from '../../charts/ConfigBuilder';

import fnAdapter from './fnAdapter'

const {
  crCaption,
  crData,
  crConfigOption,
  crSeria
} = fnAdapter;

const FmpAdapter = {
  toConfig(json, option){
    const {
      dfPn,
      _propName,
      seriaType,
      seriaColor,
      seriaWidth
    } = option
    , { title, subtitle } = crCaption(option)
    , data = crData(json[dfPn], _propName)
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
      adapter: FmpAdapter,
      json, option
    });
  }
};

export default FmpAdapter
