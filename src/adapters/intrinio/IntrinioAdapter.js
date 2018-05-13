import Builder from '../../charts/ConfigBuilder'
import fnAdapter from './fnAdapter'

const {
  crSubtitle, crData, crConfigOption
} = fnAdapter;

const IntrinioAdapter = {
  toConfig(json, option){
    const data = crData(json, option)
        , seria = Builder()
            .initSpline({ data })
            .toConfig()
        , _subtitle = crSubtitle(option)
        , { title } = option
        , config = Builder()
            .initBaseArea2(title, _subtitle)
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
