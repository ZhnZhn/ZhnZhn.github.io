import Big from 'big.js';
import fCategoryCalc from './fCategoryCalc'

const _calc = (p1, p2) => p2 && p2.y !== null
    ? parseFloat(Big(p1.y).minus(p2.y).toString())
    : 0;

const categoryDiff = fCategoryCalc(_calc);    

export default categoryDiff
