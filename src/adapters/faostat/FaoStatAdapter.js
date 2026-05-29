import {
  crAdapterGetRoute,
  fGetRouteTreeMap
} from '../crAdapterRouter';

import toTreeMapAdapter from './toTreeMapAdapter';
import toCategoryAdapter from './toCategoryAdapter';
import toSplineAdapter from './toSplineAdapter';

const FaoStatAdapter = crAdapterGetRoute(fGetRouteTreeMap(
  toTreeMapAdapter,
  toCategoryAdapter,
  toSplineAdapter
));

export default FaoStatAdapter
