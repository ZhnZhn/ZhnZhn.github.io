import { crChartId } from './fnAdapter';
import getRoute from './toConfig';
import crAdapterRouter from '../crAdapterRouter';

const UnComtradeAdapter = crAdapterRouter(void 0, {
  getRoute,
  crDfKey: crChartId
});

export default UnComtradeAdapter
