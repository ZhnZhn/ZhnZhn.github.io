import Builder from '../charts/ConfigBuilder'
import AdapterFn from './AdapterFn'
import AdapterStockFn from './AdapterStockFn'

const { valueMoving, stockSeriesLegend } = AdapterFn
const { toSeriesData } = AdapterStockFn

const _crCaptionDf = ({ title, subtitle }) => ({ title, subtitle })
, _crIdDf = ({ _itemKey }) => _itemKey
, _getArrDf = json => json
, _crAddConfigDf = () => {};

const crAdapterOHLCV = ({
  seriaOption={},
  crCaption=_crCaptionDf,
  crId=_crIdDf,
  getArr=_getArrDf,
  crAddConfig=_crAddConfigDf
}) => ({
  toConfig(json, option){
    const { title, subtitle } = crCaption(option)
    , id = crId(option)
    , dataOption = toSeriesData({
        arr: getArr(json, option),
        seriaOption, option
      })
    , { data, dataMfi } = dataOption
    , config = Builder()
        .stockConfig(id, dataOption)
        .addCaption(title, subtitle)
        .add({
           valueMoving: valueMoving(data),
           ...crAddConfig({
              json, option, data,
              id, title, subtitle
           })
         })
         .add('zhConfig', { legend: stockSeriesLegend() })
         .addZhPoints(dataMfi)
         .toConfig();

    return { config };
  },

  toSeries(json, option){
    const id = crId(option)
    , { data } = toSeriesData({
       arr: getArr(json, option),
       seriaOption: { ...seriaOption, isAllSeries: false },
       option
     });
    return Builder()
      .stockSeria(id, data)
      .toSeria();
  }
})

export default crAdapterOHLCV
