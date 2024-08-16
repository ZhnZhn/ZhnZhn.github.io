import { crAdapterType1 } from '../crAdapterType1';
import crFromYearData from '../crFromYearData';
import toCategoryAdapter from '../toCategoryAdapter';
import {
  fGetRouteBarTreeMap,
  crAdapterRouter
} from '../crAdapterRouter';

import toTreeMapAdapter from './toTreeMapAdapter';
import toBarTreeMapAdapter from './toBarTreeMapAdapter';

const toLineAdapter = crAdapterType1({
  crData: crFromYearData
})
, IeAdapter = crAdapterRouter({
  getRoute: fGetRouteBarTreeMap(
    toBarTreeMapAdapter,
    toTreeMapAdapter,
    toCategoryAdapter,
    toLineAdapter
  )
});

export default IeAdapter
