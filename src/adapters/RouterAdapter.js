
import EuroStat from './eurostat/EuroStat'
import UnComtrade from './uncomtrade/UnComtrade'
import FaoStat from './faostat/FaoStat'
import WorldBank from './world-bank/WorldBank'
import Insee from './insee/Insee'
import StatUk from './stat-uk/StatUk'
import StatNorway from './stat-norway/StatNorway'
import StatSweden from './stat-sweden/StatSweden'
import StatFinland from './stat-finland/StatFinland'
import AlphaVantage from './alpha/AlphaVantage'
import Iex from './iex/Iex'
import Fmp from './fmp/Fmp'
import Tw from './twelve/Tw'
import Bea from './bea/Bea'
import Bls from './bls/Bls'
import Eia from './eia/Eia'
import Intrinio from './intrinio/Intrinio'
import Quandl from './quandl/Quandl'
import DbNomics from './db-nomics/DbNomics'
import Crc from './crypto-compare/Crc'
import Cg from './coin-gecko/Cg'
import Cm from './coin-metrics/Cm'
import Cp from './coin-paprika/Cp'
import Cl from './coin-lore/Cl'
import Bn from './binance/Bn'
import Bt from './bitstamp/Bt'


const RouterAdapter = {
  Quandl,
  DbNomics,
  EuroStat,
  UnComtrade,
  FaoStat,
  WorldBank,
  Insee,
  StatUk,
  ...StatNorway,
  StatSweden,
  StatFinland,
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
  Bt
};

export default RouterAdapter
