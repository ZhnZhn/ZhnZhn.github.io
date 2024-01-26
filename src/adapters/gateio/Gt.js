import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import api from './GtApi';

const Gt = {
  api,
  adapter: crAdapterRouterDfOb(toKline)
};

export default Gt
