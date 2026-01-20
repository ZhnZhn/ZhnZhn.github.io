import Big from 'big.js';

import {
  isArr,
  isNumber,
  parseIntBy10
} from '../utils/isTypeFn';

import { dmyToUTC } from '../utils/dateFn';

import {
  NEGATIVE_INFINITY,
  POSITIVE_INFINITY,
  toFixedNumber
} from './mathFn';
import fIndicatorCalc from './fIndicatorCalc';
import diff from './diff';
import roc from './roc';
import {
  crPointGetter,
  fGetY,
  getZeroCountFromStart,
  getZeroIndexFromEnd
} from './seriaHelperFn';

const _calcChanges = (
  yPrev,
  yNext
) => !isNumber(yPrev) || !isNumber(yNext)
  ? null
  : diff(yNext, yPrev);

const _fFindY = (
  initialValue,
  findY
) => (data) => {
  const getY = crPointGetter(data)[1];
  if (!getY) {
    return;
  }

  const _fn = (p, currentY) => {
    const pointY = getY(p);
    return findY(pointY, currentY);
  };
  let resultY = initialValue
  , i = 0;
  for (; i<data.length; i++){
    resultY = _fn(data[i], resultY)
  }
  return resultY !== initialValue
    ? toFixedNumber(resultY)
    : void 0;
};
const _findMinY = (y, min) => isNumber(y) && y<min
  ? y : min;
const _findMaxY = (y, max) => isNumber(y) && y>max
  ? y : max;

export const growthRate = fIndicatorCalc(roc)
export const changesBetween = fIndicatorCalc(_calcChanges)

export const findDateIndex = (
  points,
  strDmy
) => {
  const getX = crPointGetter(points)[0]
  , mlsUTC = dmyToUTC(strDmy);
  if (!isNumber(mlsUTC)) {
    return -1;
  }
  for(let i=0; i<points.length; i++){
    if (getX(points[i]) === mlsUTC) {
      return i;
    }
  }
  return -1;
}

export const normalize = (
  d,
  strDmy
) => {
  const [getX, getY] = crPointGetter(d);
  if (!getX) {
    return [];
  }

  const _dmyIndex = strDmy
    ? findDateIndex(d, strDmy)
    : -1
  , _dateIndex = _dmyIndex === -1
    ? 0
    : _dmyIndex
  , _y = getY(d[_dateIndex]);
  if (!isNumber(_y) || _y === 0) {
    return [];
  }

  const _d = [];
  for (let p of d){
    _d.push([
      getX(p),
      parseFloat(
        Big(getY(p)).div(_y)
         .times(100)
         .toFixed(2)
      )
    ])
  }

  return _d;
}

export const findMinY = _fFindY(POSITIVE_INFINITY, _findMinY)
export const findMaxY = _fFindY(NEGATIVE_INFINITY, _findMaxY)

export const filterTrimZero = (data) => {
  if (!isArr(data)) { return data; }

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

export const hasZeroOrLessValue = data => {
  if (!isArr(data)) { return false; }
  const _getY = fGetY(data[0]);
  for(let i=0; i<data.length; i++){
    if (_getY(data[i]) <= 0) {
      return true;
    }
  }
  return false;
}

export const mean = (data) => {
  const [getX, getY] = crPointGetter(data);
  if (!getX) {
    return [];
  }

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
  , _avg = _numberOfPoints === 0
      ? ''
      : parseIntBy10(_sum.div(_numberOfPoints).toFixed(0))
  return isNumber(_avg) ? [
      [getX(data[0]), _avg],
      [getX(data[_maxIndex]), _avg]
    ] : [];
}

export const median = (data) => {
  const [getX, getY] = crPointGetter(data);
  if (!getX) {
    return [];
  }

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
