import { crAdapterRouter } from '../crAdapterRouter'
import { crDfItemKey } from '../AdapterFn'

import api from './AvStockMarketsApi'
import IndicatorAdapter from './IndicatorAdapter'
import IntradayAdapter from './IntradayAdapter'
import InstrAdapter from './InstrAdapter'
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
    INSTR: InstrAdapter,
    SR: SearchAdapter,
    F: FundAdapter,
    E: EarnAdapter,
    GL: TopGainersLosersAdapter,
    EP: EtfProfileAdapter,
    OV: OverviewAdapter
  },
  crDfKey: crDfItemKey
})
, AlphaVantage = { api, adapter };

export default AlphaVantage
