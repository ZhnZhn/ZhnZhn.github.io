
import api from './Api'
import Indicator from './AlphaAdapter'
import Intraday from './AlphaIntradayAdapter'
import Sector from './AlphaSectorAdapter'

const AlphaVantage = {
  AlphaIndicator: { api, adapter: Indicator },
  AlphaIntraday: { api, adapter: Intraday },
  AlphaSector: { api, adapter: Sector }
};

export default AlphaVantage
