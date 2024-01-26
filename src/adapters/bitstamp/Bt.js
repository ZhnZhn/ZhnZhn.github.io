import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import toOrderBook from './toOrderBook';
import api from './BtApi';

const Bt = {
  api,
  adapter: crAdapterRouterDfOb(toKline, toOrderBook)
};

export default Bt
