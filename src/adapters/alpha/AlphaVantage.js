import api from './Api'
import crAdapterRouter from '../crAdapterRouter'

import IndicatorAdapter from './IndicatorAdapter'
import IntradayAdapter from './IntradayAdapter'
import SectorAdapter from './SectorAdapter'
import SearchAdapter from './SearchAdapter'
import FundAdapter from './FundAdapter'
import EarnAdapter from './EarnAdapter'
import EconomicsAdapter from './EconomicsAdapter'

const _rAdapter = {
  DF: IndicatorAdapter,
  I: IntradayAdapter,
  S: SectorAdapter,
  SR: SearchAdapter,
  F: FundAdapter,
  E: EarnAdapter,
  EI: EconomicsAdapter
}
, adapter = crAdapterRouter(_rAdapter, { isKey: true })
, AlphaVantage = { api, adapter };

export default AlphaVantage
