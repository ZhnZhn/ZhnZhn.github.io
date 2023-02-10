import { roundBy } from './mathFn';

const _isArr = Array.isArray
, _isNumber = n => typeof n === "number"
  && (n-n === 0)
, _isObj = obj => typeof obj === "object"
  && obj !== null;

export const isNumber = _isNumber

const _getDataPoint = arr => {
  if (!_isArr(arr)) { return; }
  for (let i=0; i<arr.length; i++){
    if (_isObj(arr[i])) { return arr[i]; }
  }
  return;
}

export const crPointGetter = data => {
  const _dataPoint = _getDataPoint(data);
  return _dataPoint
    ? _isArr(_dataPoint)
       ? [p => p[0], p => p[1]]
       : [p => p.x, p => p.y]
    : [];
}

export const fGetY = (point) => {
  if (!point) { return; }
  if (_isArr(point)) {
    return p => p[1];
  }
  if (_isNumber(point.y)) {
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
