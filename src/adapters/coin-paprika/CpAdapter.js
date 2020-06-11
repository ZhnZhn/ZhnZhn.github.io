import toChartConfig from './toChartConfig'
import toTwConfig from './toTwConfig'

import crAdapter from '../crAdapter'

const _rAdapter = {
  DF: toChartConfig,
  TW: toTwConfig
};

const _getAdapter = (option) => {
  const { dfRoute } = option;
  return _rAdapter[dfRoute] || _rAdapter.DF;
};

const CpAdapter = crAdapter(_getAdapter, { isKey: true });

export default CpAdapter
