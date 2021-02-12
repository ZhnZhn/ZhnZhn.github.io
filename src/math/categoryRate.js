import Big from 'big.js';
import fCategoryCalc from './fCategoryCalc'

const _calc = (p1, p2) => p2 && p2.y !== 0
    ? parseFloat(Big(p1.y).div(p2.y).toFixed(2))
    : 0;

const categoryRate = fCategoryCalc(_calc);

export default categoryRate
