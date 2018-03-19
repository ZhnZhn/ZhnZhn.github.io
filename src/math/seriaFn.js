import Big from 'big.js'

const fn = {
  growthRate: (d1=[]) => {
    const d3 = []
        , _max = d1.length;
    let pPrev = d1[0]
      , pNext
      , i=1;
    for (; i<_max; i++){
      pNext = d1[i];
      d3.push({
        x: pNext.x,
        y: parseFloat(
             Big(pNext.y - pPrev.y)
             .div(pPrev.y)
             .times(100)
             .toFixed(2)
           )
      })
      pPrev = pNext
    }
    return d3;
  }
};

export default fn
