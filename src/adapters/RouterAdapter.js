
import EuroStat from './eurostat/EuroStat'
import UnComtrade from './uncomtrade/UnComtrade'
import FaoStat from './faostat/FaoStat'
import WorldBank from './world-bank/WorldBank'
import Insee from './insee/Insee'
import StatUk from './stat-uk/StatUk'
import StatNorway from './stat-norway/StatNorway'
import StatSweden from './stat-sweden/StatSweden'
import StatFinland from './stat-finland/StatFinland'
import StatDenmark from './stat-denmark/StatDenmark'
import StatIreland from './stat-ireland/StatIreland'
import AlphaVantage from './alpha/AlphaVantage'
import Iex from './iex/Iex'
import Fmp from './fmp/Fmp'
import Tw from './twelve/Tw'
import Bea from './bea/Bea'
import Bls from './bls/Bls'
import Eia from './eia/Eia'
import Intrinio from './intrinio/Intrinio'
import Ndl from './ndl/Ndl'
import DbNomics from './db-nomics/DbNomics'
import Ei from './ei/Ei'
import Ember from './ember/Ember'
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
import Kr from './kraken/Kr'
import Kc from './kucoin/Kc'
import Gt from './gateio/Gt'

const RouterAdapter = {
  Ndl,
  DbNomics,
  Ei,
  Ember,
  Irena,
  EuroStat,
  UnComtrade,
  FaoStat,
  WorldBank,
  Insee,
  StatUk,
  ...StatNorway,
  StatSweden,
  StatFinland,
  StatDenmark,
  StatIreland,
  AlphaVantage,
  Iex,
  Fmp,
  Tw,
  Bea,
  Bls,
  Eia,
  Intrinio,
  Crc,
  Cg,
  Cm,
  Cp,
  Cl,
  Bn,
  Cb,
  Bt,
  Bf,
  Kr,
  Kc,
  Gt
};

export default RouterAdapter
