import Big from 'big.js';

import fns from './seriaHelperFn'

const { isNumber, crPointGetter } = fns;

const _crPeriod = (period, plus) => {
  const _delta = isNumber(plus) ? 1 - plus : 1;
  return parseFloat(
    Big(period)
     .minus(_delta)
     .toFixed(0)
  );
};

const sma = (data, period=1, plus) => {
  const dataSma = [];
  if (!Array.isArray(data) || data.length === 0) {
    return dataSma;
  }

  const _period = _crPeriod(period, plus)
  , { getX, getY } = crPointGetter(data)
  , _data = data.filter(p => isNumber(getY(p)))
  , max = _data.length;
  let bSum = Big('0.0')
  , point;
  for (let i=0; i<max; i++){
    point = _data[i]
    if (i>_period){
       bSum = bSum.plus(getY(point)).minus(getY(_data[i-period]));
       dataSma.push([
         getX(point),
         parseFloat(bSum.div(period).toFixed(2))
       ])
    } else {
      bSum = bSum.plus(getY(point));
    }
  }
  return dataSma;
};

export default sma
