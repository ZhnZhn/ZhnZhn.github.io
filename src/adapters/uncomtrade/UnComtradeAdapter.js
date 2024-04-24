import { crChartId } from './fnAdapter';
import getRoute from './toConfig';
import { crAdapterRouter } from '../crAdapterRouter';

const UnComtradeAdapter = crAdapterRouter({
  getRoute,
  crDfKey: crChartId
});

export default UnComtradeAdapter
