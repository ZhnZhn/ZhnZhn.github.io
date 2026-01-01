import { isNumber } from "../../utils/isTypeFn";

import { ymdToUTC } from "../AdapterFn";
import { compareByDate } from "../compareByFn";
import { crAdapterType1 } from "../crAdapterType1";

import {
  getData,
  crZhConfig
} from "./NdlFn";

const crData = (
  json,
  option
) => {
  const points = getData(json).sort(compareByDate)
  , data = [];

  for (const point of points) {
    const value = point[1];
    if (isNumber(value)) {
      data.push([ymdToUTC(point[0]), value]);
    }
  }

  return data;
};

export const toLineAdapter = crAdapterType1({
  crData,
  crConfOption: option => ({
    zhConfig: crZhConfig(option)
  })
})
