import { fetchTxt, fetchJsonp } from '../../utils/fnFetch'

import fLoadItem from './loadItem'

import Api from '../../api/Api'

import EuroStatAdapter from '../../adapters/eurostat/EuroStatAdapter'
import StatNorwayAdapter from '../../adapters/stat-norway/StatNorwayAdapter'
import InseeAdapter from '../../adapters/insee/InseeAdapter'
import AlphaAdapter from '../../adapters/alpha/Adapter'
import BarchartAdapter from '../../adapters/barchart/BarchartAdapter'
import IexAdapter from '../../adapters/iex/IexAdapter'
import QuandlAdapter from '../../adapters/QuandlAdapter'
import UnComtradeAdapter from '../../adapters/uncomtrade/UnComtradeAdapter'
import FaoStatAdapter from '../../adapters/faostat/FaoStatAdapter'

const Quandl = fLoadItem({
  api: Api.Quandl,
  adapter: QuandlAdapter
})

const UnComtrade = fLoadItem({
  api: Api.UnComtrade,
  adapter: UnComtradeAdapter
})

const FaoStat = fLoadItem({
  api: Api.FaoStat,
  adapter: FaoStatAdapter
})

const EuroStat = fLoadItem({
  api: Api.EuroStat,
  adapter: EuroStatAdapter
})

const StatNorway = fLoadItem({
  api: Api.StatNorway,
  adapter: StatNorwayAdapter
})
const StatNorway2 = fLoadItem({
  api: Api.StatNorway2,
  optionFetch: Api.StatNorway2.crOptionFetch,
  adapter: StatNorwayAdapter
})


const AlphaIndicator = fLoadItem({
  api: Api.Alpha,
  adapter: AlphaAdapter.Indicator
})

const AlphaIntraday = fLoadItem({
  api: Api.Alpha,
  adapter: AlphaAdapter.Intraday
})

const AlphaSector = fLoadItem({
  api: Api.Alpha,
  adapter: AlphaAdapter.Sector
})

const Barchart = fLoadItem({
  fnFetch: fetchJsonp,
  optionFetch: {
    jsonpCallbackFunction: 'BarchartAPIcallback'
  },
  api: Api.Barchart,
  adapter: BarchartAdapter
})

const Iex = fLoadItem({
  api: Api.Iex,
  adapter: IexAdapter
})

const Insee = fLoadItem({
  fnFetch: fetchTxt,
  api: Api.Insee,
  adapter: InseeAdapter
})

export default {
  Quandl,
  EuroStat,
  StatNorway,
  StatNorway2,
  Insee,

  AlphaIndicator,
  AlphaIntraday,
  AlphaSector,

  Barchart,

  Iex,

  UnComtrade,
  FaoStat
}
