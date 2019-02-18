import Big from 'big.js'

import mathFn from './mathFn'

const _isNumber = n => {
  if (typeof n === 'number') {
    return (n - n === 0);
  }
  return false;
};

const _calcY = (pPrev, pNext) => pPrev.y !== 0
  ? parseFloat(
      Big(pNext.y - pPrev.y)
       .div(pPrev.y)
       .times(100)
       .toFixed(2)
    )
  : null;

const fn = {
  growthRate: (d, rt=1) => {
    const _rt = parseInt(rt, 10);
    if (!Array.isArray(d)
        || typeof _rt !== 'number' ) {
      return [];
    }

    const _d = []
        , max = d.length;
    let pPrev = d[0]
      , pNext
      , i=_rt;
    for (; i<max; i++){
      pNext = d[i];
      _d.push({
        x: pNext.x,
        y: _calcY(pPrev, pNext)
      })
      pPrev = pNext
    }
    return _d;
  },

  normalize: (d) => {
    if (!Array.isArray(d)) {
      return [];
    }
    const _d = []
    , _max = d.length
    , _y0 = d[0].y;
    if (!_isNumber(_y0) || _y0 === 0 || _max === 0) {
      return [];
    }
    for(let i=0; i<_max; i++) {
      _d.push({
        x: d[i].x,
        y: parseFloat(
             Big(d[i].y/_y0)
              .times(100)
              .toFixed(2)
           )
      })
    }

    return _d;
  },

  findMinY: (data) => {
    if (!Array.isArray(data) || data.length<1 ) {
      return undefined;
    }
    let minY = Number.POSITIVE_INFINITY;
    const _fn = typeof data[0].y === 'number'
      ? (p, min) => p.y<min ? p.y : min
      : (arr, min) => arr[1]<min ? arr[1] : min;
    for (let i=0, max=data.length; i<max; i++){
      minY = _fn(data[i], minY)
    }
    return minY !== Number.POSITIVE_INFINITY
      ? mathFn.toFixedNumber(minY)
      : undefined;
  },
  findMaxY: (data) => {
    if (!Array.isArray(data) || data.length<1 ) {
      return undefined;
    }
    let maxY = Number.NEGATIVE_INFINITY;
    const _fn = typeof data[0].y === 'number'
      ? (p, max) => p.y>max ? p.y : max
      : (arr, max) => arr[1]>max ? arr[1] : max;
    for (let i=0, max=data.length; i<max; i++){
      maxY = _fn(data[i], maxY)
    }
    return maxY !== Number.NEGATIVE_INFINITY
      ? mathFn.toFixedNumber(maxY)
      : undefined;
  }
};

export default fn
