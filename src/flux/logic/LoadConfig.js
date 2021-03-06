
import ChartType from '../../constants/ChartType';
import { LoadType as LT } from '../../constants/Type';

import { loadQuandlCommodityTrade } from './loadQuandlCommodityTrade';

import LoadImpl from './LoadImpl'

const LoadConfig = {
  [LT.Q]: LoadImpl.Quandl,
  [LT.QCT]: loadQuandlCommodityTrade,

  [LT.DBN]: LoadImpl.DbNomics,

  [LT.AL]: LoadImpl.AlphaVantage,
  [LT.IEX]: LoadImpl.Iex,
  [LT.FMP]: LoadImpl.Fmp,
  [LT.TW]: LoadImpl.Tw,

  [LT.EU_STAT]: LoadImpl.EuroStat,
  [LT.FS]: LoadImpl.Insee,
  [LT.UKS]: LoadImpl.StatUk,
  [LT.NST]: LoadImpl.StatNorway,
  [LT.NST_2]: LoadImpl.StatNorway2,
  [LT.SWS]: LoadImpl.StatSweden,
  [LT.SFL]: LoadImpl.StatFinland,

  [LT.BEA]: LoadImpl.Bea,
  [LT.BLS]: LoadImpl.Bls,
  [LT.EIA]: LoadImpl.Eia,
  [LT.INTR]: LoadImpl.Intrinio,

  [LT.CRC]: LoadImpl.Crc,
  [LT.CG]: LoadImpl.Cg,
  [LT.CM]: LoadImpl.Cm,
  [LT.CP]: LoadImpl.Cp,
  [LT.CL]: LoadImpl.Cl,
  [LT.BN]:  LoadImpl.Bn,
  [LT.BT]: LoadImpl.Bt,

  [LT.FS]: LoadImpl.Insee,
  [LT.UN]: LoadImpl.UnComtrade,
  [LT.FAO]: LoadImpl.FaoStat,
  [LT.WB]: LoadImpl.WorldBank,
  [ChartType.WATCH_LIST]: LoadImpl.Quandl,
  [LT.WL]: LoadImpl.Quandl
};

export default LoadConfig
