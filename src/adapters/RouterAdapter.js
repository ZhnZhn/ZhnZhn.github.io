
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
import Barchart from './barchart/Barchart'
import Iex from './iex/Iex'
import Fmp from './fmp/Fmp'
import Bea from './bea/Bea'
import Bls from './bls/Bls'
import Eia from './eia/Eia'
import Intrinio from './intrinio/Intrinio'
import Quandl from './quandl/Quandl'
import DbNomics from './db-nomics/DbNomics'
import Bn from './binance/Bn'
import Crc from './crypto-compare/Crc'
import Cg from './coin-gecko/Cg'
import Cp from './coin-paprika/Cp'


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
  ...AlphaVantage,
  Barchart,
  Iex,
  Fmp,
  Bea,
  Bls,
  Eia,
  Intrinio,
  Bn,
  Crc,
  Cg,
  Cp
};

export default RouterAdapter
