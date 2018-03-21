import Builder from '../../charts/ConfigBuilder'
import fnAdapter from './fnAdapter'

const { crData, crConfigOptions } = fnAdapter;

const adapter = {
  toConfig(json, option){
    const { title, subtitle } = option
    , data = crData(json[1])
    , seria = Builder()
       .initSpline({ data })
       .toConfig()
    , config = Builder()
       .initBaseArea()
       .add('chart', { spacingTop: 25 })
       .addCaption(title, subtitle)
       .addSeries(seria)
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
