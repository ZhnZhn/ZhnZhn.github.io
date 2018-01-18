import { fetchTxt, fetchJsonp } from '../../utils/fnFetch'
import Adapter from '../../adapters/RouterAdapter'

import f from './loadItem'

const {
  Quandl, UnComtrade, FaoStat,
  EuroStat, StatNorway, StatSweden,
  AlphaVantage, Barchart, Intrinio,
  Iex, Insee, Bea, Bls
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
  Intrinio: f({ ...Intrinio }),

  Insee: f({
    fnFetch: fetchTxt,
    ...Insee
  }),

  Bea: f({ ...Bea }),
  Bls: f({ ...Bls })
};

export default LoadImpl
