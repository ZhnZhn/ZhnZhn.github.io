import {
  findMinY,
  findMaxY
} from '../math/seriaFn';

import {
  isArr,
  isObj,
  isNumber,
} from '../utils/isTypeFn';

const _assign = Object.assign;

export const assignTo = (
  obj,
  propName,
  value
) => {
  obj[propName] = isObj(value) && !isArr(value)
    ? _assign(obj[propName] || {}, value)
    : value
};

export const getFirstSeriaData = obj => obj.config?.series?.[0].data
 || [];

const _fFindY = findY => (
  y,
  data
) => isNumber(y) ? y : findY(data)

export const findMinYData = _fFindY(findMinY)
export const findMaxYData = _fFindY(findMaxY)
