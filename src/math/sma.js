import Big from 'big.js';

import {
  isNotEmptyArr,
  isNumber,
  crPointGetter
} from './seriaHelperFn';

const sma = (data, period=1) => {
  const dataSma = []
  , _period = parseInt(period, 10) - 1;
  if ( !(isNotEmptyArr(data)
         && isNumber(_period)
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
