import toChartConfig from './toChartConfig'
import toTwConfig from './toTwConfig'
import toCiConfig from './toCiConfig'

import crAdapter from '../crAdapter'

const _rAdapter = {
  DF: toChartConfig,
  TW: toTwConfig,
  CI: toCiConfig
};

const _getAdapter = (option) => {
  const { dfRoute } = option;
  return _rAdapter[dfRoute] || _rAdapter.DF;
};

const CpAdapter = crAdapter(_getAdapter, { isKey: true });

export default CpAdapter
