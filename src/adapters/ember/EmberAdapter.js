import {
  fGetRouteBarTreeMap,
  crAdapterRouter
} from "../crAdapterRouter";

import crToTreeMapAdapter from "./crToTreeMapAdapter";
import { toBarTreeMapAdapter } from "./toBarTreeMapAdapter";
import toCategoryAdapter from "./toCategoryAdapter";
import toLineAdapter from "./toLineAdapter";

const EmberAdapter = crAdapterRouter({
  getRoute: fGetRouteBarTreeMap(
    toBarTreeMapAdapter,
    crToTreeMapAdapter,
    toCategoryAdapter,
    toLineAdapter
  )
});

export default EmberAdapter
