import { crAdapterRouter } from '../crAdapterRouter'

import toChart from './toChart'
import toExchangeList from './toExchangeList'
import toExchangeVolume from './toExchangeVolume'
import toMarketCapList from './toMarketCapList'

const _rAdapter = {
  DF: toChart,
  EL: toExchangeList,
  EV: toExchangeVolume,
  MCL: toMarketCapList
}
, CgAdapter = crAdapterRouter(_rAdapter, { isKey: true });

export default CgAdapter
