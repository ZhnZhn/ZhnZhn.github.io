import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import api from './HtApi';

const Ht = {
  api,
  adapter: crAdapterRouterDfOb(toKline)
};

export default Ht
