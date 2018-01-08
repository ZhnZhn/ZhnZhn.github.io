import { fetchTxt, fetchJsonp } from '../../utils/fnFetch'
import Adapter from '../../adapters/RouterAdapter'

import f from './loadItem'

const {
  Quandl, UnComtrade, FaoStat,
  EuroStat, StatNorway, StatSweden,
  AlphaVantage, Barchart,
  Iex, Insee, Bea
} = Adapter;

const LoadImpl = {
  Quandl: f({ ...Quandl }),
  UnComtrade: f({ ...UnComtrade }),
  FaoStat: f({ ...FaoStat }),
  EuroStat: f({ ...EuroStat }),

  StatNorway: f({ ...StatNorway.Dataset }),
  StatNorway2: f({ ...StatNorway.Table }),

  StatSweden: f({ ...StatSweden.Table }),

  AlphaIndicator: f({ ...AlphaVantage.Indicator }),
  AlphaIntraday: f({ ...AlphaVantage.Intraday }),
  AlphaSector: f({ ...AlphaVantage.Sector }),

  Barchart: f({
    fnFetch: fetchJsonp,
    ...Barchart
  }),

  Iex: f({ ...Iex }),
  Insee: f({
    fnFetch: fetchTxt,
    ...Insee
  }),

  Bea: f({ ...Bea })
};

export default LoadImpl
