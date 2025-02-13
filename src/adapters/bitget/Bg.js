import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import toOrderBook from './toOrderBook';
import api from './BgApi';

const Bg = {
  api,
  adapter: crAdapterRouterDfOb(toKline, toOrderBook)
};

export default Bg
