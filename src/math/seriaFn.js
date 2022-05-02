import Big from 'big.js'

import mathFn from './mathFn'
import fIndicatorCalc from './fIndicatorCalc'
import roc from './roc'
import {
  isNotEmptyArr,
  isNumber,
  crPointGetter,
  fGetY,
  getZeroCountFromStart,
  getZeroIndexFromEnd
} from './seriaHelperFn';

const _isArr = Array.isArray
, _isNaN = Number.isNaN;

const _calcChanges = (yPrev, yNext) => {
  if (!isNumber(yPrev) || !isNumber(yNext)) {
    return null;
  }
  return parseFloat(Big(yNext).minus(yPrev).toString());
};


const _fFindY = (initialValue, findY) => (data) => {
  if (!isNotEmptyArr(data)){
    return;
  }
  let resultY = initialValue;
  const { getY } = crPointGetter(data)
  , _fn = (p, currentY) => {
      const pointY = getY(p);
      return findY(pointY, currentY);
  };
  let i = 0;
  for (; i<data.length; i++){
    resultY = _fn(data[i], resultY)
  }
  return resultY !== initialValue
    ? mathFn.toFixedNumber(resultY)
    : void 0;
};
const _findMinY = (y, min) => isNumber(y) && y<min
  ? y : min;
const _findMaxY = (y, max) => isNumber(y) && y>max
  ? y : max;

export const growthRate = fIndicatorCalc(roc)
export const changesBetween = fIndicatorCalc(_calcChanges)

export const normalize = (d) => {
  if (!isNotEmptyArr(d)) {
    return [];
  }
  const { getX, getY } = crPointGetter(d)
  , _y0 = getY(d[0]);
  if ( !(isNumber(_y0) && _y0 !== 0) ) {
    return [];
  }

  const _d = [];
  let i = 0;
  for(; i<d.length; i++) {
    _d.push([
      getX(d[i]),
      parseFloat(
        Big(getY(d[i])).div(_y0)
         .times(100)
         .toFixed(2)
      )
    ])
  }

  return _d;
}

export const findMinY = _fFindY(Number.POSITIVE_INFINITY, _findMinY)
export const findMaxY = _fFindY(Number.NEGATIVE_INFINITY, _findMaxY)

export const filterTrimZero = (data) => {
  if (!_isArr(data)) { return data; }

  const _getY = fGetY(data[0]);
  if (!_getY) { return data; }

  const _countZero = getZeroCountFromStart(data, _getY)
  if (_countZero) {
    data.splice(0, _countZero)
  }
  const _zeroIndex = getZeroIndexFromEnd(data, _getY)
  if (_zeroIndex){
    data.splice(_zeroIndex)
  }
  return data;
}

export const mean = (data) => {
  if (!isNotEmptyArr(data)){
    return [];
  }
  const { getY, getX } = crPointGetter(data);
  let _sum = Big(0)
  , _numberOfPoints = 0
  , i = 0
  , _y;
  for (;i<data.length;i++) {
    _y = getY(data[i])
    if (isNumber(_y)) {
      _sum = _sum.add(_y)
      _numberOfPoints++
    }
  }
  const _maxIndex = data.length - 1
  , _avg = _numberOfPoints !== 0
      ? parseInt(_sum.div(_numberOfPoints).toFixed(0), 10)
      : NaN;
  return _isNaN(_avg) ? []
   : [
       [getX(data[0]), _avg],
       [getX(data[_maxIndex]), _avg]
     ];
}

export const median = (data) => {
  if (!isNotEmptyArr(data)){
    return [];
  }
  const { getY, getX } = crPointGetter(data);

  const _d = data
    .map(getY)
    .sort((a, b) => a-b)
  , _len = data.length
  , _half = _len/2
  , _median = _half % 2 === 0
     ? Math.round((_d[_half-1] + _d[_half])/2)
     : _d[Math.round(_half) - 1];
  return [
    [getX(data[0]), _median],
    [getX(data[_len-1]), _median],
  ];
}
