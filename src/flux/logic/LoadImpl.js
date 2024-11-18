import Adapter from '../../adapters/RouterAdapter';
import fLoadItem from './loadItem';

const _hmLoadImpl = Object.create(null);
export const addLoadImpl = (
  key,
  adapter
) => {
  if (!_hmLoadImpl[key]) {
    _hmLoadImpl[key] = fLoadItem(adapter)
  }
}
export const getLoadImpl = loadId => _hmLoadImpl[loadId]

const _initHmLoadImpl = () => {
  for (let key in Adapter) {
    addLoadImpl(key, Adapter[key])
  }
};
_initHmLoadImpl()
