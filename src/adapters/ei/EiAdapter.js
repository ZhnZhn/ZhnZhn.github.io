import crAdapterType1 from '../crAdapterType1';
import crFromYearData from '../crFromYearData';
import toCategoryAdapter from '../toCategoryAdapter';
import {
  fGetRouteTreeMap,
  crAdapterRouter
} from '../crAdapterRouter';

import toTreeMapAdapter from './toTreeMapAdapter';

const toLineAdapter = crAdapterType1({
  crData: crFromYearData
})
, IeAdapter = crAdapterRouter({
  getRoute: fGetRouteTreeMap(
    toTreeMapAdapter,
    toCategoryAdapter,
    toLineAdapter
  )
})

export default IeAdapter
