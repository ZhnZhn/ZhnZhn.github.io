import { crAdapterType1 } from '../crAdapterType1';
import crTsFromData from '../crTsFromData';
import { toTsCategoryAdapter } from '../toTsCategoryAdapter';

import {
  fGetRouteCategory,
  crAdapterRouter
} from '../crAdapterRouter';

const toLineAdapter = crAdapterType1({
  crData: crTsFromData
})
, IrenaAdapter = crAdapterRouter({
  getRoute: fGetRouteCategory(
    toTsCategoryAdapter,
    toLineAdapter
  )
});

export default IrenaAdapter
