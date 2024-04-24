import { crAdapterRouter } from '../crAdapterRouter'

import toChart from './toChart'
import toHistorical from './toHistorical'

const FmpAdapter = crAdapterRouter({
  rAdapter: {
    _pn: 'dfPn',
    DF: toChart,
    historical: toHistorical,
    intraday: toHistorical
  }
});

export default FmpAdapter
