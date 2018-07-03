import Big from 'big.js'

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
  }
};

export default fn
