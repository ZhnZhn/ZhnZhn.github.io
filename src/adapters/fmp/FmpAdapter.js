import { crAdapterRouter } from '../crAdapterRouter'

import toChart from './toChart'
import toHistorical from './toHistorical'
import toIntraday from './toIntraday'

const FmpAdapter = crAdapterRouter({
  rAdapter: {
    _pn: 'dfPn',
    DF: toChart,
    historical: toHistorical,
    intraday: toIntraday
  }
});

export default FmpAdapter
