import { crAdapterRouter } from '../crAdapterRouter'

import toChart from './toChart'
import toExchangeList from './toExchangeList'
import toMarketCapList from './toMarketCapList'

const _rAdapter = {
  DF: toChart,
  EL: toExchangeList,
  MCL: toMarketCapList
}
, CgAdapter = crAdapterRouter(_rAdapter, { isKey: true });

export default CgAdapter
