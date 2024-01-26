import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import api from './KrApi';

const Kr = {
  api,
  adapter: crAdapterRouterDfOb(toKline)
};

export default Kr
