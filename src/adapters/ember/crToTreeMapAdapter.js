import {
  crItemColor,
  fToTreeMapAdapter,
  toTimeSeriesTreeMapAdapter
} from "../fToTreeMapAdapter";

import {
  crGetItemLabelValue,
  isTreeMapItem,
  isTsRoute,
} from "./fnAdapter";

const crToTreeMapAdapter = (option) => {
  if (isTsRoute(option)) {
    return toTimeSeriesTreeMapAdapter;
  }
  const getItemLabelValue = crGetItemLabelValue(option)
  , getDataTotalTuple = json => json
      .reduce((tuple, item) => {
         const [
           label,
           value
         ] = getItemLabelValue(item);
         if (isTreeMapItem(label, value)) {
           item.label = label
           item.value = value
           item.color = crItemColor(label)
           tuple[0].push(item)
           tuple[1] += value
         }
         return tuple;
      }, [[], 0]);
  return fToTreeMapAdapter(
     getDataTotalTuple
  );
};

export default crToTreeMapAdapter
