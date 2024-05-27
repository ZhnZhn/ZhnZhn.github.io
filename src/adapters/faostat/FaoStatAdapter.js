import {
  fGetRouteCategory,
  crAdapterRouter
} from '../crAdapterRouter';

import toCategoryAdapter from './toCategoryAdapter';
import toSplineAdapter from './toSplineAdapter';

const FaoStatAdapter = crAdapterRouter({
  getRoute: fGetRouteCategory(
    toCategoryAdapter,
    toSplineAdapter
  )
});

export default FaoStatAdapter
