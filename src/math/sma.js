import Big from 'big.js';

const _crPointGetter = (data) => {
  const getX = data[0].x
    ? p => p.x
    : p => p[0]
  , getY = data[0].y
     ? p => p.y
     : p => p[1]
  return { getX, getY };
}

const sma = (data, period, plus) => {
  const dataSma = [];
  if (!Array.isArray(data) || data.length === 0) {
    return dataSma;
  }

  const max=data.length
     , _period = (plus)
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
  const { getX, getY } = _crPointGetter(data);
  let bSum = Big('0.0')
   , i=0
   , point;
  for (; i<max; i++){
    point = data[i];
    if (i>_period){
       bSum = bSum.plus(getY(point)).minus(getY(data[i-period]));
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
