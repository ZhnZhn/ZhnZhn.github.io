import { crAdapterRouterDfOb } from '../crAdapterRouter';
import toKline from './toKline';
import api from './BbApi';

const Bb = {
  api,
  adapter: crAdapterRouterDfOb(toKline)
};

export default Bb
