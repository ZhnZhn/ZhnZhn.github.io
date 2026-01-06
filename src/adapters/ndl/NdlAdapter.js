import { CHT_AREA_YEARLY } from "../../constants/ChartType";
import { crGetRoute } from "../../utils/crRouter";

import { isCategory } from "../CategoryFn";
import { crAdapterRouter } from "../crAdapterRouter";

import { toLineAdapter } from "./toLineAdapter";
import { toYearlyAdapter } from "./toYearlyAdapter";
import { toCategoryAdapter } from "./toCategoryAdapter";

const _getAdapterRoute = crGetRoute({
  [CHT_AREA_YEARLY]: toYearlyAdapter
}, toLineAdapter);

const NdlAdapter = crAdapterRouter({
  getRoute: ({ seriaType }) => isCategory(seriaType)
   ? toCategoryAdapter
   : _getAdapterRoute(seriaType)
});

export default NdlAdapter
