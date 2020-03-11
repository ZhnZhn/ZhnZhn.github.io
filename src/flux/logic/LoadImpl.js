import Adapter from '../../adapters/RouterAdapter'

import f from './loadItem'

const LoadImpl = (() => {
  const _conf = {}
  , _hasOwnProperty = Object.prototype.hasOwnProperty.bind(Adapter);
  for (let key in Adapter) {
    if (_hasOwnProperty(key)) {
      _conf[key] = f(Adapter[key])
    }
  }
  return _conf;
})();

export default LoadImpl
