import {
  crAdapterGetRoute,
  fGetRouteCategory
} from '../crAdapterRouter';

import toCategoryAdapter from './toCategoryAdapter';
import toLineAdapter from './toLineAdapter';

const BisAdapter = crAdapterGetRoute(fGetRouteCategory(
  toCategoryAdapter,
  toLineAdapter
));

export default BisAdapter
