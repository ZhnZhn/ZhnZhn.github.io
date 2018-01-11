import Builder from '../../charts/ConfigBuilder'
import { fnAddSeriesSma, fnRemoveSeries } from '../IndicatorSma'
import fnAdapter from './fnAdapter'

const {
       crUTC,
       crZhConfig, crValueMoving, crInfo
     } = fnAdapter;

const _crData = (Results, option) => {
  const { dfFilterName, two } = option
      , d = []
      , isFilter = dfFilterName ? true : false;

  Results.Data.forEach(item => {
    const v = parseFloat(item.DataValue)
        , y = !Number.isNaN(v) ? v : null;
    if ( !(isFilter && item[dfFilterName] !== two) ) {
      d.push({
        x: crUTC(item),
        y: y
      })
    }
  })

  return d;
}

const BeaAdapter = {
  toConfig(json, option){
    const Results = json.BEAAPI.Results
        , data = _crData(Results, option)
        , seria = Builder()
            .initSpline({ data })
            .toConfig()
        , { title, dfTitle } = option
        , config = Builder()
           .initBaseArea()
           .add('chart', { spacingTop: 25 })
           .addCaption(dfTitle, title)
           .clearSeries()
           .addSeries(seria)
           .add({
             zhConfig: crZhConfig(option),
             valueMoving: crValueMoving(data),
             info: crInfo(Results),
             zhFnAddSeriesSma: fnAddSeriesSma,
             zhFnRemoveSeries: fnRemoveSeries
           })
           .toConfig();

    return { config };
  },

  toSeries(json, option){
     const { config } = BeaAdapter.toConfig(json, option);
     return config.series[0];
  }

}

export default BeaAdapter
