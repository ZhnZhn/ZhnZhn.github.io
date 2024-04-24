import {
  fGetRouteCategory,
  crAdapterRouter
} from '../crAdapterRouter';

import crAdapterType1 from '../crAdapterType1';
import {
  crData,
  crConfOption
} from './fnAdapter';

import toCategoryAdapter from './toCategoryAdapter';

const toLineAdapter = crAdapterType1({
   crData,
   crConfOption
})
, adapter = crAdapterRouter({
  getRoute: fGetRouteCategory(
    toCategoryAdapter,
    toLineAdapter
  )
});

export default adapter
