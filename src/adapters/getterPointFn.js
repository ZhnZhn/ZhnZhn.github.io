import { 
  isArr,
  isNumber
} from './AdapterFn';

export const getPointDate = point =>isArr(point)
  ? point[0]
  : (point || {}).x;

export const getPointValue = point => isArr(point)
  ? isNumber(point[1])
      ? point[1]
      : '0.0'
  : point && isNumber(point.y)
      ? point.y
      : '0.0';
