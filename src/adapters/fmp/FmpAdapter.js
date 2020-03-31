import Builder from '../../charts/ConfigBuilder';

import fnAdapter from './fnAdapter'

const {
  crCaption,
  crSeriaType,
  crData,
  crConfigOption
} = fnAdapter;

const FmpAdapter = {
  toConfig(json, option){
    const {
      dfPn,
      _propName,
      seriaType,
      seriaColor
    } = option
    , { title, subtitle } = crCaption(option)
    , data = crData(json[dfPn], _propName)
    , seria = Builder()
        .splineSeria({
          type: crSeriaType(seriaType),
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

    return { config };
  },

  toSeries(json, option){
    const { config } = FmpAdapter.toConfig(json, option);
    return config.series[0];
  }
};

export default FmpAdapter
