import {
  fGetRouteCategory,
  crAdapterRouter
} from '../crAdapterRouter';

import toCategoryAdapter from './toCategoryAdapter';
import toLineAdapter from './toLineAdapter';

const BisAdapter = crAdapterRouter({
  getRoute: fGetRouteCategory(
    toCategoryAdapter,
    toLineAdapter
  )
});

export default BisAdapter
