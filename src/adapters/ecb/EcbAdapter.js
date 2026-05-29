import {
  crAdapterGetRoute,
  fGetRouteCategory
} from '../crAdapterRouter';

import toCategoryAdapter from './toCategoryAdapter';
import toLineAdapter from './toLineAdapter';

const EcbAdapter = crAdapterGetRoute(fGetRouteCategory(
  toCategoryAdapter,
  toLineAdapter
));

export default EcbAdapter
