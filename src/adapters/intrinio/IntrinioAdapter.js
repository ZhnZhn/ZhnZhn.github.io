import Builder from '../../charts/ConfigBuilder'
import fnAdapter from './fnAdapter'

const {
  crSubtitle,
  crData,
  crConfigOption
} = fnAdapter;

const IntrinioAdapter = {
  toConfig(json, option){
    const data = crData(json, option)
        , seria = Builder()
            .splineSeria({ data })
            .toSeria()
        , _subtitle = crSubtitle(option)
        , { title } = option
        , config = Builder()
            .area2Config(title, _subtitle)
            .addSeries(seria)
            .add({
              ...crConfigOption({ option, data })
             })
            .toConfig();

    return { config };
  },

  toSeries(json, option){
    return Builder.crSeria({
      adapter: IntrinioAdapter,
      json, option
    });
  }
}

export default IntrinioAdapter
