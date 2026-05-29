import {
  crAdapterGetRoute,
  fGetRouteCategory
} from '../crAdapterRouter';

import toCategoryAdapter from './toCategoryAdapter';
import toLineAdapter from './toLineAdapter';

const OecdAdapter = crAdapterGetRoute(fGetRouteCategory(
  toCategoryAdapter,
  toLineAdapter
));

export default OecdAdapter
