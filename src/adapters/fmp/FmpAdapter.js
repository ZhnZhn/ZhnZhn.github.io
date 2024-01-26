import { crAdapterRouter } from '../crAdapterRouter'

import toChart from './toChart'
import toHistorical from './toHistorical'

const _rAdapter = {
  _pn: 'dfPn',
  DF: toChart,
  historical: toHistorical,
  intraday: toHistorical
},
FmpAdapter = crAdapterRouter(_rAdapter);

export default FmpAdapter
