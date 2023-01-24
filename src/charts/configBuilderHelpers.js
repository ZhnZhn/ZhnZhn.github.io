import {
  findMinY,
  findMaxY
} from '../math/seriaFn';

import {
  isObj,
  isNumber,
} from '../utils/isTypeFn';

import {
  calcMinY
} from './ChartFn';

const _isArr = Array.isArray
, _assign = Object.assign;

export const assignTo = (
  obj,
  propName,
  value
) => {
  obj[propName] = isObj(value) && !_isArr(value)
    ? _assign(obj[propName] || {}, value)
    : value
};

export const getYFromPoint = (
  point
) => _isArr(point)
  ? point[1]
  : point && point.y || 0;

export const getFirstSeriaData = obj => obj.config?.series?.[0].data
 || [];

const _fFindY = findY => (
  y,
  data
) => isNumber(y) ? y : findY(data)

export const findMinYData = _fFindY(findMinY)
export const findMaxYData = _fFindY(findMaxY)

export const calcYAxisMin = (
  min,
  max,
  noZoom
) => noZoom && min > 0
   ? 0
   : calcMinY(min, max);
