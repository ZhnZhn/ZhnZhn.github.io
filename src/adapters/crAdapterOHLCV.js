import pipe from '../utils/pipe';

import {
  crStockConfig,
  crStockSeriaConfig
} from '../charts/stockBuilderFn';
import {
  fAddCaption,
  fAdd,
  toConfig
} from '../charts/configBuilderFn';

import { valueMoving } from './AdapterFn'
import { stockSeriesLegend } from './legendFn';
import { toStockSeriesData } from './AdapterStockFn';

const _crCaptionDf = ({
  title,
  subtitle
}) => ({
  title,
  subtitle
})
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
    , { dC, dMfi } = dataOption;

    return {
      config: pipe(
        crStockConfig(id, dataOption),
        fAddCaption(title, subtitle),
        fAdd({
          valueMoving: valueMoving(dC),
          ...crAddConfig({
             json, option, data: dC,
             id, title, subtitle
          }),
          zhPoints: dMfi, zhIsMfi: true
        }),
        fAdd('zhConfig', { legend: stockSeriesLegend() }),
        toConfig
    )};
  },

  toSeries(json, option){
    const id = crId(option)
    , { data } = toStockSeriesData({
       arr: getArr(json, option),
       toDate,
       seriaOption: { ...seriaOption, isAllSeries: false },
       option
    });
    return crStockSeriaConfig(id, data);
  }
})

export default crAdapterOHLCV
