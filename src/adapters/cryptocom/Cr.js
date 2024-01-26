import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import api from './CrApi';

const Cr = {
  api,
  adapter: crAdapterRouterDfOb(toKline)
};

export default Cr
