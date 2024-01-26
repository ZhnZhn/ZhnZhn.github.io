import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import api from './CbApi';

const Cb = {
  api,
  adapter: crAdapterRouterDfOb(toKline)
};

export default Cb
