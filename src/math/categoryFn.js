import fCategoryCalc from './fCategoryCalc';
import diff from './diff';
import rate from './rate';
import roc from './roc';

const _calcDiff = (p1, p2) => p2 && p2.y !== null
  ? diff(p1.y, p2.y)
  : 0
export const categoryDiff = fCategoryCalc(_calcDiff)

const _calcRate = (p1, p2) => p2 && p2.y !== null && p2.y !== 0
 ? rate(p1.y, p2.y)
 : 0;
export const categoryRate = fCategoryCalc(_calcRate)

const _calcRoc = (p1, p2) => roc((p2 || {}).y, p1.y);
export const categoryRoc = fCategoryCalc(_calcRoc)
