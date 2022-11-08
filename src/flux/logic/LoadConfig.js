import {
  LT_Q,
  LT_QCT,
  LT_DBN,
  LT_EMB,
  LT_IRE,
  LT_AL,
  LT_IEX,
  LT_FMP,
  LT_TW,
  LT_EU_STAT,
  LT_FS,
  LT_UKS,
  LT_NST,
  LT_NST_2,
  LT_SWS,
  LT_SFL,
  LT_SDN,
  LT_SIR,
  LT_BEA,
  LT_BLS,
  LT_EIA,
  LT_INTR,
  LT_CRC,
  LT_CG,
  LT_CM,
  LT_CP,
  LT_CL,
  LT_BN,
  LT_BF,
  LT_BT,
  LT_UN,
  LT_FAO,
  LT_WB,
  LT_WATCH_LIST,
  LT_WL
} from '../../constants/LoadType';
import { loadQuandlCommodityTrade } from './loadQuandlCommodityTrade';
import LoadImpl from './LoadImpl';

const LoadConfig = {
  [LT_Q]: LoadImpl.Quandl,
  [LT_QCT]: loadQuandlCommodityTrade,

  [LT_DBN]: LoadImpl.DbNomics,
  [LT_EMB]: LoadImpl.Ember,
  [LT_IRE]: LoadImpl.Irena,

  [LT_AL]: LoadImpl.AlphaVantage,
  [LT_IEX]: LoadImpl.Iex,
  [LT_FMP]: LoadImpl.Fmp,
  [LT_TW]: LoadImpl.Tw,

  [LT_EU_STAT]: LoadImpl.EuroStat,
  [LT_FS]: LoadImpl.Insee,
  [LT_UKS]: LoadImpl.StatUk,
  [LT_NST]: LoadImpl.StatNorway,
  [LT_NST_2]: LoadImpl.StatNorway2,
  [LT_SWS]: LoadImpl.StatSweden,
  [LT_SFL]: LoadImpl.StatFinland,
  [LT_SDN]: LoadImpl.StatDenmark,
  [LT_SIR]: LoadImpl.StatIreland,

  [LT_BEA]: LoadImpl.Bea,
  [LT_BLS]: LoadImpl.Bls,
  [LT_EIA]: LoadImpl.Eia,
  [LT_INTR]: LoadImpl.Intrinio,

  [LT_CRC]: LoadImpl.Crc,
  [LT_CG]: LoadImpl.Cg,
  [LT_CM]: LoadImpl.Cm,
  [LT_CP]: LoadImpl.Cp,
  [LT_CL]: LoadImpl.Cl,
  [LT_BN]:  LoadImpl.Bn,
  [LT_BF]: LoadImpl.Bf,
  [LT_BT]: LoadImpl.Bt,

  [LT_UN]: LoadImpl.UnComtrade,
  [LT_FAO]: LoadImpl.FaoStat,
  [LT_WB]: LoadImpl.WorldBank,

  [LT_WATCH_LIST]: LoadImpl.Quandl,
  [LT_WL]: LoadImpl.Quandl
};

export default LoadConfig
