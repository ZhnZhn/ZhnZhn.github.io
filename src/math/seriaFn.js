import Big from 'big.js'

const fn = {
  growthRate: (d) => {
    if (!Array.isArray(d)) {
      return [];
    }
    const _d = []
        , max = d.length;
    let pPrev = d[0]
      , pNext
      , i=1;
    for (; i<max; i++){
      pNext = d[i];
      _d.push({
        x: pNext.x,
        y: pPrev.y !== 0
            ? parseFloat(
                Big(pNext.y - pPrev.y)
                .div(pPrev.y)
                .times(100)
                .toFixed(2)
              )
            : null
      })
      pPrev = pNext
    }
    return _d;
  }
};

export default fn
