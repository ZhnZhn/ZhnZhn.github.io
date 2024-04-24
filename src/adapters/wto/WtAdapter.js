import {
  fGetRouteCategory,
  crAdapterRouter
} from '../crAdapterRouter';

import toCategoryAdapter from './toCategoryAdapter';
import toLineAdapter from './toLineAdapter';

const WtAdapter = crAdapterRouter({
  getRoute: fGetRouteCategory(
    toCategoryAdapter,
    toLineAdapter
  )
});

export default WtAdapter
