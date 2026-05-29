import {
  crAdapterGetRoute,
  fGetRouteCategory
} from '../crAdapterRouter';

import toCategoryAdapter from './toCategoryAdapter';
import toLineAdapter from './toLineAdapter';

const WtAdapter = crAdapterGetRoute(fGetRouteCategory(
  toCategoryAdapter,
  toLineAdapter
));

export default WtAdapter
