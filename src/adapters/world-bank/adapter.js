import Builder from '../../charts/ConfigBuilder'
import fnAdapter from './fnAdapter'

const { crId, crData, crConfigOptions } = fnAdapter;

const adapter = {
  crKey: crId,

  toConfig(json, option){
    const {
      title, subtitle
    } = option
    , data = crData(json[1])
    , seria = Builder()
       .splineSeria({ data })
       .toSeria()
    , config = Builder()
       .areaConfig({ spacingTop: 25 })
       .addCaption(title, subtitle)
       .addSeries(seria)
       .addMinMax(data, option)
       .add({
          ...crConfigOptions(option, data)
       })
       .toConfig();

    return { config };
  },

  toSeries(json, option){
    const { config } = adapter.toConfig(json, option);
    return config.series[0];
  }
}

export default adapter
