import { crAdapterRouter } from '../crAdapterRouter'

import toChartConfig from './toChartConfig'
import toTwConfig from './toTwConfig'
import toCiConfig from './toCiConfig'

const _rAdapter = {
  DF: toChartConfig,
  TW: toTwConfig,
  CI: toCiConfig
}
, CpAdapter = crAdapterRouter(_rAdapter, { isKey: true });

export default CpAdapter
