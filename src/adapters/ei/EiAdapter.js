import {
  crAdapterGetRoute,
  fGetRouteBarTreeMap
} from '../crAdapterRouter';

import toBarTreeMapAdapter from '../toBarTreeMapAdapter';
import { toTimeSeriesTreeMapAdapter } from '../fToTreeMapAdapter'
import { toTsCategoryAdapter } from '../toTsCategoryAdapter';
import { toTsLineAdapter } from '../toTsLineAdapter';

const IeAdapter = crAdapterGetRoute(fGetRouteBarTreeMap(
  toBarTreeMapAdapter,
  toTimeSeriesTreeMapAdapter,
  toTsCategoryAdapter,
  toTsLineAdapter
))

export default IeAdapter
