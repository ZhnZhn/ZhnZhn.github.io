import Adapter from '../../adapters/RouterAdapter'

import f from './loadItem'

const LoadImpl = (() => {
  const _conf = {};  
  for (let key in Adapter) {
    _conf[key] = f(Adapter[key])
  }
  return _conf;
})();

export default LoadImpl
