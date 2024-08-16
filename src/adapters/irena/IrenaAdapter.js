import { crAdapterType1 } from '../crAdapterType1';
import crFromYearData from '../crFromYearData';
import toCategoryAdapter from '../toCategoryAdapter';

import {
  fGetRouteCategory,
  crAdapterRouter
} from '../crAdapterRouter';

const toLineAdapter = crAdapterType1({
  crData: crFromYearData
})
, IrenaAdapter = crAdapterRouter({
  getRoute: fGetRouteCategory(
    toCategoryAdapter,
    toLineAdapter
  )
});

export default IrenaAdapter
