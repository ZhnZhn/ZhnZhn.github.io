import Builder from '../charts/ConfigBuilder'
import AdapterFn from './AdapterFn'
import { toStockSeriesData } from './AdapterStockFn'

const {
  valueMoving,
  stockSeriesLegend
} = AdapterFn;

const _crCaptionDf = ({ title, subtitle }) => ({ title, subtitle })
, _crIdDf = ({ _itemKey }) => _itemKey
, _getArrDf = json => json
, _crAddConfigDf = () => {};

const crAdapterOHLCV = ({
  seriaOption={},
  crCaption=_crCaptionDf,
  crId=_crIdDf,
  getArr=_getArrDf,
  crAddConfig=_crAddConfigDf,
  toDate
}) => ({
  toConfig(json, option){
    const { title, subtitle } = crCaption(option, json)
    , id = crId(option)
    , dataOption = toStockSeriesData({
        arr: getArr(json, option),
        toDate,
        seriaOption, option
      })
    , { dC, dMfi } = dataOption
    , config = Builder()
        .stockConfig(id, dataOption)
        .addCaption(title, subtitle)
        .add({
           valueMoving: valueMoving(dC),
           ...crAddConfig({
              json, option, data: dC,
              id, title, subtitle
           })
         })
         .add('zhConfig', { legend: stockSeriesLegend() })
         .addZhPointsIf(dMfi)
         .toConfig();

    return { config };
  },

  toSeries(json, option){
    const id = crId(option)
    , { data } = toStockSeriesData({
       arr: getArr(json, option),
       toDate,
       seriaOption: { ...seriaOption, isAllSeries: false },
       option
     });
    return Builder()
      .stockSeria(id, data)
      .toSeria();
  }
})

export default crAdapterOHLCV
