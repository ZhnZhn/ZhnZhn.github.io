
import ChartType from '../../constants/ChartType';
import { LoadType as LT } from '../../constants/Type';

import { loadQuandlCommodityTrade } from './loadQuandlCommodityTrade';

import LoadImpl from './LoadImpl'

const LoadConfig = {
  [LT.Q]: LoadImpl.Quandl,
  [LT.QCT]: loadQuandlCommodityTrade,

  [LT.B]: LoadImpl.Barchart,
  [LT.AL]: LoadImpl.AlphaIndicator,
  [LT.AL_S]: LoadImpl.AlphaSector,
  [LT.AL_I]: LoadImpl.AlphaIntraday,
  [LT.IEX]: LoadImpl.Iex,

  [LT.EU_STAT]: LoadImpl.EuroStat,
  [LT.NST]: LoadImpl.StatNorway,
  [LT.NST_2]: LoadImpl.StatNorway2,
  [LT.SWS]: LoadImpl.StatSweden,

  [LT.BEA]: LoadImpl.Bea,
  [LT.BLS]: LoadImpl.Bls,
  [LT.INTR]: LoadImpl.Intrinio,

  [LT.CRC]: LoadImpl.Crc,
  [LT.CMC]: LoadImpl.Cmc,

  [LT.FS]: LoadImpl.Insee,
  [LT.UN]: LoadImpl.UnComtrade,
  [LT.FAO]: LoadImpl.FaoStat,
  [ChartType.WATCH_LIST]: LoadImpl.Quandl,
  [LT.WL]: LoadImpl.Quandl
};

export default LoadConfig
