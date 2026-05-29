import {
  crAdapterGetRoute,
  fGetRouteCategory
} from '../crAdapterRouter';

import toCategoryAdapter from './toCategoryAdapter';
import toLineAdapter from './toLineAdapter';

const EiaAdapter = crAdapterGetRoute(fGetRouteCategory(
  toCategoryAdapter,
  toLineAdapter
));

export default EiaAdapter
