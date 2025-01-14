import { crDfItemKey } from "../AdapterFn";
import { crAdapterRouter } from "../crAdapterRouter";

import toChartConfig from "./toChartConfig";
import toTwConfig from "./toTwConfig";
import toCiConfig from "./toCiConfig";

const CpAdapter = crAdapterRouter({
  rAdapter: {
    DF: toChartConfig,
    TW: toTwConfig,
    CI: toCiConfig
  },
  crDfKey: crDfItemKey
});

export default CpAdapter
