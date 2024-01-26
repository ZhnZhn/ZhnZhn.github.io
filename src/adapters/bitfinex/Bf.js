import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import toOrderBook from './toOrderBook';
import api from './BfApi';

const Bf = {
  api,
  adapter: crAdapterRouterDfOb(toKline, toOrderBook)
};

export default Bf
