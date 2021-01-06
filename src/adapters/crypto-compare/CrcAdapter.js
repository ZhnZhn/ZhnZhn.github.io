import crAdapterRouter from '../crAdapterRouter'

import toHdConfig from './toHdConfig'

const _rAdapter = {
  DF: toHdConfig
}
, CrcAdapter = crAdapterRouter(_rAdapter);

export default CrcAdapter
