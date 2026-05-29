import {
  crAdapterGetRoute,
  fGetRouteCategory
} from '../crAdapterRouter';

import { toTsCategoryAdapter } from '../toTsCategoryAdapter';
import { toTsLineAdapter } from '../toTsLineAdapter';

const IrenaAdapter = crAdapterGetRoute(fGetRouteCategory(
  toTsCategoryAdapter,
  toTsLineAdapter
))

export default IrenaAdapter
