
import Builder from '../../charts/ConfigBuilder'

import fnAdapter from './fnAdapter'

const {
  crTitle,
  crChartId,
  crData,
  crConfigOption,  
  toSeriesData
} = fnAdapter;

const BarchartAdapter = {
  toConfig(json, option) {
    const chartId = crChartId(option)
        , { title, subtitle } = crTitle(option)
        , dataOption = crData(json, option)
        , { data, dataMfi } = dataOption
        , config = Builder()
           .stockConfig(chartId, dataOption)
           .addCaption(title, subtitle)
           .add({
             ...crConfigOption({
                chartId, option, data
             })
            })
            .addZhPoints(dataMfi)
            .toConfig();

      return { config };
  },

  toSeries(json={}, option) {
    const { parentId } = option
        , _id = `${parentId}_${crChartId(option)}`
        , { data } = toSeriesData(_id, json.results, {
             isAllSeries: false,
             pnDate: 'tradingDay'
          });
    return Builder()
      .initSeria()
      .addPoints(_id, data)
      .toSeria();
  }
}

export default BarchartAdapter
