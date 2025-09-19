import { crAdapterType1 } from '../crAdapterType1';
import crTsFromData from '../crTsFromData';
import { toTsCategoryAdapter } from '../toTsCategoryAdapter';
import {
  fGetRouteBarTreeMap,
  crAdapterRouter
} from '../crAdapterRouter';

import toTreeMapAdapter from './toTreeMapAdapter';
import toBarTreeMapAdapter from './toBarTreeMapAdapter';

const toLineAdapter = crAdapterType1({
  crData: crTsFromData
})
, IeAdapter = crAdapterRouter({
  getRoute: fGetRouteBarTreeMap(
    toBarTreeMapAdapter,
    toTreeMapAdapter,
    toTsCategoryAdapter,
    toLineAdapter
  )
});

export default IeAdapter
