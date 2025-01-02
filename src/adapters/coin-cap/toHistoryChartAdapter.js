import { roundByOHLC } from "../AdapterFn";
import {
  fCrDataType1,
  crAdapterType1
} from "../crAdapterType1";

const crData = fCrDataType1(
  json => json.data,
  () => item => [
    item.time,
    roundByOHLC(parseFloat(item.priceUsd))
  ]
);

export const toHistoryChartAdapter = crAdapterType1({
  crData
})
