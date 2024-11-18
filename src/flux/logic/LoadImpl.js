import Adapter from '../../adapters/RouterAdapter';
import fLoadItem from './loadItem';

const _hmLoadImpl = Object.create(null);
const _initHmLoadImpl = () => {
  for (let key in Adapter) {
    _hmLoadImpl[key] = fLoadItem(Adapter[key])
  }
};
_initHmLoadImpl()

export const getLoadImpl = loadId => _hmLoadImpl[loadId]
