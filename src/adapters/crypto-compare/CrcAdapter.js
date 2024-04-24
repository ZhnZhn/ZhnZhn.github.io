import { crAdapterRouter } from '../crAdapterRouter'
import toHdConfig from './toHdConfig'

const CrcAdapter = crAdapterRouter({
  rAdapter: {
    DF: toHdConfig
  }
});

export default CrcAdapter
