import {
  fGetRouteTreeMap,
  crAdapterRouter
} from '../crAdapterRouter';

import crToTreeMapAdapter from './crToTreeMapAdapter';
import toCategoryAdapter from './toCategoryAdapter';
import toLineAdapter from './toLineAdapter';

const EmberAdapter = crAdapterRouter({
  getRoute: fGetRouteTreeMap(
    crToTreeMapAdapter,
    toCategoryAdapter,
    toLineAdapter
  )
});

export default EmberAdapter
