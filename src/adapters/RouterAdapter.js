import {
  LT_OE,
  LT_BIS,
  LT_ECB,
  LT_BOC,
  LT_SNB,
  LT_Q,
  LT_DBN,
  LT_EI,
  LT_EMB,
  LT_IRE,
  LT_EN,
  LT_AL,
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
  LT_FSO,
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
  LT_CB,
  LT_BT,
  LT_CR,
  LT_BF,
  LT_KR,
  LT_KC,
  LT_GT,
  LT_HT,
  LT_KX,
  LT_BB,
  LT_FAO,
  LT_WB,
  LT_WT,
  LT_WATCH_LIST,
  LT_WL
} from '../constants/LoadType';

import EuroStat from './eurostat/EuroStat'
import FaoStat from './faostat/FaoStat'
import WorldBank from './world-bank/WorldBank'
import Wt from './wto/Wt'
import Insee from './insee/Insee'
import StatUk from './stat-uk/StatUk'
import {
  StatNorway,
  StatNorway2
} from './stat-norway/StatNorway'
import StatSweden from './stat-sweden/StatSweden'
import StatFinland from './stat-finland/StatFinland'
import StatDenmark from './stat-denmark/StatDenmark'
import StatIreland from './stat-ireland/StatIreland'
import StatSwiss from './stat-swiss/StatSwiss'
import AlphaVantage from './alpha/AlphaVantage'
import Fmp from './fmp/Fmp'
import Tw from './twelve/Tw'
import Bea from './bea/Bea'
import Bls from './bls/Bls'
import Eia from './eia/Eia'
import Intrinio from './intrinio/Intrinio'
import Bis from './bis/Bis';
import Ecb from './ecb/Ecb';
import Boc from './boc/Boc'
import Snb from './snb/Snb'
import Ndl from './ndl/Ndl'
import DbNomics from './db-nomics/DbNomics'
import Oecd from './oecd/Oecd';
import Ei from './ei/Ei'
import Ember from './ember/Ember'
import En from './environment/En'
import Irena from './irena/Irena'
import Crc from './crypto-compare/Crc'
import Cg from './coin-gecko/Cg'
import Cm from './coin-metrics/Cm'
import Cp from './coin-paprika/Cp'
import Cl from './coin-lore/Cl'
import Bn from './binance/Bn'
import Cb from './coinbase/Cb'
import Bt from './bitstamp/Bt'
import Bf from './bitfinex/Bf'
import Cr from './cryptocom/Cr'
import Kr from './kraken/Kr'
import Kc from './kucoin/Kc'
import Gt from './gateio/Gt'
import Ht from './htx/Ht'
import Kx from './okx/Kx'
import Bb from './bybit/Bb'

const RouterAdapter = {
  [LT_OE]: Oecd,

  [LT_BIS]: Bis,
  [LT_ECB]: Ecb,
  [LT_BOC]: Boc,
  [LT_SNB]: Snb,
  [LT_Q]: Ndl,

  [LT_DBN]: DbNomics,
  [LT_EI]: Ei,
  [LT_EMB]: Ember,
  [LT_IRE]: Irena,
  [LT_EN]: En,

  [LT_FAO]: FaoStat,
  [LT_WB]: WorldBank,
  [LT_WT]: Wt,

  [LT_EU_STAT]: EuroStat,
  [LT_FS]: Insee,
  [LT_UKS]: StatUk,
  [LT_NST]: StatNorway,
  [LT_NST_2]: StatNorway2,
  [LT_SWS]: StatSweden,
  [LT_SFL]: StatFinland,
  [LT_SDN]: StatDenmark,
  [LT_SIR]: StatIreland,
  [LT_FSO]: StatSwiss,

  [LT_AL]: AlphaVantage,
  [LT_FMP]: Fmp,
  [LT_TW]: Tw,

  [LT_BEA]: Bea,
  [LT_BLS]: Bls,
  [LT_EIA]: Eia,
  [LT_INTR]: Intrinio,

  [LT_CRC]: Crc,
  [LT_CG]: Cg,
  [LT_CM]: Cm,
  [LT_CP]: Cp,
  [LT_CL]: Cl,
  [LT_BN]: Bn,
  [LT_CB]: Cb,
  [LT_BT]: Bt,
  [LT_CR]: Cr,
  [LT_BF]: Bf,
  [LT_KR]: Kr,
  [LT_KC]: Kc,
  [LT_GT]: Gt,
  [LT_HT]: Ht,
  [LT_KX]: Kx,
  [LT_BB]: Bb,

  [LT_WATCH_LIST]: Ndl,
  [LT_WL]: Ndl
};

export default RouterAdapter
