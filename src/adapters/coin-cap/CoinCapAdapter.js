import { crDfItemKey } from "../AdapterFn";
import { crAdapterRouter } from "../crAdapterRouter";

import { toAssetListAdapter } from "./toAssetListAdapter";
import { toHistoryChartAdapter } from "./toHistoryChartAdapter";

const CoinCapAdapter = crAdapterRouter({
  rAdapter: {
    MCL: toAssetListAdapter,
    HMC: toHistoryChartAdapter
  },
  crDfKey: crDfItemKey
});

export default CoinCapAdapter
