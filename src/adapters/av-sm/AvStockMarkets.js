import api from './AvStockMarketsApi'
import { crAdapterRouter } from '../crAdapterRouter'
import IndicatorAdapter from './IndicatorAdapter'
import IntradayAdapter from './IntradayAdapter'
import SearchAdapter from './SearchAdapter'
import FundAdapter from './FundAdapter'
import EarnAdapter from './EarnAdapter'
import TopGainersLosersAdapter from './TopGainersLosersAdapter'
import EtfProfileAdapter from './EtfProfileAdapter'
import OverviewAdapter from './OverviewAdapter'

const adapter = crAdapterRouter({
  rAdapter: {
    DF: IndicatorAdapter,
    I: IntradayAdapter,
    SR: SearchAdapter,
    F: FundAdapter,
    E: EarnAdapter,
    GL: TopGainersLosersAdapter,
    EP: EtfProfileAdapter,
    OV: OverviewAdapter
  },
  isKey: true
})
, AlphaVantage = { api, adapter };

export default AlphaVantage