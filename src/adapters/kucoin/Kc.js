import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import api from './KcApi';

const Kc = {
  api,
  adapter: crAdapterRouterDfOb(toKline)
};

export default Kc
