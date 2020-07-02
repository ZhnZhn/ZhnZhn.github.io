import Big from 'big.js';

import fns from './seriaHelperFn'

const { isNumber, crPointGetter } = fns;

const _isArr = Array.isArray

/*
const _crPeriod = (period, plus) => {
  const _delta = isNumber(plus) ? 1 - plus : 1;
  return parseFloat(
    Big(period)
     .minus(_delta)
     .toFixed(0)
  );
};
*/

const sma = (data, period=1) => {
  const dataSma = []
  , _period = parseInt(period, 10) - 1;
  if ( !(_isArr(data) && isNumber(_period)
         && data.length
         && _period < data.length)) {
    return dataSma;
  }
  if ( _period<=0 ){
    return data;
  }

  const { getX, getY } = crPointGetter(data)
  , _data = data.filter(p => isNumber(getY(p)));
  let bSum = Big('0.0')
  , point, i=0;
  for (; i<_data.length; i++){
    point = _data[i]
    if (i>=_period){
       bSum = (i === _period)
         ? bSum.plus(getY(point))
         : bSum.plus(getY(point)).minus(getY(_data[i-period]));
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
