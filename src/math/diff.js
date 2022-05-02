import Big from 'big.js';

const diff = (y1, y2) => parseFloat(
  Big(y1)
   .minus(y2)
   .toString()
 );

export default diff
