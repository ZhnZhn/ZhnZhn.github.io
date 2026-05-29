import {
  crAdapterGetRoute,
  fGetRouteCategory
} from '../crAdapterRouter';

import { crAdapterType1 } from '../crAdapterType1';
import {
  crData,
  crConfOption
} from './fnAdapter';

import toCategoryAdapter from './toCategoryAdapter';

const toLineAdapter = crAdapterType1({
   crData,
   crConfOption
})
, adapter = crAdapterGetRoute(fGetRouteCategory(
   toCategoryAdapter,
   toLineAdapter
));

export default adapter
