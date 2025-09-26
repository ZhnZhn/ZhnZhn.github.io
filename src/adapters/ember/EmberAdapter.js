import {
  fGetRouteBarTreeMap,
  crAdapterRouter
} from "../crAdapterRouter";

import crToTreeMapAdapter from "./crToTreeMapAdapter";
import { crToBarTreeMapAdapter } from "./toBarTreeMapAdapter";
import toCategoryAdapter from "./toCategoryAdapter";
import toLineAdapter from "./toLineAdapter";

const EmberAdapter = crAdapterRouter({
  getRoute: fGetRouteBarTreeMap(
    crToBarTreeMapAdapter,
    crToTreeMapAdapter,
    toCategoryAdapter,
    toLineAdapter
  )
});

export default EmberAdapter
