import Big from 'big.js';

const rate = (y1, y2) => parseFloat(
  Big(y1)
   .div(y2)
   .toFixed(2)
);

export default rate
