import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import api from './KxApi';

const Kx = {
  api,
  adapter: crAdapterRouterDfOb(toKline)
};

export default Kx
