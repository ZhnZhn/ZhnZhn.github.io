import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import toOrderBook from './toOrderBook';
import api from './BnApi';

const Bn = {
  api,
  adapter: crAdapterRouterDfOb(toKline, toOrderBook)
};

export default Bn
