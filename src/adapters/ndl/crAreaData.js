import {
  isNumber,
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';

import { getData } from './NdlFn';

const crAreaData = (
  json,
  option
) => {
  const points = getData(json).sort(compareByDate)
  , seria = [];
  let minY = Number.POSITIVE_INFINITY
  , maxY = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const value = point[1];
    if (isNumber(value)) {
      seria.push([ymdToUTC(point[0]), value]);
      if (value>maxY) { maxY = value; }
      if (value<minY) { minY = value; }
    }
  }

  return {
    seria,
    minY,
    maxY,
    zhPoints: points
  };
};

export default crAreaData
