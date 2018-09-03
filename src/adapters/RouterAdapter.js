
import EuroStat from './eurostat/EuroStat'
import UnComtrade from './uncomtrade/UnComtrade'
import FaoStat from './faostat/FaoStat'
import WorldBank from './world-bank/WorldBank'
import StatNorway from './stat-norway/StatNorway'
import StatSweden from './stat-sweden/StatSweden'
import AlphaVantage from './alpha/AlphaVantage'
import Barchart from './barchart/Barchart'
import Iex from './iex/Iex'
import Insee from './insee/Insee'
import Bea from './bea/Bea'
import Bls from './bls/Bls'
import Eia from './eia/Eia'
import Intrinio from './intrinio/Intrinio'
import Quandl from './quandl/Quandl'
import Crc from './crypto-compare/Crc'
import Cmc from './coin-market-cap/Cmc'

const RouterAdapter = {
  Quandl,
  EuroStat,
  UnComtrade,
  FaoStat,
  WorldBank,
  StatNorway,
  StatSweden,
  AlphaVantage,
  Barchart,
  Iex,
  Insee,
  Bea,
  Bls,
  Eia,
  Intrinio,
  Crc,
  Cmc
};

export default RouterAdapter
