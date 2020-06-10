import crAdapter from '../crAdapter'

import toHdConfig from './toHdConfig'
import toInfoConfig from './toInfoConfig'

const _rAdapter = {
  DF: toHdConfig,
  HD: toHdConfig,
  CI: toInfoConfig
};

const _getAdapter = (option) => {
  const { dfSubLoadId } = option;
  return _rAdapter[dfSubLoadId] || _rAdapter.DF;
};

const CrcAdapter = crAdapter(_getAdapter)

export default CrcAdapter
