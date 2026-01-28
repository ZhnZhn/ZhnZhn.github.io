import {
  isArr,
  isNumber,
  isObj
} from '../utils/isTypeFn';
import { roundBy } from './mathFn';

export const getPointDate = point => isArr(point)
  ? point[0]
  : (point || {}).x

const _getDfPointValue = (
  dfValue
) => isNumber(dfValue)
 ? dfValue
 : '0.0';
export const getPointValue = (
  point,
  dfValue
) => isArr(point)
  ? isNumber(point[1])
    ? point[1]
    : _getDfPointValue(dfValue)
  : point && isNumber(point.y)
    ? point.y
    : _getDfPointValue(dfValue)

const _getDataPoint = arr => {
  if (!isArr(arr)) { return; }
  for (let i=0; i<arr.length; i++){
    if (isObj(arr[i])) { return arr[i]; }
  }
  return;
}

export const crPointGetter = data => {
  const _dataPoint = _getDataPoint(data);
  return _dataPoint
    ? isArr(_dataPoint)
       ? [p => p[0], p => p[1]]
       : [p => p.x, p => p.y]
    : [];
}

export const fGetY = (point) => {
  if (!point) { return; }
  if (isArr(point)) {
    return p => p[1];
  }
  if (isNumber(point.y)) {
    return p => p.y;
  }
  return;
}

export const getZeroCountFromStart = (arr, getY) => {
  let _toIndex = -1, i=0;
  for(; i<arr.length; i++){
    const _y = getY(arr[i])
    if (_y === 0 || _y === null){
      _toIndex = i
    } else {
      break;
    }
  }
  return _toIndex + 1;
}

export const getZeroIndexFromEnd = (arr, getY) => {
  let _zeroIndex = 0;
  for(let i=arr.length-1; i>-1; i--){
    const _y = getY(arr[i])
    if (_y === 0 || _y === null){
      _zeroIndex = i
    } else {
      break;
    }
  }
  return _zeroIndex;
}

/*************************************************/
/***********TA*Series*Helpers*********************/

export const crDataArrays = (
  data
) => {
  const _data = []
  , _dataX = []
  , [
    getX,
    getY
  ] = crPointGetter(data);
  let y;

  if (getX) {
    data.forEach(p => {
      y = getY(p);
      if (isNumber(y)) {
        _data.push(y)
        _dataX.push(getX(p))
      }
    })
  }

  return [
    _data,
    _dataX
  ];
}

export const mergeToChartPoints = (
  dataX,
  values,
  by
) => dataX
 .reduce((result, x, i) => {
    result.push([
      x,
      roundBy(values[i], by)
    ])
    return result;
 }, []);
