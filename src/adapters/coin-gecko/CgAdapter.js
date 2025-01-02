import { crAdapterRouter } from "../crAdapterRouter"
import { crDfItemKey } from "../AdapterFn"

import toChart from "./toChart"
import toExchangeList from "./toExchangeList"
import toExchangeVolume from "./toExchangeVolume"
import toMarketCapList from "./toMarketCapList"

const CgAdapter = crAdapterRouter({
  rAdapter: {
    DF: toChart,
    EL: toExchangeList,
    EV: toExchangeVolume,
    MCL: toMarketCapList
  },
  crDfKey: crDfItemKey
});

export default CgAdapter
