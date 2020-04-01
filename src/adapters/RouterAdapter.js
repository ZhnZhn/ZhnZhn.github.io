
import EuroStat from './eurostat/EuroStat'
import UnComtrade from './uncomtrade/UnComtrade'
import FaoStat from './faostat/FaoStat'
import WorldBank from './world-bank/WorldBank'
import StatNorway from './stat-norway/StatNorway'
import StatSweden from './stat-sweden/StatSweden'
import StatFinland from './stat-finland/StatFinland'
import AlphaVantage from './alpha/AlphaVantage'
import Barchart from './barchart/Barchart'
import Iex from './iex/Iex'
import Wtd from './wtd/Wtd'
import Fmp from './fmp/Fmp'
import Insee from './insee/Insee'
import Bea from './bea/Bea'
import Bls from './bls/Bls'
import Eia from './eia/Eia'
import Intrinio from './intrinio/Intrinio'
import Quandl from './quandl/Quandl'
import DbNomics from './db-nomics/DbNomics'
import Crc from './crypto-compare/Crc'
import Cg from './coin-gecko/Cg'


const RouterAdapter = {
  Quandl,
  DbNomics,
  EuroStat,
  UnComtrade,
  FaoStat,
  WorldBank,
  ...StatNorway,
  StatSweden,
  StatFinland,
  ...AlphaVantage,
  Barchart,
  Iex,
  Wtd,
  Fmp,
  Insee,
  Bea,
  Bls,
  Eia,
  Intrinio,
  Crc,
  Cg  
};

export default RouterAdapter
