import { fetchJson, fetchTxt, fetchJsonp } from '../../utils/fnFetch'

import loadItem from './loadItem'

import Api from '../../api/Api'

import EuroStatAdapter from '../../adapters/eurostat/EuroStatAdapter'
import InseeAdapter from '../../adapters/insee/InseeAdapter'
import AlphaAdapter from '../../adapters/alpha/Adapter'
import BarchartAdapter from '../../adapters/barchart/BarchartAdapter'
import QuandlAdapter from '../../adapters/QuandlAdapter'
import UnComtradeAdapter from '../../adapters/uncomtrade/UnComtradeAdapter'
import FaoStatAdapter from '../../adapters/faostat/FaoStatAdapter'

const Quandl = loadItem({
  fnFetch: fetchJson,
  api: Api.Quandl,
  adapter: QuandlAdapter
})

const UnComtrade = loadItem({
  fnFetch: fetchJson,
  api: Api.UnComtrade,
  adapter: UnComtradeAdapter
})

const FaoStat = loadItem({
  fnFetch: fetchJson,
  api: Api.FaoStat,
  adapter: FaoStatAdapter
})

const EuroStat = loadItem({
  fnFetch: fetchJson,
  api: Api.EuroStat,
  adapter: EuroStatAdapter
})

const AlphaIndicator = loadItem({
  fnFetch: fetchJson,
  api: Api.Alpha,
  adapter: AlphaAdapter.Indicator
})

const AlphaIntraday = loadItem({
  fnFetch: fetchJson,
  api: Api.Alpha,
  adapter: AlphaAdapter.Intraday
})

const AlphaSector = loadItem({
  fnFetch: fetchJson,
  api: Api.Alpha,
  adapter: AlphaAdapter.Sector
})

const Barchart = loadItem({
  fnFetch: fetchJsonp,
  optionFetch: {
    jsonpCallbackFunction: 'BarchartAPIcallback'
  },
  api: Api.Barchart,
  adapter: BarchartAdapter
})

const Insee = loadItem({
  fnFetch: fetchTxt,
  api: Api.Insee,
  adapter: InseeAdapter
})

export default {
  Quandl,
  EuroStat,
  Insee,

  AlphaIndicator,
  AlphaIntraday,
  AlphaSector,

  Barchart,

  UnComtrade,
  FaoStat
}
