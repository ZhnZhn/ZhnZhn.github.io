import {
  crAdapterGetRoute,
  fGetRouteBarTreeMap
} from "../crAdapterRouter";

import crToTreeMapAdapter from "./crToTreeMapAdapter";
import { crToBarTreeMapAdapter } from "./toBarTreeMapAdapter";
import toCategoryAdapter from "./toCategoryAdapter";
import toLineAdapter from "./toLineAdapter";

const EmberAdapter = crAdapterGetRoute(fGetRouteBarTreeMap(
  crToBarTreeMapAdapter,
  crToTreeMapAdapter,
  toCategoryAdapter,
  toLineAdapter
));

export default EmberAdapter
