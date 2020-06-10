import toChartConfig from './toChartConfig'

import crAdapter from '../crAdapter'

const _rAdapter = {
  DF: toChartConfig
};

const _getAdapter = (option) => {
  const { dfRoute } = option;
  return _rAdapter[dfRoute] || _rAdapter.DF;
};

const CpAdapter = crAdapter(_getAdapter, { isKey: true });

export default CpAdapter
