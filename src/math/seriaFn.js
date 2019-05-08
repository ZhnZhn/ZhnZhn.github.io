import Big from 'big.js'

import mathFn from './mathFn'

const _isArr = Array.isArray;
const _isNumber = n => typeof n === 'number'
  ? (n - n === 0)
  : false;

const _calcY = (pPrev, pNext) => pPrev.y !== 0
  ? parseFloat(
      Big(pNext.y - pPrev.y)
       .div(pPrev.y)
       .times(100)
       .toFixed(2)
    )
  : null;

const _isDataArr = data => _isArr(data)
  && data.length > 1
  && _isArr(data[0]);

const fn = {
  growthRate: (d, rt=1) => {
    const _rt = parseInt(rt, 10);
    if ( !(_isArr(d) && _isNumber(_rt)) ) {
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
      _d.push({
        x: pNext.x,
        y: _calcY(pPrev, pNext)
      })
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
    if (!_isArr(data) || data.length<1 ) {
      return undefined;
    }
    let minY = Number.POSITIVE_INFINITY;
    const _fn = _isNumber(data[0].y)
      ? (p, min) => _isNumber(p.y) && p.y<min ? p.y : min
      : (arr, min) => _isNumber(arr[1]) && arr[1]<min ? arr[1] : min;
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
    const _fn = _isNumber(data[0].y)
      ? (p, max) => _isNumber(p.y) && p.y>max ? p.y : max
      : (arr, max) => _isNumber(arr[1]) && arr[1]>max ? arr[1] : max;
    for (let i=0, max=data.length; i<max; i++){
      maxY = _fn(data[i], maxY)
    }
    return maxY !== Number.NEGATIVE_INFINITY
      ? mathFn.toFixedNumber(maxY)
      : undefined;
  },

  mean: (data) => {
    if ( !_isDataArr(data) ) {
      return [];
    }
    let _sum = Big(0);
    for (const p of data) {
      if (_isNumber(p[1])) {
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
    if ( !_isDataArr(data) ) {
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
