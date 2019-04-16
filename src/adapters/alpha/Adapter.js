
import AlphaAdapter from './AlphaAdapter'
import AlphaIntradayAdapter from './AlphaIntradayAdapter'
import AlphaSectorAdapter from './AlphaSectorAdapter'
import SearchAdapter from './SearchAdapter'

export default {
  Indicator: AlphaAdapter,
  Intraday: AlphaIntradayAdapter,
  Sector: AlphaSectorAdapter,
  Search: SearchAdapter
}
