import {
  fGetRouteTreeMap,
  crAdapterRouter
} from '../crAdapterRouter';

import toTreeMapAdapter from './toTreeMapAdapter';
import toCategoryAdapter from './toCategoryAdapter';
import toSplineAdapter from './toSplineAdapter';

const FaoStatAdapter = crAdapterRouter({
  getRoute: fGetRouteTreeMap(
    toTreeMapAdapter,
    toCategoryAdapter,
    toSplineAdapter
  )
});

export default FaoStatAdapter
