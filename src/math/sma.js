import Big from 'big.js';

import {
  isNumber,
  parseIntBy10
} from '../utils/isTypeFn';
import { crDataArrays } from './seriaHelperFn';

const sma = (
  data,
  period=1
) => {
  const [
    _data,
    _dataX
  ] = crDataArrays(data)
  , _dataLength = _data.length
  , _period = parseIntBy10(period) - 1
  , dataSma = [];

  if ( _dataLength === 0
       || !isNumber(_period)
       || _period > _dataLength) {
    return dataSma;
  }
  if (_period<=0){
    return data;
  }

  let bSum = Big(0)
  , i=0;
  for (; i<_dataLength; i++){
    bSum = bSum.plus(_data[i])
    if (i>=_period) {
      if (i !== _period) {
        bSum = bSum.minus(_data[i-period])
      }
      dataSma.push([
        _dataX[i],
        parseFloat(bSum.div(period).toFixed(2))
      ])
    }
  }
  return dataSma;
};

export default sma
