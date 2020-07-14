
import Builder from '../../charts/ConfigBuilder'

import fnAdapter from './fnAdapter'

const {
  crChartId,
  crConfigOption,
  toSeriesData,
  crOpenInterest,
  joinBy
} = fnAdapter;

const _getValue = obj => obj && obj.value
  || '';
const _getCaption = obj => obj && obj.caption
  || '';

const _crDfKey = (option) => {
  option.linkFn = "NASDAQ"
  return option.value;
};

const _crFtKey = (option) => {
  const { items=[] } = option
  , [it1, it2, it3 ] = items;
  option.linkFn = "BR"
  option.subtitle = joinBy(' ',
    _getCaption(it2),
    _getCaption(it3)
  )
  return (option.value = joinBy('',
    _getValue(it1),
    _getValue(it2),
    _getValue(it3)
  ));
};

const _rCrKey = {
  DF: _crDfKey,
  FT: _crFtKey
};

const BarchartAdapter = {
  crKey(option){
    const { dfT } = option
    , _crKey = _rCrKey[dfT] || _rCrKey.DF;
    return _crKey(option);
  },
  toConfig(json, option) {
    const chartId = crChartId(option)
    , {
        title='', subtitle='',
        isNotZoomToMinMax,
        isDrawDeltaExtrems
      } = option
    , dataOption = toSeriesData(json.results, {
       pnDate: 'tradingDay',
       isNotZoomToMinMax,
       isDrawDeltaExtrems
    })
    , { data, dataMfi } = dataOption
    , dataInterest = crOpenInterest(json, option)
    , config = Builder()
       .stockConfig(chartId, dataOption)
       .addCaption(title, subtitle)
       .add({
         ...crConfigOption({
            chartId, option, data
         })
        })
        .addZhPoints(dataMfi)
        .addMiniVolume({
          btTitle: 'OpenInterest',
          title: 'OpenInterest',
          dVolume: dataInterest,
          dColumn: dataInterest
        })
        .toConfig();

      return { config };
  },

  toSeries(json={}, option) {
    const { parentId } = option
    , _id = `${parentId}_${crChartId(option)}`
    , { data } = toSeriesData(json.results, {
         isAllSeries: false,
         pnDate: 'tradingDay'
      });
    return Builder()
      .stockSeria(_id, data)
      .toSeria();
  }
}

export default BarchartAdapter
