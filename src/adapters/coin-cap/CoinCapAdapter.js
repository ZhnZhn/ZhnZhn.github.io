import { crDfItemKey } from "../AdapterFn";
import { crAdapterRouter } from "../crAdapterRouter";

import { toAssetList } from "./toAssetList";
import { toExchangeList } from "./toExchangeList";
import { toHistoryChart } from "./toHistoryChart";

const CoinCapAdapter = crAdapterRouter({
  rAdapter: {
    MCL: toAssetList,
    EVL: toExchangeList,
    HMC: toHistoryChart
  },
  crDfKey: crDfItemKey
});

export default CoinCapAdapter
