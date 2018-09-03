import Builder from '../../charts/ConfigBuilder';

import fnAdapter from './fnAdapter';

const {
  crData,
  findMaxY,
  findMinY,
  crConfigOption
} = fnAdapter;

const EiaAdapter = {
  toConfig(json, option){
    const {
      oneCaption='',
      twoCaption='',
      dfTitle
    } = option
    , data = crData(json)
    , seria = Builder()
        .splineSeria({ data })
        .toSeria()
    , config = Builder()
       .area2Config(
         dfTitle,
         `${oneCaption}: ${twoCaption}`
       )
       .addSeries(seria)
       .setMinMax(
         findMinY(data),
         findMaxY(data)
       )
       .add({
        ...crConfigOption({ json, option, data })
       })
       .toConfig();

    return { config };
  },

  toSeries(json, option){
    const { config } = EiaAdapter.toConfig(json, option);
    return config.series[0];
  }
};

export default EiaAdapter
