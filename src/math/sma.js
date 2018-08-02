import Big from 'big.js';

const sma = (data, period, plus) => {
  const dataSma = [];

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
  let bSum = Big('0.0')
     , i=0
     , point;
  for (; i<max; i++){
    point = data[i];
    if (i>_period){
       bSum = bSum.plus(point.y).minus(data[i-period].y);
       dataSma.push([point.x, parseFloat(bSum.div(period).toFixed(2))])
    } else {
      bSum = bSum.plus(point.y);
    }
  }
  return dataSma;
};

export default sma
