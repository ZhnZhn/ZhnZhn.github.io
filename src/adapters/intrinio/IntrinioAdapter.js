import Builder from '../../charts/ConfigBuilder'
import { fnAddSeriesSma, fnRemoveSeries } from '../IndicatorSma'
import fnAdapter from './fnAdapter'

const {
        crData,
        crZhConfig, crValueMoving, crInfo
      } = fnAdapter;

const IntrinioAdapter = {
  toConfig(json, option){
    const data = crData(json, option)
        , seria = Builder()
            .initSpline({ data })
            .toConfig()
        , { title, subtitle } = option
        , config = Builder()
            .initBaseArea()
            .add('chart', { spacingTop: 25 })
            .addCaption(title, subtitle)
            .clearSeries()
            .addSeries(seria)
            .add({
              zhConfig: crZhConfig(option),
              valueMoving: crValueMoving(data),
              info: crInfo(option),
              zhFnAddSeriesSma: fnAddSeriesSma,
              zhFnRemoveSeries: fnRemoveSeries
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
