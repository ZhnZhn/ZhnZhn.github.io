import Big from 'big.js'

import mathFn from './mathFn'
import fns from './seriaHelperFn'

const {
  isNumber,
  isPointArr,
  fGetY,
  getZeroCountFromStart,
  getZeroIndexFromEnd
} = fns

const _isArr = Array.isArray;

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
    Big(yNext - yPrev)
      .div(Math.abs(yPrev))
      .times(100)
      .toFixed(2)
    );
};

const fn = {
  growthRate: (d, rt=1) => {
    const _rt = parseInt(rt, 10);
    if ( !(_isArr(d) && isNumber(_rt)) ) {
      return [];
    }

    const _d = []
    , max = d.length
    , prevStep = _rt-1;
    let pPrev = d[0]
      , pNext
      , i=_rt;
    for (; i<max; i++){
      pNext = d[i];
      _d.push([
        pNext.x,
        _calcY(pPrev.y, pNext.y)
      ])
      pPrev = d[i-prevStep]
    }
    return _d;
  },

  normalize: (d) => {
    if (!_isArr(d)) {
      return [];
    }
    const _d = []
    , _max = d.length
    , _y0 = d[0].y;
    if (!isNumber(_y0) || _y0 === 0 || _max === 0) {
      return [];
    }
    for(let i=0; i<_max; i++) {
      _d.push([
        d[i].x,
        parseFloat(
          Big(d[i].y/_y0)
           .times(100)
           .toFixed(2)
        )
      ])
    }

    return _d;
  },

  findMinY: (data) => {
    if (!_isArr(data) || data.length<1 ) {
      return undefined;
    }
    let minY = Number.POSITIVE_INFINITY;
    const _fn = isNumber(data[0].y)
      ? (p, min) => isNumber(p.y) && p.y<min ? p.y : min
      : (arr, min) => isNumber(arr[1]) && arr[1]<min ? arr[1] : min;
    for (let i=0, max=data.length; i<max; i++){
      minY = _fn(data[i], minY)
    }
    return minY !== Number.POSITIVE_INFINITY
      ? mathFn.toFixedNumber(minY)
      : undefined;
  },
  findMaxY: (data) => {
    if (!_isArr(data) || data.length<1 ) {
      return undefined;
    }
    let maxY = Number.NEGATIVE_INFINITY;
    const _fn = isNumber(data[0].y)
      ? (p, max) => isNumber(p.y) && p.y>max ? p.y : max
      : (arr, max) => isNumber(arr[1]) && arr[1]>max ? arr[1] : max;
    for (let i=0, max=data.length; i<max; i++){
      maxY = _fn(data[i], maxY)
    }
    return maxY !== Number.NEGATIVE_INFINITY
      ? mathFn.toFixedNumber(maxY)
      : undefined;
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
    if ( !isPointArr(data) ) {
      return [];
    }
    let _sum = Big(0);
    for (const p of data) {
      if (isNumber(p[1])) {
        _sum = _sum.add(p[1])
      }
    }
    const _max = data.length - 1;
    const _avg = parseInt(_sum.div(_max).toFixed(0), 10);
    return [
      [data[0][0], _avg],
      [data[_max][0], _avg]
    ];
  },

  median: (data) => {
    if ( !isPointArr(data) ) {
      return [];
    }
    const _d = data
      .map(arrP => arrP[1])
      .sort((a, b) => a-b)
    , _len = data.length
    , _half = _len/2
    , _median = _half % 2 === 0
       ? Math.round((_d[_half-1] + _d[_half])/2)
       : _d[Math.round(_half) - 1];
    return [
      [data[0][0], _median],
      [data[_len-1][0], _median],
    ];
  }
};

export default fn
