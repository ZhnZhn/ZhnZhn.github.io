
import QuandlApi from './QuandlApi'
import QuandlAdapter from './QuandlAdapter'

import EuroStat from './eurostat/EuroStat'
import UnComtrade from './uncomtrade/UnComtrade'
import FaoStat from './faostat/FaoStat'
import StatNorway from './stat-norway/StatNorway'
import StatSweden from './stat-sweden/StatSweden'
import AlphaVantage from './alpha/AlphaVantage'
import Barchart from './barchart/Barchart'
import Iex from './iex/Iex'
import Insee from './insee/Insee'

const RouterAdapter = {
  Quandl: {
    api: QuandlApi,
    adapter: QuandlAdapter
  },

  EuroStat,
  UnComtrade,
  FaoStat,
  StatNorway,
  StatSweden,
  AlphaVantage,
  Barchart,
  Iex,
  Insee
};

export default RouterAdapter
