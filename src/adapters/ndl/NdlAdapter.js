import {
  CHT_AREA,
  CHT_SPLINE,
  CHT_LINE,
  CHT_COLUMN,
  CHT_YEARLY,
  CHT_AREA_YEARLY
} from "../../constants/ChartType";

import { crGetRoute } from "../AdapterFn";
import { crAdapterRouter } from "../crAdapterRouter";

import { toLineAdapter } from "./toLineAdapter";
import { toYearlyAdapter } from "./toYearlyAdapter";

const _getAdapterRoute = crGetRoute({
  [CHT_AREA]: toLineAdapter,
  [CHT_SPLINE]: toLineAdapter,
  [CHT_LINE]: toLineAdapter,
  [CHT_COLUMN]: toLineAdapter,

  [CHT_YEARLY]:  toYearlyAdapter,
  [CHT_AREA_YEARLY]: toYearlyAdapter
}, toLineAdapter)

const NdlAdapter = crAdapterRouter({
  getRoute: ({ seriaType }) => _getAdapterRoute(seriaType)
});

export default NdlAdapter
