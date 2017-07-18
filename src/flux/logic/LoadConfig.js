
import ChartType from '../../constants/ChartType';
import { LoadType } from '../../constants/Type';

import { loadQuandlCommodityTrade } from './loadQuandlCommodityTrade';

import LoadImpl from './LoadImpl'

const LoadConfig = {
  [LoadType.Q]: LoadImpl.Quandl,
  [LoadType.QCT]: loadQuandlCommodityTrade,

  [LoadType.B]: LoadImpl.Barchart,
  [LoadType.AL]: LoadImpl.AlphaIndicator,
  [LoadType.AL_S]: LoadImpl.AlphaSector,
  [LoadType.AL_I]: LoadImpl.AlphaIntraday,

  [LoadType.EU_STAT]: LoadImpl.EuroStat,
  [ChartType.WATCH_LIST]: LoadImpl.Quandl,
  [LoadType.WL]: LoadImpl.Quandl
};

export default LoadConfig
