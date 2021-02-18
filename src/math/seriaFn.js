import Big from 'big.js'

import mathFn from './mathFn'
import roc from './roc'
import fns from './seriaHelperFn'

const {
  isNumber,
  crPointGetter,
  fGetY,
  getZeroCountFromStart,
  getZeroIndexFromEnd
} = fns

const _isArr = Array.isArray
, _isNaN = Number.isNaN;

const _isNotEmptyArr = arr => _isArr(arr)
 && arr.length > 0;

/*
const _calcY = (yPrev, yNext) => {

  if (!isNumber(yPrev) || !isNumber(yNext)) {
    return null;
  }

  if (yNext === 0) {
    return yPrev === 0
      ? 0
      : yPrev > 0 ? -100 : 100;
  }

  if (yPrev === 0) {
    return null;
  }

  return parseFloat(
    Big(yNext).minus(yPrev)
      .div(Math.abs(yPrev))
      .times(100)
      .toFixed(2)
    );
};
*/

const _calcChanges = (yPrev, yNext) => {
  if (!isNumber(yPrev) || !isNumber(yNext)) {
    return null;
  }
  return parseFloat(Big(yNext).minus(yPrev).toString());
};

const _crIndicatorData = (d, rt, calc) => {
  const _d = []
  , max = d.length
  , prevStep = rt-1
  , { getX, getY } = crPointGetter(d);
  let pPrev = d[0]
    , pNext
    , i=rt;
  for (; i<max; i++){
    pNext = d[i];
    _d.push([
      getX(pNext),
      calc(getY(pPrev), getY(pNext))
    ])
    pPrev = d[i-prevStep]
  }
  return _d;
}

const _fIndicator = (calc) => (d, rt=1) => {
  const _rt = parseInt(rt, 10);
  if ( !(_isArr(d) && isNumber(_rt)) ) {
    return [];
  }
  return _crIndicatorData(d, _rt, calc);
};

const fn = {
  //growthRate: _fIndicator(_calcY),
  growthRate: _fIndicator(roc),
  changesBetween: _fIndicator(_calcChanges),

  normalize: (d) => {
    if ( !(_isArr(d) && d[0]) ) {
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
  },

  findMinY: (data) => {
    if ( !(_isArr(data) && data.length) ) {
      return void 0;
    }
    let minY = Number.POSITIVE_INFINITY;
    const _fn = isNumber(data[0].y)
      ? (p, min) => isNumber(p.y) && p.y<min ? p.y : min
      : (arr, min) => isNumber(arr[1]) && arr[1]<min ? arr[1] : min;
    let i = 0;
    for (; i<data.length; i++){
      minY = _fn(data[i], minY)
    }
    return minY !== Number.POSITIVE_INFINITY
      ? mathFn.toFixedNumber(minY)
      : void 0;
  },
  findMaxY: (data) => {
    if (! (_isArr(data) && data.length) ) {
      return void 0;
    }
    let maxY = Number.NEGATIVE_INFINITY;
    const _fn = isNumber(data[0].y)
      ? (p, max) => isNumber(p.y) && p.y>max ? p.y : max
      : (arr, max) => isNumber(arr[1]) && arr[1]>max ? arr[1] : max;
    let i = 0;
    for (; i<data.length; i++){
      maxY = _fn(data[i], maxY)
    }
    return maxY !== Number.NEGATIVE_INFINITY
      ? mathFn.toFixedNumber(maxY)
      : void 0;
  },

  filterTrimZero: (data) => {
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
  },

  mean: (data) => {
    if (!_isNotEmptyArr(data)){
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
  },

  median: (data) => {
    if (!_isNotEmptyArr(data)){
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
};

export default fn
