import crAdapter from '../crAdapter'

import toHdConfig from './toHdConfig'

const _rAdapter = {
  DF: toHdConfig,
  HD: toHdConfig
};

const _getAdapter = (option) => {
  const { dfSubLoadId } = option;
  return _rAdapter[dfSubLoadId] || _rAdapter.DF;
};

const CrcAdapter = crAdapter(_getAdapter)

export default CrcAdapter
