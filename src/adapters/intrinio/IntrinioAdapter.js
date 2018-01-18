import Builder from '../../charts/ConfigBuilder'
import fnAdapter from './fnAdapter'

const { crData, crConfigOption } = fnAdapter;

const IntrinioAdapter = {
  toConfig(json, option){
    const data = crData(json, option)
        , seria = Builder()
            .initSpline({ data })
            .toConfig()
        , { title, subtitle } = option
        , config = Builder()
            .initBaseArea2(title, subtitle)
            .addSeries(seria)
            .add({
              ...crConfigOption({ option, data })
             })
            .toConfig();

    return { config };
  },

  toSeries(json, option){
    const { config } = IntrinioAdapter.toConfig(json, option);
    return config.series[0];
  }
}

export default IntrinioAdapter
