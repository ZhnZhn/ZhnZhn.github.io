import Big from 'big.js';

const _isNumber = v => typeof v === 'number'
  && !Number.isNaN(v);
const _isUndef = v => typeof v === 'undefined';

const _crPointGetter = (data) => {
  const getX = _isUndef(data[0].x)
    ? p => p[0]
    : p => p.x
  , getY = _isUndef(data[0].y)
     ? p => p[1]
     : p => p.y;
  return { getX, getY };
}

const sma = (data, period, plus) => {
  const dataSma = [];
  if (!Array.isArray(data) || data.length === 0) {
    return dataSma;
  }

  const _period = (plus)
         ? parseFloat(
            Big(period)
              .plus(plus)
              .minus(1)
              .toFixed(0)
           )
         : parseFloat(
            Big(period)
              .minus(1)
              .toFixed(0)
           );
  const { getX, getY } = _crPointGetter(data)
  , _data = data.filter(p => _isNumber(getY(p)))
  , max=_data.length;
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
