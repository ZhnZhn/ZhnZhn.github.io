
import api from './Api'
import Indicator from './AlphaAdapter'
import Intraday from './AlphaIntradayAdapter'
import Sector from './AlphaSectorAdapter'

const AlphaVantage = {
  Indicator: { api, adapter: Indicator },
  Intraday: { api, adapter: Intraday },
  Sector: { api, adapter: Sector }
};

export default AlphaVantage
