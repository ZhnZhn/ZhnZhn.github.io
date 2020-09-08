
import api from './Api'
import Indicator from './AlphaAdapter'
import Intraday from './AlphaIntradayAdapter'
import Fund from './FundAdapter'
import Sector from './AlphaSectorAdapter'

const AlphaVantage = {
  AlphaIndicator: { api, adapter: Indicator },
  AlphaIntraday: { api, adapter: Intraday },
  AlphaFund: { api, adapter: Fund },
  AlphaSector: { api, adapter: Sector }
};

export default AlphaVantage
