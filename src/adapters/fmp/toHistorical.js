import Builder from '../../charts/ConfigBuilder'
import AdapterStockFn from '../AdapterStockFn'
import fnAdapter from './fnAdapter'

const { toSeriesData } = AdapterStockFn;
const { crCaption, crConfigOption } = fnAdapter

const _getData = (json, option) => {
  const { dfPn } = option
  return json[dfPn].reverse();
};

const toChart = {
  toConfig(json, option){
    const { _itemKey } = option
    , { title, subtitle } = crCaption(option)
    , dataOption = toSeriesData({
         arr: _getData(json, option),
         option
      })
    , { data, dataMfi } = dataOption
    , config = Builder()
        .stockConfig(_itemKey, dataOption)
        .addCaption(title, subtitle)
        .add({
           ...crConfigOption({ json, option, data })
         })
         .addZhPoints(dataMfi)
         .toConfig();
    
    return { config };
  },

  toSeries(json, option){
    const { _itemKey } = option
    , { data } = toSeriesData({
        arr: _getData(json, option),
        seriaOption: { isAllSeries: false },
        option
      });
    return Builder()
      .stockSeria(_itemKey, data)
      .toSeria();
  }
}

export default toChart
