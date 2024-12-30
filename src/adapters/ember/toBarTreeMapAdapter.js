import crAdapterCategory from "../crAdapterCategory";
import { crCategoryPoint } from "../CategoryFn";
import { sortDescCategory } from "../compareByFn";
import { crItemColor } from "../fToTreeMapAdapter";

import {
  crGetItemLabelValue,
  isTreeMapItem
} from "./fnAdapter";

const crData = (
  json,
  option
) => {
  const getItemLabelValue = crGetItemLabelValue(option);
  return sortDescCategory(json.reduce((data, item) => {
    const [
      label,
      value
    ] = getItemLabelValue(item);
    if (isTreeMapItem(label, value)) {
      const point = crCategoryPoint(
        value,
        label
      );
      point.color = crItemColor(label)
      data.push(point)
    }
    return data;
  }, []));
};

export const toBarTreeMapAdapter = crAdapterCategory(crData)
