import pipe from '../utils/pipe';

import {
  crStockConfig,
  crStockSeriaConfig
} from '../charts/stockBuilderFn';
import {
  fAddCaption,
  fAdd,
  fAddZhPoints,
  toConfig
} from '../charts/configBuilderFn';

import {
  FN_IDENTITY,
  FN_NOOP,
  crDfItemKey,
  valueMoving
} from './AdapterFn'
import { stockSeriesLegend } from './legendFn';
import { toStockSeriesData } from './AdapterStockFn';

const _crCaptionDf = ({
  title,
  subtitle
}) => ({
  title,
  subtitle
});

const crAdapterOHLCV = ({
  isAth,
  seriaOption={},
  crCaption=_crCaptionDf,
  crId=crDfItemKey,
  getArr=FN_IDENTITY,
  crAddConfig=FN_NOOP,
  toDate
}) => ({
  toConfig(json, option){
    const {
      title,
      subtitle
    } = crCaption(option, json)
    , id = crId(option)
    , dataOption = toStockSeriesData({
        isAth,
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
          })
        }),
        fAddZhPoints(dMfi),
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
