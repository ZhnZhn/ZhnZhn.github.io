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
  crCaption=_crCaptionDf,
  getArr=FN_IDENTITY,
  crAddConfig=FN_NOOP
}) => ({
  toConfig(json, option){
    const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      seriaType,
      //seriaColor,
      seriaWidth
    } = option
    , {
      title,
      subtitle
    } = crCaption(option, json)
    , id = crDfItemKey(option)
    , dataOption = toStockSeriesData({
        isAth,
        arr: getArr(json, option),
      })
    , { dC, dMfi } = dataOption;

    return {
      config: pipe(
        crStockConfig(id, {...dataOption,
          isNotZoomToMinMax,
          isDrawDeltaExtrems,
          seriaType,
          //seriaColor,
          seriaWidth
        }),
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
    const id = crDfItemKey(option)
    , { dC } = toStockSeriesData({
       isAllSeries: false,
       arr: getArr(json, option)
    });
    return crStockSeriaConfig(id, dC);
  }
})

export default crAdapterOHLCV
